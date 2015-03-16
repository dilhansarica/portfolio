define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'router/router',
        'preloader'
    ], function($, _, Backbone, appConfig, Router, preload, tmpl) {

        'use strict';

        // deal with envConfig

        var envConfig = _.extend({}, window.ENV_CONFIG);
        window.ENV_CONFIG = undefined;

        // declare polyfills, _.mixin here
        _.mixin({
            constrain: function(value, min, max) {
                if (value > max) { value = max; }
                if (value < min) { value = min; }
                return value;
            }
        });

        function callJson(id){
            var url = "./json/" + id+".json";
            return $.getJSON(url, function(data){
                appConfig.jsonData[id] = data;
            });
        }

        var jsonFiles = [
            "extraits"
        ]

        var jsonCalls = []

        var myLoader = html5Preloader();
        var files = ['img/extraits/poster-house-of-cards.jpg', 'img/extraits/poster-ninja-turtles.jpg', 'img/extraits/poster-tu-veux-ou-tu-veux-pas.jpg'];
        $.each(files, function(id, file){
            console.log(file)
            myLoader.addFiles(file);
        });
        myLoader.on('finish', function(){
            console.log("all assets loaded")
        });

        $(document).ready(function() {
            if(jsonFiles){

                for (var i=0; i < jsonFiles.length; i++) {
                    jsonCalls.push(callJson(jsonFiles[i]));
                }

                $.when.apply($, jsonCalls).done(function(){
                    /*for (var i=0; i < jsonFiles.length; i++) {
                        console.log("Chargement du json '"+jsonFiles[i]+"' terminé")
                        console.log(appConfig.jsonData[jsonFiles[i]])
                    }*/
                    window.router = new Router();
                    Backbone.history.start();
                });

            }else{
                window.router = new Router();
                Backbone.history.start();
            }

            console.log(appConfig);

            //JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
            var imageAddr = "/img/test-quality-image.jpg";
            var downloadSize = 1251151; //bytes


            window.setTimeout(MeasureConnectionSpeed, 1);

            function MeasureConnectionSpeed() {
                var startTime, endTime;
                var download = new Image();
                download.onload = function () {
                    endTime = (new Date()).getTime();
                    showResults();
                }

                download.onerror = function (err, msg) {
                    console.log("Invalid image, or error downloading");
                }

                startTime = (new Date()).getTime();
                var cacheBuster = "?nnn=" + startTime;
                download.src = imageAddr + cacheBuster;

                function showResults() {
                    var duration = (endTime - startTime) / 1000;
                    var bitsLoaded = downloadSize * 8;
                    var speedBps = (bitsLoaded / duration);
                    var speedKbps = (speedBps / 1024);
                    var speedMbps = (speedKbps / 1024);
                    console.log(speedMbps, duration);
                    if(speedMbps > 10){
                        appConfig.videoQuality = "hd";
                    }else{
                        appConfig.videoQuality = "ld";
                    }
                    if( appConfig.isMobile.any() ){
                        appConfig.videoQuality = "ld";
                    }
                }
            }
        });
    }
);