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

    return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}

function downloadImage(filename, dataUrl) {
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

function exportImage(id){

    html2canvas(document.querySelector("#"+id),{allowTaint: true,useCORS: true}).then(canvas => {

        let dataUrl = getImageWithText(canvas,"SYWater-2020©");

        downloadImage("sywater-gis",dataUrl)

    });
}
