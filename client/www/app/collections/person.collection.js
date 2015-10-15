// 'use strict';

App.module('Vamo.Collections', function (Collections, App, Backbone, Marionette, $, _) {

    Collections.People = Backbone.Collection.extend({
        model: App.Vamo.Models.Person
    });

});