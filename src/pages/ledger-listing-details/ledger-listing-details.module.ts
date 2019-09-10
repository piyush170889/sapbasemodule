import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LedgerListingDetailsPage } from './ledger-listing-details';

@NgModule({
  declarations: [
    LedgerListingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LedgerListingDetailsPage),
  ],
})
export class LedgerListingDetailsPageModule {}
