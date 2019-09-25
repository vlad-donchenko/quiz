var mainSliderNext = $('.navigation__button--next');
var mainSliderPrev = $('.navigation__button--prev');
var progressBarLine = $('.progress-bar__indicator');
var quizSlider = $('.slider-main');
var pictureQuiz = $('.picture-quiz');
var progressBarText = $('.progress-bar__count');

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
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 992,
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
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 992,
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
  }
});

$('.button-calculate').on('click', function () {
  $('.quiz').removeClass('quiz--hidden');
  $('.quiz').addClass('quiz--open');
  $('body').addClass('body--overflow');
  quizSlider.resize();
});

quizSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  var calc = Math.floor(((nextSlide) / (slick.slideCount - 1)) * 100);

  if (nextSlide === slick.slideCount - 1) {
    console.log('Последний слайд');
    calc = calc - (calc / 100 * 5);
  }

  progressBarLine.css('width', calc + '%');
  progressBarText.text(calc);
});

$('.quiz__close').on('click', function () {
  $('.quiz').addClass('quiz--hidden');
  $('.quiz').removeClass('quiz--open');
  $('body').removeClass('body--overflow');
});

$(document).on('keydown', function (e) {
  if (e.keyCode == 27) {
    $('.quiz').addClass('quiz--hidden');
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

quizSlider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
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
  if ($(this).closest('.slick-active').find('.input-wrap__checkbox').is(':checked')) {
    $('.navigation__button--next').removeAttr('disabled');
    $('.navigation__button--next').addClass('button--glare');
  } else {
    $('.navigation__button--next').attr('disabled', 'disabled');
    $('.navigation__button--next').removeClass('button--glare');
  }
});

$('.input-wrap__radio').on('change', function () {
  console.log('Radio was change');
  if ($(this).is(':checked')) {
    console.log('бУДЕТ ПЕРЕХОД АВТО');
    $('.navigation__button--next').removeAttr('disabled');
    $('.navigation__button--next').addClass('button--glare');
    $(this).closest('.slick-active').find('.input-wrap__content--text-field').removeClass('input-wrap__content--text-checked');
    $(this).closest('.slick-active').find('.input-wrap__content--text-field').val('');

    setTimeout("quizSlider.slick('slickNext')", 500);
  } else {
    addDisabled(mainSliderNext, 'button--glare');
  }
});

$(window).resize(function () {
  if ($(window).width() < 768) {
    if ($('.manager__text').height() > 20) {
      console.log($('.manager__text').height());
      $('.manager__toggle').on('click', function () {
        $('.manager').toggleClass('manager--show');
      });
    }
  } else {
    $('.manager__inner').removeClass('manager--show');
    $('.manager__toggle').hide();
  }
});

$('.navigation__button--next').on('click', function () {
  if ($(this).hasClass('slick-disabled')) {
    $('.slider-main').hide();
    $('.quiz__change-content').hide();
    $('.navigation').hide();
    $('.quiz__inner__right').hide();
    $('.calculate-send').show();
    $('.quiz__inner__left').addClass('quiz__inner__left--last-step')
  }
});

$('.button--present').on('click', function (evt) {
  evt.preventDefault();
  $('.bonus-modal').toggleClass('bonus-modal--show');
});

$(document).on('click', function(e) {
  if (!$(e.target).closest(".bonus-modal").length) {
    $('.bonus-modal').removeClass('bonus-modal--show');
  }
  e.stopPropagation();
});

