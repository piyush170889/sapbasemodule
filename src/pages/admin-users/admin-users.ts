import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, AlertController } from 'ionic-angular';
import { BaseComponent } from '../../custom/base-component';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HttpClient } from '@angular/common/http';
import { ConstantsProvider } from '../../providers/constants/constants';
import { ModalAuAdminUsersPage } from '../modal-au-admin-users/modal-au-admin-users';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { TrackingPage } from '../tracking/tracking';
import { DatePipe } from "@angular/common/";
import { TrackingHistoryPage } from '../tracking-history/tracking-history';

/**
 * Generated class for the AdminUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-users',
  templateUrl: 'admin-users.html',
})
export class AdminUsersPage extends BaseComponent {

  adminUsersList: any[] = [];
  originalAdminUsersList: any[] = [];
  myInput: string = '';
  isUsersLoaded: boolean = false;

  verifyPasswordUrl: string = ConstantsProvider.API_BASE_URL
    + ConstantsProvider.API_ENDPOINT_VERIFY_PSSWD;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public commonUtility: CommonUtilityProvider,
    public http: HttpClient,
    private modal: ModalController,
    private restService: RestserviceProvider,
    private alertCtrl: AlertController
  ) {

    super(ConstantsProvider.API_ENDPOINT_USERS + ConstantsProvider.URL_SEPARATOR
      + ConstantsProvider.API_ENDPOINT_ADMIN_USERS, commonUtility, http, null);

    this.getAllPaginated(1)
      .subscribe(
        (response) => {
          this.adminUsersList = response.usersList;
          this.originalAdminUsersList = this.adminUsersList;
          console.log('Admin Users = ' + JSON.stringify(this.adminUsersList));
          this.isUsersLoaded = true;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsersPage');
  }

  isAdmin(adminUsers: any) {

    let roleArray: any[] = adminUsers.roles;

    let rolesToPass: any[] = [];

    roleArray.forEach(
      (roleElem) => {
        rolesToPass.push(roleElem.rolesMasterDtlsId);
      }
    );

    if (this.commonUtility.hasRoleInArray(rolesToPass, ConstantsProvider.ROLE_ADMIN))
      return true;
    else
      return false;
  }

  isSales(adminUsers: any) {

    let roleArray: any[] = adminUsers.roles;

    let rolesToPass: any[] = [];

    roleArray.forEach(
      (roleElem) => {
        rolesToPass.push(roleElem.rolesMasterDtlsId);
      }
    );

    if (this.commonUtility.hasRoleInArray(rolesToPass, ConstantsProvider.ROLE_SALES))
      return true;
    else
      return false;
  }

  udpateAdminUser(adminUsers) {

    console.log('udpateAdminUser called');
    let roleArray: any[] = adminUsers.roles;

    let rolesToPass: any;

    roleArray.forEach(
      (roleElem) => {
        if (roleElem.rolesMasterDtlsId != ConstantsProvider.ROLE_USER)
          rolesToPass = roleElem.rolesMasterDtlsId;
      }
    );

    let adminUserDetails = {
      userLoginDtlsId: adminUsers.userLoginDtlsId,
      userDtlsId: adminUsers.userDtl.userDtlsId,
      contactNum: adminUsers.contactNum,
      firstName: adminUsers.userDtl.firstName,
      lastName: adminUsers.userDtl.lastName,
      password: adminUsers.password,
      rolesMasterDtlsId: rolesToPass,
      emailId: ''
    };

    this.navCtrl.push(ModalAuAdminUsersPage, {
      adminUserDetails: adminUserDetails,
      isAddOperation: false
    });
  }

  changeAdminUserPassword(adminUsers) {

    console.log('changeAdminUserPassword called');

    const confirm = this.alertCtrl.create({
      title: 'Reset password',
      message: 'Enter New Password For This User',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: (data) => {
            console.log('Proceed clicked. Password Entered: '
              + data.password);

            let resetPasswordUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_USERS
              + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_USER_CHNG_PWD;

            let resetPasswordData = {
              userLoginDtlsId: adminUsers.userLoginDtlsId,
              password: data.password
            };

            // this.getAllSubResource(this.tagDtls.tagDtlsId)
            this.restService.postDetails(resetPasswordUrl, resetPasswordData)
              .subscribe(
                () => {
                  this.commonUtility.presentToast('Password Reset Successfully', 5000);
                }
              );
          }
        }
      ]
    });

    confirm.present();
  }

  addAdminUser() {

    // this.createAdminUserModal(true, null);
    let adminUserModalData: any = null;

    this.navCtrl.push(ModalAuAdminUsersPage, {
      adminUserDetails: adminUserModalData,
      isAddOperation: true
    });
  }

  updateAdminUser(adminUser: any) {

    // this.createAdminUserModal(false, adminUser);

    this.navCtrl.push(ModalAuAdminUsersPage, {
      adminUserDetails: adminUser,
      isAddOperation: false
    });
  }

  createAdminUserModal(isAddOperation: boolean, adminUserDetails: any) {

    let adminUserModalData: any = null;

    if (adminUserDetails != null) {

      let roleToPassModal: string;

      if (this.isSales(adminUserDetails))
        roleToPassModal = ConstantsProvider.ROLE_SALES;
      else if (this.isAdmin(adminUserDetails))
        roleToPassModal = ConstantsProvider.ROLE_ADMIN;

      adminUserModalData = {
        userLoginDtlsId: adminUserDetails.userLoginDtlsId,
        userDtlsId: adminUserDetails.userDtl.userDtlsId,
        contactNum: adminUserDetails.contactNum,
        firstName: adminUserDetails.userDtl.firstName,
        lastName: adminUserDetails.userDtl.lastName,
        rolesMasterDtlsId: roleToPassModal
      };
    }

    let adminDetailsModal: Modal = this.modal.create(ModalAuAdminUsersPage, {
      adminUserDetails: adminUserModalData,
      isAddOperation: isAddOperation
    });

    adminDetailsModal.present();

    adminDetailsModal.onDidDismiss(
      (adminUserDetailsModalData) => {
        console.log('Data = ' + JSON.stringify(adminUserDetailsModalData));

        if (adminUserDetailsModalData.isAdded) {

          // this.initializeAdminDetails();
          let adminUserDetailsFromModal = adminUserDetailsModalData.adminUserDetails;

          let rolesToSubmit: string[] = [];
          rolesToSubmit.push(ConstantsProvider.ROLE_USER);
          rolesToSubmit.push(adminUserDetailsFromModal.rolesMasterDtlsId);

          let dataForCreate: any = {
            userLoginDtlsId: adminUserDetailsFromModal.userLoginDtlsId,
            userDtlsId: adminUserDetailsFromModal.userDtlsId,
            contactNum: adminUserDetailsFromModal.contactNum,
            firstName: adminUserDetailsFromModal.firstName,
            lastName: adminUserDetailsFromModal.lastName,
            rolesMasterDtlsId: rolesToSubmit
          };

          if (isAddOperation) {

            this.create(dataForCreate)
              .subscribe(
                () => {
                  this.navCtrl.pop();
                  this.navCtrl.push(AdminUsersPage);
                }
              );
          } else {

            this.update(dataForCreate)
              .subscribe(
                () => {
                  this.navCtrl.pop();
                  this.navCtrl.push(AdminUsersPage);
                }
              )
          }
        }
      }
    );
  }

  onInput() {

    console.log('searchTerm = ' + this.myInput);

    let searchVal = this.myInput;

    // if the value is an empty string don't filter the items
    if (searchVal && searchVal.trim() != '') {

      this.adminUsersList = this.originalAdminUsersList.filter((userDetails: any) => {

        let searchValLowerCase = searchVal.toLowerCase();

        if (userDetails.userDtl.firstName.toLowerCase().indexOf(searchValLowerCase) > -1
          || (userDetails.userDtl.lastName != null && userDetails.userDtl.lastName.toLowerCase().indexOf(searchValLowerCase) > -1))
          return true;
        else
          return false;
      });

      console.log('User List Length = ' + this.adminUsersList.length);
    } else {
      this.adminUsersList = this.originalAdminUsersList;
    }
  }


  navigateToTrackingView(adminUser: any) {
    console.log('Admin User' + JSON.stringify(adminUser));

    if (this.commonUtility.isNetworkAvailable()) {
      this.navCtrl.push(TrackingPage, {
        firebaseId: adminUser.firebaseId,
        // firebaseId: '-LO25JjhKHcpEHRpK448',
        adminUser: adminUser
      })
    }
  }


  showFirebaseIdNotPresentAlert() {
    this.commonUtility.presentToast('No Tracking Data Associated With This User.', 3000);
  }

  showTodaysTrackingRecord(adminUser: any) {

    let pipe = new DatePipe('en-US'); // Use your own locale

    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'yyyy-MM-dd');

    console.log('myFormattedDate = ' + myFormattedDate);

    if (this.commonUtility.isNetworkAvailable()) {
      this.navCtrl.push(TrackingHistoryPage, {
        adminUser: adminUser,
        trackDate: myFormattedDate
      });
    }
  }

}
