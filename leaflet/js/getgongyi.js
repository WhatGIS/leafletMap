function getGongYi(title){
    $.getJSON("/leafletMap/leaflet/data/GongYi.json", function (jsonData) {

        let i = 0;

        let GuiDataHtml = "";
        let ShuiDataHtml = "";

        if (jsonData) {

            $.each(jsonData,

                function (info, json) {

                    let devName = title + " "+ info;
                    let dataList = json.List;
                    console.log("数据:" + dataList);

                    bengFangDic[devName] = dataList;

                    //let dataHtml = "<a style=\"padding: 25px;font-size:15px; color:#43a2ca\"><b>" + devName + "</b></a><br/>";

                    // if (devName.indexOf("水质") == -1) { //先获取泵房数据
                    //     if (dataList && dataList.length > 0) {
                    //
                    //         let yeweiHtml = "";
                    //
                    //         let yaliHtml = "";
                    //
                    //         let pinlvHtml = "";
                    //
                    //         let zhuangtaiHtml = "";
                    //
                    //         $.each(dataList,
                    //             function (dataIndex, data) {
                    //                 var fieldName = data.P_Text;
                    //                 var fieldValue = data.ExpVal;
                    //                 var fieldUnit = data.P_Unit === null ? "" : data.P_Unit;
                    //
                    //                 dataHtml = dataHtml + "<a style=\"padding: 10px;\"> " + fieldName + ": <b>" + fieldValue + "</b> " + fieldUnit + "</a><br/>";
                    //             }
                    //         );
                    //     }
                    //
                    //     GuiDataHtml = GuiDataHtml + dataHtml;
                    //
                    // } else {
                    //
                    //     if (dataList && dataList.length > 0) { //获取水质数据
                    //
                    //
                    //         $.each(dataList,
                    //             function (dataIndex, data) {
                    //
                    //                 var fieldName = data.P_Text;
                    //                 var fieldValue = data.ExpVal;
                    //                 var fieldUnit = data.P_Unit === null ? "" : data.P_Unit;
                    //
                    //
                    //                 dataHtml = dataHtml + "<a style=\"padding: 10px;\"> " + fieldName + ": <b>" + fieldValue + "</b> " + fieldUnit + "</a><br/>";
                    //             }
                    //         );
                    //     }
                    //
                    //     ShuiDataHtml = dataHtml;
                    // }


                });

            //GuiDataHtml = GuiDataHtml + ShuiDataHtml;//数据

            //divbengData.innerHTML = GuiDataHtml;

            getDeviceGYHtml(title); //获取工艺图

            $('#ModalDataCenter').modal();
        };
    });
}
