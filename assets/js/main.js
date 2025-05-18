// SideNav trigger
let nav_trigger = document.querySelector('#nav-trigger');
let sidebar = document.querySelector('.sidebar');
let nav_item = document.querySelectorAll('.nav_list li')
nav_item.forEach(item => {
    item.addEventListener('click', () => {
        sidebar.classList.remove('active')
        nav_trigger.classList.remove('active')
    })
        
    }
);

nav_trigger.onclick = function() {
    sidebar.classList.toggle('active')
    nav_trigger.classList.toggle('active')
}


function smoothScrollTo(targetElement, duration = 800) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animationScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollProgress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutQuad(scrollProgress));
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animationScroll);
      }
    }
  
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
  
    requestAnimationFrame(animationScroll);
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.getElementById(this.getAttribute('href').substring(1));
      if (targetElement) smoothScrollTo(targetElement, 1000); // Adjust duration in milliseconds
    });
  });

  //Slider
  const track = document.querySelector('.slider-track');
const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.content-item');
const container = document.querySelector('.section-slider');

let currentIndex = 0;
const scrollMargin = 400;

function scrollToIndex(index) {
  const targetSlide = items[index];
  let offset = targetSlide.offsetLeft - scrollMargin;

  // Max scroll check
  const maxScroll = track.scrollWidth - container.offsetWidth;
  if (offset > maxScroll) offset = maxScroll;
  if (offset < 0) offset = 0;

  track.scrollTo({
    left: offset,
    behavior: 'smooth'
  });

  updateDots(index);
  currentIndex = index;
}

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

// Dot click
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    scrollToIndex(index);
  });
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
    scrollToIndex(++currentIndex);
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    scrollToIndex(--currentIndex);
  }
});

// Optional: update dot when user swipes
track.addEventListener('scroll', () => {
  let nearestIndex = 0;
  let minDistance = Infinity;
  items.forEach((item, i) => {
    const distance = Math.abs(item.offsetLeft - scrollMargin - track.scrollLeft);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = i;
    }
  });
  updateDots(nearestIndex);
  currentIndex = nearestIndex;
});
