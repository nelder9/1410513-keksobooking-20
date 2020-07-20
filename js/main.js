'use strict';
<<<<<<< HEAD
(function () {
  window.map = document.querySelector('.map');
  window.successTemplate = document.querySelector('#success')
=======

var mock = [];

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var getType = function () {
  var arrayOfTypes = ['palace', 'flat', 'house', 'bungalo'];
  var array = [];
  array.push(arrayOfTypes[getRandomInteger(0, 3)]);
  return array;
};

var getFeatures = function () {
  var arrayOfFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var array = [];
  for (var i = 0; i < getRandomInteger(1, 6); i++) {
    array.push(arrayOfFeatures[i]);
  }
  return array;
};

var renderMock = function () {
  var randomLocationX = getRandomInteger(1, 1170);
  var randomLocationY = getRandomInteger(130, 630);
  var randomMock = {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomInteger(1, 8) + '.png'
    },
    offer: {
      title: 'Рандомный текст',
      address: '' + randomLocationX + '' + ', ' + randomLocationY + '',
      price: getRandomInteger(10000, 100000),
      type: getType(),
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 10),
      checkin: '' + getRandomInteger(12, 14) + ':00',
      checkout: '' + getRandomInteger(12, 14) + ':00',
      features: getFeatures(),
      description: 'Строка с описанием',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };
  return randomMock;
};


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var adTemplate = document.querySelector('#pin')
>>>>>>> module3-task3
  .content
  .querySelector('.success');
  window.errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var mapFilters = document.querySelector('.map__filters');
  window.mapFilters = mapFilters;
  window.resetForm = document.querySelector('.ad-form__reset');
  for (var j = 0; j < mapFilters.children.length; j++) {
    mapFilters.children[j].setAttribute('disabled', true);
  }
<<<<<<< HEAD
  window.getEnd = function () {

    var adForm = document.querySelector('.ad-form');
    window.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    for (var i = 0; i < window.mapFilters.children.length; i++) {
      window.mapFilters.children[i].setAttribute('disabled', true);
    }
    for (var k = 0; k < adForm.children.length; k++) {
      adForm.children[k].setAttribute('disabled', true);
    }
    var newPins = document.querySelectorAll('.map__pin');
    newPins.forEach(function (element) {
      if (element.className === 'map__pin' || element.className === 'map__pin map__pin--active') {
        element.remove();
      }
    });
    window.mainPin.addEventListener('click', window.start);
    window.mainPin.addEventListener('keydown', window.startEnter);
    if (window.popupIsOpened) {
      window.closePopup();
    }
    window.mock = [];
    window.filteredPins = [];
    adForm.reset();
    mapFilters.reset();
    window.mainPin.style = 'left: 570px; top: 375px;';
    window.address.value = (parseInt(window.mainPin.style.left, 10) + 31) + ', ' + (parseInt(window.mainPin.style.top, 10) + 70);
  };
  window.resetForm.addEventListener('click', window.getEnd);
})();
=======
};

getArrayOfMocks();


var getFirstCard = function () {
  var discTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  var disc = discTemplate.cloneNode(true);

  disc.children[0].src = mock[1].author.avatar;
  disc.children[2].textContent = mock[1].offer.title;
  disc.children[3].textContent = mock[1].offer.address;
  disc.children[4].textContent = mock[1].offer.price + ' ₽/ночь';
  if (String(mock[1].offer.type) === 'palace') {
    disc.children[5].textContent = 'дворец';
  } else if (String(mock[1].offer.type) === 'flat') {
    disc.children[5].textContent = 'квартира';
  } else if (String(mock[1].offer.type) === 'bungalo') {
    disc.children[5].textContent = 'бунгало';
  } else {
    disc.children[5].textContent = 'дом';
  }
  disc.children[6].textContent = mock[1].offer.rooms + ' комнаты для ' + mock[1].offer.guests + ' гостей';
  disc.children[7].textContent = 'Заезд после ' + mock[1].offer.checkin + ', выезд до ' + mock[1].offer.checkout;
  disc.children[9].textContent = mock[1].offer.description;
  disc.children[10].insertAdjacentHTML('afterbegin', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img> <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>');
  disc.children[10].children[0].src = mock[1].offer.photos[0];
  disc.children[10].children[1].src = mock[1].offer.photos[1];
  disc.children[10].children[2].src = mock[1].offer.photos[2];

  map.insertBefore(disc, map.children[1]);
};

getFirstCard();

>>>>>>> module3-task3
