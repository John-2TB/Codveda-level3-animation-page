import './style.css';

import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
  backgroundFilter: 'blur(10px)',
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
    scrub: 1,
  }
})
.to('.right-leaf', {
  y: 200
}, 0)
.to('.left-leaf', {
  y: -200
}, 0)
