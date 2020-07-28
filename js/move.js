'use strict';
(function () {
  window.address = document.querySelector('#address');
  window.address.value = (parseInt(window.mainPin.style.left, 10) + 31) + ', ' + (parseInt(window.mainPin.style.top, 10) + 70);

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (((window.mainPin.offsetTop - shift.y) + 70) < 130 || ((window.mainPin.offsetTop - shift.y) + 70) > 630) {
        return;
      }
      if (((window.mainPin.offsetLeft - shift.x) + 31) < 0 || ((window.mainPin.offsetLeft - shift.x) + 31) > 1200) {
        return;
      }

      window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.address.value = (parseInt(window.mainPin.style.left, 10) + 31) + ', ' + (parseInt(window.mainPin.style.top, 10) + 70);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
