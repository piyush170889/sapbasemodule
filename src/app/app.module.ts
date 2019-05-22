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
import { AgingReportFiltersPage } from '../pages/aging-report-filters/aging-report-filters';
import { InvoicesListingPage } from '../pages/invoices-listing/invoices-listing';
import { InvoiceDetailsPage } from '../pages/invoice-details/invoice-details';
import { OrderMgmtPage } from '../pages/order-mgmt/order-mgmt';
import { OrderDetailsPage } from '../pages/order-details/order-details';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { InvoiceListingSettingsPopoverPage } from '../pages/invoice-listing-settings-popover/invoice-listing-settings-popover';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { OrderAddPage } from '../pages/order-add/order-add';
import { ModalAddItemPage } from '../pages/modal-add-item/modal-add-item';
import { IonicSelectableModule } from 'ionic-selectable';
import { Diagnostic } from "@ionic-native/diagnostic";
import { CallNumber } from '@ionic-native/call-number';
import { OrdersBookedPage } from '../pages/orders-booked/orders-booked';
import { PendingInvoicesPage } from '../pages/pending-invoices/pending-invoices';
import { PendingInvoicesFilterPage } from '../pages/pending-invoices-filter/pending-invoices-filter';
import { AgingFilterPopoverPage } from '../pages/aging-filter-popover/aging-filter-popover';
import { PopoverSortFiltersPage } from '../pages/popover-sort-filters/popover-sort-filters';
import { ModalLedgerOptionsPage } from '../pages/modal-ledger-options/modal-ledger-options';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

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
    CustomerAgingReportPage,
    AgingReportFiltersPage,
    InvoicesListingPage,
    InvoiceDetailsPage,
    OrderMgmtPage,
    OrderDetailsPage,
    InvoiceListingSettingsPopoverPage,
    OrderAddPage,
    ModalAddItemPage,
    OrdersBookedPage,
    PendingInvoicesFilterPage,
    PendingInvoicesPage,
    // TestPage,
    AgingFilterPopoverPage,
    PopoverSortFiltersPage,
    ModalLedgerOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicSelectableModule
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
    CustomerAgingReportPage,
    AgingReportFiltersPage,
    InvoicesListingPage,
    InvoiceDetailsPage,
    OrderMgmtPage,
    OrderDetailsPage,
    InvoiceListingSettingsPopoverPage,
    OrderAddPage,
    ModalAddItemPage,
    OrdersBookedPage,
    PendingInvoicesFilterPage,
    PendingInvoicesPage,
    AgingFilterPopoverPage,
    PopoverSortFiltersPage,
    ModalLedgerOptionsPage
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
    SocialSharing,
    FileOpener,
    File,
    LocationTrackerProvider,
    Diagnostic,
    CallNumber,
    SQLite,
    DatabaseProvider
  ]
})
export class AppModule { }
