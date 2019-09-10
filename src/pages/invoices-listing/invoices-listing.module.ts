import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesListingPage } from './invoices-listing';

@NgModule({
  declarations: [
    InvoicesListingPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicesListingPage),
  ],
})
export class InvoicesListingPageModule {}
