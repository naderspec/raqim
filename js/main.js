

class CreativeLogoLoader {
            constructor() {
                this.loader = document.querySelector('.loader');
                this.mainContent = document.querySelector('.main-content');
                this.logoContainer = document.querySelector('.logo-container');
                this.isLoaded = false;
                
                this.init();
            }
            
            init() {
                this.createParticles();
                this.createFloatingElements();
                this.simulateLoading();
                this.setupPageLoadListeners();
                this.addMouseInteraction();
            }
            
            createParticles() {
                const particleCount = 20;
                
                for (let i = 0; i < particleCount; i++) {
                    setTimeout(() => {
                        const particle = document.createElement('div');
                        particle.className = 'particle';
                        

                        const angle = (i / particleCount) * Math.PI * 2;
                        const radius = 80 + Math.random() * 40;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        particle.style.left = `calc(50% + ${x}px)`;
                        particle.style.top = `calc(50% + ${y}px)`;
                        particle.style.animationDelay = Math.random() * 3 + 's';
                        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
                        
                        this.logoContainer.appendChild(particle);
                    }, i * 100);
                }
            }
            
            createFloatingElements() {
                const elementCount = 8;
                
                for (let i = 0; i < elementCount; i++) {
                    const element = document.createElement('div');
                    element.className = 'floating-element';
                    
                    const angle = (i / elementCount) * Math.PI * 2;
                    const radius = 120 + Math.random() * 60;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    element.style.left = `calc(50% + ${x}px)`;
                    element.style.top = `calc(50% + ${y}px)`;
                    element.style.animationDelay = Math.random() * 4 + 's';
                    
                    this.logoContainer.appendChild(element);
                }
            }
            
            simulateLoading() {

                setTimeout(() => {
                    this.hideLoader();
                }, 5500);
            }
            
            setupPageLoadListeners() {
                const minLoadTime = 5500;
                const startTime = Date.now();
                
                const checkComplete = () => {
                    const elapsed = Date.now() - startTime;
                    const remaining = minLoadTime - elapsed;
                    
                    if (remaining > 0) {
                        setTimeout(() => {
                            if (document.readyState === 'complete' && !this.isLoaded) {
                                this.hideLoader();
                            }
                        }, remaining);
                    } else {
                        if (document.readyState === 'complete' && !this.isLoaded) {
                            this.hideLoader();
                        }
                    }
                };
                
                if (document.readyState === 'complete') {
                    checkComplete();
                } else {
                    window.addEventListener('load', checkComplete);
                }
            }
            
            addMouseInteraction() {
                document.addEventListener('mousemove', (e) => {
                    if (this.loader.style.display === 'none') return;
                    
                    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                    
                    const logo = document.querySelector('.animated-logo');
                    const rings = document.querySelectorAll('.glow-ring');
                    
                    if (logo) {
                        logo.style.transform += ` translate(${mouseX * 10}px, ${mouseY * 10}px)`;
                    }
                    
                    rings.forEach((ring, index) => {
                        const intensity = (index + 1) * 5;
                        ring.style.transform = `translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
                    });
                });
            }
            
            hideLoader() {
                if (this.isLoaded) return;
                this.isLoaded = true;
                

                this.loader.classList.add('fade-out');
                

                const particles = document.querySelectorAll('.particle');
                particles.forEach((particle, index) => {
                    setTimeout(() => {
                        particle.style.animation = 'floatParticle 0.5s ease-out forwards';
                        particle.style.transform = 'translateY(-100px) scale(0)';
                        particle.style.opacity = '0';
                    }, index * 30);
                });
                

                const floatingElements = document.querySelectorAll('.floating-element');
                floatingElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.transform = 'scale(0) rotate(360deg)';
                        element.style.opacity = '0';
                    }, index * 50);
                });
                
                setTimeout(() => {
                    this.loader.classList.add('slide-up');
                }, 800);
                
                setTimeout(() => {
                    this.loader.style.display = 'none';
                    this.showMainContent();
                }, 2000);
            }
            
            showMainContent() {
                if (this.mainContent) {
                    this.mainContent.classList.add('show');
                }
            }
        }


        document.addEventListener('DOMContentLoaded', () => {
            new CreativeLogoLoader();
        });

// import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
// import { animate, utils, createDraggable, createSpring } from 'animejs';

const navLinks = document.querySelectorAll(".navlinks");
const activeBg = document.querySelector(".active-bg");

function moveActiveBg(link) {

  requestAnimationFrame(() => {
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
  });
}


let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const activeLink = document.querySelector(".navlinks.active");
    if (activeLink) {
      moveActiveBg(activeLink);
    }
  }, 100);
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveActiveBg(link);
  });
});


function initializeActiveBg() {
  const activeLink = document.querySelector(".navlinks.active");
  if (activeLink) {
    moveActiveBg(activeLink);
  }
}


document.addEventListener('DOMContentLoaded', initializeActiveBg);
window.addEventListener('load', initializeActiveBg);
window.addEventListener('resize', handleResize);


setTimeout(initializeActiveBg, 100);

// mobile 

const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('nav');
const navLinksTwo = document.querySelectorAll('nav a');


menuIcon.addEventListener('click', () => {
  menu.classList.toggle('menu');

  if (menu.classList.contains('menu')) {
    menuIcon.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0001 16L25.3334 25.3333M16.0001 16L6.66675 6.66667M16.0001 16L6.66675 25.3333M16.0001 16L25.3334 6.66667" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  } else {
    menuIcon.innerHTML = `<svg
        class="menu-icon"
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.125 20.5H35.875"
          stroke="#111111"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.125 10.25H25.625M15.375 30.75H35.875"
          stroke="#111111"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>`;
  }
});


navLinksTwo.forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('menu')) {
      menu.classList.remove('menu');
      menuIcon.innerHTML = `      <svg
        class="menu-icon"
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.125 20.5H35.875"
          stroke="#111111"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.125 10.25H25.625M15.375 30.75H35.875"
          stroke="#111111"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>`;
    }
  });
});


// service box 
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-box');

    cards.forEach((card) => {
        let isHovered = false;

        card.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            card.style.transition = 'none';
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -25;
            const rotateY = (x - centerX) / centerX * 25;
            
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            
            card.style.transition = 'transform 0.3s ease-out';
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
});

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


  // slider for portfolio 

  const gallerySlider = document.querySelector(".gallery-slider");
  const slidesGallery = gsap.utils.toArray(".slide-gallery");

  slidesGallery.forEach(slide => gallerySlider.appendChild(slide.cloneNode(true)));

  const totalWidthScroll = gallerySlider.scrollWidth / 2;

  gsap.to(gallerySlider, {
    x: -totalWidthScroll,
    duration: 30,
    ease: "linear",
    repeat: -1,       
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidthScroll * -1)
    }
  });


  // slider for portfolio-2 
const gallerySliderTwo = document.querySelector(".gallery-slider-2");
const slidesGalleryTwo = gsap.utils.toArray(".slide-gallery-2");

const uniqueSlides = slidesGalleryTwo.slice(0, 8);

gallerySliderTwo.innerHTML = '';
uniqueSlides.forEach(slide => {
    gallerySliderTwo.appendChild(slide);
});
uniqueSlides.forEach(slide => {
    gallerySliderTwo.appendChild(slide.cloneNode(true));
});

const totalWidthScrollTwo = gallerySliderTwo.scrollWidth / 2;

// console.log("Unique slides:", uniqueSlides.length);
// console.log("Total width:", totalWidthScrollTwo);
// console.log("Scroll width:", gallerySliderTwo.scrollWidth);

gsap.to(gallerySliderTwo, {
    x: -totalWidthScrollTwo,
    duration: 30,
    ease: "linear",
    repeat: -1,
    modifiers: {
        x: gsap.utils.unitize(x => {
            const value = parseFloat(x);
            const result = ((value % totalWidthScrollTwo) + totalWidthScrollTwo) % totalWidthScrollTwo;
            // console.log("Modifier input:", x, "Result:", result);
            return result;
        })
    }
});


  // counter 
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBounce(t) {
  const n1 = 7.5625, d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}

const counters = document.querySelectorAll(".num-box h1");

counters.forEach(counter => {
  const target = parseInt(counter.innerText);
  const suffix = counter.innerText.replace(/[0-9]/g, "");
  const duration = 2000;
  let start = null;

  function animateCount(timestamp, easingFn) {
    if (!start) start = timestamp;
    let progress = Math.min((timestamp - start) / duration, 1);
    let eased = easingFn(progress);
    counter.innerText = Math.floor(eased * target) + suffix;

    if (progress < 1) {
      requestAnimationFrame((t) => animateCount(t, easingFn));
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        start = null;
        requestAnimationFrame((t) => animateCount(t, easeOutBounce));
      }
    });
  }, { threshold: 0.6 });

  observer.observe(counter);
});




// slider for testimonial 

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 2.5,
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {

    300: {
      slidesPerView: 1,
      spaceBetween: 15
    },

    320: {
      slidesPerView: 1,
      spaceBetween: 15
    },

    640: {
      slidesPerView: 1.5,
    },

    768: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 2.5,
    },

    1440: {
      slidesPerView: 3,
    }
  },

  autoHeight: false,

  speed: 300,

  loop: false,

  grabCursor: true,

  keyboard: {
    enabled: true,
  },

  mousewheel: {
    releaseOnEdges: true,
  }
});
