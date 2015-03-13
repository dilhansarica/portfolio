define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'fit',
        'text!../../templates/video.tmpl',
        'text!../../templates/video-item.tmpl'
    ], function($, _, Backbone, appConfig, Fit, tmpl, itemtmpl) {

        'use strict';

        var videoView = Backbone.View.extend({
            events: {

            },
            id: "video",
            template : _.template(tmpl),
            initialize: function(){
                console.log("video");
            },
            render : function(extrait){
                $(".experience-content").append(this.$el);
                this.$el.html(this.template());

                var data = _.where(appConfig.jsonData["extraits"].extraits,{ name : extrait })[0];
                data.video = "tv";
                data.definition = appConfig.videoQuality;
                //alert(data.definition)

                    this.$el.find(".videoWrapper").append(_.template(itemtmpl, data));
                    var self = this;
                    this.timecode = 0;
                    this.progress = 0;
                    this.perturbation = 0;
                    //$("video").prop('muted', true);
                    $("video").prop('autoplay', false);
                    //$("video").prop('controls', true);
                    $("video").attr('id', "currentvideo");
                    $("#currentvideo").hide();
                    if( appConfig.isMobile.any() ){
                        $("#currentvideo").addClass("translate");
                        $("#currentvideo").show();
                    }
                    $(".wrapper-loader").show();
                    var $current = document.getElementById('currentvideo');
                    $("#currentvideo").ready(function(){

                        if( appConfig.isMobile.any() ){

                            var tvLaunch = 0;

                            $("#currentvideo").get(0).play();
                            $("#currentvideo").get(0).pause();


                            $("#currentvideo").on('canplaythrough', function() {
                                if($("#currentvideo").get(0).readyState > 1){
                                    $("video").removeClass("translate");
                                    self.fitVideo();
                                    //$("#currentvideo").get(0).play();
                                    //if(!tvLaunch) Backbone.trigger("tvShowed");
                                    if(!tvLaunch) self.play("tv", extrait);
                                    tvLaunch = 1;
                                    $(".wrapper-loader").hide();
                                }
                            });

                            $("#currentvideo").on('load', function() {
                                if($("#currentvideo").get(0).readyState > 1){
                                    $("video").removeClass("translate");
                                    self.fitVideo();
                                    //$("#currentvideo").get(0).play();
                                    //if(!tvLaunch) Backbone.trigger("tvShowed");
                                    if(!tvLaunch) self.play("tv", extrait);
                                    tvLaunch = 1;
                                    $(".wrapper-loader").hide();
                                }
                            });


                        }else{
                            $("#currentvideo").on('canplaythrough', function() {
                                $("#currentvideo").fadeIn(function(){
                                    Backbone.trigger("tvShowed");
                                });
                                self.fitVideo();
                                $("#currentvideo").off('canplaythrough');
                                $(".wrapper-loader").hide();
                            });
                        }

                        /*$("#currentvideo").on('pause', function() {
                            console.log("pause");
                            $(".wrapper-loader").show();
                        });

                        $("#currentvideo").on('playing', function() {
                            $(".wrapper-loader").hide();
                        });*/

                        $("#currentvideo").on('end', function() {
                                $("#currentvideo").off('canplay');
                                $("#currentvideo").off('canplaythrough');
                                $("#currentvideo").off('play');
                                $("#currentvideo").off('load');
                                $("#currentvideo").off('pause');
                                $("#currentvideo").off('playing');
                        });

                        if(!$("body").hasClass("ie") && !appConfig.isMobile.any()){
                            $current.addEventListener('loadedmetadata', function() {
                                this.currentTime = self.timecode;
                            });
                            $current.addEventListener('timeupdate', function() {
                                self.timecode = this.currentTime;
                                self.timeUpdateTimeline(self.timecode);
                            });
                            $current.addEventListener('playing', function() {
                                self.videoLength = this.duration;
                            });
                        }else{
                            self.timeUpdateTimelineforIE();
                        }



                    })


                this.$el.hide();
                this.$el.fadeIn();

                return this;
            },
            hide :  function(){
                this.$el.hide();
            },
            timeUpdateTimeline: function(currentVideoTime){
                //var ct = parseInt(currentVideoTime, 10);

                //if (this.lastVideoTime != ct) {



                    //console.log(playedPourcent)

                    if(!this.perturbation){
                        var playedPourcent = (currentVideoTime / this.videoLength) * 100;
                        playedPourcent = (isNaN(playedPourcent))? 0 : playedPourcent;

                        if(this.progress == 0) $('#tv-progress').progressbar({value: playedPourcent});
                        else if(this.progress == 1) $('#device1-progress').progressbar({value: playedPourcent});
                        else if(this.progress == 2) $('#device2-progress').progressbar({value: playedPourcent});
                        else if(this.progress == 3) $('#mobile-progress').progressbar({value: playedPourcent});
                    }

                    //this.lastVideoTime = ct;
               // }
            },
            timeUpdateTimelineforIE: function(){

                        if(this.progress == 0){
                            $('#tv-progress').progressbar({value: 100});
                        }
                        else if(this.progress == 1) $('#device1-progress').progressbar({value: 100});
                        else if(this.progress == 2) $('#device2-progress').progressbar({value: 100});
                        else if(this.progress == 3) $('#mobile-progress').progressbar({value: 100});

            },
            fitVideo: function(){

                    var _domPlayer = document.querySelector( '.videoContainer .videoWrapper' );
                    var _domVideo = document.querySelector('video');

                    var cover = true;
                    fit( _domVideo, _domPlayer, { cover: true } );

            },
            play : function(device, extrait, perturbation){
                var self = this;
                $("#nextvideo").attr('id', "currentvideo");
                if(device == "tv"){
                    $("#currentvideo").get(0).play();
                    $("#timeline .tv-icon").addClass('show');
                    $("#timeline .wrapper-icon.tv .point-icon").hide();

                    $("#currentvideo").on('ended', function() {
                        Backbone.trigger("tvEnded");
                        $("#currentvideo").off('ended');
                        self.timecode = 0;

                    });
                    var progressStat = 1;
                    if( extrait == "marceau") {
                        appConfig.pageViewGstatTag('/extrait-tu-veux-ou-tu-veux-pas/step'+ progressStat);
                    }
                    if( extrait == "house") {
                        appConfig.pageViewGstatTag('/extrait-house-of-cards/step'+ progressStat);
                    }
                    if( extrait == "tortues") {
                        appConfig.pageViewGstatTag('/extrait-ninjas-turtles/step'+ progressStat);
                    }

                }else{
                    var data = _.where(appConfig.jsonData["extraits"].extraits,{ name : extrait })[0];
                    data.video = device;
                    data.definition = appConfig.videoQuality;
                    $(".videoWrapper").append(_.template(itemtmpl, data));
                    $(".videoWrapper video:last").attr('id', "nextvideo");
                    //console.log($(".videoWrapper video:last").attr("id"));
                    $("#nextvideo").hide();
                    $(".wrapper-loader").show();
                    if( appConfig.isMobile.any() ){
                        $("#nextvideo").addClass("translate");
                        $("#nextvideo").show();
                        //$("#currentvideo").remove();
                    }
                    $("#nextvideo").ready(function(){
                        if( $(".ctrl-sound").is('.off') ){
                            $("#nextvideo").prop('muted', true);
                        }
                        else{
                            $("#nextvideo").prop('muted', false);
                        }
                        if( appConfig.isMobile.any() ){

                            $("#nextvideo").get(0).play();
                            setTimeout(function(){
                                $("#nextvideo").get(0).pause();
                            },1);
                            var elem = document.getElementById("currentvideo");
                            elem.parentNode.removeChild(elem);

                            $("#nextvideo").on('canplaythrough', function() {
                                if($("#nextvideo").get(0).readyState > 1){
                                    $(".wrapper-loader").hide();
                                    $("#nextvideo").removeClass("translate");
                                    $("#nextvideo").get(0).play();
                                    self.fitVideo();
                                }
                            });

                            $("#nextvideo").on('load', function() {
                                if($("#nextvideo").get(0).readyState > 1){
                                    $(".wrapper-loader").hide();
                                    $("#nextvideo").removeClass("translate");
                                    $("#nextvideo").get(0).play();
                                    self.fitVideo();
                                }
                            });

                            if(perturbation) $("#nextvideo").prop('loop', true);



                        }else{

                            var playing = 0;

                            $("#nextvideo").on('canplaythrough', function() {
                                $(".wrapper-loader").hide();
                                console.log("canplaythrough")
                                $("#nextvideo").off('canplay');
                                $("#nextvideo").off('canplaythrough');
                                $("#nextvideo").off('play');
                                $("#nextvideo").off('load');
                                $("#nextvideo").show();
                                $("#nextvideo").get(0).play();
                                var elem = document.getElementById("currentvideo");
                                elem.parentNode.removeChild(elem);
                                self.fitVideo();
                                //$("#nextvideo").prop('muted', true);
                                if(perturbation) $("#nextvideo").prop('loop', true);
                                playing = 1;
                            });
                            $("#nextvideo").on('canplay', function() {
                                $(".wrapper-loader").hide();
                                console.log("canplay")
                                $("#nextvideo").off('canplay');
                                $("#nextvideo").off('canplaythrough');
                                $("#nextvideo").off('play');
                                $("#nextvideo").off('load');
                                $("#nextvideo").show();
                                $("#nextvideo").get(0).play();
                                var elem = document.getElementById("currentvideo");
                                elem.parentNode.removeChild(elem);
                                self.fitVideo();
                                //$("#nextvideo").prop('muted', true);
                                if(perturbation) $("#nextvideo").prop('loop', true);
                                playing = 1;
                            });

                            $("#nextvideo").on('play', function() {
                                $(".wrapper-loader").hide();
                                $("#nextvideo").off('canplay');
                                $("#nextvideo").off('canplaythrough');
                                $("#nextvideo").off('play');
                                $("#nextvideo").off('load');
                                $("#nextvideo").show();
                                var elem = document.getElementById("currentvideo");
                                elem.parentNode.removeChild(elem);
                                self.fitVideo();
                                if(perturbation) $("#nextvideo").prop('loop', true);

                            });

                            $("#nextvideo").on('load', function() {
                                if($("#nextvideo").get(0).readyState > 1){
                                    $(".wrapper-loader").hide();
                                    console.log("load")
                                    $("#nextvideo").off('canplay');
                                    $("#nextvideo").off('canplaythrough');
                                    $("#nextvideo").off('play');
                                    $("#nextvideo").off('load');
                                    $("#nextvideo").show();
                                    $("#nextvideo").get(0).play();
                                    var elem = document.getElementById("currentvideo");
                                    elem.parentNode.removeChild(elem);
                                    self.fitVideo();
                                    if(perturbation) $("#nextvideo").prop('loop', true);
                                    playing = 1;
                                }
                            });

                            setTimeout(function(){
                                if(!playing) $("#nextvideo").get(0).play();
                            },1000);
                        }

                        /*$("#nextvideo").on('pause', function() {
                            $(".wrapper-loader").show();
                        });

                        $("#nextvideo").on('playing', function() {
                            $(".wrapper-loader").hide();
                        });*/

                        $("#nextvideo").on('end', function() {
                                $("#nextvideo").off('canplay');
                                $("#nextvideo").off('canplaythrough');
                                $("#nextvideo").off('play');
                                $("#nextvideo").off('load');
                                $("#nextvideo").off('pause');
                                $("#nextvideo").off('playing');
                                $(".wrapper-loader").hide();
                        });

                        if(!perturbation){
                            self.perturbation = 0;
                            var $nextvideo = document.getElementById('nextvideo');
                            self.progress = self.progress + 1;

                            if(!$("body").hasClass("ie") && !appConfig.isMobile.any()){
                                $nextvideo.addEventListener('loadedmetadata', function() {
                                    this.currentTime = self.timecode;
                                });
                                $nextvideo.addEventListener('timeupdate', function() {
                                    self.timecode = this.currentTime;
                                    self.timeUpdateTimeline(self.timecode);
                                });
                                $nextvideo.addEventListener('playing', function() {
                                    self.videoLength = this.duration;
                                });

                            }else{
                                self.timeUpdateTimelineforIE();
                            }


                            if(device.match(/tab/g)){
                                if(self.progress==1){
                                    $("#timeline .device1 .tab-icon").addClass('show');
                                    $("#timeline .device1 .point-icon").hide();
                                }
                                if(self.progress==2){
                                    $("#timeline .device2 .tab-icon").addClass('show');
                                    $("#timeline .device2 .point-icon").hide();
                                }
                            }
                            if(device.match(/laptop/g)){
                                if(self.progress==1){
                                    $("#timeline .device1 .laptop-icon").addClass('show');
                                    $("#timeline .device1 .point-icon").hide();
                                }
                                if(self.progress==2){
                                    $("#timeline .device2 .laptop-icon").addClass('show');
                                    $("#timeline .device2 .point-icon").hide();
                                }
                            }
                            if(device.match(/mobile/g)){
                                $("#timeline .mob .mobile-icon").addClass('show');
                                $("#timeline .mob .point-icon").hide();
                            }
                            $("#nextvideo").on('ended', function() {
                                if(device.match(/tab-1/g)) Backbone.trigger("tab-1Ended");
                                if(device.match(/tab-2/g)) Backbone.trigger("tab-2Ended");
                                if(device.match(/laptop-1/g)) Backbone.trigger("laptop-1Ended");
                                if(device.match(/laptop-2/g)) Backbone.trigger("laptop-2Ended");
                                if(device.match(/mobile/g)) Backbone.trigger("mobileEnded");
                                self.timecode = 0;
                                $("#nextvideo").off('ended');
                            });

                            var progressStat = self.progress + 1;

                            if( extrait == "marceau") {
                                appConfig.pageViewGstatTag('/extrait-tu-veux-ou-tu-veux-pas/step'+ progressStat);
                            }
                            if( extrait == "house") {
                                appConfig.pageViewGstatTag('/extrait-house-of-cards/step'+ progressStat);
                            }
                            if( extrait == "tortues") {
                                appConfig.pageViewGstatTag('/extrait-ninjas-turtles/step'+ progressStat);
                            }

                        }else{
                            self.perturbation = 1;

                        }
                    })
                }



            }
        });

        return videoView;
    }
)