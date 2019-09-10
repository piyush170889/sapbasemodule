import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LedgerDateSelectionPage } from './ledger-date-selection';

@NgModule({
  declarations: [
    LedgerDateSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(LedgerDateSelectionPage),
  ],
})
export class LedgerDateSelectionPageModule {}
