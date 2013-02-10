/*
 * Javascript Humanus
 * Copyright (c) 2008 Dean Landolt (deanlandolt.com)
 * Re-write by Zach Leatherman (zachleat.com)
 * Re-write by Denis Gonsiorovsky (dns.gnsr@gmail.com)
 *
 * Adopted from the John Resig's pretty.js
 * at http://ejohn.org/blog/javascript-pretty-date
 * and henrah's proposed modification
 * at http://ejohn.org/blog/javascript-pretty-date/#comment-297458
 *
 * Licensed under the MIT license.
 */

(function (root, factory) {
    if (typeof exports === 'object' && exports) {
        module.exports = factory; // CommonJS
    } else if (typeof define === 'function' && define.amd) {
        define('humanus', [], factory); // AMD
    } else {
        root.Humanus = factory; // <script>
    }
}(this, (function () {
    var dateLang = {
        ago: 'Ago',
        from: '',
        now: 'Just Now',
        minute: 'Minute',
        minutes: 'Minutes',
        hour: 'Hour',
        hours: 'Hours',
        day: 'Day',
        days: 'Days',
        week: 'Week',
        weeks: 'Weeks',
        month: 'Month',
        months: 'Months',
        year: 'Year',
        years: 'Years'
    },
    dateFormats = [
        [60, dateLang.now],
        [3600, dateLang.minute, dateLang.minutes, 60], // 60 minutes, 1 minute
        [86400, dateLang.hour, dateLang.hours, 3600], // 24 hours, 1 hour
        [604800, dateLang.day, dateLang.days, 86400], // 7 days, 1 day
        [2628000, dateLang.week, dateLang.weeks, 604800], // ~1 month, 1 week
        [31536000, dateLang.month, dateLang.months, 2628000], // 1 year, ~1 month
        [Infinity, dateLang.year, dateLang.years, 31536000] // Infinity, 1 year
    ];

    function humaneDate(date, compareTo) {
        if(!date) {
            return;
        }

        var isString = typeof date == 'string',
            date = isString ?
                        new Date(('' + date).replace(/-/g,"/").replace(/[TZ]/g," ")) :
                        date,
            compareTo = compareTo || new Date,
            seconds = (compareTo - date +
                            (compareTo.getTimezoneOffset() -
                                // if we received a GMT time from a string, doesn't include time zone bias
                                // if we got a date object, the time zone is built in, we need to remove it.
                                (isString ? 0 : date.getTimezoneOffset())
                            ) * 60000
                        ) / 1000,
            token;

        if(seconds < 0) {
            seconds = Math.abs(seconds);
            token = dateLang.from ? ' ' + dateLang.from : '';
        } else {
            token = dateLang.ago ? ' ' + dateLang.ago : '';
        }

        /*
        * 0 seconds && < 60 seconds        Now
        * 60 seconds                       1 Minute
        * > 60 seconds && < 60 minutes     X Minutes
        * 60 minutes                       1 Hour
        * > 60 minutes && < 24 hours       X Hours
        * 24 hours                         1 Day
        * > 24 hours && < 7 days           X Days
        * 7 days                           1 Week
        * > 7 days && < ~ 1 Month          X Weeks
        * ~ 1 Month                        1 Month
        * > ~ 1 Month && < 1 Year          X Months
        * 1 Year                           1 Year
        * > 1 Year                         X Years
        *
        * Single units are +10%. 1 Year shows first at 1 Year + 10%
        */

        function normalize(val, single)
        {
            var margin = 0.1;
            if(val >= single && val <= single * (1+margin)) {
                return single;
            }
            return val;
        }

        for(var i = 0, format = dateFormats[0]; dateFormats[i]; format = dateFormats[++i]) {
            if(seconds < format[0]) {
                if(i === 0) {
                    // Now
                    return format[1];
                }

                var val = Math.ceil(normalize(seconds, format[3]) / (format[3]));
                return val +
                        ' ' +
                        (val != 1 ? format[2] : format[1]) +
                        (i > 0 ? token : '');
            }
        }
    };

    var sizeLang = {
        bytes: 'B',
        kilobytes: 'kB',
        megabytes: 'MB',
        gigabytes: 'GB',
        terabytes: 'TB'
    },
    sizeFormats = [
        [1000, sizeLang.bytes],
        [1000000, sizeLang.kilobytes, ],
        [1000000000, sizeLang.megabytes],
        [1000000000000, sizeLang.gigabytes],
        [1000000000000000, sizeLang.terabytes]
    ];


    function humaneSize(size){
        if (!size) {
            return;
        }


        for(var i = 0, format = sizeFormats[0]; sizeFormats[i]; format = sizeFormats[++i]) {
            if (size < format[0]) {
                var val = Math.ceil(size / (format[0]/1000));
                return val + ' ' + format[1];
            }
        }

        return 'Very large!';
    };

    return {
        date: humaneDate,
        size: humaneSize
    };
}())));

