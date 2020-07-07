'use strict';
(function () {
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
})();
