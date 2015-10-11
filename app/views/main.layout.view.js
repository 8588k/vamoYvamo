// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {

    Views.Main = Marionette.LayoutView.extend({

        template: __templates.vamo.main,

        regions: {
            'headerRegion' : '[data-js="header"]',
            'actionsRegion': '[data-js="actions"]',
            'rowsRegion': '[data-js="rows"]',
            'totalRegion': '[data-js="total"]'
        },

        events: {},

        onShow: function(options) {
            var that = this,
                headerView,
                actionsView,
                person,
                person2,
                peopleCollection,
                peopleCollectionView,
                totalView;

            // headerView = new Views.Header();
            // this.headerRegion.show(headerView);

            actionsView = new Views.Actions();
            this.actionsRegion.show(actionsView);

            person = new App.Vamo.Models.Person();
            person2 = new App.Vamo.Models.Person();
            peopleCollection = new App.Vamo.Collections.People([person, person2]);

            peopleCollectionView = new Views.People({
                collection: peopleCollection
            });
            this.rowsRegion.show(peopleCollectionView);

            App.Events.on('add-person', function() {
                that.addPerson(peopleCollection);
            });

            App.Events.on('remove-person', function() {
                that.removeLastPerson(peopleCollection);
            });

            App.Events.on('add-people', function() {
                that.addPeople(peopleCollection);
            });

            // totalView = new Views.Total();
            // this.totalRegion.show(totalView);
        },

        addPerson: function(collectionInstance) {
            var personInstance = new App.Vamo.Models.Person();
                collectionInstance.add(personInstance);
        },

        removeLastPerson: function(collectionInstance) {
            var popModel = collectionInstance.pop();
            if (popModel) popModel.destroy();
        },

        addPeople: function(collectionInstance) {
            var $el = $('.person-number'),
                peopleQuantity = $el.val(),
                peopleDiff = peopleQuantity - collectionInstance.length,
                peopleDiffAbs = Math.abs(peopleDiff);

            window.mati = collectionInstance;

            if (peopleQuantity >= 50) {
                $el.val(collectionInstance.length);
                return;
            }

            if (peopleDiff > 0) {
                for (var i = 0; i < peopleDiffAbs; i+=1) {
                    this.addPerson(collectionInstance);
                }
            } else if (peopleDiff < 0) {
                for (var i = 0; i < peopleDiffAbs; i+=1) {
                    this.removeLastPerson(collectionInstance);
                }
            }
        }

    });
});