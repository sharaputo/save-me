"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Burger menu handling
  var burgerIcon = document.querySelector('.burger');
  var headerMenu = document.querySelector('#navigation');

  if (burgerIcon) {
    burgerIcon.addEventListener('click', function () {
      burgerIcon.classList.toggle('_active');
      headerMenu.classList.toggle('_active');

      if (headerMenu.classList.contains('_active')) {
        bodyScrollLock.disableBodyScroll(headerMenu);
      } else {
        bodyScrollLock.enableBodyScroll(headerMenu);
      }
    });
  } // Promo slider init & options


  var swiper = new Swiper('.promo__slider', {
    autoHeight: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }); // Embed youtube videos the right way

  function embedYoutube() {
    var youtubeContainers = document.querySelectorAll('.embed-youtube');

    var _loop = function _loop(i) {
      var container = youtubeContainers[i];
      var imageSource = 'https://img.youtube.com/vi/' + container.dataset.videoId + '/sddefault.jpg';
      var image = new Image();
      image.src = imageSource;
      image.addEventListener('load', function () {
        container.appendChild(image);
      });
      container.addEventListener('click', function () {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + this.dataset.videoId + '?rel=0&showinfo=0&autoplay=1');
        this.innerHTML = '';
        this.appendChild(iframe);
      });
    };

    for (var i = 0; i < youtubeContainers.length; i++) {
      _loop(i);
    }
  }

  embedYoutube();
});