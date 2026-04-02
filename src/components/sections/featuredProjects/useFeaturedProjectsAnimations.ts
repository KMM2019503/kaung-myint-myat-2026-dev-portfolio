import type { RefObject } from "react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseFeaturedProjectsAnimationsArgs {
	sectionRef: RefObject<HTMLDivElement | null>;
	trackRef: RefObject<HTMLDivElement | null>;
	introCardRef: RefObject<HTMLDivElement | null>;
	introChipLayerRef: RefObject<HTMLDivElement | null>;
	introBadgeTickerRef: RefObject<HTMLDivElement | null>;
	shouldStartTyping: boolean;
	setShouldStartTyping: (value: boolean) => void;
}

export function useFeaturedProjectsAnimations({
	sectionRef,
	trackRef,
	introCardRef,
	introChipLayerRef,
	introBadgeTickerRef,
	shouldStartTyping,
	setShouldStartTyping,
}: UseFeaturedProjectsAnimationsArgs) {
	useEffect(() => {
		if (!sectionRef.current || !trackRef.current) {
			return;
		}

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
			if (panels.length > 1) {
				gsap.to(trackRef.current, {
					xPercent: -100 * (panels.length - 1),
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: () => `+=${window.innerWidth * (panels.length - 1)}`,
						pin: true,
						scrub: 1,
						invalidateOnRefresh: true,
						anticipatePin: 1,
					},
				});
			}

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top 74%",
				once: true,
				onEnter: () => setShouldStartTyping(true),
			});

			if (!prefersReducedMotion) {
				const introTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
						once: true,
					},
				});

				introTimeline.from("[data-project-intro-eyebrow]", {
					y: 22,
					opacity: 0,
					duration: 0.56,
					ease: "power2.out",
				});

				introTimeline.from(
					"[data-project-intro-title]",
					{
						y: 44,
						opacity: 0,
						filter: "blur(8px)",
						duration: 0.86,
						ease: "power3.out",
					},
					"-=0.24",
				);

				introTimeline.from(
					"[data-project-intro-line]",
					{
						y: 26,
						opacity: 0,
						stagger: 0.14,
						duration: 0.74,
						ease: "power3.out",
					},
					"-=0.34",
				);

				introTimeline.from(
					"[data-project-intro-card]",
					{
						x: 36,
						opacity: 0,
						scale: 0.97,
						duration: 0.84,
						ease: "power3.out",
					},
					"-=0.46",
				);
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [sectionRef, setShouldStartTyping, trackRef]);

	useEffect(() => {
		if (!shouldStartTyping || !introCardRef.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const ctx = gsap.context(() => {
			const chipElements = gsap.utils.toArray<HTMLElement>(
				introChipLayerRef.current?.children ?? [],
			);

			chipElements.forEach((chip, index) => {
				gsap.to(chip, {
					y: index % 2 === 0 ? -10 : -14,
					duration: 2.1 + index * 0.35,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			});

			if (introBadgeTickerRef.current) {
				gsap.to(introBadgeTickerRef.current, {
					xPercent: -50,
					duration: 26,
					repeat: -1,
					ease: "none",
				});
			}
		}, introCardRef);

		return () => ctx.revert();
	}, [introBadgeTickerRef, introCardRef, introChipLayerRef, shouldStartTyping]);
}
