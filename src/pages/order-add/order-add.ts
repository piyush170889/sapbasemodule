import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { ModalAddItemPage } from '../modal-add-item/modal-add-item';

/**
 * Generated class for the OrderAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-add',
  templateUrl: 'order-add.html',
})
export class OrderAddPage {

  customer: any;
  custAddress: any = null;
  orderItemsList: any[] = [];
  itemsList: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    public modal: ModalController) {

    this.customer = this.navParams.get('customer');

    console.log('Customer = ' + JSON.stringify(this.customer));

    // let itemsListApiEndpoint: string = ConstantsProvider.API_BASE_URL
    //   + ConstantsProvider.API_ENDPOINT_ITEM_DTLS;

    // this.restService.getDetails(itemsListApiEndpoint)
    //   .subscribe(
    //     (response) => {
    //       console.log('Items List = ' + JSON.stringify(response.response));
    //       this.itemsList = response.response;
    //     }
    //   );

    this.populateDummyData();

  }

  populateDummyData() {

    this.orderItemsList.push({
      itemCode: 'ITM001',
      itemName: 'Itm Dscrption',
      qty: 10
    });

    this.itemsList.push({
      itemCode: 'ITM001',
      itemName: 'Itm Dscrption'
    }, {
        itemCode: 'ITM002',
        itemName: 'Itm Dscrption'
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderAddPage');
  }

  addOrderItem() {

    console.log('addOrderItem OrderAddPage');
    this.createOrderItemModal(true, null);
  }

  createOrderItemModal(isAddOperation: boolean, itemData: any) {

    let orderItemModal: Modal = this.modal.create(ModalAddItemPage, {
      isAddOperation: isAddOperation,
      itemData: itemData,
      itemsList: this.itemsList
    });

    orderItemModal.present();

    orderItemModal.onDidDismiss(
      (addOrderItemModalData) => {
        console.log('Data = ' + JSON.stringify(addOrderItemModalData));

        if (addOrderItemModalData.isAdded) {
          console.log('isAdded = ' + addOrderItemModalData.isAdded + ' so going ahead');

          let data = addOrderItemModalData.itemData;
          let doAddItem = addOrderItemModalData.isAddOperation;

          console.log('doAddItem = ' + doAddItem);
          if (doAddItem) {
            this.orderItemsList.push(data);
            console.log('this.orderItemsList added = ' + JSON.stringify(this.orderItemsList));
          } else {
            let index = this.orderItemsList.indexOf(itemData);

            if (index > -1) {
              this.orderItemsList[index] = data;
            }
          }

        }
      }
    );
  }

  createOrder() {

    console.log('custAddress = ' + this.custAddress
      + ', Order Items = ' + JSON.stringify(this.orderItemsList));
  }

}
