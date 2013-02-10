Humanus is a better way to display relative dates and data sizes using JavaScript. Instead of a raw date
string, this script will return strings like "2 hours ago" or "5 days" for dates,
and strings like "3 kB" or "12 MB" for sizes.

Humanus also supports AMD and can be loaded by [RequireJS](http://requirejs.org/), for example.

**JavaScript Usage: (returns string)**

    require(['humanus'], function(Humanus) {

        Humanus.date(new Date);
        Humanus.date('2008-01-28T20:24:17Z');

        Humanus.size('2304');
        Humanus.size('99938447');

    });


**jQuery Plugin Usage:**

    require(['jquery.humanus'], function() {

        // <span title="2008-01-28T20:24:17Z">January 1, 2008 20:24:17 GMT</span>

        $('span').humaneDates();

        // <time datetime="2008-01-28T20:24:17Z">January 1, 2008 20:24:17 GMT</time>

        $('time').humaneDates();

        // <span data-size="3404">3404 B</span>

        $('span').humaneSizes();

        // <span title="39044">39044 B</span>

        $('span').humaneSizes();

    });


Copyright (c) 2008 Dean Landolt (deanlandolt.com)

Re-write by Zach Leatherman (zachleat.com)

Re-write by Denis Gonsiorovsky (dns.gnsr@gmail.com)
 
Adopted from the John Resig's pretty.js
    at http://ejohn.org/blog/javascript-pretty-date
and henrah's proposed modification 
    at http://ejohn.org/blog/javascript-pretty-date/#comment-297458

Licensed under the MIT license.

