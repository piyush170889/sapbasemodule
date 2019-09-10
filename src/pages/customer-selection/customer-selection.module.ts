import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerSelectionPage } from './customer-selection';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    CustomerSelectionPage,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(CustomerSelectionPage),
  ],
})
export class CustomerSelectionPageModule { }
