import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleempFilterModalPage } from './saleemp-filter-modal';

@NgModule({
  declarations: [
    SaleempFilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleempFilterModalPage),
  ],
})
export class SaleempFilterModalPageModule {}
