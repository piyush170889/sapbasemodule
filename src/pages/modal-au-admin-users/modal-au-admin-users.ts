import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUsersPage } from '../admin-users/admin-users';
import { BaseComponent } from '../../custom/base-component';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ModalAuAdminUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-au-admin-users',
  templateUrl: 'modal-au-admin-users.html',
})
export class ModalAuAdminUsersPage extends BaseComponent{

  adminUserDetails: any;
  adminUserFormGroup: FormGroup;
  isAddOperation: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private view: ViewController,
    public commonUtility: CommonUtilityProvider,
    public http: HttpClient) {

      super(ConstantsProvider.API_ENDPOINT_USERS + ConstantsProvider.URL_SEPARATOR
        + ConstantsProvider.API_ENDPOINT_ADMIN_USERS, commonUtility, http, null);
  
    this.adminUserDetails = this.navParams.get('adminUserDetails');
    this.isAddOperation = this.navParams.get('isAddOperation');

    if (null == this.adminUserDetails) {
      this.initializeAdminUsers();
    }

    this.adminUserFormGroup = this.formBuilder.group(
      {
        contactNum: [this.adminUserDetails.contactNum, Validators.required],
        firstName: [this.adminUserDetails.firstName, Validators.required],
        lastName: [this.adminUserDetails.lastName, Validators.required],
        rolesMasterDtlsId: [this.adminUserDetails.rolesMasterDtlsId, Validators.required],
        password: ['']
      }
    );
  }

  initializeAdminUsers() {
    this.adminUserDetails = {
      userLoginDtlsId: '',
      userDtlsId: '',
      contactNum: '',
      firstName: '',
      lastName: '',
      password: '',
      rolesMasterDtlsId: '',
      emailId: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAuAdminUsersPage');
  }

  // dismissModal() {
  //   const modalData = {
  //     isAdded: false
  //   };
  //   this.view.dismiss(modalData);
  // }

  dismissModal() {
    this.navCtrl.pop();
  }

  saveAdminUsers() {

    this.adminUserDetails.contactNum = this.adminUserFormGroup.controls['contactNum'].value;
    this.adminUserDetails.firstName = this.adminUserFormGroup.controls['firstName'].value;
    this.adminUserDetails.lastName = this.adminUserFormGroup.controls['lastName'].value;

    let roles: string[] = [];
    roles.push(ConstantsProvider.ROLE_USER);
    roles.push(this.adminUserFormGroup.controls['rolesMasterDtlsId'].value);

    this.adminUserDetails.rolesMasterDtlsId = roles;

    // if (this.isAddOperation)
    //   this.adminUserDetails.password = this.adminUserFormGroup.controls['password'].value;

    // const modalData = {
    //   isAdded: true,
    //   adminUserDetails: this.adminUserDetails
    // };

    // this.view.dismiss(modalData);

    if (this.isAddOperation) {
      this.adminUserDetails.password = this.adminUserFormGroup.controls['password'].value;

      this.create(this.adminUserDetails)
        .subscribe(
          () => {
            this.navCtrl.setRoot(AdminUsersPage);
            this.commonUtility.presentToast('User Added Successfully', 3000);
          }
        );
    } else {

      this.update(this.adminUserDetails)
        .subscribe(
          () => {
            this.navCtrl.setRoot(AdminUsersPage);
            this.commonUtility.presentToast('User Updated Successfully', 3000);
          }
        )
    }
  }
}
