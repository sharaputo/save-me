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
  });
});