'use strict';

(function () {
  var FIRST_SLIDE = 0;
  var PRECENT_REMOVE = 5;
  var ESC_KEY_CODE = 27;
  var PRECENT_CONVERSION = 100;
  var HEIGHT_MANAGER_LINE = 20;
  var WIDTH_TABLET = 990;
  var body = $('body');
  var quizButton = $('.button-calculate');
  var quizContent = $('.quiz');
  var quizClose = $('.quiz__close');
  var quizArrowNext = $('.navigation__button--next');
  var inputRadio = $('.input-wrap__radio');
  var inputCheckbox = $('.input-wrap__checkbox');
  var inputText = $('.input-wrap__content--text-field');
  var title = $('.quiz__change-content');
  var navigationWrapper = $('.navigation');
  var quizSidebar = $('.quiz__right');
  var calculate = $('.calculate-send');
  var quizLeft = $('.quiz__left');
  var quizInner = $('.quiz__inner');
  var managerButton = $('.manager__toggle');
  var managerText = $('.manager__text p');
  var managerTextScroll = $('.manager__text');
  var managerWrapper = $('.manager');
  var headline = $('.quiz__headline');
  var mainSlides = window.slider.sliderMain.find('.slider-main__item');
  var flag = true;

  var openManagerText = function () {
    managerWrapper.toggleClass('manager--show');
  };

  var checkManagerTextHeight = function () {
    if (managerText.outerHeight() > HEIGHT_MANAGER_LINE) {
      managerButton.removeClass('manager__toggle--hidden');
    } else {
      managerButton.addClass('manager__toggle--hidden');
    }
  };

  var onShowManagerBlockClick = function () {
    if (managerText.outerHeight() > HEIGHT_MANAGER_LINE) {
      openManagerText();
    } else {
      managerButton.off('click', onShowManagerBlockClick);
    }
  };

  managerButton.on('click', onShowManagerBlockClick);

  var closeQuiz = function () {
    quizContent.removeClass('quiz--open');
    body.removeClass('body--overflow');
    $(document).off('keydown', onCloseQuizKeyPress);
    $(document).off('click', onCloseOutQuizClick);
    activateQuizNavigationNext();
  };

  var onCloseQuizKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeQuiz();
    }
  };

  var onCloseOutQuizClick = function (evt) {
    if ($(evt.target).hasClass('quiz')) {
      closeQuiz();
    }
  };

  var openQuiz = function (evt) {
    evt.preventDefault();
    quizContent.addClass('quiz--open');
    body.addClass('body--overflow');
    deActivateQuizNavigationNext();
    changeUserContent(FIRST_SLIDE);
    checkManagerTextHeight();

    if (flag) {
      checkSelectedInputFirstSlide(mainSlides, FIRST_SLIDE);
      flag = false;
    }

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

    if (currentSlide === slick.$slides.length - 1) {
      progress = progress - PRECENT_REMOVE;
    }

    progressBar.css('width', progress + '%');
    progressBarText.text(progress);
  };

  var autoSwitchingSlide = function () {
    activateQuizNavigationNext();
    setTimeout("window.slider.sliderMain.slick('slickNext')", 500);
  };

  var onActivateSlideRadioInputChange = function () {
    if ($(this).is(':checked')) {
      var textInputs = $(this).closest('.form-main-group').find('.input-wrap__content--text-field');
      if (textInputs) {
        textInputs.each(function () {
          $(this).removeClass('input-wrap__content--text-checked');
          $(this).val('');
        });
      }
      autoSwitchingSlide();
    }
  };

  var checkInputLength = function (elements) {
    if (elements.length > 0) {
      activateQuizNavigationNext();
    } else {
      deActivateQuizNavigationNext();
    }
  };

  var activateSlideCheckboxInputChange = function (currentElement) {
    var items = currentElement.closest('.form-main-group').find('input:checked');
    if (!currentElement.closest('.slider-main__item').hasClass('slider-main__item--required')) {
      checkInputLength(items);
    }
  };

  var  checkSelectedInputFirstSlide = function (slick, currentSlide) {
    var activeSlide = $(slick[currentSlide]);
    var checkedInput = activeSlide.find('input:checked');
    if (activeSlide.hasClass('slider-main__item--required')) {
      activateQuizNavigationNext();
    } else {
      checkInputLength(checkedInput);
    }
  };

  var checkSelectedInput = function (slick, currentSlide) {
    var activeSlide = $(slick.$slides[currentSlide]);
    var checkedInput = activeSlide.find('input:checked');
    if (activeSlide.find('.slider-main__item').hasClass('slider-main__item--required')) {
      activateQuizNavigationNext();
    } else {
      checkInputLength(checkedInput);
    }
  };

  var validateTextInput = function () {
    var input = $(this).closest('.input-wrap--text-field').find('.input-wrap__input');

    if ($(this).val().length > 0) {
      input.prop('checked', true);
      $(this).addClass('input-wrap__content--text-checked');
      activateSlideCheckboxInputChange($(this));
    } else {
      input.prop('checked', false);
      $(this).removeClass('input-wrap__content--text-checked');
      activateSlideCheckboxInputChange($(this));
    }
  };

  var onShowResultsClick = function () {
    window.slider.sliderMain.addClass('hidden');
    title.addClass('hidden');
    navigationWrapper.addClass('hidden');
    quizSidebar.addClass('hidden');
    calculate.removeClass('calculate-send--hide');
    quizLeft.addClass('quiz__left--last-step');
    quizInner.addClass('quiz__inner--last-step');
  };

  quizButton.on('click', openQuiz);
  inputRadio.on('change', onActivateSlideRadioInputChange);
  inputCheckbox.on('change', function () {
    activateSlideCheckboxInputChange($(this));
  });

  inputText.on('input', validateTextInput);

  var showManagerText = function () {
    managerWrapper.removeClass('manager--hidden-massage');
  };

  var hideManagerText = function () {
    managerWrapper.addClass('manager--hidden-massage');
  };

  var changeUserContent = function (currentSlide) {
    var slides = $('.slider-main .slider-main__item');
    var slide = $(slides[currentSlide]);
    var headlineText = slide.attr('data-title');
    var massageText = slide.attr('data-comment');

    if (headlineText && massageText) {
      showManagerText();
      headline.text(headlineText);
      managerText.text(massageText);
    } else if (headlineText) {
      headline.text(headlineText);
      managerText.text('');
      hideManagerText();
    } else if (massageText) {
      showManagerText();
      managerText.text(massageText);
      headline.text('');
    } else {
      hideManagerText();
    }
  };

  var onValidateLastSlideChange = function () {
    var activesActivesRadio = $(this).closest('.form-main-group').find('input[type="radio"]:checked');
    if (activesActivesRadio.length > 0) {
      setTimeout(onShowResultsClick, 500);
    }
  };

  window.slider.sliderMain.on('afterChange', function (event, slick, currentSlide) {
    getProgressStatus(event, slick, currentSlide);
    checkSelectedInput(slick, currentSlide);
    changeUserContent(currentSlide);
    checkManagerTextHeight();

    if (currentSlide === slick.$slides.length - 1) {
      quizArrowNext.on('click', onShowResultsClick);
      inputRadio.on('change', onValidateLastSlideChange);
    } else {
      inputRadio.off('change', onValidateLastSlideChange);
      quizArrowNext.off('click', onShowResultsClick);
    }
  });

  window.slider.pictureSlider.on('afterChange', function () {
    return false;
  });

  var checkCustomScrollBar = function () {
    if ($(window).width() > WIDTH_TABLET) {
      managerTextScroll.mCustomScrollbar();
    } else {
      managerTextScroll.mCustomScrollbar('disable', true);
    }
  };

  $(document).ready(function () {
    checkCustomScrollBar();

    $(window).on('resize', function () {
      checkCustomScrollBar();
    });

    $(window).on('orientationchange', function () {
      checkCustomScrollBar();
      location.reload();
    });
  });

  window.quiz = {
    ESC_KEY_CODE: ESC_KEY_CODE,
    quizContent: quizContent,
  }

})();
