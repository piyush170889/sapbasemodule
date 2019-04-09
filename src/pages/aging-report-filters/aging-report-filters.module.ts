import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgingReportFiltersPage } from './aging-report-filters';

@NgModule({
  declarations: [
    AgingReportFiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(AgingReportFiltersPage),
  ],
})
export class AgingReportFiltersPageModule {}
