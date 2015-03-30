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
                this.$el.fadeIn(300, this._onshow);
                return this;
            },
            _onshow : function(){
                var w = $("#hello ul li:first-child span").width();
                $("#hello ul li:first-child").width(w+20);
                $("#hello ul li:first-child").addClass("active");

                var interval = setInterval(function(){
                    var length = $("#hello ul li").length;
                    var $el = $("#hello ul li.active");

                    $("#hello ul li.active").width(20);
                    $("#hello ul li.active").removeClass("active");

                    if($el.index() == (length - 1)){
                        var w = $("#hello ul li:first-child span").width();
                        $("#hello ul li:first-child").width(w+20);
                        $("#hello ul li:first-child").addClass("active");
                    }else{
                        var w = $el.next().find("span").width();
                        $el.next().width(w+20);
                        $el.next().addClass("active");
                    }
                }, 2000);

            },
            hide :  function(){
                this.$el.hide();
            }
        });

        return homeView;
    }
)
