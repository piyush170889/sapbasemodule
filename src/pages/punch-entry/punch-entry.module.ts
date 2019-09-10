import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunchEntryPage } from './punch-entry';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    PunchEntryPage,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(PunchEntryPage),
  ],
})
export class PunchEntryPageModule {}
