define(['jquery','echarts','L'],function($,echarts,L){
    //右下角control类型chart
    let chartControl;

    let myChart;

    function addControlChart(title,map){

        $.getJSON("/leafletMap/leaflet/data/110.json", function (jsonData) {

            setControlChart(map,title,jsonData);

        });
    };

    function getOptions(title,jsonData) {

        let timeArray = jsonData['time'];

        let valueData = jsonData['value'];

        let keyArray = Object.keys(valueData);

        let seriesArray = [];

        $.each(valueData, function (index, value) {

            let lineWidth = 2;
            let yIndex = 0;
            let type = 'line';
            if (index.indexOf('流量') > -1) {
                yIndex = 1;
                type = 'bar';
            }
            if (index == "进水压力") {
                lineWidth = 4;
            }

            let series = {
                name: index,
                type: type,
                yAxisIndex: yIndex,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                lineStyle: {
                    width: lineWidth
                },
                data: value
                /*(function () {
                    let res = [];
                    let len = 0;
                    while (len < 10) {
                        res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()*/
            }
            seriesArray.push(series);
        });

        let option = {
            title: {
                text: title,
                bottom: 5,
                left: 5,
                textStyle:{
                    color:'#8405c9',
                    fontWeight:'bold',
                    textBorderColor:'#fff',
                    textBorderWidth:1
                }
            },
            color: ['#c23531', '#c23531', '#eaf308', '#eaf308',
                '#1a4bdb', '#1a4bdb', '#8405c9', '#8405c9',
                '#06b842', '#06b842', '#bda29a', '#bda29a',
                '#c46805', '#c46805', '#749f83', '#749f83',
                '#546570', '#546570', '#91c7ae', '#91c7ae'],
            tooltip: {
                trigger: 'axis',
                alwaysShowContent:true,
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: keyArray //['一区瞬时流量', '一区压力', '二区瞬时流量', '二区压力', '三区瞬时流量', '三区压力', '进水压力']
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
                    data: timeArray
                    // (function () {
                    //     let now = new Date();
                    //     let res = [];
                    //     let len = 10;
                    //     while (len--) {
                    //         res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    //         now = new Date(now - 2000);
                    //     }
                    //     return res;
                    // })()
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
                    name: '流量',
                    // max: 1200,
                    // min: 0,
                    boundaryGap: [0.1, 0.1]
                }
            ],
            series: seriesArray
        };

        return option;
    }


    let timeInterval;

    let dataLength =6;

    function refreshData(title)
    {
        timeInterval = setInterval(function (){

            //let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

            let option = myChart.getOption();

            let newDate = new Date().toTimeString();
            let axisData = newDate.substr(0,newDate.indexOf("GMT")-1);

            let data0 = option.series[0].data; //一区压力
            let data1 = option.series[1].data; //一区瞬时流量

            let data2 = option.series[2].data; //二区压力
            let data3 = option.series[3].data; //二区瞬时流量

            let data4 = option.series[4].data; //三区压力
            let data5 = option.series[5].data; //三区瞬时流量

            let data6 = option.series[6].data; //进水压力

            let dataX = option.xAxis[0].data;

            if(data0.length> dataLength)
                data0.shift();
            data0.push(Math.round(Math.random() * 100));

            if(data1.length>dataLength)
                data1.shift();
            data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

            if(data2.length>dataLength)
                data2.shift();
            data2.push(Math.round(Math.random() * 100));

            if(data3.length>dataLength)
                data3.shift();
            data3.push((Math.random() * 10 + 5).toFixed(1) - 0);

            if(data4.length>dataLength)
                data4.shift();
            data4.push(Math.round(Math.random() * 100));

            if(data5.length>dataLength)
                data5.shift();
            data5.push((Math.random() * 10 + 5).toFixed(1) - 0);

            if(data6.length>dataLength)
                data6.shift();
            data6.push((Math.random() * 10 + 5).toFixed(1) - 0);

            if(dataX.length>dataLength)
                dataX.shift();
            option.xAxis[0].data.push(axisData);

            // console.log("add Data");
            // console.log(axisData);

            myChart.setOption(option);
        }, 2100);
    };

    function setControlChart(map,title,jsonData){

        chartControl = L.control({position: 'bottomright'});

        chartControl.onAdd = function (map) {

            let div = L.DomUtil.create('div', 'info controlChart');
            div.id="chartdemo";

            return div;
        };

        chartControl.addTo(map);

        myChart = echarts.init(document.getElementById('chartdemo'));

        let option = getOptions(title,jsonData);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        refreshData(myChart,title);
    };

    function updateControlChart(title,map){

        if(!myChart){

            chartControl = L.control({position: 'bottomright'});

            chartControl.onAdd = function (map) {

                let div = L.DomUtil.create('div', 'info controlChart');
                div.id = "chartdemo";

                return div;
            };

            chartControl.addTo(map);
            
            myChart = echarts.init(document.getElementById('chartdemo'));
        };

        if(timeInterval){
            clearInterval(timeInterval);
        }

        $.getJSON("/leafletMap/leaflet/data/110.json", function (jsonData) {

            let option = getOptions(title,jsonData);

            myChart.setOption(option);

            refreshData(myChart,title);

        });
    };

    function removeControlEChart() {
        if(chartControl){
            chartControl.remove();
        }
        if(timeInterval){
            clearInterval(timeInterval);
        }
    };

    return{
        addControlChart:addControlChart,
        updateControlChart:updateControlChart,
        removeControlEChart:removeControlEChart
    };
});

