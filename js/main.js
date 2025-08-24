import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
// import { animate, utils, createDraggable, createSpring } from 'animejs';

const navLinks = document.querySelectorAll(".navlinks");
const activeBg = document.querySelector(".active-bg");

function moveActiveBg(link) {
  const linkStyles = window.getComputedStyle(link);
  const offsetLeft = link.offsetLeft - parseFloat(linkStyles.marginLeft);
  const offsetWidth = link.offsetWidth;

  anime({
    targets: activeBg,
    left: offsetLeft,
    width: offsetWidth,
    duration: 400,
    easing: 'easeOutQuad'
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveActiveBg(link);
  });
});

const activeLink = document.querySelector(".navlinks.active");
if (activeLink) moveActiveBg(activeLink);


// mobile 

const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('nav');

menuIcon.addEventListener('click', () => {
  menu.classList.toggle('menu');

  if(menu.classList.contains('menu')){
    menuIcon.src = './assets/close.svg';
  } else {
    menuIcon.src = './assets/Menu-icon.svg';
  }
})


// slider 

const slider = document.querySelector(".slider");
  const slides = gsap.utils.toArray(".slide");

  slides.forEach(slide => slider.appendChild(slide.cloneNode(true)));

  const totalWidth = slider.scrollWidth / 2;

  gsap.to(slider, {
    x: -totalWidth,
    duration: 30,      
    ease: "linear",
    repeat: -1,       
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth * -1)
    }
  });

