'use strict';

(function () {
  var NUMBER_LENGTH = 9;
  var NICK_NAME_LENGTH = 2;
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
  var mainForm = $('.quiz__main-form');
  var lastScreen = $('.thank-you');
  var contactsNotice = $('.get-results');
  var privacyPolicyStandard = $('#privacy-policy-standard');
  var buttonSubmit = $('.button--submit');

  var disabledSubmitButton = function () {
    buttonSubmit.prop('disabled', true);
    buttonSubmit.removeClass('button--glare');
  };

  var activateSubmitButton = function () {
    buttonSubmit.prop('disabled', false);
    buttonSubmit.addClass('button--glare');
  };

  var addError = function (currentElement) {
    currentElement.addClass('error-hint');
  };

  var removeError = function (currentElement) {
    currentElement.removeClass('error-hint');
  };

  if (contactsNotice.hasClass('get-results--social')) {
    var userDataWrapper = $('.user-date');
    var socialOption = $('.social-option');
    var socialInput = $('.social-option__radio');
    var sociaInputIcon = $('.user-date__icon use');
    var socialUserPhone = $('.user-date__info-block--number');
    var socialUserNickName = $('.user-date__info-block--nickname');
    var cancelButton = $('.get-results__another--another-messenger a');
    var socialNumberInput = $('#user-date-phone-number');
    var socialNumberNick = $('#user-date-nickname');

    disabledSubmitButton();

    var disabledSocialOptions = function () {
      if (socialInput) {
        socialInput.each(function () {
          $(this).prop('disabled', true);
        });
      }
    };

    var activateSocialOptions = function () {
      if (socialInput) {
        socialInput.each(function () {
          $(this).prop('disabled', false);
        });
      }
    };

    var onValidatePrivacyPolicyStandardChange = function () {
      if ($(this).is(':checked')) {
        activateSocialOptions();
      } else {
        disabledSocialOptions();
      }
    };

    privacyPolicyStandard.on('change', onValidatePrivacyPolicyStandardChange);

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

    var hideDataField = function () {
      socialInput.prop('checked', false);
      contactsNotice.removeClass('get-results--open');
      socialOption.removeClass('social-option--hide');
      userDataWrapper.removeClass('user-date--open');
      clearInput();
      disabledSubmitButton();
    };

    socialInput.on('change', function () {
      showDataField($(this).val());
    });

    cancelButton.on('click', function (evt) {
      evt.preventDefault();
      hideDataField();
    });

    var clearInput = function () {
      var inputs = userDataWrapper.find('input');
      inputs.each(function () {
        $(this).val('');
        removeError($(this));
      });
    };

    var validateNumberInput = function (element) {
      if (element.val().length >= NUMBER_LENGTH) {
        removeError(element);
        activateSubmitButton();
      } else {
        addError(element);
        disabledSubmitButton();
      }
    };

    var validateNickInput = function (element) {
      if (element.val().length >= NICK_NAME_LENGTH) {
        removeError(element);
        activateSubmitButton();
      } else {
        addError(element);
        disabledSubmitButton();
      }
    };

    socialNumberInput.on('input', function () {
      validateNumberInput($(this));
    });

    socialNumberNick.on('input', function () {
      validateNickInput($(this));
    });

    $(document).ready(function () {
      socialNumberInput.phonecode({
        preferCo: 'ru',
        default_prefix: '+7'
      });
    });
  } else {
    var onStandardValidateMethodChange = function () {
      if ($(this).is(':checked')) {
        activateSubmitButton();
      } else {
        disabledSubmitButton();
      }
    };

    privacyPolicyStandard.on('change', onStandardValidateMethodChange);
  }

  mainForm.on('submit', function (evt) {
    evt.preventDefault();
    var url = mainForm.attr('action');
    var type = mainForm.attr('method');
    var data = mainForm.serialize();
    $.ajax({
      url: url,
      method: type,
      data: data,
      success: function (data) {
        if (data === 'ok') {
          window.quiz.quizContent.addClass('quiz--open-thank');
          lastScreen.removeClass('thank-you--hidden');
          mainForm.trigger('reset');
        }
      },
      error: function (data) {
        console.error(data);
      }
    });
  });

})();

