import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddItemPage } from './modal-add-item';

@NgModule({
  declarations: [
    ModalAddItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddItemPage),
  ],
})
export class ModalAddItemPageModule {}
