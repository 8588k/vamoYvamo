// 'use strict';

App.module('Vamo', function (Vamo, App, Backbone, Marionette, $, _) {
    var controller,
        adds,
        Router;

    Router = Marionette.AppRouter.extend({
        'appRoutes': {
            '': 'index'
        }
    });

    controller = {
        index: function() {
            var mainLayoutView;

            mainLayoutView = new Vamo.Views.Main();
            App.mainRegion.show(mainLayoutView);
        }
    };

    App.onStart = function() {
        new Router({
            controller: controller
        });
        adds = new Vamo.AdMob();

        adds.showInterstitial();
    };
});