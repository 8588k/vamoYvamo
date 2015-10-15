// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {    
    
    Views.Actions = Marionette.ItemView.extend({

        className: 'people-quantity',

        template: __templates.vamo.actions,

        ui: {
            add: '.add',
            remove: '.remove',
            personNumber: '.person-number'
        },

        events: {
            'click @ui.add': 'addPerson',
            'click @ui.remove': 'removeLastPerson',
            'input @ui.personNumber': 'addPeople'
        },

        initialize: function() {},

        addPerson: function(){
            App.Events.trigger('add-person');
        },

        removeLastPerson: function() {
            App.Events.trigger('remove-person');
        },

        addPeople: function() {
            App.Events.trigger('add-people');
        }

    });
});