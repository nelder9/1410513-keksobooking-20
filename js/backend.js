'use strict';
(function () {
  var main = document.querySelector('.main');
  window.backend = {};
  window.backend.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend.save = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(window.successTemplate);
        main.appendChild(fragment);

        var removeSuccess = function (evt) {
          if (evt.key === 'Escape' || evt.target.className === 'success') {
            main.lastChild.remove();
            window.getEnd();
            document.removeEventListener('click', removeSuccess);
            document.removeEventListener('keydown', removeSuccess);
          }
        };
        document.addEventListener('click', removeSuccess);
        document.addEventListener('keydown', removeSuccess);
        onLoad(xhr.response);
      } else {
        var fragment2 = document.createDocumentFragment();
        fragment2.appendChild(window.errorTemplate);
        main.appendChild(fragment2);
        var removeError = function (evt) {
          if (evt.key === 'Escape' || evt.target.className === 'error__button' || evt.target.className === 'error') {
            main.lastChild.remove();
            window.getEnd();
            document.removeEventListener('click', removeError);
            document.removeEventListener('keydown', removeError);
          }
        };
        document.addEventListener('click', removeError);
        document.addEventListener('keydown', removeError);
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {}, function (onError) {
      var warning = document.createElement('div');
      warning.style = 'width: 150px;';
      var newContent = document.createTextNode(onError);
      warning.appendChild(newContent);
      var overlay = document.querySelector('.map');
      overlay.appendChild(warning);
    });

    evt.preventDefault();
  });
})();
