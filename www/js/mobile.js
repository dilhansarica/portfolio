(function($) {
    var APP = APP || {

        init: function(){

            this.events();
        },

        events: function(){
            var $width = $(window).width();
            var $height = $(window).height();

            $('section.page-1').height($height - 48);

            $anim1 = $('.anim1');
            $anim2 = $('.anim2');
            $anim3 = $('.anim3');

            $anim1.delay(200).animate({ marginTop: 0, opacity: 1}, 500, function(){$anim1.addClass('border') });
            $anim2.delay(600).animate({ marginTop: 0, opacity: 1}, 500);
            $anim3.delay(1000).animate({ bottom: 35, opacity: 1}, 500);

            $('.goDown').on('click', function(e){
                e.preventDefault();
                $('html, body').animate({scrollTop: $('section.page-2').offset().top}, 500);
            });

            $('.social-share a').on('click', function(e){
                e.preventDefault();
                APP.shareExperience(e);

            });

            $('#goUP').on('click', function(e){
                e.preventDefault();
                $('html, body').animate({scrollTop: 0}, 500);
            });

            $(window).scroll(function(){
                var $screenHeight = $(window).height();
                if( $(this).scrollTop() ){
                    $('#goUP').fadeIn();
                }
                else{
                    $('#goUP').fadeOut();
                }
            })


            var osMobile = this.getMobileOperatingSystem();

            if( osMobile == 'iOS'){
                $('.app-btn .app-store').show();
            }
            else if( osMobile == 'Android'){
                $('.app-btn .google-play').show();
            }

            // TAG
            $(window).load(function() {
                var tagName = '/accueil-mobile';
                _gstat.audience('','', tagName);
                APP.sendTrackDatabase(tagName);
            });

             $('.app-btn a').on('click', function(e){
                var tagName = '/appliVOD';
                _gstat.audience('','', tagName);
                APP.sendTrackDatabase(tagName);

            })


        },

        shareExperience: function(e){
            e.preventDefault();

            var url = 'http://neperdezpaslefil.orange.fr';
            var width = 500;
            var height = 200;
            var left = (screen.width/2)-(width/2);
            var top = (screen.height/2)-(height/2);

            var target = '';

            if( $(e.target).closest('a').is('.fb') ){
                target = "fb";
            }
            else if( $(e.target).closest('a').is('.tw') ){
                 target = "tw";
            }
            else if( $(e.target).closest('a').is('.gplus') ){
                 target = "gplus";
            }

            if(target === "fb"){
                var fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='+url;
                var fbSharerWindow = window.open(fbShareUrl,"nom_popup",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);

            }
            else if(target === "tw"){
                var text1 = "Et si vous profitiez de la VOD d'Orange sur tous vos écrans et en toute fluidité ?";
                var urlRoot = "http://neperdezpaslefil.orange.fr";
                var hashtags ="#NePerdezPasLeFil";

                var dataTW = 'https://twitter.com/share?&text='+text1+'%20%23'+hashtags+'&url='+urlRoot;

                var twSharerWindow = window.open(dataTW, "popup_twitter",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);

            }
            else if(target === "gplus"){
                var gplusShareUrl = 'https://plus.google.com/share?url='+url+'';
                var gplusSharerWindow = window.open(gplusShareUrl,"nom_popup",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ width +', height='+ height +', top='+ top +', left='+left);
            }

        },

        getMobileOperatingSystem: function(){
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
                return 'iOS';
            }
            else if( userAgent.match( /Android/i ) ){
                return 'Android';
            }
            else{
                return 'unknown';
            }
        },

        sendTrackDatabase: function(tagName){

            $.ajax({
                type: "POST",
                url: "../services/tracking.php",
                data: 'label='+tagName,
                success: function(response) {
                    console.log(response);
                }
            });

        }

    } ;


    /********/
    /* LOAD */
    /********/
    if(document.all) {
        APP.init();
    } else {
        $(function() {
          APP.init();
        });
    }

}(jQuery));