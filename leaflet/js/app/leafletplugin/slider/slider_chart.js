

/**
 * 滑动控件
 */
let sliderControl;

/**
 * 控件是否已经添加的标识，已经添加 true 就 update，false 就 add.
 * @type {boolean}
 */
let haveSet = false;

/**
 * 添加滑动控件对应的数据和事件
 * @param keyArray
 * @param geoData
 * @param valueData
 * @param title
 */
function setSliderData(timeArray,geoData,valueData,title,map){

    let getDataAddLayer = function( {label, value} ) {

        let filteredData = valueData[label];

        if(haveSet) {
            updateLayerEChart(filteredData,title);
        }
        else {
            addLayerEChart(geoData,filteredData,title,map);
            haveSet = true;
        }
    };

    sliderControl = L.control.timelineSlider({
        timelineItems: timeArray,
        changeMap: getDataAddLayer,
        extraChangeMapParams: {exclamation: "Hello World!"} });

    sliderControl.addTo(map);
};


/**
 * 添加滑动控件对应的数据和事件
 * @param keyArray
 * @param geoData
 * @param valueData
 * @param title
 */
function setSliderMarkerData(keyArray,timeArray,geoData,valueData,title,map){

    let getDataAddMarkers = function( {label, value} ) {

        let filteredData = valueData[label];

        if(haveSet) {
            updateMarkerEChart2(keyArray,geoData,filteredData,map);
            console.log("update");
        }
        else {
            addMarkerEChart2(keyArray,geoData,filteredData,map);
            haveSet = true;
            console.log("add");
        }
    };

    sliderControl = L.control.timelineSlider({
        timelineItems: timeArray,
        changeMap: getDataAddMarkers,
        extraChangeMapParams: {exclamation: "Hello World!"} });

    sliderControl.addTo(map);
};


function setSliderHeatData(timeArray,geoData,valueData,title,map){

    let getDataAddHeat = function( {label, value} ) {

        let filteredData = valueData[label];

        if(haveSet) {
            updateSliderHeatLayer(geoData,filteredData,map);
            console.log("update");
        }
        else {
            addSliderHeatLayer(geoData,filteredData,map);
            haveSet = true;
            console.log("add");
        }
    };

    sliderControl = L.control.timelineSlider({
        timelineItems: timeArray,
        changeMap: getDataAddHeat,
        extraChangeMapParams: {exclamation: "Hello World!"} });

    sliderControl.addTo(map);
};
/**
 * 添加滑动控件
 * @param title
 */
function addSlider(title,map,type){

    $.getJSON("/leafletMap/leaflet/data/stations.json", function (jsonData) { //获取站点坐标值
        if (jsonData) {

            let geoData = jsonData;

            if (type == "layer") {
                $.getJSON("/leafletMap/leaflet/data/warn10.json", function (jsonData) { //获取站点坐标值

                    if (jsonData) {

                        let valueData = jsonData;

                        let keyArray = Object.keys(valueData);

                        console.log(keyArray);

                        setSliderData(keyArray, geoData, valueData, title, map);
                    }
                });
            }
            else if (type == "marker")
            {

                $.getJSON("/leafletMap/leaflet/data/yl10.json", function (jsonData) { //获取站点坐标值

                    if (jsonData) {

                        let keyArray = jsonData["key"];
                        let valueData = jsonData["value"];

                        let timeArray = Object.keys(valueData);

                        console.log(keyArray);

                        console.log(timeArray);

                        setSliderMarkerData(keyArray, timeArray, geoData, valueData, title, map);
                    }
                });
            }
            else if (type == "heat")
            {
                $.getJSON("/leafletMap/leaflet/data/warn10.json", function (jsonData) { //获取站点坐标值

                    if (jsonData) {

                        let valueData = jsonData;

                        let timeArray = Object.keys(valueData);

                        console.log(timeArray);

                        setSliderHeatData(timeArray, geoData, valueData, title, map);
                    }
                });
            }
        }
    });
};

/**
 * 删除滑动控件
 */
function removeSlider(map,type){
    if(type=="layer"){
        closeLayerEChart(map);
        sliderControl.remove();
        haveSet = false;
    } else if(type=='marker'){
        removeMarkerEChart();
        sliderControl.remove();
        haveSet = false;
    } else if(type == 'heat'){
        removeHeatLayer();
        sliderControl.remove();
        haveSet = false;
    }

};