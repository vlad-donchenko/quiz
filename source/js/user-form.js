'use strict';

(function () {
  var SocialNetwork = {
    INSTAGRAM: 'instagram',
    FACEBOOK: 'facebook'
  };
  var Icons = {
    PHONE: '#icon-option-phone',
    VIBER: '#icon-option-viber',
    TELEGRAM: '#icon-option-telegram',
    WHATSAPP: '#icon-option-whatsapp',
    INSTAGRAM: '#icon-option-instagram',
    FACEBOOK: '#facebook'
  };
  var contactsNotice = $('.get-results');
  var buttonSubmit = $('.button--submit');
  var socialInput = $('.social-option__radio');
  var sociaInputIcon = $('.user-date__icon use');
  var socialUserPhone = $('.user-date__info-block--number');

  var showDataField = function (inputValue) {
    sociaInputIcon.attr('xlink:href', Icons[inputValue.toUpperCase()]);
    if (inputValue === SocialNetwork.INSTAGRAM || inputValue === SocialNetwork.FACEBOOK) {
      socialUserPhone.removeClass('user-date__info-block--hide');
    }
  };

  socialInput.on('change', function () {
    console.log('value');
  })
})();

