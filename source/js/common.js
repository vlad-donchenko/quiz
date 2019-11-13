
/*
var mainSliderNext = $('.navigation__button--next');
var mainSliderPrev = $('.navigation__button--prev');
var progressBarLine = $('.progress-bar__indicator');
var quizSlider = $('.slider-main');
var pictureQuiz = $('.picture-quiz');
var progressBarText = $('.progress-bar__count');
var socialOption = $('.social-option');
var userDate = $('.user-date');
var getResultsSocial = $('.get-results--social');
var imagesLinks = ['icon-option-phone', 'icon-option-viber', 'icon-option-telegram', 'icon-option-whatsapp', 'icon-option-instagram', 'icon-option-facebook'];
$('.quiz').addClass('quiz--hidden');

quizSlider.slick({
  dots: false,
  infinite: false,
  swipe: false,
  speed: 300,
  fade: true,
  slidesToShow: 1,
  adaptiveHeight: true,
  prevArrow: $('.navigation__button--prev'),
  nextArrow: $('.navigation__button--next'),
});

var onOpenMassage = function () {
  $('.manager').toggleClass('manager--show');
};

$('.manager__toggle').on('click', function () {
  if ($('.manager__inner').height() > 20) {
    onOpenMassage();
  }
});

var hiddenMassage = function () {
  if ($(window).width() > 768 || $('.manager__text').height() < 20) {
    $('.manager__toggle').hide();
  } else {
    $('.manager__toggle').show();
  }
};

var managerText = $('.manager__text p');
var managerTextWrapper = $('.manager__text');
var managerDecor = $('.manager__decor');


var managerTextClose = function () {
  if (managerText.height() === 0 && $(window).width() > 990) {
    managerTextWrapper.css('opacity', '0');
    managerDecor.css('opacity', '0');
  } else if (managerText.height() > 0 && $(window).width() > 990) {
    managerTextWrapper.css('opacity', '1');
    managerDecor.css('opacity', '1');
  }
};

pictureQuiz.each(function () {
  if ($(this).is(".picture-quiz--checkbox")) {
    $(this).slick({
      dots: false,
      infinite: false,
      swipe: true,
      slidesToScroll: 4,
      slidesToShow: 4,
      speed: 700,
      prevArrow: $(this).parent().find('.picture-quiz__arrow--prev'),
      nextArrow: $(this).parent().find('.picture-quiz__arrow--next'),
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      return false;
    });
  } else if ($(this).is(".picture-quiz--radio")) {
    $(this).slick({
      dots: false,
      infinite: false,
      swipe: true,
      slidesToScroll: 4,
      slidesToShow: 4,
      speed: 700,
      prevArrow: $(this).parent().find('.picture-quiz__arrow--prev'),
      nextArrow: $(this).parent().find('.picture-quiz__arrow--next'),
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      return false;
    });
  }
});

$('.button-calculate').on('click', function () {
  $('.quiz').addClass('quiz--open');
  $('body').addClass('body--overflow');
  quizSlider.resize();
  quizSlider.slick('setPosition');
  pictureQuiz.slick('setPosition');
  hiddenMassage();
  managerTextClose();
});

$(window).on('resize', function () {
  quizSlider.slick('reinit');
  pictureQuiz.slick('reinit');
});

$(window).on('resize', function () {
  quizSlider.slick('reinit');
  pictureQuiz.slick('reinit');
});

quizSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  var calc = Math.floor(((nextSlide) / (slick.slideCount - 1)) * 100);

  if (nextSlide === slick.slideCount - 1) {
    calc = calc - (calc / 100 * 5);
  }

  progressBarLine.css('width', calc + '%');
  progressBarText.text(calc);
});

var showContactsPage = function () {
  $('.slider-main').hide();
  $('.quiz__change-content').hide();
  $('.navigation').hide();
  $('.quiz__right').addClass('quiz__right--hidden');
  $('.calculate-send').removeClass('calculate-send--hide');
  $('.quiz__left').addClass('quiz__left--last-step');
  $('.quiz__inner').addClass('quiz__inner--last-step')
};

$('.quiz__close').on('click', function () {
  $('.quiz').removeClass('quiz--open');
  $('body').removeClass('body--overflow');
});

$(document).on('keydown', function (e) {
  if (e.keyCode == 27) {
    $('.quiz').removeClass('quiz--open');
    $('body').removeClass('body--overflow');
  }
});

var addDisabled = function (buttonClass, animationName) {
  buttonClass.attr('disabled', 'disabled');
  buttonClass.removeClass(animationName);
};

var removeDisabled = function (buttonClass, animationName) {
  buttonClass.removeAttr('disabled', 'disabled');
  buttonClass.addClass(animationName);
};

addDisabled(mainSliderNext, 'button--glare');

quizSlider.on('afterChange', function (event, slick, currentSlide) {
  var title = $(slick.$slides[currentSlide]).find('.slider-main__item').attr('data-title');
  var massage = $(slick.$slides[currentSlide]).find('.slider-main__item').attr('data-comment');
  $('.manager__text p').text(massage);
  $('.quiz__headline').text(title);
  hiddenMassage();
  managerTextClose();

  if (currentSlide === slick.slideCount - 1) {
    $(slick.$slides[currentSlide]).addClass('slick-slide--last');
  } else {
    $(slick.$slides).removeClass('slick-slide--last');
  }
});

quizSlider.on('afterChange', function (slick, currentSlide) {
  $('.navigation__button--next').removeClass('button--no-event');

  if ($('.slider-main .slick-active input').is(':checked')) {
    $('.navigation__button--next').removeAttr('disabled');
    $('.navigation__button--next').addClass('button--glare');
  } else {
    $('.navigation__button--next').attr('disabled', 'disabled');
    $('.navigation__button--next').removeClass('button--glare');
  }
});

$('.input-wrap__content--text-field').on('input', function () {
  if ($(this).val()) {
    if ($(this).closest('.input-wrap--text-field').find('.input-wrap__input')) {
      $(this).closest('.input-wrap--text-field').find('.input-wrap__input').prop("checked", true);
      $(this).addClass('input-wrap__content--text-checked');
      $('.navigation__button--next').removeAttr('disabled');
      $('.navigation__button--next').addClass('button--glare');
    }
  } else {
    $(this).closest('.input-wrap--text-field').find('.input-wrap__input').prop("checked", false);
    $(this).removeClass('input-wrap__content--text-checked');

    if ($(this).val() === '' && $(this).closest('.slick-active').find('.input-wrap__checkbox').is(':checked')) {
      return false
    } else {
      $('.navigation__button--next').attr('disabled', 'disabled');
      $('.navigation__button--next').removeClass('button--glare');
    }

    if ($(this).closest('.input-wrap--text-field').find('.input-wrap__radio')) {
      $('.navigation__button--next').attr('disabled', 'disabled');
      $('.navigation__button--next').removeClass('button--glare');
    }
  }
});

$('.input-wrap__checkbox').on('change', function () {
  if ($(this).closest('.slick-slide').find('.input-wrap__checkbox').is(':checked')) {
    $('.navigation__button--next').removeAttr('disabled');
    $('.navigation__button--next').addClass('button--glare');
  } else {
    $('.navigation__button--next').attr('disabled', 'disabled');
    $('.navigation__button--next').removeClass('button--glare');
  }
});

$('.input-wrap--picture .input-wrap__checkbox').on('change', function () {
  if ($(this).closest('.picture-quiz--checkbox').find('.input-wrap__checkbox').is(':checked')) {
    $('.navigation__button--next').removeAttr('disabled');
    $('.navigation__button--next').addClass('button--glare');
  } else {
    $('.navigation__button--next').attr('disabled', 'disabled');
    $('.navigation__button--next').removeClass('button--glare');
  }
});

$('.input-wrap__radio').on('change', function () {
  if ($(this).is(':checked')) {
    $('.navigation__button--next').removeAttr('disabled');
    $('.navigation__button--next').addClass('button--glare');
    if (!$(this).closest('.slick-slide').hasClass('slick-slide--last')) {
      $('.navigation__button--next').addClass('button--no-event');
    } else {
      $('.navigation__button--next').removeClass('button--no-event');
      showContactsPage();

    }
    $(this).closest('.slick-active').find('.input-wrap__content--text-field').removeClass('input-wrap__content--text-checked');
    $(this).closest('.slick-active').find('.input-wrap__content--text-field').val('');

    setTimeout("quizSlider.slick('slickNext')", 500);
  } else {
    addDisabled(mainSliderNext, 'button--glare');
  }
});

$('.button--present').on('click', function (evt) {
  evt.preventDefault();
  $('.bonus-modal').toggleClass('bonus-modal--show');
});

$(document).on('click', function (e) {
  if (!$(e.target).closest(".bonus-modal").length) {
    $('.bonus-modal').removeClass('bonus-modal--show');
  }
  e.stopPropagation();
});

var onValidatePrivacyPolicy = function () {
  if ($(this).is(':checked')) {
    $('.social-option__radio').removeAttr('disabled');
    $('.get-results--standard .button--submit').removeAttr('disabled', 'disabled');
    $('.get-results--standard .button--submit').addClass('button--glare');
  } else {
    $('.social-option__radio').attr('disabled', 'disabled');
    $('.get-results--standard .button--submit').attr('disabled', 'disabled');
    $('.get-results--standard .button--submit').removeClass('button--glare');
  }
};

var onOpenInput = function () {
  for (var i = 0; i < imagesLinks.length; i++) {
    var afterreplace = imagesLinks[i].replace('icon-option-', '');
    if (afterreplace.indexOf($(this).val()) !== -1) {
      $('.user-date__icon use').attr('xlink:href', '#' + imagesLinks[i]);
      socialOption.addClass('social-option--hide');
      userDate.addClass('user-date--open');
      getResultsSocial.addClass('get-results--open');

      if ($(this).val() === 'facebook' || $(this).val() === 'instagram') {
        $('.user-date__info-block--nickname').removeClass('user-date__info-block--hide');
      } else {
        $('.user-date__info-block--number').removeClass('user-date__info-block--hide');
      }
    }
  }
};

$('.get-results--social .button--submit').attr('disabled', 'disabled');
$('.get-results--social .button--submit').removeClass('button--glare');

var oncheckSocialInput = function () {
  if (!($(this).val())) {
    $('.get-results--social .button--submit').attr('disabled', 'disabled');
  } else {
    $('.get-results--social .button--submit').removeAttr('disabled', 'disabled');
    $('.get-results--social .button--submit').addClass('button--glare');
  }
};

$('#user-date-phone-number').on('input', oncheckSocialInput);
$('#user-date-nickname').on('input', oncheckSocialInput);

var oncloseInput = function () {
  getResultsSocial.removeClass('get-results--open');
  socialOption.removeClass('social-option--hide');
  userDate.removeClass('user-date--open');
  $('.user-date__info-block--nickname').addClass('user-date__info-block--hide');
  $('.user-date__info-block--number').addClass('user-date__info-block--hide');
  $('#user-date-nickname').val('');
  $('#user-date-phone-number').val('');
  $('.get-results--social .button--submit').attr('disabled', 'disabled');
  $('.get-results--social .button--submit').removeClass('button--glare');
};

$('.get-results__another--another-messenger a').on('click', oncloseInput);

$('#privacy-policy-standard').on('change', onValidatePrivacyPolicy);
$('.social-option__radio').on('click', onOpenInput);

$(function () {
  $("#user-date-phone-number").phonecode({
    preferCo: 'ua',
    default_prefix: '380'
  });
});

$(document).mouseup(function (e) {
  var div = $(".quiz__inner");
  if (!div.is(e.target)
    && div.has(e.target).length === 0) {
    $('.quiz').removeClass('quiz--open');
    $('.quiz').addClass('quiz--hidden');
  }
});

$('.navigation__button--next').on('click', function () {
  if ($(this).closest('.wrapper').find('.slick-slide').hasClass('slick-slide--last')) {
    showContactsPage();
  }
});

$(document).ready(function () {
  if ($(window).width() > 990) {
    $(".manager__text").mCustomScrollbar();
  }
});

$(window).on('resize', function () {
  if ($(window).width() > 990) {
    $(".manager__text").mCustomScrollbar();
  } else {
    $(".manager__text").mCustomScrollbar('disable', true);
  }
});

$(window).on('orientationchange', function () {
  if ($(window).width() > 990) {
    $(".manager__text").mCustomScrollbar();
  } else {
    $(".manager__text").mCustomScrollbar('disable', true);
  }
});

var phoneListButton = $('.social__item--phone .social__link');
var phoneListWrapper = $('.social__item--phone');

var onClosePhoneList = function (evt) {
  if (!$(evt.target).closest('.social__item--phone').length) {
    phoneListWrapper.removeClass('social__item--open-sub');
    $(document).off('click', onClosePhoneList);
  }
};

var onOpenPhoneList = function (evt) {
  evt.preventDefault();
  phoneListWrapper.toggleClass('social__item--open-sub');
  $(document).on('click', onClosePhoneList);
};

phoneListButton.on('click', onOpenPhoneList);

$(document).ready(function () {
  var slidersItems = $('.slider-main .slider-main__item');
  $('.manager__text p').text($(slidersItems[0]).attr('data-comment'));
  $('.quiz__headline').text($(slidersItems[0]).attr('data-title'));
});
*/
