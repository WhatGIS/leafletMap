let geoCoordMap,data;
var convertData = function(data) {
    var res = [];
    for(var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if(geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
function setEchartMap(geoData,valueData,llmap,title) {

    geoCoordMap = geoData;
    data = valueData;

    setEchart(llmap,title);
}

let layerWork;

function setEchart(map,title){

    console.log(data);

    console.log(geoCoordMap);

    let option = getscatterOption(title);//getscatterOption();

    closeEchart(map);

    //将Echarts加到地图上
    layerWork = L.overlayEcharts(option).addTo(map);
}

function closeEchart(map) {
    if(layerWork){
        map.removeLayer(layerWork);
    }
}

function getscatterOption(title){
    let option = {
        //backgroundColor: '#404a59',
        title: {
            text: title,
            // subtext: 'data from PM25.in',
            // sublink: 'http://www.pm25.in',
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
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            min: 5,
            max: 10,
            calculable: true,
            inRange: {
                color: ['#0a9fe5', '#f8420b', '#cd0bf8']
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
                    console.log(size);
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
                        textBorderColor:'rgba(212,185,6,0.78)',
                        textBorderWidth:1,
                        textShadowColor:'#197cf5',
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
                        borderColor: '#ea0c0c',
                        borderWidth: 1
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
                    console.log(size);
                    return 30;
                    return size;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        // formatter: '{b}:{@value}',
                        // position: 'right',
                        show: false
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


function get3DBarOption(){

    let option = {
        //backgroundColor: '#404a59',
        title: {
            text: '泵房瞬时流量',
            // subtext: 'data from PM25.in',
            // sublink: 'http://www.pm25.in',
            x:'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value[2];
            }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'top',
        //     x:'right',
        //     data:['pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
            min: 5,
            max: 10,
            calculable: true,
            realtime: false,
            inRange: {
                color: ['#35a828', '#1175ac', '#d94e5d'],
                colorLightness:[0.2,0.9]
            },
            textStyle: {
                color: '#fff'
            },
            outOfRange:{
                colorAlpha: 0
            }
        },
        geo: {
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
                name: 'bar3D',
                type: 'bar3D',
                coordinateSystem: 'geo',
                data: convertData(data),
                barSize:0.6,
                minHeight: 0.2,
                silent: true,
                itemStyle:{
                  color: "orange"
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true,
                    },
                    emphasis: {
                        show: false
                    }
                },
                animationDelay: function(idx){
                  return idx * 10;
                }
            }
        ],
        animationEasing: "elasticOut"

    };
    return option;
}