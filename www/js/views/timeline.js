define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryui',
        'app-config',
        'text!../../templates/timeline.tmpl'
    ], function($, _, Backbone, jUi, appConfig, tmpl) {

        'use strict';

        var timelineView = Backbone.View.extend({
            events: {

            },
            id: "timeline",
            template : _.template(tmpl),
            initialize: function(){
                console.log("timeline");
            },
            render : function(){
                $(".experience-content").append(this.$el);
                this.$el.html(this.template());
                this.$el.find('.videoProgressbar').progressbar({value: 0});
                this.$el.hide();
                this.$el.fadeIn();


                return this;
            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return timelineView;
    }
)
