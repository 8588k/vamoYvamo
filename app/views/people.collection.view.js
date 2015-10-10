// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {

    Views.People = Marionette.CollectionView.extend({

        tagName: 'ul',

        childView: Views.Person,

        initialize: function() {}

    });

});