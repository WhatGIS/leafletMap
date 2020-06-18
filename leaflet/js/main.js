// <link rel="stylesheet" href="leaflet/js/lib/font-awesome/css/font-awesome.min.css">
//     <script src="leaflet/js/lib/jquery/jquery-3.5.1.js" type="application/javascript"></script>
//
//     <link rel="stylesheet" href="leaflet/js/lib/layui/css/layui.css">
//     <script src="leaflet/js/lib/layui/layui.all.js" type="application/javascript"></script>
//     <link rel="stylesheet" href="leaflet/js/lib/ecgs16/css/css.css">
//
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/leaflet.css" />
//     <script src="leaflet/js/lib/leaflet/leaflet-src.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/leaflet/plugins/providers/proj4.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/leaflet/plugins/providers/proj4leaflet.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/leaflet/plugins/providers/leaflet.ChineseTmsProviders.js" type="text/javascript"></script>
//
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/plugins/markercluster/MarkerCluster.css">
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/plugins/markercluster/MarkerCluster.Default.css">
//     <script src="leaflet/js/lib/leaflet/plugins/markercluster/leaflet.markercluster-src.js" type="application/javascript"></script>
//
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/plugins/mousePos/L.Control.MousePosition.css"></link>
//     <script src="leaflet/js/lib/leaflet/plugins/mousePos/L.Control.MousePosition.js"></script>
//
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/plugins/search/leaflet-search.src.css">
//     <script src="leaflet/js/lib/leaflet/plugins/search/leaflet-search.src.js" type="application/javascript"></script>
//
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/plugins/measure/leaflet-measure.css"/>
//     <script src="leaflet/js/lib/leaflet/plugins/measure/leaflet-measure.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/leaflet/plugins/html2canvas/html2canvas.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/exportMap/exportMap.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/leaflet/plugins/sides/leaflet-side-by-side.js" type="application/javascript"></script>
//
//     <link rel="stylesheet" href="leaflet/js/lib/leaflet/plugins/sidebar/leaflet-sidebar.css">
//     <script src="leaflet/js/lib/leaflet/plugins/sidebar/leaflet-sidebar.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/vr/three.min.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/vr/src/sphoords.js"></script>
//     <script src="leaflet/js/lib/vr/src/PhotoSphereViewer.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/vr/src/PSVNavBar.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/vr/src/PSVNavBarButton.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/vr.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/leaflet/plugins/echart/echarts.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/leaflet/plugins/echart/leaflet-echarts.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/chart/controlChart.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/chart/tabChart.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/chart/layerChart.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/chart/markerChart.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/slider/slider_chart.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/leaflet/plugins/slider/leaflet-timeline-slider.js" type="application/javascript"></script>
//
//     <script src="leaflet/js/lib/leaflet/plugins/heatmap/simpleheat.js" type="application/javascript"></script>
//     <script src="leaflet/js/lib/leaflet/plugins/heatmap/leaflet-heat.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/leafletplugin/heatmap/heatmap.js" type="application/javascript"></script>


//     <script src="leaflet/js/app/devAPI.js" type="application/javascript"></script>
//     <script src="leaflet/js/app/getgongyi.js" type="application/javascript"></script>
let paths = {
        app: 'app',
        lib: 'lib',
        pluginFolder:'lib/plugins',
        jquery:'lib/jquery/jquery-3.5.1',
        layui:'lib/layui/layui.all',
        echarts:'lib/plugins/echart/echarts',
        html2Canvas:'lib/plugins/html2canvas/html2canvas',
        L:'lib/leaflet/leaflet-src',

        baseMap:'app/leafletPlugin/baseMap',
        chinaProvider:"lib/plugins/providers/leaflet.ChineseTmsProviders",
        sideBySide:'lib/plugins/sides/leaflet-side-by-side',
        mousePosition:'lib/plugins/mousePos/L.Control.MousePosition',
        Measure:'lib/plugins/measure/leaflet-measure',
        sideBar:'lib/plugins/sidebar/leaflet-sidebar',
        layerEChart:'lib/plugins/echart/leaflet-echarts',
        markerCluster:'lib/plugins/markercluster/leaflet.markercluster-src',

        //Search:'lib/leaflet/plugins/search/leaflet-search.src',

        gongYi:'app/getgongyi',
        syllMap:'app/syllmap',
        controlChart:'app/leafletPlugin/chart/controlChart',
        exportMap:'app/leafletPlugin/exportMap/exportMap',
    };

let shim = {
    // Search:{
    //     deps:['L'],
    //     exports:'Search'
    // },
    'syllMap':{
        deps:['css!main.css','css!lib/font-awesome/css/font-awesome.css'],
        exports:'syllMap'
    },
    'layerEChart':{
        deps:['L','echarts'],
        exports:'layerEChart'
    },
    'layui':{
        deps:['css!lib/layui/css/layui.css'],
        exports:'layui'
    },
    'sideBar': {
        deps:['L','css!pluginFolder/sidebar/leaflet-sidebar.css'],
        exports:'sideBar'
    },
    'Measure':{
        deps:['L','css!pluginFolder/measure/leaflet-measure.css'],
        exports:'Measure'
    },
    'mousePosition': {
        deps:['L','css!pluginFolder/mousePos/L.Control.MousePosition.css'],
        exports:'mousePosition'
    },
    'baseMap':{
        deps:['L','chinaProvider'],
        exports:'baseMap'
    },
    'chinaProvider': {
        deps:['L'],
        exports:'chinaProvider'
    },
    'sideBySide':{
        deps:['L','css!pluginFolder/sides/layout.css','css!pluginFolder/sides/range.css'],
        exports: 'sideBySide'
    },
    'markerCluster':{
        deps:['L','css!pluginFolder/markercluster/MarkerCluster.css','css!pluginFolder/markercluster/MarkerCluster.Default.css'],
        exports:'markerCluster'
    },
    'L':{
        deps:['css!lib/leaflet/leaflet.css'],
        exports:'L'
    }
};
requirejs.config({

    urlArgs: "bust=" +  (new Date()).getTime(),

    baseUrl: 'leaflet/js',
    map:{
        '*':{
            css:'css'
        }
    },
    paths: paths,
    shim: shim
});

require(['jquery','syllMap'],function(
        $,
        syllMap
        ){
    console.log($);

    let option = {
        mapId:"divmap",
        treeId:"treeDiv"
    };

    syllMap.initialMap(option);

    document.getElementById("btnExport").addEventListener("click",function () {
        syllMap.exportMap();
    })

    document.getElementById("btnPrint").addEventListener("click",function () {
        window.print();
    })

    document.getElementById("chkcluster").addEventListener("change",function () {
        let chkcluster = document.getElementById("chkcluster");

        syllMap.setCLuster(chkcluster.checked);

        syllMap.addStations();
    });

    document.getElementById("chktooltip").addEventListener("change",function () {

        let chkShowTip = document.getElementById("chktooltip");

        syllMap.ToggleTooltip(chkShowTip.checked);
    });

    document.getElementById("chkScroll").addEventListener("change",function () {

        let chkScroll = document.getElementById("chkScroll");

        syllMap.setSideBySide(chkScroll.checked);
    });

    //所有泵房流量历史数据柱状图
    document.getElementById("chkLL").addEventListener("change",function () {
        let chkLL = document.getElementById("chkLL");
        let title = chkLL.title;
        syllMap.setMarkerChart(chkLL.checked,title);

    });

    //泵房压力历史数据时空图
    document.getElementById("chkYL").addEventListener("change",function () {
        let chkYL = document.getElementById("chkYL");
        let title = chkYL.title;
        syllMap.setSlider(chkYL.checked,title,'marker');
    });

    //泵房报警历史数据时空图
    document.getElementById("chkWarn").addEventListener("change",function () {
        let chkWarn = document.getElementById("chkWarn");
        let title = chkWarn.title;
        syllMap.setSlider(chkWarn.checked,title,'layer');
    });

    //单个综合数据实时图
    document.getElementById("chkzongHe").addEventListener("change",function () {
        let chkzongHe = document.getElementById("chkzongHe");
        let title = chkzongHe.title;
        syllMap.setControlChart(chkzongHe.checked,title);

    });

    //泵房区域热力图
    document.getElementById("chkHeatStation").addEventListener("change",function () {
        let chkHeatStation = document.getElementById("chkHeatStation");
        let title = chkHeatStation.title;
        syllMap.setHeatLayer(chkHeatStation.checked,title);
    });

    //泵房区域热力图
    document.getElementById("chkHeatWarn").addEventListener("change",function () {
        let chkHeatWarn = document.getElementById("chkHeatWarn");
        let title = chkHeatWarn.title;
        syllMap.setSlider(chkHeatWarn.checked,title,'heat');
    });


});
