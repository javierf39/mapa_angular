import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import {Map, Popup, Marker} from 'mapbox-gl';

import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-masp-view',
  templateUrl: './masp-view.component.html',
  styleUrls: ['./masp-view.component.scss']
})
export class MaspViewComponent implements AfterViewInit {

  //referencia del html donde queremos dibujar el mapa
  @ViewChild('mapa') divMapa!:ElementRef;

  constructor(private mapSvc:PlacesService, private mapsSvc:MapsService) {  
  }

  //cargar mapa en el ciclo afterviewinit
  ngAfterViewInit(): void {
    if ( !this.mapSvc.userLocation ) throw Error('No hay placesService.userLocation');

    //crear nueva instancia de Map (mapbox)
    const mapa = new Map({
      container:this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center: this.mapSvc.userLocation,
      zoom:14
    });

    //agregar un mensaje con la localizacion mediante un popup
    const popup = new Popup()
    .setHTML(`
    <h6>Aquí estoy</h6>
    <span>Estoy en este lugar del mundo</span>
  `);

  //agregar marcado en nuestra ubicacion
    new Marker({color:'red'})
        .setLngLat(this.mapSvc.userLocation)
        .setPopup(popup)
        .addTo(mapa)

    //agregar la referencia de Map a la variable del servicio para ser utilizada en distintos puntos del proyecto
    this.mapsSvc.setMap(mapa);

  }



}
