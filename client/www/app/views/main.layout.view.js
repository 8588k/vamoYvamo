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

            App.Events.on('people-calculate', function() {
                that.calculate(peopleCollection);
            });

            App.Events.on('refresh-people-quantity', function() {
                that.refreshPeopleQuantity(peopleCollection);
            });

            App.Events.on('button-pressed', function(event) {
                that.buttonPressed(event);
            });

            totalView = new Views.Total();
            this.totalRegion.show(totalView);
        },

        addPerson: function(collectionInstance) {
            var personInstance = new App.Vamo.Models.Person();

            collectionInstance.add(personInstance);
            this.calculate(collectionInstance);
            this.refreshPeopleQuantity(collectionInstance);
        },

        removeLastPerson: function(collectionInstance) {
            var popModel = collectionInstance.pop();

            if (popModel) popModel.destroy();

            this.calculate(collectionInstance);
            this.refreshPeopleQuantity(collectionInstance);
        },

        addPeople: function(collectionInstance) {
            var $el = $('.person-number'),
                peopleQuantity = $el.val(),
                peopleDiff = peopleQuantity - collectionInstance.length,
                peopleDiffAbs = Math.abs(peopleDiff);

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

            this.calculate(collectionInstance);
        },

        calculate: function(collectionInstance) {
            var $totalEl = $('.total-price span'),
                total = 0,
                modelMoney,
                totalPerPerson;

            _.each(collectionInstance.models, function(model, i) {
                modelMoney = parseInt(model.get('money'), 10);
                total = total + modelMoney;
            });

            $totalEl.html(total);
            totalPerPerson = total / collectionInstance.length;

            App.Events.trigger('person-message', totalPerPerson);
        },

        refreshPeopleQuantity: function(collectionInstance) {
            $('.people-quantity input[type="number"]').val(collectionInstance.length);
        },

        buttonPressed: function(event) {
            event.preventDefault();
            event.stopPropagation();
            navigator.vibrate([10]);
        }

    });
});