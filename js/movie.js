
function recaptchaCallback(recaptcha) {
    var captcha = $('#form-captcha');

    captcha.removeClass('error');
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

    var header = $('.site-header .site-header__inner');

    var refreshHeaderHeight = function() {
        var barHeight = bar.outerHeight();

        if(hawk.w > rwdWidth && hawk.h > rwdHeight) {
            var finalHeight = hawk.h - barHeight;

            header.css({ 'height': finalHeight + "px" }).addClass('constant-height');
        } else {
            header.css({ 'height': 'auto', 'min-height': finalHeight + "px" }).removeClass('constant-height');
        }
    }

    var mainAxis = $('#main-axis');
    var mainAxisHeight = 0;

    var extraItems = $('.axis-item--extra-item');
    var additionalValue = 0;

    var section01 = $('.section-01').first();

    var spectacularMenu = $('.spectacular-menu');

    var hamburger = $('.icon-hamburger');

    $(window).scroll(function() {
        scrolled = window.pageYOffset;
        //additionalValue = 0.75 * hawk.h;

        //checkSectionBackground();

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

    refreshVideo();

    var citiesSelect = $('#form-city');
    var schoolsSelect = $('#form-school-type');
    var coursesSelect = $('#form-course');

    var schoolsTitle = schoolsSelect.find('.dropdown__title');
    var coursesTitle = coursesSelect.find('.dropdown__title');

    var city_id = 0;
    var school_id = 0;

    var registerForm = $('#form-register');

    var nameField = registerForm.find('#form-name');
    var surnameField = registerForm.find('#form-surname');
    var phoneField = registerForm.find('#form-phone');
    var emailField = registerForm.find('#form-email');

    var captchaField = registerForm.find('#form-captcha');
    var requirementsField = registerForm.find('#form-requirements');

    nameField.find('input').change(function() {
        if($(this).val().length > 0) {
            nameField.removeClass('error');
        }
    });

    surnameField.find('input').change(function() {
        if($(this).val().length > 0) {
            surnameField.removeClass('error');
        }
    });

    phoneField.find('input').change(function() {
        if(isPhoneNumber($(this).val())) {
            phoneField.removeClass('error');
        }
    });

    emailField.find('input').change(function() {
        if(isEmail($(this).val())) {
            emailField.removeClass('error');
        }
    });

    requirementsField.click(function(e) {
        if($(this).find('input').is(':checked')) {
            requirementsField.removeClass('error');
        }
    });

    citiesSelect.find('.dropdown-choice-field__inner').click(function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.cancelBubble = true;

        if(!citiesSelect.find('.dropdown__list').is(":visible")) {
            return;
        }

        //console.log(e.target);

        city_id = $(this).parent().find('input').attr('data-id');

        schoolsTitle.html(schoolsTitle.attr('data-default'));
        coursesTitle.html(coursesTitle.attr('data-default'));

        coursesSelect.find('.dropdown__list').html('');

        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: { 'action': 'load-school-types', 'city-id': city_id},
            success: function(result) {
                console.log(result);

                if(!result.error) {
                    schoolsSelect.find('.dropdown__list').html(result.html);

                    citiesSelect.removeClass('error');

                    for (var i = 0; i < hawk.variables.dropdowns.length; i++) {
                        hawk.variables.dropdowns[i].refresh();
                    }

                    refreshDropdowns();
                    refreshSchools();
                } else {
                    console.log("BĹÄd");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var err = JSON.parse(jqXHR.responseText);

                console.log(err);

                showMessage("WystÄpiĹ problem techniczny, proszÄ sprĂłbowaÄ pĂłĹşniej. " + err);
            },
            complete: function() {
                //spinner.hide();
            }
        });
    });

    var refreshSchools = function() {
        schoolsSelect.find('.dropdown-choice-field__inner').unbind('click').click(function(e) {
            e.stopPropagation();

            if(!schoolsSelect.find('.dropdown__list').is(":visible")) {
                return;
            }

            school_id = $(this).parent().find('input').attr('data-id');

            coursesTitle.html(coursesTitle.attr('data-default'));

            $.ajax({
                type: "POST",
                url: "/ajax.php",
                dataType: "json",
                data: { 'action': 'load-courses', 'city-id': city_id, 'school-id': school_id },
                success: function(result) {
                    console.log(result);

                    if(!result.error) {
                        schoolsSelect.removeClass('error');

                        coursesSelect.find('.dropdown__list').html(result.html);

                        for (var i = 0; i < hawk.variables.dropdowns.length; i++) {
                            hawk.variables.dropdowns[i].refresh();
                        }

                        refreshDropdowns();

                        refreshCourses();
                    } else {
                        console.log("BĹÄd");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var err = JSON.parse(jqXHR.responseText);

                    showMessage("WystÄpiĹ problem techniczny, proszÄ sprĂłbowaÄ pĂłĹşniej. " + err);
                },
                complete: function() {
                    //spinner.hide();
                }
            });
        });
    }

    var refreshCourses = function() {
        coursesSelect.find('.dropdown-choice-field__inner').click(function(e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true;

            coursesSelect.removeClass('error');
        });
    }

    refreshSchools();

    registerForm.submit(function(e) {
        e.preventDefault();

        var rawForm = this;

        var lang = $('html').attr('lang');
        var form = registerForm;

        if(form.attr('disabled') == 'disabled') return false;

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

        var button = form.find('button[type="submit"]');

        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            cache: false,
            processData: false, // Don't process the files
            contentType: false,
            data: new FormData(rawForm),
            success: function(result) {
                console.log(result);

                if(!result.error) {
                    ga('send', 'pageview', "formularz-rejestracja-online");

                    button.animate({ opacity: 0 }, 200, function() {
                        showMessage(result.message);
                        button.css({ visibility: 'hidden' });
                    });
                } else {
                    showMessage(result.message);

                    if(isInObject('city', result.errorFields)) {
                        citiesSelect.addClass('error');
                    } else {
                        citiesSelect.removeClass('error');
                    }

                    if(isInObject('school', result.errorFields)) {
                        schoolsSelect.addClass('error');
                    } else {
                        schoolsSelect.removeClass('error');
                    }

                    if(isInObject('course', result.errorFields)) {
                        coursesSelect.addClass('error');
                    } else {
                        coursesSelect.removeClass('error');
                    }

                    if(isInObject('name', result.errorFields)) {
                        nameField.addClass('error');
                    } else {
                        nameField.removeClass('error');
                    }

                    if(isInObject('surname', result.errorFields)) {
                        surnameField.addClass('error');
                    } else {
                        surnameField.removeClass('error');
                    }

                    if(isInObject('phone', result.errorFields)) {
                        phoneField.addClass('error');
                    } else {
                        phoneField.removeClass('error');
                    }

                    if(isInObject('email', result.errorFields)) {
                        emailField.addClass('error');
                    } else {
                        emailField.removeClass('error');
                    }

                    if(isInObject('captcha', result.errorFields)) {
                        captchaField.addClass('error');
                    } else {
                        captchaField.removeClass('error');
                    }

                    if(isInObject('requirements', result.errorFields)) {
                        requirementsField.addClass('error');
                    } else {
                        requirementsField.removeClass('error');
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var err = JSON.parse(jqXHR.responseText);

                showMessage("WystÄpiĹ problem techniczny, proszÄ sprĂłbowaÄ pĂłĹşniej. " + err);
            },
            complete: function() {
                spinner.hide();
            }
        });
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

    $('input, textarea').placeholder();

    $(window).resize(function() {
        w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        refreshVideo();
        refreshHeaderHeight();
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
