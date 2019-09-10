import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitHistoryPage } from './visit-history';

@NgModule({
  declarations: [
    VisitHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitHistoryPage),
  ],
})
export class VisitHistoryPageModule {}
