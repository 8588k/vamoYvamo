// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {    
    
    Views.Total = Marionette.ItemView.extend({

        template: __templates.vamo.total

    });
});