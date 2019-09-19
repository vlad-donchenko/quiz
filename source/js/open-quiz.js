var quizeContant = document.querySelector('.quiz');
var openQuiz = document.querySelector('.button-calculate');
var body = document.querySelector('body');
var closeQuiz = document.querySelector('.quiz__close');

quizeContant.classList.add('quiz--hidden');

openQuiz.addEventListener('click', function () {
  quizeContant.classList.remove('quiz--hidden');
  quizeContant.classList.add('quiz--open');
  body.classList.add('body--overflow')
});

closeQuiz.addEventListener('click', function () {
  quizeContant.classList.add('quiz--hidden');
  quizeContant.classList.remove('quiz--open');
  body.classList.remove('body--overflow')
});
