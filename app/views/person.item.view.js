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

        initialize: function() {},

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
        },

        nameChange: function() {
            this.model.set({
                'name': this.$el.find('input[type="text"]').val()
            });
        },

        removePerson: function() {
            var that = this;

            console.log("removePerson");

            this.model.destroy({
                success: function() {
                    that.remove();
                }
            });
        }

    });
});