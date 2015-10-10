// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {    
    
    Views.Person = Marionette.ItemView.extend({

        tagName: 'li',

        className: 'person',

        template: __templates.vamo.person,

        initialize: function() {
            console.log("inicia persona");
        },
    });
});