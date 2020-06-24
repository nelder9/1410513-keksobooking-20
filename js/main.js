'use strict';
(function () {

  var map = document.querySelector('.map');
  window.map = map;

  var mapFilters = document.querySelector('.map__filters');
  window.mapFilters = mapFilters;

  for (var j = 0; j < mapFilters.children.length; j++) {
    mapFilters.children[j].setAttribute('disabled', true);
  }
})();
