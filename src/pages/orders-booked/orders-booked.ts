import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';

/**
 * Generated class for the OrdersBookedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders-booked',
  templateUrl: 'orders-booked.html',
})
export class OrdersBookedPage {

  bookedOrdersList: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restService: RestserviceProvider) {

    let bookedOrderApiEndPoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_ORDERS
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_BOOKED_ORDERS;

    this.restService.getDetails(bookedOrderApiEndPoint)
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response.response));
          this.bookedOrdersList = response.response;
        }
      );

    // this.bookedOrdersList.push({
    //   appOrderId: 1,
    //   cardCode: 'S001',
    //   cardName: 'Piyush Jadhav',
    //   shipToCode: 'Test Address',
    //   createdTs: '152645012',
    //   itemsList: [{
    //     itemCode: 'ITM001',
    //     itemName: 'RMC-001',
    //     qty: 1
    //   },
    //   {
    //     itemCode: 'ITM002',
    //     itemName: 'RMC-002',
    //     qty: 12
    //   }]
    // }, {
    //     appOrderId: 2,
    //     cardCode: 'NR005',
    //     cardName: 'Sanket Jadhav',
    //     shipToCode: 'Test Address 2',
    //     createdTs: '152645012',
    //     itemsList: [{
    //       itemCode: 'ITM001',
    //       itemName: 'RMC-001',
    //       qty: 1
    //     },
    //     {
    //       itemCode: 'ITM002',
    //       itemName: 'RMC-002',
    //       qty: 12
    //     }]
    //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersBookedPage');
  }

}
