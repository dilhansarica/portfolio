define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!../../templates/layer.tmpl'
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        var layerView = Backbone.View.extend({
            events: {

            },
            id: "layer",
            template : _.template(tmpl),
            initialize: function(){
                console.log("layer");
            },
            render : function(extrait){
                $(".experience-content").append(this.$el);
                this.$el.html(this.template(_.where(appConfig.jsonData["extraits"].extraits,{ name : extrait })[0]));
                this.$el.hide();
                $(".step").hide();
                $(".step-0").show();
                this.$el.fadeIn();

                appConfig.pageViewGstatTag('/decompte');

                return this;
            },
            _hide :  function(){
                var self = this;
                $("#layer").fadeOut(function(){
                    //$(".step").hide();
                    $(this).remove();
                });
            },
            step3 :  function(){
                $(".step").hide();
                $(".step-3").fadeIn();
                $(".step-3").find('.number').addClass('show');
            },
            step2 :  function(){
                $(".step").hide();
                $(".step-2").fadeIn();
                $(".step-2").find('.number').addClass('show');
            },
            step1 :  function(){
                $(".step").hide();
                $(".step-1").fadeIn();
                $(".step-1").find('.number').addClass('show');
            }
        });

        return layerView;
    }
)
