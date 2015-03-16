 define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!../../templates/home.tmpl'
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        var homeView = Backbone.View.extend({
            events: {

            },
            id: "home",
            template : _.template(tmpl),
            initialize: function(){
                console.log("home");
            },
            render : function(){
                $("#main").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn(300);
                return this;
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return homeView;
    }
)
