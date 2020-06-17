/* global L
* ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
* ♥♥所有的控件都不要从网上下载官方js/css库 进行替换，有些函数和数值已经修改。切记！♥♥
* ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
* */

function getImageWithText(canvas, text) {

    const context = canvas.getContext("2d");

    // add the screenshot data to the canvas

    // let rawData = context.getImageData(0,0,canvas.width,canvas.height);
    // let imageData = rawData.data;
    //context.putImageData(imageData, 0, 0);
    context.font = "10px Arial";
    context.fillStyle = "#000";
    context.fillRect(
        0,
        canvas.height - 30,
        context.measureText(text).width + 20,
        30
    );

    // add the text from the textInput element
    context.fillStyle = "#fff";
    context.fillText(text, 10, canvas.height - 10);

    return canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");
}

function downloadImage(filename, dataUrl) {

    // 生成一个a元素
    let a = document.createElement('a')
    // 创建一个单击事件
    let event = new MouseEvent('click')

    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = filename
    // 将生成的URL设置为a.href属性
    a.href = dataUrl

    // 触发a的单击事件
    a.dispatchEvent(event)


    return;

    // the download is handled differently in Microsoft browsers
    // because the download attribute for <a> elements is not supported
    if (!window.navigator.msSaveOrOpenBlob) {
        // in browsers that support the download attribute
        // a link is created and a programmatic click will trigger the download

        console.log(dataUrl);

        const img = new Image();
        img.src = dataUrl;
        const newWin = window.open("", "_blank");
        newWin.document.write(img.outerHTML);
        newWin.document.title = "SYWate-GIS 地图";
        newWin.document.close();

        //const element = document.createElement("a");
        //element.setAttribute("href", dataUrl);
        //element.setAttribute("download", filename);
        //element.style.display = "block";
        //document.body.appendChild(element);

        //element.click();
        //document.body.removeChild(element);

    } else {
        // for MS browsers convert dataUrl to Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // download file
        window.navigator.msSaveOrOpenBlob(blob, filename);
    }
}

function downimg(canvas){
    let iframe = document.createElement('iframe'); //或者img
    //var dimensions = __WEBPACK_IMPORTED_MODULE_3__basemap_js__["a" /* map */].getSize();
    iframe.width = canvas.width;
    iframe.height = canvas.height;
    iframe.src = canvas.toDataURL();
    iframe.crossOrigin = "Anonymous";
    window.open(iframe.src);
}

function exportImage(id){

    html2canvas(document.querySelector("#"+id),{allowTaint: true,useCORS: true}).then(canvas => {

        let dataUrl = getImageWithText(canvas,"SYWater-2020©");

        downloadImage("sywater-gis",dataUrl)

    });
}
