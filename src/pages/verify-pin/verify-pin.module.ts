import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyPinPage } from './verify-pin';

@NgModule({
  declarations: [
    VerifyPinPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyPinPage),
  ],
})
export class VerifyPinPageModule {}
