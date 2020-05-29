// 水质监测统计
var dom7 = document.getElementById("container7");
var myChart7 = echarts.init(dom7);
var app = {};
option7 = null;	
option7 = {
	color:["#f4f50b","#ff3c3c","#0be89c"],
    legend: {
        orient: 'vertical',
        x: '47%',
		y:'28%',
        data:['合格','不合格','缺失'],
		textStyle:{color: '#94dbff',fontSize:'14',itemHeight:'30'}
	},
    series: [
        {
            name:'访问来源',
            type:'pie',
            avoidLabelOverlap: false,
            center: ['25%', '55%'],
            label: {
                normal: {
                    show: false,
                    x:'0px'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'合格'},
                {value:310, name:'不合格'},
                {value:234, name:'缺失'}
            ]
        }
    ]
};
if (option7 && typeof option7 === "object") {
	myChart7.setOption(option7, true);
}

// 能耗统计  水流效果
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

// 用电量统计
var dom3 = document.getElementById("container3");
var myChart3 = echarts.init(dom3);
var app = {};
option3 = null;	
option3 = {
    color:"#0be89c",
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
                    color: 'rgba(11,232,156,.8)'
                    //color: '#13c2c2'
                }, {
                    offset: 1,
                    color: 'rgba(11,232,156,.4)'
                }])
            }
        },
        type: 'line'
    }]
};
if (option3 && typeof option3 === "object") {
	myChart3.setOption(option3, true);
}

// 运维统计
var dom4 = document.getElementById("container4");
var myChart4 = echarts.init(dom4);
var app = {};
option4 = null;	
option4 = {
	color:["#0be89c","#f4f50b","#008ed6","#13c2c2","#8a13c2"],
	legend: {
		y:'212px',
		data:['维修','巡检'],
		textStyle:{color: '#fff',fontSize:'14',itemHeight:'12'}
	},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '18%',
		top:'8%',
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
		name:'维修',
        data: [46, 32, 42, 45, 42, 35, 34,26,4],
        type: 'line'
    },{
		name:'巡检',
        data: [55, 42, 50, 48, 49, 43, 45,48,6],
        type: 'line'
    }]
};
if (option4 && typeof option4 === "object") {
	myChart4.setOption(option4, true);
}
// 告警统计
var dom6 = document.getElementById("container6");
var myChart6 = echarts.init(dom6);
var app = {};
option6 = null;	
option6 = {	
	color:["#0be89c","#0be89c"],
    tooltip : {
        trigger: 'axis'
    },
	grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
		top:'29%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data:[2,3,2,2,3,4, 3,2,1],
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
        data:[2,3,2,2,3,4, 3,2,1],
        type: 'line',
        smooth: true 
    }]
};
if (option6 && typeof option6 === "object") {
	myChart6.setOption(option6, true);
}
// 流量统计
var dom8 = document.getElementById("container8");
var myChart8 = echarts.init(dom8);
var app = {};
option8 = null;	
option8 = {
    color:["#0be89c"],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '7%',
		top:'14%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisTick: {
                alignWithLabel: true
            },
			axisLine: {
				lineStyle: {
					color:'#008ed6'
				}
			}
        }
    ],
    yAxis : [
        {
            type : 'value',
            splitLine: {
                show: false
			},
			axisLine: {
				lineStyle: {
					color:'#008ed6'
				}
			}
        }
    ],
    series : [
        {
            name:'告警数',
            type:'bar',
            barWidth: '60%',
            data:[89,102,95,103,94,101, 99,100,90],
        }
    ]
};
if (option8 && typeof option8 === "object") {
	myChart8.setOption(option8, true);
}



// 轮播图
var a=document.getElementsByClassName("img-slide");
    var index=0;
	var str="";
	for(j=0;j<a.length;j++){
		str+="<a href='javascript:' onmouseover='change("+j+")'></a> "
	}
	$(".slide-btn").html(str);
    //改变图片
	var t;
    function ChangeImg() {
        index++;
        if(index>=a.length) index=0;
        for(var i=0;i<a.length;i++){
            a[i].style.opacity='0';
            a[i].style.zIndex='1';
			$(".slide-btn a")[i].style.background=""
        }
        a[index].style.opacity='1';
        a[index].style.zIndex='21';
		$(".slide-btn a")[index].style.background="#0be89c"
    }
	function change(num){
		index=num;
		for(var i=0;i<a.length;i++){
		    a[i].style.opacity='0';
		    a[i].style.zIndex='1';
			$(".slide-btn a")[i].style.background=""
		}
		a[index].style.opacity='1';
		a[index].style.zIndex='21';
		$(".slide-btn a")[index].style.background="#0be89c"
		clearInterval(t);
	}
	function out(){		
		t=setInterval(ChangeImg,5000);
	}
	function start(){		
		clearInterval(t);
	}
    //设置定时器，每隔两秒切换一张图片
    t=setInterval(ChangeImg,5000);
	ChangeImg()
	
// 轮播图
var a1=document.getElementsByClassName("img-slide1");
    var index1=0;
	var str1="";
	for(j=0;j<a1.length;j++){
		str1+="<a href='javascript:' onmouseover='change1("+j+")'></a> "
	}
	$(".slide-btn1").html(str1);
    //改变图片
    function ChangeImg1() {
        index1++;
        if(index1>=a1.length) index1=0;
        for(var i=0;i<a1.length;i++){
            a1[i].style.opacity='0';
            a1[i].style.zIndex='1';
			$(".slide-btn1 a")[i].style.background=""
        }
        a1[index1].style.opacity='1';
        a1[index1].style.zIndex='21';
		$(".slide-btn1 a")[index1].style.background="#0be89c"
    }
	function change1(num){
		index1=num;
		for(var i=0;i<a1.length;i++){
		    a1[i].style.opacity='0';
		    a1[i].style.zIndex='1';
			$(".slide-btn1 a")[i].style.background=""
		}
		a1[index1].style.opacity='1';
		a1[index1].style.zIndex='21';
		$(".slide-btn1 a")[index1].style.background="#0be89c"
		clearInterval(t1);
	}
	function out1(){		
		t1=setInterval(ChangeImg1,5000);
	}
	function start1(){		
		clearInterval(t1);
	}
    //设置定时器，每隔两秒切换一张图片
    t1=setInterval(ChangeImg1,5000);
	ChangeImg1()
	
	
	
	// 时间查询
	$('body').click(function(e){
		$(".wu-cx").hide();
		e.stopPropagation();
	})
	$(".wu-date").click(function(e){
		$(this).parent().parent().children(".wu-cx").show();
		e.stopPropagation();	
	})
	$(".wu-cx").click(function(e){
		e.stopPropagation();
	})
	
	$(".wu-cx-close,.wu-cx-btnl,.wu-cx-btnr").click(function(e){
		$(this).parent().parent(".wu-cx").hide();
	})
	$(".wu-cx-btnl,.wu-cx-btnr").click(function(e){
		$(this).parent().parent().parent(".wu-cx").hide();
	})
	
	// 视频按钮显示
	$(".wu-video-tita").click(function(){
		$(".wu-video-btn").toggle();
	})