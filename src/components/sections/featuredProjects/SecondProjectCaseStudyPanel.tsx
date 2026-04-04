import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { SECTION_CONTAINER_PROPS, SECTION_VERTICAL_PADDING } from "@/theme/sectionLayout";
import {
	secondProjectHighlights,
	secondProjectMetrics,
	secondProjectModules,
	secondProjectSummary,
} from "./featuredProjects.constants";

export function SecondProjectCaseStudyPanel() {
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
							<Flex direction="column" gap={{ base: 2.5, md: 3 }}>
								{secondProjectMetrics.map((metric) => (
									<Box
										key={metric.id}
										data-project-case-two-metric
										borderRadius="xl"
										border="1px solid rgba(125, 167, 198, 0.26)"
										bg="rgba(240, 248, 255, 0.78)"
										boxShadow="0 10px 22px rgba(19, 52, 90, 0.1)"
										backdropFilter="blur(8px)"
										p={{ base: 3.5, md: 4 }}
									>
										<Text
											fontSize={{ base: "sm", md: "md" }}
											fontWeight="700"
											letterSpacing="0.01em"
											color="var(--color-text-primary)"
										>
											{metric.label}
										</Text>
										<Text
											mt={1.5}
											fontSize={{ base: "xs", md: "sm" }}
											lineHeight={{ base: 1.6, md: 1.7 }}
											color="var(--color-text-tertiary)"
										>
											{metric.description}
										</Text>
									</Box>
								))}
							</Flex>
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
