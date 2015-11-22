// 'use strict';

App.module('Vamo.Models', function (Models, App, Backbone, Marionette, $, _) {
    
    Models.Person = Backbone.Model.extend({
        defaults: {
            'name': 'Nombre',
            'money': 0
        }
    });
});