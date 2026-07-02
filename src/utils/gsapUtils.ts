import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Creates an expensive-feeling cinematic text fade and slide-up timeline using ScrollTrigger.
 */
export function animateTextReveal(
  trigger: string | HTMLElement,
  targets: gsap.DOMTarget,
  delay = 0.1
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.12,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Creates a slow, luxurious stagger fade and scale-in reveal sequence for cards.
 */
export function animateCardStagger(
  trigger: string | HTMLElement,
  cards: gsap.DOMTarget
) {
  return gsap.fromTo(
    cards,
    { opacity: 0, y: 50, scale: 0.99 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.18,
      ease: "power2.out",
      scrollTrigger: {
        trigger: trigger,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Slow ambient rotation to keep decorative details breathing organically.
 */
export function animateAmbientSpin(target: gsap.DOMTarget, duration = 30) {
  return gsap.to(target, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: "none",
  });
}
