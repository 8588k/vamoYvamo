// 'use strict';

App.module('Vamo', function (Vamo, App, Backbone, Marionette, $, _) {
    var controller,
        adds,
        Router;

    Router = Marionette.AppRouter.extend({
        'appRoutes': {
            '': 'index',
            'reset': 'reset'
        }
    });

    controller = {
        index: function() {
            var mainLayoutView;

            mainLayoutView = new Vamo.Views.Main();
            App.mainRegion.show(mainLayoutView);
        },

        reset: function() {
            this.index();
        }
    };

    App.onStart = function() {
        new Router({
            controller: controller
        });
        adds = new Vamo.AdMob();

        adds.showInterstitial();
    };


    App.onResume = function() {
        adds.showInterstitial();
    };

    App.share = function(){
        var imageLink;

        navigator.screenshot.save(function(error,res){
            if(error){
                console.log('pincho:',error);
            }else{
                console.log('ok',res); //should be path/to/myScreenshot.jpg
                //For android
                imageLink = res.filePath;

                if( /(android)/i.test(navigator.userAgent) ) { 

                    window.plugins.socialsharing.share(null, null,'file://'+imageLink, null);

                } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {

                    window.plugins.socialsharing.share(null, null, imageLink, null);
                }

            }
        },'jpg',50,'myScreenShot');
    };

});