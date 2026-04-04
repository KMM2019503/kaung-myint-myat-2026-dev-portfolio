import { Box, Flex, Text } from "@chakra-ui/react";
import type { ProjectMetric } from "./featuredProjects.constants";

interface ProjectMetricCardProps {
	metric: ProjectMetric;
	order: string;
	transformOrigin: string;
	animation?: string;
}

export function ProjectMetricCard({
	metric,
	order,
	transformOrigin,
	animation,
}: ProjectMetricCardProps) {
	return (
		<Box
			data-project-case-metric
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
			transformOrigin={transformOrigin}
			animation={animation}
		>
			<Text
				fontSize={{ base: "2xl", md: "2xl" }}
				fontWeight="800"
				letterSpacing="-0.03em"
				color="var(--color-text-primary)"
			>
				{metric.label}
			</Text>
			<Flex justify="space-between" align="flex-end" gap={3}>
				<Text
					fontSize={{ base: "xs", md: "sm" }}
					lineHeight={{ base: 1.55, md: 1.6 }}
					color="var(--color-text-tertiary)"
					maxW="24ch"
				>
					{metric.description}
				</Text>
				<Text
					fontSize={{ base: "2xs", md: "xs" }}
					fontWeight="700"
					letterSpacing="0.12em"
					textTransform="uppercase"
					color="var(--color-text-accent)"
					flexShrink={0}
				>
					{order}
				</Text>
			</Flex>
		</Box>
	);
}
