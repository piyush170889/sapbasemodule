webpackJsonp([48],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestserviceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_constants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { DatabaseProvider } from '../database/database';
/*
  Generated class for the RestserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestserviceProvider = /** @class */ (function () {
    function RestserviceProvider(http, events, loadingCtrl, network, toastCtrl, alertCtrl) {
        this.http = http;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        console.log('Hello RestserviceProvider Provider');
    }
    RestserviceProvider.prototype.doLoginRequest = function (userName, password) {
        var _this = this;
        // let header = this.commonUtility.createBasicAuthHeaderOptions();
        var header = this.createBasicAuthHeaderOptions();
        var loginUrl = __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_OAUTH
            + '?username=' + userName + '&password=' + password + '&grant_type=password';
        return this.http.post(loginUrl, '', { headers: header })
            .map(function (response) {
            console.log("In login" + JSON.stringify(response));
            _this.setTokenInStorage(response);
            // this.commonUtility.setTokenInStorage(response);
            // TODO: Update Logic For Synchronous Execution
            // this.databaseProvider.setTokenInDb(response);
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
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(url)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                // this.commonUtility.presentErrorToast(err);
                _this.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.getDetailsWithoutLoader = function (url) {
        var _this = this;
        console.log('Get URL -> ' + url);
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            return this.http.get(url)
                .map(function (response) {
                return response;
            })
                .catch(function (err) {
                console.log("Error - " + JSON.stringify(err));
                _this.presentErrorToast(err);
                // this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.postDetails = function (url, data) {
        var _this = this;
        console.log('Post URL -> ' + url);
        console.log('Post Data -> ' + JSON.stringify(data));
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(url, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.presentErrorToast(err);
                // this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.putDetails = function (url, data) {
        var _this = this;
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        // if (this.commonUtility.isNetworkAvailable()) {
        if (this.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(url, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.presentErrorToast(err);
                // this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.putLocationDetails = function (url, data) {
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            // this.loader = this.commonUtility.createLoader();
            // this.loader.present();
            return this.http.put(url, data)
                .map(function (response) {
                // this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                // this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                // this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    RestserviceProvider.prototype.deleteDetails = function (url, data) {
        var _this = this;
        console.log('Delete URL -> ' + url);
        console.log('Delete Data -> ' + JSON.stringify(data));
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(url, data)
                .map(function (response) {
                _this.loader.dismiss();
                return response;
            })
                .catch(function (err) {
                _this.loader.dismiss();
                console.log("Error - " + JSON.stringify(err));
                _this.presentErrorToast(err);
                // this.commonUtility.presentErrorToast(err);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(err);
            });
        }
    };
    /* HELPER METHODS */
    RestserviceProvider.prototype.setTokenInStorage = function (data) {
        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    };
    // isNetworkAvailable() {
    //     if (!this.isNetworkAvailableFlag) {
    //         let alert = this.alertCtrl.create({
    //             subTitle: 'No Internet Connection',
    //             enableBackdropDismiss: false,
    //             buttons: [
    //                 {
    //                     text: 'OK',
    //                     handler: () => {
    //                         this.isNetworkAvailable();
    //                     }
    //                 }
    //             ]
    //         });
    //         alert.present();
    //     }
    //     return this.isNetworkAvailableFlag;
    // }
    RestserviceProvider.prototype.isNetworkAvailable = function () {
        var _this = this;
        if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined) {
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
            return false;
        }
        else {
            return true;
        }
    };
    RestserviceProvider.prototype.createBasicAuthHeaderOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpHeaders */]({
            "Authorization": "Basic " + __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].BASIC_AUTH_TOKEN
        });
        console.log("Login Header Options - " + JSON.stringify(headers.get("Authorization")));
        return headers;
    };
    RestserviceProvider.prototype.presentToast = function (messageContent, messageDuration) {
        var toast = this.toastCtrl.create({
            message: messageContent,
            duration: messageDuration
        });
        toast.present();
    };
    RestserviceProvider.prototype.presentErrorToast = function (error) {
        var toast = this.toastCtrl.create({
            message: error,
            duration: 5000
        });
        toast.present();
    };
    RestserviceProvider.prototype.createLoader = function (message) {
        if (message === void 0) { message = "Please wait..."; }
        return this.loadingCtrl.create({
            content: message
        });
    };
    RestserviceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], RestserviceProvider);
    return RestserviceProvider;
}());

//# sourceMappingURL=restservice.js.map

/***/ }),

/***/ 171:
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
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-delivery/add-delivery.module": [
		820,
		47
	],
	"../pages/admin-users/admin-users.module": [
		856,
		16
	],
	"../pages/aging-filter-popover/aging-filter-popover.module": [
		821,
		46
	],
	"../pages/aging-report-filters/aging-report-filters.module": [
		822,
		45
	],
	"../pages/authorizaton-settings/authorizaton-settings.module": [
		823,
		44
	],
	"../pages/brand-filter-modal/brand-filter-modal.module": [
		824,
		14
	],
	"../pages/change-password/change-password.module": [
		825,
		43
	],
	"../pages/contact-update/contact-update.module": [
		826,
		42
	],
	"../pages/cust-filter-modal/cust-filter-modal.module": [
		827,
		41
	],
	"../pages/customer-aging-report/customer-aging-report.module": [
		857,
		8
	],
	"../pages/customer-details/customer-details.module": [
		864,
		7
	],
	"../pages/customer-mgmt/customer-mgmt.module": [
		865,
		13
	],
	"../pages/customer-selection/customer-selection.module": [
		828,
		12
	],
	"../pages/customer-summary-report/customer-summary-report.module": [
		829,
		40
	],
	"../pages/download-details/download-details.module": [
		830,
		0
	],
	"../pages/generate-pin-review/generate-pin-review.module": [
		831,
		39
	],
	"../pages/invoice-details/invoice-details.module": [
		866,
		6
	],
	"../pages/invoice-listing-settings-popover/invoice-listing-settings-popover.module": [
		832,
		38
	],
	"../pages/invoices-listing/invoices-listing.module": [
		858,
		5
	],
	"../pages/ledger-date-selection/ledger-date-selection.module": [
		833,
		37
	],
	"../pages/ledger-listing-details/ledger-listing-details.module": [
		859,
		4
	],
	"../pages/locations-details/locations-details.module": [
		834,
		36
	],
	"../pages/locations/locations.module": [
		860,
		35
	],
	"../pages/login/login.module": [
		861,
		34
	],
	"../pages/modal-add-item/modal-add-item.module": [
		835,
		11
	],
	"../pages/modal-au-admin-users/modal-au-admin-users.module": [
		836,
		15
	],
	"../pages/modal-ledger-options/modal-ledger-options.module": [
		837,
		33
	],
	"../pages/month-filter-modal/month-filter-modal.module": [
		838,
		32
	],
	"../pages/order-add/order-add.module": [
		839,
		31
	],
	"../pages/order-details/order-details.module": [
		840,
		30
	],
	"../pages/order-mgmt/order-mgmt.module": [
		841,
		29
	],
	"../pages/orders-booked/orders-booked.module": [
		842,
		28
	],
	"../pages/pending-invoices-filter/pending-invoices-filter.module": [
		844,
		27
	],
	"../pages/pending-invoices/pending-invoices.module": [
		843,
		3
	],
	"../pages/placeaddress/placeaddress.module": [
		845,
		26
	],
	"../pages/popover-sort-filters/popover-sort-filters.module": [
		846,
		25
	],
	"../pages/popover-sort-visit/popover-sort-visit.module": [
		847,
		24
	],
	"../pages/punch-entry/punch-entry.module": [
		848,
		10
	],
	"../pages/punch-exit/punch-exit.module": [
		849,
		23
	],
	"../pages/saleemp-filter-modal/saleemp-filter-modal.module": [
		850,
		22
	],
	"../pages/settings/settings.module": [
		851,
		21
	],
	"../pages/signaturepad/signaturepad.module": [
		852,
		1
	],
	"../pages/summary-report/summary-report.module": [
		862,
		20
	],
	"../pages/test/test.module": [
		853,
		9
	],
	"../pages/tracking-history/tracking-history.module": [
		863,
		19
	],
	"../pages/verify-pin/verify-pin.module": [
		854,
		18
	],
	"../pages/visit-add-site/visit-add-site.module": [
		855,
		2
	],
	"../pages/visit-history/visit-history.module": [
		867,
		17
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
webpackAsyncContext.id = 215;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
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
    // public static API_BASE_URL: string = "http://192.168.43.162:8080/sapbasemodule/v1/";
    //DEV
    // public static API_BASE_URL: string = "http://116.75.129.27:8089/sapbaseapitest/v1/";
    // STAGING
    // public static API_BASE_URL: string = "http://116.75.129.27:8089/sapbaseapitest/v1/";
    // PRODUCTION
    ConstantsProvider.API_BASE_URL = "http://116.75.129.27:8089/sapbaseapi/v1/";
    //API Endpoints
    ConstantsProvider.API_ENDPOINT_ACTIVATE_DEACTIVATE = "activate-deactivate";
    ConstantsProvider.API_ENDPOINT_USERS = "users";
    ConstantsProvider.API_ENDPOINT_TAGS = "tags";
    ConstantsProvider.URL_SEPARATOR = "/";
    ConstantsProvider.URL_PARAM_PAGE_NO = "pageNo=";
    ConstantsProvider.API_ENDPOINT_OAUTH = "oauth/token";
    ConstantsProvider.URL_PARAM_LIMIT = "&limit=";
    ConstantsProvider.LOCATION_TRACKING_URL = "ext/location";
    ConstantsProvider.LOCATION_URL = "location";
    //API Endpoints
    ConstantsProvider.API_ENDPOINT_ROLES = ConstantsProvider_1.API_ENDPOINT_USERS
        + ConstantsProvider_1.URL_SEPARATOR + "roles";
    ConstantsProvider.API_ENDPOINT_VERIFY_PSSWD = ConstantsProvider_1.API_ENDPOINT_USERS
        + ConstantsProvider_1.URL_SEPARATOR + "validate-password";
    ConstantsProvider.API_ENDPOINT_ORDERS = "orders";
    ConstantsProvider.API_ENDPOINT_CHANGE_PASS = "change-password";
    ConstantsProvider.API_ENDPOINT_ADMIN_USERS = "admin-users";
    ConstantsProvider.API_ENDPOINT_TRACKING_HISTORY = 'tracking-history?track-date=';
    ConstantsProvider.API_ENDPOINT_USER_CHNG_PWD = "user-change-password";
    ConstantsProvider.API_ENDPOINT_CUST_DTLS = "customers";
    ConstantsProvider.API_ENDPOINT_CUSTOMER_MGMT = 'customers' + '?' + ConstantsProvider_1.URL_PARAM_PAGE_NO;
    ConstantsProvider.API_ENDPOINT_SEND_OTP = "send-otp";
    ConstantsProvider.API_ENDPOINT_VERIFY_OTP = "verify-otp";
    ConstantsProvider.API_ENDPOINT_AGING_REPORT = "aging-report";
    ConstantsProvider.API_ENDPOINT_LEDGER_REPORT = "ledger-report";
    ConstantsProvider.API_ENDPOINT_LEDGER_REPORT_NEW = 'new-ledger-report';
    ConstantsProvider.API_ENDPOINT_ITEM_DTLS = "items";
    ConstantsProvider.API_ENDPOINT_BOOKED_ORDERS = "booked-orders";
    ConstantsProvider.API_ENDPOINT_PENDING_INVOICES = 'pending-invoices';
    ConstantsProvider.API_ENDPOINT_CUST_ALL_INVOICES = "all-invoices";
    ConstantsProvider.API_ENDPOINT_SYNC = "sync";
    ConstantsProvider.API_ENDPOINT_SYNC_VISIT_DATA = "visits-sync";
    ConstantsProvider.API_ENDPOINT_INVOICE_ACKNOWLEDGEMENT = "invoice-acknowledgement";
    ConstantsProvider.API_ENDPOINT_PUNCH_SITE_ENTRY = "punch-visit-entry";
    ConstantsProvider.API_ENDPOINT_PUNCH_SITE_EXIT = "punch-visit-exit";
    ConstantsProvider.API_ENDPOINT_VERIFY_PIN = "verify-pin";
    ConstantsProvider.API_ENDPOINT_GENERATE_PIN = "generate-pin";
    ConstantsProvider.API_ENDPOINT_SUMM_RPT = "summary-report";
    ConstantsProvider.API_ENDPOINT_ORDER_DLVRY = "delivery-details";
    //Master Data JSON key names
    ConstantsProvider.MD_UOM = "uom";
    ConstantsProvider.APP_DATE_LOCALE = 'en-US';
    ConstantsProvider.REPORTS_DATE_FORMAT = 'DD MMM YYYY';
    ConstantsProvider.APP_DATETIME_DISPLAY_FORMAT = 'DD MMM YY hh:mm A';
    // DB Constants
    ConstantsProvider.APP_DB_NM = 'jbs_app_db.db';
    ConstantsProvider.APP_DB_LOC = 'default';
    ConstantsProvider.APP_DB_IOS_LOC = 'Library';
    //ROLES Constants
    ConstantsProvider.ROLE_ADMIN = 'ROLE_ADMIN';
    ConstantsProvider.ROLE_USER = 'ROLE_USER';
    ConstantsProvider.ROLE_SALES = 'ROLE_SALES';
    //CONFIG Constants
    ConstantsProvider.SW_VER = '2.11.10';
    ConstantsProvider.BASIC_AUTH_TOKEN = 'c2FwYmFzZW1vZHVsZTpzYXBiYXNlbW9kdWxlLXNlY3JldA==';
    ConstantsProvider.CONFIG_NM_CUST_DATA = 'customer_data';
    ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS = "last_updated_ts";
    ConstantsProvider.CONFIG_DS_IMG_PATH = 'assets/imgs/stamp.jpg';
    ConstantsProvider.CONFIG_NM_REFRESH_TOKEN = 'refresh-token';
    ConstantsProvider.CONFIG_NM_ACCESS_TOKEN = 'token';
    ConstantsProvider.CONFIG_NM_VISITS_DATA = 'visits_history';
    ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_VISITS = 'visit_last_updated_ts';
    ConstantsProvider.CONFIG_NM_LOCATIONS_DATA = 'locations';
    ConstantsProvider.CONFIG_NM_LOCATION_UPDATE_TS = 'location_last_updated_ts';
    ConstantsProvider.CONFIG_NM_ACK_INV_OFFLINE = "acknowledgement_offline";
    ConstantsProvider.CONFIG_NM_USER_DTLS = "userDetails";
    ConstantsProvider.CONFIG_NM_ROLES = "roles";
    ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_SUMM_RPT = "summ_rpt_last_updated_ts";
    ConstantsProvider.CONFIG_NM_SUMM_RPT_DATA = "summ_rpt_data";
    ConstantsProvider = ConstantsProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], ConstantsProvider);
    return ConstantsProvider;
    var ConstantsProvider_1;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeocoderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(66);
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
            // let str: string = `The reverseGeocode address is ${results[0].locality} in ${results[0].countryCode}`;
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__["a" /* NativeGeocoder */]])
    ], GeocoderProvider);
    return GeocoderProvider;
}());

//# sourceMappingURL=geocoder.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(494);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_common_utility_common_utility__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_interceptor_interceptor__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_restservice_restservice__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_constants_constants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_geocoder_geocoder__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_native_geocoder__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_social_sharing__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_opener__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_diagnostic__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_call_number__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_sqlite__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_database_database__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_screen_orientation__ = __webpack_require__(487);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// import { LoginPage } from '../pages/login/login';




// import { AuthorizatonSettingsPage } from '../pages/authorizaton-settings/authorizaton-settings';
// import { ChangePasswordPage } from '../pages/change-password/change-password';
// import { SettingsPage } from '../pages/settings/settings';
// import { AdminUsersPage } from '../pages/admin-users/admin-users';
// import { ModalAuAdminUsersPage } from '../pages/modal-au-admin-users/modal-au-admin-users';
// import { ContactUpdatePage } from '../pages/contact-update/contact-update';
// import { TrackingPage } from '../pages/tracking/tracking';
// import { TrackingHistoryPage } from '../pages/tracking-history/tracking-history';


// import { CustomerMgmtPage } from '../pages/customer-mgmt/customer-mgmt';
// import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
// import { CustomerDetailsPage } from '../pages/customer-details/customer-details';
// import { CustomerAgingReportPage } from '../pages/customer-aging-report/customer-aging-report';
// import { AgingReportFiltersPage } from '../pages/aging-report-filters/aging-report-filters';
// import { InvoicesListingPage } from '../pages/invoices-listing/invoices-listing';
// import { InvoiceDetailsPage } from '../pages/invoice-details/invoice-details';
// import { OrderMgmtPage } from '../pages/order-mgmt/order-mgmt';
// import { OrderDetailsPage } from '../pages/order-details/order-details';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
// import { InvoiceListingSettingsPopoverPage } from '../pages/invoice-listing-settings-popover/invoice-listing-settings-popover';



// import { OrderAddPage } from '../pages/order-add/order-add';
// import { ModalAddItemPage } from '../pages/modal-add-item/modal-add-item';
// import { IonicSelectableModule } from 'ionic-selectable';


// import { OrdersBookedPage } from '../pages/orders-booked/orders-booked';
// import { PendingInvoicesPage } from '../pages/pending-invoices/pending-invoices';
// import { PendingInvoicesFilterPage } from '../pages/pending-invoices-filter/pending-invoices-filter';
// import { AgingFilterPopoverPage } from '../pages/aging-filter-popover/aging-filter-popover';
// import { PopoverSortFiltersPage } from '../pages/popover-sort-filters/popover-sort-filters';
// import { ModalLedgerOptionsPage } from '../pages/modal-ledger-options/modal-ledger-options';


// import { LedgerListingDetailsPage } from '../pages/ledger-listing-details/ledger-listing-details';
// import { LedgerDateSelectionPage } from '../pages/ledger-date-selection/ledger-date-selection';
// import { VisitHistoryPage } from '../pages/visit-history/visit-history';
// import { VisitAddSitePage } from '../pages/visit-add-site/visit-add-site';
// import { PunchEntryPage } from '../pages/punch-entry/punch-entry';
// import { PunchExitPage } from '../pages/punch-exit/punch-exit';
// import { PlaceaddressPage } from '../pages/placeaddress/placeaddress';
// import { TestPage } from '../pages/test/test';
// import { LocationsPage } from '../pages/locations/locations';
// import { SignaturePadModule } from 'angular2-signaturepad';
// import { SignaturepadPage } from '../pages/signaturepad/signaturepad';
// import { LocationsDetailsPage } from '../pages/locations-details/locations-details';
// import { VerifyPinPage } from '../pages/verify-pin/verify-pin';
// import { GeneratePinReviewPage } from '../pages/generate-pin-review/generate-pin-review';
// import { PopoverSortVisitPage } from '../pages/popover-sort-visit/popover-sort-visit';
// import { CustomerSelectionPage } from '../pages/customer-selection/customer-selection';
// import { DownloadDetailsPage } from '../pages/download-details/download-details';
// import { CustomerSummaryReportPage } from '../pages/customer-summary-report/customer-summary-report';
// import { SummaryReportPage } from '../pages/summary-report/summary-report';
// import { CustFilterModalPage } from '../pages/cust-filter-modal/cust-filter-modal';
// import { SaleempFilterModalPage } from '../pages/saleemp-filter-modal/saleemp-filter-modal';
// import { BrandFilterModalPage } from '../pages/brand-filter-modal/brand-filter-modal';
// import { Storage } from '@ionic/storage';

// import { VehicleListPage } from '../pages/vehicle-list/vehicle-list';
// import { VehicleTrackingPage } from '../pages/vehicle-tracking/vehicle-tracking';
// import { MonthFilterModalPage } from '../pages/month-filter-modal/month-filter-modal';
// import { AddDeliveryPage } from '../pages/add-delivery/add-delivery';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-delivery/add-delivery.module#AddDeliveryPageModule', name: 'AddDeliveryPage', segment: 'add-delivery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/aging-filter-popover/aging-filter-popover.module#AgingFilterPopoverPageModule', name: 'AgingFilterPopoverPage', segment: 'aging-filter-popover', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/aging-report-filters/aging-report-filters.module#AgingReportFiltersPageModule', name: 'AgingReportFiltersPage', segment: 'aging-report-filters', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/authorizaton-settings/authorizaton-settings.module#AuthorizatonSettingsPageModule', name: 'AuthorizatonSettingsPage', segment: 'authorizaton-settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/brand-filter-modal/brand-filter-modal.module#BrandFilterModalPageModule', name: 'BrandFilterModalPage', segment: 'brand-filter-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact-update/contact-update.module#ContactUpdatePageModule', name: 'ContactUpdatePage', segment: 'contact-update', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cust-filter-modal/cust-filter-modal.module#CustFilterModalPageModule', name: 'CustFilterModalPage', segment: 'cust-filter-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-selection/customer-selection.module#CustomerSelectionPageModule', name: 'CustomerSelectionPage', segment: 'customer-selection', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-summary-report/customer-summary-report.module#CustomerSummaryReportPageModule', name: 'CustomerSummaryReportPage', segment: 'customer-summary-report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/download-details/download-details.module#DownloadDetailsPageModule', name: 'DownloadDetailsPage', segment: 'download-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/generate-pin-review/generate-pin-review.module#GeneratePinReviewPageModule', name: 'GeneratePinReviewPage', segment: 'generate-pin-review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/invoice-listing-settings-popover/invoice-listing-settings-popover.module#InvoiceListingSettingsPopoverPageModule', name: 'InvoiceListingSettingsPopoverPage', segment: 'invoice-listing-settings-popover', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ledger-date-selection/ledger-date-selection.module#LedgerDateSelectionPageModule', name: 'LedgerDateSelectionPage', segment: 'ledger-date-selection', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/locations-details/locations-details.module#LocationsDetailsPageModule', name: 'LocationsDetailsPage', segment: 'locations-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-add-item/modal-add-item.module#ModalAddItemPageModule', name: 'ModalAddItemPage', segment: 'modal-add-item', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-au-admin-users/modal-au-admin-users.module#ModalAuAdminUsersPageModule', name: 'ModalAuAdminUsersPage', segment: 'modal-au-admin-users', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-ledger-options/modal-ledger-options.module#ModalLedgerOptionsPageModule', name: 'ModalLedgerOptionsPage', segment: 'modal-ledger-options', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/month-filter-modal/month-filter-modal.module#MonthFilterModalPageModule', name: 'MonthFilterModalPage', segment: 'month-filter-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-add/order-add.module#OrderAddPageModule', name: 'OrderAddPage', segment: 'order-add', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-details/order-details.module#OrderDetailsPageModule', name: 'OrderDetailsPage', segment: 'order-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-mgmt/order-mgmt.module#OrderMgmtPageModule', name: 'OrderMgmtPage', segment: 'order-mgmt', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders-booked/orders-booked.module#OrdersBookedPageModule', name: 'OrdersBookedPage', segment: 'orders-booked', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pending-invoices/pending-invoices.module#PendingInvoicesPageModule', name: 'PendingInvoicesPage', segment: 'pending-invoices', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pending-invoices-filter/pending-invoices-filter.module#PendingInvoicesFilterPageModule', name: 'PendingInvoicesFilterPage', segment: 'pending-invoices-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/placeaddress/placeaddress.module#PlaceaddressPageModule', name: 'PlaceaddressPage', segment: 'placeaddress', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/popover-sort-filters/popover-sort-filters.module#PopoverSortFiltersPageModule', name: 'PopoverSortFiltersPage', segment: 'popover-sort-filters', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/popover-sort-visit/popover-sort-visit.module#PopoverSortVisitPageModule', name: 'PopoverSortVisitPage', segment: 'popover-sort-visit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/punch-entry/punch-entry.module#PunchEntryPageModule', name: 'PunchEntryPage', segment: 'punch-entry', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/punch-exit/punch-exit.module#PunchExitPageModule', name: 'PunchExitPage', segment: 'punch-exit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/saleemp-filter-modal/saleemp-filter-modal.module#SaleempFilterModalPageModule', name: 'SaleempFilterModalPage', segment: 'saleemp-filter-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signaturepad/signaturepad.module#SignaturepadPageModule', name: 'SignaturepadPage', segment: 'signaturepad', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/test/test.module#TestPageModule', name: 'TestPage', segment: 'test', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/verify-pin/verify-pin.module#VerifyPinPageModule', name: 'VerifyPinPage', segment: 'verify-pin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visit-add-site/visit-add-site.module#VisitAddSitePageModule', name: 'VisitAddSitePage', segment: 'visit-add-site', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/admin-users/admin-users.module#AdminUsersPageModule', name: 'AdminUsersPage', segment: 'admin-users', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-aging-report/customer-aging-report.module#CustomerAgingReportPageModule', name: 'CustomerAgingReportPage', segment: 'customer-aging-report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/invoices-listing/invoices-listing.module#InvoicesListingPageModule', name: 'InvoicesListingPage', segment: 'invoices-listing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ledger-listing-details/ledger-listing-details.module#LedgerListingDetailsPageModule', name: 'LedgerListingDetailsPage', segment: 'ledger-listing-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/locations/locations.module#LocationsPageModule', name: 'LocationsPage', segment: 'locations', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/summary-report/summary-report.module#SummaryReportPageModule', name: 'SummaryReportPage', segment: 'summary-report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tracking-history/tracking-history.module#TrackingHistoryPageModule', name: 'TrackingHistoryPage', segment: 'tracking-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-details/customer-details.module#CustomerDetailsPageModule', name: 'CustomerDetailsPage', segment: 'customer-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-mgmt/customer-mgmt.module#CustomerMgmtPageModule', name: 'CustomerMgmtPage', segment: 'customer-mgmt', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/invoice-details/invoice-details.module#InvoiceDetailsPageModule', name: 'InvoiceDetailsPage', segment: 'invoice-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visit-history/visit-history.module#VisitHistoryPageModule', name: 'VisitHistoryPage', segment: 'visit-history', priority: 'low', defaultHistory: [] }
                    ]
                }),
                // SignaturePadModule,
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpClientModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_restservice_restservice__["a" /* RestserviceProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_12__providers_constants_constants__["a" /* ConstantsProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: __WEBPACK_IMPORTED_MODULE_10__providers_interceptor_interceptor__["a" /* InterceptorProvider */], multi: true },
                __WEBPACK_IMPORTED_MODULE_13__providers_geocoder_geocoder__["a" /* GeocoderProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                // BackgroundGeolocation,
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */],
                // LocationTrackerProvider,
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_21__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_screen_orientation__["a" /* ScreenOrientation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 221,
	"./af.js": 221,
	"./ar": 222,
	"./ar-dz": 223,
	"./ar-dz.js": 223,
	"./ar-kw": 224,
	"./ar-kw.js": 224,
	"./ar-ly": 225,
	"./ar-ly.js": 225,
	"./ar-ma": 226,
	"./ar-ma.js": 226,
	"./ar-sa": 227,
	"./ar-sa.js": 227,
	"./ar-tn": 228,
	"./ar-tn.js": 228,
	"./ar.js": 222,
	"./az": 229,
	"./az.js": 229,
	"./be": 230,
	"./be.js": 230,
	"./bg": 231,
	"./bg.js": 231,
	"./bm": 232,
	"./bm.js": 232,
	"./bn": 233,
	"./bn.js": 233,
	"./bo": 234,
	"./bo.js": 234,
	"./br": 235,
	"./br.js": 235,
	"./bs": 236,
	"./bs.js": 236,
	"./ca": 237,
	"./ca.js": 237,
	"./cs": 238,
	"./cs.js": 238,
	"./cv": 239,
	"./cv.js": 239,
	"./cy": 240,
	"./cy.js": 240,
	"./da": 241,
	"./da.js": 241,
	"./de": 242,
	"./de-at": 243,
	"./de-at.js": 243,
	"./de-ch": 244,
	"./de-ch.js": 244,
	"./de.js": 242,
	"./dv": 245,
	"./dv.js": 245,
	"./el": 246,
	"./el.js": 246,
	"./en-SG": 247,
	"./en-SG.js": 247,
	"./en-au": 248,
	"./en-au.js": 248,
	"./en-ca": 249,
	"./en-ca.js": 249,
	"./en-gb": 250,
	"./en-gb.js": 250,
	"./en-ie": 251,
	"./en-ie.js": 251,
	"./en-il": 252,
	"./en-il.js": 252,
	"./en-nz": 253,
	"./en-nz.js": 253,
	"./eo": 254,
	"./eo.js": 254,
	"./es": 255,
	"./es-do": 256,
	"./es-do.js": 256,
	"./es-us": 257,
	"./es-us.js": 257,
	"./es.js": 255,
	"./et": 258,
	"./et.js": 258,
	"./eu": 259,
	"./eu.js": 259,
	"./fa": 260,
	"./fa.js": 260,
	"./fi": 261,
	"./fi.js": 261,
	"./fo": 262,
	"./fo.js": 262,
	"./fr": 263,
	"./fr-ca": 264,
	"./fr-ca.js": 264,
	"./fr-ch": 265,
	"./fr-ch.js": 265,
	"./fr.js": 263,
	"./fy": 266,
	"./fy.js": 266,
	"./ga": 267,
	"./ga.js": 267,
	"./gd": 268,
	"./gd.js": 268,
	"./gl": 269,
	"./gl.js": 269,
	"./gom-latn": 270,
	"./gom-latn.js": 270,
	"./gu": 271,
	"./gu.js": 271,
	"./he": 272,
	"./he.js": 272,
	"./hi": 273,
	"./hi.js": 273,
	"./hr": 274,
	"./hr.js": 274,
	"./hu": 275,
	"./hu.js": 275,
	"./hy-am": 276,
	"./hy-am.js": 276,
	"./id": 277,
	"./id.js": 277,
	"./is": 278,
	"./is.js": 278,
	"./it": 279,
	"./it-ch": 280,
	"./it-ch.js": 280,
	"./it.js": 279,
	"./ja": 281,
	"./ja.js": 281,
	"./jv": 282,
	"./jv.js": 282,
	"./ka": 283,
	"./ka.js": 283,
	"./kk": 284,
	"./kk.js": 284,
	"./km": 285,
	"./km.js": 285,
	"./kn": 286,
	"./kn.js": 286,
	"./ko": 287,
	"./ko.js": 287,
	"./ku": 288,
	"./ku.js": 288,
	"./ky": 289,
	"./ky.js": 289,
	"./lb": 290,
	"./lb.js": 290,
	"./lo": 291,
	"./lo.js": 291,
	"./lt": 292,
	"./lt.js": 292,
	"./lv": 293,
	"./lv.js": 293,
	"./me": 294,
	"./me.js": 294,
	"./mi": 295,
	"./mi.js": 295,
	"./mk": 296,
	"./mk.js": 296,
	"./ml": 297,
	"./ml.js": 297,
	"./mn": 298,
	"./mn.js": 298,
	"./mr": 299,
	"./mr.js": 299,
	"./ms": 300,
	"./ms-my": 301,
	"./ms-my.js": 301,
	"./ms.js": 300,
	"./mt": 302,
	"./mt.js": 302,
	"./my": 303,
	"./my.js": 303,
	"./nb": 304,
	"./nb.js": 304,
	"./ne": 305,
	"./ne.js": 305,
	"./nl": 306,
	"./nl-be": 307,
	"./nl-be.js": 307,
	"./nl.js": 306,
	"./nn": 308,
	"./nn.js": 308,
	"./pa-in": 309,
	"./pa-in.js": 309,
	"./pl": 310,
	"./pl.js": 310,
	"./pt": 311,
	"./pt-br": 312,
	"./pt-br.js": 312,
	"./pt.js": 311,
	"./ro": 313,
	"./ro.js": 313,
	"./ru": 314,
	"./ru.js": 314,
	"./sd": 315,
	"./sd.js": 315,
	"./se": 316,
	"./se.js": 316,
	"./si": 317,
	"./si.js": 317,
	"./sk": 318,
	"./sk.js": 318,
	"./sl": 319,
	"./sl.js": 319,
	"./sq": 320,
	"./sq.js": 320,
	"./sr": 321,
	"./sr-cyrl": 322,
	"./sr-cyrl.js": 322,
	"./sr.js": 321,
	"./ss": 323,
	"./ss.js": 323,
	"./sv": 324,
	"./sv.js": 324,
	"./sw": 325,
	"./sw.js": 325,
	"./ta": 326,
	"./ta.js": 326,
	"./te": 327,
	"./te.js": 327,
	"./tet": 328,
	"./tet.js": 328,
	"./tg": 329,
	"./tg.js": 329,
	"./th": 330,
	"./th.js": 330,
	"./tl-ph": 331,
	"./tl-ph.js": 331,
	"./tlh": 332,
	"./tlh.js": 332,
	"./tr": 333,
	"./tr.js": 333,
	"./tzl": 334,
	"./tzl.js": 334,
	"./tzm": 335,
	"./tzm-latn": 336,
	"./tzm-latn.js": 336,
	"./tzm.js": 335,
	"./ug-cn": 337,
	"./ug-cn.js": 337,
	"./uk": 338,
	"./uk.js": 338,
	"./ur": 339,
	"./ur.js": 339,
	"./uz": 340,
	"./uz-latn": 341,
	"./uz-latn.js": 341,
	"./uz.js": 340,
	"./vi": 342,
	"./vi.js": 342,
	"./x-pseudo": 343,
	"./x-pseudo.js": 343,
	"./yo": 344,
	"./yo.js": 344,
	"./zh-cn": 345,
	"./zh-cn.js": 345,
	"./zh-hk": 346,
	"./zh-hk.js": 346,
	"./zh-tw": 347,
	"./zh-tw.js": 347
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 521;

/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_utility_common_utility__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import * as firebase from 'Firebase';


// import { AuthorizatonSettingsPage } from '../pages/authorizaton-settings/authorizaton-settings';
// import { SettingsPage } from '../pages/settings/settings';
// import { AdminUsersPage } from '../pages/admin-users/admin-users';
// import { CustomerMgmtPage } from '../pages/customer-mgmt/customer-mgmt';
// import { OrderMgmtPage } from '../pages/order-mgmt/order-mgmt';
// import { Diagnostic } from '@ionic-native/diagnostic';
// import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';

// import { VisitHistoryPage } from '../pages/visit-history/visit-history';
// import { TestPage } from '../pages/test/test';
// import { LocationsPage } from '../pages/locations/locations';
// import { SummaryReportPage } from '../pages/summary-report/summary-report';
// import { VehicleListPage } from '../pages/vehicle-list/vehicle-list';
// const config = {
//     apiKey: 'AIzaSyAwE6RUI2st4uTM40fotjuPJVRJNfuayko',
//     authDomain: 'geotracker-86b5d.firebaseapp.com',
//     databaseURL: 'https://geotracker-86b5d.firebaseio.com/',
//     projectId: 'geotracker-86b5d',
//     storageBucket: 'gs://geotracker-86b5d.appspot.com',
// };
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, commonUtility, events, databaseProvider) {
        var _this = this;
        this.platform = platform;
        this.commonUtility = commonUtility;
        this.events = events;
        this.databaseProvider = databaseProvider;
        this.pages = [];
        this.swVersion = __WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].SW_VER;
        this.rootPage = localStorage.getItem('refresh-token') == null ? 'LoginPage' : 'AuthorizatonSettingsPage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('#457492');
            splashScreen.hide();
        });
        console.log('Subscribing unauthorized:requestError event');
        this.events.subscribe("unauthorized:requestError", function () {
            _this.commonUtility.clearStorage();
            _this.nav.setRoot('LoginPage');
        });
        this.events.subscribe("rolesUpdated", function () {
            console.log('Subscribed Event rolesUpdated called');
            _this.getSideMenuOptionsByRole();
            // if (this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES))
            //   this.updateCurrentLocation();
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.nav.setRoot(page.component);
        // if (page.title === "Logout" && this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES)) {
        //     this.locationTracker.stopTracking();
        // }
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.getSideMenuOptionsByRole = function () {
        var _this = this;
        this.pages = [];
        this.databaseProvider.initializeSqlLiteDb().then(function (db) {
            db.executeSql('SELECT data FROM metadata WHERE configname=?', ['roles'])
                .then(function (res) {
                var rolesArray = null;
                if (res.rows.length > 0) {
                    var rowData = res.rows.item(0).data;
                    rolesArray = JSON.parse(rowData);
                    console.log('rolesArray = ' + JSON.stringify(rolesArray));
                }
                if (rolesArray.indexOf(__WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_ADMIN) > -1) {
                    console.log('Admin Role Matched');
                    _this.pages.push({ title: 'Customer Management', component: 'CustomerMgmtPage' }, { title: 'Orders', component: 'OrderMgmtPage' }, { title: 'Users Mgmt', component: 'AdminUsersPage' }, { title: 'Visits', component: 'VisitHistoryPage' }, { title: 'Locations', component: 'LocationsPage' }, { title: 'Summary Report', component: 'SummaryReportPage' }, { title: 'Settings', component: 'SettingsPage' });
                }
                else if (rolesArray.indexOf(__WEBPACK_IMPORTED_MODULE_5__providers_constants_constants__["a" /* ConstantsProvider */].ROLE_SALES) > -1) {
                    console.log('ROLE_SALES Matched');
                    _this.pages.push({ title: 'Customer Management', component: 'CustomerMgmtPage' }, { title: 'Visits', component: 'VisitHistoryPage' }, { title: 'Locations', component: 'LocationsPage' }, { title: 'Orders', component: 'OrderMgmtPage' }, { title: 'Summary Report', component: 'SummaryReportPage' }, { title: 'Settings', component: 'SettingsPage' });
                }
                else {
                    console.log('No Roles Matched');
                    _this.events.publish("unauthorized:requestError");
                }
                _this.pages.push({ title: 'Logout', component: 'LoginPage' });
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/dipakjain/Ionic Projects/sapbasemodule/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar color="navbar">\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose style="background-color:#2F3C51; color:#E4EBED" ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n    <ion-footer style="background-color: #1c2431 !important; color:#fff;">\n        <h6 text-center>{{swVersion}}</h6>\n    </ion-footer>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/dipakjain/Ionic Projects/sapbasemodule/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpResponseError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterceptorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_utility_common_utility__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_constants__ = __webpack_require__(44);
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
                    // this.databaseProvider.setTokenInDb(response);
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
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__common_utility_common_utility__["a" /* CommonUtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* Events */]])
    ], InterceptorProvider);
    return InterceptorProvider;
}());

//# sourceMappingURL=interceptor.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUtilityProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_constants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_opener__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment_timezone__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment_timezone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__database_database__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var CommonUtilityProvider = /** @class */ (function () {
    function CommonUtilityProvider(toastCtrl, alertCtrl, events, loadingCtrl, network, callNumberNative, databaseProvider, fileOpener, platform) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.callNumberNative = callNumberNative;
        this.databaseProvider = databaseProvider;
        this.fileOpener = fileOpener;
        this.platform = platform;
        this.momentjs = __WEBPACK_IMPORTED_MODULE_8_moment_timezone__;
        this.isNetworkAvailableFlag = true;
        this.imgPath = '';
        this.isAsynchTaskCompleted = false;
        console.log('Hello CommonUtilityProvider Provider');
        this.platform.ready().then(function () {
            _this.imgPath = cordova.file.applicationDirectory + 'www/' + __WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].CONFIG_DS_IMG_PATH;
        });
    }
    CommonUtilityProvider.prototype.replaceCustomerInvoice = function (customer, invoice) {
        var customerInvoiceList = customer.customerInvoicesList;
        customerInvoiceList.forEach(function (customerInvoice) {
            if (customerInvoice.invoiceNo == invoice.invoiceNo) {
                customerInvoiceList.splice(customerInvoiceList.indexOf(customerInvoice), 1);
                customerInvoiceList.push(invoice);
            }
        });
        customer.customerInvoicesList = customerInvoiceList;
        this.saveCustomerRecord(customer);
        return true;
    };
    // isNetworkAvailable() {
    //     if (!this.isNetworkAvailableFlag) {
    //         let alert = this.alertCtrl.create({
    //             subTitle: 'No Internet Connection',
    //             enableBackdropDismiss: false,
    //             buttons: [
    //                 {
    //                     text: 'OK',
    //                     handler: () => {
    //                         this.isNetworkAvailable();
    //                     }
    //                 }
    //             ]
    //         });
    //         alert.present();
    //     }
    //     return this.isNetworkAvailableFlag;
    // }
    CommonUtilityProvider.prototype.isNetworkAvailable = function () {
        var _this = this;
        if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined) {
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
            return false;
        }
        else {
            return true;
        }
    };
    CommonUtilityProvider.prototype.callNumber = function (numberToCall, bypassAppChooser) {
        // this.callNumberNative.isCallSupported()
        //     .then(function (response) {
        //         if (response == true) {
        //             this.callNumberNative.callNumber(numberToCall, bypassAppChooser);
        //         }
        //         else {
        //             this.presentErrorToast('No Calling Service Available');
        //         }
        //     });
        this.callNumberNative.callNumber(numberToCall, bypassAppChooser);
    };
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
        // this.databaseProvider.clearDatabase();
    };
    CommonUtilityProvider.prototype.setTokenInStorage = function (data) {
        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    };
    CommonUtilityProvider.prototype.hasRole = function () {
        var _this = this;
        var rolesToCheck = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rolesToCheck[_i] = arguments[_i];
        }
        console.log('rolesToCheck = ' + rolesToCheck);
        // let rolesArray = JSON.parse(localStorage.getItem('roles'));
        var isRolePresent = false;
        this.isAsynchTaskCompleted = false;
        // this.databaseProvider.getItem('roles')
        this.getRolesFromDb()
            .then(function (res) {
            console.log('Roles Fetch Res = ' + JSON.stringify(res));
            var rolesArray = null;
            if (res.rows.length > 0) {
                var rowData = res.rows.item(0).data;
                rolesArray = JSON.parse(rowData);
                console.log('rolesArray = ' + JSON.stringify(rolesArray));
            }
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
                _this.events.publish("unauthorized:requestError");
            }
            _this.isAsynchTaskCompleted = true;
            // return isRolePresent;
        }, function (err) {
            console.log(JSON.stringify(err));
            _this.isAsynchTaskCompleted = true;
            // return isRolePresent;
        });
        console.log('Returning Now');
        return isRolePresent;
    };
    CommonUtilityProvider.prototype.getDocDefination = function (reportyType, datePeriod, custCity, custName, body) {
        var description = {
            content: [
                { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
                { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop', alignment: 'center' },
                { text: 'Bibwewadi , Pune - 411037', alignment: 'center' },
                { text: 'Tel No. : (O) 24216162, 9822610611', alignment: 'center' },
                { text: 'Phone no. : 02024216162', alignment: 'center' },
                { text: 'Pin code : 411037', alignment: 'center' },
                { text: 'GSTIN : 27AFJPJ8271L1ZV', alignment: 'center' },
                { text: 'E-Mail : jagtapbsolutions@gmail.com', alignment: 'center' },
                { text: custName, style: 'subheader' },
                // { text: custCity },
                { text: reportyType, style: 'subheader' },
                { text: '' },
                { text: datePeriod, style: 'story' },
                { text: 'Report Date: ' + new __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
                { text: '' },
                {
                    table: {
                        widths: '*',
                        body: body
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                cardname: {
                    margin: [5, 0, 5, 0]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0],
                    alignment: 'center'
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        };
        return description;
        // const ROOT_DIRECTORY = this.file.dataDirectory;
        // const downloadFolderName = 'tempJBSDownload';
        // const imageName = 'stamp.jpg';
        // //Create a folder in memory location
        // this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
        //     .then((entries) => {
        //         //Copy our asset/img/FreakyJolly.jpg to folder we created
        //         this.file.copyFile(this.file.applicationDirectory + "www/assets/imgs/", imageName,
        //             ROOT_DIRECTORY + downloadFolderName + '//', imageName)
        //             .then((entries) => {
        //                 this.imgPath = ROOT_DIRECTORY + downloadFolderName + "/" + imageName;
        //                 let description = {
        //                     content: [
        //                         { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
        //                         { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop', alignment: 'center' },
        //                         { text: 'Bibwewadi , Pune - 411037', alignment: 'center' },
        //                         { text: 'Tel No. : (O) 24216162, 9822610611', alignment: 'center' },
        //                         { text: 'Phone no. : 02024216162', alignment: 'center' },
        //                         { text: 'Pin code : 411037', alignment: 'center' },
        //                         { text: 'GSTIN : 27AFJPJ8271L1ZV', alignment: 'center' },
        //                         { text: 'E-Mail : jagtapbsolutions@gmail.com', alignment: 'center' },
        //                         { text: custName, style: 'subheader' },
        //                         // { text: custCity },
        //                         { text: reportyType, style: 'subheader' },
        //                         { text: '' },
        //                         { text: datePeriod, style: 'story' },
        //                         { text: 'Report Date: ' + new DatePipe('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
        //                         { text: '' },
        //                         {
        //                             table: {
        //                                 widths: '*',
        //                                 body: body
        //                             }
        //                         },
        //                         { image: this.imgPath, alignment: 'right' }
        //                     ],
        //                     styles: {
        //                         header: {
        //                             fontSize: 18,
        //                             bold: true,
        //                             alignment: 'center'
        //                         },
        //                         cardname: {
        //                             margin: [5, 0, 5, 0]
        //                         },
        //                         subheader: {
        //                             fontSize: 14,
        //                             bold: true,
        //                             margin: [0, 15, 0, 0],
        //                             alignment: 'center'
        //                         },
        //                         story: {
        //                             italic: true,
        //                             alignment: 'center',
        //                             width: '50%',
        //                         }
        //                     }
        //                 }
        //                 return description;
        //             })
        //             .catch((error) => {
        //                 alert('error ' + JSON.stringify(error));
        //             });
        //     })
        //     .catch((error) => {
        //         alert('error ' + JSON.stringify(error));
        //     });
    };
    CommonUtilityProvider.prototype.getDocDefinationPendingInvoices = function (reportyType, datePeriod, custCity, custName, body, totalPendingAmount) {
        var description = {
            content: [
                { text: 'Hello,' },
                {
                    text: 'This is a reminder that your account balance of ' + totalPendingAmount + ' was overdue as of ' + datePeriod + '.'
                        + ' Please find the Receivable for your reference. If you have any queries regarding this account, please contact ' +
                        'our office as soon as possible.'
                },
                { text: custName, style: 'subheader' },
                { text: custCity },
                { text: reportyType, style: 'subheader' },
                { text: datePeriod, style: 'story' },
                { text: 'Report Date: ' + new __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
                {
                    table: {
                        body: body
                    }
                },
                { text: 'Regards,', style: 'greetings' },
                { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
                { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop' },
                { text: 'Bibwewadi , Pune - 411037' },
                { text: 'Tel No. : (O) 24216162, 9822610611' },
                { text: 'Phone no. : 02024216162' },
                { text: 'Pin code : 411037' },
                { text: 'GSTIN : 27AFJPJ8271L1ZV' },
                { text: 'E-Mail : jagtapbsolutions@gmail.com' },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                cardname: {
                    margin: [5, 0, 5, 0]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0],
                    alignment: 'center'
                },
                greetings: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 15]
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        };
        return description;
    };
    CommonUtilityProvider.prototype.getCurrentDate = function (format) {
        console.log('format = ' + format);
        var transformedDate = new __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]('en-US').transform(new Date().toISOString(), format);
        console.log('transformedDate = ' + transformedDate);
        return transformedDate;
    };
    CommonUtilityProvider.prototype.calculateDiffInDays = function (startDate, endDate) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;
        // Convert both dates to milliseconds
        var date1_ms = startDate.getTime();
        var date2_ms = endDate.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        // Convert back to days and return
        var diff = Math.round(difference_ms / one_day);
        console.log('diff = ' + diff);
        return diff;
    };
    CommonUtilityProvider.prototype.calculateDiffInMins = function (startDate, endDate) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60;
        // Convert both dates to milliseconds
        var date1_ms = startDate.getTime();
        var date2_ms = endDate.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        // Convert back to days and return
        var diff = Math.round(difference_ms / one_day);
        console.log('diff In Mins = ' + diff);
        return diff;
    };
    CommonUtilityProvider.prototype.getRolesFromDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Rnning');
                        return [4 /*yield*/, this.databaseProvider.initializeSqlLiteDb().then(function (db) {
                                return db.executeSql('SELECT data FROM metadata WHERE configname=?', ['roles']);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommonUtilityProvider.prototype.formatDate = function (dateToFormat, format) {
        return this.momentjs(dateToFormat).format(format);
    };
    CommonUtilityProvider.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") {
                dist = dist * 1.609344;
            }
            if (unit == "N") {
                dist = dist * 0.8684;
            }
            return dist;
        }
    };
    CommonUtilityProvider.prototype.saveCustomerRecord = function (customer) {
        var _this = this;
        this.databaseProvider.getCustomerData()
            .subscribe(function (res) {
            var customersList = [];
            if (res.rows.length > 0) {
                console.log('CustData = ' + res.rows.item(0).data);
                customersList = JSON.parse(res.rows.item(0).data);
                customersList.forEach(function (customerElement) {
                    if (customerElement.customerDetails.cardCode == customer.customerDetails.cardCode) {
                        customersList.splice(customersList.indexOf(customerElement), 1);
                        customersList.push(customer);
                    }
                });
                _this.databaseProvider.setItem(__WEBPACK_IMPORTED_MODULE_4__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_CUST_DATA, JSON.stringify(customersList));
            }
        });
    };
    CommonUtilityProvider.prototype.isNetworkPresent = function () {
        if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined)
            return false;
        else
            return true;
    };
    CommonUtilityProvider.prototype.resetSummaryReportDisplayData = function (summaryReportList) {
        var finalSummaryReportList = [];
        summaryReportList.forEach(function (summaryRecord) {
            summaryRecord.displayBrand = summaryRecord.brand;
            summaryRecord.displayApr = summaryRecord.apr;
            summaryRecord.displayMay = summaryRecord.may;
            summaryRecord.displayJun = summaryRecord.jun;
            summaryRecord.displayJul = summaryRecord.jul;
            summaryRecord.displayAug = summaryRecord.aug;
            summaryRecord.displaySep = summaryRecord.sep;
            summaryRecord.displayOct = summaryRecord.oct;
            summaryRecord.displayNov = summaryRecord.nov;
            summaryRecord.displayDec = summaryRecord.dec;
            summaryRecord.displayJan = summaryRecord.jan;
            summaryRecord.displayFeb = summaryRecord.feb;
            summaryRecord.displayMar = summaryRecord.mar;
            finalSummaryReportList.push(summaryRecord);
        });
        return finalSummaryReportList;
    };
    CommonUtilityProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_9__database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
    ], CommonUtilityProvider);
    return CommonUtilityProvider;
}());

//# sourceMappingURL=common-utility.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_constants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__restservice_restservice__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(http, sqlite, network, restService) {
        this.http = http;
        this.sqlite = sqlite;
        this.network = network;
        this.restService = restService;
        console.log('DatabaseProvider Provider');
    }
    DatabaseProvider.prototype.initializeSqlLiteDb = function () {
        return this.sqlite.create({
            name: __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].APP_DB_NM,
            location: __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].APP_DB_LOC
            // iosDatabaseLocation: ConstantsProvider.APP_DB_IOS_LOC
        });
    };
    DatabaseProvider.prototype.intializeDatabase = function () {
        this.initializeSqlLiteDb().then(function (db) {
            db.executeSql('CREATE TABLE IF NOT EXISTS metadata(configname TEXT, data TEXT)', [])
                .then(function (res) {
                console.log('Create Table metadata');
            })
                .catch(function (e) { return console.log(JSON.stringify(e)); });
        })
            .catch(function (e) { return console.log(JSON.stringify(e)); });
    };
    DatabaseProvider.prototype.getRefreshToken = function () {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].fromPromise(this.initializeSqlLiteDb().then(function (db) {
            return db.executeSql('SELECT data FROM metadata WHERE configname=?', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_REFRESH_TOKEN]);
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].throw(e);
        }));
    };
    DatabaseProvider.prototype.getCustomerData = function () {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].fromPromise(this.initializeSqlLiteDb().then(function (db) {
            return db.executeSql('SELECT data FROM metadata WHERE configname=?', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_CUST_DATA]);
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
        }));
    };
    DatabaseProvider.prototype.deleteItem = function (configName) {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].fromPromise(this.initializeSqlLiteDb().then(function (db) {
            return db.executeSql('delete FROM metadata WHERE configname=?', [configName]);
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
        }));
    };
    DatabaseProvider.prototype.getLastUpdatedTs = function () {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].fromPromise(this.initializeSqlLiteDb().then(function (db) {
            return db.executeSql('SELECT data FROM metadata WHERE configname=?', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_LAST_UPDATED_TS]);
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
        }));
    };
    DatabaseProvider.prototype.getMetaData = function (configName) {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].fromPromise(this.initializeSqlLiteDb().then(function (db) {
            return db.executeSql('SELECT data FROM metadata WHERE configname=?', [configName]);
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
        }));
    };
    DatabaseProvider.prototype.syncCustomerData = function () {
        var _this = this;
        if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {
            var customersDetailsApiEndpoint = __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].API_BASE_URL + __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].API_ENDPOINT_CUST_DTLS;
            this.restService.getDetails(customersDetailsApiEndpoint)
                .subscribe(function (response) {
                console.log('Customers Data = ' + JSON.stringify(response.response));
                var customersDetailsList = response.response;
                _this.initializeSqlLiteDb().then(function (db) {
                    db.executeSql('SELECT data from metadata where configname=?', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_CUST_DATA])
                        .then(function (res) {
                        if (res.rows.length > 0) {
                            db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(customersDetailsList),
                                __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_CUST_DATA])
                                .then(function (res) {
                                console.log('Updated Customer Record');
                                db.executeSql('UPDATE metadata set data=? WHERE configname=?', [new Date().toISOString(),
                                    __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_LAST_UPDATED_TS])
                                    .then(function (res) {
                                    console.log('Updated Last Updated Ts');
                                })
                                    .catch(function (e) {
                                    console.log(JSON.stringify(e));
                                });
                            })
                                .catch(function (e) {
                                console.log(JSON.stringify(e));
                            });
                        }
                        else {
                            db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_CUST_DATA, ''])
                                .then(function (res) {
                                console.log('Inserted Empty Customer Record');
                                _this.syncCustomerData();
                            })
                                .catch(function (e) { return console.log(JSON.stringify(e)); });
                        }
                    });
                })
                    .catch(function (e) {
                    console.log(JSON.stringify(e));
                });
            });
        }
    };
    DatabaseProvider.prototype.syncCustomerDataInBackground = function () {
        var _this = this;
        console.log('SynchingDataInBackgruond');
        this.initializeSqlLiteDb().then(function (db) {
            db.executeSql('SELECT data FROM metadata WHERE configname=?', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_LAST_UPDATED_TS])
                .then(function (res) {
                if (res.rows.length > 0) {
                    console.log('LastUpdatedTs = ' + res.rows.item(0).data);
                    var lastUpdatedTsData = res.rows.item(0).data;
                    if (lastUpdatedTsData != '') {
                        var lastUpdatedTs = new Date(lastUpdatedTsData);
                        var diffInMins = _this.calculateDiffInMins(lastUpdatedTs, new Date());
                        if (diffInMins >= 30) {
                            _this.syncCustomerData();
                        }
                    }
                    else {
                        _this.syncCustomerData();
                    }
                }
                else {
                    db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)', [__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].CONFIG_NM_LAST_UPDATED_TS, ''])
                        .then(function (res) {
                        console.log('Inserted Empty LastUpdatedTs Record');
                        _this.syncCustomerData();
                    })
                        .catch(function (e) { return console.log(JSON.stringify(e)); });
                }
            })
                .catch(function (e) {
                console.log(JSON.stringify(e));
            });
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
        });
    };
    // setTokenInDb(data: any) {
    //   console.log('Access Token = ' + data.access_token);
    //   console.log('Refresh Token = ' + data.refresh_token);
    //   this.initializeSqlLiteDb().then((db: SQLiteObject) => {
    //     // Store Refresh Token
    //     this.setItem(ConstantsProvider.CONFIG_NM_REFRESH_TOKEN, data.refresh_token);
    //     // Store Access Token
    //     db.executeSql('SELECT data FROM metadata WHERE configname=?', [ConstantsProvider.CONFIG_NM_ACCESS_TOKEN])
    //       .then(
    //         res => {
    //           if (res.rows.length > 0) {
    //             console.log('Fetched Access Token = ' + res.rows.item(0).data);
    //             db.executeSql('UPDATE metadata set data=? WHERE configname=?', [data.access_token,
    //             ConstantsProvider.CONFIG_NM_ACCESS_TOKEN])
    //               .then(
    //                 res => {
    //                   console.log('Updated Access Token');
    //                 }
    //               )
    //               .catch(e => {
    //                 console.log(JSON.stringify(e));
    //               })
    //           } else {
    //             db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
    //               [ConstantsProvider.CONFIG_NM_ACCESS_TOKEN, data.access_token])
    //               .then(res => {
    //                 console.log('Inserted Access Token');
    //               })
    //               .catch(e => console.log(JSON.stringify(e)));
    //           }
    //         });
    //   })
    //     .catch(e => {
    //       console.log(JSON.stringify(e))
    //     });
    // }
    DatabaseProvider.prototype.setItem = function (configName, configValue) {
        console.log('Setting : ' + configName + ' = ' + configValue);
        this.initializeSqlLiteDb().then(function (db) {
            db.executeSql('SELECT data FROM metadata WHERE configname=?', [configName])
                .then(function (res) {
                if (res.rows.length > 0) {
                    console.log('Fetched ' + configName + ' = ' + res.rows.item(0).data);
                    db.executeSql('UPDATE metadata set data=? WHERE configname=?', [configValue, configName])
                        .then(function (res) {
                        console.log('Updated ' + configName);
                    })
                        .catch(function (e) {
                        console.log(JSON.stringify(e));
                    });
                }
                else {
                    db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)', [configName, configValue])
                        .then(function (res) {
                        console.log('Inserted ' + configName);
                    })
                        .catch(function (e) { return console.log(JSON.stringify(e)); });
                }
            });
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
        });
    };
    DatabaseProvider.prototype.getItem = function (configName) {
        return this.initializeSqlLiteDb().then(function (db) {
            return db.executeSql('SELECT data FROM metadata WHERE configname=?', [configName]);
        })
            .catch(function (e) {
            console.log(JSON.stringify(e));
            // return Observable.throw(e);
        });
    };
    DatabaseProvider.prototype.getItemAsync = function (configName) {
        return __awaiter(this, void 0, void 0, function () {
            var db, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initializeSqlLiteDb()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.executeSql('SELECT data FROM metadata WHERE configname=?', [configName])];
                    case 2:
                        res = _a.sent();
                        if (res.rows.length > 0) {
                            return [2 /*return*/, res.rows.item(0).data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseProvider.prototype.calculateDiffInMins = function (startDate, endDate) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60;
        // Convert both dates to milliseconds
        var date1_ms = startDate.getTime();
        var date2_ms = endDate.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        // Convert back to days and return
        var diff = Math.round(difference_ms / one_day);
        console.log('diff In Mins = ' + diff);
        return diff;
    };
    DatabaseProvider.prototype.clearDatabase = function () {
        this.sqlite.deleteDatabase({
            name: __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].APP_DB_NM,
            location: __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* ConstantsProvider */].APP_DB_LOC
            // iosDatabaseLocation: ConstantsProvider.APP_DB_IOS_LOC
        }).
            then(function (res) {
            console.log(JSON.stringify(res));
            console.log('Deleted Database');
        })
            .catch(function (err) {
            console.log(JSON.stringify(err));
            console.log('Cannot Delete Database');
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_6__restservice_restservice__["a" /* RestserviceProvider */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ })

},[489]);
//# sourceMappingURL=main.js.map