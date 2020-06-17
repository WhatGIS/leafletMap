requirejs.config({
    baseUrl: 'js/lib',
    map:{
        '*':{
            css:'./css',
            //font:'font-awesome/css/font-awesome.min.css'
        }
    },
    paths: {
        app: '../app',
        jquery:'jquery/jquery-3.5.1'
    },
    shim: {
        SYLLMap:{
            deps:['css!font-awesome/css/font-awesome.min.css'],
            exports: 'SYLLMap'
        },

        L: {
            deps: [],
            exports: 'L'
        }
    }
});

require(['jquery'],function($){
    $.alert('aaa');
});
