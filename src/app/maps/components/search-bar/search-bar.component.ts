import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Feature } from '../../interfaces/places';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private placeSvc:PlacesService, private mapSvc:MapsService) { }

  ngOnInit(): void {
  }

  //funcion que devuelve los resultado de la busqueda de lugares despues de 350ms
  onQueryChanged(query:string){
    setTimeout(() => {
      this.placeSvc.getPlacesByQuery(query);
    }, 350);

   

  };

 

}
