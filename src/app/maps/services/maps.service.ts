import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AnySourceData, LngLatBounds, LngLatLike, Map, Marker} from 'mapbox-gl';
import { Directions, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map?:Map;
  polyline: boolean = false;

  marker = new Marker({color:'lightblue'});

  //comprobar si el mapa ha cargado correctamente
  get isMapReady(): boolean{
    return this.map ? true : false;
  };

  constructor(private http:HttpClient) {}

  //setear el mapa en una variable para utilizarla en distintos puntos del proyecto sin la necesidad de iniciar un nuevo mapa
  setMap(map:Map){
    this.map = map;
  };

  //funcionalidad que permite mover el mapa a distintos puntos.
  flyTo(coords:LngLatLike){
    if(!this.isMapReady) throw Error('mapa no listo');

    this.map?.flyTo({
      center:coords,
      zoom:14
    });
  };

  //funcion para agregar un nuevo marcador en el mapa
  addMarker(center:LngLatLike){
    this.marker
    .setLngLat(center)
    .addTo(this.map!)
  };

  //eliminar marcador especifico del mapa
  deleteLayer(center:LngLatLike){
    this.marker.remove();
    this.flyTo(center);
  };

  //obtener inicio y final entre tu ubicacion y el lugar al que quieres ir
  getDirections(start:[number, number], end:[number,number]){
    return this.http.get<Directions>(`https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?alternatives=false&annotations=state_of_charge%2Cduration&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww`);
  };
 
  //dibujar ruta en el mapa
  drawPolyline(route:Route){
    if(!this.isMapReady) throw Error('mapa no listo');

    this.polyline = true;
  
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => bounds.extend([lng, lat]));

    this.map?.fitBounds(bounds, {
      padding: 150
    });

    //Polyline
    const sourceData:AnySourceData = {
      type:'geojson',
      data:{
        type:'FeatureCollection',
        features: [{
          type:'Feature',
          properties:{},
          geometry: {
            type:'LineString',
            coordinates:coords
          }
        }]
      }
    };

   //Borrar ruta previa, en caso de que ya exista una cuando queramos elegir otro destino
   this.deletePolyline();

   
    this.map?.addSource('RouteString', sourceData);

    this.map?.addLayer({
      id:'RouteString',
      type:'line',
      source:'RouteString',
      layout:{
        'line-cap':'round',
        "line-join":'round'
      },
      paint: {
        'line-color':'blue',
        "line-width":3
      }
    });

  };

  //eliminar ruta dibujada en el mapa
  deletePolyline(){
    //comprobar si en el mapa hay una ruta dibujada
    if(this.map?.getLayer('RouteString')){
      //eliminar ruta
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    };
    
  };

}
