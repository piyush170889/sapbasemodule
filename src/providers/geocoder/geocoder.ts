import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult
} from '@ionic-native/native-geocoder';
import { Observable } from "rxjs/Rx";

/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {

  constructor(public http: HttpClient,
    private _GEOCODE: NativeGeocoder) {

    console.log('Hello GeocoderProvider Provider');
  }



  /**
    *
    * Perform reverseGeocoding operation and return address details
    *
    * @public
    * @method reverseGeocode
    * @return {Promise}
    *
    */
  reverseGeocode(lat: number, lng: number) {
  
    // alert('Lat = ' + lat + ", Long = " + lng);
    return Observable.fromPromise(
      this._GEOCODE.reverseGeocode(lat, lng)
        .then(
        (results: NativeGeocoderReverseResult[]) => {
          // alert('results = ' + JSON.stringify(results));

          let str: string = `The reverseGeocode address is ${results[0].locality} in ${results[0].countryCode}`;
          let resolvedLocality = (results[0].locality == null || results[0].locality == '') ? '' : (results[0].locality + ', ');
          let resolvedAddress: string = resolvedLocality + results[0].thoroughfare + ', ' + results[0].subAdministrativeArea
             + ', ' + results[0].administrativeArea;

          // alert('resolvedAddress = ' + JSON.stringify(resolvedAddress));

          return resolvedAddress;
        })
        .catch((error: any) => {
          alert(JSON.stringify(error));
          // reject(error);
          Observable.throw(error)
        })
    )
  }

}
