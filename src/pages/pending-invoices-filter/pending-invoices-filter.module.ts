import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingInvoicesFilterPage } from './pending-invoices-filter';

@NgModule({
  declarations: [
    PendingInvoicesFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingInvoicesFilterPage),
  ],
})
export class PendingInvoicesFilterPageModule {}
