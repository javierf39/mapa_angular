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

  get isMapReady(): boolean{
    return this.map ? true : false;
  };


  constructor(private http:HttpClient) {
    
   }

  setMap(map:Map){
    this.map = map;
  };

  flyTo(coords:LngLatLike){
    if(!this.isMapReady) throw Error('mapa no listo');

    this.map?.flyTo({
      center:coords,
      zoom:14
    });
  };

  addMarker(center:LngLatLike){
    this.marker
    .setLngLat(center)
    .addTo(this.map!)
  };

  deleteLayer(center:LngLatLike){
    this.marker.remove();
    this.flyTo(center);
  };

  getDirections(start:[number, number], end:[number,number]){
    return this.http.get<Directions>(`https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?alternatives=false&annotations=state_of_charge%2Cduration&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww`);
  };
 
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

    //Borrar ruta previa
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

    console.log(this.polyline)

  };

  deletePolyline(){
    if(this.map?.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    };
    
  };

}
