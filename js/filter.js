'use strict';
(function () {

  var houseFilter = document.querySelector('#housing-type');
  window.houseFilter = houseFilter;

  var startFilter = function () {
    var newPins = document.querySelectorAll('.map__pin');
    newPins.forEach(function (element) {
      element.remove();
    });

    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.filteredPins.length; j++) {
      fragment.appendChild(window.renderNewAd(j));
      window.map.appendChild(fragment);
    }
    for (var i = 0; i < window.mapFilters.children.length; i++) {
      window.mapFilters.children[i].removeAttribute('disabled', true);
    }
  };

  window.houseFilter.addEventListener('change', function () {
    if (window.houseFilter.children[2].selected) {
      window.filteredPins = window.mock.filter(function (it) {
        return it.offer.type === 'flat';
      });
      startFilter();
    } else if (window.houseFilter.children[3].selected) {
      window.filteredPins = window.mock.filter(function (it) {
        return it.offer.type === 'house';
      });
      startFilter();
    } else if (window.houseFilter.children[4].selected) {
      window.filteredPins = window.mock.filter(function (it) {
        return it.offer.type === 'bungalo';
      });
      startFilter();
    } else if (window.houseFilter.children[1].selected) {
      window.filteredPins = window.mock.filter(function (it) {
        return it.offer.type === 'palace';
      });
      startFilter();
    } else if (window.houseFilter.children[0].selected) {
      window.filteredPins = window.mock;
      startFilter();
    }
  });

})();
