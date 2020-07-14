'use strict';
(function () {
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.closePopup();
    }
  };
  window.closePopup = function () {

    var popup = document.querySelector('.popup');
    popup.remove();
    window.popupIsOpened = false;
    window.openedPin.classList.remove('map__pin--main');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.startCard = function (index) {
    window.popupIsOpened = false;
    var discTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup');

    var disc = discTemplate.cloneNode(true);

    disc.children[0].src = window.mock[index].author.avatar;
    disc.children[2].textContent = window.mock[index].offer.title;
    disc.children[3].textContent = window.mock[index].offer.address;
    disc.children[4].textContent = window.mock[index].offer.price + ' ₽/ночь';
    if (String(window.mock[index].offer.type) === 'palace') {
      disc.children[5].textContent = 'дворец';
    } else if (String(window.mock[index].offer.type) === 'flat') {
      disc.children[5].textContent = 'квартира';
    } else if (String(window.mock[index].offer.type) === 'bungalo') {
      disc.children[5].textContent = 'бунгало';
    } else {
      disc.children[5].textContent = 'дом';
    }
    disc.children[6].textContent = window.mock[index].offer.rooms + ' комнаты для ' + window.mock[index].offer.guests + ' гостей';
    disc.children[7].textContent = 'Заезд после ' + window.mock[index].offer.checkin + ', выезд до ' + window.mock[index].offer.checkout;
    disc.children[9].textContent = window.mock[index].offer.description;

    for (var i = 0; i < window.mock[index].offer.photos.length; i++) {
      disc.children[10].insertAdjacentHTML('beforeend', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>');
      disc.children[10].children[i].src = window.mock[index].offer.photos[i];
    }

    window.map.insertBefore(disc, window.map.children[1]);

    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      window.closePopup();
    });

    document.addEventListener('keydown', onPopupEscPress);


    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.closePopup();
      }
    });
  };

})();
