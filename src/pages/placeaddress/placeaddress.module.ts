import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceaddressPage } from './placeaddress';

@NgModule({
  declarations: [
    PlaceaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceaddressPage),
  ],
})
export class PlaceaddressPageModule {}
