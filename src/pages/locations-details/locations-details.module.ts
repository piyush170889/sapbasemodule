import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationsDetailsPage } from './locations-details';

@NgModule({
  declarations: [
    LocationsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationsDetailsPage),
  ],
})
export class LocationsDetailsPageModule {}
