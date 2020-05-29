//地图
var map = new BMap.Map('allmap');
map.centerAndZoom(new BMap.Point(119.646139,31.670873),12);
map.enableScrollWheelZoom();                         //启用滚轮放大缩小
//自定义地图样式
map.setMapStyleV2({styleJson:styleJson});
// 随机向地图添加25个标注
var arrIcon=[{z:0,x:119.644066,y:31.686604,link:'1',name:'思模村东站'},{z:0,x:119.590151,y:31.741816,link:'2',name:'思模村西站'},{z:0,x:119.51949,y:31.752102,link:'3',name:'小清培站'},{z:0,x:119.490404,y:31.74329,link:'4',name:'西南圩站'},{z:0,x:119.55025,y:31.718294,link:'5',name:'管庄西站'},
{z:0,x:119.55025,y:31.718294,link:'6',name:'管庄南站'},{z:0,x:119.620251,y:31.870782,link:'7',name:'管庄东站'},{z:0,x:119.751332,y:31.945819,link:'8',name:'毛家北站'},{z:0,x:119.576837,y:31.855931,link:'9',name:'毛家南站'},{z:0,x:119.593153,y:31.84428,link:'10',name:'沈史蔡村站'},{z:0,x:119.581774,y:31.825995,link:'11',name:'刘庄站'},
{z:0,x:119.594375,y:31.827489,link:'12',name:'蒋庄站'},{z:3,x:119.565813,y:31.836514,link:'13',name:'曹庄站'},{z:2,x:119.564959,y:31.754478,link:'14',name:'白塔集镇站'},{z:0,x:119.726578,y:31.619003,link:'15',name:'兆歧村东站'},{z:2,x:119.611307,y:31.527447,link:'16',name:'兆歧村西站'},{z:0,x:119.526507,y:31.764517,link:'17',name:'前鲁塘站'},
{z:1,x:119.457908,y:31.63523,link:'18',name:'双坝头站'},{z:0,x:119.445185,y:31.597074,link:'19',name:'樊家边站'},{z:0,x:119.542346,y:31.788305,link:'20',name:'东周站'},{z:0,x:119.718003,y:31.683903,link:'21',name:'城头站'},{z:0,x:119.50218,y:31.621156,link:'22',name:'上溪圩东站'},{z:0,x:119.508099,y:31.621417,link:'23',name:'上溪圩西站'},
{z:0,x:119.460414,y:31.631373,link:'24',name:'西大埂西站'},{z:0,x:119.47327,y:31.658336,link:'25',name:'大埂东站'},{z:0,x:119.510064,y:31.620707,link:'26',name:'庄阳站'},{z:0,x:119.522318,y:31.790563,link:'27',name:'洮西集西站'},{z:0,x:119.843121,y:31.793509,link:'28',name:'洮西集东站'},{z:0,x:119.697881,y:31.659071,link:'29',name:'后渎西站'},
{z:0,x:119.68552,y:31.694472,link:'30',name:'后渎东站'},{z:0,x:119.206688,y:31.73204,link:'31',name:'水西站'},{z:3,x:119.202664,y:31.673547,link:'32',name:'后里站'},{z:0,x:119.22566,y:31.592381,link:'33',name:'芦巷站'},{z:0,x:119.455051,y:31.553002,link:'34',name:'高家圩站'},{z:0,x:119.387786,y:31.623872,link:'35',name:'湖荡圩站'},
{z:0,x:119.428605,y:31.587951,link:'36',name:'后渎南站'},{z:0,x:119.441828,y:31.68043,link:'37',name:'大兰圩北站'},{z:0,x:119.391811,y:31.558417,link:'38',name:'大兰圩南站'},{z:0,x:119.333169,y:31.544139,link:'39',name:'青墩站'},{z:0,x:119.521742,y:31.502276,link:'40',name:'东塘站'},{z:0,x:119.575209,y:31.481092,link:'41',name:'夏家庄站'},
{z:0,x:119.690192,y:31.537245,link:'42',name:'罗塘站'},{z:0,x:119.721812,y:31.722212,link:'43',name:'张家庄站'},{z:1,x:119.622352,y:31.542662,link:'44',name:'木桥站'},{z:0,x:119.386062,y:31.535275,link:'45',name:'干店站'},{z:0,x:119.279127,y:31.67453,link:'46',name:'新庄站'},{z:0,x:119.648223,y:31.554479,link:'47',name:'南汤站'},
{z:0,x:119.374563,y:31.558909,link:'48',name:'东元庄站'},{z:3,x:119.514843,y:31.531828,link:'49',name:'上鏐站'},{z:0,x:119.584982,y:31.744815,link:'50',name:'南站站'},{z:0,x:119.541289,y:31.792461,link:'51',name:'岳家村站'},{z:0,x:119.541289,y:31.792461,link:'52',name:'张塔站'},{z:0,x:119.732736,y:31.725161,link:'53',name:'皇唐庄站'},
{z:0,x:119.448727,y:31.770851,link:'54',name:'长沟村站'},{z:0,x:119.663746,y:31.652893,link:'55',name:'河西村站'},{z:0,x:119.406759,y:31.697637,link:'56',name:'周舍站'},{z:0,x:119.675819,y:31.568755,link:'57',name:'北官圩东站'},{z:3,x:119.733885,y:31.767413,link:'58',name:'北官圩西站'},{z:0,x:119.540714,y:31.779201,link:'59',name:'孙家站'},
{z:0,x:119.690192,y:31.698128,link:'60',name:'庙圩南站'},{z:2,x:119.407333,y:31.68338,link:'61',name:'张桥站'},{z:0,x:119.571184,y:31.772325,link:'62',name:'湖溪南站'},{z:0,x:119.718363,y:31.630267,link:'63',name:'湖溪西站'},{z:0,x:119.758032,y:31.579584,link:'64',name:'湖溪路站'},{z:0,x:119.522891,y:31.49735,link:'65',name:'西周东站'},
{z:0,x:119.488397,y:31.472222,link:'66',name:'西周西站'},{z:0,x:119.424581,y:31.523456,link:'67',name:'许家咀站'},{z:3,x:119.365365,y:31.668138,link:'68',name:'下阳坟站'},{z:0,x:119.353291,y:31.695179,link:'69',name:'东蒋庄站'},{z:0,x:119.476323,y:31.849897,link:'70',name:'明星村长沟站'},{z:0,x:119.559111,y:31.808664,link:'71'},
{z:0,x:119.469424,y:31.821429,link:'72',name:'罗塘站'},{z:0,x:119.781029,y:31.757589,link:'73',name:'蒋庄站'},{z:0,x:119.581533,y:31.863637,link:'74',name:'曹庄站'},
{z: 1, x: 119.672335, y: 31.718015,link:'75',name:'庙圩东站'},{z: 0, x:119.6585,y:31.655844,link:'76',name:'庙圩北站'}]
for (var i = 0; i < arrIcon.length; i ++) {
	var content=arrIcon[i].link;
	var point = new BMap.Point(arrIcon[i].x,arrIcon[i].y);
	if(arrIcon[i].z==0){
		var myIcon = new BMap.Icon("img/ico1.png", new BMap.Size(30,30));					
	}else if(arrIcon[i].z==1){
		var myIcon = new BMap.Icon("img/ico2.png", new BMap.Size(30,30));			
	}else if(arrIcon[i].z==2){
		var myIcon = new BMap.Icon("img/ico3.png", new BMap.Size(30,30));			
	}else if(arrIcon[i].z==3){
		var myIcon = new BMap.Icon("img/ico4.png", new BMap.Size(30,30));
	}
	var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
	// var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);
	var label = new BMap.Label("<span class='label'>"+arrIcon[i].name+"</span>",{offset:new BMap.Size(-10,28)});
	marker2.setLabel(label);
	//console.log(content);
	addClickHandler(content,marker2);
}			
function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
}
function openInfo(content,e){
$("#name").html(content);
$("#warn").html(content);
$("#manage").html(content);
$("#adr").html(content);
	$(".main-zdxq").slideDown();
}

// 点击关闭弹窗
$(".main-zdxq-btnl,.main-zdxq-close").click(function(){
	$(".main-zdxq").slideUp();
})
