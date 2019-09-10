import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import * as moment from 'moment-timezone';
import { FileOpener } from '@ionic-native/file-opener';


/**
 * Generated class for the DownloadDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-download-details',
  templateUrl: 'download-details.html',
})
export class DownloadDetailsPage {

  case: string = null;
  visitHistoryExcelData: any[] = [];
  isDownloadCompleted: boolean = false;
  isDownloadSuccessfull: boolean = false;
  momentjs: any = moment;
  url: string = '';
  fileMimeType: string = '';
  downloadsFolderLocation: string = '';
  filename: string = '';
  currentDtTs: any = '';
  error: any = '';

  constructor(
    private navCtrl: NavController,
    private fileOpener: FileOpener,
    private file: File,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider
  ) {
    this.currentDtTs = this.momentjs(new Date()).format('DD MMM YY hh mm A')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DownloadDetailsPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter DownloadDetailsPage');

    this.case = this.navParams.get('case');

    switch (this.case) {

      case "VISIT_HISTORY_XLSX_DOWNLAOD":
        let visitHistoryExcelDataRaw: any[] = this.navParams.get('visitHistoryExcelData');
        console.log('visitHistoryExcelData = ' + JSON.stringify(visitHistoryExcelDataRaw));

        visitHistoryExcelDataRaw.forEach(
          (visitData: any) => {
            visitData.entryDt = this.momentjs(this.momentjs(visitData.entryDt, 'DDMMYY')).format("DD MMM YY");
            visitData.entryTm = this.momentjs(this.momentjs(visitData.entryTm, 'HHmmss')).format("hh:mm A");

            if (visitData.exitDt != null && visitData.exitDt != '') {
              visitData.exitDt = this.momentjs(this.momentjs(visitData.exitDt, 'DDMMYY')).format("DD MMM YY");
              visitData.exitTm = this.momentjs(this.momentjs(visitData.exitTm, 'HHmmss')).format("hh:mm A");
            }

            console.log('Visit Site Name = ' + visitData.siteDtls.geofenceName
              + ', Entry DateTime ' + visitData.entryDt + " " + visitData.entryTm
              + ', Exit Datetime = ' + visitData.exitDt + " " + visitData.exitTm);

            this.visitHistoryExcelData.push(visitData);
          }
        );

        console.log('Sleeping for 2 secs');
        setTimeout(
          () => {
            console.log('Done Sleeping for 2 secs');
            this.createXlsx();
          }, 2000);
        break;

      default:
        break;
    }
  }

  //HTML to SHeet Code
  write(): XLSX.WorkBook {
    /* generate worksheet */

    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet( ws_data);
    var ws = XLSX.utils.table_to_sheet(document.getElementById('visithistoryxlsx'));

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'JBS_Visit_History');

    return wb;
  };

  /* Import button for mobile */
  async createXlsx() {

    console.log("download")

    const wb: XLSX.WorkBook = this.write();
    let sugFilename = "JBS_Visit_History_" + this.currentDtTs.replace(" ", "_") + ".xlsx";
    console.log('sugFilename = ' + sugFilename);

    // this.filename = "JBS_Visit_History.xlsx";
    this.filename = sugFilename;
    try {
      /* generate Blob */
      const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob: Blob = new Blob([wbout], { type: 'application/octet-stream' });

      /* find appropriate path for mobile */
      const target: string = this.file.externalRootDirectory + '/Download/';
      // const target: string = this.file.documentsDirectory || this.file.externalDataDirectory || this.file.dataDirectory || '';
      const dentry = await this.file.resolveDirectoryUrl(target);
      this.url = dentry.nativeURL || '';

      /* attempt to save blob to file */
      await this.file.writeFile(this.url, this.filename, blob, { replace: true });

      this.fileMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      this.downloadsFolderLocation = target;

      this.isDownloadSuccessfull = true;

      this.commonUtility.presentToast(`Saved ${this.filename} at Downloads Folder`, 8000);
      // this.commonUtility.presentToast(`Saved ${this.filename} at ${this.url}`, 8000);
    } catch (e) {
      // if (e.message.match(/It was determined/)) {
      /* in the browser, use writeFile */
      this.error = JSON.stringify(e);
      console.log('Error = ' + this.error);
      XLSX.writeFile(wb, this.filename);
      this.commonUtility.presentErrorToast('Error Downloading File. Please try again');
      this.isDownloadSuccessfull = false;
    } finally {
      this.isDownloadCompleted = true;
    }
  }

  openFile() {

    console.log('openFile DowloadDetailsPage');
    if (null != this.url && this.url != '') {
      this.fileOpener.open(this.downloadsFolderLocation, '')
        .then(() => {
          console.log('File is opened');
          this.navCtrl.pop();
        })
        .catch(e => console.log('Error opening file', e));
    } else {
      this.commonUtility.presentErrorToast('Sorry no file was downloaded. Please download again')
    }
  }
}
