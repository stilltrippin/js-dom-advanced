'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
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


// 187
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('header');
console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));
console.log(document.getElementById('section--1'));
console.log(document.getElementsByTagName('button'));
console.log(document.getElementsByClassName('btn'));


const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'we use cookies for improved functionality.<button class="btn btn--close-cookie">Got It!</button>';
const mess2 = message.cloneNode(true)
header.append(message);
//header.before(message)
//header.append(mess2);
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
})

message.style.backgroundColor= '#37383d';
message.style.width = '120%';
console.log(message.style.height); // nothing
console.log(getComputedStyle(message).height);
console.log(message.style.width); //works
console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat(getComputedStyle(message).height)+ 40 + 'px';
console.log(message.style.height );

document.documentElement.style.setProperty('--color-primary','orangered') // changed --color-primary var in css

//attributes

const logo = document.querySelector('.nav__logo')
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company','bankist');

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

console.log(logo.dataset.versionNumber);

//classes

logo.classList.add('c','j')

//dont do
//logo.className = 'Vova'

const btnScrollTo = document.querySelector('' +
  '.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  //console.log('curr scroll',window.pageXOffset,pageYOffset);
 /* window.scrollTo(s1coords.left + scrollX,
    s1coords.top + scrollY);


  window.scrollTo({
   left: s1coords.left + scrollX,
   top: s1coords.top + scrollY,
    behavior: 'smooth'
  });
*/
  section1.scrollIntoView({behavior: 'smooth'})
})

const h1 = document.querySelector('h1');

const alertH1 = function(e) {
  alert('addEvtLis: Great!');
  h1.removeEventListener('mouseenter',alertH1)
}
h1.addEventListener('mouseenter', alertH1);
/*
h1.onmouseenter = function(e) {
  alert('onmouseenter: Great!')
}
*/

const h4= document.querySelector('h4');
console.log(h4);
h4.addEventListener('myCustomEvent', function(event) {
  alert('Custom event triggered: ' + event.detail);
});

h4.addEventListener('click', function() {
  const event = new CustomEvent('myCustomEvent', { detail: 'Hello, Custom Event!' });
  h4.dispatchEvent(event);
});

h4.addEventListener('click', function() {
  const event = new CustomEvent('myCustomEvent', { detail: 'Button triggered the event!' });
  h4.dispatchEvent(event);
});
const obsCallback = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
}
const obsOptions = {
  root: null,
  threshold: 0.1,

}
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

const nav = document.querySelector('.nav');
const  stickyNav = function(entries) {
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshold: 0
  }
);
headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25
})
allSections.forEach((section)=>{
  sectionObs.observe(section);
  //section.classList.add('section--hidden')
});

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);

}

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold: 0.5
});

imgTargets.forEach(img => imgObserver.observe(img));

let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
slider.style.overflow = 'hidden';
slides.forEach((s,i) =>
  s.style.transform = `translateX(${i*100}%)`);

btnRight.addEventListener('click', function() {
  curSlide++;
  if(curSlide > 2) curSlide = 0;
  slides.forEach((s, i) =>
    s.style.transform = `translateX(${(i-curSlide)*100}%)`);
  }
)

btnLeft.addEventListener('click', function() {
    curSlide--;
    if(curSlide < 0) curSlide = 2;
    slides.forEach((s, i) =>
      s.style.transform = `translateX(${(i-curSlide)*100}%)`);
  }
)
