define(function () {

    function setStreet(id,lng,lat) {


        //坐标转换完之后的回调函数
        translateCallback = function (data) {
            if (data.status === 0) {

                let point = data.points[0];

                console.log("百度坐标 lng:"+point.lng + " lat:" + point.lat);

                let panorama = new BMap.Panorama(id);
                panorama.setPov({heading: -40, pitch: 6});
                panorama.setPosition(new BMap.Point(point.lng, point.lat)); //根据经纬度坐标展示全景图
            }
        };

        let ggPoint = new BMap.Point(lng, lat);

        console.log("原始坐标 lng:"+ lng + " lat:" + lat);

        let convertor = new BMap.Convertor();
        let pointArr = [ggPoint];
        convertor.translate(pointArr, 3, 5, translateCallback)
    };

    return{
        setStreet: setStreet
    };
})