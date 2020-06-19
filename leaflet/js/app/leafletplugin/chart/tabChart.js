define(['jquery','echarts'],function($,echarts){
    function getBjdtData(jsonData){

        let colorTypes = {
            "运行":{
                color:"#52c736"
            },
            "报警":{
                color:"#ec2c12"
            },
            "停止":{
                color:"#0941ec"
            }
        };
        let data = [];
        $.each(jsonData,function(index,value){
            for(let i=0;i<value.length;i++){

                let curValue = value[i];

                let curName = curValue['name'];

                let color = colorTypes[curName];

                let colorStyle = {};
                colorStyle["normal"] = color;

                let curValue1 = curValue['value'];

                curValue['value'] = curValue1;

                // let itemStyle = {};
                // itemStyle["itemStyle"] =colorStyle;

                curValue["itemStyle"] = colorStyle;

                data.push(curValue);
            }
        });

        return data;
    }

    function getDuriationOption(title,jsonData){

        let  data = [];
        let  categories =Object.keys(jsonData).reverse();

        data = getBjdtData(jsonData);

        console.log(data);

        function renderItem(params, api) {
            let categoryIndex = api.value(0);
            let start = api.coord([api.value(1), categoryIndex]);
            let end = api.coord([api.value(2), categoryIndex]);
            let height = api.size([0, 1])[1] * 0.6;

            let rectShape = echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
            }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            });

            return rectShape && {
                type: 'rect',
                shape: rectShape,
                style: api.style()
            };
        }

        let option = {
            tooltip: {
                formatter: function (params) {
                    return params.marker + params.name + ': ' + params.value[3] + ' H';
                }
            },
            // title: {
            //     text: title,
            //     left: 'center'
            // },
            dataZoom: [{
                type: 'slider',
                filterMode: 'weakFilter',
                showDataShadow: false,
                top: 400,
                height: 10,
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                labelFormatter: ''
            }, {
                type: 'inside',
                filterMode: 'weakFilter'
            }],
            grid: {
                height: 300
            },
            xAxis: {
                min: 0,
                max: 24,
                //scale: true,
                //inverse: true,
                axisLabel: {
                    formatter: function (val) {
                        return val;
                        //return Math.max(0, val - 24) + ' H';
                    }
                }
            },
            yAxis: {
                data: categories
            },
            series: [{
                type: 'custom',
                renderItem: renderItem,
                itemStyle: {
                    opacity: 1
                },
                encode: {
                    x: [1, 2],
                    y: 0
                },
                data: data
            }]
        };
        return option;
    }


    function addTabChart(title,id,jsonData){

        // 基于准备好的dom，初始化echarts实例

        let myChart = echarts.init(document.getElementById(id));

        let option = getDuriationOption(title,jsonData);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    };

    function setTabChart(title,id) {
        console.log(echarts);

        $.getJSON("/leafletMap/leaflet/data/bengfang.json", function (jsonData) {
            let bjdtJson = jsonData["泵机带图"];
            addTabChart(title,id,bjdtJson);

        });
    };

    return{
        setTabChart:setTabChart
    }
})
