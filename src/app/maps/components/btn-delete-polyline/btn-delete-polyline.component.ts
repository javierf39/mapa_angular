import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-delete-polyline',
  templateUrl: './btn-delete-polyline.component.html',
  styleUrls: ['./btn-delete-polyline.component.scss']
})
export class BtnDeletePolylineComponent implements OnInit {

  constructor(private mapSvc:MapsService, private placeSvc:PlacesService) { }

  ngOnInit(): void {
  }

  get isPolylineReady():boolean{
    return this.mapSvc.polyline;
  };

  deletePolyline(){
    this.mapSvc.deletePolyline();

    this.mapSvc.deleteLayer(this.placeSvc.userLocation!);

    this.mapSvc.polyline = false;

  };

}
