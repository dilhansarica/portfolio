define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryui',
        'app-config',
        'text!../../templates/connect-lost.tmpl'
    ], function($, _, Backbone, jUi, appConfig, tmpl) {

        'use strict';

        var connectLostView = Backbone.View.extend({
            events: {

            },
            id: "connect_lost",

            template : _.template(tmpl),
            initialize: function(){
                console.log("connect_lost");
            },
            render : function(){
                $(".experience-content").append(this.$el);
                this.$el.html(this.template());

                this.$el.hide();
                this.$el.fadeIn();

                appConfig.pageViewGstatTag('/erreur-video');

                return this;
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return connectLostView;
    }
)
