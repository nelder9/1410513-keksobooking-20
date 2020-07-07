'use strict';
(function () {
  var mock = [];

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
        mock.push(data[i]);
      }

      for (var j = 0; j < data.length; j++) {
        fragment.appendChild(renderAd(j));
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
