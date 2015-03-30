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
        var files = [];
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


        });
    }
);