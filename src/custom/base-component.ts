import { CommonUtilityProvider } from "../providers/common-utility/common-utility";
import { ConstantsProvider } from "../providers/constants/constants";
import { Loading } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { FormGroup } from "@angular/forms";

export class BaseComponent {

    loader: Loading;
    subResourceEndpointUrl: string;

    constructor(
        public endpointUrl: string,
        public commonUtility: CommonUtilityProvider,
        public http: HttpClient,
        private subResourceEndpointUrlToSet: string) {
        this.subResourceEndpointUrl = subResourceEndpointUrlToSet;
    }

    setSubResourceUrl(subResourceEndpointUrl: string) {
        this.subResourceEndpointUrl = subResourceEndpointUrl;
    }

    getAll() {

        let listUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl;
        console.log('List URL -> ' + listUrl);

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(listUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    getAllPaginated(pageNo) {

        let listUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl + "?" + ConstantsProvider.URL_PARAM_PAGE_NO + pageNo;
        console.log('List URL -> ' + listUrl);

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(listUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    getById(id: any) {

        let getByIdUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl
            + ConstantsProvider.URL_SEPARATOR + id;
        console.log('getById URL -> ' + getByIdUrl);

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(getByIdUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    create(data: any) {

        let createUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl;
        console.log('Create URL -> ' + createUrl);
        console.log('Create Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(createUrl, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }


    getAllSubResource(parentId: any) {

        let listUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl + ConstantsProvider.URL_SEPARATOR
            + parentId + ConstantsProvider.URL_SEPARATOR + this.subResourceEndpointUrl;
        console.log('List URL -> ' + listUrl);

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(listUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    getSubresourceById(parentId: any, subResourceId: any) {

        let getSubresourceByIdUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl
            + ConstantsProvider.URL_SEPARATOR + parentId + ConstantsProvider.URL_SEPARATOR
            + this.subResourceEndpointUrl + ConstantsProvider.URL_SEPARATOR + subResourceId;
        console.log('getSubresourceByIdUrl URL -> ' + getSubresourceByIdUrl);

        if (this.commonUtility.isNetworkAvailable()) {

            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            
            return this.http.get(getSubresourceByIdUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    createSubResource(parentId: any, subResourceData: any) {

        let createSubResourceUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl + ConstantsProvider.URL_SEPARATOR
            + parentId + ConstantsProvider.URL_SEPARATOR + this.subResourceEndpointUrl;
        console.log('createSubResourceUrl = ' + createSubResourceUrl);
        console.log('createSubResourceUrl data= ' + JSON.stringify(subResourceData));

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(createSubResourceUrl, subResourceData)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    update(data: any) {

        let updateUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl;
        console.log('Update URL -> ' + updateUrl);
        console.log('Update Data -> ' + JSON.stringify(data));

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(updateUrl, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    updateSubResource(parentId: any, subResourceData: any) {

        let subResourceUpdateUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl + ConstantsProvider.URL_SEPARATOR
            + parentId + ConstantsProvider.URL_SEPARATOR + this.subResourceEndpointUrl;
        console.log('subResourceUpdateUrl -> ' + subResourceUpdateUrl);
        console.log('updateSubResourceUrl data= ' + JSON.stringify(subResourceData));

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(subResourceUpdateUrl, subResourceData)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    deleteById(id: any) {

        let deleteUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl + ConstantsProvider.URL_SEPARATOR + id;
        console.log('Delete URL -> ' + deleteUrl);

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(deleteUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    deleteSubResourceById(parentId: any, subResourceId: any) {

        let deleteUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl + ConstantsProvider.URL_SEPARATOR
            + parentId + ConstantsProvider.URL_SEPARATOR + this.subResourceEndpointUrl
            + ConstantsProvider.URL_SEPARATOR + subResourceId;
        console.log('Delete URL -> ' + deleteUrl);
        console.log('deleteSubResourceUrl data= ' + subResourceId);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(deleteUrl)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    bulkDelete(data: any) {

        let bulkDeleteUrl = ConstantsProvider.API_BASE_URL + this.endpointUrl;
        console.log('Bulk Delete URL -> ' + bulkDeleteUrl);
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(bulkDeleteUrl, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    setFormGroupDataFromJson(jsonData: any, formGroup: FormGroup) {
        let jsonKeys = Object.keys(jsonData);
        console.log('jsonKeys = ' + JSON.stringify(jsonKeys));

        jsonKeys.forEach(
            (key) => {
                if (formGroup.contains(key)) {
                    formGroup.controls[key].setValue(jsonData[key]);
                }
            }
        );

        // return formGroup;
    }
}