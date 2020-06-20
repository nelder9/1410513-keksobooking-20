'use strict';

var mock = [];

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var validRoom = function () {
  if (roomNumber.value === '100' && capacity.value > '0') {
    roomNumber.setCustomValidity('Не верно');
  } else if (roomNumber.value >= capacity.value && capacity.value !== '0') {
    roomNumber.setCustomValidity('');
  } else if (roomNumber.value === '100' && capacity.value === '0') {
    roomNumber.setCustomValidity('');
  } else {
    roomNumber.setCustomValidity('Не верно');
  }
};

var getType = function () {
  var arrayOfTypes = ['palace', 'flat', 'house', 'bungalo'];
  var array = [];
  for (var i = 0; i < getRandomInteger(1, 4); i++) {
    array.push(arrayOfTypes[i]);
  }
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
      guests: getRandomInteger(0, 10),
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

var adForm = document.querySelector('.ad-form');

var adTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderAd = function (j) {
  var ad = adTemplate.cloneNode(true);
  ad.style = 'left: ' + mock[j].location.x + 'px; top:  ' + mock[j].location.y + 'px;';
  ad.children[0].src = mock[j].author.avatar;
  ad.children[0].alt = mock[j].offer.title;
  return ad;
};

var fragment = document.createDocumentFragment();

var getArrayOfMocks = function () {
  for (var i = 0; i < 8; i++) {
    mock.push(renderMock());
  }

  for (var j = 0; j < 8; j++) {
    fragment.appendChild(renderAd(j));
    map.appendChild(fragment);
  }
};

var mapFilters = document.querySelector('.map__filters');
for (var j = 0; j < mapFilters.children.length; j++) {
  mapFilters.children[j].setAttribute('disabled', true);
}


var getStart = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute('disabled', true);
  }

};

var openStart = document.querySelector('.map__pin--main');

var start = function () {
  getStart();
  getArrayOfMocks();
  openStart.removeEventListener('click', start);
  openStart.removeEventListener('keydown', startEnter);
  validRoom();

};

var startEnter = function (evt) {
  if (evt.key === 'Enter') {
    start();
  }
};

openStart.addEventListener('click', start);

openStart.addEventListener('keydown', startEnter);

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var address = document.querySelector('#address');
var mapPin = document.querySelector('.map__pin');

address.value = (parseInt(mapPin.style.left, 10) + 31) + ', ' + (parseInt(mapPin.style.top, 10) + 70);

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

roomNumber.addEventListener('change', validRoom);

capacity.addEventListener('change', validRoom);

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
