define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!../../templates/dotations.tmpl'
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        var dotationsView = Backbone.View.extend({
            events: {

            },
            id: "dotations",
            template : _.template(tmpl),
            initialize: function(){
                console.log("dotations");
            },
            render : function(){
                $("#landing").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn();

                return this;
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return dotationsView;
    }
)
