import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";
import { ConstantsProvider } from "../../providers/constants/constants";
import { RestserviceProvider } from '../../providers/restservice/restservice';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class OrderDetails {
  orderDtlsId: number;
  orderPrefix: string = "OR";
  orderNo: string;
  quotationPrefix: string;
  quotationNo: string;
  enquiryNo: string;
  custDtlsId: string;
  custNo: string;
  custGSTNo: string;
  custNm: string;
  custEmail: string;
  cntcPerNm: string;
  cntcPerNo: string;
  addrNm: string;
  stAddr: string;
  landmark: string;
  areaId: number;
  areaText: string;
  cityId: number;
  cityText: string;
  stateId: number;
  stateText: string;
  transNet: number = 0;
  transTaxPerc: number = 0;
  transTaxVal: number = 0;
  transTaxGross: number = 0;
  pnfNet: number = 0;
  pnfTaxPerc: number = 0;
  pnfTaxVal: number = 0;
  pnfTaxGross: number = 0;
  freightNet: number = 0;
  freightTaxPerc: number = 0;
  freightTaxVal: number = 0;
  freightTaxGross: number = 0;
  subTotal: number = 0;
  totalTax: number = 0;
  grandTotal: number = 0;
  discount: number = 0;
  validity: string;
  isActive: number;
  createdTs: string;
  createdBy: any;
  createdByName: string;
  orderItemsList: any = [];
}


@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  orderDtlsId: number;
  // orderDetails: OrderDetails = new OrderDetails();
  orderDetails: any = {};
  orderItems: any = [];
  showToast: boolean = false;
  toastMessage: string;
  passedOrderDtls: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public commonUtility: CommonUtilityProvider,
    // public http: HttpClient) {
    public restService: RestserviceProvider) {

    // super(ConstantsProvider.API_ENDPOINT_ORDERS, commonUtility, http, null);
    this.orderDtlsId = this.navParams.get("orderDtlsId");
    this.passedOrderDtls = this.navParams.get('orderDtls');

    // this.getById(this.orderDtlsId)
    //   .subscribe(
    //   (response) => {
    //     console.log('Response = ' + JSON.stringify(response));

    //     this.orderDetails = response.response.orderDtls;
    //     this.extractCustomerData(response.response.orderDtls.custDtl);
    //     this.orderDetails.areaText = this.commonUtility.getAreaNameByAreaDtlsId(this.orderDetails.areaId);
    //     this.orderDetails.cityText = this.commonUtility.getCityNameDtlByCityId(this.orderDetails.cityId);
    //     this.orderDetails.stateText = this.commonUtility.getStateNameDtlByStateId(this.orderDetails.stateId);
    //     this.orderDetails.createdByName = this.orderDetails.createdBy == null ? '' : this.orderDetails.createdBy.firstName + ' ' + this.orderDetails.createdBy.lastName
    //     console.log('Area Name = ' + this.orderDetails.areaText + ", City Text = " + this.orderDetails.cityText +
    //       ', State = ' + this.orderDetails.stateText + ', created By = ' + this.orderDetails.createdByName)

    //     console.log('Order Details = ' + JSON.stringify(this.orderDetails));
    //     this.orderItems = response.response.orderItemDtlList;
    //     console.log('Order Items = ' + JSON.stringify(this.orderItems));

    //     this.toastMessage = this.navParams.get('toastMessage');
    //     this.showToast = this.navParams.get("showToast");

    //     if (this.showToast) {
    //       this.commonUtility.presentToast(this.toastMessage, 3000);
    //     }
    //   }
    //   );

    let orderDetailsApiEndpoint = ConstantsProvider.API_BASE_URL +
      ConstantsProvider.API_ENDPOINT_ORDERS + ConstantsProvider.URL_SEPARATOR + this.orderDtlsId;

    this.restService.getDetails(orderDetailsApiEndpoint)
      .subscribe(
        (response) => {
          console.log('Order Details = ' + JSON.stringify(response));
          this.orderDetails = response.response;
          this.orderItems = this.orderDetails.orderItemsList;
        }
      )

    // //Dummy Data
    //   this.orderItems.push({
    //     discount: 0,
    //     grandTotal: 100,
    //     itemDesc: 'This is a test Description for the item',
    //     itemDtlsId: 0,
    //     itemNo: 'ITM001',
    //     itemQty: 9,
    //     itemUom: 'KG',
    //     reqDt: '1537018561000',
    //     subTotal: 90,
    //     taxValue: 10,
    //     unitPrice: 10 
    //   },
    //   {
    //     discount: 0,
    //     grandTotal: 100,
    //     itemDesc: 'This is a test Description for the item',
    //     itemDtlsId: 0,
    //     itemNo: 'ITM002',
    //     itemQty: 9,
    //     itemUom: 'KG',
    //     reqDt: '1537018561000',
    //     subTotal: 90,
    //     taxValue: 10,
    //     unitPrice: 10 
    //   });

    // this.orderDetails = {
    //   orderDtlsId : this.orderDtlsId,
    //   orderPrefix: 'OR',
    //   orderNo : '001',
    //   quotationPrefix : 'QR',
    //   quotationNo : '001',
    //   enquiryNo : '001',
    //   orderDtls : {
    //     orderPrefix : 'OR',
    //     orderNo : '001'
    //   },
    //   custNo : '',
    //   custGSTNo : '27MAHPIYUSH',
    //   custNm : 'Piyush Jadhav',
    //   custEmail : 'piyush.jadhav@repleteinc.com',
    //   cntcPerNm : 'Piyush Jadhav',
    //   cntcPerNo : '9096409749',
    //   addrNm : 'Addr Name',
    //   stAddr : 'Job Site Street Address',
    //   landmark : 'Job Site Landmark',
    //   areaId : 1,
    //   areaText : 'jobSiteAreaText',
    //   cityId : 1,
    //   cityText : 'jobSiteCityText',
    //   stateId : 1,
    //   stateText : 'jobSiteStateText',
    //   custDtlsId : 'sjds78wey97wvew97weruy239',
    //   freightNet : 200,
    //   freightTaxGross : 220,
    //   freightTaxPerc : 10,
    //   freightTaxVal : 20,
    //   pnfNet : 200,
    //   pnfTaxGross : 220,
    //   pnfTaxPerc : 10,
    //   pnfTaxVal : 20,
    //   transNet : 200,
    //   transTaxGross : 220,
    //   transTaxPerc : 10,
    //   transTaxVal : 20,
    //   subTotal : 2000,
    //   totalTax : 500,
    //   grandTotal : 2500,
    //   discount : 0,
    //   validity : '1537018561000',
    //   isActive : 1,
    //   createdTs : '1537018561000'
    // };
  }

  extractCustomerData(custData: any) {
    this.orderDetails.custDtlsId = custData.userDtlsId;
    // this.orderDetails.custEmail = custData.emailId;
    this.orderDetails.custGSTNo = custData.gstin;
    this.orderDetails.custNm = custData.firstName + ' ' + custData.lastName;
    this.orderDetails.custNo = custData.userPrefix + custData.userCode;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryDetailsPage');
  }

  // naviagteToOrderUpdatePage() {
  //   console.log('naviagteToOrderUpdatePage Called');

  //   if (this.commonUtility.isNetworkAvailable()) {
  //     this.navCtrl.push(OrderUpdatePage, {
  //       orderDetails: this.orderDetails,
  //       orderItems: this.orderItems,
  //       isRegisteredCustomer: this.orderDetails.custNo == null || this.orderDetails.custNo == '' ? false : true
  //     });
  //   }
  // }

  // orderItemDetails(orderItem) {
  //   console.log('orderItemDetails() called');

  //   if (this.commonUtility.isNetworkAvailable) {
  //     // this.navCtrl.push(OrderItemDetailsPage, {
  //     //   orderItem: orderItem
  //     // });
  //     this.navCtrl.push(DispatchOrdersPage, {
  //       orderItem : orderItem,
  //       orderId: this.orderDetails.docNum
  //     });
  //   }
  // }
}
