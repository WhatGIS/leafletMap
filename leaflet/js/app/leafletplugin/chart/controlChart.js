
//右下角control类型chart
let chartControl;

function addControlEChart(title,map){
    $.getJSON("/leafletMap/leaflet/data/history.json", function (jsonData) {
        let dataJson = jsonData;
        setControlEChart(title,map,dataJson);

    });
}

option = {
    // title: {
    //     text: '动态数据',
    //     subtext: '纯属虚构'
    // },
    color:['#c23531','#c23531', '#eaf308','#eaf308'
            , '#1a4bdb','#1a4bdb','#8405c9'
            ,'#91c7ae','#749f83', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data:['一区瞬时流量','一区压力','二区瞬时流量', '二区压力', '三区瞬时流量', '三区压力','进水压力']
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                let now = new Date();
                let res = [];
                let len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '压力',
            // max: 30,
            // min: 0,
            boundaryGap: [0.1, 0.1]
        },
        {
            type: 'value',
            scale: true,
            name: '瞬时流量',
            // max: 1200,
            // min: 0,
            boundaryGap: [0.1, 0.1]
        }
    ],
    series: [
        {
            name: '一区瞬时流量',
            type: 'bar',
            yAxisIndex: 1,
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            data: (function (){
                let res = [];
                let len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 100));
                }
                return res;
            })()
        },
        {
            name: '一区压力',
            type: 'line',
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            data: (function (){
                let res = [];
                let len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        },
        {
            name: '二区瞬时流量',
            type: 'bar',
            yAxisIndex: 1,
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            data: (function (){
                let res = [];
                let len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 100));
                }
                return res;
            })()
        },
        {
            name: '二区压力',
            type: 'line',
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            data: (function (){
                let res = [];
                let len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        },
        {
            name: '三区瞬时流量',
            type: 'bar',
            yAxisIndex: 1,
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            data: (function (){
                let res = [];
                let len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 100));
                }
                return res;
            })()
        },
        {
            name: '三区压力',
            type: 'line',
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            data: (function (){
                let res = [];
                let len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        },
        {
            name: '进水压力',
            type: 'line',
            label:{
                normal:{
                    show:true,
                    position:'top'
                }
            },
            lineStyle:{
                width:4
            },
            data: (function (){
                let res = [];
                let len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }
    ]
};

let timeInterval;
function refreshData(myChart)
{
   timeInterval = setInterval(function (){

        //let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

        let newDate = new Date().toTimeString();
        let axisData = newDate.substr(0,newDate.indexOf("GMT")-1);

        let data0 = option.series[0].data; //一区压力
        let data1 = option.series[1].data; //一区瞬时流量

        let data2 = option.series[2].data; //二区压力
        let data3 = option.series[3].data; //二区瞬时流量

        let data4 = option.series[4].data; //三区压力
        let data5 = option.series[5].data; //三区瞬时流量

        let data6 = option.series[6].data; //进水压力

        data0.shift();
        data0.push(Math.round(Math.random() * 100));

        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        data2.shift();
        data2.push(Math.round(Math.random() * 100));

        data3.shift();
        data3.push((Math.random() * 10 + 5).toFixed(1) - 0);

        data4.shift();
        data4.push(Math.round(Math.random() * 100));

        data5.shift();
        data5.push((Math.random() * 10 + 5).toFixed(1) - 0);

        data6.shift();
        data6.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);

        console.log("add Data");
        console.log(axisData);

        myChart.setOption(option);
    }, 2100);
}

function defaultOption(){
    let colors = ['#5793f3', '#d14a61', '#675bba'];

    let option = {
        color: colors,

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '蒸发量',
                min: 0,
                max: 250,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '降水量',
                min: 0,
                max: 250,
                position: 'right',
                offset: 80,
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name: '蒸发量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name: '降水量',
                type: 'bar',
                yAxisIndex: 1,
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name: '平均温度',
                type: 'line',
                yAxisIndex: 2,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };

    return option;
}

function setControlEChart(title,map,jsonData){

    chartControl = L.control({position: 'bottomright'});

    chartControl.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info controlChart');
        div.id="chartdemo";

        return div;
    };

    chartControl.addTo(map);

    // 基于准备好的dom，初始化echarts实例

    let myChart = echarts.init(document.getElementById('chartdemo'));

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    refreshData(myChart);
}

function removeControlEChart() {
    if(chartControl){
        chartControl.remove();
    }
    if(timeInterval){
        clearInterval(timeInterval);
    }
}