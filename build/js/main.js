"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Burger menu open & close
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
  } // Help popup open & close


  var popups = new HystModal({
    linkAttributeName: 'data-hystmodal'
  }); // Dynamic relocation of elements on resize

  var dynamicAdaptElements = new DynamicAdapt('min');
  dynamicAdaptElements.init(); // Donation calculator ans card highlight

  var donationSumInput = document.querySelector('.donation-page #donation_sum');
  var donationSum = document.getElementById('total_donation_sum');
  var checkboxesTotalSum = null;

  if (donationSumInput) {
    var donationCheckboxes = document.querySelectorAll('.child-card__checkbox .checkbox');
    donationSumInput.addEventListener('input', function () {
      var sum = parseInt(donationSumInput.value);

      if (checkboxesTotalSum) {
        donationSum.textContent = sum + checkboxesTotalSum;
      } else {
        donationSum.textContent = sum;
      }

      if (!sum && !checkboxesTotalSum) {
        donationSum.textContent = 0;
      } else if (!sum && checkboxesTotalSum) {
        donationSum.textContent = checkboxesTotalSum;
      }
    });
    donationCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        var articleCard = checkbox.parentElement.parentElement.parentElement;
        articleCard.classList.toggle('_checked');
        var sum = parseInt(donationSum.textContent);
        var value = parseInt(checkbox.value);

        if (checkbox.checked) {
          checkboxesTotalSum += value;

          if (donationSum.textContent) {
            donationSum.textContent = sum + value;
          } else {
            donationSum.textContent = value;
          }
        } else {
          checkboxesTotalSum -= value;
          donationSum.textContent -= value;
        }
      });
    });
  } // Promo slider


  var promoSlider = new Swiper('.promo__slider', {
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
  }); // Help slider

  var helpSlider = new Swiper('.help-block__slider .swiper', {
    loop: true,
    perMove: 1,
    slidesPerView: 2,
    spaceBetween: 16,
    navigation: {
      nextEl: '.help-block__next',
      prevEl: '.help-block__prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 4
      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 25
      }
    }
  }); // Donation slider

  var donationSlider = new Swiper('.more-children__slider', {
    perMove: 1,
    slidesPerView: 1.1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.more-children__next',
      prevEl: '.more-children__prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2.2
      }
    }
  }); // Destroy donation slider on desktop

  function destroyDonationSlider() {
    var desktopRes = window.matchMedia('(min-width: 1024px)');

    if (desktopRes.matches) {
      donationSlider.destroy();
    }
  }

  destroyDonationSlider(); // Child-page slider

  var sliderThumbs = new Swiper('.slider__thumbs', {
    spaceBetween: 16,
    slidesPerView: 3.6,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1440: {
        slidesPerView: 3
      }
    }
  });
  var sliderMain = new Swiper('.slider__main', {
    spaceBetween: 10,
    thumbs: {
      swiper: sliderThumbs
    }
  }); // Payment tabs logic

  var paymentTabs = document.querySelectorAll('.tabs-block__link');
  paymentTabs.forEach(function (tab) {
    tab.addEventListener('click', tabClicks);
  });

  function tabClicks(tabClickEvent) {
    for (var i = 0; i < paymentTabs.length; i++) {
      paymentTabs[i].classList.remove('_active');
    }

    var clickedTab = tabClickEvent.currentTarget;
    clickedTab.classList.add('_active');
    tabClickEvent.preventDefault();
    var tabPanels = document.querySelectorAll('.tabs-block__panel');

    for (var _i = 0; _i < tabPanels.length; _i++) {
      tabPanels[_i].classList.remove('_active');
    }

    var anchorReference = tabClickEvent.target;
    var activePanelId = anchorReference.getAttribute('href');
    var activePanel = document.querySelector(activePanelId);
    activePanel.classList.add('_active');
  } // Embed youtube videos the right way


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