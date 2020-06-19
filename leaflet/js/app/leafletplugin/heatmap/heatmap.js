define(['jquery','L','leafletheat'],function($){
    /**
     * 转换为RawChart的数据
     * @param jsonData
     * @constructor
     */
    function RevertDataWithoutValue(geoData) {
        let RawData = [];
        // let i = 0;
        $.each(geoData,function(i,ele){
            if(!!ele){

                let lat = parseFloat(ele.lat);
                let lng = parseFloat(ele.lng);
                let rawData = [lat,lng,2];

                RawData.push(rawData);
            }
            // i++;
        });
        return RawData;
    };

    function RevertData(geoData,valueData) {
        let RawData = [];

        $.each(valueData,function(i,ele){
            if(!!ele){
                let place = ele.name;
                let value = parseFloat(ele.value);

                let location = geoData[place];

                let lat = location[1];
                let lng = location[0];
                let rawData = [lat,lng,value];

                RawData.push(rawData);
            }
            i++;
        });
        return RawData;
    };

    let heatLayer;

    function addHeatLayer(geoData,map) {

        $.getJSON("/leafletMap/leaflet/data/station.json",function(stationJson) {

            let valueData = RevertDataWithoutValue(stationJson['RECORDS']);

            heatLayer = L.heatLayer(valueData, {radius: 25}).addTo(map);

        });
    };

    function addSliderHeatLayer(geoData,jsonData,map){

        let valueData = RevertData(geoData,jsonData);

        heatLayer = L.heatLayer(valueData,{radius:50}).addTo(map);

    }

    function updateSliderHeatLayer(geoData,jsonData,map){

        removeHeatLayer();

        let valueData = RevertData(geoData,jsonData);

        heatLayer = L.heatLayer(valueData,{radius:50}).addTo(map);

    }

    function removeHeatLayer(){
        heatLayer.remove();
    }

    return{
        addHeatLayer: addHeatLayer,
        removeHeatLayer: removeHeatLayer,
        addSliderHeatLayer: addSliderHeatLayer,
        updateSliderHeatLayer: updateSliderHeatLayer
    };
})
