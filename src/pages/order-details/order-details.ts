import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";
import { ConstantsProvider } from "../../providers/constants/constants";
import { RestserviceProvider } from '../../providers/restservice/restservice';
import * as moment from 'moment-timezone';

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
  deliveryDetailsList: any[] = [];
}


@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  orderDtlsId: number;
  orderDetails: any = {};
  orderItems: any = [];
  deliveryDetailsList: any[] = [];
  showToast: boolean = false;
  toastMessage: string;
  passedOrderDtls: any;
  momentjs: any = moment;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public commonUtility: CommonUtilityProvider,
    public restService: RestserviceProvider,
    private modal: ModalController
  ) {

    this.orderDtlsId = this.navParams.get("orderDtlsId");
    this.passedOrderDtls = this.navParams.get('orderDtls');

    let orderDetailsApiEndpoint = ConstantsProvider.API_BASE_URL +
      ConstantsProvider.API_ENDPOINT_ORDERS + ConstantsProvider.URL_SEPARATOR + this.orderDtlsId;

    this.restService.getDetails(orderDetailsApiEndpoint)
      .subscribe(
        (response) => {
          console.log('Order Details = ' + JSON.stringify(response));
          this.orderDetails = response.response;
          this.orderItems = this.orderDetails.orderItemsList;
          this.deliveryDetailsList = this.orderDetails.deliveryDetailsList == null || this.orderDetails.deliveryDetailsList == undefined ? [] : this.orderDetails.deliveryDetailsList;
        }
      );


    // let docNum = this.passedOrderDtls.docNum;

    // let deliveryDetailsApiEndpoint: string = ConstantsProvider.API_BASE_URL
    //   + ConstantsProvider.API_ENDPOINT_ORDERS + ConstantsProvider.URL_SEPARATOR
    //   + docNum + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_ORDER_DLVRY;

    // this.restService.getDetails(deliveryDetailsApiEndpoint)
    //   .subscribe(
    //     (response) => {
    //       console.log('Response = ' + JSON.stringify(response.response));
    //       this.deliveryDetailsList
    //     }
    //   );
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

  addDeliveryDetails() {

    let addDeliveryModal: Modal = this.modal.create('AddDeliveryPage', {
      orderDetails: this.orderDetails,
      orderItems: this.orderItems[0]
    });

    addDeliveryModal.present();

    addDeliveryModal.onDidDismiss(
      (addDeliveryModalData) => {
        console.log('addDeliveryModalData = ' + JSON.stringify(addDeliveryModalData));

        if (addDeliveryModalData.isAdded) {
          console.log('quantity = ' + addDeliveryModalData.deliveryDetails.quantity + ', transporter = '
            + addDeliveryModalData.deliveryDetails.transporterName + ', Veh no = '
            + addDeliveryModalData.deliveryDetails.vehNo
            + ', materialSource = ' + addDeliveryModalData.deliveryDetails.materialSource
            + ', actualDestination = ' + addDeliveryModalData.deliveryDetails.actualDestination);

          this.deliveryDetailsList.push(addDeliveryModalData.deliveryDetails);
        }
      });
  }


  navigateToVehicleTrackingView() {

    console.log('firebaseId = -LO25MVjiRanSk4RtZDM');

    // if (this.commonUtility.isNetworkAvailable()) {
    //   this.navCtrl.push(VehicleTrackingPage, {
    //     firebaseId: '-LO25MVjiRanSk4RtZDM',
    //     vehicleNo: 'MH 12 QG 4452'
    //   });
    // }
  }

}
