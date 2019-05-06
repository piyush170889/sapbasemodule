import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerAgingReportPage } from '../customer-aging-report/customer-aging-report';
import { DatePipe } from '@angular/common';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the AgingReportFiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aging-report-filters',
  templateUrl: 'aging-report-filters.html',
})
export class AgingReportFiltersPage {

  agingReportFilterFormGroup: FormGroup;
  customer: any;
  maxTime: string = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonUtility: CommonUtilityProvider) {

    this.customer = this.navParams.get('customer');

    this.agingReportFilterFormGroup = this.formBuilder.group({
      // noOfDays: ['', Validators.required],
      fromDate: [this.commonUtility.getCurrentDate('yyyy-MM-dd'), Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgingReportFiltersPage');
  }

  showReport() {

    console.log('showReport AgingReportsFiltersPage');

    console.log('FromDate = ' + this.agingReportFilterFormGroup.controls['fromDate'].value);
      // + ', No Of Days = ' + this.agingReportFilterFormGroup.controls['noOfDays'].value);

    this.navCtrl.push(CustomerAgingReportPage, {
      customer: this.customer,
      fromDate: this.agingReportFilterFormGroup.controls['fromDate'].value,
      // noOfDays: this.agingReportFilterFormGroup.controls['noOfDays'].value
    });
  }
  
}
