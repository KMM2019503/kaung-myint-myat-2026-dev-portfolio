import type { RefObject } from "react";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface UseContactAnimationsArgs {
	sectionRef: RefObject<HTMLDivElement | null>;
	photoRef: RefObject<HTMLDivElement | null>;
}

export function useContactAnimations({ sectionRef, photoRef }: UseContactAnimationsArgs) {
	useEffect(() => {
		if (!sectionRef.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const ctx = gsap.context(() => {
			const introTargets = gsap.utils.toArray<HTMLElement>("[data-contact-intro]");
			const lineTargets = gsap.utils.toArray<HTMLElement>("[data-contact-line]");
			const formTargets = gsap.utils.toArray<HTMLElement>("[data-contact-form-row]");
			const actionTargets = gsap.utils.toArray<HTMLElement>("[data-contact-form-actions]");

			if (introTargets.length > 0) {
				gsap.from(introTargets, {
					y: 30,
					opacity: 0,
					duration: 0.78,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 78%",
						once: true,
					},
				});
			}

			if (lineTargets.length > 0) {
				gsap.from(lineTargets, {
					x: -18,
					y: 18,
					opacity: 0,
					duration: 0.64,
					stagger: 0.06,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 68%",
						once: true,
					},
				});
			}

			if (formTargets.length > 0) {
				gsap.from(formTargets, {
					x: 20,
					y: 14,
					opacity: 0,
					duration: 0.62,
					stagger: 0.07,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 66%",
						once: true,
					},
				});
			}

			if (actionTargets.length > 0) {
				gsap.from(actionTargets, {
					y: 18,
					opacity: 0,
					duration: 0.62,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 64%",
						once: true,
					},
				});
			}

			if (photoRef.current) {
				gsap.from(photoRef.current, {
					y: 20,
					opacity: 0,
					scale: 0.95,
					duration: 0.72,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 76%",
						once: true,
					},
				});

				gsap.set(photoRef.current, {
					rotate: -2.2,
					transformOrigin: "center center",
				});

				gsap.to(photoRef.current, {
					y: -10,
					rotate: 2.2,
					duration: 3.1,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [photoRef, sectionRef]);
}
