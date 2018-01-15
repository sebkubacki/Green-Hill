function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result âŚ

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

$(document).ready(function() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    function isEmail(email) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    function isPhoneNumber(number) {
        if(/^\+?[0-9\s]+$/.test(number)) {
            return true;
        } else {
            return false;
        }
    }

    var rwdWidth = 1100;
    var rwdHeight = 200;

    var bar = $('.site-header .bar').first();

    var header = $('.site-header .site-header__wrapper');

    var refreshHeaderHeight = function() {
        var barHeight = bar.outerHeight();

        if(hawk.w > rwdWidth && hawk.h > rwdHeight) {
            var finalHeight = hawk.h - barHeight;

            header.css({ 'height': finalHeight + "px" }).addClass('constant-height');
        } else {
            header.css({ 'height': 'auto', 'min-height': finalHeight + "px" }).removeClass('constant-height');
        }
    }

    refreshHeaderHeight();

    var axis = $('#axis');

    var mainAxis = $('#main-axis');
    var mainAxisHeight = 0;

    var hugeButton = $('.axis-item-00');
    hugeButton.addClass('hidden');

    var extraItems = $('.axis-item--extra-item');
    var additionalValue = 0;

    var section01 = $('.section-01').first();

    var spectacularMenu = $('.spectacular-menu');

    var hamburger = $('.icon-hamburger');

    var bindSections = function() {
        var binded = [];
        var subsections = $('.subsection');

        var n = 1;

        subsections.each(function() {
            var current = $(this);
            var bead = $('<div class="axis-item axis-item-circle"></div>');

            bead.addClass('axis-item-bead-' + n++);

            mainAxis.append(bead);

            binded.push([current, bead]);
        });

        return binded;
    }

    var bindedSections = bindSections();

    var axisTopOffset;

    var countPointsPosition = function() {
        var len = bindedSections.length;
        var section;
        var point;
        axisTopOffset = mainAxis.offset().top;
        var itemTopOffset;

        for(var i = 0; i < len; i++) {
            section = bindedSections[i][0];
            point = bindedSections[i][1];

            itemTopOffset = section.offset().top - axisTopOffset + 5;

            point.css({ top: itemTopOffset + "px" });

            bindedSections[i][2] = itemTopOffset;
        }
    }

    countPointsPosition();

    var drawAxis = function() {
        scrolled = window.pageYOffset;
        additionalValue = 0.75 * hawk.h;

        if(scrolled > 150 && hawk.w > 768) {
            mainAxisHeight = scrolled - axisTopOffset / 2;

            mainAxis.height(mainAxisHeight);

            var len = bindedSections.length;

            for(var i = 0; i < len; i++) {
                //console.log(i + ": " + mainAxisHeight);
                //console.log(i + ": " + bindedSections[i][2]);

                if(bindedSections[i][2] + 50 < mainAxisHeight) {
                    bindedSections[i][1].css({ opacity: 1 });
                } else {
                    bindedSections[i][1].css({ opacity: 0 });
                }

                if(mainAxisHeight >= axis.outerHeight() - hugeButton.outerHeight()) {
                    hugeButton.removeClass('hidden').addClass('visible animated zoomIn');
                } else {
                    hugeButton.removeClass('visible').removeClass('animated').removeClass('zoomIn').addClass('hidden');
                }
            }
        } else {
            mainAxis.height(0);
        }
    }

    if(!detectIE()) {
        drawAxis();
    } else {
        mainAxis.height("100%");
        hugeButton.removeClass('hidden').addClass('visible animated zoomIn');
    }


    $(window).scroll(function() {
        scrolled = window.pageYOffset;

        if(!detectIE()) {
            drawAxis();

           $('.decoration-00, .decoration-01, .decoration-02, .decoration-04, .decoration-05, .decoration-06, .decoration-07, .decoration-08').each(function() {
                if($(this).hasClass('decoration--animated')) {
                    $(this).removeClass('decoration--animated')
                } else {
                    $(this).addClass('decoration--animated')
                }
            });
        }

        if(scrolled > header.outerHeight()) {
            hamburger.addClass('icon-hamburger--dark').removeClass('icon-hamburger--light');
        } else {
            hamburger.addClass('icon-hamburger--light').removeClass('icon-hamburger--dark');
        }
    });

    function isInObject(value, obj) {
        if(Object.values !== undefined) {
            return Object.values(obj).indexOf(value) > -1;
        } else {
            return false;
        }
    }

    function isInArray(value, array) {
        //return array.indexOf(value) > -1;
    }

    refreshHeaderHeight();

    function refreshDropdowns() {
        var dropdowns = $('.dropdown');
        var list;

        dropdowns.each(function() {
            list = $(this).find('.dropdown__list ul');

            list.mCustomScrollbar();
        });
    }

    /**function initializeDropdowns() {
        var dropdowns = $('.dropdown');
        var list;

        dropdowns.each(function() {
            list = $(this).find('.dropdown__list');

            list.mCustomScrollbar();
        });
    }**/

    refreshDropdowns();

    hawk.run();

    var refreshVideo = function() {
        var container = $('.video-background-section');

        var currentHeight = container.outerHeight();
        var currentWidth = container.outerWidth();

        var newWidth = currentHeight*2.4; // 1.78
        var widthDifference = newWidth - currentWidth;

        var newHeight = currentWidth/2.4;
        var heightDifference = newHeight - currentHeight;

        if(currentWidth < currentHeight*2.4) {
            container.find('.video-background-section__container').css({ padding: 0, height: currentHeight + 'px', width: newWidth + 'px', margin: '0 0 0 -' + widthDifference/2 + 'px' });
        } else {
            container.find('.video-background-section__container').css({ padding: 0, height: newHeight + 'px', width:currentWidth + 'px', margin: -heightDifference/2 + 'px 0 0 0' });
        }
    }

    $(window).resize(function() {
        w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        refreshHeaderHeight();
        countPointsPosition();
    });



    var wholeHeight = document.body.scrollHeight - h;
    var progress = 0;

    var sidebar = $('.sidebar');

    var scrolled = window.scrollY;

    var refreshProgressbar = function() {
        wholeHeight = document.body.scrollHeight - h;

        progress = scrolled / wholeHeight * 100;

        progressbar.css({ width: progress + '%' });

        //console.log("window.scrollY: " + window.scrollY + "; wholeHeight: " + wholeHeight);
    }

    //$('input, textarea').placeholder();

    $('.textarea-placeholder textarea').bind('propertychange change click keyup input paste', function() {
        var placeholder = $(this).siblings('.textarea-placeholder__inner');

        if($(this).val().length > 0) {
            placeholder.addClass('filled');
        } else {
            placeholder.removeClass('filled');
        }
    });

    $("#form-contact").submit(function(e) {
        e.preventDefault();

        var lang = $('html').attr('lang');
        var form = $(this);

        var spinner = form.find('.spinner');
        spinner.show();

        var showMessage = function(message) {
            var info = form.find('.form__info');
            var container = form.find('.form__info-container');

            info.animate({ opacity: 0 }, function() {
                $(this).html(message);

                if(!container.is(':visible')) {
                    container.slideDown(300, function() {
                        info.animate({ opacity: 1 });
                    });
                } else {
                    info.animate({ opacity: 1 });
                }
            });
        }

        var nameField = form.find('#contact-name');
        var phoneField = form.find('#contact-phone');
        var emailField = form.find('#contact-email');
        var messageField = form.find('#contact-content');

        var button = form.find('button[type="submit"]');

        var name = nameField.val();
        var email = emailField.val();
        var phone = phoneField.val();
        var message = messageField.val();

        if(form.attr('disabled') == 'disabled') return false;

        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: { 'action': 'mail', 'name': name, 'email': email, 'phone': phone, 'message': message, 'lang': lang },
            success: function(result)
            {
                if(!result.error) {
                    button.animate({ opacity: 0 }, 200, function() {
                        showMessage(result.message);
                        button.css({ visibility: 'hidden' });
                    });

                    //ga('send', 'pageview', "message-sent");

                    form.attr('disabled', 'disabled');
                } else {
                    showMessage(result.message);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            },
            complete: function() {
                spinner.hide();
            }
        });
    });

    $('.ga-section').viewportChecker({
        classToAdd: '', // Class to add to the elements when they are visible,
        classToAddForFullView: '', // Class to add when an item is completely visible in the viewport
        classToRemove: '', // Class to remove before adding 'classToAdd' to the elements
        removeClassAfterAnimation: false, // Remove added classes after animation has finished
        offset: 0, // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
        invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
        repeat: false, // Add the possibility to remove the class if the elements are not visible
        callbackFunction: function(elem, action){
            var dataga = $(elem).attr('data-ga-id');

            ga('send', 'pageview', dataga);
        }, // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
        scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
    });

    $('.ga-item').click(function() {
        var dataga = $(this).attr('data-ga-id');

        ga('send', 'pageview', dataga);
    });
});
