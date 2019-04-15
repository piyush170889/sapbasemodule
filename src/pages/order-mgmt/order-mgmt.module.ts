import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderMgmtPage } from "./order-mgmt";


@NgModule({
  declarations: [
    OrderMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderMgmtPage),
  ],
})
export class OrderMgmtPageModule {}
