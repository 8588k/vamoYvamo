// 'use strict';

App.module('Vamo.Views', function (Views, App, Backbone, Marionette, $, _) {    
    
    Views.Person = Marionette.ItemView.extend({

        tagName: 'li',

        className: 'person',

        template: __templates.vamo.person,

        ui: {
            money: 'input[type="number"]',
            name: 'input[type="text"]',
            trash: '.icon-remove'
        },

        events: {
            'input @ui.money': 'moneyChange',
            'input @ui.name': 'nameChange',
            'click @ui.trash': 'removePerson'
        },

        initialize: function() {
            var that = this;

            App.Events.on('person-message', function(peopleTotal) {
                that.refreshStatusMsg(peopleTotal);
            });
        },

        moneyChange: function() {
            var $moneyInput = this.$el.find('input[type="number"]'),
                newMoneyValue = $moneyInput.val();

            if ( /^[0-9]+$/.test(newMoneyValue) ) {
                // Si es un número, lo guardo
                this.model.set({
                    'money': newMoneyValue
                });
            } else {
                // Si el input está vacio, guardo 0
                if ($moneyInput.val() === "") {
                    this.model.set({
                        'money': 0
                    });
                } else {
                    // Si no es un número, dejo que el valor del input sea el último guardado
                    $moneyInput.val(this.model.get('money'));
                }
            }

            App.Events.trigger('people-calculate');
        },

        nameChange: function() {
            this.model.set({
                'name': this.$el.find('input[type="text"]').val()
            });
        },

        removePerson: function() {
            var that = this;

            this.model.destroy({
                success: function() {
                    that.remove();
                }
            });

            App.Events.trigger('refresh-people-quantity');
            App.Events.trigger('people-calculate');
        },

        refreshStatusMsg: function(totalPerPerson) {
            var $statusEl = this.$('.status'),
                modelMoney = this.model.get('money'),
                result;

            $statusEl.attr('class', 'status');

            if (totalPerPerson < modelMoney) {
                result = modelMoney - totalPerPerson;
                $statusEl.addClass('status-receive');
                $statusEl.html('Recibe $' + result.toFixed(2));
            } else if (totalPerPerson > modelMoney) {
                result = totalPerPerson - modelMoney;
                $statusEl.addClass('status-pay');
                $statusEl.html('Paga $' + result.toFixed(2));
            } else {
                $statusEl.addClass('status-ok');
                $statusEl.html('Está hecho');
            }
        }
    });
});