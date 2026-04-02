import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { SECTION_CONTAINER_PROPS, SECTION_VERTICAL_PADDING } from "@/theme/sectionLayout";
import {
	firstProjectHighlights,
	firstProjectMetrics,
	firstProjectModules,
} from "./featuredProjects.constants";

export function ProjectCaseStudyPanel() {
	return (
		<Box
			data-project-panel
			data-project-case-panel
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
					<Text
						data-project-case-eyebrow
						fontSize={{ base: "xs", md: "sm" }}
						fontWeight="700"
						letterSpacing="0.2em"
						textTransform="uppercase"
						color="var(--color-text-accent)"
					>
						Project 01
					</Text>
					<Heading
						data-project-case-title
						as="h3"
						mt={{ base: 3, md: 4 }}
						fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
						lineHeight={{ base: 1.25, md: 1.2 }}
						maxW="24ch"
					>
						Scaled a React Native HR app to 50K daily active users.
					</Heading>
					<Text
						data-project-case-summary
						mt={{ base: 3.5, md: 4.5 }}
						fontSize={{ base: "sm", md: "lg" }}
						lineHeight={{ base: 1.8, md: 1.75 }}
						color="var(--color-text-secondary)"
						maxW="72ch"
					>
						I led Onboarding, Leave, KPI, Settings, Payslip, Scan & Remote Check In/Out, CV
						Screening, and Expense while aligning behavior with the legacy Swift and Kotlin apps.
					</Text>

					<Grid
						mt={{ base: 5, md: 6 }}
						templateColumns={{ base: "repeat(1, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }}
						gap={{ base: 5, md: 6 }}
					>
						{firstProjectMetrics.map((metric) => (
							<Box
								key={metric.id}
								data-project-case-metric
								pb={{ base: 3, md: 3.5 }}
								borderBottom="1px solid"
								borderColor="var(--surface-floating-border)"
							>
								<Text
									fontSize={{ base: "2xl", md: "3xl" }}
									fontWeight="800"
									letterSpacing="-0.02em"
									color="var(--color-text-primary)"
								>
									{metric.label}
								</Text>
								<Text
									mt="1.5"
									fontSize={{ base: "xs", md: "sm" }}
									lineHeight={{ base: 1.55, md: 1.6 }}
									color="var(--color-text-tertiary)"
								>
									{metric.description}
								</Text>
							</Box>
						))}
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
								{firstProjectModules.map((moduleName, index) => (
									<Text
										key={moduleName}
										data-project-case-module
										fontSize={{ base: "sm", md: "md" }}
										fontWeight="600"
										letterSpacing="0.01em"
										color="var(--color-text-secondary)"
									>
										{moduleName}
										{index < firstProjectModules.length - 1 ? " /" : ""}
									</Text>
								))}
							</Flex>
						</Box>

						<Box>
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
								{firstProjectHighlights.map((highlight) => (
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
