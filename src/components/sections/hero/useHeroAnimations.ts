import type { RefObject } from "react";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface HeroAnimationRefs {
	sectionRef: RefObject<HTMLDivElement | null>;
	artRef: RefObject<HTMLDivElement | null>;
	headingRef: RefObject<HTMLDivElement | null>;
	supportRef: RefObject<HTMLDivElement | null>;
	codingLogoRef: RefObject<HTMLDivElement | null>;
}

export function useHeroAnimations({
	sectionRef,
	artRef,
	headingRef,
	supportRef,
	codingLogoRef,
}: HeroAnimationRefs) {
	useEffect(() => {
		const ctx = gsap.context(() => {
			const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

			timeline.from(artRef.current, {
				y: 36,
				opacity: 0,
				scale: 0.88,
				duration: 0.95,
			});

			timeline.from(headingRef.current?.children ?? [], {
				x: -28,
				opacity: 0,
				duration: 0.82,
				stagger: 0.12,
			});

			timeline.from(
				supportRef.current?.children ?? [],
				{
					x: 28,
					opacity: 0,
					duration: 0.78,
					stagger: 0.1,
				},
				"-=0.5",
			);

			if (codingLogoRef.current) {
				gsap.set(codingLogoRef.current, {
					rotate: -3.5,
					transformOrigin: "center bottom",
				});

				gsap.to(codingLogoRef.current, {
					y: -12,
					rotate: 3.5,
					duration: 3.1,
					delay: 1.1,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}

			const orbitTracks = gsap.utils.toArray<HTMLElement>("[data-hero-orbit-track]");

			orbitTracks.forEach((track, index) => {
				const duration = Number.parseFloat(track.dataset.orbitDuration ?? "22");
				const delay = index * 0.12;
				gsap.to(track, {
					rotation: "+=360",
					duration,
					delay,
					repeat: -1,
					ease: "none",
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [artRef, codingLogoRef, headingRef, sectionRef, supportRef]);

	useEffect(() => {
		const projectsSection = document.getElementById("projects");
		if (!projectsSection || !sectionRef.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const ctx = gsap.context(() => {
			gsap
				.timeline({
					scrollTrigger: {
						trigger: projectsSection,
						start: "top bottom",
						end: "top top",
						scrub: true,
						pin: sectionRef.current,
						pinSpacing: false,
						anticipatePin: 1,
					},
				})
				.to(sectionRef.current, {
					scale: 0.94,
					yPercent: -7,
					opacity: 0.16,
					transformOrigin: "center top",
					ease: "none",
				});
		}, sectionRef);

		return () => ctx.revert();
	}, [sectionRef]);
}
