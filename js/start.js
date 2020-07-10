'use strict';
(function () {
  window.mock = [];
  window.filteredPins = [];
  var adForm = document.querySelector('.ad-form');

  var adTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.renderAd = function (j) {
    var ad = adTemplate.cloneNode(true);
    ad.style = 'left: ' + window.mock[j].location.x + 'px; top:  ' + window.mock[j].location.y + 'px;';
    ad.children[0].src = window.mock[j].author.avatar;
    ad.children[0].alt = window.mock[j].offer.title;
    return ad;
  };

  window.renderNewAd = function (j) {
    var ad = adTemplate.cloneNode(true);
    ad.style = 'left: ' + window.filteredPins[j].location.x + 'px; top:  ' + window.filteredPins[j].location.y + 'px;';
    ad.children[0].src = window.filteredPins[j].author.avatar;
    ad.children[0].alt = window.filteredPins[j].offer.title;
    return ad;
  };

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
    window.backend.load(function (data) {

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        window.mock.push(data[i]);
      }

      for (var j = 0; j < data.length; j++) {
        fragment.appendChild(window.renderAd(j));
        window.map.appendChild(fragment);
      }

    }, function () {});
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
