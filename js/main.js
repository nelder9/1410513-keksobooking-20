'use strict';
(function () {
  window.map = document.querySelector('.map');
  window.successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  window.errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var mapFilters = document.querySelector('.map__filters');
  window.mapFilters = mapFilters;
  window.resetForm = document.querySelector('.ad-form__reset');
  for (var j = 0; j < mapFilters.children.length; j++) {
    mapFilters.children[j].setAttribute('disabled', true);
  }
  window.getEnd = function () {

    var adForm = document.querySelector('.ad-form');
    window.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    for (var i = 0; i < window.mapFilters.children.length; i++) {
      window.mapFilters.children[i].setAttribute('disabled', true);
    }
    for (var k = 0; k < adForm.children.length; k++) {
      adForm.children[k].setAttribute('disabled', true);
    }
    var newPins = document.querySelectorAll('.map__pin');
    newPins.forEach(function (element) {
      if (element.className === 'map__pin' || element.className === 'map__pin map__pin--active') {
        element.remove();
      }
    });
    window.mainPin.addEventListener('click', window.start);
    window.mainPin.addEventListener('keydown', window.startEnter);
    if (window.popupIsOpened) {
      window.closePopup();
    }
    window.mock = [];
    window.filteredPins = [];
    adForm.reset();
    mapFilters.reset();
    window.mainPin.style = 'left: 570px; top: 375px;';
    window.address.value = (parseInt(window.mainPin.style.left, 10) + 31) + ', ' + (parseInt(window.mainPin.style.top, 10) + 70);
  };
  window.resetForm.addEventListener('click', window.getEnd);
})();
