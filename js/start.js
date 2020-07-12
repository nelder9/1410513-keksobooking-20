'use strict';
(function () {
  window.mock = [];
  window.filteredPins = [];
  window.popupIsOpened = false;
  var mapPins = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.renderAd = function (j) {
    var ad = adTemplate.cloneNode(true);
    ad.style = 'left: ' + window.mock[j].location.x + 'px; top:  ' + window.mock[j].location.y + 'px;';
    ad.children[0].setAttribute('data-id', window.mock[j].id);
    ad.children[0].src = window.mock[j].author.avatar;
    ad.children[0].alt = window.mock[j].offer.title;
    return ad;
  };

  window.renderNewAd = function (j) {
    var ad = adTemplate.cloneNode(true);
    ad.style = 'left: ' + window.filteredPins[j].location.x + 'px; top:  ' + window.filteredPins[j].location.y + 'px;';
    ad.children[0].setAttribute('data-id', window.filteredPins[j].id);
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
    for (var k = 0; k < adForm.children.length; k++) {
      adForm.children[k].removeAttribute('disabled', true);
    }
    adForm.children[2].setAttribute('disabled', true);
    var submitForm = document.querySelector('.ad-form__submit');
    submitForm.addEventListener('mousedown', function () {
      adForm.children[2].removeAttribute('disabled', true);
    });

  };
  var openStart = document.querySelector('.map__pin--main');

  var start = function () {
    getStart();
    window.backend.load(function (data) {

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        window.mock.push(data[i]);
        window.mock[i].id = i;
      }
      for (var j = 0; j < 5; j++) {
        fragment.appendChild(window.renderAd(j));
        window.map.appendChild(fragment);
      }

      function startPopup(evt) {

        if (window.popupIsOpened) {
          window.closePopup();
        }

        if (evt.path[1].type === 'button' && window.popupIsOpened === false) {
          window.startCard(evt.target.getAttribute('data-id'));
          window.popupIsOpened = true;
          window.openedPin = evt.path[1];
          window.openedPin.classList.add('map__pin--main');
        }
      }
      mapPins.addEventListener('click', startPopup);
      mapPins.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          startPopup();
        }
      });

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
