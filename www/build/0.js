webpackJsonp([0],{

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundTrackingPageModule", function() { return BackgroundTrackingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__background_tracking__ = __webpack_require__(842);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BackgroundTrackingPageModule = /** @class */ (function () {
    function BackgroundTrackingPageModule() {
    }
    BackgroundTrackingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__background_tracking__["a" /* BackgroundTrackingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__background_tracking__["a" /* BackgroundTrackingPage */]),
            ],
        })
    ], BackgroundTrackingPageModule);
    return BackgroundTrackingPageModule;
}());

//# sourceMappingURL=background-tracking.module.js.map

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundTrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
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
 * Generated class for the BackgroundTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BackgroundTrackingPage = /** @class */ (function () {
    function BackgroundTrackingPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BackgroundTrackingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BackgroundTrackingPage');
    };
    BackgroundTrackingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-background-tracking',template:/*ion-inline-start:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\background-tracking\background-tracking.html"*/'<!--\n  Generated template for the BackgroundTrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>background-tracking</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\My Work\Jagtap Infra Solutions\jagtap-solutions-app\src\pages\background-tracking\background-tracking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], BackgroundTrackingPage);
    return BackgroundTrackingPage;
}());

//# sourceMappingURL=background-tracking.js.map

/***/ })

});
//# sourceMappingURL=0.js.map