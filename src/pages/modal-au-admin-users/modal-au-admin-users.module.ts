import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAuAdminUsersPage } from './modal-au-admin-users';

@NgModule({
  declarations: [
    ModalAuAdminUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAuAdminUsersPage),
  ],
})
export class ModalAuAdminUsersPageModule {}
