define(['threeJs','sphoords','PSVNavBar','PSVNavBarButton','PhotoSphereViewer'],function(){
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    function loadVrJpg(id) {
// Panorama display
        let div = document.getElementById(id);
        //div.style.height = '30px';
        let picArray = ['AI','big','snow','sun','work'];

        let picIndex = getRndInteger(0,5);

        let picName = picArray[picIndex];

        let PSV = new PhotoSphereViewer({
            // Path to the panorama
            panorama: 'leaflet/js/lib/vr/pic/AI.jpg',

            // Container
            container: div,

            // Deactivate the animation
            time_anim: 0,

            // Display the navigation bar
            navbar: true,

            // Resize the panorama
            size: {
                width: '100%',
                height: '100%'
            },

            // HTML loader
            //loading_html: loader,
            startAutorotate: true,

            // Disable smooth moves to test faster
            smooth_user_moves: false
        });
    };

    return{
        loadVrJpg:loadVrJpg
    };
})
