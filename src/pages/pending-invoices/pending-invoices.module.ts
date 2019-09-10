import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingInvoicesPage } from './pending-invoices';

@NgModule({
  declarations: [
    PendingInvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingInvoicesPage),
  ],
})
export class PendingInvoicesPageModule {}
