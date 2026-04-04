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
			let horizontalTween: gsap.core.Tween | null = null;

			if (panels.length > 1) {
				horizontalTween = gsap.to(trackRef.current, {
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

				const projectCasePanels = gsap.utils.toArray<HTMLElement>("[data-project-case-panel]");

				projectCasePanels.forEach((projectCasePanel) => {
					const selectInPanel = gsap.utils.selector(projectCasePanel);
					const projectPanelTimeline = gsap.timeline({
						scrollTrigger: horizontalTween
							? {
									trigger: projectCasePanel,
									containerAnimation: horizontalTween,
									start: "left 72%",
									once: true,
								}
							: {
									trigger: projectCasePanel,
									start: "top 72%",
									once: true,
								},
					});

					projectPanelTimeline.from(selectInPanel("[data-project-case-shell]"), {
						x: 64,
						y: 26,
						opacity: 0,
						scale: 0.98,
						duration: 0.86,
						ease: "power3.out",
					});

					projectPanelTimeline.from(
						selectInPanel(
							"[data-project-case-eyebrow], [data-project-case-title], [data-project-case-summary]",
						),
						{
							y: 24,
							opacity: 0,
							stagger: 0.12,
							duration: 0.64,
							ease: "power3.out",
						},
						"-=0.46",
					);

					projectPanelTimeline.from(
						selectInPanel("[data-project-case-metric-stack]"),
						{
							x: 24,
							y: 16,
							opacity: 0,
							duration: 0.62,
							ease: "power3.out",
						},
						"-=0.44",
					);

					projectPanelTimeline.from(
						selectInPanel(
							"[data-project-case-metric], [data-project-case-module], [data-project-case-highlight], [data-project-case-scope-label], [data-project-case-impact-label]",
						),
						{
							y: 18,
							opacity: 0,
							stagger: 0.04,
							duration: 0.5,
							ease: "power2.out",
						},
						"-=0.4",
					);
				});
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
