import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadDetailsPage } from './download-details';

@NgModule({
  declarations: [
    DownloadDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DownloadDetailsPage),
  ],
})
export class DownloadDetailsPageModule {}
