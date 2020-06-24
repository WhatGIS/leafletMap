let paths = {
        /* Folder Path */
        app: 'app',
        lib: 'lib',
        pluginFolder:'lib/plugins',

        /* 基础库 */
        jquery:'lib/jquery/jquery-3.5.1',
        layui:'lib/layui/layui.all',
        html2Canvas:'lib/plugins/html2canvas/html2canvas',
        L:'lib/leaflet/leaflet-src',

        /* leaflet 插件库 */
        chinaProvider:"lib/plugins/providers/leaflet.ChineseTmsProviders",
        sideBySide:'lib/plugins/sides/leaflet-side-by-side',
        mousePosition:'lib/plugins/mousePos/L.Control.MousePosition',
        Measure:'lib/plugins/measure/leaflet-measure',
        sideBar:'lib/plugins/sidebar/leaflet-sidebar',

        echarts:'lib/plugins/echart/echarts',
        leafletEChart:'lib/plugins/echart/leaflet-echarts',

        markerCluster:'lib/plugins/markercluster/leaflet.markercluster-src',
        timeSlider:'lib/plugins/slider/leaflet-timeline-slider',

        simpleheat:'lib/plugins/heatmap/simpleheat',
        leafletheat:'lib/plugins/heatmap/leaflet-heat',

        search:'lib/plugins/search/leaflet-search.src',

        /* 全景图库 */
        threeJs:'lib/vr/three.min',
        sphoords:'lib/vr/src/sphoords',
        PSVNavBar:'lib/vr/src/PSVNavBar',
        PSVNavBarButton:'lib/vr/src/PSVNavBarButton',
        PhotoSphereViewer:'lib/vr/src/PhotoSphereViewer',

        /* leaflet 自写库 */
        baseMap: 'app/leafletPlugin/baseMap',
        controlChart: 'app/leafletPlugin/chart/controlChart',
        markerChart: 'app/leafletPlugin/chart/markerChart',
        sliderChart: 'app/leafletPlugin/slider/slider_chart',
        layerChart:'app/leafletPlugin/chart/layerChart',
        heatmap: 'app/leafletPlugin/heatmap/heatmap',
        exportMap: 'app/leafletPlugin/exportMap/exportMap',

        gongYi: 'app/getgongyi',
        syllMap: 'app/syllmap'
    };

let shim = {

    'search':{
        deps:['L','css!lib/plugins/search/leaflet-search.src.css'],
        exports:'search'
    },
    'syllMap':{
        deps:['css!main.css','css!lib/font-awesome/css/font-awesome.css'],
        exports:'syllMap'
    },
    'gongYi':{
        deps:['css!lib/ecgs16/css/css.css'],
        exports:'gongYi'
    },
    'heatmap':{
        deps:['L','leafletheat'],
        exports:'heatmap'
    },
    'leafletheat':{
        deps:['L','simpleheat'],
        exports:'leafletheat'
    },

    'layerChart':{
        deps:['L','leafletEChart'],
        exports:'layerChart'
    },

    // 'leafletEChart':{
    //     deps:['L','echarts'],
    //     exports:'leafletEChart'
    // },

    'layui':{
        deps:['css!lib/layui/css/layui.css'],
        exports:'layui'
    },

    'sliderChart':{
        deps:['L','timeSlider'],
        exports:'sliderChart'
    },
    'timeSlider':{
        deps:['L'],
        exports: 'timeSlider'
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

    //urlArgs: "v=" +  (new Date()).getTime(),

    baseUrl: 'leaflet/js',
    map:{
        '*':{
            css:'require/plugins/css',
            text:'require/plugins/text',
            image:'require/plugins/image',
            json:'require/plugins/json',
            domReady:'require/plugins/domReady'
        }
    },
    waitSeconds: 60,
    paths: paths,
    shim: shim
});

require(['jquery','syllMap'],function(
        $,
        syllMap
        ){
    //console.log($);

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

    // //所有泵房流量历史数据柱状图
    // document.getElementById("chkLL").addEventListener("change",function () {
    //     let chkLL = document.getElementById("chkLL");
    //     let title = chkLL.title;
    //     syllMap.setMarkerChart(chkLL.checked,title);
    //
    // });
    //
    // //泵房压力历史数据时空图
    // document.getElementById("chkYL").addEventListener("change",function () {
    //     let chkYL = document.getElementById("chkYL");
    //     let title = chkYL.title;
    //     syllMap.setSlider(chkYL.checked,title,'marker');
    // });

    // //单个综合数据实时图
    // document.getElementById("chkzongHe").addEventListener("change",function () {
    //     let chkzongHe = document.getElementById("chkzongHe");
    //     let title = chkzongHe.title;
    //     syllMap.setControlChart(chkzongHe.checked,title);
    //
    // });

    //泵房报警历史数据时空图
    document.getElementById("chkWarn").addEventListener("change",function () {
        let chkWarn = document.getElementById("chkWarn");
        let title = chkWarn.title;
        syllMap.setSlider(chkWarn.checked,title,'layer');
    });



    //泵房区域热力图
    document.getElementById("chkHeatStation").addEventListener("change",function () {
        let chkHeatStation = document.getElementById("chkHeatStation");
        let title = chkHeatStation.title;
        syllMap.setHeatLayer(chkHeatStation.checked,title);
    });

    //泵房热力时空图
    document.getElementById("chkHeatWarn").addEventListener("change",function () {
        let chkHeatWarn = document.getElementById("chkHeatWarn");
        let title = chkHeatWarn.title;
        syllMap.setSlider(chkHeatWarn.checked,title,'heat');
    });

    layui.use('laydate',function(){
        var laydate = layui.laydate;

        laydate.render({
            elem:'#inputDate'
            ,type:'datetime'
            ,range:'到'
            ,format:'yyyy年M月d日H时m分s秒'
        });
    });

});
