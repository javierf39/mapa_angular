import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MaspViewComponent } from './components/masp-view/masp-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { BtnDeletePolylineComponent } from './components/btn-delete-polyline/btn-delete-polyline.component';


@NgModule({
  declarations: [
    MapScreenComponent,
    MaspViewComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    AngularLogoComponent,
    SearchBarComponent,
    SearchResultsComponent,
    BtnDeletePolylineComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MapScreenComponent
  ]
})
export class MapsModule { }
