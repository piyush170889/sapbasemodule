import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingHistoryPage } from './tracking-history';

@NgModule({
  declarations: [
    TrackingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingHistoryPage),
  ],
})
export class TrackingHistoryPageModule {}
