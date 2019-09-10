import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgingFilterPopoverPage } from './aging-filter-popover';

@NgModule({
  declarations: [
    AgingFilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(AgingFilterPopoverPage),
  ],
})
export class AgingFilterPopoverPageModule {}
