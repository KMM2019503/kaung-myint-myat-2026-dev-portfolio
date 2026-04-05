import type { RefObject } from "react";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import {
	HERO_ART_ENTER_DURATION_S,
	HERO_HEADING_ENTER_DURATION_S,
	HERO_HEADING_ENTER_STAGGER_S,
	HERO_SUPPORT_ENTER_DURATION_S,
	HERO_SUPPORT_ENTER_STAGGER_S,
	HERO_SUPPORT_OVERLAP_WITH_HEADING_S,
} from "./heroAnimationTimings";

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
				duration: HERO_ART_ENTER_DURATION_S,
			});

			timeline.from(headingRef.current?.children ?? [], {
				x: -28,
				opacity: 0,
				duration: HERO_HEADING_ENTER_DURATION_S,
				stagger: HERO_HEADING_ENTER_STAGGER_S,
			});

			timeline.from(
				supportRef.current?.children ?? [],
				{
					x: 28,
					opacity: 0,
					duration: HERO_SUPPORT_ENTER_DURATION_S,
					stagger: HERO_SUPPORT_ENTER_STAGGER_S,
				},
				`-=${HERO_SUPPORT_OVERLAP_WITH_HEADING_S}`,
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
}
