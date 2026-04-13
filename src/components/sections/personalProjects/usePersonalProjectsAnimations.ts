import type { RefObject } from "react";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface UsePersonalProjectsAnimationsArgs {
	sectionRef: RefObject<HTMLDivElement | null>;
}

export function usePersonalProjectsAnimations({ sectionRef }: UsePersonalProjectsAnimationsArgs) {
	useEffect(() => {
		if (!sectionRef.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const ctx = gsap.context(() => {
			const introTargets = gsap.utils.toArray<HTMLElement>("[data-personal-projects-intro]");
			const cards = gsap.utils.toArray<HTMLElement>("[data-personal-project-card]");

			if (introTargets.length > 0) {
				gsap.from(introTargets, {
					y: 24,
					opacity: 0,
					duration: 1,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 40%",
						once: true,
					},
				});
			}

			if (cards.length > 0) {
				gsap.from(cards, {
					y: 30,
					opacity: 0,
					scale: 0.98,
					duration: 1.2,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 20%",
						once: true,
					},
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [sectionRef]);
}
