import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import type { ProjectMetric } from "./featuredProjects.constants";
import { ProjectMetricCard } from "./ProjectMetricCard";

export const METRIC_CARD_TRANSITION_DURATION_MS = 560;

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

interface ProjectMetricStackProps {
	metricHeading: string;
	activeMetric: ProjectMetric;
	incomingMetric: ProjectMetric | null;
	activeMetricOrder: string;
	incomingMetricOrder: string;
	prefersReducedMotion: boolean;
}

export function ProjectMetricStack({
	metricHeading,
	activeMetric,
	incomingMetric,
	activeMetricOrder,
	incomingMetricOrder,
	prefersReducedMotion,
}: ProjectMetricStackProps) {
	const activeMetricAnimation =
		!prefersReducedMotion && incomingMetric
			? `${metricCardSwipeOut} ${METRIC_CARD_TRANSITION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
			: undefined;

	const incomingMetricAnimation = incomingMetric
		? `${metricCardSwipeIn} ${METRIC_CARD_TRANSITION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
		: undefined;

	return (
		<Box
			data-project-case-metric-stack
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
				{metricHeading}
			</Text>
			<Box position="relative" h={{ base: "150px", md: "168px" }} w="full">
				<Box
					position="absolute"
					inset="0"
					borderRadius="2xl"
					bg="rgba(232, 243, 255, 0.62)"
					border="1px solid rgba(125, 167, 198, 0.26)"
					transform="translate3d(8px, 4px, 0)"
				/>
				<ProjectMetricCard
					key={activeMetric.id}
					metric={activeMetric}
					order={activeMetricOrder}
					transformOrigin="82% 18%"
					animation={activeMetricAnimation}
				/>
				{incomingMetric ? (
					<ProjectMetricCard
						key={incomingMetric.id}
						metric={incomingMetric}
						order={incomingMetricOrder}
						transformOrigin="18% 78%"
						animation={incomingMetricAnimation}
					/>
				) : null}
			</Box>
		</Box>
	);
}
