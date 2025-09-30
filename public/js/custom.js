// AIESEC Carthage - Custom JavaScript
// Version: Clean and Optimized

$(document).ready(function() {
    'use strict';

    // Smooth scrolling for navigation links
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });

    // Active navigation highlighting
    var $window = $(window);
    var $body = $('body');
    var $document = $(document);

    function setActive() {
        var scrollPos = $document.scrollTop() + 100;
        $('.probootstrap-main-nav a[href*="#"]').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollTop) {
                $('.probootstrap-main-nav a').removeClass('active');
                currLink.addClass('active');
            }
        });
    }
    $window.on('scroll', setActive);
    setActive();

    // Form validation and submission (handled by form-handler.js)
    // This file is now clean and focused on UI interactions only

    console.log('✅ AIESEC Carthage - Custom JavaScript loaded successfully');
});
