export class GeoFence {

    geofencingDtlsId: number;
    geofenceName: string;
    latitude: number;
    longitude: number;
    geofenceArea: string;
    geofenceAddr: string;
    isActive: number;
    transitionType: string;
    cardCode: string;

    GeoFence() {
        this.geofencingDtlsId = 0;
        this.geofenceName = '';
        this.latitude = 0;
        this.latitude = 0;
        this.geofenceArea = '';
        this.geofenceAddr = '';
        this.isActive = 1;
        this.transitionType = '3';
        this.cardCode = '';
    }
}