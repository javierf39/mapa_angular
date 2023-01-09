import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss']
})
export class MapScreenComponent implements OnInit {

  constructor(private mapSvc:PlacesService) { }

  ngOnInit(): void {
  }

  get isUserLocationready(){
    return this.mapSvc.isUserLocationReady;
  }

}
