define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'fit'
    ], function($, _, Backbone, appConfig, Fit) {

        'use strict';

        var layoutView = Backbone.View.extend({
            events: {
                'click .ctrl-sound' : 'modifySoundCurrentVideo',
                'click .ctrl-fullscreen': 'fullscreenCurrentVideo',
                "click .gstat": "onClickGstatTag"
            },
            el: "body",
            initialize: function(){
                console.log("layout");
                // IE 8 and under redirect
                var self =  this;
                this.fullscreen = 0;
                var domainURL = "";
                if( $('html').hasClass('lt-ie9') ){
                    var loc = domainURL + 'incompatibilite.php';
                    window.location.replace(loc);
                }
                document.addEventListener('keyup', function(e) {
                    if (e.keyCode == 27) {
                        self.actionsOnExitFullscreen();
                    }
                }, false);

                document.addEventListener('mozfullscreenchange', function(e) {
                    if(!document.mozFullScreenElement){
                        self.actionsOnExitFullscreen();
                    }
                }, false);

                document.addEventListener('msfullscreenchange', function(e) {
                    if(!document.msFullScreenElement){
                        self.actionsOnExitFullscreen();
                    }
                }, false);

/*                document.addEventListener('webkitfullscreenchange', function(e) {
                    if(!document.webkitFullScreenElement){
                        self.actionsOnExitFullscreen();
                    }
                }, false);*/

                if( appConfig.isMobile.any() ){
                    if(window.innerHeight > window.innerWidth){
                        window.location.hash = "rotation";
                    }
                }

                window.addEventListener("orientationchange", function() {

                    if(window.innerHeight > window.innerWidth){
                        window.location.hash = "rotation";
                    }
                    else{
                        window.location.hash = "";
                    }

                }, false);


            },
            actionsOnExitFullscreen: function(){
                if($("video").length){
                    setTimeout(function(){
                        var _domPlayer = document.querySelector( '.videoContainer .videoWrapper' );
                        var _domVideo = document.querySelector('video');
                        var cover = true;
                        fit( _domVideo, _domPlayer, { cover: true } );

                    },500)
                }
                $("body").removeClass('fullscreen');
                console.log(self.fullscreen)
                if(this.fullscreen){
                    this.fullscreen = 0;
                    $(".ctrl-fullscreen").removeClass('on');
                }
            },
            fullscreenCurrentVideo: function(e){
                e.preventDefault();

                if( $(e.target).is('.on') ){
                    this.exitFullscreen();
                    $(e.target).removeClass('on');
                    $("body").removeClass('fullscreen');
                    this.fullscreen = 0;
                }
                else{
                    console.log("yo")
                    this.launchIntoFullscreen(document.documentElement);
                    $(e.target).addClass('on');
                    $("body").addClass('fullscreen');
                    this.fullscreen = 1;
                }
                if($("video").length){
                    setTimeout(function(){
                        var _domPlayer = document.querySelector( '.videoContainer .videoWrapper' );
                        var _domVideo = document.querySelector('video');
                        var cover = true;
                        fit( _domVideo, _domPlayer, { cover: true } );
                    },500)
                }

            },
            launchIntoFullscreen: function(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen && $("body").hasClass("ie11")) {
                    var elem = document.body;
                    elem.msRequestFullscreen();
                }else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }else{
                    console.log("Fullscreen API is not supported");
                }
            },

            exitFullscreen: function() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },
            modifySoundCurrentVideo: function(e){
                e.preventDefault();
                if( $(e.target).is('.off') ){
                    $("video").prop('muted', false);
                    $(e.target).removeClass('off');
                }
                else{
                    $("video").prop('muted', true);
                    $(e.target).addClass('off');
                }

            },
            onClickGstatTag: function(e){
                var tagName = '/'+$(e.currentTarget).data("gstat");

                //_gstat.audience('','', tagName);
                appConfig.sendTrackDatabase(tagName);
            },




        });

        return layoutView;
    }
)
