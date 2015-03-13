 require.config({
    urlArgs: 'bust=' + new Date().getTime(), // prevent caching in development
    // baseUrl: 'js',
    paths: {
        underscore: 'vendors/underscore/underscore',
        jquery: 'vendors/jquery/dist/jquery',
        jqueryui: 'vendors/jquery-ui/ui/minified/jquery-ui.min',
        jqueryRotate : 'vendors/jQueryRotateMin',
        backbone: 'vendors/backbone/backbone',
        fit: 'vendors/fit',
        preloader  : 'vendors/html5Preloader',
        jscrollpane: 'vendors/jscrollpane/jquery.jscrollpane.min',
        mousewheel : 'vendors/jscrollpane/jquery.mousewheel',
        modernirz  : 'vendors/modernizr',
        text: 'vendors/requirejs-text/text',
        templates: '../templates'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery']
        },
        fit: {
            deps: ['jquery']
        },
        jqueryui: {
            deps: [ 'jquery' ]
        },
        jqueryRotate: {
            deps: [ 'jquery' ]
        },
        jscrollpane: {
            deps: [ 'jquery', 'mousewheel' ]
        },
        mousewheel: {
            deps: [ 'jquery' ]
        }
    }
});

require(['main']);