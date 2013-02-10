/*
 * Javascript jQuery.Humanus plugin
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
    console.log('begin');
    if (typeof define === 'function' && define.amd) {
        console.log('AMD');
        define('jquery.humanus', ['jquery', 'humanus'], factory); // AMD
    } else {
        factory(jQuery, Humanus);
    }
}(this, function (jQuery, Humanus) {
    jQuery.fn.humaneDates = function(options)
    {
        var settings = jQuery.extend({
            'lowercase': false
        }, options);

        return this.each(function()
        {
            var $t = jQuery(this),
                date = $t.attr('datetime') || $t.attr('title');

            date = Humanus.date(date);

            if(date && settings['lowercase']) {
                date = date.toLowerCase();
            }

            if(date && $t.html() != date) {
                // don't modify the dom if we don't have to
                $t.html(date);
            }
        });
    };

    jQuery.fn.humaneSizes = function(options)
    {
        var settings = jQuery.extend({
            'lowercase': false
        }, options);

        return this.each(function()
        {
            var $t = jQuery(this),
                size = $t.attr('data-size') || $t.attr('title');

            size = Humanus.size(size);

            if(size && settings['lowercase']) {
                size = size.toLowerCase();
            }

            if(size && $t.html() != size) {
                // don't modify the dom if we don't have to
                $t.html(size);
            }
        });
    };
}));

