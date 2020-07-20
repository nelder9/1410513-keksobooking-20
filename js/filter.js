'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelector('#housing-features');

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, 500);
    };
  };

  var startFilter = function () {
    if (window.popupIsOpened === true) {
      window.closePopup();
    }
    var newPins = document.querySelectorAll('.map__pin');
    newPins.forEach(function (element) {
      if (element.className === 'map__pin' || element.className === 'map__pin map__pin--active') {
        element.remove();
      }
    });

    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.filteredPins.length && j < 5; j++) {
      fragment.appendChild(window.renderNewAd(j));
      window.map.appendChild(fragment);
    }
    for (var i = 0; i < window.mapFilters.children.length; i++) {
      window.mapFilters.children[i].removeAttribute('disabled', true);
    }
  };

  var chooseTypes = function (selectType) {
    return type.value === 'any' || selectType.offer.type === type.value;
  };

  var choosePrices = function (selectPrice) {
    if (price.value === 'low') {
      return selectPrice.offer.price < 10000;
    } else if (price.value === 'middle') {
      return selectPrice.offer.price >= 10000 && selectPrice.offer.price <= 50000;
    } else if (price.value === 'high') {
      return selectPrice.offer.price > 50000;
    } else {
      return true;
    }
  };

  var chooseRooms = function (roomQuantity) {
    return rooms.value === 'any' || roomQuantity.offer.rooms.toString() === rooms.value;
  };

  var chooseGuests = function (selectGuests) {
    return guests.value === 'any' || selectGuests.offer.guests.toString() === guests.value;
  };

  var chooseFeatures = function (selectFeatures) {
    var checkedElem = features.querySelectorAll('input[type=checkbox]:checked');

    var checkedFeatures = [].map.call(checkedElem, function (input) {
      return input.value;
    });

    return checkedFeatures.every(function (currentFeature) {
      return selectFeatures.offer.features.includes(currentFeature);
    });
  };

  var onFilterChange = function () {

    window.filteredPins = window.mock.filter(function (filtredData) {
      var adType = chooseTypes(filtredData);
      var adRooms = choosePrices(filtredData);
      var adPrice = chooseRooms(filtredData);
      var adGuests = chooseGuests(filtredData);
      var adFeatures = chooseFeatures(filtredData);
      return adType && adRooms && adPrice && adGuests && adFeatures;
    });

    startFilter();
  };

  filterForm.addEventListener('change', debounce(onFilterChange));

})();
