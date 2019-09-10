import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceListingSettingsPopoverPage } from './invoice-listing-settings-popover';

@NgModule({
  declarations: [
    InvoiceListingSettingsPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceListingSettingsPopoverPage),
  ],
})
export class InvoiceListingSettingsPopoverPageModule {}
