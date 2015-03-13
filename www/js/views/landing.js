 define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'views/dotations',
        'text!../../templates/landing.tmpl'
    ], function($, _, Backbone, appConfig, dotationsView, tmpl) {

        'use strict';

        var landingView = Backbone.View.extend({
            events: {
                "click .gifts .left" : "showDotations",
                "click a.dotations" : "showDotations",
                "click a.close" : "close"
            },
            id: "landing",
            template : _.template(tmpl),
            initialize: function(){
                console.log("landing");
                this.dotations = new dotationsView();
            },
            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn(300);

                appConfig.pageViewGstatTag('/accueil');
                $('.app_footer').find('li.house').show();
                $('.app_footer').find('li.marceau').hide();
                $('.app_footer').find('li.tortues').hide();
                return this;
            },
            showDotations :  function(event){
                event.preventDefault();
                this.dotations.render();
                $("#landing .landing-content").hide();
            },
            close :  function(event){
                event.preventDefault();
                this.dotations.hide();
                $("#landing .landing-content").fadeIn();
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return landingView;
    }
)
