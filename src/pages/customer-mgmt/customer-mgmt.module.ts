import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerMgmtPage } from './customer-mgmt';

@NgModule({
  declarations: [
    CustomerMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerMgmtPage),
  ],
})
export class CustomerMgmtPageModule {}
