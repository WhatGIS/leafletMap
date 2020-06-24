define(['jquery','L','timeSlider','layerChart','markerChart','heatmap'],function ($,L,timeSlider,layerChart,markerChart,heatmap) {
    /**
     * 滑动控件
     */
    let sliderControls={};

    /**
     * 控件是否已经添加的标识，已经添加 true 就 update，false 就 add.
     * @type {boolean}
     */
    let haveSet = false;

    let haveType = "";
    /**
     * 添加滑动控件对应的数据和事件
     * @param keyArray
     * @param geoData
     * @param valueData
     * @param title
     */
    function setSliderLayerData(timeArray,geoData,valueData,title,map){

        let getDataAddLayer = function( {label, value} ) {

            let filteredData = valueData[label];

            if(haveSet) {
                layerChart.updateLayerEChart(filteredData,title);
            }
            else {
                layerChart.addLayerEChart(geoData,filteredData,title,map);
                haveSet = true;
            }
        };

        let sliderControl = L.control.timelineSlider({
            timelineItems: timeArray,
            changeMap: getDataAddLayer,
            extraChangeMapParams: {exclamation: "Hello World!"} });

        sliderControl.addTo(map);

        sliderControls['layer']  = sliderControl
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
                markerChart.updateMarkerEChart2(keyArray,geoData,filteredData,map);
                console.log("update");
            }
            else {
                markerChart.addMarkerEChart2(keyArray,geoData,filteredData,map);
                haveSet = true;
                console.log("add");
            }
        };

        let sliderControl = L.control.timelineSlider({
            timelineItems: timeArray,
            changeMap: getDataAddMarkers,
            extraChangeMapParams: {exclamation: "Hello World!"} });

        sliderControl.addTo(map);

        sliderControls['marker'] = sliderControl;
    };


    function setSliderHeatData(timeArray,geoData,valueData,title,map){

        let getDataAddHeat = function( {label, value} ) {

            let filteredData = valueData[label];

            if(haveSet) {
                heatmap.updateSliderHeatLayer(geoData,filteredData,map);
                console.log("update");
            }
            else {
                heatmap.addSliderHeatLayer(geoData,filteredData,map);
                haveSet = true;
                console.log("add");
            }
        };

        let sliderControl = L.control.timelineSlider({
            timelineItems: timeArray,
            changeMap: getDataAddHeat,
            extraChangeMapParams: {exclamation: "Hello World!"} });

        sliderControl.addTo(map);

        sliderControls['heat'] = sliderControl;
    };
    /**
     * 添加滑动控件
     * @param title
     */
    function addSlider(title,map,type){
        haveType = type;
        $.getJSON("/leafletMap/leaflet/data/stations.json", function (jsonData) { //获取站点坐标值
            if (jsonData) {

                let geoData = jsonData;

                if (type == "layer") {
                    $.getJSON("/leafletMap/leaflet/data/warn10.json", function (jsonData) { //获取站点坐标值

                        if (jsonData) {

                            let valueData = jsonData;

                            let keyArray = Object.keys(valueData);

                            console.log(keyArray);

                            setSliderLayerData(keyArray, geoData, valueData, title, map);
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

    function getType(){
        return haveType;
    }

    /**
     * 删除滑动控件
     */
    function removeSlider(map,type){

        haveSet = false;
        haveType = "";

        if(type=="layer"){
            layerChart.removeLayerEChart(map);
            sliderControls['layer'].remove();

            haveSet = false;

            let chkWarn = document.getElementById("chkWarn");
            chkWarn.checked = false;
            haveType = ""

        } else if(type=='marker'){
            markerChart.removeMarkerEChart();
            sliderControls['marker'].remove();
            haveSet = false;
            let chkYL = document.getElementById("chkYL");
            chkYL.checked = false ;

        } else if(type == 'heat'){
            heatmap.removeHeatLayer();
            sliderControls['heat'].remove();
            haveSet = false;
            let chkHeatWarn = document.getElementById("chkHeatWarn");
            chkHeatWarn.checked = false;

        }
    };
    
    return{
        getType:getType,
        addSlider: addSlider,
        removeSlider:removeSlider
    };
})
