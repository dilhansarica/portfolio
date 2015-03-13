define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'jscrollpane',
        'text!../../templates/game-rules.tmpl'
    ], function($, _, Backbone, appConfig, jscrollpane, tmpl) {

        'use strict';

        var GameRulesView = Backbone.View.extend({
            events: {
                "click .close-popin" : "goBack"
            },

            id: "gameRules",

            template : _.template(tmpl),

            initialize: function(){
                console.log("Réglement");
            },

            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn(300);

                var h = $("#main").height() - 200;

                if(h > 630){
                    h=630;
                }
                this.$el.find('.game-rules-content').css({
                    height: h+60,
                    marginTop: -1* (h+60)/2
                });
                this.$el.find('.scroll-pane').height(h);

                var container = this.$el.find('.scroll-pane').jScrollPane({
                    autoReinitialise : true
                });

                var self = this;
                var jsp = container.data('jsp');

                $(window).on('resize', function(){
                    var h = $("#main").height() - 150;
                    if(h > 630){
                        h=630;
                    }
                    self.$el.find('.game-rules-content').css({
                        height: h+60,
                        marginTop: -1* (h+60)/2
                    });
                    self.$el.find('.scroll-pane').height(h);
                    jsp.reinitialise();
                });

                appConfig.pageViewGstatTag('/reglement-jeu');

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

        return GameRulesView;
    }
)
