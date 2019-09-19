var massage = document.querySelector('.manager');
var toggleButton = massage.querySelector('.manager__toggle');
var massageTextHeight = massage.querySelector('.manager__text');

var toggleText = function (button, container, classname) {
  button.addEventListener('click', function () {
    container.classList.toggle(classname);
  });
};
