import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";

interface ProjectSlide {
	type: "project";
	id: string;
	kicker: string;
	title: string;
	subtitle: string;
	highlights: string[];
	accent: string;
}

interface IntroPrinciple {
	label: string;
	title: string;
	description: string;
}

interface IntroSlide {
	type: "intro";
	id: string;
	kicker: string;
	title: string;
	subtitle: string;
	accent: string;
	principles: IntroPrinciple[];
}

type FeaturedSlide = IntroSlide | ProjectSlide;

const introSlide: IntroSlide = {
	type: "intro",
	id: "approach",
	kicker: "Approach",
	title: "How I Think Before Project Work Starts",
	subtitle:
		"I align product goals, user friction, and engineering tradeoffs first so the work we ship feels intentional, stable, and worth building.",
	accent: "#f2d6a8",
	principles: [
		{
			label: "Think",
			title: "Start with product clarity",
			description:
				"I turn business goals into clear flows, edge cases, and practical technical direction before touching implementation.",
		},
		{
			label: "Focus",
			title: "Prioritize what changes outcomes",
			description:
				"I focus on speed, reliability, and experience details that users actually feel instead of adding surface-level complexity.",
		},
		{
			label: "Offer",
			title: "Ship with calm ownership",
			description:
				"I bring frontend craft, mobile depth, and dependable execution from idea to polished release.",
		},
	],
};

const projectSlides: ProjectSlide[] = [
	{
		type: "project",
		id: "project-01",
		kicker: "Project 01",
		title: "Scaled React Native HR Product",
		subtitle:
			"Built and stabilized the core app for 50K daily active users with OTA-friendly delivery and consistent runtime behavior.",
		highlights: [
			"Refined onboarding flow and permission timing",
			"Improved data-heavy KPI and leave module performance",
			"Hardened release cadence with safer update paths",
		],
		accent: "#9ed8ff",
	},
	{
		type: "project",
		id: "project-02",
		kicker: "Project 02",
		title: "Multi-country Payslip Architecture",
		subtitle:
			"Designed a normalized rendering pipeline to support country-specific payloads while keeping UI logic stable and maintainable.",
		highlights: [
			"Normalization layer for inconsistent API structures",
			"Dynamic UI composition from schema-like data",
			"Edge-case coverage for payroll formatting variance",
		],
		accent: "#aef0c6",
	},
	{
		type: "project",
		id: "project-03",
		kicker: "Project 03",
		title: "Cross-platform Reliability Alignment",
		subtitle:
			"Aligned React Native behavior with legacy iOS and Android implementations and reduced production drift across modules.",
		highlights: [
			"Unified business-rule interpretation across platforms",
			"Better fallback handling for unstable network paths",
			"Clearer architecture boundaries for long-term scaling",
		],
		accent: "#c8ccff",
	},
];

const slides: FeaturedSlide[] = [introSlide, ...projectSlides];

function toRomanNumeral(value: number) {
	const romanMap: Array<[number, string]> = [
		[1000, "M"],
		[900, "CM"],
		[500, "D"],
		[400, "CD"],
		[100, "C"],
		[90, "XC"],
		[50, "L"],
		[40, "XL"],
		[10, "X"],
		[9, "IX"],
		[5, "V"],
		[4, "IV"],
		[1, "I"],
	];

	let remaining = Math.max(1, Math.floor(value));
	let result = "";

	for (const [numericValue, romanSymbol] of romanMap) {
		while (remaining >= numericValue) {
			result += romanSymbol;
			remaining -= numericValue;
		}
	}

	return result;
}

export function FeaturedProjects() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const progressRailRef = useRef<HTMLDivElement>(null);
	const progressThumbRef = useRef<HTMLDivElement>(null);
	const activeIndexRef = useRef(0);
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	useEffect(() => {
		if (!sectionRef.current || !trackRef.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			if (overlayRef.current) {
				overlayRef.current.style.opacity = "1";
			}
			return;
		}

		const ctx = gsap.context(() => {
			const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
			const maxIndex = Math.max(0, panels.length - 1);

			const getScrollDistance = () => {
				if (!trackRef.current) {
					return 0;
				}
				return Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
			};
			const getHoldDistance = () => window.innerHeight * 0.48;
			const updateScrollNavigator = (progress: number) => {
				if (!progressRailRef.current || !progressThumbRef.current) {
					return;
				}

				const railWidth = progressRailRef.current.offsetWidth;
				const thumbWidth = progressThumbRef.current.offsetWidth;
				const nextLeft = Math.max(0, (railWidth - thumbWidth) * progress);
				gsap.set(progressThumbRef.current, { left: nextLeft });

				const nextActiveIndex = Math.round(progress * maxIndex);
				if (nextActiveIndex !== activeIndexRef.current) {
					activeIndexRef.current = nextActiveIndex;
					setActiveSlideIndex(nextActiveIndex);
				}
			};

			if (overlayRef.current) {
				gsap.fromTo(
					overlayRef.current,
					{ opacity: 0 },
					{
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "top top",
							scrub: true,
						},
					},
				);
			}

			gsap.fromTo(
				trackRef.current,
				{
					yPercent: 12,
					scale: 0.975,
					opacity: 0.6,
					transformOrigin: "center top",
				},
				{
					yPercent: 0,
					scale: 1,
					opacity: 1,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "top top",
						scrub: true,
					},
				},
			);

			const pinTrigger = ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top top",
				end: () => `+=${getHoldDistance() + getScrollDistance()}`,
				pin: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			});

			const horizontalTween = gsap.to(trackRef.current, {
				x: () => -getScrollDistance(),
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: () => pinTrigger.start + getHoldDistance(),
					end: () => pinTrigger.start + getHoldDistance() + getScrollDistance(),
					scrub: 1,
					invalidateOnRefresh: true,
					onUpdate: (self) => updateScrollNavigator(self.progress),
					onRefresh: (self) => updateScrollNavigator(self.progress),
					snap:
						panels.length > 1
							? {
									snapTo: 1 / (panels.length - 1),
									inertia: false,
									delay: 0,
									duration: { min: 0.08, max: 0.2 },
								}
							: undefined,
				},
			});

			updateScrollNavigator(0);

			panels.forEach((panel, index) => {
				const animTargets = panel.querySelectorAll("[data-project-anim]");

				// Keep the first slide fully visible during the initial hold phase.
				if (index === 0) {
					gsap.set(animTargets, { y: 0, opacity: 1 });
					return;
				}

				gsap.fromTo(
					animTargets,
					{
						y: 28,
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						duration: 0.85,
						stagger: 0.08,
						ease: "power3.out",
						scrollTrigger: {
							trigger: panel,
							containerAnimation: horizontalTween,
							start: "left 75%",
							end: "left 32%",
							toggleActions: "play none none reverse",
						},
						immediateRender: false,
					},
				);
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<Box
			as="section"
			id="projects"
			ref={sectionRef}
			position="relative"
			zIndex={2}
			h="100vh"
			overflow="hidden"
			scrollMarginTop="120px"
		>
			<Box
				ref={overlayRef}
				position="absolute"
				inset="0"
				opacity={0}
				pointerEvents="none"
				zIndex={0}
				css={{
					background: `
						linear-gradient(110deg, color-mix(in srgb, var(--color-primary-950) 84%, transparent) 8%, color-mix(in srgb, var(--color-primary-700) 55%, transparent) 46%, color-mix(in srgb, var(--color-primary-900) 90%, transparent) 100%),
						radial-gradient(circle at 18% 22%, color-mix(in srgb, var(--color-primary-300) 24%, transparent) 0%, transparent 42%),
						radial-gradient(circle at 86% 78%, color-mix(in srgb, var(--color-primary-200) 18%, transparent) 0%, transparent 44%),
						var(--color-bg-primary)
					`,
				}}
			/>

			<Flex
				ref={trackRef}
				position="relative"
				zIndex={1}
				h="100vh"
				w={`${slides.length * 100}vw`}
				willChange="transform"
			>
				{slides.map((slide) => (
					<Box
						key={slide.id}
						data-project-panel
						flex="0 0 100vw"
						h="100vh"
						display="flex"
						alignItems="center"
						justifyContent="center"
						px={{ base: 5, md: 10, lg: 16 }}
					>
						<Box
							w="full"
							maxW="1200px"
							p={{ base: 6, md: 9, lg: 10 }}
							borderRadius={{ base: "2xl", md: "3xl" }}
							border="1px solid"
							borderColor="color-mix(in srgb, var(--surface-floating-border) 84%, transparent)"
							bg="color-mix(in srgb, var(--surface-floating) 72%, transparent)"
							css={{
								backdropFilter: "blur(18px) saturate(145%)",
								boxShadow: "0 36px 72px -46px rgba(8, 16, 30, 0.72)",
							}}
						>
							{slide.type === "intro" ? (
								<Flex direction={{ base: "column", lg: "row" }} gap={{ base: 7, lg: 10 }}>
									<Box flex={{ lg: "1.05" }} minW="0">
										<Text
											data-project-anim
											fontSize={{ base: "2xs", md: "xs" }}
											fontWeight="700"
											letterSpacing="0.14em"
											textTransform="uppercase"
											color={slide.accent}
										>
											{slide.kicker}
										</Text>

										<Heading
											data-project-anim
											as="h2"
											mt={{ base: 2.5, md: 3 }}
											fontSize={{ base: "3xl", md: "5xl", lg: "5xl", xl: "6xl" }}
											lineHeight={{ base: "1.12", md: "1.04" }}
											letterSpacing="-0.03em"
											maxW="12ch"
										>
											{slide.title}
										</Heading>

										<Text
											data-project-anim
											mt={{ base: 4, md: 5 }}
											fontSize={{ base: "md", md: "2xl" }}
											lineHeight={{ base: "1.75", md: "1.6" }}
											color="var(--color-text-secondary)"
											maxW="34ch"
										>
											{slide.subtitle}
										</Text>
									</Box>

									<Flex flex="1" direction="column" gap={{ base: 3, md: 4 }} minW="0">
										{slide.principles.map((principle) => (
											<Box
												key={principle.label}
												data-project-anim
												p={{ base: 4, md: 5 }}
												borderRadius="2xl"
												border="1px solid"
												borderColor="color-mix(in srgb, var(--surface-floating-border) 78%, transparent)"
												bg="color-mix(in srgb, var(--color-bg-primary) 46%, transparent)"
												css={{
													boxShadow: "0 22px 32px -30px rgba(8, 16, 30, 0.78)",
												}}
											>
												<Text
													fontSize={{ base: "2xs", md: "xs" }}
													fontWeight="700"
													letterSpacing="0.14em"
													textTransform="uppercase"
													color={slide.accent}
												>
													{principle.label}
												</Text>
												<Text
													mt="2"
													fontSize={{ base: "lg", md: "xl" }}
													fontWeight="700"
													letterSpacing="-0.02em"
													color="var(--color-text-primary)"
												>
													{principle.title}
												</Text>
												<Text
													mt="2"
													fontSize={{ base: "sm", md: "md" }}
													lineHeight={{ base: "1.7", md: "1.75" }}
													color="var(--color-text-secondary)"
												>
													{principle.description}
												</Text>
											</Box>
										))}
									</Flex>
								</Flex>
							) : (
								<>
									<Text
										data-project-anim
										fontSize={{ base: "2xs", md: "xs" }}
										fontWeight="700"
										letterSpacing="0.14em"
										textTransform="uppercase"
										color={slide.accent}
									>
										{slide.kicker}
									</Text>

									<Heading
										data-project-anim
										as="h2"
										mt={{ base: 2.5, md: 3 }}
										fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
										lineHeight={{ base: "1.12", md: "1.04" }}
										letterSpacing="-0.03em"
									>
										{slide.title}
									</Heading>

									<Text
										data-project-anim
										mt={{ base: 4, md: 5 }}
										fontSize={{ base: "md", md: "2xl" }}
										lineHeight={{ base: "1.75", md: "1.6" }}
										color="var(--color-text-secondary)"
										maxW="54ch"
									>
										{slide.subtitle}
									</Text>

									<Flex
										mt={{ base: 5, md: 7 }}
										gap={{ base: 2.5, md: 3 }}
										direction="column"
									>
										{slide.highlights.map((highlight) => (
											<Flex key={highlight} data-project-anim align="flex-start" gap="3">
												<Box
													w={{ base: "8px", md: "10px" }}
													h={{ base: "8px", md: "10px" }}
													mt="0.52em"
													borderRadius="full"
													bg={slide.accent}
													boxShadow={`0 0 0 8px color-mix(in srgb, ${slide.accent} 18%, transparent)`}
													flexShrink={0}
												/>
												<Text
													fontSize={{ base: "sm", md: "xl" }}
													lineHeight={{ base: "1.6", md: "1.5" }}
													color="var(--color-text-primary)"
													fontWeight="550"
												>
													{highlight}
												</Text>
											</Flex>
										))}
									</Flex>
								</>
							)}
						</Box>
					</Box>
				))}
			</Flex>

			<Flex
				position="absolute"
				bottom={{ base: 5, md: 7 }}
				left="50%"
				transform="translateX(-50%)"
				zIndex={3}
				direction="column"
				align="center"
				gap={{ base: "1.5", md: "2" }}
				px={{ base: 3.5, md: 4.5 }}
				py={{ base: 2.5, md: 3 }}
				borderRadius="full"
				border="1px solid"
				borderColor="color-mix(in srgb, var(--surface-floating-border) 70%, transparent)"
				bg="color-mix(in srgb, var(--surface-floating) 62%, transparent)"
				pointerEvents="none"
				css={{
					backdropFilter: "blur(12px) saturate(142%)",
					boxShadow: "0 22px 40px -30px rgba(8, 16, 30, 0.84)",
				}}
			>
				<Box
					ref={progressRailRef}
					position="relative"
					w={{ base: `${Math.max(slides.length * 34, 110)}px`, md: `${Math.max(slides.length * 40, 136)}px` }}
					h="5px"
					borderRadius="full"
					bg="color-mix(in srgb, white 32%, transparent)"
					overflow="hidden"
				>
					<Box
						ref={progressThumbRef}
						position="absolute"
						top="0"
						left="0"
						w={{ base: `${Math.max(20, Math.floor(Math.max(slides.length * 34, 110) / slides.length) - 6)}px`, md: `${Math.max(22, Math.floor(Math.max(slides.length * 40, 136) / slides.length) - 8)}px` }}
						h="100%"
						borderRadius="full"
						bg="white"
						css={{
							boxShadow:
								"0 0 0 1px rgba(255, 255, 255, 0.55), 0 0 12px rgba(255, 255, 255, 0.5)",
						}}
					/>
				</Box>

				<Flex
					direction="row"
					justify="space-between"
					w={{ base: `${Math.max(slides.length * 34, 110)}px`, md: `${Math.max(slides.length * 40, 136)}px` }}
				>
					{slides.map((slide, index) => {
						const isActive = index === activeSlideIndex;
						return (
							<Text
								key={slide.id}
								fontFamily='"Lora", serif'
								fontSize={{ base: "lg", md: "2xl" }}
								fontWeight="500"
								letterSpacing="-0.02em"
								lineHeight="1"
								color="white"
								opacity={isActive ? 1 : 0.55}
								textShadow={
									isActive
										? "0 6px 14px rgba(4, 14, 27, 0.42)"
										: "0 2px 8px rgba(4, 14, 27, 0.22)"
								}
								transition="opacity 0.22s ease"
							>
								{toRomanNumeral(index + 1)}
							</Text>
						);
					})}
				</Flex>
			</Flex>
		</Box>
	);
}

export default FeaturedProjects;
