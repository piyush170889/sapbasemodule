import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerSummaryReportPage } from './customer-summary-report';

@NgModule({
  declarations: [
    CustomerSummaryReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerSummaryReportPage),
  ],
})
export class CustomerSummaryReportPageModule {}
