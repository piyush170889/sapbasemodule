import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Network } from "@ionic-native/network";
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CommonUtilityProvider } from '../providers/common-utility/common-utility';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { RestserviceProvider } from '../providers/restservice/restservice';
import { ConstantsProvider } from '../providers/constants/constants';
import { AuthorizatonSettingsPage } from '../pages/authorizaton-settings/authorizaton-settings';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { SettingsPage } from '../pages/settings/settings';
import { AdminUsersPage } from '../pages/admin-users/admin-users';
import { ModalAuAdminUsersPage } from '../pages/modal-au-admin-users/modal-au-admin-users';
import { ContactUpdatePage } from '../pages/contact-update/contact-update';
import { TrackingPage } from '../pages/tracking/tracking';
import { TrackingHistoryPage } from '../pages/tracking-history/tracking-history';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { CustomerMgmtPage } from '../pages/customer-mgmt/customer-mgmt';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { CustomerDetailsPage } from '../pages/customer-details/customer-details';
import { CustomerAgingReportPage } from '../pages/customer-aging-report/customer-aging-report';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AuthorizatonSettingsPage,
    ChangePasswordPage,
    SettingsPage,
    AdminUsersPage,
    ModalAuAdminUsersPage,
    ContactUpdatePage,
    TrackingPage,
    TrackingHistoryPage,
    CustomerMgmtPage,
    CustomerDetailsPage,
    CustomerAgingReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AuthorizatonSettingsPage,
    ChangePasswordPage,
    SettingsPage,
    AdminUsersPage,
    ModalAuAdminUsersPage,
    ContactUpdatePage,
    TrackingPage,
    TrackingHistoryPage,
    CustomerMgmtPage,
    CustomerDetailsPage,
    CustomerAgingReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestserviceProvider,
    CommonUtilityProvider,
    Network,
    ConstantsProvider,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    GeocoderProvider,
    Geolocation,
    // BackgroundGeolocation,
    LocationTrackerProvider,
  ]
})
export class AppModule { }
