define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'jscrollpane',
        'text!../../templates/rotation-tablet.tmpl'
    ], function($, _, Backbone, appConfig, jscrollpane, tmpl) {

        'use strict';

        var RotationTabletView = Backbone.View.extend({
            events: {

            },

            id: "rotation-tablet",

            template : _.template(tmpl),

            initialize: function(){
                console.log("rotation Tablet");

                if( appConfig.isMobile.any() ){
                    if(window.innerHeight < window.innerWidth){
                        window.location.hash = "";
                    }
                }
                else{
                    window.location.hash = "";
                }


            },

            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.$el.fadeIn();

                return this;
            },

            hide :  function(){
                this.$el.hide();
            }

        });

        return RotationTabletView;
    }
)
