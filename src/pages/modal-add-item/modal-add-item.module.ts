import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddItemPage } from './modal-add-item';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    ModalAddItemPage,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(ModalAddItemPage),
  ],
})
export class ModalAddItemPageModule {}
