import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { BaseComponent } from '../../custom/base-component';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordPage } from '../change-password/change-password';
import { CustomerMgmtPage } from '../customer-mgmt/customer-mgmt';
import { AdminUsersPage } from '../admin-users/admin-users';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the AuthorizatonSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-authorizaton-settings',
  templateUrl: 'authorizaton-settings.html',
})
export class AuthorizatonSettingsPage extends BaseComponent {

  rolesArray: any = [];
  userDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public commonUtility: CommonUtilityProvider,
    public http: HttpClient,
    private events: Events) {
    // private geolocation: Geolocation) {

    super(ConstantsProvider.API_ENDPOINT_ROLES, commonUtility, http, null);

    this.getAll()
      .subscribe(
        (response) => {
          console.log(JSON.stringify(response));

          this.rolesArray = response.response.roles;
          this.userDetails = response.response.userDetails

          localStorage.setItem('roles', JSON.stringify(this.rolesArray));
          localStorage.setItem('isRolesUpdated', '1');

          localStorage.setItem('userDetails', JSON.stringify(this.userDetails));

          console.log('this.rolesArray = ' + JSON.stringify(this.rolesArray));

          if (this.userDetails.isPasswordChanged == 0) {
            if (this.rolesArray.indexOf(ConstantsProvider.ROLE_SALES) > -1) {

              // this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
              // .then((resp) => {
              //   alert('Latitude = ' + resp.coords.latitude + ', Longitude = ' + resp.coords.longitude);
              //   console.log('Latitude = ' + resp.coords.latitude + ', Longitude = ' + resp.coords.longitude);

              //   let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
              // });

              // let watch = this.geolocation.watchPosition();
              // watch.subscribe((data) => {
              //   alert('Latitude = ' + data.coords.latitude + ', Longitude = ' + data.coords.longitude);
              //   console.log('Latitude = ' + data.coords.latitude + ', Longitude = ' + data.coords.longitude);
                
              //   let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
              // });

              this.navCtrl.setRoot(CustomerMgmtPage);
            } else if (this.rolesArray.indexOf(ConstantsProvider.ROLE_ADMIN) > -1) {
              this.navCtrl.setRoot(AdminUsersPage);
            }
          } else {
            this.navCtrl.setRoot(ChangePasswordPage, {
              isForceChange: true
            });
          }

          this.events.publish("rolesUpdated");
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorizatonSettingsPage');
  }

}
