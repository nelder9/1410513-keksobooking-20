'use strict';
(function () {
  var mapPin = document.querySelector('.map__pin');
  var address = document.querySelector('#address');
  address.value = (parseInt(mapPin.style.left, 10) + 31) + ', ' + (parseInt(mapPin.style.top, 10) + 70);
})();
