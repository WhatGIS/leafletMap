/**
 * 天地图内容
 */
var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
var normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
    maxZoom: 18,
    minZoom: 5
});
var imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
});
var imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 5
});

var terrianm = L.tileLayer.chinaProvider('TianDiTu.Terrain.Map',{
    maxZoom: 18,
    minZoom: 5
});

var terraina = L.tileLayer.chinaProvider('TianDiTu.Terrain.Annotion',{
    maxZoom: 18,
    minZoom: 5
})

var TDTNormal = L.layerGroup([normalm, normala]);
var TDTImage = L.layerGroup([imgm, imga]);
var TDTTerrain = L.layerGroup([terrianm,terraina]);

/**
 * 高德地图
 */
var GaodeNormal = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
var Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
});
var Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 5
});
var GaodeImage = L.layerGroup([Gaodimgem, Gaodimga]);


/**
 * 谷歌
 */
var GoogleNormal = L.tileLayer.chinaProvider('Google.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});

var satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
});

var satelliteAnnotion = L.tileLayer.chinaProvider("Google.Satellite.Annotion",{
    maxZoom:18,
    minZoom:5
});

var GoogleSatellite = L.layerGroup([satelliteMap,satelliteAnnotion]);

//智图地图
var GeoqMap = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
var GeoqBlue = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
    maxZoom: 18,
    minZoom: 5
});
var GeoqGray = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
    maxZoom: 18,
    minZoom: 5
});
var GeoqWarm = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
    maxZoom: 18,
    minZoom: 5
});
var GeoqHydro = L.tileLayer.chinaProvider('Geoq.Theme.Hydro', {
    maxZoom: 18,
    minZoom: 5
});

//OpenStreet
var OSMMap = L.tileLayer.chinaProvider('OSM.Normal.Map',{
    maxZoom:18,
    minZoom:5
});

//百度地图
var BDNormal = L.tileLayer.chinaProvider('Baidu.Normal.Map',{
    maxZoom:18,
    minZoom:5
});

var BDimgm = L.tileLayer.chinaProvider('Baidu.Satellite.Map',{
    maxZoom: 18,
    minZoom: 5
});
var BDimga = L.tileLayer.chinaProvider('Baidu.Satellite.Annotion',{
    maxZoom:18,
    minZoom:5
});
var BDImage = L.layerGroup(BDimgm,BDimga);

//本机离线地图
var offImgurl = 'https://localhost:4438/{z}/{x}/{y}.jpg';
//初始化 地图，这个view要设置到离线地图的范围，不然什么都没有
//var leafletMap = L.map('mapDiv').setView([39.2, 117.25], 13);
//将图层加载到地图上，并设置最大的聚焦还有map样式
var localLayer = L.tileLayer(offImgurl, {
    maxZoom: 18,
    minZoom:5
});
var localGroup = L.layerGroup([localLayer]);

//87服务器地图
const offImgServer = 'https://192.168.3.87:4438/{z}/{x}/{y}.png';
//初始化 地图，这个view要设置到离线地图的范围，不然什么都没有
//var leafletMap = L.map('mapDiv').setView([39.2, 117.25], 13);
//将图层加载到地图上，并设置最大的聚焦还有map样式
var serverLayer = L.tileLayer(offImgServer, {
    maxZoom: 18,
    minZoom:5
});
var serverGroup = L.layerGroup([serverLayer]);

//要显示的地图组
var baseLayers = {
    "天地图": TDTNormal,
    "天地图影像": TDTImage,
    "天地图混合": TDTTerrain,

    // "高德地图": GaodeNormal,
    // "高德影像": GaodeImage,
    //
    // "百度地图": BDNormal,
    // "百度影像": BDImage,
    //
    //  "谷歌地图": GoogleNormal,
    //  "谷歌影像": GoogleSatellite,

    // "智图地图": GeoqMap,
    // "智图午夜蓝": GeoqBlue,
    // "智图灰色": GeoqGray,
    // "智图暖色": GeoqWarm,
    // "智图鸟瞰": GeoqHydro,

     // "OSM": OSMMap,

    // "本地影像图": localGroup,
    "服务器影像图":serverGroup
}