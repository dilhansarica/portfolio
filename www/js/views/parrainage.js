define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!../../templates/parrainage.tmpl'
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        var parrainageView = Backbone.View.extend({
            events: {
                'click #parrainage_form .valid': 'sendParrainageForm'
            },
            id: "parrainage",

            template : _.template(tmpl),

            initialize: function(){
                console.log("parrainage");
            },

            render : function(){
                $("#divertissement").append(this.$el);
                this.$el.html(this.template());
                this.$el.hide();
                this.$el.fadeIn();

                var email = appConfig.getCookie("email");
                var extrait = appConfig.getCookie("extrait");

                console.log(email, extrait);

                if(!email || !extrait){
                    $('#parrainage_form .msg-error').text('Vous devez participer pour pouvoir parrainer vos amis.').show();
                    $('#parrainage_form .valid.button').remove();
                }
                this.$el.find("#usermail").attr("value", email);
                this.$el.find("#extraitparrain").attr("value", extrait);

                var h = $("#main").height() - 200;
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
                });

                appConfig.pageViewGstatTag('/parrainez-vos-amis');

                return this;
            },
            show :  function(){
                this.$el.fadeIn();
            },
            hide :  function(){
                this.$el.hide();
            },
            sendParrainageForm: function(e){
                e.preventDefault();

                var valid = true;
                var emailRegex      = /^[a-zA-Z]{1}[a-zA-Z0-9_\-\.]*@[a-zA-Z0-9_\-\.]{2,}\.[a-zA-Z]{2,3}$/;

                var $form = $('#parrainage_form');
                $form.removeClass('error').find('.field').removeClass('error');

                var input = {
                    email1        : $form.find("input.email1"),
                    email2        : $form.find("input.email2"),
                    email3        : $form.find("input.email3"),
                    email4        : $form.find("input.email4"),
                    email5        : $form.find("input.email5")
                }

                var totalEmail = 0;
                $.each(input, function(index, $item){

                    if($item.val().length > 0){
                        totalEmail++;

                        if(!emailRegex.test( $item.val() ) ){
                            valid = false;

                            $item.parent('.field').addClass('error');
                            $form.addClass('error');
                        }
                        else{
                            $item.parent('.field').removeClass('error');
                        }
                    }

                });
                console.log(totalEmail);
                if( totalEmail < 1){
                    $form.addClass('error').find('.field').not('.submit').addClass('error');
                }

                if(totalEmail > 0 && valid){
                    $form.removeClass('error');
                    var data = {
                        email1:     input.email1.val(),
                        email2:     input.email2.val(),
                        email3:     input.email3.val(),
                        email4:     input.email4.val(),
                        email5:     input.email5.val(),
                        email:      $form.find("input[name='usermail']").val(),
                        film:       $form.find("input[name='film']").val()
                    }
                    this.sendUsersData($form, data);
                }
            },

            sendUsersData: function($form, data){
                console.log(data);

                var inputSerialize = decodeURIComponent($.param(data));

                $.ajax({
                    type: "POST",
                    url: "/services/parrainage.php",
                    data: inputSerialize,
                    success: function(response) {
                        var serverReponse = JSON.parse(response);

                        if(serverReponse.code === 200){
                            $form.find('.msg-error').text('E-mail envoyé - merci pour votre participation !').addClass('cool').show();
                            $('#parrainage_form')[0].reset();
                            $form.find('.valid.button').remove();
                            document.cookie="email= ; expires=Thu, 18 Dec 2015 12:00:00 UTC";
                            document.cookie="extrait= ; expires=Thu, 18 Dec 2015 12:00:00 UTC";
                            $form.find('input').fadeOut();
                            $form.find('.form-header-title').fadeOut();
                        }
                        else if(serverReponse.code === 400){

                            $.each(serverReponse.response, function(index, item){
                                if(serverReponse.response[index].length > 0){
                                    $form.find('.'+index).parent('.field').addClass('error')
                                    console.log( $form.find('.'+index).parent('.field') );
                                }
                            });

                            $form.find('.msg-error').text('Parrainer, c’est bien. Parrainer en donnant des adresses mails valides, c’est mieux.').show();
                        }
                        else if(serverReponse.code === 403){
                            $form.find('.msg-error').text("Vous avez déjà joué aujourd'hui").show();
                        }
                        else{
                            console.log('Unkwon error');
                            $form.find('.msg-error').text('Error inconnu').show();
                        }
                    }
                });

            }

        });

        return parrainageView;
    }
)
