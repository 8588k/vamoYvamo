// 'use strict';

(function (win) {

    // Check if app its launched
    if (win.App) { return; }

    // Create app
    var App = new Marionette.Application();

    App.Events = _.extend({}, Backbone.Events);

    App.addRegions({
        'mainRegion': '#app'
    });

    // Subscribe to "start" application event
    App.on('start', function() {
        Backbone.history.start();
    });

    // Export Application
    win.App = App;

    // Start App app
    $(function() {
        App.start();
        FastClick.attach(document.body);
    });
    
}(window));