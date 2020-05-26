
var  SYLLMap = function(optOptions){

    let options = optOptions || {};
    let id = options.id;
    let map = null;
    let areaLayer = new L.featureGroup();

    let gatherCluster = false;//是否聚合的标识

    let showAllTip = false;//是否显示全部的标注

    let markerLayer = new L.layerGroup();

    let overLayer;

    let searchControl;

    let dataStations = []; //站点数据
    /**
     * 初始化区域
     */
    function initialMap(){

        if(id){
            map = L.map(id, {
                //crs: L.CRS.Baidu, 百度地图专用
                center: [31.849584, 117.245202],
                zoom: 12,
                layers: [serverGroup],
                zoomControl: false,
                attributionControl: false
            });

            getOverLayers();

            overLayer ={
                "区域" : areaLayer,
                "站点": markerLayer
            }

            L.control.layers(baseLayers, overLayer).addTo(map);
            L.control.zoom({
                zoomInTitle: '放大',
                zoomOutTitle: '缩小'
            }).addTo(map);

            L.control.mousePosition().addTo(map);

            function localData(text, callResponse)
            {
                //here can use custom criteria or merge data from multiple layers
                callResponse(dataStations);
                return {	//called to stop previous requests on map move
                    abort: function() {
                        console.log('aborted request:'+ text);
                    }
                };
            }

            searchControl = new L.Control.Search({
                position:"topright",
                //layer: markerLayer,
                sourceData: localData,
                initial:false,
                zoom: 18,
                //marker:true,
                //buildTip: customTip,
                collapsed:true,
                hideMarkerOnCollapse:true
            });
            map.addControl(searchControl);
        };
    };

    function getOverLayers(){
        addArea();
        addStations();
        //return [areaLayer,markerLayer];
    }

    /**
     * 添加区域
     */
    function addArea(){
        getDivisions();
    };

    /**
     * 添加单个区域
     * @param area
     * @param color
     */
    function drawDivision(area,color){
        var colors = ["#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#F0F8FF","#FAEBD7","#7FFFD4","#F0FFFF","#F5F5DC","#FFE4C4"];
        var coords = area.split(","),latlngs = [];
        for(var j=0;j<coords.length;j++){
            latlngs.push([parseFloat(coords[j].split(' ')[1]),parseFloat(coords[j].split(' ')[0])])
        }
        var Color = colors[Math.round(Math.random()*10)];
        var polygon = new L.Polygon(latlngs, {
            fillOpacity: 0.6,
            opacity: 1,
            dashArray: "5,5",
            weight: 3,
            color:color?color:"#000",
            fillColor:color?color:Color
        }).addTo(areaLayer);
    };

    function getDivisions(){
        areaLayer.clearLayers();
        // 5d2185abbdb7fc00b8a36366 合肥线上
        // uniecgs803594e03duniecgs 本地
        //var conditions={"conditions":[{"Field":"cid","Operate":"=","Value":GCtx.customer._id,"Relation":"and"},{"Field":"pid","Operate":"=","Value":"5d2185abbdb7fc00b8a36366","Relation":"and"}],"order":[{"Field":"w","Type":false}],"size":999,"index":1}
        //Service.getdivisions(conditions,function(rep){
        $.getJSON("/leafletMap/leaflet/data/area.json",function(areaJson){
            var rows = areaJson.Response.rows;
            console.log(rows);
            if(rows.length>0){
                $.each(rows,function(i,ele){
                    if(!!ele.area){
                        drawDivision(ele.area,ele.color)
                    }
                });
            }
            //areaLayer.addTo(map);
        });

        //})
    };

    /**
     * 添加站点
     */
    function addStations() {
        //markerLayer.clearLayers();
        // 5d2185abbdb7fc00b8a36366 合肥线上
        // uniecgs803594e03duniecgs 本地
        //var conditions={"conditions":[{"Field":"cid","Operate":"=","Value":GCtx.customer._id,"Relation":"and"},{"Field":"pid","Operate":"=","Value":"5d2185abbdb7fc00b8a36366","Relation":"and"}],"order":[{"Field":"w","Type":false}],"size":999,"index":1}
        //Service.getdivisions(conditions,function(rep){
        $.getJSON("/leafletMap/leaflet/data/HFStations.json",function(stationJson){
            var data = stationJson.RECORDS;
            console.log(data);
            if(data.length>0){

                var data1 = reSizeData(data)

                renderStation(data1);
            }
            //areaLayer.addTo(map);
        });
    };

    // {
    //     "stationid": "5d3023b2bdb7fc1ddc70a525",
    //     "stationnum": "2300911161",
    //     "typecode": "2",
    //     "typename": "高层泵房",
    //     "name": "包河皖东小区一区",
    //     "x": "117.307229",
    //     "y": "31.827682",
    //     "area": "",
    //     "status": "0"
    // },

    /**
     * 重新整理数据
     * @param data
     * @returns {[]}
     */
    function reSizeData(data){

        for (let i = 0; i < data.length; i++) {
            let a = data[i];
            let newData = {};
            newData.title = a.title;
            newData.stationId = a.stationid;
            newData.stationnum = a.stationnum;
            newData.typecode = a.typecode;
            newData.typename = a.typename;
            newData.area = a.area;
            newData.status = a.status;
            newData.loc = [parseFloat(a.y),parseFloat(a.x)];

            dataStations.push(newData);
        }
    }

    function renderStation () {

        let LeafIcon = L.Icon.extend({
            options: {
                //shadowUrl: '/leafletMap/leaflet/png/leaf-shadow.png',
                iconSize:     [24, 24]
            }
        });

        let staticon = new LeafIcon({iconUrl:"/leafletMap/leaflet/png/ico27.gif"});

        let stopicon = new LeafIcon({iconUrl: "/leafletMap/leaflet/png/ico28.png"});

        let warnicon = new LeafIcon({iconUrl:"/leafletMap/leaflet/png/ico29.gif"});

        markerLayer.clearLayers();
        markerLayer = null;

        if(gatherCluster){
            markerLayer = L.markerClusterGroup({ chunkedLoading: true });

            for (let i = 0; i < dataStations.length; i++) {
                let a = dataStations[i];
                let title = a.title;
                let micon = staticon;
                let status = a.status;
                if(status==="0"){
                    micon = stopicon;
                } else if(status ==="2"){
                    micon = warnicon;
                }

                let marker = L.marker(L.latLng(a.loc), {icon:micon});
                var popupHtml = "<b>站点名称</b>:"+ title + "-" + a.typename + "<br>" +
                    "<b>站点ID</b>:" + a.stationId + "<br>"+
                    "<b>站点编号</b>:" + a.stationnum  + "<br>"+
                    "<b>类型编号</b>:"+ a.typecode + "<br>" +
                    "<b>类型名称</b>:" + a.typename + "<br>";

                    marker.bindTooltip(title);

                    marker.bindPopup(popupHtml);

                markerLayer.addLayer(marker);
            }

            map.addLayer(markerLayer);
        }else{
            markerLayer = new L.layerGroup();

            for (let i = 0; i < dataStations.length; i++) {
                let a = dataStations[i];
                let title = a.title;

                let micon = staticon;
                let status = a.status;
                if(status==="0"){
                    micon = stopicon;
                } else if(status ==="2"){
                    micon = warnicon;
                }

                let marker = L.marker(L.latLng(a.loc), {icon:micon});
                var popupHtml = "<b>站点名称</b>:"+ title + "-" + a.typename +"<br>" +
                    "<b>站点ID</b>:" + a.stationId + "<br>"+
                    "<b>站点编号</b>:" + a.stationnum  + "<br>"+
                    "<b>类型编号</b>:"+ a.typecode + "<br>" +
                    "<b>类型名称</b>:" + a.typename + "<br>";


                    marker.bindTooltip(title);

                    marker.bindPopup(popupHtml);

                markerLayer.addLayer(marker);
            }

            map.addLayer(markerLayer);
        }

        //searchControl.setLayer(markerLayer);
    };

    function setCluster(flag) {
        gatherCluster = flag;
    }

    function ToggleTooltip(flag){
        showAllTip = flag;

        renderStation();
    }

    return{
        initialMap: initialMap,
        addArea: addArea,
        addStations: addStations,
        setCLuster: setCluster,
        ToggleTooltip:ToggleTooltip
    }
};
