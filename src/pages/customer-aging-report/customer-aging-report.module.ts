import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAgingReportPage } from './customer-aging-report';

@NgModule({
  declarations: [
    CustomerAgingReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAgingReportPage),
  ],
})
export class CustomerAgingReportPageModule {}
