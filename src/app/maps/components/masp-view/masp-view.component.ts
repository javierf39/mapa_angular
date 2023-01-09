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

  @ViewChild('mapa') divMapa!:ElementRef;

  constructor(private mapSvc:PlacesService, private mapsSvc:MapsService) { 
    
  }

  ngAfterViewInit(): void {
    if ( !this.mapSvc.userLocation ) throw Error('No hay placesService.userLocation');

    const mapa = new Map({
      container:this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center: this.mapSvc.userLocation,
      zoom:14
    });


    const popup = new Popup()
    .setHTML(`
    <h6>Aquí estoy</h6>
    <span>Estoy en este lugar del mundo</span>
  `);

    new Marker({color:'red'})
        .setLngLat(this.mapSvc.userLocation)
        .setPopup(popup)
        .addTo(mapa)

    this.mapsSvc.setMap(mapa);

  }



}
