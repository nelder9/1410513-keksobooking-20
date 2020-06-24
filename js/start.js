'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');

  var getStart = function () {
    window.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < window.mapFilters.children.length; i++) {
      window.mapFilters.children[i].removeAttribute('disabled', true);
    }
  };
  var openStart = document.querySelector('.map__pin--main');

  var start = function () {
    getStart();
    window.random.getArrayOfMocks();
    openStart.removeEventListener('click', start);
    openStart.removeEventListener('keydown', startEnter);
    window.form.validRoom();
  };

  var startEnter = function (evt) {
    if (evt.key === 'Enter') {
      start();
    }
  };

  openStart.addEventListener('click', start);

  openStart.addEventListener('keydown', startEnter);

})();
