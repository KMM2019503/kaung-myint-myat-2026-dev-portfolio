import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
	toggleActions: "play none none reverse",
	start: "top 80%",
	end: "bottom 20%",
	//markers: import.meta.env.DEV, // Uncomment to see markers in dev
});

// Export configured gsap and ScrollTrigger
export { gsap, ScrollTrigger };

// Utility: Create a scroll-triggered animation
export function createScrollAnimation(
	element: string | Element,
	animationProps: gsap.TweenVars,
	scrollProps?: ScrollTrigger.Vars,
) {
	return gsap.from(element, {
		...animationProps,
		scrollTrigger: {
			trigger: element,
			...scrollProps,
		},
	});
}

// Utility: Create a parallax effect
export function createParallax(element: string | Element, speed: number = 0.5) {
	return gsap.to(element, {
		y: () => window.innerHeight * speed,
		ease: "none",
		scrollTrigger: {
			trigger: element,
			start: "top bottom",
			end: "bottom top",
			scrub: true,
		},
	});
}

// Utility: Create staggered reveal animation
export function createStaggerReveal(
	container: string | Element,
	children: string,
	stagger: number = 0.1,
) {
	return gsap.from(`${container} ${children}`, {
		y: 50,
		opacity: 0,
		duration: 0.8,
		stagger,
		ease: "power2.out",
		scrollTrigger: {
			trigger: container,
			start: "top 80%",
		},
	});
}
