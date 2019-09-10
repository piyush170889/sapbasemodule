import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignaturepadPage } from './signaturepad';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    SignaturepadPage,
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(SignaturepadPage),
  ],
})
export class SignaturepadPageModule { }
