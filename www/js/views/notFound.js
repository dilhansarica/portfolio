define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'jscrollpane',
        'text!../../templates/page404.tmpl'
    ], function($, _, Backbone, appConfig, jscrollpane, tmpl) {

        'use strict';

        var NotFoundView = Backbone.View.extend({
            events: {

            },

            id: "notFound",

            template : _.template(tmpl),

            initialize: function(){
                console.log("404 page");
            },

            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.$el.fadeIn();

                appConfig.pageViewGstatTag('/~.*404.*');

                return this;
            },

            hide :  function(){
                this.$el.hide();
            }

        });

        return NotFoundView;
    }
)
