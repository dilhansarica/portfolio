define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'views/extraits',
        'views/layer',
        'views/video',
        'views/timeline',
        'views/devices',
        'views/questions',
        'views/participation',
        'views/connect-lost',
        'text!../../templates/experience.tmpl'
    ], function($, _, Backbone, appConfig, extraitsView, layerView, videoView, timelineView, devicesView, questionsView, participationView, connectLostView, tmpl) {

        'use strict';

        var experienceView = Backbone.View.extend({
            events: {
                "click #extraits a.button" : "chooseExtrait",
                "click #devices li" : "chooseDevice",
                "click #questions li" : "chooseAnswer",
                "click #questions button" : "validateAnswer"/*,
                "click .center-content-header .social-btns a" : "shareExperience"*/
            },
            id: "experience",
            template : _.template(tmpl),
            initialize: function(){
                console.log("experience");
                this.extraits = new extraitsView();
                this.layer = new layerView();
                this.video = new videoView();
                this.timeline = new timelineView();
                this.devices = new devicesView();
                this.questions = new questionsView();
                this.participation = new participationView();
                this.connectLost = new connectLostView();
            },
            render : function(){
                $("#app_center").append(this.$el);
                this.$el.html(this.template());
                this.extraits.render();

                /*this.video.render("house");
                this.video.play("tv");
                this.timeline.render();*/
                /*
                this.questions.render("tortues");*/
                //this.participation.render("20", "marceau");
                //this.devices.render();
                //this.devices.show("tab")
                this.$el.hide();
                this.$el.fadeIn(1000);

                $('.app_footer').find('li.house').hide();

                return this;
            },
            hide :  function(){
                this.$el.hide();
            },
            chooseExtrait : function(event){
                var self = this;
                this.mobile = 0;
                this.Extrait = $(event.currentTarget).attr("data-extrait");
                this.extraits.remove();
                document.cookie="extrait="+this.Extrait+"; expires=Thu, 18 Dec 2015 12:00:00 UTC";
                //this.questions.render(this.Extrait);


                $(".black-banner").show();
                var ht = $(".black-banner.top").height();
                var hb = $(".black-banner.bottom").height();
                $(".black-banner.top").height(0);
                $(".black-banner.bottom").height(0);
                $(".black-banner").css("opacity",1);
                $(".black-banner.top").animate({height:""+ht+"px"},1000, function(){ $(this).css({ 'height': '' }) });
                $(".black-banner.bottom").animate({height:""+hb+"px"},1000, function(){ $(this).css({ 'height': '' }) });
                this.timeline.render();
                this.video.render(this.Extrait);
                this.devices.render();
                this.questions.render(this.Extrait);
                Backbone.on("tvShowed", function(){
                    self.layer.render(self.Extrait);
                    setTimeout(self.layer.step3, 1000);
                    setTimeout(self.layer.step2, 3000);
                    setTimeout(self.layer.step1, 6000);
                    setTimeout(self.layer._hide, 8000);
                    setTimeout(function(){
                        self.video.play("tv", self.Extrait);
                        $('.app_footer').find('.'+self.Extrait+'').show();
                        setTimeout(function(){
                            $('.app_footer').find('.'+self.Extrait+'').hide();
                        },6000)
                    }, 8000);
                    Backbone.off("tvShowed");
                    $(".videoContainer").css("background","#000")
                })
                Backbone.on("tvEnded", function(){
                    self.devices.show("devices")
                    self.video.play("tv-boucle", self.Extrait, true);
                    Backbone.off("tvEnded");
                })
                Backbone.on("tab-1Ended", function(){
                    if(self.mobile) self.devices.show("mobile-tab")
                    else self.devices.show("laptop")
                    self.video.play("tab-1-boucle", self.Extrait, true);
                    self.mobile = 1;
                    Backbone.off("tabEnded");
                })
                Backbone.on("tab-2Ended", function(){
                    if(self.mobile) self.devices.show("mobile-tab")
                    else self.devices.show("laptop")
                    self.video.play("tab-2-boucle", self.Extrait, true);
                    self.mobile = 1;
                    Backbone.off("tabEnded");
                })
                Backbone.on("laptop-1Ended", function(){
                    if(self.mobile) self.devices.show("mobile-laptop")
                    else self.devices.show("tab")
                    self.video.play("laptop-1-boucle", self.Extrait, true);
                    self.mobile = 1;
                    Backbone.off("laptopEnded");
                })
                Backbone.on("laptop-2Ended", function(){
                    if(self.mobile) self.devices.show("mobile-laptop")
                    else self.devices.show("tab")
                    self.video.play("laptop-2-boucle", self.Extrait, true);
                    self.mobile = 1;
                    Backbone.off("laptopEnded");
                })
                Backbone.on("mobileEnded", function(){
                    self.questions.showQuestion();
                    Backbone.off("mobileEnded");
                })
            },
            chooseDevice : function(event){
                this.Device = $(event.currentTarget).attr("data-device");
                this.devices.hide();
                this.video.play(this.Device, this.Extrait);
            },
            chooseAnswer : function(event){
                event.preventDefault();
                this.Answer = $(event.currentTarget).attr("data-answer");
                $(".wrapper-answer").removeClass('on');
                $(event.target).parents(".wrapper-answer").addClass('on');
                $("#questions button").show();
            },
            validateAnswer : function(event){
                event.preventDefault();
                this.questions.remove();
                this.timeline.remove();
                this.video.remove();
                $(".black-banner").hide();
                this.participation.render(this.Answer, this.Extrait);
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
                }
                else if( $(e.target).closest('a').is('.tw') ){
                     target = "tw";
                }
                else if( $(e.target).closest('a').is('.gPlus') ){
                     target = "gplus";
                }

                if(target === "fb"){
                    appConfig.sendTrackDatabase('/btn_fb');

                    var fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='+url;
                    var fbSharerWindow = window.open(fbShareUrl,"nom_popup",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);
                }
                else if(target === "tw"){
                    appConfig.sendTrackDatabase('/btn_twitter');

                    var text1 = "Et si vous profitiez de la VOD d'Orange sur tous vos écrans et en toute fluidité ?";
                    var urlRoot = "http://www.neperdezpaslefil.orange.fr";
                    var hashtags ="NePerdezPasLeFil";

                    var dataTW = 'https://twitter.com/share?&text='+text1+'%20%23'+hashtags+'&url='+urlRoot;

                    var twSharerWindow = window.open(dataTW, "popup_twitter",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);

                }
                else if(target === "gplus"){
                    appConfig.sendTrackDatabase('/btn_gplus');

                    var gplusShareUrl = 'https://plus.google.com/share?url='+url+'';
                    var gplusSharerWindow = window.open(gplusShareUrl,"nom_popup",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);
                }

            }

        });

        return experienceView;
    }
)
