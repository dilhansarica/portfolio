define([

        'backbone',
        'underscore',
        'main',
        'app-config',
        'views/layout',
        'views/landing',
        'views/experience',
        'views/divertissement',
        'views/vod',
        'views/mentions',
        'views/game-rules',
        'views/notFound',
        'views/rotation-tablet'
    ], function( Backbone, _, App, appConfig, layoutView, landingView, experienceView, divertissementView, vodView, mentionsView, GameRulesView, PageNotFoundView, RotationTabletView) {

    var Router = Backbone.Router.extend({

        routes : {
            '': 'showLanding',
            'experience': 'showExperience',
            'divertissement' : 'showDivertissement',
            'vod': 'showVOD',
            'mentions_link': 'showMentions',
            'reglements_link': 'showGameRules',
            'rotation': 'showRotationTablet',
            '*path': 'showPageNotFound'
        },
        initialize : function() {
            this.currentView = null;
            this.layout = new layoutView();
        },
        showLanding : function(){
            this.landing = new landingView();
            this.changeView(this.landing);
        },
        showExperience : function(){
            this.experience = new experienceView();
            this.changeView(this.experience);
        },
        showDivertissement : function(){
            this.divertissement = new divertissementView();
            this.changeView(this.divertissement);
        },
        showVOD : function(){
            this.vod = new vodView();
            this.changeView(this.vod);
        },
        showMentions: function(){
            this.mentions = new mentionsView();
            this.changeView(this.mentions);
        },
        showGameRules: function(){
            this.gameRules = new GameRulesView();
            this.changeView(this.gameRules);
        },
        showPageNotFound: function(){
            this.pageNotFound = new PageNotFoundView();
            this.changeView(this.pageNotFound);
        },
        showRotationTablet: function(){
            this.rotationTablet = new RotationTabletView();
            this.changeView(this.rotationTablet);
        },
        changeView : function( view ) {
            if (this.currentView !== null && this.currentView.cid != view.cid) {
                this.currentView.remove();
            }
            this.currentView = view;
            return view.render();
        }

    });

    return Router;
});