import { Component, Input, OnInit } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { Feature } from '../../interfaces/places';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private placesSvc:PlacesService, private mapSvc:MapsService) { }

  ngOnInit(): void {
  }

  //comprobar si los lugares de la busqueda han cargado correctamente
  get loadingPlaces():boolean{
    return this.placesSvc.isLoadingPlaces;
  };

  //comprobar si la respuesta de lugares esta vacia
  get placesEmpty():boolean{
    return this.placesSvc.isPlacesEmpty;
  };

  //obtener los resultados de la busqueda y asignarlos a una funcion get
  get places():Feature[]{
    return this.placesSvc.places;
  };

  //moverse por el mapa al lugar seleccionado
  flyTo(place:Feature){
    const [lng, lat] = place.center  
    this.mapSvc.flyTo([lng,lat]);
    this.mapSvc.addMarker([lng,lat]);
    this.placesSvc.deletePlaces();
  };

  //obtener las direccciones entre la ubicacion y el lugar seleccionado
  getDirections( place: Feature ) {
    if ( !this.placesSvc.userLocation ) throw Error('No hay userLocation');

    this.placesSvc.deletePlaces();

    //inicio de la ruta es la ubicacion del dispositivo
    const start = this.placesSvc.userLocation;
    //final de la ruta es el lugar seleccionado
    const end = place.center as [number, number];

    //dibujar la ruta y agregar un nuevo marcado
    this.mapSvc.getDirections(start,end)
      .subscribe(res => {
        this.mapSvc.drawPolyline(res.routes[0]);
        this.mapSvc.addMarker(end);
      });

  };

  

}
