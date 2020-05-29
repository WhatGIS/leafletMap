// 流量统计
var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	color: '#0be89c',
	textStyle: {
		color:'#008ed6'
	},
	grid: {
		left: '0%',
		right: '0%',
		bottom: '2%',
		top:'10%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		axisLine: {
		    lineStyle: {
		        // 使用深浅的间隔色
		        color:'#008ed6'
		    }
		},
		axisTick: {
			alignWithLabel: true
		},
		// lineStyle: {
		// 	color:'rgba(0,142,214,.2)'
		// }
	},
	yAxis: {
		type: 'value',
		axisLine: {
		    lineStyle: {
		        // 使用深浅的间隔色
		        color:'#008ed6'
		    }
		},
		splitLine: {
		    show: false
		},
	},
	series: [
		{
			type:'bar',
			barWidth: '10',
			data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210]
		}
	]
};
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}
// 流量统计结束

//巡检统计
var dom1 = document.getElementById("container1");
var myChart1 = echarts.init(dom1);
var app = {};
option1 = null;	
option1 = {
	color:['#ff3c3c','#f8f943','#008ed6','#8a13c2','#0be89c'],
	legend: {
		orient: 'vertical',
		x: '50%',
		y:'8px',
		itemHeight:15,
		padding:0,
		itemGap:4,
		data:['已完成','缺失数','待巡检','未完成','可补巡'],
		textStyle:{color: '#fff',fontSize:'14'},
		formatter: function (name) {
			for (var i = 0; i < 5; i++) {
				if (name === '已完成') {
					return name + "：98.07%" ;
				}else if (name === '缺失数') {
					return name + "：1.93%" ;
				}else if(name === '待巡检') {
					return name + "：0%" ;
				}else if(name === '未完成') {
					return name + "：0%" ;
				}else{
					return name + "：0%" ;
				}
			}
		},
		itemGap:20,
	},
	series: [
		{
			name:'访问来源',
			type:'pie',
			radius: ['50%', '70%'],
			center: ['27%', '57%'],
			avoidLabelOverlap: false,
			left:0,
			label: {
				normal: {
					show: false,
					position: 'center'
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data:[
				{value:100, name:'已完成'},
				{value:50, name:'缺失数'},
				{value:50, name:'待巡检'},
				{value:50, name:'未完成'},
				{value:50, name:'可补巡'},
			]
		}
	]
};
if (option1 && typeof option1 === "object") {
	myChart1.setOption(option1, true);
}

// 污泥统计
var dom2 = document.getElementById("container2");
var myChart2 = echarts.init(dom2);
var app = {};
option2 = null;	
option2 = {
	color:['#ff3c3c','#f8f943','#008ed6','#8a13c2','#0be89c'],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		axisLine: {
			lineStyle: {
				color:'#008ed6'
			}
		}
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
		},
		axisLine: {
			lineStyle: {
				color:'#008ed6'
			}
		}
    },
    series: [{
		name:'良好',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    },{
		name:'一般',
        data: [720, 832, 801, 834, 1190, 1230, 1220],
        type: 'line'
    },{
		name:'较差',
        data: [670, 782, 751, 794, 1130, 1170, 1170],
        type: 'line'
    }]
};
if (option2 && typeof option2 === "object") {
	myChart2.setOption(option2, true);
}


// 维修统计趋势
var dom3 = document.getElementById("container3");
var myChart3 = echarts.init(dom3);
var app = {};
option3 = null;	
option3 = {
    color:"#13c2c2",
    grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
		top:'40px',
        containLabel: true
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		axisLine: {
			lineStyle: {
				color:'#008ed6'
			}
		}
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
		},
		axisLine: {
			lineStyle: {
				color:'#008ed6'
			}
		}
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(19,194,194,.8)'
                    //color: '#13c2c2'
                }, {
                    offset: 1,
                    color: 'rgba(19,194,194,.4)'
                }])
            }
        },
        type: 'line'
    }]
};
if (option3 && typeof option3 === "object") {
	myChart3.setOption(option3, true);
}


//告警统计  水流效果
var _clientwidth = 296;
var _poolDia = _clientwidth / 2; //水池直径
var canvas = document.getElementById("pool");
var waterSpaceHeight = _poolDia - canvas.dataset.progress * _poolDia / 170; //水池距离顶端有高度
//设定canvas的基本属性
canvas.width = _clientwidth / 2;
canvas.height = _clientwidth / 2;

//canvas.style.marginLeft = _poolDia / 2 + "px";
canvas.style.borderRadius = _clientwidth / 2 + "px";
//获取context对象
var context = canvas.getContext("2d");
//设定颜色   水的rgba
var my_gradient=context.createLinearGradient(0,0,0,170);
my_gradient.addColorStop(0,"#0be89c");
context.fillStyle = "rgba(11,232,156,.8)";
context.strokeStyle = "rgba(0,0,0,.8)"
//水的波动常量
var maxPY = Math.PI * 5; //最大偏移量
var indexPY = -maxPY; //起点偏移量  也就是说起点的X值偏移了多少 
var indexCH = _poolDia / (2*Math.PI); //波的个数
var blHeight = _poolDia/20;   //波高
var speed = 0.5; //速度
var startX = 5; //绘制起点X 下同理
var startY = 0;
var currX = 0; //当前点X
var currY = 0;
var endX = 0;
var endY = 0;
//WaveMove();
 
//水的波动
function WaveMove() {
	context.clearRect(0, 0, _poolDia, _poolDia);
	context.beginPath();
	startX = 0;
	startY = waterSpaceHeight + Math.sin(startX)*5;
	for (var i = 0; i < _poolDia-indexPY; i = i + 1) {
		currX = i;
		currY = Math.sin(currX/indexCH+indexPY)*blHeight   + waterSpaceHeight;
		context.lineTo(currX, currY);
	}
 
	context.lineTo(_poolDia, _poolDia);
	context.lineTo(startX,_poolDia);
	context.lineTo(startX,startY);
	context.fill();
	context.closePath();
	indexPY = indexPY + speed;
	if (indexPY >= -Math.PI) {
		indexPY = -maxPY;
	}
}
 
document.body.onload = function(){
	setInterval('WaveMove()', 100);
}


// 地图
//地图
var map = new BMap.Map('allmap');
map.centerAndZoom(new BMap.Point(105.752891,35.505921),6);
map.enableScrollWheelZoom();                         //启用滚轮放大缩小
//自定义地图样式
map.setMapStyleV2({styleJson:styleJson});
// 随机向地图添加25个标注
var arrIcon=[{z:0,x:108.23534246231581,y:42.46128363827341,link:'1'},{z: 2, x: 111.78081347365833, y: 45.62350580657256,link:'2'},{z: 0, x: 106.33840446624487, y: 46.338688037580845,link:'3'},
			{z:1,x:88.74887638514646,y:33.43617296819259,link:'4'},{z: 0, x: 94.71928582999094, y: 43.164491439254164,link:'5'},{z: 1, x: 98.6324816043279, y: 46.09913329815814,link:'6'},{z:0, x: 89.41954785030116, y: 43.69181557362629,link:'7'},
			{z:1,x:91.13727122547512,y:39.393658421725,link:'8'},{z: 3, x: 92.16973964885686, y: 32.27520099033631,link:'9'},{z: 1, x: 100.19032683257335, y: 39.2156515284677,link:'10'},{z:3, x: 87.15343919691304, y: 30.31027309114656,link:'11'},
			{z:1,x:84.87026155500804,y:39.50813794182832,link:'12'},{z: 0, x: 85.97078241678632, y: 30.887483015159376,link:'13'},{z: 1, x: 97.56484673038705, y: 46.167120507446555,link:'14'},{z:0, x: 99.18694162100391, y: 46.48954905816321,link:'15'},
			{z:2,x:98.45745666457105,y:43.220775518093454,link:'16'},{z: 0, x: 109.26217037223665, y: 36.7430961416505,link:'17'},{z: 1, x: 88.36616332286503, y: 42.61934255961893,link:'18'},{z:0, x: 99.17639440815735, y: 37.76930001959478,link:'19'},
			{z:1,x:90.3750043853406,y:40.183490405577935,link:'20'},{z: 0, x: 101.79590637521105, y: 46.346008432530084,link:'21'},{z: 1, x: 102.64093139833267, y: 32.18810368259283,link:'22'},{z:0, x: 82.53801969992996, y: 43.045784272334615,link:'23'},
			{z:1,x:92.220754657537,y:37.706071397827294,link:'24'},{z: 2, x: 100.0655496176995, y: 43.752743322486815,link:'25'}]
for (var i = 0; i < arrIcon.length; i ++) {
	var content=arrIcon[i].link;
	var point = new BMap.Point(arrIcon[i].x,arrIcon[i].y);
	if(arrIcon[i].z==0){
		var myIcon = new BMap.Icon("img/ico1.png", new BMap.Size(30,30));					
	}else if(arrIcon[i].z==1){
		var myIcon = new BMap.Icon("img/ico2.png", new BMap.Size(30,30));			
	}else if(arrIcon[i].z==2){
		var myIcon = new BMap.Icon("img/ico3.png", new BMap.Size(30,30));			
	}else{
		var myIcon = new BMap.Icon("img/ico4.png", new BMap.Size(30,30));
	}
	var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
	// var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);
	// var label = new BMap.Label("<span class='label'>罗集站点</span>",{offset:new BMap.Size(-10,28)});
	// marker2.setLabel(label);
	//console.log(content);
	addClickHandler(content,marker2);
}			
function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
}
function openInfo(content,e){
console.log(content);
$("#name").html(content);
$("#warn").html(content);
$("#manage").html(content);
$("#adr").html(content);
	$(".main-zdxq").slideDown();
}