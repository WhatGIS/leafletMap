define(['jquery'
    ,'layui'
    ,'gongYi'
    ,'app/leafletPlugin/chart/tabChart'
    ,'controlChart'
    ,'app/vr'
    ,'app/leafletPlugin/bdMap'
    ],function(
        $
        ,layui
        ,gongYi
        ,tabChart
        ,controlChart
        ,vr
        ,bdStreet) {



    /**
     * 右下角 Control chart。
     * @param flag
     * @param title
     */

    let ControlShow = false;

    /**
     * 打开实时数据控件
     * @param title
     */
    function openStationFlow(title,map) {

        ControlShow = !ControlShow;

        if (ControlShow) {
            controlChart.addControlChart(title,map);
        } else {
            controlChart.removeControlEChart();
        }
    };

    function updateStationFlow(title) {
        if (ControlShow) {
            controlChart.updateControlChart(title);
        }
    };

    /**
     * 查看泵房数据曲线
     * @param title
     */
    function openStationData(title) {

        console.log("实时数据:" + title);
        let divTab = document.getElementById("divTab");
        divTab.innerHTML = "";

        let ultitle = document.createElement("ul");
        ultitle.setAttribute("class", "layui-tab-title");

        let libzt = document.createElement("li");
        libzt.setAttribute("class", "layui-this");
        libzt.innerText = "泵状态";
        ultitle.appendChild(libzt);

        let liylqx = document.createElement("li");
        liylqx.innerText = "压力曲线";
        ultitle.appendChild(liylqx);

        let lillqx = document.createElement("li");

        lillqx.innerText = "流量曲线";
        ultitle.appendChild(lillqx);

        let libjdt = document.createElement("li");
        libjdt.innerText = "泵机带图";
        ultitle.appendChild(libjdt);

        divTab.appendChild(ultitle);//加入tab选项头

        let divContent = document.createElement("div");
        divContent.setAttribute("class", "layui-tab-content");

        let divBzt = document.createElement("div");
        divBzt.setAttribute("class", "layui-tab-item layui-show info controlChart");
        divBzt.setAttribute("id", "divBzt");
        divBzt.innerHTML = "泵状态";
        divContent.appendChild(divBzt);

        let divYlqx = document.createElement("div");
        divYlqx.setAttribute("class", "layui-tab-item info controlChart");
        divYlqx.setAttribute("id", "divYlqx");
        divYlqx.innerHTML = "压力曲线";
        divContent.appendChild(divYlqx);

        let divLlqx = document.createElement("div");
        divLlqx.setAttribute("class", "layui-tab-item info controlChart");
        divLlqx.setAttribute("id", "divLlqx");
        divLlqx.innerHTML = "流量曲线";
        divContent.appendChild(divLlqx);

        let divBjdt = document.createElement("div");
        divBjdt.setAttribute("id", "divBjdt");
        divBjdt.setAttribute("class", "layui-tab-item info controlChart");
        divBjdt.innerHTML = "泵机带图";
        divContent.appendChild(divBjdt);

        divTab.appendChild(divContent);

        layui.use('element', function () {
            let element = layui.element;

            element.on('tab(divTab)', function (data) {
                //location.hash = 'Tab选项卡='+ this.getAttribute('lay-id');
                console.log(this, data);
            });

            element.on('nav(test)', function (elem) {
                console.log(elem);
            });

            element.on('collapse(test)', function (data) {
                console.log(data);
            });
        });

        layui.layer.open({
            title: title,
            type: 1,
            shade: false,
            area: ['720px', '580px'],
            content: $('#divTab') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });

        tabChart.setTabChart('divBzt', 'divYlqx', 'divLlqx', "divBjdt");
    };

    /**
     * 查看工艺图
     * @param title
     */
    function openStationGongyi(title) {
        console.log("工艺图:" + title);
        gongYi.getGongYi(title);
    };

    /**
     * 查看全景图
     * @param title
     */
    function openStationPanorama(title) {
        console.log("摄像头:" + title);
        //iframe层-多媒体

        vr.loadVrJpg("vrcontainer");

        layer.open({
            type: 1,
            title: title,
            area: ['800px', '550px'],
            shade: false,
            content: $('#vrcontainer')
            //closeBtn: 0,
            //shadeClose: true,
            //content: '//player.youku.com/embed/XMjY3MzgzODg0'
        });
    };

    /**
     * 查看百度街景图图
     * @param title
     */
    function openStationStreetMap(id,title,lng,lat) {

        // var panorama = new BMap.Panorama('panorama');
        // panorama.setPov({heading: -40, pitch: 6});
        // panorama.setPosition(new BMap.Point(120.320032, 31.589666)); //根据经纬度坐标展示全景图
        //
        // return;

        let divStreet = document.getElementById(id);

        divStreet.innerHTML = "";

        bdStreet.setStreet(id,lng,lat);

        layer.open({
            type: 1,
            title: title,
            area: ['800px', '550px'],
            shade: false,
            content: $('#'+id)
            //closeBtn: 0,
            //shadeClose: true,
            //content: '//player.youku.com/embed/XMjY3MzgzODg0'
        });
    };

    function getPopupContent(a, lMap) {

        let basicHtml = "<b>站点名称</b>:" + a.title + "<br>" +
            "<b>站点ID</b>:" + a.stationId + "<br>" +
            "<b>站点编号</b>:" + a.stationnum + "<br>" +
            "<b>类型编号</b>:" + a.typecode + "<br>" +
            "<b>类型名称</b>:" + a.typetitle + "<br>" +
            "<b>供水所</b>:" + a.suotitle + "<br>";

        let popDiv = document.createElement("div");

        let popHead = document.createElement("div");
        popHead.setAttribute("style", "padding:5px;")

        let popBasic = document.createElement("div");
        popBasic.innerHTML = basicHtml;
        popDiv.appendChild(popBasic);
        popDiv.appendChild(popHead);

        let iInfo = document.createElement("i");
        iInfo.setAttribute("id", "btnInfo");
        iInfo.setAttribute("class", "fa fa-wifi fa-2x");
        iInfo.setAttribute("style", "padding-right:15px;");
        iInfo.setAttribute("aria-hidden", "true");
        iInfo.title = "实时数据";
        iInfo.addEventListener("click", function () {
            openStationFlow(a.title,lMap);
        });
        popHead.appendChild(iInfo);


        let iData = document.createElement("i");
        iData.setAttribute("id", "btnData");
        iData.setAttribute("class", "fa fa-info-circle fa-2x");
        iData.setAttribute("style", "padding-right:15px;");
        iData.setAttribute("aria-hidden", "true");
        iData.title = "泵房状态";
        iData.addEventListener("click", function () {
            openStationData(a.title);
        });
        popHead.appendChild(iData);

        let iGongYi = document.createElement("i");
        iGongYi.setAttribute("id", "btnGongYi");
        iGongYi.setAttribute("class", "fa fa-home fa-2x");
        iGongYi.setAttribute("style", "padding-right:15px;");
        iGongYi.setAttribute("aria-hidden", "true");
        iGongYi.title = "工艺图";
        iGongYi.addEventListener("click", function () {
            openStationGongyi(a.title);
        });
        popHead.appendChild(iGongYi);

        let iPanorama = document.createElement("i");
        iPanorama.setAttribute("id", "btnPanorama");
        iPanorama.setAttribute("class", "fa fa-camera fa-2x");
        iPanorama.setAttribute("style", "padding-right:15px;");
        iPanorama.setAttribute("aria-hidden", "true");
        iPanorama.title = "全景图";
        iPanorama.addEventListener("click", function () {
            openStationPanorama(a.title);
        });
        popHead.appendChild(iPanorama);


        let iStreetMap = document.createElement("i");
        iStreetMap.setAttribute("id", "btnStreetMap");
        iStreetMap.setAttribute("class", "fa fa-street-view fa-2x");
        iStreetMap.setAttribute("style", "padding-right:15px;");
        iStreetMap.setAttribute("aria-hidden", "true");
        iStreetMap.title = "街景图";
        iStreetMap.addEventListener("click", function () {
            let xy = a.loc;
            let lng = parseFloat(xy[1]);
            let lat = parseFloat(xy[0]);
            openStationStreetMap('streetMap',a.title,lng,lat);
        });
        popHead.appendChild(iStreetMap);


        return popDiv;
    };





    return {
        getPopupContent: getPopupContent,
        updateStationFlow: updateStationFlow
    };
});
