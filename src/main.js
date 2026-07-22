import './style.css';
import { cocktailLists } from './constant';
import { mockTailLists } from './constant';

import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const video = document.getElementById('cocktail-video');
const isMobile = window.matchMedia('(max-width: 767px)').matches;

if (isMobile) {
  console.log('User is on a mobile device');
}

// Nav blur effect
const navTween = gsap.timeline({
  scrollTrigger: {
    trigger: 'nav',
    start: 'bottom top'
  }
});

navTween.fromTo('nav', {
  background: "transparent",
}, {
  background: '#00000050',
  backdropFilter: 'blur(10px)',
  duration: 1,
  ease: 'power1.inOut',
});


// Hero Section
const heroSplit = new SplitText('.title', {
  type: 'chars, words'
});
const paragraphSplit = new SplitText('.subtitle', {
  type: 'lines'
});

heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

gsap.from(heroSplit.chars, {
  yPercent: 100,
  duration: 1.8,
  ease: 'expo.out',
  stagger: 0.05
});

gsap.from(paragraphSplit.lines, {
  opacity: 0,
  yPercent: 100,
  duration: 1.8,
  ease: 'echo.out',
  stagger: 0.6,
  delay: 1,
});

gsap.timeline({
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
})
.to('.right-leaf', {
  y: 200
}, 0)
.to('.left-leaf', {
  y: -200
}, 0)
const startValue = isMobile ? 'top 50%' : 'center 60%';
const endValue = isMobile ? '120% top' : 'bottom top';

const videoTimeLine = gsap.timeline({
  scrollTrigger: {
    trigger: video,
    start: startValue,
    end: endValue,
    scrub: true,
    pin: true,
  }
});

// Function to attach the tween
function setupVideoScrub() {
  videoTimeLine.to(video, {
    currentTime: video.duration,
    ease: 'none'
  });
}

// Handle metadata loading cleanly
if (video.readyState >= 1) {
  setupVideoScrub();
} else {
  video.onloadedmetadata = setupVideoScrub;
}

// Rendering cocktail list
const cocktailListContainer = document.getElementById('cocktail-list');
const mocktailListContainer = document.getElementById('mocktail-list');

const cocktailListItemsHTML = cocktailLists.map((drink) => `
  <li>
    <div class="md:me-28">
      <h3>${drink.name}</h3>
      <p>${drink.country} | ${drink.detail}</p>
    </div>
    <span>- ${drink.price}</span>
  </li>
`).join('');

cocktailListContainer.innerHTML = cocktailListItemsHTML;

// Mocktail HTML render
const mocktailListItemsHTML = mockTailLists.map((drink) => `
  <li>
    <div class="me-28">
      <h3>${drink.name}</h3>
      <p>${drink.country} | ${drink.detail}</p>
    </div>
    <span>- ${drink.price}</span>
  </li>
`).join('');

mocktailListContainer.innerHTML = mocktailListItemsHTML;

const cocktailLeafTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '#cocktails',
    start: 'top 30%',
    end: 'bottom 80%',
    scrub: true,
  }
});

cocktailLeafTimeline.from('#c-left-leaf', {
  x: -100,
  y: 100
})
.from('#c-right-leaf', {
  x: 100,
  y: 100
});