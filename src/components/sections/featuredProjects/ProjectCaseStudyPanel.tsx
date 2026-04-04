import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SECTION_CONTAINER_PROPS, SECTION_VERTICAL_PADDING } from "@/theme/sectionLayout";
import type { ProjectCaseStudyData } from "./featuredProjects.constants";
import { METRIC_CARD_TRANSITION_DURATION_MS, ProjectMetricStack } from "./ProjectMetricStack";

const METRIC_ROTATE_INTERVAL_MS = 3400;

interface ProjectCaseStudyPanelProps {
	project: ProjectCaseStudyData;
}

export function ProjectCaseStudyPanel({ project }: ProjectCaseStudyPanelProps) {
	const [activeMetricIndex, setActiveMetricIndex] = useState(0);
	const [incomingMetricIndex, setIncomingMetricIndex] = useState<number | null>(null);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	const metrics = project.metrics;

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
		if (prefersReducedMotion || incomingMetricIndex !== null || metrics.length < 2) {
			return;
		}

		const rotateTimer = window.setTimeout(() => {
			setIncomingMetricIndex((activeMetricIndex + 1) % metrics.length);
		}, METRIC_ROTATE_INTERVAL_MS);

		return () => window.clearTimeout(rotateTimer);
	}, [activeMetricIndex, incomingMetricIndex, metrics.length, prefersReducedMotion]);

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

	const activeMetric = metrics[activeMetricIndex];
	const incomingMetric = incomingMetricIndex === null ? null : metrics[incomingMetricIndex];
	const activeMetricOrder = `${String(activeMetricIndex + 1).padStart(2, "0")} / ${String(metrics.length).padStart(2, "0")}`;
	const incomingMetricOrder =
		incomingMetricIndex === null
			? activeMetricOrder
			: `${String(incomingMetricIndex + 1).padStart(2, "0")} / ${String(metrics.length).padStart(2, "0")}`;

	return (
		<Box
			data-project-panel
			data-project-case-panel
			data-project-id={project.id}
			flex="0 0 100vw"
			h="var(--viewport-height-dynamic)"
			display="flex"
			alignItems="center"
			py={SECTION_VERTICAL_PADDING}
		>
			<Container {...SECTION_CONTAINER_PROPS}>
				<Box data-project-case-shell w="full" maxW="6xl" mx="auto" px={{ base: 1, md: 2 }}>
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
								data-project-case-eyebrow
								fontSize={{ base: "xs", md: "sm" }}
								fontWeight="700"
								letterSpacing="0.2em"
								textTransform="uppercase"
								color="var(--color-text-accent)"
							>
								{project.label}
							</Text>
							<Heading
								data-project-case-title
								as="h3"
								mt={{ base: 3, md: 4 }}
								fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
								lineHeight={{ base: 1.25, md: 1.2 }}
								maxW="24ch"
							>
								{project.title}
							</Heading>
							<Flex mt={{ base: 3.5, md: 4.5 }} direction="column" gap={{ base: 2.5, md: 3 }}>
								{project.summary.map((line) => (
									<Text
										key={line}
										data-project-case-summary
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

						<ProjectMetricStack
							metricHeading={project.metricHeading}
							activeMetric={activeMetric}
							incomingMetric={incomingMetric}
							activeMetricOrder={activeMetricOrder}
							incomingMetricOrder={incomingMetricOrder}
							prefersReducedMotion={prefersReducedMotion}
						/>
					</Grid>

					<Grid
						mt={{ base: 7, md: 8 }}
						templateColumns={{ base: "1fr", lg: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }}
						gap={{ base: 7, md: 8, lg: 10 }}
					>
						<Box>
							<Text
								data-project-case-scope-label
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
								{project.modules.map((moduleName, index) => (
									<Text
										key={moduleName}
										data-project-case-module
										fontSize={{ base: "sm", md: "md" }}
										fontWeight="600"
										letterSpacing="0.01em"
										color="var(--color-text-secondary)"
									>
										{moduleName}
										{index < project.modules.length - 1 ? " /" : ""}
									</Text>
								))}
							</Flex>
						</Box>

						<Box display={{ base: "none", md: "block" }}>
							<Text
								data-project-case-impact-label
								fontSize={{ base: "xs", md: "sm" }}
								fontWeight="700"
								textTransform="uppercase"
								letterSpacing="0.16em"
								color="var(--color-text-tertiary)"
							>
								Impact Highlights
							</Text>
							<Flex direction="column" mt={{ base: 2.5, md: 3 }} gap={{ base: 2, md: 2.5 }}>
								{project.highlights.map((highlight) => (
									<Text
										key={highlight}
										data-project-case-highlight
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
