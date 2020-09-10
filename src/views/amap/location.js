let geolocation = null;
export function SelfLocation(params){ //{ map: "", current: ""}
    if(!geolocation) {
        geolocation = new AMap.Geolocation({
            showMarker: false,
            showButton: false,
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            zoomToAccuracy: true   //定位成功后是否自动调整地图视野到定位点
        });
    }
    params.map.addControl(geolocation);
    geolocation.getCurrentPosition();
    if(params.complete && typeof params.complete == 'function') {
        AMap.event.addListener(geolocation, 'complete', params.complete); //定位成功
    }
    if(params.error && typeof params.error == 'function') {
        AMap.event.addListener(geolocation, 'error', params.error); //定位失败
    }
}