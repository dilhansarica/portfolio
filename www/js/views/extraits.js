define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!../../templates/extraits.tmpl',
        'text!../../templates/extraits-item.tmpl'
    ], function($, _, Backbone, appConfig, tmpl, tmplitem) {

        'use strict';

        var extraitsView = Backbone.View.extend({
            events: {

            },
            id: "extraits",
            template : _.template(tmpl),
            initialize: function(){

            },
            render : function(){
                var self = this;
                $(".experience-content").append(this.$el);
                this.$el.html(this.template());
                _.each(appConfig.jsonData["extraits"].extraits, function(extrait, id){
                    self.$el.find("ul.films").append(_.template(tmplitem, extrait));
                });
                this.$el.fadeIn(300);

                appConfig.pageViewGstatTag('/choix-extrait');

                return this;
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return extraitsView;
    }
)
