import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLedgerOptionsPage } from './modal-ledger-options';

@NgModule({
  declarations: [
    ModalLedgerOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalLedgerOptionsPage),
  ],
})
export class ModalLedgerOptionsPageModule {}
