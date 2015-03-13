define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'views/parrainage',
        'views/vod',
        'text!../../templates/divertissement.tmpl'
    ], function($, _, Backbone, appConfig, parrainageView, vodView, tmpl) {

        'use strict';

        var divertissementView = Backbone.View.extend({
            events: {
                "click a.parrain" : "showParrainage",
                "click a.vod" : "showVOD",
                "click a.close" : "close",
                "click a.return" : "close"/*,
                "click .social-btns a" : "shareExperience"*/
            },
            id: "divertissement",
            template : _.template(tmpl),
            initialize: function(){

                this.parrainage = new parrainageView();
                this.vod = new vodView();

            },
            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn(300);

                var h = $("#main").height() - 140;
                var self = this;

                appConfig.pageViewGstatTag('/reinventons-divertissement');

                $('.app_footer').find('li.house').hide();
                $('.app_footer').find('li.marceau').hide();
                $('.app_footer').find('li.tortues').hide();

                return this;
            },
            showParrainage :  function(event){
                event.preventDefault();
                var self = this;
                $("#divertissement .divertissement-content").fadeOut(300, function(){
                    self.parrainage.render();
                });
            },
            showVOD :  function(event){
                event.preventDefault();
                var self = this;
                $("#divertissement .divertissement-content").fadeOut(300, function(){
                    self.vod.render();
                });
            },
            close :  function(event){
                event.preventDefault();
                this.parrainage.hide();
                this.vod.hide();
                $("#divertissement .divertissement-content").fadeIn();
            },
            hide :  function(){
                this.$el.hide();
            },
            shareExperience: function(e){
                e.preventDefault();

                var url = "http://www.neperdezpaslefil.orange.fr";
                var width = 600;
                var height = 300;
                var left = (screen.width/2)-(width/2);
                var top = (screen.height/2)-(height/2);

                var target = '';

                if( $(e.target).closest('a').is('.fb') ){
                    target = "fb";
                    appConfig.sendTrackDatabase('/reinventons-divertissement/btn_fb');

                }
                else if( $(e.target).closest('a').is('.tw') ){
                     target = "tw";
                     appConfig.sendTrackDatabase('/reinventons-divertissement/btn_twitter');
                }
                else if( $(e.target).closest('a').is('.gPlus') ){
                     target = "gplus";
                     appConfig.sendTrackDatabase('/reinventons-divertissement/btn_gplus');
                }

                if(target === "fb"){
                    var name = "Relèverez-vous le défi ?";
                    var desc = "Essayez de suivre cet extrait de film sans être interrompu par votre quotidien !"
                    var img = "http://www.neperdezpaslefil.orange.fr/img/common/facebook_exp.jpg";
                    FB.ui({
                        method: 'feed',
                        name: name,
                        link: url,
                        picture: img,
                        description: desc

                    }, function(response) {
                        if(response && response.post_id){}
                        else{}
                    });

                }
                else if(target === "tw"){
                    var text1 = "Vous aussi, tentez de regarder jusqu'au bout cet extrait de film sans vous laisser perturber...";
                    var urlRoot = "http://www.neperdezpaslefil.orange.fr";
                    var hashtags ="NePerdezPasLeFil";

                    var dataTW = 'https://twitter.com/share?&text='+text1+'%20%23'+hashtags+'&url='+urlRoot;

                    var twSharerWindow = window.open(dataTW, "popup_twitter",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);

                }
                else if(target === "gplus"){
                    var gplusShareUrl = 'https://plus.google.com/share?url='+url+'';
                    var gplusSharerWindow = window.open(gplusShareUrl,"nom_popup",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);
                }

            }
        });

        return divertissementView;
    }
)
