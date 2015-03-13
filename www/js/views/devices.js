define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'modernirz',
        'text!../../templates/devices.tmpl'
    ], function($, _, Backbone, appConfig, Modern, tmpl) {

        'use strict';

        var devicesView = Backbone.View.extend({
            events: {

            },
            id: "devices",
            template : _.template(tmpl),
            initialize: function(){
                console.log("devices");
            },
            render : function(){
                var self = this;
                $(".experience-content").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                $(".step").hide();
                if(Modernizr.csstransforms3d && Modernizr.csstransforms) {
                    self.rotateCircleRight();
                    $(".arrow").show();
                }

                //alert( $('html').attr('class') );

                return this;
            },
            show :  function(device){
                $(".step").hide();
                $(".step-"+device+"").show();
                $("#devices").fadeIn();
            },
            hide :  function(){
                $("#devices").hide();
            },
            rotateCircleRight : function(){

                var self = this;
                var time = 5 * 1000;
                var $circle = $(".wrapper-spinner-devices .bg-right span");
                $(".wrapper-spinner-devices .bg-left span").rotate(-136);

                $circle.rotate({
                    angle:-135,
                    animateTo:45,
                    callback :  function(){
                        self.rotateCircleLeft();
                    },
                    easing: function (x,t,b,c,d){
                    // t: current time, b: begInnIng value, c: change In value, d: duration
                    return c*(t/d)+b;
                  },
                  duration:time,
                });
            },
            rotateCircleLeft : function(time){

                var self = this;
                var time = 5 * 1000;
                var $circle = $(".wrapper-spinner-devices .bg-left span");

                $circle.rotate({
                    angle:-135,
                    animateTo:45,
                    callback :  function(){
                        self.rotateCircleRight();
                    },
                    easing: function (x,t,b,c,d){
                    // t: current time, b: begInnIng value, c: change In value, d: duration
                    return c*(t/d)+b;
                  },
                  duration:time,
                });
            }
        });

        return devicesView;
    }
)
