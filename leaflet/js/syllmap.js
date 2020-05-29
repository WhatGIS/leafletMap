/**
 * 所有引用的 plugins，不要随意更新到官网或者 github上的新版本，有些 plugins 已进行修改定制。包括 leaflet.js leaflet.css
 * zhangjie.20200527
 */

var  SYLLMap = function(optOptions){

    let options = optOptions || {};
    let id = options.mapId;//地图组件divId
    let treeid = options.treeId //树形组件divId

    let map = null; //地图全局变量

    let gatherCluster = false;//是否聚合的标识

    let showAllTip = false;//是否显示全部的标注

    let areaLayer = new L.featureGroup();//区域图层
    let markerLayer = new L.layerGroup();//站点图层
    let overLayer;  //业务数据图层

    let searchControl; //查询组件

    let dataStations = []; //已经处理好的站点数据

    let sidebar = null;//侧边栏组件，作为全局变量是因为导出图片时，如果侧边栏是展开的，会影响左边控件的位置。

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

    /**
     * 初始化地图
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



            searchControl = new L.Control.Search({
                position:"topleft",
                sourceData: localData,//采用数据传递，不再使用图层处理数据
                initial:false,
                zoom: 18,
                //marker:true,
                //buildTip: customTip,
                collapsed:true,
                hideMarkerOnCollapse:true
            });
            map.addControl(searchControl);

            let measureControl = new L.Control.Measure({
                position: 'topright',
                primaryLengthUnit: 'meters',
                secondaryLengthUnit: 'kilometers',
                primaryAreaUnit: 'acres',
                secondaryAreaUnit: 'sqmeters',
                activeColor: '#e2a25d',
                completedColor: '#f16303'
            });
            measureControl.addTo(map);

            sidebar = L.control.sidebar("sidebar").addTo(map);
        };
    };

    function getOverLayers(){
        addStations();
        addArea();
        //return [areaLayer,markerLayer];
        //
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
        let colors = ["#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#F0F8FF","#FAEBD7","#7FFFD4","#F0FFFF","#F5F5DC","#FFE4C4"];
        let coords = area.split(","),latlngs = [];
        for(var j=0;j<coords.length;j++){
            latlngs.push([parseFloat(coords[j].split(' ')[1]),parseFloat(coords[j].split(' ')[0])])
        }
        let Color = colors[Math.round(Math.random()*10)];
        let polygon = new L.Polygon(latlngs, {
            fillOpacity: 0.5,
            opacity: 1,
            dashArray: "5,5",
            weight: 3,
            color:color?color:"#000",
            fillColor:color?color:Color
        }).addTo(areaLayer);
    };

    /**
     * 获取区域的数据
     */
    function getDivisions(){
        areaLayer.clearLayers();
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
        });
    };

    /**
     * 添加站点
     */
    function addStations() {
        $.getJSON("/leafletMap/leaflet/data/HFStations.json",function(stationJson){
            let data = stationJson.RECORDS;
            console.log(data);
            if(data.length>0){

                let data1 = reSizeData(data)

                //renderStation(data1);

                addAllStations(data1)
                    .then(addTreeView);


            }

            areaLayer.addTo(map);
        });
    };

    function addTreeView() {
        if (!hasSetTree)
            setTreeView();
    }

    function addAllStations(data1){
        let dfd = $.Deferred();
        setTimeout(function () {
            renderStation(data1)
            dfd.resolve();
        }, 500);

        return dfd.promise();
    }

    let hasSetTree = false;

    /**
     * 重新整理数据 ，主要是将xy整理为loc。
     * @param data
     * @returns {[]}
     */
    function reSizeData(data) {

            dataStations = [];

            for (let i = 0; i < data.length; i++) {
                let a = data[i];
                let newData = {};
                newData.title = a.areatitle;
                newData.stationId = a.stationid;
                newData.stationnum = a.stationnum;
                newData.typecode = a.typecode;
                newData.typetitle = a.typetitle;
                newData.suotitle = a.suotitle;
                newData.status = a.status;
                newData.loc = [parseFloat(a.y), parseFloat(a.x)];

                if (!hasSetTree)
                    setTreeData(newData);

                dataStations.push(newData);
            }

            console.log(rootTree);


    }

    let rootTree = [];

    let filterTree = [];

    /**
     * 设置树形图
     */
    function setTreeView() {

            let tree = layui.tree, layer = layui.layer, util = layui.util;

            function checkStationVisible(filterData,flag){

                try{

                    if(flag==="add"){
                        if(filterData.children){
                            filterData.children.forEach(function(child,index){

                                if(child.title) {
                                    if (filterTree.indexOf(child.title) == -1)
                                        filterTree.push(child.title);
                                }
                            });
                        }else {
                            if(filterTree.indexOf(filterData.title)==-1)
                            filterTree.push(filterData.title);
                        }
                    } else if(flag=="remove"){
                        if(filterData.children){
                            filterData.children.forEach(function(child,index){
                                if(child.title){
                                   let idx = filterTree.indexOf(child.title);
                                   if(idx>-1){
                                       filterTree.splice(idx,1);
                                   }
                                }
                            });
                        }else {

                            let idx = filterTree.indexOf(filterData.title);
                            if(idx>-1){
                                filterTree.splice(idx,1);
                            }
                        }
                    }
                }catch{

                }
                finally {
                    console.log(filterTree);
                    renderStation();
                }
            }

            tree.render({
                elem: "#" + treeid,
                data: rootTree,
                id: "treeView",
                showCheckbox: true,
                accordion: true,
                click: function (obj) {
                    let clickData = obj.data;
                    searchControl.searchText(clickData.title,dataStations);

                    console.log("状态:" + obj.state + " <br> 节点数据:" + JSON.stringify(clickData));
                },
                oncheck: function(obj){
                    console.log("节点数据:"+obj.data); //得到当前点击的节点数据
                    console.log("节点状态:"+obj.checked); //得到当前节点的展开状态：open、close、normal
                    console.log("节点元素:"+obj.elem); //得到当前节点元素

                    //console.log(dataStations);//维护站点visible
                    if(hasSetTree)
                    checkStationVisible(obj.data ,obj.checked?"remove":"add");
                }
            });

            hasSetTree = true;

            console.log("addAllTree!");

    }

    function setTreeData(data) {

        let childItem = {};
        childItem.title = data.title;
        //childItem.id = data.stationId;
        //childItem.spread = true;
        childItem.checked = false;

        let hasAdd = false;

        if(rootTree&&rootTree.length>0){
            for(let i=0;i<rootTree.length;i++){
                let rootItem = rootTree[i];
                if(rootItem.title===data.suotitle){
                    rootItem.children.push(childItem);
                    hasAdd = true;
                    break;
                }
            }
        }

        if(!hasAdd){
            let rootItem = {};

            rootItem.title = data.suotitle;
            rootItem.id = data.suotitle;
            rootItem.checked = true;
            rootItem.children = [];
            rootItem.children.push(childItem);

            rootTree.push(rootItem);
        }
    }

    /**
     * 添加站点
     */
    function renderStation () {

        console.log("RenderAllStations!");

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

        if(gatherCluster){ //聚合模式

            markerLayer = L.markerClusterGroup({ chunkedLoading: true });

            for (let i = 0; i < dataStations.length; i++) {
                let a = dataStations[i];
                let title = a.title;

                let index = filterTree.indexOf(title);
                if(index==-1){  //不在过滤范围内的才渲染，filterTree是树形图的过滤数组
                    let micon = staticon;
                    let status = a.status;
                    if(status==="0"){
                        micon = stopicon;
                    } else if(status ==="2"){
                        micon = warnicon;
                    }

                    let marker = L.marker(L.latLng(a.loc), {icon:micon});

                    let popTab = getPopupContent(a,map);
                    marker.bindPopup(popTab);

                    marker.bindTooltip(title);
                    markerLayer.addLayer(marker);
                }
            }

            map.addLayer(markerLayer);

        }else{ //非聚合模式

            markerLayer = new L.layerGroup(null,{pane:"markerPane"});

            for (let i = 0; i < dataStations.length; i++) {
                let a = dataStations[i];
                let title = a.title;

                let index = filterTree.indexOf(title);
                if(index==-1) {  //不在过滤范围内的才渲染，filterTree是树形图的过滤数组

                    let micon = staticon;
                    let status = a.status;

                    if (status === "0") {
                        micon = stopicon;
                    } else if (status === "2") {
                        micon = warnicon;
                    }

                    let marker = L.marker(L.latLng(a.loc), {icon: micon});

                    let popTab = getPopupContent(a,map);
                    marker.bindPopup(popTab);

                    marker.bindTooltip(title);
                    markerLayer.addLayer(marker);
                }
            }

            map.addLayer(markerLayer);
        }
    };


    /**
     * 设置聚合的标识符
     * @param flag
     */
    function setCluster(flag) {
        gatherCluster = flag;
    }

    /**
     * 设置标注的标识符
     * @param flag
     * @constructor
     */
    function ToggleTooltip(flag){
        showAllTip = flag;

        renderStation();
    }

    /**
     * 导出图片
     */
    function exportMap(){
        if(sidebar){
            sidebar.close();
        }
        exportImage(id);
    }

    /**
     * 卷帘控件
     * 先初始化为全局变量，勾选时再进行显示处理
     */
    let sideControl = L.control.sideBySide(null,null);
    function setSideBySide(flag){

        if(flag){
            sideControl.addTo(map);
            sideControl.setLeftLayers(markerLayer);
            sideControl.setRightLayers(null);
            console.log("卷帘大将在此！")
        } else {
            sideControl.remove();
            console.log("卷帘大将拜拜！")
        }
    };

    return{
        initialMap: initialMap,
        getOverLayers: getOverLayers,
        addStations: addStations,
        setCLuster: setCluster,
        ToggleTooltip:ToggleTooltip,
        exportMap: exportMap,
        setSideBySide: setSideBySide
    }
};
