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
    FACEBOOK: '#icon-option-facebook'
  };
  var contactsNotice = $('.get-results');
  var buttonSubmit = $('.button--submit');
  var userDataWrapper = $('.user-date');
  var socialOption = $('.social-option');
  var socialInput = $('.social-option__radio');
  var sociaInputIcon = $('.user-date__icon use');
  var socialUserPhone = $('.user-date__info-block--number');
  var socialUserNickName = $('.user-date__info-block--nickname');
  var cancelButton = $('.get-results__another--another-messenger a');

  var showDataField = function (inputValue) {
    sociaInputIcon.attr('xlink:href', Icons[inputValue.toUpperCase()]);
    contactsNotice.addClass('get-results--open');
    socialOption.addClass('social-option--hide');
    userDataWrapper.addClass('user-date--open');

    if (inputValue === SocialNetwork.INSTAGRAM || inputValue === SocialNetwork.FACEBOOK) {
      socialUserNickName.removeClass('user-date__info-block--hide');
      socialUserPhone.addClass('user-date__info-block--hide');
    } else {
      socialUserNickName.addClass('user-date__info-block--hide');
      socialUserPhone.removeClass('user-date__info-block--hide');
    }
  };

  var hideDaraField = function () {
   var checkedInput = $('socialOption').find('.social-option__radio:checked');
    checkedInput.prop('checked', false);
    contactsNotice.removeClass('get-results--open');
    socialOption.removeClass('social-option--hide');
    userDataWrapper.removeClass('user-date--open');
  };

  socialInput.on('change', function () {
    showDataField($(this).val());
  });

  cancelButton.on('click' ,function (evt) {
    evt.preventDefault();
    hideDaraField();
  });

})();

