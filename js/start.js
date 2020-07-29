'use strict';
(function () {
  window.mocks = [];
  window.filteredPins = [];
  window.popupIsOpened = false;
  window.mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.renderAd = function (j) {
    var ad = adTemplate.cloneNode(true);
    ad.style = 'left: ' + window.mocks[j].location.x + 'px; top:  ' + window.mocks[j].location.y + 'px;';
    ad.children[0].setAttribute('data-id', window.mocks[j].id);
    ad.setAttribute('data-id', window.mocks[j].id);
    ad.children[0].src = window.mocks[j].author.avatar;
    ad.children[0].alt = window.mocks[j].offer.title;
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

  window.startPopup = function (evt) {
    if (window.popupIsOpened && evt.target.hasAttribute('data-id')) {
      window.closePopup();
    }
    if (evt.target.hasAttribute('data-id') && window.popupIsOpened === false) {
      window.startCard(evt.target.getAttribute('data-id'));
      window.popupIsOpened = true;
      window.openedPin = evt.target;
      window.buttons = document.querySelectorAll('button');
      window.buttons.forEach(function (element) {
        if (element.getAttribute('data-id') === evt.target.getAttribute('data-id')) {
          window.openedPin = element;
        }
      });
      window.openedPin.classList.add('map__pin--active');
    }
  };

  map.addEventListener('click', window.startPopup);
  map.addEventListener('keydown', function (evt) {

    if (evt.key === 'Enter' && evt.target.className === 'map__pin') {
      if (window.popupIsOpened && evt.target.hasAttribute('data-id')) {
        window.closePopup();
      } else {
        window.startCard(evt.target.children[0].getAttribute('data-id'));
        window.popupIsOpened = true;
        window.openedPin = evt.target;
        window.buttons = document.querySelectorAll('button');
        window.buttons.forEach(function (element) {
          if (element.getAttribute('data-id') === evt.target.getAttribute('data-id')) {
            window.openedPin = element;
          }
        });
        window.openedPin.classList.add('map__pin--active');
      }
    }
  });

  window.start = function () {
    getStart();
    window.backend.load(function (data) {

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        window.mocks.push(data[i]);
        window.mocks[i].id = i;
      }
      for (var j = 0; j < 5; j++) {
        fragment.appendChild(window.renderAd(j));
        window.map.appendChild(fragment);
      }

    }, function () {});

    window.mainPin.removeEventListener('click', window.start);
    window.mainPin.removeEventListener('keydown', window.startEnter);
    window.form.checkAccommodation();

  };

  window.startEnter = function (evt) {
    if (evt.key === 'Enter') {
      window.start();
    }
  };

  window.mainPin.addEventListener('click', window.start);

  window.mainPin.addEventListener('keydown', window.startEnter);

})();
