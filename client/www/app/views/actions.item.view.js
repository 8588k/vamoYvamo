// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {    
    
    Views.Actions = Marionette.ItemView.extend({

        className: 'people-quantity',

        template: __templates.vamo.actions,

        ui: {
            add: '.add',
            remove: '.remove',
            personNumber: '.person-number',
            share: '.share'
        },

        events: {
            'touchstart @ui.add': 'addPerson',
            'touchstart @ui.remove': 'removeLastPerson',
            'click @ui.add': 'addPerson',
            'click @ui.remove': 'removeLastPerson',
            'touchstart @ui.share': 'share',
            'click @ui.share': 'share',
            'input @ui.personNumber': 'addPeople'
        },

        initialize: function() {},


        share: function(event){
            App.share();
        },

        addPerson: function(event){
            App.Events.trigger('button-pressed', event);
            App.Events.trigger('add-person');
        },

        removeLastPerson: function(event) {
            App.Events.trigger('button-pressed', event);
            App.Events.trigger('remove-person');
        },

        addPeople: function(event) {
            App.Events.trigger('button-pressed', event);
            App.Events.trigger('add-people');
        }

    });
});