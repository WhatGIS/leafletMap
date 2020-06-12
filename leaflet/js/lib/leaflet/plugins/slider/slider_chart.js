

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
function setSliderData(keyArray,geoData,valueData,title,map){

    let getDataAddMarkers = function( {label, value} ) {

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
        timelineItems: keyArray,
        changeMap: getDataAddMarkers,
        extraChangeMapParams: {exclamation: "Hello World!"} });

    sliderControl.addTo(map);
};

/**
 * 添加滑动控件
 * @param title
 */
function addSlider(title,map){

    $.getJSON("/leafletMap/leaflet/data/stations.json", function (jsonData) { //获取站点坐标值
        if (jsonData) {

            let geoData = jsonData;

            $.getJSON("/leafletMap/leaflet/data/warn10.json", function (jsonData) { //获取站点坐标值

                if (jsonData) {

                    let valueData = jsonData;

                    let keyArray = Object.keys(valueData);

                    console.log(keyArray);

                    setSliderData(keyArray,geoData,valueData,title,map);
                }
            });
        }
    });
};

/**
 * 删除滑动控件
 */
function removeSlider(map){
    closeLayerEChart(map);
    sliderControl.remove();
    haveSet = false;
};
