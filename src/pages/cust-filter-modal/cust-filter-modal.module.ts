import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustFilterModalPage } from './cust-filter-modal';

@NgModule({
  declarations: [
    CustFilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CustFilterModalPage),
  ],
})
export class CustFilterModalPageModule {}
