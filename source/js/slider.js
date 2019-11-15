'use strict';

(function () {
  var sliderMain = $('.slider-main');
  var pictureSlider = $('.picture-quiz');

  sliderMain.slick({
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

  var getPictureSlider = function (slider) {
    return slider.slick({
      dots: false,
      infinite: false,
      swipe: true,
      slidesToScroll: 4,
      slidesToShow: 4,
      speed: 500,
      prevArrow: slider.closest('.slider-main__item').find('.picture-quiz__arrow--prev'),
      nextArrow: slider.closest('.slider-main__item').find('.picture-quiz__arrow--next'),
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
    });
  };

  var renderPictureSlider = function (slider) {
    slider.each(function () {
      getPictureSlider($(this));
    });
  };

  renderPictureSlider(pictureSlider);

  window.slider = {
    sliderMain: sliderMain,
    pictureSlider: pictureSlider
  }

})();
