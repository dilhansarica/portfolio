define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'fit'
    ], function($, _, Backbone, appConfig, Fit) {

        'use strict';

        var layoutView = Backbone.View.extend({
            events: {
            },
            el: "body",
            initialize: function(){
                console.log("layout");
                // IE 8 and under redirect
                var self =  this;
            }
        });

        return layoutView;
    }
)
