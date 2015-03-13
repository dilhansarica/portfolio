<!DOCTYPE html>
<?php
    if(preg_match('#(?i)msie ([1-8]\.)#',$_SERVER['HTTP_USER_AGENT']))
    {
        // if IE<=8
        header('Location: browserError.php');
        exit;
    }
?>

<?php
    require_once('mobile_detect.php');
    $detect = new Mobile_Detect();
?>

<?php
$mobile = false;
if($detect->isMobile()):
    if($detect->isTablet()):
        //Tablet
        $compatible = false;

        if( $detect-> isAndroidOS() ):

            if( strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome')):

                $compatible = true;

            endif;
        endif;

        if( $detect -> isAsusTablet() ):
             $compatible = false;
        endif;

    else:
        //Mobile
            $compatible = false;

            if( $detect->isiOS() || $detect->isAndroidOS() || $detect->isWindowsPhoneOS() ):

                if( strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') || strpos($_SERVER['HTTP_USER_AGENT'], 'Safari') || preg_match('/(?i)msie [9-11]/',$_SERVER['HTTP_USER_AGENT']) ):

                    $compatible = true;
                    $mobile = true;

                endif;

            endif;
    endif;

else:
    //Desktop
    $compatible = true;

endif;
    if(!$compatible):
        header('Location: browserError.php');
    endif;

    if($mobile):
        header('Location: mobile.php');
    endif;

?>

<html lang="fr" itemscope itemtype="http://schema.org/Event">
<head>
    <title>Ne Perdez Pas Le Fil | Orange</title>

    <link rel="shortcut icon" href="img/favicon.ico">
    <link rel="stylesheet" href="css/jquery.jscrollpane.css">
    <link rel="stylesheet" href="css/jquery.ui.css">
    <link rel="stylesheet" href="css/main.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable:no;" />
    <meta name="description" content="Tentez de regarder un extrait de film jusqu’au bout sans  être interrompu par le quotidien. Vivez l’expérience et gagnez peut-être une TV HD,  des tablettes,..." />
    <meta name="title" content="Ne Perdez Pas Le Fil | Orange">

    <meta name="robots" content="index, follow">

    <meta property="og:title" content="Ne perdez plus le fil de votre film !" />
    <meta property="og:url" content="http://www.neperdezpaslefil.orange.fr" />
    <meta property="og:image" content="http://www.neperdezpaslefil.orange.fr/img/common/facebook_site.jpg" />
    <meta property="og:description" content="Profitez de la VOD d'Orange sur tous vos écrans en toute simplicité. Faites le test !" />

    <meta itemprop="name" content="Regardez vos films en toute fluidité !">
    <meta itemprop="description" content="Profitez de la VOD d'Orange sur tous vos écrans en toute simplicité. Faites le test !">
    <meta itemprop="image" content="http://www.neperdezpaslefil.orange.fr/img/common/google_site.jpg">



    <!--[if lt IE 9]>
        <script type="text/javascript" src="js/vendors/html5shiv/dist/html5shiv.js"></script>
    <![endif]-->

  <script type="text/javascript">
        var o_confCommon = {
            "genericHeaderZone": false,
            "dropDownPage": true,
            "Polaris": true
        }
    </script>
    <script type="text/javascript" src="https://c.woopic.com/libs/common/o_load_responsive.js"></script>

    <script src='https://www.google.com/recaptcha/api.js'></script>

</head>
<body class="">
    <div class="orange-header"></div>

    <div id="main">
        <div class="main-content">

            <div class="center-content" id="app_center">

            </div>

            <div class="app_footer">
                <div class="left">
                    <ul class="texts">
                        <li class="reglement"><a href="#reglements_link">Réglement du jeu</a></li>
                        <li class="mentions"><a href="#mentions_link">Mentions</a></li>
                        <li class="tortues"><p>Ninja Turtles TM, ® & © 2014 Paramount Pictures. Tous Droits Réservés.</p> </li>
                        <li class="marceau"><p>Tu veux ou tu veux pas © 2014 Warner Bros. Entertainment Inc. Tous droits réservés.</p> </li>
                        <li class="house"><p>House of Cards S2 © 2013 MRC II Distribution Company L.P. All Rights Reserved.</p> </li>
                    </ul>
                </div>
                <div class="right">
                    <ul class="icons">
                         <!-- <li><a href="#" class="ctrl-hd">HD</a> </li> -->
                        <li><a href="#" class="ctrl-sound"></a> </li>
                        <li><a href="#" class="ctrl-fullscreen"></a> </li>
                    </ul>
                </div>
            </div>

        </div>

    </div>
    <div id='div_footer'></div>

    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1538904406369555',
          xfbml      : true,
          version    : 'v2.1'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk/debug.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>

    <script type="application/javascript">
      /*window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
          appId      : '1538904406369555',
          status     : true,
          xfbml      : true
        });

      };

      // Load the SDK asynchronously
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/all.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));*/

    </script>

    <script src="js/env-config.js"></script>
    <script>
        var filename = (window.ENV_CONFIG && window.ENV_CONFIG.minify) ? 'dist/app-built.js' : 'bootstrap.js';
        filename += (window.ENV_CONFIG && window.ENV_CONFIG.isCache) ? '' : '?bust=' + window.ENV_CONFIG.urlArgs;
        document.write('<script data-main="js/' + filename + '" src="js/vendors/requirejs/require.js"><\/script>');
    </script>


    <script type="text/javascript">
        head.ready( function() {
            o_footer({'theme':'dark', 'compactVersion': false},'div_footer');
        });
    </script>



    <!-- TAG FB -->

    <script>(function() {
        var _fbq = window._fbq || (window._fbq = []);
        if (!_fbq.loaded) {
        var fbds = document.createElement('script');
        fbds.async = true;
        fbds.src = '//connect.facebook.net/en_US/fbds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(fbds, s);
        _fbq.loaded = true;
        }
        _fbq.push(['addPixelId', '1438895986347741']);
        })();
        window._fbq = window._fbq || [];
        window._fbq.push(['track', 'PixelInitialized', {}]);
    </script>
    <noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=1438895986347741&amp;ev=PixelInitialized" /></noscript>

    <!-- TAG TWITTER -->

    <script src="//platform.twitter.com/oct.js" type="text/javascript"></script>
    <script type="text/javascript">
        twttr.conversion.trackPid('l5i06');</script>
    <noscript>
    <img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?txn_id=l5i06&p_id=Twitter" />
    <img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?txn_id=l5i06&p_id=Twitter" /></noscript>

    <!-- TAG Orange SS -->

    <!-- SmartAdserver Tracking Begin -->
    <!-- Ne perdez pas le fil_ LP -->
    <!-- Tracking with script -->
    <SCRIPT type="text/javascript">
        sas_tmstp=Math.round(Math.random()*10000000000);
        document.write('<iframe src="http://ww1082.smartadserver.com/track/ift2.asp?199901;19940;'+sas_tmstp+';0;[transactionid];[reference]" width=1 height=1 iframeborder=0></iframe>');
    </SCRIPT>
    <NOSCRIPT><iframe src="http://ww1082.smartadserver.com/track/ift2.asp?199901;19940;123456;0;[transactionid];[reference]" width=1 height=1 iframeborder=0> </iframe></NOSCRIPT>
    <!-- SmartAdserver Tracking End -->
    <img src="http://amch.questionmarket.com/adsc/d1405325/14/1406235/ad_radar.php?ord=[randnum]" height="1" width="1" border="0" />

</body>
</html>