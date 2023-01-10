import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent implements OnInit {

  constructor(private mapsSvc:MapsService, private placesSvc:PlacesService) { }

  ngOnInit(): void {
  }

  //en caso de estar en otro lugar del mapa, esta funcion nos permite volver al punto de nuestra ubicacion
  goToMyLocation(){
    this.mapsSvc.flyTo(this.placesSvc.userLocation!);
    this.mapsSvc.deleteLayer(this.placesSvc.userLocation!);
  };

}
