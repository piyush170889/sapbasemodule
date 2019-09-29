import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';

/**
 * Generated class for the AddDeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-delivery',
  templateUrl: 'add-delivery.html',
})
export class AddDeliveryPage {

  quantity: number = 0;
  transporterName: string = '';
  vehNo: string = '';
  materialSource: string = '';
  actualDestination: string = '';
  addDeliveryFormGroup: FormGroup;
  orderDetails: any;
  orderItemDetailsObj: any;

  constructor(
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private view: ViewController,
    private commonUtiltiy: CommonUtilityProvider,
    private restService: RestserviceProvider
  ) {

    this.orderDetails = this.navParams.get('orderDetails');
    this.orderItemDetailsObj = this.navParams.get('orderItems');

    this.addDeliveryFormGroup = this.formBuilder.group({
      quantity: [0, Validators.required],
      transporterName: ['', Validators],
      vehNo: ['', Validators.required],
      materialSource: ['', Validators.required],
      actualDestination: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDeliveryPage');
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

  addDelivery() {

    console.log('addDelivery AddDeliveryPage');

    let quantity = this.addDeliveryFormGroup.controls['quantity'].value;
    let transporterName = this.addDeliveryFormGroup.controls['transporterName'].value;
    let vehNo = this.addDeliveryFormGroup.controls['vehNo'].value;
    let materialSource = this.addDeliveryFormGroup.controls['materialSource'].value;
    let actualDestination = this.addDeliveryFormGroup.controls['actualDestination'].value;

    if (quantity == '' || quantity == '0' || transporterName == '' || vehNo == '' || materialSource == '' || actualDestination == '') {
      this.commonUtiltiy.presentErrorToast('Please Enter Valid values');
    } else {

      if (quantity > this.orderDetails.openQuantity)
        this.commonUtiltiy.presentErrorToast('You can only enter a quantity less than pending quantity for delivery');
      else {
        let docNum = this.orderDetails.docNum;

        let addDeliveryDetailsApiEndpoint: string = ConstantsProvider.API_BASE_URL
          + ConstantsProvider.API_ENDPOINT_ORDERS + ConstantsProvider.URL_SEPARATOR
          + docNum + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_ORDER_DLVRY;

        let deliveryDetails: any ={ 
          appOrdrDlvryId: 0,
          quantity: quantity,
          appOrdrId: docNum,
          transporterName: transporterName,
          vehNo: vehNo,
          materialSource: materialSource,
          actualDestination: actualDestination
        };

        // API Call to save delivery details and get appOrdrDlvryId
        this.restService.postDetails(addDeliveryDetailsApiEndpoint, deliveryDetails)
          .subscribe(
            (response) => {
              console.log('Response = ' + JSON.stringify(response.response));
              deliveryDetails['appOrdrDlvryId'] = response.response;

              let addDeliveryModalData = {
                isAdded: true,
                deliveryDetails: deliveryDetails
              }

              console.log('addDeliveryModalData = ' + JSON.stringify(addDeliveryModalData));
              this.view.dismiss(addDeliveryModalData);
            }
          );
      }
    }
  }
}
