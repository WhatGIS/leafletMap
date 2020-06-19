define(['jquery','layui','app/devAPI'],function($,layui,devApi){
    function getGongYi(title){
        $.getJSON("/leafletMap/leaflet/data/GongYi.json", function (jsonData) {
            if (jsonData) {

                let bfDic ={};
                $.each(jsonData,

                    function (info, json) {

                        let devName = info;
                        let dataList = json.List;
                        console.log("数据:" + dataList);

                        bfDic[devName] = dataList;
                    });

                devApi.getDeviceGYHtml(title,bfDic); //获取工艺图

                //建造实例
                layui.carousel.render({
                    elem: '#divGy'
                    ,width: '838px'
                    ,height: '747px'
                    //,autoplay:true
                    //,arrow: 'always' //始终显示箭头
                    //,anim: 'updown' //切换动画方式
                });

                layui.layer.open({
                    title:title
                    ,type: 1
                    ,area: ['838px']
                    ,shade: false
                    ,content: $('#divGongYi') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                });
            };
        });
    }
    return {
        getGongYi:getGongYi
    };
})
