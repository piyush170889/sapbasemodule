import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Network } from "@ionic-native/network";
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
// import { LoginPage } from '../pages/login/login';
import { CommonUtilityProvider } from '../providers/common-utility/common-utility';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { RestserviceProvider } from '../providers/restservice/restservice';
import { ConstantsProvider } from '../providers/constants/constants';
// import { AuthorizatonSettingsPage } from '../pages/authorizaton-settings/authorizaton-settings';
// import { ChangePasswordPage } from '../pages/change-password/change-password';
// import { SettingsPage } from '../pages/settings/settings';
// import { AdminUsersPage } from '../pages/admin-users/admin-users';
// import { ModalAuAdminUsersPage } from '../pages/modal-au-admin-users/modal-au-admin-users';
// import { ContactUpdatePage } from '../pages/contact-update/contact-update';
// import { TrackingPage } from '../pages/tracking/tracking';
// import { TrackingHistoryPage } from '../pages/tracking-history/tracking-history';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
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
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
// import { OrderAddPage } from '../pages/order-add/order-add';
// import { ModalAddItemPage } from '../pages/modal-add-item/modal-add-item';
import { IonicSelectableModule } from 'ionic-selectable';
import { Diagnostic } from "@ionic-native/diagnostic";
import { CallNumber } from '@ionic-native/call-number';
// import { OrdersBookedPage } from '../pages/orders-booked/orders-booked';
// import { PendingInvoicesPage } from '../pages/pending-invoices/pending-invoices';
// import { PendingInvoicesFilterPage } from '../pages/pending-invoices-filter/pending-invoices-filter';
// import { AgingFilterPopoverPage } from '../pages/aging-filter-popover/aging-filter-popover';
// import { PopoverSortFiltersPage } from '../pages/popover-sort-filters/popover-sort-filters';
// import { ModalLedgerOptionsPage } from '../pages/modal-ledger-options/modal-ledger-options';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
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
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { VehicleListPage } from '../pages/vehicle-list/vehicle-list';
// import { VehicleTrackingPage } from '../pages/vehicle-tracking/vehicle-tracking';
// import { MonthFilterModalPage } from '../pages/month-filter-modal/month-filter-modal';
// import { AddDeliveryPage } from '../pages/add-delivery/add-delivery';


@NgModule({
  declarations: [
    MyApp,
    // LoginPage,
    // AuthorizatonSettingsPage,
    // ChangePasswordPage,
    // SettingsPage,
    // AdminUsersPage,
    // ModalAuAdminUsersPage,
    // ContactUpdatePage,
    // TrackingPage,
    // TrackingHistoryPage,
    // CustomerMgmtPage,
    // CustomerDetailsPage,
    // CustomerAgingReportPage,
    // AgingReportFiltersPage,
    // InvoicesListingPage,
    // InvoiceDetailsPage,
    // OrderMgmtPage,
    // OrderDetailsPage,
    // InvoiceListingSettingsPopoverPage,
    // OrderAddPage,
    // ModalAddItemPage,
    // OrdersBookedPage,
    // PendingInvoicesFilterPage,
    // PendingInvoicesPage,
    // // TestPage,
    // AgingFilterPopoverPage,
    // PopoverSortFiltersPage,
    // ModalLedgerOptionsPage,
    // LedgerListingDetailsPage,
    // LedgerDateSelectionPage,
    // VisitHistoryPage,
    // VisitAddSitePage,
    // PunchEntryPage,
    // PunchExitPage,
    // PlaceaddressPage,
    // TestPage,
    // LocationsPage,
    // SignaturepadPage,
    // LocationsDetailsPage,
    // VerifyPinPage,
    // GeneratePinReviewPage,
    // PopoverSortVisitPage,
    // CustomerSelectionPage,
    // DownloadDetailsPage,
    // CustomerSummaryReportPage,
    // SummaryReportPage,
    // CustFilterModalPage,
    // SaleempFilterModalPage,
    // BrandFilterModalPage,
    // VehicleListPage,
    // VehicleTrackingPage,
    // MonthFilterModalPage,
    // AddDeliveryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {mode : 'md'}),
    // SignaturePadModule,
    HttpClientModule,
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LoginPage,
    // AuthorizatonSettingsPage,
    // ChangePasswordPage,
    // SettingsPage,
    // AdminUsersPage,
    // ModalAuAdminUsersPage,
    // ContactUpdatePage,
    // TrackingPage,
    // TrackingHistoryPage,
    // CustomerMgmtPage,
    // CustomerDetailsPage,
    // CustomerAgingReportPage,
    // AgingReportFiltersPage,
    // InvoicesListingPage,
    // InvoiceDetailsPage,
    // OrderMgmtPage,
    // OrderDetailsPage,
    // InvoiceListingSettingsPopoverPage,
    // OrderAddPage,
    // ModalAddItemPage,
    // OrdersBookedPage,
    // PendingInvoicesFilterPage,
    // PendingInvoicesPage,
    // AgingFilterPopoverPage,
    // PopoverSortFiltersPage,
    // ModalLedgerOptionsPage,
    // LedgerListingDetailsPage,
    // LedgerDateSelectionPage,
    // VisitHistoryPage,
    // VisitAddSitePage,
    // PunchEntryPage,
    // PunchExitPage,
    // PlaceaddressPage,
    // TestPage,
    // LocationsPage,
    // SignaturepadPage,
    // LocationsDetailsPage,
    // VerifyPinPage,
    // GeneratePinReviewPage,
    // PopoverSortVisitPage,
    // CustomerSelectionPage,
    // DownloadDetailsPage,
    // CustomerSummaryReportPage,
    // SummaryReportPage,
    // CustFilterModalPage,
    // SaleempFilterModalPage,
    // BrandFilterModalPage,
    // VehicleListPage,
    // VehicleTrackingPage,
    // MonthFilterModalPage,
    // AddDeliveryPage
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
    SocialSharing,
    FileOpener,
    File,
    // LocationTrackerProvider,
    Diagnostic,
    CallNumber,
    SQLite,
    DatabaseProvider,
    ScreenOrientation
  ]
})
export class AppModule { }
