"use strict";

document.addEventListener('DOMContentLoaded', function () {
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
  }
});