webpackJsonp([11],{

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorizatonSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__custom_base_component__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__change_password_change_password__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__customer_mgmt_customer_mgmt__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_users_admin_users__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(187);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AuthorizatonSettingsPage = /** @class */ (function (_super) {
    __extends(AuthorizatonSettingsPage, _super);
    function AuthorizatonSettingsPage(navCtrl, navParams, commonUtility, http, events, geolocation) {
        var _this = _super.call(this, __WEBPACK_IMPORTED_MODULE_2__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_ROLES, commonUtility, http, null) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.commonUtility = commonUtility;
        _this.http = http;
        _this.events = events;
        _this.geolocation = geolocation;
        _this.rolesArray = [];
        _this.getAll()
            .subscribe(function (response) {
            console.log(JSON.stringify(response));
            _this.rolesArray = response.response.roles;
            _this.userDetails = response.response.userDetails;
            localStorage.setItem('roles', JSON.stringify(_this.rolesArray));
            localStorage.setItem('isRolesUpdated', '1');
            localStorage.setItem('userDetails', JSON.stringify(_this.userDetails));
            console.log('this.rolesArray = ' + JSON.stringify(_this.rolesArray));
            if (_this.userDetails.isPasswordChanged == 0) {
                if (_this.rolesArray.indexOf(__WEBPACK_IMPORTED_MODULE_2__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_SALES) > -1) {
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
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__customer_mgmt_customer_mgmt__["a" /* CustomerMgmtPage */]);
                }
                else if (_this.rolesArray.indexOf(__WEBPACK_IMPORTED_MODULE_2__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_ADMIN) > -1) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__admin_users_admin_users__["a" /* AdminUsersPage */]);
                }
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__change_password_change_password__["a" /* ChangePasswordPage */], {
                    isForceChange: true
                });
            }
            _this.events.publish("rolesUpdated");
        });
        return _this;
    }
    AuthorizatonSettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AuthorizatonSettingsPage');
    };
    AuthorizatonSettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-authorizaton-settings',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\authorizaton-settings\authorizaton-settings.html"*/'<!--\n  Generated template for the AuthorizatonSettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar">\n    <ion-title></ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\authorizaton-settings\authorizaton-settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */]])
    ], AuthorizatonSettingsPage);
    return AuthorizatonSettingsPage;
}(__WEBPACK_IMPORTED_MODULE_3__custom_base_component__["a" /* BaseComponent */]));

//# sourceMappingURL=authorizaton-settings.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_common_utility_common_utility__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, restService, commonUtility) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restService = restService;
        this.commonUtility = commonUtility;
        this.isForceChange = false;
        this.newPassword = '';
        this.isForceChange = this.navParams.get('isForceChange');
    }
    ChangePasswordPage.prototype.changePassword = function () {
        var _this = this;
        console.log('newPassword = ' + this.newPassword);
        var changePasswordUrl = __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_USERS +
            __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_CHANGE_PASS;
        var changePasswordData = {
            password: this.newPassword
        };
        this.restService.postDetails(changePasswordUrl, changePasswordData)
            .subscribe(function () {
            _this.commonUtility.presentToast('Password Changed SuccessFully', 5000);
            setTimeout(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }, 2000);
        });
    };
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-password',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\change-password\change-password.html"*/'<!--\n  Generated template for the ChangePasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar" text-center>\n    <ion-title>\n      Change Password\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-grid no-padding>\n\n    <ion-row style="margin-top:45%;">\n      <ion-col col-12 padding text-center style="font-style: italic;" *ngIf="isForceChange">\n        Please change your password on your first login for security purpose. Enter new password below and save.\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-12>\n        <ion-item>\n          <ion-label floating class="pj-floating-label">New Password*</ion-label>\n          <ion-input type="password" [(ngModel)]="newPassword"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-12>\n        <button ion-button class="pj-button" type="button" [disabled]="newPassword == \'\'" (click)="changePassword()">SAVE</button>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\change-password\change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_restservice_restservice__["a" /* RestserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authorizaton_settings_authorizaton_settings__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, formBuilder, commonUtility, restService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.commonUtility = commonUtility;
        this.restService = restService;
        this.tagId = '';
        this.commonUtility.clearStorage();
        this.credentials = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present().then(function () {
                var inputUsername = _this.credentials.controls['username'].value;
                var inputPassword = _this.credentials.controls['password'].value;
                console.log("Username From Ctrl - " + inputUsername + ", Password From Ctrl - " + inputPassword);
                _this.restService.doLoginRequest(inputUsername, inputPassword)
                    .subscribe(function (response) {
                    _this.loader.dismiss();
                    if (response) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__authorizaton_settings_authorizaton_settings__["a" /* AuthorizatonSettingsPage */]);
                    }
                    else {
                        console.log('An server error occured.');
                    }
                }, function (err) {
                    _this.loader.dismiss();
                    console.log(err);
                });
            });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n\n  <ion-grid>\n\n    <!-- Logo -->\n    <ion-row>\n      <ion-col col-12 padding class="logo">\n        <h4 text-center><span class="headline">DEMO APP</span></h4>\n      </ion-col>\n    </ion-row>\n\n    <!-- Login Form -->\n    <form [formGroup]="credentials" style="margin-top:30%;">\n\n      <ion-row>\n        <ion-col col-12 padding>\n          <ion-item>\n            <!-- <ion-label floating class="pj-floating-label">Username</ion-label> -->\n            <button ion-button clear color="primary" style="font-size: 2rem;margin: 0;" type="button" item-right>\n                <ion-icon name="ios-person-outline"> </ion-icon>\n              </button>\n            <ion-input type="text" text-center placeholder="Username" formControlName="username"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="margin-bottom:8%;">\n        <ion-col col-12 padding>\n          <ion-item>\n            <!-- <ion-label floating class="pj-floating-label">Password</ion-label> -->\n            <ion-input type="password" text-center placeholder="Password" formControlName="password"></ion-input>\n            <button ion-button clear color="primary" style="font-size: 2rem;margin: 0;" type="button" item-right>\n              <ion-icon name="ios-lock-outline"> </ion-icon>\n            </button>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-12 padding>\n          <!-- <button ion-button class="pj-button" type="button" (click)="doLogin()" [disabled]="!credentials.valid">SIGN IN</button> -->\n          <button ion-button class="pj-button" type="button" (click)="doLogin()">SIGN IN</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_restservice_restservice__["a" /* RestserviceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerMgmtPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_constants_constants__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CustomerMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerMgmtPage = /** @class */ (function () {
    function CustomerMgmtPage(navCtrl, navParams, commonUtility, restService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonUtility = commonUtility;
        this.restService = restService;
        this.customersList = [];
        this.paginationDetails = {
            currentPageNo: 1,
            totalPages: 0
        };
        this.isPaginatedResultsFetched = true;
        this.orginalCustomersList = [];
        this.myInput = '';
        this.customerMgmtApiEndpoint = __WEBPACK_IMPORTED_MODULE_4__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL
            + __WEBPACK_IMPORTED_MODULE_4__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_CUSTOMER_MGMT;
        this.restService.getDetails(this.getCustMgmtApiEndpoint(1))
            .subscribe(function (response) {
            console.log('Response = ' + JSON.stringify(response.response));
            _this.customersList = response.response;
            _this.orginalCustomersList = _this.customersList;
            //: Update Pagiination Details
            _this.paginationDetails = response.paginationDetails;
            console.log('this.paginationDetails = ' + JSON.stringify(_this.paginationDetails));
        });
    }
    CustomerMgmtPage.prototype.getCustMgmtApiEndpoint = function (pageNo) {
        return this.customerMgmtApiEndpoint + pageNo;
    };
    CustomerMgmtPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerMgmtPage');
    };
    CustomerMgmtPage.prototype.getRecordsPaginated = function (infiniteScrollEvent) {
        var _this = this;
        console.log('getRecordsPaginated CustMgmtPage');
        var currentPageNo = this.paginationDetails.currentPageNo;
        var totalPages = this.paginationDetails.totalPages;
        if (this.isPaginatedResultsFetched) {
            if (this.commonUtility.isNetworkAvailable()) {
                if (currentPageNo < totalPages) {
                    currentPageNo = currentPageNo + 1;
                    console.log('currentPageNo = ' + currentPageNo);
                    setTimeout(function () {
                        _this.isPaginatedResultsFetched = false;
                        _this.restService.getDetails(_this.getCustMgmtApiEndpoint(currentPageNo))
                            .subscribe(function (response) {
                            _this.isPaginatedResultsFetched = true;
                            console.log('isPaginatedResultsFetched = ' + _this.isPaginatedResultsFetched);
                            _this.customersList = _this.customersList.concat(response.response);
                            _this.orginalCustomersList = _this.customersList;
                            _this.paginationDetails = response.paginationDetails;
                            infiniteScrollEvent.complete();
                        }, function () {
                            _this.isPaginatedResultsFetched = true;
                            infiniteScrollEvent.complete();
                            console.log('isPaginatedResultsFetched = ' + _this.isPaginatedResultsFetched);
                        });
                    }, 500);
                }
                else {
                    infiniteScrollEvent.enable(false);
                }
            }
        }
    };
    CustomerMgmtPage.prototype.onInput = function () {
        console.log('searchTerm = ' + this.myInput);
        var searchVal = this.myInput;
        // if the value is an empty string don't filter the items
        if (searchVal && searchVal.trim() != '') {
            this.customersList = this.orginalCustomersList.filter(function (customerDetailsObj) {
                var searchValLowerCase = searchVal.toLowerCase();
                if (customerDetailsObj.customerDetails.cardName.toLowerCase().indexOf(searchValLowerCase) > -1
                    || (customerDetailsObj.customerDetails.phone1 != null
                        && customerDetailsObj.customerDetails.phone1.toLowerCase().indexOf(searchValLowerCase) > -1)
                    || customerDetailsObj.customerDetails.cardCode.toLowerCase().indexOf(searchValLowerCase) > -1)
                    return true;
                else
                    return false;
            });
            console.log('Customers List Length = ' + this.customersList.length);
        }
        else {
            this.customersList = this.orginalCustomersList;
        }
    };
    CustomerMgmtPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-mgmt',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\customer-mgmt\customer-mgmt.html"*/'<!--\n  Generated template for the CustomerMgmtPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar" text-center>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Customer Management\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="myInput" (ionChange)="onInput()" placeholder="Search By Name, Phone No., Code">\n  </ion-searchbar>\n\n  <div *ngIf="customersList.length==0" class="pj-empty-page" style="margin-top: 40%;">\n    <ion-icon name="ios-contact-outline"></ion-icon>\n    <h4>No Customers To Show</h4>\n  </div>\n\n  <ion-card *ngFor="let customer of customersList">\n\n    <ion-card-header>\n      <ion-row>\n        <ion-col col-12>\n          <strong>{{customer.customerDetails.cardCode}} - {{customer.customerDetails.cardName}}</strong>\n        </ion-col>\n      </ion-row>\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-row>\n        <ion-col col-5>\n          Contact No.\n        </ion-col>\n        <ion-col col-7>\n          {{customer.customerDetails.phone1 == null || customer.customerDetails.phone1 == \'\' ? \'Not Available\' : customer.customerDetails.phone1 }}\n        </ion-col>\n      </ion-row>\n\n    </ion-card-content>\n\n\n  </ion-card>\n\n  <!-- Infinite Scroll Content -->\n  <ion-infinite-scroll (ionInfinite)="getRecordsPaginated($event)">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading Customers...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\customer-mgmt\customer-mgmt.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_restservice_restservice__["a" /* RestserviceProvider */]])
    ], CustomerMgmtPage);
    return CustomerMgmtPage;
}());

//# sourceMappingURL=customer-mgmt.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);


var BaseComponent = /** @class */ (function () {
    function BaseComponent(endpointUrl, commonUtility, http, subResourceEndpointUrlToSet) {
        this.endpointUrl = endpointUrl;
        this.commonUtility = commonUtility;
        this.http = http;
        this.subResourceEndpointUrlToSet = subResourceEndpointUrlToSet;
        this.subResourceEndpointUrl = subResourceEndpointUrlToSet;
    }
    BaseComponent.prototype.setSubResourceUrl = function (subResourceEndpointUrl) {
        this.subResourceEndpointUrl = subResourceEndpointUrl;
    };
    BaseComponent.prototype.getAll = function () {
        var _this = this;
        var listUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl;
        console.log('List URL -> ' + listUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(listUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.getAllPaginated = function (pageNo) {
        var _this = this;
        var listUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl + "?" + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_PARAM_PAGE_NO + pageNo;
        console.log('List URL -> ' + listUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(listUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.getById = function (id) {
        var _this = this;
        var getByIdUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl
            + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + id;
        console.log('getById URL -> ' + getByIdUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(getByIdUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.create = function (data) {
        var _this = this;
        var createUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl;
        console.log('Create URL -> ' + createUrl);
        console.log('Create Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(createUrl, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.getAllSubResource = function (parentId) {
        var _this = this;
        var listUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + parentId + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + this.subResourceEndpointUrl;
        console.log('List URL -> ' + listUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(listUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.getSubresourceById = function (parentId, subResourceId) {
        var _this = this;
        var getSubresourceByIdUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl
            + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + parentId + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + this.subResourceEndpointUrl + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + subResourceId;
        console.log('getSubresourceByIdUrl URL -> ' + getSubresourceByIdUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(getSubresourceByIdUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.createSubResource = function (parentId, subResourceData) {
        var _this = this;
        var createSubResourceUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + parentId + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + this.subResourceEndpointUrl;
        console.log('createSubResourceUrl = ' + createSubResourceUrl);
        console.log('createSubResourceUrl data= ' + JSON.stringify(subResourceData));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(createSubResourceUrl, subResourceData)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.update = function (data) {
        var _this = this;
        var updateUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl;
        console.log('Update URL -> ' + updateUrl);
        console.log('Update Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(updateUrl, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.updateSubResource = function (parentId, subResourceData) {
        var _this = this;
        var subResourceUpdateUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + parentId + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + this.subResourceEndpointUrl;
        console.log('subResourceUpdateUrl -> ' + subResourceUpdateUrl);
        console.log('updateSubResourceUrl data= ' + JSON.stringify(subResourceData));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(subResourceUpdateUrl, subResourceData)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.deleteById = function (id) {
        var _this = this;
        var deleteUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + id;
        console.log('Delete URL -> ' + deleteUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(deleteUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.deleteSubResourceById = function (parentId, subResourceId) {
        var _this = this;
        var deleteUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + parentId + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + this.subResourceEndpointUrl
            + __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + subResourceId;
        console.log('Delete URL -> ' + deleteUrl);
        console.log('deleteSubResourceUrl data= ' + subResourceId);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(deleteUrl)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.bulkDelete = function (data) {
        var _this = this;
        var bulkDeleteUrl = __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + this.endpointUrl;
        console.log('Bulk Delete URL -> ' + bulkDeleteUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(bulkDeleteUrl, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    BaseComponent.prototype.setFormGroupDataFromJson = function (jsonData, formGroup) {
        var jsonKeys = Object.keys(jsonData);
        console.log('jsonKeys = ' + JSON.stringify(jsonKeys));
        jsonKeys.forEach(function (key) {
            if (formGroup.contains(key)) {
                formGroup.controls[key].setValue(jsonData[key]);
            }
        });
        // return formGroup;
    };
    return BaseComponent;
}());

//# sourceMappingURL=base-component.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalAuAdminUsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admin_users_admin_users__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__custom_base_component__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(37);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ModalAuAdminUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalAuAdminUsersPage = /** @class */ (function (_super) {
    __extends(ModalAuAdminUsersPage, _super);
    function ModalAuAdminUsersPage(navCtrl, navParams, formBuilder, view, commonUtility, http) {
        var _this = _super.call(this, __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_USERS + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_ADMIN_USERS, commonUtility, http, null) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.formBuilder = formBuilder;
        _this.view = view;
        _this.commonUtility = commonUtility;
        _this.http = http;
        _this.adminUserDetails = _this.navParams.get('adminUserDetails');
        _this.isAddOperation = _this.navParams.get('isAddOperation');
        if (null == _this.adminUserDetails) {
            _this.initializeAdminUsers();
        }
        _this.adminUserFormGroup = _this.formBuilder.group({
            contactNum: [_this.adminUserDetails.contactNum, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            firstName: [_this.adminUserDetails.firstName, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastName: [_this.adminUserDetails.lastName, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            rolesMasterDtlsId: [_this.adminUserDetails.rolesMasterDtlsId, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['']
        });
        return _this;
    }
    ModalAuAdminUsersPage.prototype.initializeAdminUsers = function () {
        this.adminUserDetails = {
            userLoginDtlsId: '',
            userDtlsId: '',
            contactNum: '',
            firstName: '',
            lastName: '',
            password: '',
            rolesMasterDtlsId: '',
            emailId: ''
        };
    };
    ModalAuAdminUsersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalAuAdminUsersPage');
    };
    // dismissModal() {
    //   const modalData = {
    //     isAdded: false
    //   };
    //   this.view.dismiss(modalData);
    // }
    ModalAuAdminUsersPage.prototype.dismissModal = function () {
        this.navCtrl.pop();
    };
    ModalAuAdminUsersPage.prototype.saveAdminUsers = function () {
        var _this = this;
        this.adminUserDetails.contactNum = this.adminUserFormGroup.controls['contactNum'].value;
        this.adminUserDetails.firstName = this.adminUserFormGroup.controls['firstName'].value;
        this.adminUserDetails.lastName = this.adminUserFormGroup.controls['lastName'].value;
        var roles = [];
        roles.push(__WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_USER);
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
                .subscribe(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__admin_users_admin_users__["a" /* AdminUsersPage */]);
                _this.commonUtility.presentToast('User Added Successfully', 3000);
            });
        }
        else {
            this.update(this.adminUserDetails)
                .subscribe(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__admin_users_admin_users__["a" /* AdminUsersPage */]);
                _this.commonUtility.presentToast('User Updated Successfully', 3000);
            });
        }
    };
    ModalAuAdminUsersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modal-au-admin-users',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\modal-au-admin-users\modal-au-admin-users.html"*/'<!--\n  Generated template for the ModalAuAdminUsersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar color="navbar" text-center>\n      <ion-title>\n        Add Admin Users\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n\n\n<ion-content padding>\n\n  <ion-grid no-padding>\n\n    <form [formGroup]="adminUserFormGroup">\n      <ion-row>\n\n        <ion-col col-6>\n          <ion-item>\n            <ion-label floating class="pj-floating-label">First Name*</ion-label>\n            <ion-input type="text" formControlName="firstName"></ion-input>\n          </ion-item>\n        </ion-col>\n\n        <ion-col col-6>\n          <ion-item>\n            <ion-label floating class="pj-floating-label">Last Name*</ion-label>\n            <ion-input type="text" formControlName="lastName"></ion-input>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-12>\n          <ion-item>\n            <ion-label floating class="pj-floating-label">UserName*</ion-label>\n            <ion-input type="text" formControlName="contactNum"></ion-input>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="isAddOperation">\n\n        <ion-col col-12>\n          <ion-item>\n            <ion-label floating class="pj-floating-label">Password*</ion-label>\n            <ion-input type="password" formControlName="password"></ion-input>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-12>\n        <ion-item class="pj-floating-label">\n          <ion-label>Role*</ion-label>\n            <ion-select formControlName="rolesMasterDtlsId">\n              <ion-option value="ROLE_SALES">Sales Executive</ion-option>\n              <ion-option value="ROLE_ADMIN">Admin</ion-option>\n            </ion-select>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-6>\n          <button ion-button class="pj-button-danger" type="button" (click)="dismissModal()">CANCEL</button>\n        </ion-col>\n        <ion-col col-6>\n          <button ion-button class="pj-button" type="button" [disabled]="!adminUserFormGroup.valid" (click)="saveAdminUsers()">SAVE</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\modal-au-admin-users\modal-au-admin-users.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClient */]])
    ], ModalAuAdminUsersPage);
    return ModalAuAdminUsersPage;
}(__WEBPACK_IMPORTED_MODULE_4__custom_base_component__["a" /* BaseComponent */]));

//# sourceMappingURL=modal-au-admin-users.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_marker_animate_unobtrusive__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_marker_animate_unobtrusive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_marker_animate_unobtrusive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_geocoder_geocoder__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TrackingPage = /** @class */ (function () {
    function TrackingPage(navCtrl, navParams, platform, geocoderProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.geocoderProvider = geocoderProvider;
        this.latitude = '0';
        this.longitude = '0';
        this.index = 1;
        this.nodeName = 'aaditInfra/';
        this.map = null;
        this.image = 'assets/imgs/loc-marker.png';
        this.markers = [];
        this.marker = null;
        this.adminUserName = '';
        this.firebaseId = this.navParams.get('firebaseId');
        // this.firebaseId = '-LPQ6hb8cXTSUnwz7ejX';
        this.adminUser = this.navParams.get('adminUser');
        this.adminUserName = this.adminUser.userDtl.firstName + ' ' + this.adminUser.userDtl.lastName;
        console.log('Admin User Name = ' + this.adminUserName
            + ", firebaseId = " + this.firebaseId);
        this.ref = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.nodeName + this.firebaseId);
        platform.ready().then(function () {
            _this.ref.on('value', function (resp) {
                console.log('Getting Value From FCM');
                var data = resp.val();
                _this.latitude = data.latitude;
                _this.longitude = data.longitude;
                _this.lastUpdatedTs = data.updatedTs;
                if (null != _this.latitude && '0' != _this.latitude && '' != _this.latitude && null != _this.longitude
                    && '' != _this.longitude && '0' != _this.longitude) {
                    _this.geocoderProvider.reverseGeocode(_this.latitude, _this.longitude)
                        .subscribe(function (response) {
                        _this.address = response;
                    });
                }
                else {
                    _this.address = 'Address Not Available';
                }
                // this.address = 'Address Not Available';
                console.log(_this.index + " : " + " Latitude = " + data.latitude + ", Longitude = " + data.longitude
                    + ", Key = " + resp.key + ", Updated Ts - " + _this.lastUpdatedTs);
                if (_this.map != null) {
                    var locationOnMap = new google.maps.LatLng(_this.latitude, _this.longitude);
                    if (_this.marker != null) {
                        console.log('map bounds result = ' + _this.map.getBounds().contains(locationOnMap));
                        _this.marker.setPosition(locationOnMap);
                        if (!_this.map.getBounds().contains(locationOnMap)) {
                            console.log('Location not within Boundary. Centering Map with new location');
                            _this.map.setCenter(locationOnMap);
                        }
                    }
                    else {
                        console.log('No Marker found. Adding new one');
                        _this.addMarker(locationOnMap, _this.image);
                    }
                    console.log('Added marker On Map');
                }
                else {
                    console.log('Initializing Map');
                    _this.initMap(_this.latitude, _this.longitude);
                    console.log('Initialized Map');
                }
                console.log('Completed On Value ');
            });
        });
    }
    TrackingPage_1 = TrackingPage;
    TrackingPage.prototype.initMap = function (latitude, longitude) {
        var locationOnMap = new google.maps.LatLng(latitude, longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 14,
            center: locationOnMap,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.addMarker(locationOnMap, this.image);
    };
    TrackingPage.prototype.addMarker = function (location, image) {
        //Create New Marker on Map
        this.marker = new __WEBPACK_IMPORTED_MODULE_3_marker_animate_unobtrusive___default.a({
            position: location,
            map: this.map,
            // title: "I'm sliding marker",
            // label: 'I am test label',
            icon: image,
            easing: "easeOutExpo"
        });
        this.marker.setDuration(TrackingPage_1.DEFAULT_MARKER_ANIMATE_DURATION);
        // marker.setEasing('linear');
    };
    TrackingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TrackingPage');
    };
    TrackingPage.DEFAULT_MARKER_ANIMATE_DURATION = 2000;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TrackingPage.prototype, "mapElement", void 0);
    TrackingPage = TrackingPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tracking',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\tracking\tracking.html"*/'<!--\n  Generated template for the TrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar color="navbar" text-center>\n    <ion-title>{{adminUserName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-card style="position: absolute; bottom: 1rem; z-index: 99999; margin:0;">\n    <ion-card-content>\n      <ion-row>\n        <ion-col col-5 class="pj-sub-title">\n          Last Updated\n        </ion-col>\n        <ion-col col-6 class="pj-sub-title">\n          {{lastUpdatedTs | date : \'dd MMM yyyy hh:mm a\' }}\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        {{address}}\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n\n  <div #map id="map"></div>\n\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\tracking\tracking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__providers_geocoder_geocoder__["a" /* GeocoderProvider */]])
    ], TrackingPage);
    return TrackingPage;
    var TrackingPage_1;
}());

//# sourceMappingURL=tracking.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_marker_animate_unobtrusive__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_marker_animate_unobtrusive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_marker_animate_unobtrusive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_restservice_restservice__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TrackingHistoryPage = /** @class */ (function () {
    function TrackingHistoryPage(navCtrl, navParams, platform, restService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.restService = restService;
        this.map = null;
        this.image = 'assets/imgs/loc-marker.png';
        this.markers = [];
        this.marker = null;
        this.polyOptions = {
            strokeColor: '#4986E7',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            geodesic: true,
        };
        this.latLongList = [];
        this.min = 0;
        this.rangeVal = 0;
        this.trackDate = this.navParams.get('trackDate');
        this.adminUser = this.navParams.get('adminUser');
        this.adminUserName = this.adminUser.userDtl.firstName + ' ' + this.adminUser.userDtl.lastName;
        this.getTrackingHistoryForTheDay();
    }
    TrackingHistoryPage_1 = TrackingHistoryPage;
    TrackingHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TrackingHistoryPage');
    };
    TrackingHistoryPage.prototype.getTrackingHistoryUrl = function () {
        return __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_USERS
            + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + this.adminUser.userDtl.userDtlsId
            + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_TRACKING_HISTORY + this.trackDate;
        // return '';
    };
    TrackingHistoryPage.prototype.getTrackingHistoryForTheDay = function () {
        var _this = this;
        var trackingHistoryUrl = this.getTrackingHistoryUrl();
        console.log('trackingHistoryUrl = ' + trackingHistoryUrl);
        this.restService.getDetails(trackingHistoryUrl)
            .subscribe(function (response) {
            _this.distanceTravelled = response.response.distanceTravelled;
            _this.latLongList = response.response.trackingData;
            if (_this.latLongList.length > 0) {
                _this.max = _this.latLongList.length - 1;
                _this.minTime = _this.latLongList[0].time;
                _this.maxTime = _this.latLongList[_this.max].time;
                _this.time = _this.latLongList[0].time;
                _this.initializeAll();
            }
            console.log("Time - " + _this.time + ', Min Time = ' + _this.minTime
                + ', maxTime = ' + _this.maxTime + ', min = ' + _this.min + ', max = ' + _this.max);
        });
        // TODO: Remove This
        // TEST DATA
        // let response = {
        //   response: this.fillDummyData()
        // }
        // this.distanceTravelled = response.response.distanceTravelled;
        // this.latLongList = response.response.trackingData;
        // if (this.latLongList.length > 0) {
        //   this.max = this.latLongList.length - 1;
        //   this.minTime = this.latLongList[0].time;
        //   this.maxTime = this.latLongList[this.max].time;
        //   this.time = this.latLongList[0].time;
        //   this.initializeAll();
        // }
        // console.log("Time - " + this.time + ', Min Time = ' + this.minTime
        //   + ', maxTime = ' + this.maxTime + ', min = ' + this.min + ', max = ' + this.max);
    };
    TrackingHistoryPage.prototype.initializeAll = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.map != null) {
                var locationOnMap = new google.maps.LatLng(_this.latLongList[0].latitude, _this.latLongList[0].longitude);
                if (_this.marker != null) {
                    console.log('map bounds result = ' + _this.map.getBounds().contains(locationOnMap));
                    _this.marker.setPosition(locationOnMap);
                    if (!_this.map.getBounds().contains(locationOnMap)) {
                        console.log('Location not within Boundary. Centering Map with new location');
                        _this.map.setCenter(locationOnMap);
                    }
                }
                else {
                    console.log('No Marker found. Adding new one');
                    _this.addMarker(locationOnMap, _this.image);
                }
                console.log('Added marker On Map');
            }
            else {
                console.log('Initializing Map');
                _this.initMap(_this.latLongList[0].latitude, _this.latLongList[0].longitude);
                console.log('Initialized Map');
            }
            console.log('Completed On Value ');
        });
    };
    TrackingHistoryPage.prototype.initMap = function (latitude, longitude) {
        var locationOnMap = new google.maps.LatLng(latitude, longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 10,
            center: locationOnMap,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.addMarker(locationOnMap, this.image);
        //Initialize Polyline
        this.polyLine = new google.maps.Polyline(this.polyOptions);
        this.polyLine.setMap(this.map);
        var path = this.polyLine.getPath();
        path.push(locationOnMap);
    };
    TrackingHistoryPage.prototype.addMarker = function (location, image) {
        //Create New Marker on Map
        this.marker = new __WEBPACK_IMPORTED_MODULE_2_marker_animate_unobtrusive___default.a({
            position: location,
            map: this.map,
            // title: "I'm sliding marker",
            // label: 'I am test label',
            icon: image,
            easing: "easeOutExpo"
        });
        this.marker.setDuration(TrackingHistoryPage_1.DEFAULT_MARKER_ANIMATE_DURATION);
        // marker.setEasing('linear');
    };
    TrackingHistoryPage.prototype.updatePath = function () {
        console.log('updatePath() called');
        //Step 1: Redraw polyline from start point to current point through all intermediate points
        var path = this.polyLine.getPath();
        var pathLength = path.length;
        var rangeValToCompare = Number.parseInt(this.rangeVal.toString()) + 1;
        console.log('this.rangeVal = ' + this.rangeVal + 'pathLength = ' + pathLength
            + ', rangeValToCompare = ' + rangeValToCompare);
        if (pathLength != rangeValToCompare) {
            if (pathLength < rangeValToCompare) {
                for (var i = pathLength; i <= this.rangeVal; i++) {
                    var latitude = this.latLongList[i].latitude;
                    var longitude = this.latLongList[i].longitude;
                    console.log('Latitude = ' + latitude + ', longitude = ' + longitude);
                    var locationOnMap = new google.maps.LatLng(latitude, longitude);
                    path.setAt(i, locationOnMap);
                }
            }
            else {
                for (var i = rangeValToCompare; i < pathLength; i++) {
                    path.removeAt(i);
                }
            }
            var currentLatLongSelected = this.latLongList[this.rangeVal];
            var markerLocation = new google.maps.LatLng(currentLatLongSelected.latitude, currentLatLongSelected.longitude);
            this.time = currentLatLongSelected.time;
            //Step 2: Set Marker Position to the latest
            this.marker.setPosition(markerLocation);
            if (!this.map.getBounds().contains(markerLocation)) {
                console.log('Location not within Boundary. Centering Map with new location');
                this.map.setCenter(markerLocation);
            }
        }
    };
    TrackingHistoryPage.prototype.updatePath1 = function () {
        //Step 1: Redraw polyline from start point to current point through all intermediate points
        var path = this.polyLine.getPath();
        var pathLength = path.length;
        var rangeValToCompare = Number.parseInt(this.rangeVal.toString()) + 1;
        console.log('this.rangeVal = ' + this.rangeVal + 'pathLength = ' + pathLength
            + ', rangeValToCompare = ' + rangeValToCompare);
        if (pathLength != rangeValToCompare) {
            if (pathLength < rangeValToCompare) {
                for (var i = pathLength; i <= this.rangeVal; i++) {
                    var latitude = this.latLongList[i].latitude;
                    var longitude = this.latLongList[i].longitude;
                    console.log('Latitude = ' + latitude + ', longitude = ' + longitude);
                    var locationOnMap = new google.maps.LatLng(latitude, longitude);
                    path.setAt(i, locationOnMap);
                }
            }
            else {
                for (var i = rangeValToCompare; i < pathLength; i++) {
                    path.removeAt(i);
                }
            }
            var currentLatLongSelected = this.latLongList[this.rangeVal];
            var markerLocation = new google.maps.LatLng(currentLatLongSelected.latitude, currentLatLongSelected.longitude);
            this.time = currentLatLongSelected.time;
            //Step 2: Set Marker Position to the latest
            this.marker.setPosition(markerLocation);
            if (!this.map.getBounds().contains(markerLocation)) {
                console.log('Location not within Boundary. Centering Map with new location');
                this.map.setCenter(markerLocation);
            }
        }
        //Set the Path Stroke Color
        // var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
        //Loop and Draw Path Route between the Points on MAP
        // for (var i = 0; i < lat_lng.length; i++) {
        //   if ((i + 1) < lat_lng.length) {
        //     let src = lat_lng[i];
        //     var des = lat_lng[i + 1];
        //     path.push(src);
        //     poly.setPath(path);
        //     service.route({
        //       origin: src,
        //       destination: des,
        //       travelMode: google.maps.DirectionsTravelMode.DRIVING
        //     }, function (result, status) {
        //       if (status == google.maps.DirectionsStatus.OK) {
        //         for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
        //           path.push(result.routes[0].overview_path[i]);
        //         }
        //       }
        //     });
        //   }
        // }
        // }
    };
    TrackingHistoryPage.prototype.getTrackingData = function () {
        console.log('getTrackingData() called');
        console.log('trackDate = ' + this.trackDate);
        this.getTrackingHistoryForTheDay();
    };
    TrackingHistoryPage.prototype.fillDummyData = function () {
        var response = {
            "trackingDate": "2018-12-07",
            "distanceTravelled": "96.9",
            "trackingData": [
                {
                    "time": "12:00 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183003"
                },
                {
                    "time": "12:00 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183040"
                },
                {
                    "time": "12:01 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183100"
                },
                {
                    "time": "12:01 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183110"
                },
                {
                    "time": "12:01 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183120"
                },
                {
                    "time": "12:01 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183134"
                },
                {
                    "time": "12:01 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183146"
                },
                {
                    "time": "12:01 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183157"
                },
                {
                    "time": "12:02 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183209"
                },
                {
                    "time": "12:02 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183219"
                },
                {
                    "time": "12:02 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183231"
                },
                {
                    "time": "12:02 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183245"
                },
                {
                    "time": "12:02 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183255"
                },
                {
                    "time": "12:03 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183305"
                },
                {
                    "time": "12:03 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183321"
                },
                {
                    "time": "12:03 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183330"
                },
                {
                    "time": "12:03 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183343"
                },
                {
                    "time": "12:03 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183353"
                },
                {
                    "time": "12:04 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183409"
                },
                {
                    "time": "12:04 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183420"
                },
                {
                    "time": "12:04 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183431"
                },
                {
                    "time": "12:04 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183442"
                },
                {
                    "time": "12:04 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183452"
                },
                {
                    "time": "12:05 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183513"
                },
                {
                    "time": "12:05 AM",
                    "address": "",
                    "ignition": "0",
                    "latitude": 18.104732,
                    "longitude": 73.989112,
                    "utcDate": "061218",
                    "utcTime": "183523"
                }
            ]
        };
        return response;
    };
    TrackingHistoryPage.DEFAULT_MARKER_ANIMATE_DURATION = 2000;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TrackingHistoryPage.prototype, "mapElement", void 0);
    TrackingHistoryPage = TrackingHistoryPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tracking-history',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\tracking-history\tracking-history.html"*/'<!--\n  Generated template for the TrackingHistoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar" text-center>\n    <ion-title>\n      {{adminUserName}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n\n  <div style="top:0rem;z-index: 999; margin:0;width: 100%;height:8%">\n    <ion-row>\n      <ion-col col-12>\n        <ion-datetime text-center [(ngModel)]="trackDate" displayFormat="DD-MM-YYYY" (ionChange)="getTrackingData()"></ion-datetime>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <div *ngIf="latLongList.length > 0" style="position: fixed; bottom: 0rem; z-index: 99999; margin:10% 0;width: 100%;height:20%">\n    <ion-card no-padding>\n      <ion-card-content>\n\n        <ion-row>\n          <ion-col col-5 class="fm-sub-title">\n            {{trackDate | date : \'dd MMM yyyy\' }}\n          </ion-col>\n          <ion-col col-7 style="font-size: 1.4rem !important" color="semidark">\n            {{time }}\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-item no-padding>\n            <ion-range [min]="min" [max]="max" step="1" snaps="true" [(ngModel)]="rangeVal" color="secondary"\n              (ionChange)="updatePath()">\n              <ion-label range-left style="font-size: 1rem !important" color="light">{{minTime}}</ion-label>\n              <ion-label range-right style="font-size: 1rem !important" color="light">{{maxTime}}</ion-label>\n            </ion-range>\n          </ion-item>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5 class="fm-sub-title">\n            Distance\n          </ion-col>\n          <ion-col col-6 style="font-size: 1.4rem !important" color="semidark">\n            {{distanceTravelled}} Kms\n          </ion-col>\n          <ion-col col-1></ion-col>\n        </ion-row>\n      </ion-card-content>\n    </ion-card>\n  </div>\n  \n  <div *ngIf="latLongList.length == 0" class="pj-empty-page" style="margin-top: 40%;">\n    <ion-icon name="ios-pin-outline"></ion-icon>\n    <h4>No Tracking History For <strong>{{trackDate | date: \'dd MMM yyyy\'}}</strong>.</h4>\n    <h4>Please Select Other Date from Above To View Tracking Data.</h4>\n  </div>\n\n  <div style="height: 70%;" [class.mapDisplay]="latLongList.length == 0" >\n    <div #map id="map"></div>\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\tracking-history\tracking-history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__providers_restservice_restservice__["a" /* RestserviceProvider */]])
    ], TrackingHistoryPage);
    return TrackingHistoryPage;
    var TrackingHistoryPage_1;
}());

//# sourceMappingURL=tracking-history.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password_change_password__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_common_utility_common_utility__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, restService, alertCtrl, commonUtility) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restService = restService;
        this.alertCtrl = alertCtrl;
        this.commonUtility = commonUtility;
        this.verifyPasswordUrl = __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL
            + __WEBPACK_IMPORTED_MODULE_3__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_VERIFY_PSSWD;
        this.isAdmin = false;
        this.doEnableNfc = false;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.naviagteToChangePassword = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Reset Customer',
            message: 'To proceed please enter your password',
            inputs: [
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Proceed',
                    handler: function (data) {
                        console.log('Password Entered : ' + data.password);
                        var dataTopass = {
                            password: data.password
                        };
                        _this.restService.postDetails(_this.verifyPasswordUrl, dataTopass)
                            .subscribe(function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__change_password_change_password__["a" /* ChangePasswordPage */], {
                                isForceChange: false
                            });
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\settings\settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar" text-center>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Settings\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  \n  <ion-list>\n    <button ion-item color="bgcolor" (click)="naviagteToChangePassword()">\n      <h6>Change Password</h6>\n      <ion-icon name="ios-arrow-forward" item-end></ion-icon>\n    </button>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_restservice_restservice__["a" /* RestserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 223;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
Generated class for the ConstantsProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
var ConstantsProvider = /** @class */ (function () {
    function ConstantsProvider(http) {
        this.http = http;
        console.log('Hello ConstantsProvider Provider');
    }
    ConstantsProvider_1 = ConstantsProvider;
    //Common API Constants
    // LOCAL
    // public static API_BASE_URL: string = "http://localhost:8080/sapbasemodule/v1/";
    // STAGING
    ConstantsProvider.API_BASE_URL = "http://67.211.220.180:8080/sapbaseapi/v1/";
    // PRODUCTION
    // public static API_BASE_URL: string = "http://67.211.220.180:8080/sapbaseapi/v1/";
    //API Endpoints
    ConstantsProvider.API_ENDPOINT_ACTIVATE_DEACTIVATE = "activate-deactivate";
    ConstantsProvider.API_ENDPOINT_USERS = "users";
    ConstantsProvider.API_ENDPOINT_TAGS = "tags";
    ConstantsProvider.URL_SEPARATOR = "/";
    ConstantsProvider.URL_PARAM_PAGE_NO = "pageNo=";
    ConstantsProvider.API_ENDPOINT_OAUTH = "oauth/token";
    //API Endpoints
    ConstantsProvider.API_ENDPOINT_ROLES = ConstantsProvider_1.API_ENDPOINT_USERS
        + ConstantsProvider_1.URL_SEPARATOR + "roles";
    ConstantsProvider.API_ENDPOINT_TAG_DTLS = ConstantsProvider_1.API_ENDPOINT_TAGS
        + ConstantsProvider_1.URL_SEPARATOR + "get-details";
    ConstantsProvider.API_ENDPOINT_CREDIT_LIMIT = "credit-limit";
    ConstantsProvider.API_ENDPOINT_RESISSUE = "reissue";
    ConstantsProvider.API_ENDPOINT_VERIFY_PSSWD = ConstantsProvider_1.API_ENDPOINT_USERS
        + ConstantsProvider_1.URL_SEPARATOR + "validate-password";
    ConstantsProvider.API_ENDPOINT_REMOVE_TAG_CUST = "remove-customer";
    ConstantsProvider.API_ENDPOINT_WITHDRAW = "withdraw";
    ConstantsProvider.API_ENDPOINT_PRODUCTS = "products";
    ConstantsProvider.API_ENDPOINT_ORDERS = "orders";
    ConstantsProvider.API_ENDPOINT_TODAYS_SALE = ConstantsProvider_1.API_ENDPOINT_ORDERS
        + ConstantsProvider_1.URL_SEPARATOR + "todays-sale";
    ConstantsProvider.API_ENDPOINT_ORDER_ITEM_DTLS = "order-items";
    ConstantsProvider.API_ENDPOINT_REISSUE = "reissue";
    ConstantsProvider.API_ENDPOINT_CLOSE_DAY = "closeday";
    ConstantsProvider.API_ENDPOINT_LAST_CLOSE_DAY = "lastcloseday";
    ConstantsProvider.API_ENDPOINT_CHANGE_PASS = "change-password";
    ConstantsProvider.API_ENDPOINT_ADMIN_USERS = "admin-users";
    ConstantsProvider.API_ENDPOINT_TRACKING_HISTORY = 'tracking-history?track-date=';
    ConstantsProvider.API_ENDPOINT_USER_CHNG_PWD = "user-change-password";
    ConstantsProvider.API_ENDPOINT_CUST_DTLS = "customers";
    ConstantsProvider.API_ENDPOINT_SETTLE_AMOUNT = "settle-amount";
    ConstantsProvider.API_ENDPOINT_ISSUE_POSTPAID_CREDIT = "issue-credit";
    ConstantsProvider.API_ENDPOINT_SEND_OTP = "send-otp";
    ConstantsProvider.API_ENDPOINT_VERIFY_OTP = "verify-otp";
    ConstantsProvider.API_ENDPOINT_DASHBOARD = "dashboard";
    ConstantsProvider.API_ENDPOINT_REPORTS = "reports";
    ConstantsProvider.API_ENDPOINT_ISSUE_POSTPAID_CARD = "issue-card";
    ConstantsProvider.API_ENDPOINT_CUSTOMER_MGMT = 'customers' + '?' + ConstantsProvider_1.URL_PARAM_PAGE_NO;
    //Scan Card Actions
    ConstantsProvider.SCAN_CARD_PLACE_ORDER = 'placeorder';
    ConstantsProvider.SCAN_CARD_CREDIT_AMT = 'creditamount';
    ConstantsProvider.SCAN_CARD_ISSUE_POSTPAID_CREDIT = "issue-postpaid-credit";
    ConstantsProvider.SCAN_CARD_REISSUE = 'reissue';
    //Master Data JSON key names
    ConstantsProvider.MD_UOM = "uom";
    //ROLES Constants
    ConstantsProvider.ROLE_ADMIN = 'ROLE_ADMIN';
    ConstantsProvider.ROLE_USER = 'ROLE_USER';
    ConstantsProvider.ROLE_SALES = 'ROLE_SALES';
    //CONFIG Constants
    ConstantsProvider.CONFIG_NM_PUMPING_RATE = "doEnableWithdraw";
    ConstantsProvider.SCANNED_TAG_ID = '';
    ConstantsProvider.ENABLE_NFC_READING = false;
    ConstantsProvider.SW_VER = '1.0.0';
    ConstantsProvider.ORDER_CALL = 1;
    ConstantsProvider.BASIC_AUTH_TOKEN = 'c2FwYmFzZW1vZHVsZTpzYXBiYXNlbW9kdWxlLXNlY3JldA==';
    ConstantsProvider = ConstantsProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], ConstantsProvider);
    return ConstantsProvider;
    var ConstantsProvider_1;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/admin-users/admin-users.module": [
		831,
		10
	],
	"../pages/authorizaton-settings/authorizaton-settings.module": [
		832,
		9
	],
	"../pages/background-tracking/background-tracking.module": [
		833,
		0
	],
	"../pages/change-password/change-password.module": [
		834,
		8
	],
	"../pages/contact-update/contact-update.module": [
		835,
		7
	],
	"../pages/customer-mgmt/customer-mgmt.module": [
		836,
		6
	],
	"../pages/login/login.module": [
		837,
		5
	],
	"../pages/modal-au-admin-users/modal-au-admin-users.module": [
		838,
		4
	],
	"../pages/settings/settings.module": [
		839,
		3
	],
	"../pages/tracking-history/tracking-history.module": [
		840,
		2
	],
	"../pages/tracking/tracking.module": [
		841,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 267;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUtilityProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_constants__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CommonUtilityProvider = /** @class */ (function () {
    function CommonUtilityProvider(toastCtrl, alertCtrl, events, loadingCtrl, network) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.isNetworkAvailableFlag = true;
        console.log('Hello CommonUtilityProvider Provider');
    }
    CommonUtilityProvider.prototype.hasRoleInArray = function (rolesArray, role) {
        // console.log('rolesArray = ' + JSON.stringify(rolesArray));
        var isRolePresent = false;
        if (null != rolesArray && rolesArray.length != 0) {
            var rolesArrayLength = rolesArray.length;
            for (var j = 0; j < rolesArrayLength; j++) {
                if (role == rolesArray[j]) {
                    isRolePresent = true;
                }
            }
        }
        return isRolePresent;
    };
    CommonUtilityProvider.prototype.isNetworkAvailable = function () {
        var _this = this;
        if (!this.isNetworkAvailableFlag) {
            var alert_1 = this.alertCtrl.create({
                subTitle: 'No Internet Connection',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'OK',
                        handler: function () {
                            _this.isNetworkAvailable();
                        }
                    }
                ]
            });
            alert_1.present();
        }
        return this.isNetworkAvailableFlag;
    };
    //    isNetworkAvailable() {
    //     if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined) {
    //       let alert = this.alertCtrl.create({
    //           subTitle: 'No Internet Connection',
    //           enableBackdropDismiss: false ,
    //           buttons: [
    //                   {
    //                       text: 'OK',
    //                       handler: () => {
    //                           this.isNetworkAvailable();
    //                       }
    //                   }
    //               ]
    //           });
    //           alert.present();
    //           return false;
    //       } else {
    //           return true;
    //       }  
    //   }
    CommonUtilityProvider.prototype.createLoader = function (message) {
        if (message === void 0) { message = "Please wait..."; }
        return this.loadingCtrl.create({
            content: message
        });
    };
    CommonUtilityProvider.prototype.presentToast = function (messageContent, messageDuration) {
        var toast = this.toastCtrl.create({
            message: messageContent,
            duration: messageDuration
        });
        toast.present();
    };
    CommonUtilityProvider.prototype.presentErrorToast = function (error) {
        var toast = this.toastCtrl.create({
            message: error,
            duration: 5000
        });
        toast.present();
    };
    CommonUtilityProvider.prototype.createBasicAuthHeaderOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpHeaders */]({
            "Authorization": "Basic " + __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].BASIC_AUTH_TOKEN
        });
        console.log("Login Header Options - " + JSON.stringify(headers.get("Authorization")));
        return headers;
    };
    CommonUtilityProvider.prototype.clearStorage = function () {
        localStorage.clear();
    };
    CommonUtilityProvider.prototype.setTokenInStorage = function (data) {
        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    };
    CommonUtilityProvider.prototype.hasRole = function () {
        var rolesToCheck = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rolesToCheck[_i] = arguments[_i];
        }
        console.log('rolesToCheck = ' + rolesToCheck);
        var rolesArray = JSON.parse(localStorage.getItem('roles'));
        console.log('rolesArray = ' + JSON.stringify(rolesArray));
        var isRolePresent = false;
        if (null != rolesArray && rolesArray.length != 0) {
            var rolesToCheckLength = rolesToCheck.length;
            var rolesArrayLength = rolesArray.length;
            for (var i = 0; i < rolesToCheckLength; i++) {
                var roleInCheck = rolesToCheck[i];
                console.log('roleInCheck = ' + roleInCheck);
                for (var j = 0; j < rolesArrayLength; j++) {
                    if (roleInCheck == rolesArray[j]) {
                        isRolePresent = true;
                    }
                }
            }
        }
        else {
            this.events.publish("unauthorized:requestError");
        }
        return isRolePresent;
    };
    CommonUtilityProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */]])
    ], CommonUtilityProvider);
    return CommonUtilityProvider;
}());

//# sourceMappingURL=common-utility.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeocoderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GeocoderProvider = /** @class */ (function () {
    function GeocoderProvider(http, _GEOCODE) {
        this.http = http;
        this._GEOCODE = _GEOCODE;
        console.log('Hello GeocoderProvider Provider');
    }
    /**
      *
      * Perform reverseGeocoding operation and return address details
      *
      * @public
      * @method reverseGeocode
      * @return {Promise}
      *
      */
    GeocoderProvider.prototype.reverseGeocode = function (lat, lng) {
        // alert('Lat = ' + lat + ", Long = " + lng);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].fromPromise(this._GEOCODE.reverseGeocode(lat, lng)
            .then(function (results) {
            // alert('results = ' + JSON.stringify(results));
            var str = "The reverseGeocode address is " + results[0].locality + " in " + results[0].countryCode;
            var resolvedLocality = (results[0].locality == null || results[0].locality == '') ? '' : (results[0].locality + ', ');
            var resolvedAddress = resolvedLocality + results[0].thoroughfare + ', ' + results[0].subAdministrativeArea
                + ', ' + results[0].administrativeArea;
            // alert('resolvedAddress = ' + JSON.stringify(resolvedAddress));
            return resolvedAddress;
        })
            .catch(function (error) {
            alert(JSON.stringify(error));
            // reject(error);
            __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(error);
        }));
    };
    GeocoderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__["a" /* NativeGeocoder */]])
    ], GeocoderProvider);
    return GeocoderProvider;
}());

//# sourceMappingURL=geocoder.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactUpdatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ContactUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContactUpdatePage = /** @class */ (function () {
    function ContactUpdatePage(navCtrl, navParams, formBuilder, view, restService, commonUtility) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.view = view;
        this.restService = restService;
        this.commonUtility = commonUtility;
        this.isContactSubmitted = false;
        this.deviceInfo = 'STATIC_DATA';
        this.referrer = '';
        this.customer = this.navParams.get('customer');
        this.custCntcNum = this.customer.custCntcNum;
        this.referrer = this.navParams.get('referrer');
        console.log('referrer = ' + this.referrer);
        switch (this.referrer) {
            case 'CustomerContactUpdate':
                break;
            default:
                break;
        }
        this.contactUpdateFormGroup = this.formBuilder.group({
            contactNumber: [this.custCntcNum, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            otp: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    ContactUpdatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactUpdatePage');
    };
    ContactUpdatePage.prototype.updateContactAndSendOtp = function () {
        console.log('updateContactAndSendOtp called');
        if (this.commonUtility.isNetworkAvailable()) {
            var udpatedContactNumber = this.contactUpdateFormGroup.controls['contactNumber'].value;
            if (udpatedContactNumber == this.custCntcNum)
                this.commonUtility.presentErrorToast('Please submit the contact No. to update');
            else {
                this.sendOtp('OTP sent successfully to updated contact number', udpatedContactNumber);
            }
        }
    };
    ContactUpdatePage.prototype.sendOtp = function (mssg, contactNumber) {
        var _this = this;
        var sendOtpData = {
            cellnumber: contactNumber,
            deviceInfo: this.deviceInfo
        };
        var sendOtpUrl = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_SEND_OTP;
        this.restService.postDetails(sendOtpUrl, sendOtpData)
            .subscribe(function () {
            _this.isContactSubmitted = true;
            _this.commonUtility.presentToast(mssg, 3000);
        });
    };
    ContactUpdatePage.prototype.updateContact = function () {
        var _this = this;
        console.log('updateContact called');
        if (this.commonUtility.isNetworkAvailable()) {
            var otpSubmitted = this.contactUpdateFormGroup.controls['otp'].value;
            var udpatedContactNumber_1 = this.contactUpdateFormGroup.controls['contactNumber'].value;
            console.log('conatctNum = ' + udpatedContactNumber_1 + ', otp = ' + otpSubmitted + ', custId = '
                + this.customer.custDtlsId);
            var verifyOtpData = {
                cellnumber: udpatedContactNumber_1,
                deviceInfo: this.deviceInfo,
                otp: otpSubmitted
            };
            var verifyOtpUrl = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_CUST_DTLS
                + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + this.customer.custDtlsId
                + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_VERIFY_OTP;
            this.restService.postDetails(verifyOtpUrl, verifyOtpData)
                .subscribe(function () {
                _this.isContactSubmitted = true;
                switch (_this.referrer) {
                    case 'CustomerContactUpdate':
                        _this.commonUtility.presentToast('Contact Number Updated Successfully', 3000);
                        break;
                    default:
                        break;
                }
                var modalData = {
                    contactNumber: udpatedContactNumber_1,
                    isAdded: true
                };
                _this.view.dismiss(modalData);
            });
        }
    };
    ContactUpdatePage.prototype.dismissModal = function () {
        var modalData = {
            isAdded: false
        };
        this.view.dismiss(modalData);
    };
    ContactUpdatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact-update',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\contact-update\contact-update.html"*/'<!--\n  Generated template for the ContactUpdatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar" text-center>\n    <ion-title>\n      Update Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid no-padding style="margin-top: 45%;">\n\n    <ion-row *ngIf="!isContactSubmitted">\n      <ion-col col-12 padding text-center style="font-style: italic">\n        Enter the updated contact number to receive OTP\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="isContactSubmitted">\n      <ion-col col-12 padding text-center style="font-style: italic">\n        Enter the OTP received on mentioned contact number\n      </ion-col>\n    </ion-row>\n\n    <form [formGroup]="contactUpdateFormGroup">\n\n      <ion-row>\n\n        <ion-col col-12>\n          <ion-item>\n            <ion-label floating class="pj-floating-label">Contact Number*</ion-label>\n            <ion-input type="number" [disabled]="isContactSubmitted" formControlName="contactNumber"></ion-input>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="isContactSubmitted">\n\n        <ion-col col-12>\n          <ion-item>\n            <ion-label floating class="pj-floating-label">OTP*</ion-label>\n            <ion-input type="number" formControlName="otp"></ion-input>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="!isContactSubmitted">\n        <ion-col col-6>\n          <button ion-button class="pj-button-danger" type="button" (click)="dismissModal()">CANCEL</button>\n        </ion-col>\n        <ion-col col-6>\n          <button ion-button class="pj-button" type="button" (click)="updateContactAndSendOtp()">SEND OTP</button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="isContactSubmitted">\n        <ion-col col-6>\n          <button ion-button class="pj-button-danger" type="button" (click)="dismissModal()">CANCEL</button>\n        </ion-col>\n        <ion-col col-6>\n          <button ion-button class="pj-button" type="button" [disabled]="!contactUpdateFormGroup.valid" (click)="updateContact()">SUBMIT</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\contact-update\contact-update.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_restservice_restservice__["a" /* RestserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */]])
    ], ContactUpdatePage);
    return ContactUpdatePage;
}());

//# sourceMappingURL=contact-update.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(429);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_interceptor_interceptor__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_authorizaton_settings_authorizaton_settings__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_change_password_change_password__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_admin_users_admin_users__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_modal_au_admin_users_modal_au_admin_users__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_contact_update_contact_update__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_tracking_tracking__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_tracking_history_tracking_history__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_geocoder_geocoder__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_native_geocoder__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_customer_mgmt_customer_mgmt__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_location_tracker_location_tracker__ = __webpack_require__(830);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_authorizaton_settings_authorizaton_settings__["a" /* AuthorizatonSettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_admin_users_admin_users__["a" /* AdminUsersPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_modal_au_admin_users_modal_au_admin_users__["a" /* ModalAuAdminUsersPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_contact_update_contact_update__["a" /* ContactUpdatePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tracking_tracking__["a" /* TrackingPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_tracking_history_tracking_history__["a" /* TrackingHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_customer_mgmt_customer_mgmt__["a" /* CustomerMgmtPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/admin-users/admin-users.module#AdminUsersPageModule', name: 'AdminUsersPage', segment: 'admin-users', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/authorizaton-settings/authorizaton-settings.module#AuthorizatonSettingsPageModule', name: 'AuthorizatonSettingsPage', segment: 'authorizaton-settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/background-tracking/background-tracking.module#BackgroundTrackingPageModule', name: 'BackgroundTrackingPage', segment: 'background-tracking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact-update/contact-update.module#ContactUpdatePageModule', name: 'ContactUpdatePage', segment: 'contact-update', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-mgmt/customer-mgmt.module#CustomerMgmtPageModule', name: 'CustomerMgmtPage', segment: 'customer-mgmt', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-au-admin-users/modal-au-admin-users.module#ModalAuAdminUsersPageModule', name: 'ModalAuAdminUsersPage', segment: 'modal-au-admin-users', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tracking-history/tracking-history.module#TrackingHistoryPageModule', name: 'TrackingHistoryPage', segment: 'tracking-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tracking/tracking.module#TrackingPageModule', name: 'TrackingPage', segment: 'tracking', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_authorizaton_settings_authorizaton_settings__["a" /* AuthorizatonSettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_admin_users_admin_users__["a" /* AdminUsersPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_modal_au_admin_users_modal_au_admin_users__["a" /* ModalAuAdminUsersPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_contact_update_contact_update__["a" /* ContactUpdatePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tracking_tracking__["a" /* TrackingPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_tracking_history_tracking_history__["a" /* TrackingHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_customer_mgmt_customer_mgmt__["a" /* CustomerMgmtPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_restservice_restservice__["a" /* RestserviceProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_13__providers_constants_constants__["a" /* ConstantsProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: __WEBPACK_IMPORTED_MODULE_11__providers_interceptor_interceptor__["a" /* InterceptorProvider */], multi: true },
                __WEBPACK_IMPORTED_MODULE_22__providers_geocoder_geocoder__["a" /* GeocoderProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                // BackgroundGeolocation,
                __WEBPACK_IMPORTED_MODULE_25__providers_location_tracker_location_tracker__["a" /* LocationTrackerProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestserviceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_constants__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the RestserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestserviceProvider = /** @class */ (function () {
    function RestserviceProvider(http, commonUtility) {
        this.http = http;
        this.commonUtility = commonUtility;
        console.log('Hello RestserviceProvider Provider');
    }
    RestserviceProvider.prototype.doLoginRequest = function (userName, password) {
        var _this = this;
        var header = this.commonUtility.createBasicAuthHeaderOptions();
        var loginUrl = __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_OAUTH
            + '?username=' + userName + '&password=' + password + '&grant_type=password';
        return this.http.post(loginUrl, '', { headers: header })
            .map(function (response) {
            console.log("In login" + JSON.stringify(response));
            _this.commonUtility.setTokenInStorage(response);
            return true;
        })
            .catch(function (err) {
            var loginDetails = err;
            console.log("login Error - " + JSON.stringify(loginDetails));
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(loginDetails);
        });
    };
    RestserviceProvider.prototype.getDetails = function (url) {
        var _this = this;
        console.log('Get URL -> ' + url);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(url)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.postDetails = function (url, data) {
        var _this = this;
        console.log('Post URL -> ' + url);
        console.log('Post Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(url, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.putDetails = function (url, data) {
        var _this = this;
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(url, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.deleteDetails = function (url, data) {
        var _this = this;
        console.log('Delete URL -> ' + url);
        console.log('Delete Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(url, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__common_utility_common_utility__["a" /* CommonUtilityProvider */]])
    ], RestserviceProvider);
    return RestserviceProvider;
}());

//# sourceMappingURL=restservice.js.map

/***/ }),

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_authorizaton_settings_authorizaton_settings__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_admin_users_admin_users__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_customer_mgmt_customer_mgmt__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var config = {
    apiKey: 'AIzaSyAwE6RUI2st4uTM40fotjuPJVRJNfuayko',
    authDomain: 'geotracker-86b5d.firebaseapp.com',
    databaseURL: 'https://geotracker-86b5d.firebaseio.com/',
    projectId: 'geotracker-86b5d',
    storageBucket: 'gs://geotracker-86b5d.appspot.com',
};
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, commonUtility, events, geolocation) {
        var _this = this;
        this.commonUtility = commonUtility;
        this.events = events;
        this.geolocation = geolocation;
        this.pages = [];
        this.swVersion = __WEBPACK_IMPORTED_MODULE_8__providers_constants_constants__["a" /* ConstantsProvider */].SW_VER;
        console.log('Refresh Token = ' + localStorage.getItem('refresh-token'));
        this.rootPage = localStorage.getItem('refresh-token') == null ? __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */] : __WEBPACK_IMPORTED_MODULE_9__pages_authorizaton_settings_authorizaton_settings__["a" /* AuthorizatonSettingsPage */];
        // this.pages = [
        //   { title: 'Logout', component: LoginPage },
        // ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_4_Firebase__["initializeApp"](config);
        console.log('Subscribing unauthorized:requestError event');
        this.events.subscribe("unauthorized:requestError", function () {
            _this.commonUtility.clearStorage();
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
        });
        this.events.subscribe("rolesUpdated", function () {
            console.log('Subscribed Event rolesUpdated called');
            _this.getSideMenuOptionsByRole();
            // if (this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES))
            //   this.updateCurrentLocation();
        });
    }
    // updateCurrentLocation() {
    //   setTimeout(() => {
    //     this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
    //       .then((resp) => {
    //         alert('Latitude = ' + resp.coords.latitude + ', Longitude = ' + resp.coords.longitude);
    //         console.log('Latitude = ' + resp.coords.latitude + ', Longitude = ' + resp.coords.longitude);
    //         let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    //       });
    //   }, 5000)
    // }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.nav.setRoot(page.component);
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.getSideMenuOptionsByRole = function () {
        this.pages = [];
        if (this.commonUtility.hasRole(__WEBPACK_IMPORTED_MODULE_8__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_ADMIN)) {
            console.log('Admin Role Matched');
            this.pages.push(
            // { title: 'Tag Mgmt', component: TagMgmtPage },
            { title: 'Customer Management', component: __WEBPACK_IMPORTED_MODULE_12__pages_customer_mgmt_customer_mgmt__["a" /* CustomerMgmtPage */] }, { title: 'Users Mgmt', component: __WEBPACK_IMPORTED_MODULE_11__pages_admin_users_admin_users__["a" /* AdminUsersPage */] }, { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__["a" /* SettingsPage */] });
        }
        else if (this.commonUtility.hasRole(__WEBPACK_IMPORTED_MODULE_8__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_SALES)) {
            console.log('ROLE_SALES Matched');
            this.pages.push({ title: 'Customer Management', component: __WEBPACK_IMPORTED_MODULE_12__pages_customer_mgmt_customer_mgmt__["a" /* CustomerMgmtPage */] }, { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__["a" /* SettingsPage */] });
        }
        else {
            console.log('No Roles Matched');
            this.events.publish("unauthorized:requestError");
        }
        this.pages.push({ title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */] });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\app\app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar color="navbar">\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose style="background-color:#2F3C51; color:#E4EBED" ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n    <ion-footer style="background-color: #1c2431 !important; color:#fff;">\n        <h6 text-center>{{swVersion}}</h6>\n    </ion-footer>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpResponseError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterceptorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_constants__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpResponseError = /** @class */ (function () {
    function HttpResponseError() {
    }
    return HttpResponseError;
}());

var InterceptorProvider = /** @class */ (function () {
    function InterceptorProvider(alertCtrl, http, commonUtility, events) {
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.commonUtility = commonUtility;
        this.events = events;
    }
    // Intercepts all HTTP requests!
    InterceptorProvider.prototype.intercept = function (request, next) {
        var _this = this;
        console.log('Interceptor Called');
        var token = localStorage.getItem('token');
        console.log('Token = ' + token);
        var clonedReq = this.addToken(request, token);
        return next.handle(clonedReq)
            .catch(function (error) {
            var title = 'Error';
            var message = 'Server Error Occured';
            var errorStatus = error.status;
            console.log('Error = ' + JSON.stringify(error));
            console.log('Error Status = ' + errorStatus);
            if (errorStatus == 0) {
                message = 'Cannot make server calls now. Please exit and open the app again.';
            }
            else if (errorStatus == 400) {
                //TODO: Remove hard-coded string
                if (error.error.error_description.toLowerCase() == 'bad credentials') {
                    message = 'Invalid Username/Password';
                }
                else {
                    message = 'Invalid Request Format';
                }
            }
            else if (errorStatus == 401) {
                return _this.refreshTokenAndRetryRequest(next, request);
            }
            else if (errorStatus == 402) {
                message = error.error.responseMessage.message;
            }
            var alert = _this.alertCtrl.create({
                title: title,
                message: message,
                buttons: ['OK']
            });
            alert.present();
            // Pass the error to the caller of the function
            return Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw__["_throw"])(error);
        });
    };
    // Adds the token to your headers if it exists
    InterceptorProvider.prototype.addToken = function (request, token) {
        if (token) {
            console.log('Adding Token - ' + token);
            var clone = void 0;
            clone = request.clone({
                setHeaders: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    Authorization: "Bearer " + token
                }
            });
            return clone;
        }
        console.log('Returning Request Without Token');
        return request;
    };
    InterceptorProvider.prototype.makeRefreshTokenCall = function (refreshTokenUrl, headers) {
        var _this = this;
        return this.http.post(refreshTokenUrl, '', { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) {
            console.log("RefreshToken Error - " + JSON.stringify(err));
            console.log('Publishing unauthorized:requestError event');
            _this.events.publish("unauthorized:requestError");
            return Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw__["_throw"])(err);
        });
    };
    InterceptorProvider.prototype.refreshTokenAndRetryRequest = function (next, request) {
        var _this = this;
        var refreshToken = localStorage.getItem('refresh-token');
        this.commonUtility.clearStorage();
        if (refreshToken) {
            var headers = this.commonUtility.createBasicAuthHeaderOptions();
            var refreshTokenUrl = __WEBPACK_IMPORTED_MODULE_6__constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_6__constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_OAUTH
                + '?grant_type=refresh_token&refresh_token=' + refreshToken;
            return this.makeRefreshTokenCall(refreshTokenUrl, headers)
                .switchMap(function (response) {
                if (response.access_token) {
                    _this.commonUtility.setTokenInStorage(response);
                    var clonedReq = _this.addToken(request, response.access_token);
                    return next.handle(clonedReq);
                }
            })
                .catch(function (error) {
                // If there is an exception calling 'refreshToken', bad news so logout.
                console.log('Refresh Token Error Occured');
                _this.events.publish("unauthorized:requestError");
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error);
            });
        }
        else {
            console.log('No Refresh Token');
            this.events.publish("unauthorized:requestError");
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw({ error: 'No Refresh Token' });
        }
    };
    InterceptorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* Events */]])
    ], InterceptorProvider);
    return InterceptorProvider;
}());

//# sourceMappingURL=interceptor.js.map

/***/ }),

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationTrackerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LocationTrackerProvider = /** @class */ (function () {
    function LocationTrackerProvider(http) {
        this.http = http;
        console.log('Hello LocationTrackerProvider Provider');
    }
    LocationTrackerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], LocationTrackerProvider);
    return LocationTrackerProvider;
}());

//# sourceMappingURL=location-tracker.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminUsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__custom_base_component__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_utility_common_utility__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modal_au_admin_users_modal_au_admin_users__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_restservice_restservice__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tracking_tracking__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common___ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tracking_history_tracking_history__ = __webpack_require__(211);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the AdminUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdminUsersPage = /** @class */ (function (_super) {
    __extends(AdminUsersPage, _super);
    function AdminUsersPage(navCtrl, navParams, commonUtility, http, modal, restService, alertCtrl) {
        var _this = _super.call(this, __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_USERS + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR
            + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_ADMIN_USERS, commonUtility, http, null) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.commonUtility = commonUtility;
        _this.http = http;
        _this.modal = modal;
        _this.restService = restService;
        _this.alertCtrl = alertCtrl;
        _this.adminUsersList = [];
        _this.originalAdminUsersList = [];
        _this.myInput = '';
        _this.isUsersLoaded = false;
        _this.verifyPasswordUrl = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL
            + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_VERIFY_PSSWD;
        _this.getAllPaginated(1)
            .subscribe(function (response) {
            _this.adminUsersList = response.usersList;
            _this.originalAdminUsersList = _this.adminUsersList;
            console.log('Admin Users = ' + JSON.stringify(_this.adminUsersList));
            _this.isUsersLoaded = true;
        });
        return _this;
    }
    AdminUsersPage_1 = AdminUsersPage;
    AdminUsersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminUsersPage');
    };
    AdminUsersPage.prototype.isAdmin = function (adminUsers) {
        var roleArray = adminUsers.roles;
        var rolesToPass = [];
        roleArray.forEach(function (roleElem) {
            rolesToPass.push(roleElem.rolesMasterDtlsId);
        });
        if (this.commonUtility.hasRoleInArray(rolesToPass, __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_ADMIN))
            return true;
        else
            return false;
    };
    AdminUsersPage.prototype.isSales = function (adminUsers) {
        var roleArray = adminUsers.roles;
        var rolesToPass = [];
        roleArray.forEach(function (roleElem) {
            rolesToPass.push(roleElem.rolesMasterDtlsId);
        });
        if (this.commonUtility.hasRoleInArray(rolesToPass, __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_SALES))
            return true;
        else
            return false;
    };
    AdminUsersPage.prototype.udpateAdminUser = function (adminUsers) {
        console.log('udpateAdminUser called');
        var roleArray = adminUsers.roles;
        var rolesToPass;
        roleArray.forEach(function (roleElem) {
            if (roleElem.rolesMasterDtlsId != __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_USER)
                rolesToPass = roleElem.rolesMasterDtlsId;
        });
        var adminUserDetails = {
            userLoginDtlsId: adminUsers.userLoginDtlsId,
            userDtlsId: adminUsers.userDtl.userDtlsId,
            contactNum: adminUsers.contactNum,
            firstName: adminUsers.userDtl.firstName,
            lastName: adminUsers.userDtl.lastName,
            password: adminUsers.password,
            rolesMasterDtlsId: rolesToPass,
            emailId: ''
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__modal_au_admin_users_modal_au_admin_users__["a" /* ModalAuAdminUsersPage */], {
            adminUserDetails: adminUserDetails,
            isAddOperation: false
        });
    };
    AdminUsersPage.prototype.changeAdminUserPassword = function (adminUsers) {
        var _this = this;
        console.log('changeAdminUserPassword called');
        var confirm = this.alertCtrl.create({
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
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Proceed',
                    handler: function (data) {
                        console.log('Proceed clicked. Password Entered: '
                            + data.password);
                        var resetPasswordUrl = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_USERS
                            + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].URL_SEPARATOR + __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_USER_CHNG_PWD;
                        var resetPasswordData = {
                            userLoginDtlsId: adminUsers.userLoginDtlsId,
                            password: data.password
                        };
                        // this.getAllSubResource(this.tagDtls.tagDtlsId)
                        _this.restService.postDetails(resetPasswordUrl, resetPasswordData)
                            .subscribe(function () {
                            _this.commonUtility.presentToast('Password Reset Successfully', 5000);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    AdminUsersPage.prototype.addAdminUser = function () {
        // this.createAdminUserModal(true, null);
        var adminUserModalData = null;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__modal_au_admin_users_modal_au_admin_users__["a" /* ModalAuAdminUsersPage */], {
            adminUserDetails: adminUserModalData,
            isAddOperation: true
        });
    };
    AdminUsersPage.prototype.updateAdminUser = function (adminUser) {
        // this.createAdminUserModal(false, adminUser);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__modal_au_admin_users_modal_au_admin_users__["a" /* ModalAuAdminUsersPage */], {
            adminUserDetails: adminUser,
            isAddOperation: false
        });
    };
    AdminUsersPage.prototype.createAdminUserModal = function (isAddOperation, adminUserDetails) {
        var _this = this;
        var adminUserModalData = null;
        if (adminUserDetails != null) {
            var roleToPassModal = void 0;
            if (this.isSales(adminUserDetails))
                roleToPassModal = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_SALES;
            else if (this.isAdmin(adminUserDetails))
                roleToPassModal = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_ADMIN;
            adminUserModalData = {
                userLoginDtlsId: adminUserDetails.userLoginDtlsId,
                userDtlsId: adminUserDetails.userDtl.userDtlsId,
                contactNum: adminUserDetails.contactNum,
                firstName: adminUserDetails.userDtl.firstName,
                lastName: adminUserDetails.userDtl.lastName,
                rolesMasterDtlsId: roleToPassModal
            };
        }
        var adminDetailsModal = this.modal.create(__WEBPACK_IMPORTED_MODULE_6__modal_au_admin_users_modal_au_admin_users__["a" /* ModalAuAdminUsersPage */], {
            adminUserDetails: adminUserModalData,
            isAddOperation: isAddOperation
        });
        adminDetailsModal.present();
        adminDetailsModal.onDidDismiss(function (adminUserDetailsModalData) {
            console.log('Data = ' + JSON.stringify(adminUserDetailsModalData));
            if (adminUserDetailsModalData.isAdded) {
                // this.initializeAdminDetails();
                var adminUserDetailsFromModal = adminUserDetailsModalData.adminUserDetails;
                var rolesToSubmit = [];
                rolesToSubmit.push(__WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_USER);
                rolesToSubmit.push(adminUserDetailsFromModal.rolesMasterDtlsId);
                var dataForCreate = {
                    userLoginDtlsId: adminUserDetailsFromModal.userLoginDtlsId,
                    userDtlsId: adminUserDetailsFromModal.userDtlsId,
                    contactNum: adminUserDetailsFromModal.contactNum,
                    firstName: adminUserDetailsFromModal.firstName,
                    lastName: adminUserDetailsFromModal.lastName,
                    rolesMasterDtlsId: rolesToSubmit
                };
                if (isAddOperation) {
                    _this.create(dataForCreate)
                        .subscribe(function () {
                        _this.navCtrl.pop();
                        _this.navCtrl.push(AdminUsersPage_1);
                    });
                }
                else {
                    _this.update(dataForCreate)
                        .subscribe(function () {
                        _this.navCtrl.pop();
                        _this.navCtrl.push(AdminUsersPage_1);
                    });
                }
            }
        });
    };
    AdminUsersPage.prototype.onInput = function () {
        console.log('searchTerm = ' + this.myInput);
        var searchVal = this.myInput;
        // if the value is an empty string don't filter the items
        if (searchVal && searchVal.trim() != '') {
            this.adminUsersList = this.originalAdminUsersList.filter(function (userDetails) {
                var searchValLowerCase = searchVal.toLowerCase();
                if (userDetails.userDtl.firstName.toLowerCase().indexOf(searchValLowerCase) > -1
                    || (userDetails.userDtl.lastName != null && userDetails.userDtl.lastName.toLowerCase().indexOf(searchValLowerCase) > -1))
                    return true;
                else
                    return false;
            });
            console.log('User List Length = ' + this.adminUsersList.length);
        }
        else {
            this.adminUsersList = this.originalAdminUsersList;
        }
    };
    AdminUsersPage.prototype.navigateToTrackingView = function (adminUser) {
        console.log('Admin User' + JSON.stringify(adminUser));
        if (this.commonUtility.isNetworkAvailable()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__tracking_tracking__["a" /* TrackingPage */], {
                firebaseId: adminUser.firebaseId,
                // firebaseId: '-LO25JjhKHcpEHRpK448',
                adminUser: adminUser
            });
        }
    };
    AdminUsersPage.prototype.showFirebaseIdNotPresentAlert = function () {
        this.commonUtility.presentToast('No Tracking Data Associated With This User.', 3000);
    };
    AdminUsersPage.prototype.showTodaysTrackingRecord = function (adminUser) {
        var pipe = new __WEBPACK_IMPORTED_MODULE_9__angular_common___["d" /* DatePipe */]('en-US'); // Use your own locale
        var now = Date.now();
        var myFormattedDate = pipe.transform(now, 'yyyy-MM-dd');
        console.log('myFormattedDate = ' + myFormattedDate);
        if (this.commonUtility.isNetworkAvailable()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__tracking_history_tracking_history__["a" /* TrackingHistoryPage */], {
                adminUser: adminUser,
                trackDate: myFormattedDate
            });
        }
    };
    AdminUsersPage = AdminUsersPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin-users',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\admin-users\admin-users.html"*/'<!--\n  Generated template for the AdminUsersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="navbar" text-center>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Users\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar *ngIf="adminUsersList.length > 0 || isUsersLoaded" [(ngModel)]="myInput" (ionChange)="onInput()"\n    placeholder="Search By Name">\n  </ion-searchbar>\n\n  <div *ngIf="adminUsersList.length==0 && isUsersLoaded" class="pj-empty-page" style="margin-top: 40%;">\n    <ion-icon name="ios-contact-outline"></ion-icon>\n    <h4>No Users To Show</h4>\n\n    <ion-row>\n      <ion-col col-12>\n        <button ion-button class="pj-button" type="button" (click)="addAdminUser()">ADD ONE ?</button>\n      </ion-col>\n    </ion-row>\n\n  </div>\n\n  <ion-card *ngFor="let adminUsers of adminUsersList">\n\n    <ion-card-header>\n      <ion-row>\n        <ion-col col-12>\n          <strong>{{adminUsers.userDtl.firstName}} {{adminUsers.userDtl.lastName}}</strong>\n        </ion-col>\n      </ion-row>\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-row>\n        <ion-col col-5>\n          UserName\n        </ion-col>\n        <ion-col col-7>\n          {{adminUsers.contactNum}}\n        </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="isSales(adminUsers)">\n        <ion-col col-5>\n          Role\n        </ion-col>\n        <ion-col col-7>\n          Sales Executive\n        </ion-col>\n      </ion-row>\n\n\n      <ion-row *ngIf="isAdmin(adminUsers)">\n        <ion-col col-5>\n          Role\n        </ion-col>\n        <ion-col col-7>\n          Admin\n        </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="isSales(adminUsers)">\n        <ion-col col-5>\n          Todays Travel\n        </ion-col>\n        <ion-col col-5>\n          {{adminUsers.distanceTravelled}} Km\n        </ion-col>\n        <ion-col col-2 (click)="showTodaysTrackingRecord(adminUsers)">\n          <ion-icon name="ios-pin-outline"></ion-icon>\n        </ion-col>\n      </ion-row>\n\n    </ion-card-content>\n\n    <ion-row>\n      <ion-col col-4 text-center (click)="udpateAdminUser(adminUsers)">\n        <ion-icon name="md-create" color="primary"></ion-icon>\n      </ion-col>\n      <ion-col col-4 text-center (click)="changeAdminUserPassword(adminUsers)">\n        <ion-icon name="md-lock" color="primary"></ion-icon>\n      </ion-col>\n\n      <ion-col col-4 text-center >\n          <!-- <ion-icon name="ios-navigate" color="primary" (click)="navigateToTrackingView(adminUsers)"></ion-icon> -->\n          <ion-icon *ngIf="adminUsers?.firebaseId != null"  name="ios-navigate" color="primary" (click)="navigateToTrackingView(adminUsers)"></ion-icon>\n          <ion-icon *ngIf="adminUsers?.firebaseId == null" (click)="showFirebaseIdNotPresentAlert()" name="ios-navigate" color="light"></ion-icon>\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n  <!-- Infinite Scroll Content -->\n  <!-- <ion-infinite-scroll (ionInfinite)="getRecordsPaginated($event)">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading Users...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll> -->\n\n\n  <!-- Add Product Button -->\n  <ion-fab *ngIf="adminUsersList.length > 0" bottom right (click)="addAdminUser()">\n    <button color="primary" ion-fab>\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\admin-users\admin-users.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_restservice_restservice__["a" /* RestserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AdminUsersPage);
    return AdminUsersPage;
    var AdminUsersPage_1;
}(__WEBPACK_IMPORTED_MODULE_2__custom_base_component__["a" /* BaseComponent */]));

//# sourceMappingURL=admin-users.js.map

/***/ })

},[424]);
//# sourceMappingURL=main.js.map