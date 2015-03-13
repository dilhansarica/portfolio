define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!../../templates/vod.tmpl'
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        var vodView = Backbone.View.extend({
            events: {

            },
            id: "vod",
            template : _.template(tmpl),
            initialize: function(){
                console.log("vod");
            },
            render : function(){
                $("#divertissement").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn(300);

                return this;
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return vodView;
    }
)
