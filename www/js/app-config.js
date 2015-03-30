define(
    [
        'jquery',
        'underscore',
        'backbone',
        'fit'
    ], function($, _, Backbone, Fit) {

        'use strict';

        $( window ).resize(function() {
            appConfig.winW = $(window).width();
            appConfig.winH = $(window).height();

        });

        var appConfig = {
            jsonData : [],
            videoQuality: 'hd',
            winH: $(window).height(),
            winW: $(window).width(),
            isMobile :
            {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (appConfig.isMobile.Android() || appConfig.isMobile.BlackBerry() || appConfig.isMobile.iOS() || appConfig.isMobile.Opera() || appConfig.isMobile.Windows());
                }
            },

            init: function(){

                this.events();
            },

            events: function(){

                this.msieversion();
            },

            msieversion: function(){
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){      // If Internet Explorer, return version number
                    $('body').addClass('ie11');
                    var ieVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
                    if( !isNaN(ieVersion) ){
                        $('body').addClass('ie'+ieVersion);
                    }
                }
            }

        };

        appConfig.init();




        return appConfig;

    }
);