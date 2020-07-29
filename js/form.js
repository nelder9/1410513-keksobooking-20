'use strict';
(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  window.form = {
    checkAccommodation: function () {
      if (roomNumber.value === '100' && capacity.value > '0') {
        roomNumber.setCustomValidity('Не верно');
      } else if (roomNumber.value >= capacity.value && capacity.value !== '0') {
        roomNumber.setCustomValidity('');
      } else if (roomNumber.value === '100' && capacity.value === '0') {
        roomNumber.setCustomValidity('');
      } else {
        roomNumber.setCustomValidity('Не верно');
      }
    }
  };

  type.addEventListener('change', function () {
    if (type.children[1].selected) {
      price.setAttribute('min', 1000);
      price.setAttribute('placeholder', 1000);
    } else if (type.children[2].selected) {
      price.setAttribute('min', 5000);
      price.setAttribute('placeholder', 5000);
    } else if (type.children[3].selected) {
      price.setAttribute('min', 10000);
      price.setAttribute('placeholder', 10000);
    } else if (type.children[0].selected) {
      price.setAttribute('min', 0);
      price.setAttribute('placeholder', 0);
    }
  });

  roomNumber.addEventListener('change', window.form.checkAccommodation);

  capacity.addEventListener('change', window.form.checkAccommodation);

  timeIn.addEventListener('change', function () {
    if (timeIn.children[0].selected) {
      timeOut.children[0].selected = true;
    } else if (timeIn.children[1].selected) {
      timeOut.children[1].selected = true;
    } else if (timeIn.children[2].selected) {
      timeOut.children[2].selected = true;
    }
  });

  timeOut.addEventListener('change', function () {
    if (timeOut.children[0].selected) {
      timeIn.children[0].selected = true;
    } else if (timeOut.children[1].selected) {
      timeIn.children[1].selected = true;
    } else if (timeOut.children[2].selected) {
      timeIn.children[2].selected = true;
    }
  });
})();
