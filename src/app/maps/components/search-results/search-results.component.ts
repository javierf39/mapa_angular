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

  // @Input() places!:Feature[];
  // @Input() placesEmpty!:boolean;

  constructor(private placesSvc:PlacesService, private mapSvc:MapsService) { }

  ngOnInit(): void {
  }

  get loadingPlaces():boolean{
    return this.placesSvc.isLoadingPlaces;
  };

  get placesEmpty():boolean{
    return this.placesSvc.isPlacesEmpty;
  };

  get places():Feature[]{
    return this.placesSvc.places;
  };

  flyTo(place:Feature){
    const [lng, lat] = place.center  
    this.mapSvc.flyTo([lng,lat]);
    this.mapSvc.addMarker([lng,lat]);
    this.placesSvc.deletePlaces();
  };

  getDirections( place: Feature ) {
    if ( !this.placesSvc.userLocation ) throw Error('No hay userLocation');

    this.placesSvc.deletePlaces();

    const start = this.placesSvc.userLocation;
    const end = place.center as [number, number];

    this.mapSvc.getDirections(start,end)
      .subscribe(res => {
        this.mapSvc.drawPolyline(res.routes[0]);
        this.mapSvc.addMarker(end);
      });

  };

  

}
