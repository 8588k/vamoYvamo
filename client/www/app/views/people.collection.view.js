// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {

    Views.People = Marionette.CollectionView.extend({

        tagName: 'ul',

        className: 'rows-container',

        childView: Views.Person

    });

});