define(['jquery','layui','gongYi','app/leafletPlugin/chart/tabChart','app/vr'],function($,layui,gongYi,tabChart,vr){

    function openStationData(title){

        console.log("实时数据:"+ title);
        let divTab = document.getElementById("divTab");
        divTab.innerHTML = "";

        let ultitle = document.createElement("ul");
        ultitle.setAttribute("class","layui-tab-title");

        let liylsj = document.createElement("li");
        liylsj.setAttribute("class","layui-this");
        liylsj.innerText = "压力数据";
        ultitle.appendChild(liylsj);

        let liylqx = document.createElement("li");
        liylqx.innerText = "压力曲线";
        ultitle.appendChild(liylqx);

        let libzt = document.createElement("li");
        libzt.innerText = "泵状态";
        ultitle.appendChild(libzt);

        let libjdt = document.createElement("li");
        libjdt.innerText = "泵机带图";
        ultitle.appendChild(libjdt);

        divTab.appendChild(ultitle);//加入tab选项头

        let divContent = document.createElement("div");
        divContent.setAttribute("class","layui-tab-content");

        let divYlsj = document.createElement("div");
        divYlsj.setAttribute("class","layui-tab-item layui-show");
        divYlsj.innerHTML = "压力数据";
        divContent.appendChild(divYlsj);

        let divYlqx = document.createElement("div");
        divYlqx.setAttribute("class","layui-tab-item");
        divYlqx.innerHTML = "压力曲线";
        divContent.appendChild(divYlqx);

        let divBzt = document.createElement("div");
        divBzt.setAttribute("class","layui-tab-item");
        divBzt.innerHTML = "泵状态";
        divContent.appendChild(divBzt);

        let divBjdt = document.createElement("div");
        divBjdt.setAttribute("id","divBjdt");
        divBjdt.setAttribute("class","layui-tab-item info controlChart");
        divBjdt.innerHTML = "泵机带图";
        divContent.appendChild(divBjdt);

        divTab.appendChild(divContent);

        layui.use('element',function () {
            let element = layui.element;

            element.on('tab(divTab)', function(data){
                //location.hash = 'Tab选项卡='+ this.getAttribute('lay-id');
                console.log(this,data);
            });

            element.on('nav(test)',function (elem){
                console.log(elem);
            });

            element.on('collapse(test)',function (data) {
                console.log(data);
            });
        });

        layui.layer.open({
            title:title,
            type: 1,
            shade: false,
            area: ['720px','580px'],
            content: $('#divTab') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });

        tabChart.setTabChart(title+" 泵机带图","divBjdt");
    }

    function openStationGongyi(title){
        console.log("工艺图:"+ title);
        gongYi.getGongYi(title);
    }

    function openStationCamera(title,llmap) {
        console.log("摄像头:"+ title);
        //iframe层-多媒体

        vr.loadVrJpg("vrcontainer");

        layer.open({
            type: 1,
            title: title,
            area: ['800px','550px'],
            shade: false,
            content: $('#vrcontainer')
            //closeBtn: 0,
            //shadeClose: true,
            //content: '//player.youku.com/embed/XMjY3MzgzODg0'
        });
    }

    function openStationPanorama(title) {
        console.log("全景图：" + title);
    }

    function openStationInfo(title) {
        console.log("站点详情：" + title);
    }


    function getPopupContent(a,llmap) {

        let basicHtml = "<b>站点名称</b>:" + a.title + "<br>" +
            "<b>站点ID</b>:" + a.stationId + "<br>" +
            "<b>站点编号</b>:" + a.stationnum + "<br>" +
            "<b>类型编号</b>:" + a.typecode + "<br>" +
            "<b>类型名称</b>:" + a.typetitle + "<br>" +
            "<b>供水所</b>:" + a.suotitle + "<br>";

        let popDiv = document.createElement("div");

        let popHead = document.createElement("div");
        popHead.setAttribute("style","padding:5px;")

        let popBasic = document.createElement("div");
        popBasic.innerHTML = basicHtml;
        popDiv.appendChild(popBasic);
        popDiv.appendChild(popHead);

        let iInfo = document.createElement("i");
        iInfo.setAttribute("id","btnInfo");
        iInfo.setAttribute("class","fa fa-info-circle fa-2x");
        iInfo.setAttribute("style","padding-right:15px;");
        iInfo.setAttribute("aria-hidden","true");
        iInfo.title ="泵站详情";
        iInfo.addEventListener("click",function(){
            openStationInfo(a.title);
        });
        // let ainfo = document.createElement("a");
        // ainfo.innerText = "详情"
        // popHead.appendChild(ainfo);
        popHead.appendChild(iInfo);


        let iData = document.createElement("i");
        iData.setAttribute("id","btnData");
        iData.setAttribute("class","fa fa-wifi fa-2x");
        iData.setAttribute("style","padding-right:15px;");
        iData.setAttribute("aria-hidden","true");
        iData.title ="实时数据";
        iData.addEventListener("click",function(){
            openStationData(a.title);
        });
        // let adata = document.createElement("a");
        // adata.innerText = "数据"
        // popHead.appendChild(adata);
        popHead.appendChild(iData);

        let iGongyi = document.createElement("i");
        iGongyi.setAttribute("id","btnGongyi");
        iGongyi.setAttribute("class","fa fa-home fa-2x");
        iGongyi.setAttribute("style","padding-right:15px;");
        iGongyi.setAttribute("aria-hidden","true");
        iGongyi.title ="工艺图";
        iGongyi.addEventListener("click",function(){
            openStationGongyi(a.title);
        });
        // let agongyi = document.createElement("a");
        // agongyi.innerText = "工艺图"
        // popHead.appendChild(agongyi);
        popHead.appendChild(iGongyi);

        let iCamera = document.createElement("i");
        iCamera.setAttribute("id","btnCamera");
        iCamera.setAttribute("class","fa fa-video-camera fa-2x");
        iCamera.setAttribute("style","padding-right:15px;");
        iCamera.setAttribute("aria-hidden","true");
        iCamera.title = "视频监控";
        iCamera.addEventListener("click",function(){
            openStationCamera(a.title,llmap);
        });
        // let acamera = document.createElement("a");
        // acamera.innerText = "监控"
        // popHead.appendChild(acamera);
        popHead.appendChild(iCamera);

        // let iPanorama = document.createElement("i");
        // iPanorama.setAttribute("id","btnPanorama");
        // iPanorama.setAttribute("class","fa fa-simplybuilt");
        // iPanorama.setAttribute("aria-hidden","true");
        // iPanorama.innerText ="全景漫游";
        // iPanorama.addEventListener("click",function(){
        //     openStationPanorama(a.title);
        // });
        // popHead.appendChild(iPanorama);

        return popDiv;
    }


    return{
        getPopupContent: getPopupContent
    }
});
