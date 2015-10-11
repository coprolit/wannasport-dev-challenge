/**
 * Created by Philippe Simpson on 10-10-2015.
 */

// Usage: run with phantomJS executable.

var webPage = require('webpage');
var page = webPage.create();
var url = 'http://www.kerteminde-tennisklub.dk/Activity/BookingSheet';
var today = Number(new Date().toISOString().slice(0, 10).replace(/-/g, ""));
var days = 7;
var settings = {
    operation: "POST",
    encoding: "utf8",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
        date: today,
        days: days,
        activity: 'Activity2520714441261358577',
        view: null
    })
};

page.onConsoleMessage = function(msg) {
    console.log('[debug] ' + msg);
};

page.open(url, settings, function(status){
    console.log('Status: ' + status);

    if (status !== 'success') {
        console.log('FAILED to load url');
    } else {
        console.log('Starting evaluate...');
        var slots = page.evaluate(function () {
            var reserved = [],
                total = document.querySelectorAll('.slot');

            for (var i = 0; i < total.length; ++i) {
                if (total[i].hasAttribute("data-bookings")) {
                    if (total[i].getAttribute("data-bookings") === "Reserveret") { // ugly solution to filter available time slots
                        reserved.push(total[i]);
                    }
                }
            }

            return {
                total: total.length,
                reserved: reserved.length
            };
        });

        console.log(today + " (" + days + " days):" + " Available slots: (" + slots.total + " - " + slots.reserved + ") " + (slots.total - slots.reserved));
    }
    phantom.exit(0);
});