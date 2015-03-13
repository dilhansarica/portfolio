<!DOCTYPE html>
<html lang="fr" itemscope itemtype="http://schema.org/Event">
<head>
    <title>Portfolio Dilhan</title>

    <link rel="shortcut icon" href="img/favicon.ico">

    <link rel="stylesheet" href="css/main.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable:no;" />
    <meta name="description" content="" />
    <meta name="title" content="Portfolio Dilhan">

    <meta name="robots" content="index, follow">

    <meta property="og:title" content="Portfolio Dilhan" />
    <meta property="og:url" content="http://www.dilhansarica.com" />
    <meta property="og:image" content="" />
    <meta property="og:description" content="" />

    <meta itemprop="name" content="">
    <meta itemprop="description" content="">
    <meta itemprop="image" content="">



    <!--[if lt IE 9]>
        <script type="text/javascript" src="js/vendors/html5shiv/dist/html5shiv.js"></script>
    <![endif]-->


</head>
<body class="">
    <div class="orange-header"></div>

    <div id="main">
        <div class="main-content">

            <div class="center-content" id="app_center">
            <p>hey</p>
            </div>

            <div class="app_footer">

            </div>

        </div>

    </div>
    <div id='div_footer'></div>

    <script src="js/env-config.js"></script>
    <script>
        var filename = (window.ENV_CONFIG && window.ENV_CONFIG.minify) ? 'dist/app-built.js' : 'bootstrap.js';
        filename += (window.ENV_CONFIG && window.ENV_CONFIG.isCache) ? '' : '?bust=' + window.ENV_CONFIG.urlArgs;
        document.write('<script data-main="js/' + filename + '" src="js/vendors/requirejs/require.js"><\/script>');
    </script>


</body>
</html>