

function setMarkerEChart(geoData,RawTime,jsonData,map) {

    let id =0;

    $.each(jsonData, function (i, val) {

        let location = geoData[i].reverse();

        let domId = "marker"+id;

        let icon = L.divIcon({
            className: 'leaflet-echart-icon',
            iconSize: [250, 220],
            html: '<div id="' + domId + '" style="width: 250; height: 220px; position: relative; background-color: transparent;"></div>'
        });

        let picMarker = L.marker(L.latLng(location), {
            icon:icon
        }).addTo(map);

        let dom = document.getElementById('marker'+id);
        // 基于准备好的dom，初始化eChart实例


        let myChart = echarts.init(dom);

        // 指定图表的配置项和数据
        let option = {

            title: {
                text: i,
                x:'center',
                textStyle: {
                    color: 'rgba(156,8,8,0.93)',
                    textBorderColor:'#ffffff',
                    textBorderWidth:1,
                },
            },
            backgroundColor:'rgba(255,255,255,0.26)',

            color: ['#c23531', '#eaf308', '#1a4bdb'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['一区', '二区', '三区'],
                orient: 'vertical',
                right:3,
                textStyle:{
                    color: '#b14141',
                    textBorderColor:'#fff',
                    textBorderWidth:1
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: false},
                    dataView: {show: false, readOnly: false},
                    magicType: {show: false, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: false},
                    saveAsImage: {show: true}
                }
            },
            xAxis: [
                {
                type: 'category',
                axisTick:{show:false},
                data: RawTime,
                axisLabel:{
                    color: '#b14141',
                    textBorderColor:'#fff',
                    textBorderWidth:1
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel:{
                    color: '#b14141',
                    textBorderColor:'#fff',
                    textBorderWidth:1
                }
            }],
            series: [{
                name: '一区',
                type: 'bar',
                barGap: 0,
                data: val['一区瞬时流量']
                },{
                name: '二区',
                type: 'bar',
                data: val['二区瞬时流量']
                },{
                name: '三区',
                type: 'bar',
                data: val['三区瞬时流量']
             }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        myChart.getZr().off("dragstart", function() {});
        myChart.getZr().off("dragend", function() {});
        myChart.getZr().off("mouseup", function() {});
        myChart.getZr().off("mousedown", function() {});
        myChart.getZr().off("mousewheel", function() {});

        id++;
    });
}

function removeMarkerEChart() {
    //$('.leaflet-marker-icon').remove();
    $('.leaflet-echart-icon').remove();
}

function addMarkerEChart(map) {
    $.getJSON("/leafletMap/leaflet/data/stations.json", function (jsonData) { //获取站点坐标值
        if (jsonData) {
            let geoData = jsonData;

            $.getJSON("/leafletMap/leaflet/data/ll10.json", function (jsonData) { //获取站点坐标值
                if (jsonData) {

                    let RawTime = jsonData["时间"];

                    setMarkerEChart(geoData,RawTime,jsonData["value"],map);
                }
            });
        }
    });
};

function updateMarkerEChart2(keyArray,geoData,jsonData,map){
    removeMarkerEChart();
    addMarkerEChart2(keyArray,geoData,jsonData,map);
}


function addMarkerEChart2(keyArray,geoData,jsonData,map) {

    let id =0;

    $.each(jsonData, function (i, val) {

        let cname = val['name'];
        let cvalue = val['value'];

        let curLocation = JSON.parse(JSON.stringify(geoData[cname]));

        let location = curLocation.reverse();

        let domId = "marker"+i;

        let icon = L.divIcon({
            className: 'leaflet-echart-icon',
            iconSize: [380, 300],
            html: '<div id="' + domId + '" style="width: 380; height: 300px; position: relative; background-color: transparent;"></div>'
        });

        let picMarker = L.marker(L.latLng(location), {
            icon:icon
        }).addTo(map);

        let dom = document.getElementById('marker'+id);
        // 基于准备好的dom，初始化eChart实例


        let myChart = echarts.init(dom);

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: cname + " :MPa",
                left:'left',
                textStyle: {
                    color: 'rgba(156,8,8,0.93)',
                    textBorderColor:'#ffffff',
                    textBorderWidth:1,
                },
            },
            backgroundColor:'rgba(255,255,255,0.26)',

            color: ['#c23531', '#eaf308', '#1a4bdb', '#13930f'],
            tooltip: {},
            // legend: {
            //     data: keyArray
            // },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: false},
                    dataView: {show: false, readOnly: false},
                    magicType: {show: false, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: false},
                    saveAsImage: {show: true}
                }
            },
            radar:{
                name:{
                    textStyle:{
                        color:'#fff',
                        backgroundColor:'#999',
                        borderRadius:3,
                        padding:[3,5]
                    }
                },
                indicator:[
                    {name: "进水压力",max:20},
                    {name: "一区压力",max:20},
                    {name: "二区压力",max:20},
                    {name: "三区压力",max:20}
                ]
            },
            series: [{
                name: '泵房压力',
                type: 'radar',
                data: [
                    {
                        name:"泵房压力",
                        value:cvalue
                    }
                ],
                label:{
                    show:true,
                    position: 'top',
                    fontSize:16,
                    fontWeight:'bold',
                    textBorderColor:'#fff',
                    textBorderWidth:1
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        myChart.getZr().off("dragstart", function() {});
        myChart.getZr().off("dragend", function() {});
        myChart.getZr().off("mouseup", function() {});
        myChart.getZr().off("mousedown", function() {});
        myChart.getZr().off("mousewheel", function() {});

        id++;
    });

};