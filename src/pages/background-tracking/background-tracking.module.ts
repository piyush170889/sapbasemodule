import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackgroundTrackingPage } from './background-tracking';

@NgModule({
  declarations: [
    BackgroundTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(BackgroundTrackingPage),
  ],
})
export class BackgroundTrackingPageModule {}
