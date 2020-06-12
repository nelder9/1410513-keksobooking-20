'use strict';

var mock = [];

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

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
  var randomMock = {author: {
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
map.classList.remove('map--faded');

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

getArrayOfMocks();
