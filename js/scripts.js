$(document).ready(function() {

  //axis

  var docHeight = $(document).height();
  var axisLeft = windowWidth*0.65;
  var axisTopOffset = $('.axis-container').offset().top;
  docHeight = docHeight - axisTopOffset;
  var scrolled = window.pageYOffset;
  var axisMainHeight;
  var windowHeight = $(window).height();
  var additionalValue = windowHeight * 0.7;
  var winWidth = $(window).width();

  var headerTop = $('header').height();


  $('#submit').on('click', function(e) {
    e.preventDefault();
  })


  var windowWidth = $(window).width();
  var siteLogoRight;
  var jwLogoLeft;

  $(window).on('resize', function() {
    windowWidth = $(window).width();
    if (windowWidth < 480) {
      siteLogoRight = (windowWidth/2 - ($('#bottom-site-logo').width()/2))-20;
      $('#bottom-site-logo').css('right', siteLogoRight);
      $('#bottom-site-logo').css('bottom', 60);
    }
    else {
      $('#bottom-site-logo').css('right', 20);
      $('#bottom-site-logo').css('bottom', 20);
    }
  })

  $(window).on('resize', function() {
    windowWidth = $(window).width();
    if (windowWidth < 480) {
      jwLogoLeft = (windowWidth/2 - ($('#bottom-jw-logo').width()/2))+5;
      $('#bottom-jw-logo').css('left', jwLogoLeft);
      $('#bottom-jw-logo').css('bottom', 0);
    }
    else {
      $('#bottom-jw-logo').css('left', 20);
      $('#bottom-jw-logo').css('bottom', 40);
    }

    subAxisOffset = $('.site-section--02').offset().top;
    subAxisLeft = ($('#axis-container').width()/2)-($('#sub-axis').width()/2);
    mainAxisLeft = ($('#axis-container').width()/2)-($('#sub-axis').width()/2);

  })



  $('#axis-container').height(docHeight);
  $('#axis-container').css('left', axisLeft + 'px');
  var title01 = $('.site-section--01').find('.section-title');
  var title01Offset = title01.offset().top;
  title01Offset += parseInt(title01.css('padding-top'));
  var titleLeft = ($('#main-axis').offset().left);
  var subAxisOffset = $('.site-section--03').offset().top - axisTopOffset - 15;
  console.log(subAxisOffset);
  var subAxisHeight = $('.site-section--03').height();
  var subAxisLeft = ($('#axis-container').width()/2)-($('#sub-axis').width()/2);
  var mainAxisLeft = ($('#axis-container').width()/2)-($('#sub-axis').width()/2);



  $('#axis-decoration__01').css('top', title01Offset + 'px');
  $('#axis-decoration__01').css('left', titleLeft + 'px');
  $('#sub-axis').css('top', subAxisOffset);
  $('#main-axis').css('left', mainAxisLeft);

  $(window).on('scroll', function() {

    scrolled = window.pageYOffset;
    if (scrolled > axisTopOffset/2 && winWidth >= 1300) {
      axisMainHeight = scrolled - axisTopOffset + additionalValue;
      $('#main-axis').height(axisMainHeight);
    }
    else {
      $('#main-axis').height(0);
    }

    if (scrolled > 0.95*($(document).height()-axisTopOffset)) {
      $('#main-axis').height($(document).height()-axisTopOffset-15);
    }

    $('#sub-axis').height(subAxisHeight);

    if(scrolled > axisTopOffset/2-100) {
      $('.axis-dot').css('opacity', '1');
    }
    else {
      $('.axis-dot').css('opacity', '0');
    }

  })





})
