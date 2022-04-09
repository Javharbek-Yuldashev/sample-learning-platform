'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log('Current scroll (X/Y)2', window.scrollX, window.scrollY);

  // console.log("top",s1coords.left);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth // border excludes, padding includes
  // );

  // Scrolling;
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });

  // section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click',function(e){
    e.preventDefault();

    const s1coords = section1.getBoundingClientRect();
    const s2coords = section2.getBoundingClientRect();
    const s3coords = section3.getBoundingClientRect();



    if(e.target.closest('#nav_link_1')) {
        window.scrollTo({
            left: s1coords.left + window.scrollX,
            top: s1coords.top + window.scrollY,
            behavior: 'smooth',
        })
    }

    if(e.target.closest('#nav_link_2')) {
        window.scrollTo({
            left: s2coords.left + window.scrollX,
            top: s2coords.top + window.scrollY,
            behavior: 'smooth',
        })
    }

    if(e.target.closest('#nav_link_3')) {
        window.scrollTo({
            left: s3coords.left + window.scrollX,
            top: s3coords.top + window.scrollY,
            behavior: 'smooth',
        })
    }
})

///////////////////////////////////////
// Header Observer

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

  // console.log(navHeight);
  // console.log(typeof(navHeight));

// let options = {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`
// }

function stickyNav(entries, observer) {
  const [entry] = entries;

  // console.log(entries);
  // console.log(entry);

  if(!(entry.isIntersecting)) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section');

function revealSection(entries,observer) {
  const [entry] = entries;
  // console.log(entry.isIntersecting);

  // gurad clauses
  if(!(entry.isIntersecting)) return;

  // console.log(entry.isIntersecting);
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
  
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
})

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

///////////////////////////////////////
// Lazy-load image

const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg (entries, observer) {
  const [entry] = entries;

  if(!(entry.isIntersecting)) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '0px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Tab

const tabContainer = document.querySelector('.operations__tab-container');
const tab = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click',function(e){
    const clicked = e.target.closest('.operations__tab');

    // Gurad clasess
    if(!clicked) return;

    // Remove active classes
    tab.forEach((t) => t.classList.remove('operations__tab--active'));
    tabContent.forEach((c) => c.classList.remove('operations__content--active'));

    // Actiavte tab
    clicked.classList.add('operations__tab--active');

    // Activate content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');

})

///////////////////////////////////////////
// Navbar hover

const allNavLink = document.querySelectorAll('.nav__link')

navLinks.addEventListener('mouseover', function(e){
  e.preventDefault();
 
  if(!(e.target.closest('.nav__link'))) return;

  allNavLink.forEach(e => e.style.opacity = '0.6');
  e.target.style.opacity = '1';
  
})

navLinks.addEventListener('mouseout', function(e){
  e.preventDefault();
  
  allNavLink.forEach(e => e.style.opacity = '1')
})


//////////////////////////////////////////
// slider 

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right')

  let curSlide = 0;
  const maxSlide = slides.length;

  const gotoSlide = function (slide) {
    slides.forEach(
      // 0 // slide = 4
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if(curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    gotoSlide(curSlide);

  };


  // Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    gotoSlide(curSlide);
  };

  const init = function () {
    gotoSlide(0);
    // createDots();

    // activeteDots();
  };

  init();

  // Event handlers
  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide);
}

slider();

////////////////////////////////////////////
// Lifecycle DOM events

// // save before unload
// window.addEventListener('beforeunload', function(e){
//   e.preventDefault();
//   console.log("Unsaved", e);
//   e.returnValue = 'Salanamgan malumotlar';
// })

// window.addEventListener('load', function(e){
//   console.log('Page fully loaded', e);
// })

window.addEventListener('DOMContentLoaded', function (e){
  console.log('HTML parsed and DOM tree built', e);
})

window.addEventListener('unload', function(e) {
  console.log("Before left the page", e);
})