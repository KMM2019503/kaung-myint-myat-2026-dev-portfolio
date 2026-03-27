import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { gsap } from "gsap";
import { Download, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const floatingChips = [
	{
		id: "chip-typescript",
		label: "TypeScript",
		top: { base: "-8%", md: "2%" },
		left: { base: "3%", md: "-4%" },
		showOnMobile: true,
	},
	{
		id: "chip-react-native",
		label: "React Native",
		top: { base: "18%", md: "22%" },
		right: { base: "2%", md: "-9%" },
		showOnMobile: false,
	},
	{
		id: "chip-react",
		label: "React",
		top: { base: "42%", md: "40%" },
		left: { base: "2%", md: "-2%" },
		showOnMobile: true,
	},
	{
		id: "chip-vue",
		label: "Vue.js",
		top: { base: "68%", md: "56%" },
		right: { base: "1%", md: "-8%" },
		showOnMobile: true,
	},
	{
		id: "chip-node",
		label: "JavaScript",
		top: { base: "82%", md: "72%" },
		left: { base: "5%", md: "-4%" },
		showOnMobile: false,
	},
];

const inCardBadage = [
	"Node.js",
	"Next.js",
	"Nuxt.js",
	"Express",
	"Prisma",
	"GraphQL",
	"Rest API",
	"Git",
	"Agent Coding",
	"SEO Optimization",
	"Performance Tuning",
	"Cross-Browser Compatibility",
];
const inCardBadgeTickerItems = ["loop-a", "loop-b"].flatMap((loopId) =>
	inCardBadage.map((tag) => ({ key: `${loopId}-${tag}`, tag })),
);

const codeLines = [
	"interface ProductExperience {",
	"  accessibility: true;",
	"  performance: 'optimized';",
	"  interactionDesign: 'intentional';",
	"}",
];

export function Hero() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const productBadgeRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const visualRef = useRef<HTMLDivElement>(null);
	const chipLayerRef = useRef<HTMLDivElement>(null);
	const inCardBadgeTickerRef = useRef<HTMLDivElement>(null);
	const [typedCodeLines, setTypedCodeLines] = useState<string[]>(() => codeLines.map(() => ""));
	const [activeTypingLine, setActiveTypingLine] = useState<number | null>(0);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

			timeline.from(headingRef.current?.children ?? [], {
				y: 48,
				opacity: 0,
				duration: 0.9,
				stagger: 0.14,
			});

			timeline.from(
				descriptionRef.current,
				{
					y: 24,
					opacity: 0,
					duration: 0.7,
				},
				"-=0.45",
			);

			timeline.from(
				ctaRef.current?.children ?? [],
				{
					y: 18,
					opacity: 0,
					duration: 0.6,
					stagger: 0.1,
				},
				"-=0.35",
			);

			timeline.from(
				visualRef.current,
				{
					y: 32,
					opacity: 0,
					scale: 0.96,
					duration: 0.95,
				},
				"-=0.65",
			);

			timeline.from(
				chipLayerRef.current?.children ?? [],
				{
					scale: 0.65,
					opacity: 0,
					duration: 0.45,
					stagger: 0.08,
					ease: "back.out(2)",
				},
				"-=0.45",
			);

			const chipElements = gsap.utils.toArray<HTMLElement>(chipLayerRef.current?.children ?? []);
			const chipTimings = [1.9, 2.35, 2.75, 2.1, 2.55, 2.95];
			const chipLift = [-8, -12, -10, -14, -9, -13];

			chipElements.forEach((chip, index) => {
				gsap.to(chip, {
					y: chipLift[index % chipLift.length],
					duration: chipTimings[index % chipTimings.length],
					delay: index * 0.08,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			});

			gsap.to("[data-orbit]", {
				y: 16,
				duration: 3.2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			if (productBadgeRef.current) {
				gsap.to(productBadgeRef.current, {
					y: -6,
					rotate: -1.2,
					duration: 2.3,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}

			if (
				inCardBadgeTickerRef.current &&
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches
			) {
				gsap.to(inCardBadgeTickerRef.current, {
					xPercent: -50,
					duration: 28,
					repeat: -1,
					ease: "none",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setTypedCodeLines(codeLines);
			setActiveTypingLine(null);
			return;
		}

		let lineIndex = 0;
		let charIndex = 0;
		let timeoutId: number | undefined;

		const startDelay = 380;
		const charDelay = 26;
		const lineDelay = 160;

		const typeNext = () => {
			if (lineIndex >= codeLines.length) {
				setActiveTypingLine(null);
				return;
			}

			setActiveTypingLine(lineIndex);
			const currentLine = codeLines[lineIndex];

			if (charIndex < currentLine.length) {
				const nextCharIndex = charIndex + 1;
				setTypedCodeLines((prev) => {
					const next = [...prev];
					next[lineIndex] = currentLine.slice(0, nextCharIndex);
					return next;
				});
				charIndex = nextCharIndex;
				timeoutId = window.setTimeout(typeNext, charDelay);
				return;
			}

			lineIndex += 1;
			charIndex = 0;
			timeoutId = window.setTimeout(typeNext, lineDelay);
		};

		timeoutId = window.setTimeout(typeNext, startDelay);
		return () => {
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}
		};
	}, []);

	return (
		<Box
			as="section"
			id="home"
			ref={sectionRef}
			minH="100vh"
			position="relative"
			overflow="hidden"
			display="flex"
			alignItems="center"
			justifyContent="center"
			scrollMarginTop="120px"
		>
			<Box
				position="absolute"
				inset="0"
				pointerEvents="none"
				css={{
					background: `
						radial-gradient(circle at 82% 24%, color-mix(in srgb, var(--color-primary-300) 38%, transparent) 0%, transparent 46%),
						radial-gradient(circle at 8% 78%, color-mix(in srgb, var(--color-primary-200) 32%, transparent) 0%, transparent 48%)
					`,
				}}
			/>

			<Container
				maxW="7xl"
				w="full"
				mx="auto"
				px={{ base: 4, md: 8, lg: 10 }}
				position="relative"
				zIndex="1"
				pt={{ base: "96px", md: "130px" }}
				pb={{ base: 12, md: 18 }}
			>
				<Flex
					direction={{ base: "column", lg: "row" }}
					align={{ base: "stretch", lg: "center" }}
					gap={{ base: 8, lg: 16, xl: 20 }}
				>
					<Flex direction="column" flex="1" minW="0" maxW={{ lg: "600px", xl: "620px" }}>
						<Box ref={headingRef} mt={{ base: 5, md: 6 }}>
							<Text
								fontSize={{ base: "xs", md: "lg" }}
								fontWeight="700"
								letterSpacing="0.14em"
								textTransform="uppercase"
								color="var(--color-text-eyebrow)"
							>
								Kaung Myint Myat
							</Text>

							<Heading
								as="h1"
								mt={{ base: 2, md: 2.5 }}
								fontFamily='"Lora", serif'
								letterSpacing="-0.02em"
								lineHeight="1.08"
								color="var(--color-text-primary)"
							>
								<Box as="span" position="relative" display="inline-block" pt={{ base: 2, md: 1 }}>
									<Text
										as="span"
										display="block"
										fontSize={{ base: "2xl", sm: "3xl", md: "3xl", lg: "3xl" }}
										fontWeight="700"
										letterSpacing="-0.018em"
										whiteSpace="nowrap"
									>
										Frontend & Mobile Developer
									</Text>

									<Flex
										ref={productBadgeRef}
										as="span"
										position="absolute"
										top={{ base: "-8px", md: "-16px" }}
										right={{ base: "-4px", md: "-30px" }}
										display="inline-flex"
										align="center"
										gap="1"
										px={{ base: 2, md: 2.5 }}
										py={{ base: 1 }}
										borderRadius="full"
										bg="color-mix(in srgb, var(--color-primary-100) 10%, transparent)"
										css={{
											border:
												"1px solid color-mix(in srgb, var(--color-primary-500) 26%, transparent)",
											boxShadow:
												"0 10px 20px -14px color-mix(in srgb, var(--color-text-accent-strong) 72%, transparent)",
										}}
										color="var(--color-text-accent-strong)"
										fontFamily='"Ubuntu", sans-serif'
										fontSize={{ base: "2xs", md: "xs" }}
										fontWeight="600"
										letterSpacing="0.015em"
										lineHeight="1"
										whiteSpace="nowrap"
									>
										<Sparkles size={10} />
										Product-focused
									</Flex>
								</Box>
							</Heading>

							<Text
								mt={{ base: 4, md: 4.5 }}
								fontFamily='"Ubuntu", sans-serif'
								fontSize={{ base: "lg", sm: "xl", md: "xl" }}
								fontWeight="500"
								letterSpacing="0.008em"
								lineHeight={{ base: "1.45", md: "1.4" }}
								background="var(--gradient-text-accent)"
								backgroundClip="text"
								color="transparent"
							>
								Building high-performance, user-centric digital products
							</Text>
						</Box>

						<Box
							ref={descriptionRef}
							data-hero-message="true"
							mt={{ base: 4, md: 6 }}
							w="full"
							maxW={{ lg: "580px", xl: "600px" }}
							pl={{ base: 3.5, md: 5 }}
							pr={{ base: 3.5, md: 3 }}
							py={{ base: 2, md: 3 }}
							border="1px solid"
							borderColor="color-mix(in srgb, var(--surface-floating-border) 72%, transparent)"
							borderLeftWidth={{ base: "3px", md: "4px" }}
							borderLeftStyle="solid"
							borderLeftColor="var(--color-primary-500)"
							borderRadius="md"
							bg="color-mix(in srgb, var(--surface-floating) 82%, transparent)"
							css={{
								backdropFilter: "blur(14px) saturate(145%)",
								boxShadow: "0 20px 40px -30px rgba(15, 23, 42, 0.45)",
							}}
						>
							<Flex align="center" gap="2" mb={{ base: "2", md: "2.5" }}>
								<Box
									w="9px"
									h="9px"
									borderRadius="full"
									bg="var(--color-primary-500)"
									css={{
										boxShadow:
											"0 0 0 7px color-mix(in srgb, var(--color-primary-300) 42%, transparent)",
									}}
								/>
								<Text
									fontSize={{ base: "sm", md: "md" }}
									fontWeight="700"
									letterSpacing="0.06em"
									textTransform="uppercase"
									color="var(--color-text-primary)"
								>
									Product-minded Engineering
								</Text>
							</Flex>

							<Text
								fontSize={{ base: "md", md: "lg", lg: "xl" }}
								lineHeight={{ base: "1.7", md: "1.8" }}
								color="var(--color-text-primary)"
								maxW="60ch"
								fontWeight="500"
							>
								Product-minded engineer focused on speed, clarity, and scalable architecture.
							</Text>

							<Flex
								mt={{ base: 2.5, md: 3.5 }}
								direction="column"
								gap={{ base: "1.5", md: "2" }}
								maxW="62ch"
							>
								<Box px={{ base: 2.5, md: 3.5 }} py={{ base: 1.5, md: 2.5 }} bg="transparent">
									<Flex align="flex-start" gap="2.5">
										<Box
											w={{ base: "7px", md: "8px" }}
											h={{ base: "7px", md: "8px" }}
											mt="0.42em"
											flexShrink={0}
											borderRadius="full"
											bg="var(--color-primary-500)"
										/>
										<Text
											fontSize={{ base: "sm", md: "md" }}
											lineHeight={{ base: "1.5", md: "1.6" }}
											color="var(--color-text-secondary)"
											fontWeight="500"
										>
											Built and scaled HR platforms used by{" "}
											<Box as="span" color="var(--color-text-accent-strong)" fontWeight="700">
												50K+ daily users.
											</Box>
										</Text>
									</Flex>
								</Box>

								<Box px={{ base: 2.5, md: 3.5 }} py={{ base: 1.5, md: 2.5 }} bg="transparent">
									<Flex align="flex-start" gap="2.5">
										<Box
											w={{ base: "7px", md: "8px" }}
											h={{ base: "7px", md: "8px" }}
											mt="0.42em"
											flexShrink={0}
											borderRadius="full"
											bg="var(--color-primary-500)"
										/>
										<Text
											fontSize={{ base: "sm", md: "md" }}
											lineHeight={{ base: "1.5", md: "1.6" }}
											color="var(--color-text-secondary)"
											fontWeight="500"
										>
											Built complex HR systems for scalability and maintainability across{" "}
											<Box as="span" color="var(--color-text-accent-strong)" fontWeight="700">
												8+ countries.
											</Box>
										</Text>
									</Flex>
								</Box>
							</Flex>
						</Box>

						<Flex
							mt={{ base: 3.5, md: 5 }}
							align={{ base: "flex-start", md: "center" }}
							direction={{ base: "column", md: "row" }}
							gap={{ base: "1.5", md: "3" }}
							color="var(--color-text-tertiary)"
							fontSize={{ base: "sm", md: "md" }}
							fontWeight="500"
							flexWrap="wrap"
						>
							<Flex align="center" gap="2">
								<MapPin size={16} />
								<Text>Yangon, Myanmar</Text>
							</Flex>
							<Box
								display={{ base: "none", md: "block" }}
								w="4px"
								h="4px"
								borderRadius="full"
								bg="var(--color-primary-500)"
							/>
							<Text>Remote-friendly collaborator</Text>
						</Flex>

						<Flex ref={ctaRef} mt={{ base: 6, md: 8 }} gap="3" flexWrap="wrap" align="center">
							<Link
								href="https://drive.google.com/file/d/1XW9yeee0fN64HLe9Ara_e2-HZTqPveAV/view?usp=sharing"
								target="_blank"
								rel="noopener noreferrer"
								display="inline-flex"
								alignItems="center"
								gap="2"
								px={{ base: 5, md: 6 }}
								py={{ base: 3, md: 3.5 }}
								borderRadius="full"
								fontSize={{ base: "sm", md: "md" }}
								fontWeight="600"
								color="var(--color-text-primary)"
								textDecoration="none"
								border="1px solid"
								borderColor="var(--color-border)"
								bg="color-mix(in srgb, var(--color-bg-primary) 86%, transparent)"
								_hover={{
									borderColor: "var(--color-primary-500)",
									color: "var(--color-text-accent-strong)",
									transform: "translateY(-2px)",
								}}
								transition="all 0.24s ease"
							>
								<Download size={16} />
								Download CV
							</Link>
						</Flex>
					</Flex>

					<Box
						flex="1"
						w="full"
						minW="0"
						maxW={{ lg: "760px", xl: "820px" }}
						ref={visualRef}
						position="relative"
						ml={{ lg: 2, xl: 4 }}
						mt={{ base: 2, lg: 0 }}
					>
						<Box
							w="full"
							p={{ base: 4, md: 7 }}
							borderRadius={{ base: "2xl", md: "3xl" }}
							border="1px solid"
							borderColor="var(--color-border)"
							bg="color-mix(in srgb, var(--color-bg-primary) 84%, transparent)"
							css={{
								backdropFilter: "blur(14px)",
								boxShadow: "0 24px 60px -42px rgba(15, 23, 42, 0.55)",
							}}
						>
							<Flex
								justify="space-between"
								align={{ base: "flex-start", md: "center" }}
								mb={{ base: 4, md: 5 }}
								flexWrap="wrap"
								gap="3"
							>
								<Text
									fontSize={{ base: "2xs", md: "xs" }}
									textTransform="uppercase"
									letterSpacing="0.08em"
									fontWeight="700"
									color="var(--color-text-tertiary)"
								>
									Technical Snapshot
								</Text>
								<Box
									px={{ base: "2.5", md: "3" }}
									py={{ base: "1", md: "1.5" }}
									borderRadius="full"
									bg="color-mix(in srgb, var(--color-bg-primary) 80%, transparent)"
									color="var(--color-text-accent-strong)"
									fontSize={{ base: "2xs", md: "xs" }}
									fontWeight="600"
									boxShadow="0 20px 30px -20px color-mix(in srgb, var(--color-accent) 84%, transparent)"
								>
									Frontend & Mobile Focus
								</Box>
							</Flex>

							<Box
								borderRadius="xl"
								bg="color-mix(in srgb, var(--color-bg-secondary) 86%, transparent)"
								border="1px solid"
								borderColor="var(--color-border)"
								p={{ base: 3.5, md: 5 }}
							>
								{codeLines.map((line, index) => (
									<Text
										key={line}
										fontFamily='"IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace'
										fontSize={{ base: "2xs", md: "sm" }}
										lineHeight={{ base: "1.8", md: "1.9" }}
										color={
											index === 0 || index === codeLines.length - 1
												? "var(--color-text-accent)"
												: "var(--color-text-secondary)"
										}
										display="flex"
										alignItems="center"
									>
										{typedCodeLines[index] || "\u00a0"}
										{activeTypingLine === index ? (
											<Box
												as="span"
												ml="1"
												color="var(--color-text-accent)"
												fontWeight="700"
												lineHeight="1"
												style={{ animation: "code-caret-blink 1s steps(1) infinite" }}
											>
												|
											</Box>
										) : null}
									</Text>
								))}
							</Box>

							<Box
								mt={{ base: 4, md: 5 }}
								overflow="hidden"
								position="relative"
								css={{
									maskImage:
										"linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
									WebkitMaskImage:
										"linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
								}}
							>
								<Flex
									ref={inCardBadgeTickerRef}
									display="inline-flex"
									align="center"
									gap={{ base: "1.5", md: "2" }}
									w="max-content"
									pr={{ base: "1.5", md: "2" }}
									css={{ willChange: "transform" }}
								>
									{inCardBadgeTickerItems.map((item) => (
										<Flex
											key={item.key}
											align="center"
											gap="1.5"
											px={{ base: "2.5", md: "3" }}
											py={{ base: "1", md: "1.5" }}
											borderRadius="full"
											fontSize={{ base: "2xs", md: "xs" }}
											fontWeight="600"
											bg="var(--color-bg-secondary)"
											color="var(--color-text-secondary)"
											flexShrink={0}
										>
											<Box
												w={{ base: "5px", md: "6px" }}
												h={{ base: "5px", md: "6px" }}
												borderRadius="full"
												bg="var(--color-primary-500)"
												opacity="0.82"
											/>
											{item.tag}
										</Flex>
									))}
								</Flex>
							</Box>
						</Box>

						<Box
							ref={chipLayerRef}
							position="absolute"
							inset="0"
							pointerEvents="none"
							display="block"
						>
							{floatingChips.map((chip) => (
								<Box
									key={chip.id}
									data-float-chip="true"
									display={{ base: chip.showOnMobile ? "block" : "none", md: "block" }}
									position="absolute"
									top={chip.top}
									left={chip.left}
									right={chip.right}
									px={{ base: "2.5", md: "3.5" }}
									py={{ base: "1.5", md: "2" }}
									borderRadius="full"
									border="1px solid"
									borderColor="var(--color-border)"
									bg="color-mix(in srgb, var(--color-bg-primary) 80%, transparent)"
									fontSize={{ base: "2xs", md: "sm" }}
									fontWeight="600"
									color="var(--color-text-secondary)"
									css={{ backdropFilter: "blur(10px)" }}
								>
									{chip.label}
								</Box>
							))}
						</Box>

						<Box
							data-orbit="true"
							display={{ base: "none", md: "block" }}
							position="absolute"
							bottom={{ base: "-16px", md: "-26px" }}
							right={{ base: "16px", md: "28px" }}
							px={{ base: "4", md: "5" }}
							py={{ base: "2.5", md: "3" }}
							borderRadius="2xl"
							bg="var(--color-accent)"
							color="white"
							fontSize={{ base: "sm", md: "md" }}
							fontWeight="600"
							boxShadow="0 20px 30px -20px color-mix(in srgb, var(--color-accent) 84%, transparent)"
						>
							Ship fast, scale clean.
						</Box>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}

export default Hero;
