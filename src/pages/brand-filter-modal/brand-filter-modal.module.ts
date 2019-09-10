import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandFilterModalPage } from './brand-filter-modal';

@NgModule({
  declarations: [
    BrandFilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandFilterModalPage),
  ],
})
export class BrandFilterModalPageModule {}
