/**
 * Created by Philippe Simpson on 10-10-2015.
 */

// Usage: run with phantomJS executable.

var webPage = require('webpage'),
    page = webPage.create();

var args = require('system').args,
    today = args[1], // Number(new Date().toISOString().slice(0, 10).replace(/-/g, ""));
    days = args[2], // 7
    url = 'http://www.kerteminde-tennisklub.dk/Activity/BookingSheet';

var settings = {
    operation: "POST",
    encoding: "utf8",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
        date: Number(today),
        days: Number(days),
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
            // Due to lack of proper data API, we determine unavailable time slots by the DOM. Ouch.
            var reserved = [],
                total = document.querySelectorAll('.slot');

            for (var i = 0; i < total.length; ++i) {
                if (total[i].hasAttribute("data-bookings")) {
                    if (total[i].getAttribute("data-bookings") === "Reserveret") { //
                        reserved.push(total[i]);
                    }
                }
            }

            return {
                total: total.length,
                reserved: reserved.length
            };
        });

        // output result:
        console.log(today + " (" + days + " days):" + " Available slots: (" + slots.total + " - " + slots.reserved + ") " + (slots.total - slots.reserved));
    }
    phantom.exit(0);
});