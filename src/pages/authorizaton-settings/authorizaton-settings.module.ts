import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorizatonSettingsPage } from './authorizaton-settings';

@NgModule({
  declarations: [
    AuthorizatonSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorizatonSettingsPage),
  ],
})
export class AuthorizatonSettingsPageModule {}
