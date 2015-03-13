define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'jscrollpane',
        'text!../../templates/participation.tmpl'
    ], function($, _, Backbone, appConfig, jscrollpane, tmpl) {

        'use strict';

        var participationView = Backbone.View.extend({
            events: {
                'submit #participation_form': 'sendParticipationForm'
            },

            id : "participation",

            template : _.template(tmpl),

            initialize: function(){
                console.log("participation");
            },

            render : function(answer, extrait){
                $(".experience-content").append(this.$el);
                this.$el.hide();
                this.$el.html(this.template());
                console.log(extrait)
                this.$el.find("#form-answer").attr("value", answer);
                this.$el.find("#form-movie").attr("value", extrait);
                this.$el.fadeIn();
                this.captcha = grecaptcha.render('captcha_here', {
                    'sitekey' : '6LdibQETAAAAAAf7iki1YUlCUdLpqgSBywibfKtc',
                    'theme' : 'dark'
                });
                this.dateSelector();

                var h = $("#main").height() - 150;
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

                appConfig.pageViewGstatTag('/inscription');

                return this;
            },

            hide :  function(){
                this.$el.hide();
            },

            dateSelector: function(){
                var $selectDate = $('select#birthDate'),
                    $selectMonth = $('select#birthMonth'),
                    $selectYear = $('select#birthYear'),
                    startYear = new Date().getFullYear() - 100,
                    $optionsDate = '<option value="00" selected="selected">Jour</option>',
                    $optionsMonth = '<option value="00" selected="selected">Mois</option>',
                    $optionsYear = '<option value="0000" selected="selected">Année</option>',
                    months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];


                    for(var i = 1; i<32; i++){
                        var newDate = i;
                        newDate = ("0" + newDate).slice(-2);
                        $optionsDate += '<option value="'+newDate+'">'+newDate+'</option>';
                    }

                    for(var i = 1; i<=12; i++){
                        var newMonth = i;
                        newMonth = ("0" + newMonth).slice(-2);
                        $optionsMonth += '<option value="'+newMonth+'">'+months[i-1]+'</option>';
                    }

                    for(var i = new Date().getFullYear(); i > startYear; i--){
                        $optionsYear += '<option value="'+i+'">'+i+'</option>';
                    }

                    $selectDate.html( $optionsDate );
                    $selectMonth.html( $optionsMonth );
                    $selectYear.html( $optionsYear );

            },

             sendParticipationForm: function(e){

                e.preventDefault();

                var emailRegex      = /^[a-zA-Z]{1}[a-zA-Z0-9_\-\.]*@[a-zA-Z0-9_\-\.]{2,}\.[a-zA-Z]{2,3}$/;
                var phoneRegex      = /^\d{10}$/;
                var regNumbers = /^\d+$/;
                var errorCode = '';

                var $form = $(e.target);
                $form.find('.msg-error').removeClass('cool').hide();
                $form.find('.field').removeClass('error');

                var input = {
                    firstname       : $form.find("input[name='firstname']").val(),
                    lastname        : $form.find("input[name='lastname']").val(),
                    email           : $form.find("input[name='email']").val(),
                    phone           : $form.find("input[name='phone']").val(),
                    condition       : 0
                }
                var birthDate   = $form.find("select[name='birthDate']").val(),
                    birthMonth  = $form.find("select[name='birthMonth']").val(),
                    birthYear   = $form.find("select[name='birthYear']").val(),
                    condition   = $form.find('#condition:checked'),
                    emailing   = $form.find('#emailing:checked');

                $form.find('.require').each(function(index, item){
                    if( $(item).val() == "" || !$(item).val() ){
                        errorCode = (!errorCode)? 'require' : errorCode;
                    }
                });

                //check email
                if(!emailRegex.test(input.email)){
                    errorCode = (!errorCode)? 'email' : errorCode;
                }

                //check birthday
                if(birthDate == "00" || birthMonth == "00" || birthYear == "0000"){
                    errorCode = (!errorCode)? 'birthday' : errorCode;
                }else{
                    input.birthday = birthYear+ "-" +birthMonth+ "-" +birthDate;
                }

                //checkPhone
                if(input.phone){
                    if(!phoneRegex.test(input.phone)){
                        $form.find("input[name='phone']").parent('.field').addClass('error');
                        errorCode = (!errorCode)? 'phone' : errorCode;
                    }
                }
                //check condition
                /*if(condition.length > 0){
                    input.condition = 1;
                }
                else{
                    errorCode = (!errorCode)? 'condition' : errorCode;
                }*/
                //check emailing
                if(emailing.length > 0){
                    input.emailing = 1;
                }

                if( grecaptcha.getResponse(this.captcha).length < 1){
                    errorCode = (!errorCode)? 'captcha' : errorCode;
                    $(".captcha > div > div > div").css("border", "1px solid red");
                }else{
                    $(".captcha > div > div > div").css("border", "0");
                }

                //Action Valid
                if(errorCode){
                    $form.addClass('smallPadding');
                    this.showFormError($form, errorCode);
                }
                else{
                    document.cookie="email="+input.email+"; expires=Thu, 18 Dec 2015 12:00:00 UTC";
                    input.answer   = $form.find("input[name='answer']").val();
                    input.film   = $form.find("input[name='film']").val();
                    document.cookie="extrait="+input.film+"; expires=Thu, 18 Dec 2015 12:00:00 UTC";

                    this.sendUsersData(input, $form);
                }
            },

            showFormError: function($form, errorCode){
                switch (errorCode) {
                    case 'captcha':
                        $form.find('.msg-error').text('Captcha obligatoire').show();
                        break;
                    case 'require':
                        $form.find('.msg-error').html('Certains champs du formulaire sont incomplets ou manquants. <br/> Vérifiez bien, ce serait dommage de perdre le fil maintenant. ').show();
                        $form.find('input.require').parent('.field').addClass('error');
                        break;
                    case 'email':
                        $form.find('.msg-error').html('Certains champs du formulaire sont incomplets ou manquants. <br/> Vérifiez bien, ce serait dommage de perdre le fil maintenant. ').show();
                        $form.find("input[name='email']").parent('.field').addClass('error');
                        break;
                    case 'birthday':
                        $form.find('.msg-error').html('Certains champs du formulaire sont incomplets ou manquants. <br/> Vérifiez bien, ce serait dommage de perdre le fil maintenant. ').show();
                        $form.find('.field.birthday').addClass('error');
                        break;
                    case 'condition':
                        $form.find('.msg-error').html('Certains champs du formulaire sont incomplets ou manquants. <br/> Vérifiez bien, ce serait dommage de perdre le fil maintenant. ').show();
                        $form.find('#condition').parent('.field').addClass('error');
                        break;
                    case 'msg-sent':
                        $('#participation_form')[0].reset();
                        grecaptcha.reset();
                        $('.participation-content').find('.mention-footer').fadeOut(500, function(){ $(this).remove(); });
                        $form.fadeOut(500, function(){ $(this).remove(); })
                        $('.participation-content').find('p.title').fadeOut(500, function(){ $(this).remove(); })

                        setTimeout(function(){
                           $('.participation-content').find('p.msg-sent').fadeIn(800);
                        }, 600);

                        setTimeout(function(){
                            window.location.hash = 'divertissement';
                        }, 4000);

                        break;
                }
            },

            sendUsersData: function(input, $form){
                input.request_method = "insert";
                var inputSerialize = decodeURIComponent($.param(input));
                var self = this;

                $.ajax({
                    type: "POST",
                    url: "/services/submit.php",
                    data: input,
                    success: function(response) {
                        var serverReponse = JSON.parse(response);

                        if(serverReponse.code === 200){
                            self.showFormError($form, 'msg-sent');
                        }
                        else if(serverReponse.code === 400){
                            self.showFormError($form, 'require')
                        }
                        else if(serverReponse.code === 403){
                            $form.find('.msg-error').html("Vous ne pouvez pas rejouer encore…<br/>Désolé, vous avez le droit à une inscription par jour et par e-mail.").show();
                            $form.find("input[name='email']").parent('.field').addClass('error');
                            $('#participation_form')[0].reset();
                            grecaptcha.reset();
                            $form.addClass('smallPadding');
                        }
                        else if(serverReponse.code === 500){
                             $form.find('.msg-error').html(serverReponse.response).show();
                             $form.addClass('smallPadding');
                        }
                        else{
                            $form.find('.msg-error').html('Erreur inconnue').show();
                            $form.addClass('smallPadding');
                        }
                    }
                })

            }



        });

        return participationView;
    }
)
