'use strict';

const slidesImages = document.querySelectorAll('.carousel-img');
const slidesTexts = document.querySelectorAll('.carousel-text');

const slider = function () {
  const btnNext = document.querySelector('.btn-right');
  const btnPrev = document.querySelector('.btn-left');
  const btnNextImage = document.querySelector('.btn-right-image');
  const btnPrevImage = document.querySelector('.btn-left-image');

  let curSlide = 0;
  const maxSlide = slidesImages.length;

  const goToSlide = function (slide) {
    slidesImages.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    slidesTexts.forEach((t, i) => {
      let translation = 100 * (i - slide);
      t.style.transform = `translateX(${translation}%)`;
      translation === 0 ? (t.style.opacity = '100') : (t.style.opacity = '0');
    });
  };

  const nextSlide = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    goToSlide(curSlide);
  };

  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);
  btnNextImage.addEventListener('click', nextSlide);
  btnPrevImage.addEventListener('click', prevSlide);

  goToSlide(0);
};

const resizing = function () {
  const checkScreenSize = function () {
    if (window.screen.width <= 375) {
      slidesImages.forEach((s) => {
        let src = s.getAttribute('src').replace('desktop', 'mobile');
        s.setAttribute('src', src);
      });
    } else {
      slidesImages.forEach((s) => {
        let src = s.getAttribute('src').replace('mobile', 'desktop');
        s.setAttribute('src', src);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    checkScreenSize();
  });

  window.addEventListener('resize', function () {
    checkScreenSize();
  });
};

const navigation = function () {
  const btnNav = document.querySelector('.btn-mobile-nav');
  const headerEl = document.querySelector('.header');

  btnNav.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
  });

  const allLinks = document.querySelectorAll('a:link');

  allLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = link.getAttribute('href');

      if (href === '#')
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

      if (href !== '#' && href.startsWith('#')) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }

      if (link.classList.contains('main-nav-link')) {
        headerEl.classList.toggle('nav-open');
      }
    });
  });
};

const init = function () {
  slider();
  resizing();
  navigation();
};

init();
