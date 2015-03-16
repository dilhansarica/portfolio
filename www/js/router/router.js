define([

        'backbone',
        'underscore',
        'main',
        'app-config',
        'views/layout',
        'views/home'
    ], function( Backbone, _, App, appConfig, layoutView, homeView) {

    var Router = Backbone.Router.extend({

        routes : {
            '': 'showHome'
        },
        initialize : function() {
            this.currentView = null;
            this.layout = new layoutView();
        },
        showHome : function(){
            this.home = new homeView();
            this.changeView(this.home);
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