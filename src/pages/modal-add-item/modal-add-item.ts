import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { IonicSelectableComponent } from "ionic-selectable";

/**
 * Generated class for the ModalAddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-add-item',
  templateUrl: 'modal-add-item.html',
})
export class ModalAddItemPage {

  isAddOperation: boolean;
  itemData: any = null;
  itemsList: any = [];
  itemSelected: any = '';
  qty: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public view: ViewController,
    public commonUtility: CommonUtilityProvider) {

    this.itemsList = this.navParams.get('itemsList');
    this.itemSelected = this.navParams.get('itemData');
    this.isAddOperation = this.navParams.get('isAddOperation');

    if (null != this.itemSelected)
      this.qty = this.itemSelected.qty;
    else {
      this.itemSelected = {
        itemCode: '',
        itemName: ''
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAddItemPage');
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

  addItem() {

    if (this.itemSelected == null || this.itemSelected.itemCode == '' || this.qty <= 0) {
      this.commonUtility.presentErrorToast('Please Fill Valid Details');
    } else {
      this.intializeItemData();

      this.itemData.itemCode = this.itemSelected.itemCode;
      this.itemData.itemName = this.itemSelected.itemName;
      this.itemData.qty = this.qty;

      let addItemModalData = {
        itemData: this.itemData,
        isAddOperation: this.isAddOperation,
        isAdded: true,
      }

      this.view.dismiss(addItemModalData);
    }
  }

  intializeItemData() {

    if (null == this.itemData) {
      this.itemData = {
        itemCode: '',
        itemName: '',
        qty: 0
      }
    }
  }

  itemChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let selectedItem: any = event.value;
    console.log('selectedItem = ', selectedItem);
  }
}
