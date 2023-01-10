import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
  //comprobar si ya se obtuvo la localización del dispositivo
  get isUserLocationReady():boolean{
    return this.userLocation ? true : false;
  }

  //obetener localización apenas sea instanciado el servicio
  constructor(private http:HttpClient) { 
    this.getUserLocation();
  }

  //obtener la localización del dispositivo
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

  //obtener resultados de la busqueda de lugares
  getPlacesByQuery(query:string){
    this.isLoadingPlaces = false;
    if(!query){this.isPlacesEmpty = true;  this.deletePlaces()}
    else{
      //mostrar mensaje de cargando...
      this.isLoadingPlaces = true;
      this.http.get<Places>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-73.990593%2C40.740121&types=address%2Ccountry%2Cplace&language=es&access_token=pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww`)
      .subscribe(res => {
        if(res.features.length > 0){
          //ocultar mensaje de cargando...
          this.isLoadingPlaces = false;
          this.isPlacesEmpty = false;
          //asignar resultado de la respuesta a la variable places
          this.places = res.features;
        }else{
          this.isPlacesEmpty = true;
          this.isLoadingPlaces = false;
          this.deletePlaces();
        }
      });
    }
    
  };

  //vaciar arreglo de lugares
  deletePlaces() {
    this.places = [];
  };

 


}
