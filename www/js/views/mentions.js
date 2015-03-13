define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'jscrollpane',
        'text!../../templates/mentions.tmpl'
    ], function($, _, Backbone, appConfig, jscrollpane, tmpl) {

        'use strict';

        var mentionsView = Backbone.View.extend({
            events: {
                "click .close-popin" : "goBack"
            },

            id: "mentions",

            template : _.template(tmpl),

            initialize: function(){
                console.log("Mentions");
            },

            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn(300);

                /*var h = $("#main").height() - 200;
                this.$el.find('.scroll-pane').height(h);
                var container = this.$el.find('.scroll-pane').jScrollPane({
                    autoReinitialise : true
                });

                var self = this;
                var jsp = container.data('jsp');

                $(window).on('resize', function(){
                    var h = $("#main").height() - 150;
                    self.$el.find('.scroll-pane').height(h);
                    jsp.reinitialise();
                });*/

                return this;
            },

            hide :  function(){
                this.$el.hide();
            },
            goBack : function(e){
                e.preventDefault();
                this.$el.fadeOut(300, function(){
                    window.history.back();
                });

            }
        });

        return mentionsView;
    }
)
