'use strict';

(function () {
  var bonusModal = $('.bonus-modal');
  var buttonPresent = $('.button--present');
  var buttonPhone = $('.social__item--phone .social__link');
  var phoneModal = $('.social__item--phone');

  var closeBonusModal = function () {
    bonusModal.removeClass('bonus-modal--show');
    $(document).off('keydown', onCloseBonusModalKeydown);
    $(document).off('click', onCloseBonusModalPostureClick);
  };

  var onCloseBonusModalPostureClick = function (evt) {
   if (!$(evt.target).closest('.bonus-modal--show').length) {
     closeBonusModal();
   }
  };

  var onCloseBonusModalKeydown = function (evt) {
    if (evt.keyCode === window.quiz.ESC_KEY_CODE) {
      closeBonusModal();
    }
  };

  var onOpenBonusModalClick = function (evt) {
    evt.preventDefault();
    bonusModal.toggleClass('bonus-modal--show');
    $(document).on('keydown', onCloseBonusModalKeydown);
    $(document).on('click', onCloseBonusModalPostureClick);
  };

  var closePhoneModal = function () {
    phoneModal.removeClass('social__item--open-sub');
    $(document).off('click', onClosePhoneModalKeydown);
  };

  var onClosePhoneModalPostureClick = function (evt) {
    if (!$(evt.target).closest('.social__item--open-sub').length) {
      closePhoneModal();
    }
  };

  var onClosePhoneModalKeydown = function (evt) {
    if (evt.keyCode === window.quiz.ESC_KEY_CODE) {
      closePhoneModal();
    }
  };

  var onOpenPhoneModalClick = function (evt) {
    evt.preventDefault();
    phoneModal.toggleClass('social__item--open-sub');
    $(document).on('keydown', onClosePhoneModalKeydown);
    $(document).on('click', onClosePhoneModalPostureClick);
  };

  buttonPresent.on('click', onOpenBonusModalClick);
  buttonPhone.on('click', onOpenPhoneModalClick);

})();
