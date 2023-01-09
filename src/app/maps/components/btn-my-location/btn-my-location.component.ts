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

  goToMyLocation(){
    this.mapsSvc.flyTo(this.placesSvc.userLocation!);
    this.mapsSvc.deleteLayer(this.placesSvc.userLocation!);
  };

}
