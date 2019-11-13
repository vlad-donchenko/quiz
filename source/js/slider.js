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

  pictureSlider.slick({
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
  });

  window.slider = {
    sliderMain: sliderMain,
    pictureSlider: pictureSlider
  }

})();
