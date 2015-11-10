// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {    
    
    Views.Header = Marionette.ItemView.extend({

        template: __templates.vamo.header,

        ui: {
            options: '[data-js="options"]'
        },

        events: {
            'touchstart @ui.options': 'showOptions'
        },

        showOptions: function() {
            console.log("showOptions =)");
        }

    });
});