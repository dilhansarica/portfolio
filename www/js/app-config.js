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

/*
            var $videoWrapper = $('#video .videoContainer .videoWrapper');
            var videoWrapperWidth = $videoWrapper.width();
            var $currentVideo = $videoWrapper.find('video:visible');
            var videoWidth = $currentVideo.width();

            if( videoWidth > videoWrapperWidth){
                var difference = videoWidth - videoWrapperWidth;
                var marginLeftValue = -1 * (difference/2);
                $currentVideo.css({ marginLeft: marginLeftValue});
            }else{*/
                if($(".videoContainer .videoWrapper").length){
                    var _domPlayer = document.querySelector( '.videoContainer .videoWrapper' );
                    var _domVideo = document.querySelector('video');

                    var cover = true;
                    fit( _domVideo, _domPlayer, { cover: true } );
                }

       /*     }*/



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
            },

            pageViewGstatTag: function(tagName){
                 _gstat.audience('','', tagName);
                 this.sendTrackDatabase(tagName)
            },

            sendTrackDatabase: function(tagName){

                $.ajax({
                    type: "POST",
                    url: "../services/tracking.php",
                    data: 'label='+tagName,
                    success: function(response) {
                        console.log(response);
                    }
                });

            },
            getCookie: function(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                }
                return "";
            }

        };

        appConfig.init();




        return appConfig;

    }
);