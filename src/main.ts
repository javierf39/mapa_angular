import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.map;

if(!navigator.geolocation){
  alert('navegador no soporta geolacalizacion')
  throw new Error('navegador no soporta geolacalizacion');

}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
