define(['jquery'],function($){
    function getbackToken() {
        $.get("/Home/GetLoginToken", function (data) {
            var json = eval("(" + data + ")");
            console.log(json);

            let token = json.Data.Token;
            localStorage.setItem("token", token);
            return token;
        });
    }

    function getDeviceLists(token) {
        $.get("/Home/GetDeviceList?token=" + token, function (data) {
            var json = eval("(" + data + ")");
            console.log(json);
            return json;
        });
    }

    function getDeviceData(token, addCode) {
        $.get("/Home/getDeviceData?token=" + token + "&&addcode=" + addCode, function (data) {
            var json = eval("(" + data + ")");
            console.log(json);
            return json;
        });
    }

    let bengFangDic = {};//泵房数据  三个机柜加上水质，分别对应了名称和List数据

    function getDeviceGYHtml(title,bfDic) {

        let deviceData = document.getElementById("divGongYiItem"); //获取Item的div

        deviceData.innerHTML = "";

        bengFangDic = bfDic;

        let i = 0;

        $.each(bengFangDic,
            function (dataIndex, data) {

                let devName = dataIndex;

                let dataList = data;

                if (devName.indexOf("水质") == -1) {

                    let divItem = document.createElement("div");


                    if (i == 0) {
                        divItem.setAttribute("class", "ecgs-fir box-shadow");

                    } else {
                        divItem.setAttribute("class", "ecgs-fir box-shadow");
                    }

                    getBengFangDom(devName, dataList, divItem);

                    deviceData.appendChild(divItem);
                    i++;

                } else {
                    getShuizhiDom(devName, bengFangDic[devName]);
                }
            }
        );
    }

    function getBengFangDom(devName, dataList, divshadow) {

        var yeweiA = dataList[0].ExpVal; //液位A
        var yeweiB = dataList[1].ExpVal; //液位B

        var sdYali = dataList[2].ExpVal; //设定压力
        var sjYali = dataList[3].ExpVal; //实际压力

        var bpPL = dataList[4].ExpVal; //变频频率
        var sgPL = dataList[5].ExpVal; //手工频率

        var beng1 = dataList[6].ExpVal;
        var beng2 = dataList[7].ExpVal;
        var beng3 = dataList[8].ExpVal;

        if (beng1 == "0") {
            beng1 = "停止";
        } else if (beng1 == "1") {
            beng1 = "运行";
        } else {
            beng1 = "报警";
        }

        if (beng2 == "0") {
            beng2 = "停止";
        } else if (beng2 == "1") {
            beng2 = "运行";
        } else {
            beng2 = "报警";
        }

        if (beng3 == "0") {
            beng3 = "停止";
        } else if (beng3 == "1") {
            beng3 = "运行";
        } else {
            beng3 = "报警";
        }

        //ecgs-fir-con
        var divfircon = document.createElement("div");
        divfircon.setAttribute("class", "d-block w-100 ecgis-fir-con");
        divshadow.appendChild(divfircon);

        var imgdevcie = document.createElement("img");
        imgdevcie.setAttribute("src", "leaflet/js/lib/ecgs16/img/device16.png");
        imgdevcie.setAttribute("class", "device");
        divfircon.appendChild(imgdevcie);

        var divtit = document.createElement("div");
        divtit.setAttribute("class", "ecgs-tit");
        divfircon.appendChild(divtit);

        var h3title = document.createElement("h3");
        h3title.setAttribute("class", "ecgs-tit-h3");
        h3title.innerText = devName; //名称
        divtit.appendChild(h3title);

        var divtxt = document.createElement("div");
        divtxt.setAttribute("class", "ecgs-txt ecgs-txt1");
        divfircon.appendChild(divtxt);

        var span1 = document.createElement("span");
        span1.setAttribute("class", "ecgs-num1");
        span1.innerText = parseFloat(sjYali).toFixed(2);
        divtxt.appendChild(span1);

        var span2 = document.createElement("span");
        span2.setAttribute("class", "ecgs-num2");
        span2.innerText = parseFloat(yeweiA).toFixed(2);
        divtxt.appendChild(span2);

        var span3 = document.createElement("span");
        span3.setAttribute("class", "ecgs-num3");
        span3.innerText = parseFloat(bpPL).toFixed(2);
        divtxt.appendChild(span3);

        var span4 = document.createElement("span");
        span4.setAttribute("class", "ecgs-num4");
        span4.innerText = parseFloat(sgPL).toFixed(2);
        divtxt.appendChild(span4);

        var span5 = document.createElement("span");
        span5.setAttribute("class", "ecgs-num51");
        span5.innerText = parseFloat(yeweiB).toFixed(2);
        divtxt.appendChild(span5);

        var span6 = document.createElement("span");
        span6.setAttribute("class", "ecgs-num5");
        span6.innerText = parseFloat(sdYali).toFixed(2);
        divtxt.appendChild(span6);

        //泵1的运行状态图片
        var spanpic1 = document.createElement("span");
        spanpic1.setAttribute("class", "ecgs-num7");

        var bengpic1 = "leaflet/js/lib/ecgs16/img/picd.gif";

        if (beng1 == "停止") {
            bengpic1 = "leaflet/js/lib/ecgs16/img/pica.png";

        } else if (beng1 == "运行") {
            bengpic1 = "leaflet/js/lib/ecgs16/img/picb.gif"
        } else {
            bengpic1 = "leaflet/js/lib/ecgs16/img/picc.png";
        }

        var pic1 = document.createElement("img");
        pic1.setAttribute("src", bengpic1);

        spanpic1.appendChild(pic1);

        divtxt.appendChild(spanpic1);

        //泵2的运行状态图片
        var spanpic2 = document.createElement("span");
        spanpic2.setAttribute("class", "ecgs-num8");

        var bengpic2 = "leaflet/js/lib/ecgs16/img/picd.gif";

        if (beng2 == "停止") {
            bengpic2 = "leaflet/js/lib/ecgs16/img/pica.png";

        } else if (beng2 == "运行") {
            bengpic2 = "leaflet/js/lib/ecgs16/img/picb.gif"
        } else {
            bengpic2 = "leaflet/js/lib/ecgs16/img/picc.png";
        }

        var pic2 = document.createElement("img");
        pic2.setAttribute("src", bengpic2);

        spanpic2.appendChild(pic2);

        divtxt.appendChild(spanpic2);

        //泵3的运行状态图片
        var spanpic3 = document.createElement("span");
        spanpic3.setAttribute("class", "ecgs-num9");

        var bengpic3 = "leaflet/js/lib/ecgs16/img/picd.gif";

        if (beng3 == "停止") {
            bengpic3 = "leaflet/js/lib/ecgs16/img/pica.png";
        } else if (beng3 == "运行") {
            bengpic3 = "leaflet/js/lib/ecgs16/img/picb.gif"
        } else {
            bengpic3 = "leaflet/js/lib/ecgs16/img/picc.png";
        }

        var pic3 = document.createElement("img");
        pic3.setAttribute("src", bengpic3);

        spanpic3.appendChild(pic3);

        divtxt.appendChild(spanpic3);



        var divwb = document.createElement("div");
        divwb.setAttribute("class", "ecgs-zt wb");
        divshadow.appendChild(divwb);

        //泵1 状态
        var bg1color = "#85c700";

        if (beng1 == "停止") {
            bg1color = "#757575";
        } else if (beng1 == "报警") {
            bg1color = "#c7001c";
        }


        var divwbw1 = document.createElement("div");
        divwbw1.setAttribute("class", "ecgs-ztli wbw");
        divwb.appendChild(divwbw1);

        var divztlicon1 = document.createElement("div");
        divztlicon1.setAttribute("class", "ecgs-ztlicon");
        divwbw1.appendChild(divztlicon1);

        var divztlibg1 = document.createElement("div");
        divztlibg1.setAttribute("class", "ecgs-ztlibg");
        divztlibg1.setAttribute("style", "background-color:" + bg1color);
        divztlicon1.appendChild(divztlibg1);

        var divztlitxt1 = document.createElement("div");
        divztlitxt1.setAttribute("class", "ecgs-ztlitxt");
        divztlibg1.appendChild(divztlitxt1);

        var divztleft1 = document.createElement("div");
        divztleft1.setAttribute("class", "ecgs-ztleft");
        divztlitxt1.appendChild(divztleft1);

        var divztleftimg1 = document.createElement("img");
        divztleftimg1.setAttribute("src", "leaflet/js/lib/ecgs16/img/ico6.png");
        divztleft1.appendChild(divztleftimg1);

        var p11 = document.createElement("p");
        p11.innerText = "泵1";
        divztleft1.appendChild(p11);

        var divztright1 = document.createElement("div");
        divztright1.setAttribute("class", "ecgs-ztright");
        divztlitxt1.appendChild(divztright1);

        var h31 = document.createElement("h3");
        h31.innerText = "状态";
        divztright1.appendChild(h31);

        var p21 = document.createElement("p");
        p21.innerText = beng1;
        divztright1.appendChild(p21);

        //泵2 状态

        var bg2color = "#85c700";

        if (beng2 == "停止") {
            bg2color = "#757575";
        } else if (beng2 == "报警") {
            bg2color = "#c7001c";
        }

        var divwbw2 = document.createElement("div");
        divwbw2.setAttribute("class", "ecgs-ztli wbw");
        divwb.appendChild(divwbw2);

        var divztlicon2 = document.createElement("div");
        divztlicon2.setAttribute("class", "ecgs-ztlicon");
        divwbw2.appendChild(divztlicon2);

        var divztlibg2 = document.createElement("div");
        divztlibg2.setAttribute("class", "ecgs-ztlibg");
        divztlibg2.setAttribute("style", "background-color:" + bg2color);
        divztlicon2.appendChild(divztlibg2);

        var divztlitxt2 = document.createElement("div");
        divztlitxt2.setAttribute("class", "ecgs-ztlitxt");
        divztlibg2.appendChild(divztlitxt2);

        var divztleft2 = document.createElement("div");
        divztleft2.setAttribute("class", "ecgs-ztleft");
        divztlitxt2.appendChild(divztleft2);

        var divztleftimg2 = document.createElement("img");
        divztleftimg2.setAttribute("src", "leaflet/js/lib/ecgs16/img/ico6.png");
        divztleft2.appendChild(divztleftimg2);

        var p21 = document.createElement("p");
        p21.innerText = "泵2";
        divztleft2.appendChild(p21);

        var divztright2 = document.createElement("div");
        divztright2.setAttribute("class", "ecgs-ztright");
        divztlitxt2.appendChild(divztright2);

        var h32 = document.createElement("h3");
        h32.innerText = "状态";
        divztright2.appendChild(h32);

        var p22 = document.createElement("p");
        p22.innerText = beng2;
        divztright2.appendChild(p22);


        //泵3 状态

        var bg3color = "#85c700";

        if (beng3 == "停止") {
            bg3color = "#757575";
        } else if (beng3 == "报警") {
            bg3color = "#c7001c";
        }

        var divwbw3 = document.createElement("div");
        divwbw3.setAttribute("class", "ecgs-ztli wbw");
        divwb.appendChild(divwbw3);

        var divztlicon3 = document.createElement("div");
        divztlicon3.setAttribute("class", "ecgs-ztlicon");
        divwbw3.appendChild(divztlicon3);

        var divztlibg3 = document.createElement("div");
        divztlibg3.setAttribute("class", "ecgs-ztlibg");
        divztlibg3.setAttribute("style", "background-color:" + bg3color);

        divztlicon3.appendChild(divztlibg3);

        var divztlitxt3 = document.createElement("div");
        divztlitxt3.setAttribute("class", "ecgs-ztlitxt");
        divztlibg3.appendChild(divztlitxt3);

        var divztleft3 = document.createElement("div");
        divztleft3.setAttribute("class", "ecgs-ztleft");
        divztlitxt3.appendChild(divztleft3);

        var divztleftimg3 = document.createElement("img");
        divztleftimg3.setAttribute("src", "leaflet/js/lib/ecgs16/img/ico6.png");
        divztleft3.appendChild(divztleftimg3);

        var p31 = document.createElement("p");
        p31.innerText = "泵3";
        divztleft3.appendChild(p31);

        var divztright3 = document.createElement("div");
        divztright3.setAttribute("class", "ecgs-ztright");
        divztlitxt3.appendChild(divztright3);

        var h33 = document.createElement("h3");
        h33.innerText = "状态";
        divztright3.appendChild(h33);

        var p32 = document.createElement("p");
        p32.innerText = beng3;
        divztright3.appendChild(p32);

        //return divfircon;

    }

    function getShuizhiDom(devName,dataShuizhi) {

        //水质监测div，下方实时数据

        //var divshadowp2 = document.createElement("div");
        //divshadowp2.setAttribute("class", "ecgs-ss box-shadow");

        //var divtitlep2 = document.createElement("div");
        //divtitlep2.setAttribute("class", "body-title");
        //divshadowp2.appendChild(divtitlep2);

        //设置标题
        var h3p2 = document.getElementById("shuizhiTitle");
        h3p2.innerText = devName;

        //var divclearfix2 = document.createElement("div");
        //divclearfix2.setAttribute("class", "ecgs-sscon clearfix2");
        //divshadowp2.appendChild(divclearfix2);

        //加载数据
        var divclearfix2 = document.getElementById("szdiv");
        divclearfix2.innerHTML = "";

        //余氯
        var divp11 = document.createElement("div");
        divp11.setAttribute("class", "ecgs-ssli fl");
        divclearfix2.appendChild(divp11);

        var divp12 = document.createElement("div");
        divp12.setAttribute("class", "ecgs-sstxt");
        divp11.appendChild(divp12);

        var divp13 = document.createElement("div");
        divp13.setAttribute("class", "ecgs-sstab");
        divp12.appendChild(divp13);

        var ppp1 = document.createElement("p");
        ppp1.innerText = "余氯";
        divp13.appendChild(ppp1);

        var yulv = dataShuizhi[0].ExpVal;

        var sppp1 = document.createElement("span");
        sppp1.innerText = yulv + " ppm";
        divp13.appendChild(sppp1);


        //PH值
        var divp21 = document.createElement("div");
        divp21.setAttribute("class", "ecgs-ssli fl");
        divclearfix2.appendChild(divp21);

        var divp22 = document.createElement("div");
        divp22.setAttribute("class", "ecgs-sstxt");
        divp21.appendChild(divp22);

        var divp23 = document.createElement("div");
        divp23.setAttribute("class", "ecgs-sstab");
        divp22.appendChild(divp23);

        var ppp2 = document.createElement("p");
        ppp2.innerText = "PH值";
        divp23.appendChild(ppp2);

        var phv = dataShuizhi[1].ExpVal;

        var sppp2 = document.createElement("span");
        sppp2.innerText = phv + " ";
        divp23.appendChild(sppp2);


        //温度
        var divp31 = document.createElement("div");
        divp31.setAttribute("class", "ecgs-ssli fl");
        divclearfix2.appendChild(divp31);

        var divp32 = document.createElement("div");
        divp32.setAttribute("class", "ecgs-sstxt");
        divp31.appendChild(divp32);

        var divp33 = document.createElement("div");
        divp33.setAttribute("class", "ecgs-sstab");
        divp32.appendChild(divp33);

        var ppp3 = document.createElement("p");
        ppp3.innerText = "温度";
        divp33.appendChild(ppp3);

        var wendu = dataShuizhi[2].ExpVal;

        var sppp3 = document.createElement("span");
        sppp3.innerText = wendu + " ℃";
        divp33.appendChild(sppp3);


        //余氯
        var divp41 = document.createElement("div");
        divp41.setAttribute("class", "ecgs-ssli fl");
        divclearfix2.appendChild(divp41);

        var divp42 = document.createElement("div");
        divp42.setAttribute("class", "ecgs-sstxt");
        divp41.appendChild(divp42);

        var divp43 = document.createElement("div");
        divp43.setAttribute("class", "ecgs-sstab");
        divp42.appendChild(divp43);

        var ppp4 = document.createElement("p");
        ppp4.innerText = "浊度";
        divp43.appendChild(ppp4);

        var zhudu = dataShuizhi[3].ExpVal;

        var sppp4 = document.createElement("span");
        sppp4.innerText = zhudu + " NTU";
        divp43.appendChild(sppp4);


        //电导
        var divp51 = document.createElement("div");
        divp51.setAttribute("class", "ecgs-ssli fl");
        divclearfix2.appendChild(divp51);

        var divp52 = document.createElement("div");
        divp52.setAttribute("class", "ecgs-sstxt");
        divp51.appendChild(divp52);

        var divp53 = document.createElement("div");
        divp53.setAttribute("class", "ecgs-sstab");
        divp52.appendChild(divp53);

        var ppp5 = document.createElement("p");
        ppp5.innerText = "电导";
        divp53.appendChild(ppp5);

        var diandao = dataShuizhi[4].ExpVal;

        var sppp5 = document.createElement("span");
        sppp5.innerText = diandao + " us/cm";
        divp53.appendChild(sppp5);


        //压力
        var divp61 = document.createElement("div");
        divp61.setAttribute("class", "ecgs-ssli fl");
        divclearfix2.appendChild(divp61);

        var divp62 = document.createElement("div");
        divp62.setAttribute("class", "ecgs-sstxt");
        divp61.appendChild(divp62);

        var divp63 = document.createElement("div");
        divp63.setAttribute("class", "ecgs-sstab");
        divp62.appendChild(divp63);

        var ppp6 = document.createElement("p");
        ppp6.innerText = "压力";
        divp63.appendChild(ppp6);

        var yali = dataShuizhi[5].ExpVal;

        var sppp6 = document.createElement("span");
        sppp6.innerText = yali + " bar";
        divp63.appendChild(sppp6);

        //return divclearfix2;
    };

    return{
        getDeviceGYHtml:getDeviceGYHtml
    };
})
