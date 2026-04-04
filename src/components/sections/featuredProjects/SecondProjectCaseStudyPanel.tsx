import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { SECTION_CONTAINER_PROPS, SECTION_VERTICAL_PADDING } from "@/theme/sectionLayout";
import {
	secondProjectHighlights,
	secondProjectMetrics,
	secondProjectModules,
	secondProjectSummary,
} from "./featuredProjects.constants";

const METRIC_ROTATE_INTERVAL_MS = 3400;
const METRIC_CARD_TRANSITION_DURATION_MS = 560;

const metricCardSwipeOut = keyframes`
	0% {
		transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
		opacity: 1;
		filter: blur(0px);
	}
	100% {
		transform: translate3d(-58%, -14%, 0) rotate(-7deg) scale(0.92);
		opacity: 0;
		filter: blur(1.8px);
	}
`;

const metricCardSwipeIn = keyframes`
	0% {
		transform: translate3d(56%, 16%, 0) rotate(8deg) scale(0.94);
		opacity: 0;
		filter: blur(2px);
	}
	100% {
		transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
		opacity: 1;
		filter: blur(0px);
	}
`;

export function SecondProjectCaseStudyPanel() {
	const [activeMetricIndex, setActiveMetricIndex] = useState(0);
	const [incomingMetricIndex, setIncomingMetricIndex] = useState<number | null>(null);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

		updateMotionPreference();

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", updateMotionPreference);

			return () => mediaQuery.removeEventListener("change", updateMotionPreference);
		}

		mediaQuery.addListener(updateMotionPreference);

		return () => mediaQuery.removeListener(updateMotionPreference);
	}, []);

	useEffect(() => {
		if (prefersReducedMotion || incomingMetricIndex !== null || secondProjectMetrics.length < 2) {
			return;
		}

		const rotateTimer = window.setTimeout(() => {
			setIncomingMetricIndex((activeMetricIndex + 1) % secondProjectMetrics.length);
		}, METRIC_ROTATE_INTERVAL_MS);

		return () => window.clearTimeout(rotateTimer);
	}, [activeMetricIndex, incomingMetricIndex, prefersReducedMotion]);

	useEffect(() => {
		if (incomingMetricIndex === null) {
			return;
		}

		const settleTimer = window.setTimeout(() => {
			setActiveMetricIndex(incomingMetricIndex);
			setIncomingMetricIndex(null);
		}, METRIC_CARD_TRANSITION_DURATION_MS);

		return () => window.clearTimeout(settleTimer);
	}, [incomingMetricIndex]);

	const activeMetric = secondProjectMetrics[activeMetricIndex];
	const incomingMetric =
		incomingMetricIndex === null ? null : secondProjectMetrics[incomingMetricIndex];
	const activeMetricOrder = `${String(activeMetricIndex + 1).padStart(2, "0")} / ${String(secondProjectMetrics.length).padStart(2, "0")}`;
	const incomingMetricOrder =
		incomingMetricIndex === null
			? activeMetricOrder
			: `${String(incomingMetricIndex + 1).padStart(2, "0")} / ${String(secondProjectMetrics.length).padStart(2, "0")}`;

	return (
		<Box
			data-project-panel
			data-project-case-two-panel
			flex="0 0 100vw"
			h="var(--viewport-height-dynamic)"
			display="flex"
			alignItems="center"
			py={SECTION_VERTICAL_PADDING}
		>
			<Container {...SECTION_CONTAINER_PROPS}>
				<Box data-project-case-two-shell w="full" maxW="6xl" mx="auto" px={{ base: 1, md: 2 }}>
					<Box
						h="1px"
						w="full"
						bg="var(--surface-floating-border)"
						opacity={0.65}
						mb={{ base: 5, md: 7 }}
					/>

					<Grid
						templateColumns={{ base: "1fr", lg: "minmax(0, 1.05fr) minmax(0, 0.95fr)" }}
						gap={{ base: 5, md: 6, lg: 8 }}
						alignItems="start"
					>
						<Box>
							<Text
								data-project-case-two-eyebrow
								fontSize={{ base: "xs", md: "sm" }}
								fontWeight="700"
								letterSpacing="0.2em"
								textTransform="uppercase"
								color="var(--color-text-accent)"
							>
								Project 02
							</Text>
							<Heading
								data-project-case-two-title
								as="h3"
								mt={{ base: 3, md: 4 }}
								fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
								lineHeight={{ base: 1.25, md: 1.2 }}
								maxW="26ch"
							>
								Built and optimized BetterHR&apos;s core web dashboard across regions.
							</Heading>
							<Flex mt={{ base: 3.5, md: 4.5 }} direction="column" gap={{ base: 2.5, md: 3 }}>
								{secondProjectSummary.map((line) => (
									<Text
										key={line}
										data-project-case-two-summary
										fontSize={{ base: "sm", md: "lg" }}
										lineHeight={{ base: 1.8, md: 1.75 }}
										color="var(--color-text-secondary)"
										maxW="72ch"
									>
										{line}
									</Text>
								))}
							</Flex>
						</Box>

						<Box
							data-project-case-two-metric-stack
							position="relative"
							w="full"
							maxW={{ base: "full", lg: "sm" }}
							justifySelf={{ base: "stretch", lg: "end" }}
							px={{ base: 0, sm: 1, lg: 0 }}
						>
							<Text
								fontSize={{ base: "2xs", md: "xs" }}
								fontWeight="700"
								letterSpacing="0.14em"
								textTransform="uppercase"
								color="var(--color-text-tertiary)"
								mb={{ base: 2.5, md: 3 }}
							>
								Impact Snapshot
							</Text>
							<Box position="relative" h={{ base: "150px", md: "168px" }} w="full">
								<Box
									position="absolute"
									inset="0"
									borderRadius="2xl"
									bg="rgba(224, 238, 251, 0.54)"
									border="1px solid rgba(125, 167, 198, 0.3)"
									transform="translate3d(16px, 10px, 0)"
								/>
								<Box
									position="absolute"
									inset="0"
									borderRadius="2xl"
									bg="rgba(232, 243, 255, 0.62)"
									border="1px solid rgba(125, 167, 198, 0.26)"
									transform="translate3d(8px, 4px, 0)"
								/>
								<Box
									key={activeMetric.id}
									data-project-case-two-metric
									position="absolute"
									inset="0"
									p={{ base: 4, md: 5 }}
									borderRadius="2xl"
									border="1px solid rgba(125, 167, 198, 0.34)"
									bg="rgba(240, 248, 255, 0.86)"
									backdropFilter="blur(10px)"
									boxShadow="0 16px 30px rgba(19, 52, 90, 0.14)"
									display="flex"
									flexDirection="column"
									justifyContent="space-between"
									transformOrigin="82% 18%"
									animation={
										!prefersReducedMotion && incomingMetric
											? `${metricCardSwipeOut} ${METRIC_CARD_TRANSITION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
											: undefined
									}
								>
									<Text
										fontSize={{ base: "3xl", md: "4xl" }}
										fontWeight="800"
										letterSpacing="-0.03em"
										color="var(--color-text-primary)"
									>
										{activeMetric.label}
									</Text>
									<Flex justify="space-between" align="flex-end" gap={3}>
										<Text
											fontSize={{ base: "xs", md: "sm" }}
											lineHeight={{ base: 1.55, md: 1.6 }}
											color="var(--color-text-tertiary)"
											maxW="24ch"
										>
											{activeMetric.description}
										</Text>
										<Text
											fontSize={{ base: "2xs", md: "xs" }}
											fontWeight="700"
											letterSpacing="0.12em"
											textTransform="uppercase"
											color="var(--color-text-accent)"
											flexShrink={0}
										>
											{activeMetricOrder}
										</Text>
									</Flex>
								</Box>

								{incomingMetric ? (
									<Box
										key={incomingMetric.id}
										data-project-case-two-metric
										position="absolute"
										inset="0"
										p={{ base: 4, md: 5 }}
										borderRadius="2xl"
										border="1px solid rgba(125, 167, 198, 0.34)"
										bg="rgba(240, 248, 255, 0.86)"
										backdropFilter="blur(10px)"
										boxShadow="0 16px 30px rgba(19, 52, 90, 0.14)"
										display="flex"
										flexDirection="column"
										justifyContent="space-between"
										transformOrigin="18% 78%"
										animation={`${metricCardSwipeIn} ${METRIC_CARD_TRANSITION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`}
									>
										<Text
											fontSize={{ base: "3xl", md: "4xl" }}
											fontWeight="800"
											letterSpacing="-0.03em"
											color="var(--color-text-primary)"
										>
											{incomingMetric.label}
										</Text>
										<Flex justify="space-between" align="flex-end" gap={3}>
											<Text
												fontSize={{ base: "xs", md: "sm" }}
												lineHeight={{ base: 1.55, md: 1.6 }}
												color="var(--color-text-tertiary)"
												maxW="24ch"
											>
												{incomingMetric.description}
											</Text>
											<Text
												fontSize={{ base: "2xs", md: "xs" }}
												fontWeight="700"
												letterSpacing="0.12em"
												textTransform="uppercase"
												color="var(--color-text-accent)"
												flexShrink={0}
											>
												{incomingMetricOrder}
											</Text>
										</Flex>
									</Box>
								) : null}
							</Box>
						</Box>
					</Grid>

					<Grid
						mt={{ base: 7, md: 8 }}
						templateColumns={{ base: "1fr", lg: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }}
						gap={{ base: 7, md: 8, lg: 10 }}
					>
						<Box>
							<Text
								data-project-case-two-scope-label
								fontSize={{ base: "xs", md: "sm" }}
								fontWeight="700"
								textTransform="uppercase"
								letterSpacing="0.16em"
								color="var(--color-text-tertiary)"
							>
								Ownership Scope
							</Text>
							<Flex
								mt={{ base: 2.5, md: 3 }}
								wrap="wrap"
								rowGap={{ base: 2, md: 2.5 }}
								columnGap={{ base: 1.5, md: 2 }}
							>
								{secondProjectModules.map((moduleName, index) => (
									<Text
										key={moduleName}
										data-project-case-two-module
										fontSize={{ base: "sm", md: "md" }}
										fontWeight="600"
										letterSpacing="0.01em"
										color="var(--color-text-secondary)"
									>
										{moduleName}
										{index < secondProjectModules.length - 1 ? " /" : ""}
									</Text>
								))}
							</Flex>
						</Box>

						<Box>
							<Text
								data-project-case-two-impact-label
								fontSize={{ base: "xs", md: "sm" }}
								fontWeight="700"
								textTransform="uppercase"
								letterSpacing="0.16em"
								color="var(--color-text-tertiary)"
							>
								Impact Highlights
							</Text>
							<Flex direction="column" mt={{ base: 2.5, md: 3 }} gap={{ base: 2, md: 2.5 }}>
								{secondProjectHighlights.map((highlight) => (
									<Text
										key={highlight}
										data-project-case-two-highlight
										fontSize={{ base: "sm", md: "md" }}
										lineHeight={{ base: 1.75, md: 1.8 }}
										color="var(--color-text-secondary)"
									>
										{highlight}
									</Text>
								))}
							</Flex>
						</Box>
					</Grid>
					<Box
						h="1px"
						w="full"
						bg="var(--surface-floating-border)"
						opacity={0.42}
						mt={{ base: 6, md: 8 }}
					/>
				</Box>
			</Container>
		</Box>
	);
}
