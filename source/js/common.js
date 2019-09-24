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

/*
pictureQuiz.slick({
  dots: false,
  infinite: false,
  swipe: true,
  speed: 300,
  slidesToShow: 4,
});
*/


pictureQuiz.each(function() {
  if ($(this).is(".picture-quiz--checkbox")) {
    $(this).slick({
      dots: false,
      infinite: false,
      swipe: true,
      speed: 300,
      slidesToShow: 4,
      prevArrow: $(this).parent().find('.picture-quiz__arrow--prev'),
      nextArrow: $(this).parent().find('.picture-quiz__arrow--next')
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      return false;
    });
  }
  else if ($(this).is(".type-two-carousel")){
    $(this).slick({
      dots: true,
      infinite: true,
      slidesToShow: 6
    });
  }
  else {
    $(this).slick();
  }
});


$('.button-calculate').on('click', function () {
  $('.quiz').removeClass('quiz--hidden');
  $('.quiz').addClass('quiz--open');
  $('body').addClass('body--overflow');
  quizSlider.resize();
  /*pictureQuiz.resize();*/
});

quizSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  console.log(slick);
  var calc = Math.floor(((nextSlide) / (slick.slideCount - 1)) * 100);

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
  } else {
    addDisabled(mainSliderNext, 'button--glare');
  }
});

$('.slider-main .slick-active input').on('change', function () {
  console.log('Сработало собитие на изменения');
  if ($('.options__radio').is(':checked')) {
    quizSlider.slick('slickNext');
    $('.navigation__button--next').removeAttr('disabled');
  }
  addDisabled(mainSliderNext, 'button--glare');
});

$('.options__content--text-field').on('input', function () {
  console.log($(this).val());
  if ($(this).val()) {
    $(this).closest('.options__item--text-field').find('.options__checkbox').prop("checked", true);
    $(this).addClass('options__content--text-checked');
    $('.navigation__button--next').removeAttr('disabled');
  } else {
    $(this).closest('.options__item--text-field').find('.options__checkbox').prop("checked", false);
    $(this).removeClass('options__content--text-checked');
    $('.navigation__button--next').attr('disabled', 'disabled');
  }
});

$('.options__checkbox').on('change', function () {
  if ($(this).closest('.slick-active').find('.options__checkbox').is(':checked')) {
    console.log('options__checkbox on');
    $('.navigation__button--next').removeAttr('disabled');
  } else {
    console.log('all options__checkbox off');
    $('.navigation__button--next').attr('disabled', 'disabled');
  }
});

