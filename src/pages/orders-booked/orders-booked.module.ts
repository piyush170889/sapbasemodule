import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersBookedPage } from './orders-booked';

@NgModule({
  declarations: [
    OrdersBookedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersBookedPage),
  ],
})
export class OrdersBookedPageModule {}
