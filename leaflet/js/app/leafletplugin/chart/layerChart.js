
define(['jquery','leafletEChart'],function($,leafletEChart){
    //添加layerChart
    let geoData,data;
    let convertData = function(data) {
        let res = [];
        for(let i = 0; i < data.length; i++) {
            let geoCoord = geoData[data[i].name];
            if(geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    let layerWork;

    /**
     * 添加 layerChart
     * @param geoData
     * @param valueData
     * @param title
     */
    function addLayerEChart(teoData,valueData,title,map){
        geoData = teoData;
        data = valueData;
        setEChart(title,map);
    };

    function setEChart(title,map){

        //console.log(echarts);

        let option = getScatterOption(title);

        removeLayerEChart(map);

        layerWork = L.overlayEcharts(option).addTo(map);
    }

    function updateLayerEChart(valueData,title) {
        data = valueData;
        let option = getScatterOption(title);
        if(layerWork){
            layerWork.setOption(option);
        }
    }

    function removeLayerEChart(map) {
        if(layerWork){
            map.removeLayer(layerWork);
        }
    }

    function getScatterOption(title){

        let option = {
            title: {
                text: title,
                x:'center',
                textStyle: {
                    color: '#ffffff'
                },
                backgroundColor:'rgba(29,27,27,0.50)',
                borderColor:'transparent',
                borderWidth:0,
                borderRadius:2
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name + ' : ' + params.value[2];
                }
            },
            // legend: {
            //     orient: 'vertical',
            //     y: 'bottom',
            //     x:'right',
            //     data:['pm2.5'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            visualMap: {
                type:'piecewise',
                // min: 5,
                // max: 10,
                pieces:[
                    {min:0,max:2,color:'#06efcd'},
                    {min:2,max:5,color:'#0382e2'},
                    {min:5,max:10,color:'#f1a203'},
                    {min:10,max:50,color:'#f8420b'},
                    {min:50,max:100,color:'#cd0bf8'},
                    {min:100,color:'#f50606'}
                ],
                calculable: true,
                inRange: {
                    color: ['#08f172', '#02c9ac', '#0a9fe5', '#f8420b', '#cd0bf8', '#cd0bf8']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                //map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(29,112,212,0.83)',
                        borderColor: 'rgba(198,97,18,0.74)'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [
                {
                    name: '瞬时流量',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        let size = val[2] * 5; //根据数据大小进行修改
                        if(size < 10) size = 15;
                        //console.log(size);
                        return 25;
                        return size;
                    },
                    label: {
                        normal: {
                            formatter: '{b}:{@value}',
                            position: 'right',
                            color:'rgba(246,5,5,0.9)',
                            fontSize:16,
                            fontWeight:'bold',
                            backgroundColor:'rgba(255,255,255,0.49)',
                            borderColor:'transparent',
                            borderWidth:1,
                            borderRadius:4,
                            textBorderColor:'#ffffff',
                            textBorderWidth:1,
                            textShadowColor:'#908b8b',
                            textShadowBlur:1,
                            textShadowOffsetX:1,
                            show: true
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#d94619'
                        },
                        emphasis: {
                            borderColor: 'rgba(238,231,231,0.89)',
                            borderWidth: 2
                        }
                    }
                }
                ,
                {
                    name: 'Top 3',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 3)),
                    symbolSize: function (val) {
                        let size = val[2] * 5; //根据数据大小进行修改
                        if(size < 10) size = 15;
                        return 30;
                        return size;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'fill'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}:{@value}',
                            position: 'right',
                            color:'rgb(246,5,5)',
                            fontSize:20,
                            fontWeight:'bold',
                            backgroundColor:'rgba(255,255,255,0.5)',
                            borderColor:'transparent',
                            borderWidth:1,
                            borderRadius:4,
                            textBorderColor:'#ffffff',
                            textBorderWidth:1,
                            textShadowColor:'#343232',
                            textShadowBlur:1,
                            textShadowOffsetX:1,
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
        };
        return option;
    }

    return{
        addLayerEChart:addLayerEChart,
        updateLayerEChart:updateLayerEChart,
        removeLayerEChart:removeLayerEChart
    };
})
