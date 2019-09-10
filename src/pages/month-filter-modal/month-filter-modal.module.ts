import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthFilterModalPage } from './month-filter-modal';

@NgModule({
  declarations: [
    MonthFilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthFilterModalPage),
  ],
})
export class MonthFilterModalPageModule {}
