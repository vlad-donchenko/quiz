'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var PRECENT_CONVERSION = 100;
  //var PRECENT_REMOVE = 5;
  var quizButton = $('.button-calculate');
  var quizContent = $('.quiz');
  var quizClose = $('.quiz__close');
  var quizArrowNext = $('.navigation__button--next');
  var inputRadio = $('.input-wrap__radio');
  var inputCheckbox = $('.input-wrap__checkbox');
  //var quizArrowPrev = $('.navigation__button--prev');

  var reinitializeMainSlider = function () {
    window.slider.sliderMain.slick('reinit');
  };

  var reinitializePictureSlider = function () {
    window.slider.pictureSlider.slick('reinit');
  };

  var closeQuiz = function () {
    quizContent.removeClass('quiz--open');
    $(document).off('keydown', onCloseQuizKeyPress);
    $(document).off('click', onCloseOutQuizClick);
    activateQuizNavigationNext();
  };

  var onCloseQuizKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeQuiz();
    }
  };

  var  onCloseOutQuizClick = function (evt) {
    if ($(evt.target).hasClass('quiz')) {
      closeQuiz();
    }
  };

  var openQuiz = function (evt) {
    evt.preventDefault();
    quizContent.addClass('quiz--open');
    reinitializeMainSlider();
    reinitializePictureSlider();
    deActivateQuizNavigationNext();

    quizClose.on('click', function (evt) {
      evt.preventDefault();
      closeQuiz();
    });

    $(document).on('keydown', onCloseQuizKeyPress);
    $(document).on('click', onCloseOutQuizClick);
  };

  var deActivateQuizNavigationNext = function () {
    quizArrowNext.attr('disabled', 'disabled');
  };

  var activateQuizNavigationNext = function () {
    quizArrowNext.removeAttr('disabled', 'disabled');
  };

  var getProgressStatus = function (event, slick, currentSlide) {
    var progressBar = $('.progress-bar__indicator');
    var progressBarText = $('.progress-bar__count');
    var progress = Math.floor(((currentSlide) / (slick.slideCount - 1)) * PRECENT_CONVERSION);
    progressBar.css('width',  progress + '%');
    progressBarText.text(progress);
  };

  var autoSwitchingSlide = function () {
    activateQuizNavigationNext();
    setTimeout("window.slider.sliderMain.slick('slickNext')", 500);
  };

  var onActivateSlideRadioInputChange = function () {
    if (inputRadio.is(':checked')) {
      autoSwitchingSlide();
    }
  };

  var onActivateSlideCheckboxInputChange = function () {
    var items = $(this).closest('.form-main-group').find('input:checked');

    if (items.length > 0) {
      activateQuizNavigationNext();
    } else {
      deActivateQuizNavigationNext();
    }
  };

  var checkSelectedInput = function (event, slick, currentSlide) {
    var activeSlide = $(slick.$slides[currentSlide]);
    var checkedInput = activeSlide.find('input:checked');

    if (checkedInput.length > 0) {  // Нужно взять в функцию
      activateQuizNavigationNext();
    } else {
      deActivateQuizNavigationNext();
    }
  };

  quizButton.on('click', openQuiz);
  inputRadio.on('change', onActivateSlideRadioInputChange);
  inputCheckbox.on('change', onActivateSlideCheckboxInputChange);

  window.slider.sliderMain.on('afterChange', function (event, slick, currentSlide) {
    getProgressStatus(event, slick, currentSlide);
    checkSelectedInput(event, slick, currentSlide);
  });

  window.slider.pictureSlider.on('afterChange', function () {
    return false;
  });

})();
