define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'jqueryRotate',
        'text!../../templates/questions.tmpl'
    ], function($, _, Backbone, appConfig, jRotate, tmpl) {

        'use strict';

        var questionsView = Backbone.View.extend({
            events: {

            },
            id: "questions",
            template : _.template(tmpl),
            initialize: function(){
                console.log("questions");
            },
            render : function(extrait){
                var self = this;
                $(".experience-content").append(this.$el);
                this.$el.html(this.template(_.where(appConfig.jsonData["extraits"].extraits,{ name : extrait })[0]));
                this.$el.hide();
                if(Modernizr.csstransforms3d && Modernizr.csstransforms) {
                    self.rotateCircleRight();
                }
                return this;
            },
            showQuestion :  function(){
                $("#questions").fadeIn();
                appConfig.pageViewGstatTag('/reponse');
            },
            hide :  function(){
                this.$el.hide();
            },
            rotateCircleRight : function(){

                var self = this;
                var time = 5 * 1000;
                var $circle = $(".wrapper-spinner .bg-right span");
                $(".wrapper-spinner .bg-left span").rotate(-135);

                $circle.rotate({
                    angle:-140,
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
                var $circle = $(".wrapper-spinner .bg-left span");

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

        return questionsView;
    }
)
