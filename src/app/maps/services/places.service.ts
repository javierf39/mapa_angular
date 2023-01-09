import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Directions } from '../interfaces/directions';
import { Feature, Places } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  userLocation?:[number,number];
  isLoadingPlaces:boolean = false;
  errorPlaces:boolean = false;
  places:Feature[] = [];
  isPlacesEmpty:boolean = false;
  
  get isUserLocationReady():boolean{
    return this.userLocation ? true : false;
  }

  constructor(private http:HttpClient) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve( this.userLocation );
        },
        ( err ) => {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      );


    });

  };

  getPlacesByQuery(query:string){
    this.isLoadingPlaces = false;
    if(!query){this.isPlacesEmpty = true;  this.deletePlaces()}
    else{
      this.isLoadingPlaces = true;
      this.http.get<Places>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-73.990593%2C40.740121&types=address%2Ccountry%2Cplace&language=es&access_token=pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww`)
      .subscribe(res => {
        if(res.features.length > 0){
          this.isLoadingPlaces = false;
          this.isPlacesEmpty = false;
          this.places = res.features;
        }else{
          this.isPlacesEmpty = true;
          this.isLoadingPlaces = false;
          this.deletePlaces();
        }
      });
    }
    
  };

  deletePlaces() {
    this.places = [];
  };

 


}
