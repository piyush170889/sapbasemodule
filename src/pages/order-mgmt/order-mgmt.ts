import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";
import { OrderDetailsPage } from "../order-details/order-details";
import { ConstantsProvider } from "../../providers/constants/constants";
import { RestserviceProvider } from '../../providers/restservice/restservice';

/**
 * Generated class for the OrderMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-mgmt',
  templateUrl: 'order-mgmt.html',
})
export class OrderMgmtPage {

  orderDetailsList: any = [];
  limit: number = 10;
  pageNo: number = 1;
  customer: any = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public commonUtility: CommonUtilityProvider,
    public restService: RestserviceProvider) {

    console.log('Name - ' + OrderMgmtPage.name);
    this.customer = this.navParams.get('customer');

    let ordersListApi: string = '';

    if (null == this.customer || this.customer == undefined)
      ordersListApi = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_ORDERS
        + "?" + ConstantsProvider.URL_PARAM_PAGE_NO + this.pageNo + ConstantsProvider.URL_PARAM_LIMIT + this.limit;
    else
      ordersListApi = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
        + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
        + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_ORDERS
        // + "?" + ConstantsProvider.URL_PARAM_PAGE_NO + this.pageNo + ConstantsProvider.URL_PARAM_LIMIT + this.limit;

    this.restService.getDetails(ordersListApi)
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response));
          this.orderDetailsList = response.response;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderMgmtPage');
  }

  // naviagteToOrderCreatePage() {

  //   if (this.commonUtility.isNetworkAvailable()) {
  //     this.navCtrl.push(ListCustomersPage, {
  //       referrer: OrderMgmtPage.name
  //     });
  //   }
  // }


  openOrderDetails(orderDtls) {

    console.log('openOrderDetails()');
    if (this.commonUtility.isNetworkAvailable()) {
      this.navCtrl.push(OrderDetailsPage, {
        orderDtlsId: orderDtls.docNum,
        orderDtls: orderDtls
      });
    }
  }

}
