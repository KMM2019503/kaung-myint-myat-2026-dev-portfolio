import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { sectionAmbientBackground } from "@/theme/backgrounds";

interface ExperienceItem {
	id: string;
	period: string;
	role: string;
	company: string;
	location?: string;
	workType?: string;
	summary: string;
	highlights: string[];
}

const experienceItems: ExperienceItem[] = [
	{
		id: "better-ltd",
		period: "October 2024 - Present",
		role: "Frontend Web Developer",
		company: "Better Ltd.",
		location: "Yangon, Myanmar",
		workType: "On-site",
		summary:
			"This is my first experience in my professional career as a web developer. I have gained valuable experience and become proficient in frontend technologies and architectures.",
		highlights: [
			"Expanded beyond React and Next.js to Vue 2, Vue 3, Nuxt 2, and Nuxt 3.",
			"Built proficiency in Vue and Nuxt architecture, component structure, plugins, middleware, complex state management, and Ability-based permission handling.",
			"Used Apollo and GraphQL for data handling, and delivered complex payroll UI, banking integrations, real-time spreadsheet integrations, and bug fixes.",
		],
	},
	{
		id: "yojin-company",
		period: "February 2022 - June 2022",
		role: "Computer Technician",
		company: "Yojin Company",
		location: "Myanmar",
		summary: "Worked as a computer technician during this period.",
		highlights: [
			"Provided day-to-day computer support and maintenance tasks at Yojin company.",
		],
	},
];

export function Experience() {
	return (
		<Box
			as="section"
			id="experience"
			position="relative"
			zIndex={1}
			h="var(--viewport-height-dynamic)"
			minH="var(--viewport-height-dynamic)"
			display="flex"
			alignItems="center"
			overflow="hidden"
			scrollMarginTop="110px"
		>
			<Box
				position="absolute"
				inset="0"
				pointerEvents="none"
				css={{
					background: sectionAmbientBackground,
				}}
			/>

			<Container
				maxW="7xl"
				w="full"
				h="full"
				px={{ base: 5, md: 8, lg: 10 }}
				py={{ base: 5, md: 7 }}
				position="relative"
				zIndex={1}
			>
				<Flex direction="column" h="full" minH="0" gap={{ base: 5, md: 6 }}>
					<Box maxW="3xl" flexShrink={0}>
						<Text
							fontSize={{ base: "xs", md: "sm" }}
							fontWeight="700"
							letterSpacing="0.12em"
							textTransform="uppercase"
							color="var(--color-text-eyebrow)"
						>
							Experience
						</Text>
						<Heading
							as="h2"
							mt={{ base: 2, md: 3 }}
							fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
							lineHeight={{ base: "1.12", md: "1.06" }}
							letterSpacing="-0.03em"
						>
							Product-Focused Engineering Work
						</Heading>
						<Text
							mt={{ base: 3.5, md: 4.5 }}
							fontSize={{ base: "sm", md: "lg" }}
							lineHeight={{ base: "1.7", md: "1.6" }}
							color="var(--color-text-secondary)"
							maxW="58ch"
						>
							I focus on stable product delivery, thoughtful UX details, and cross-team collaboration that
							makes complex workflows feel simple for end users.
						</Text>
					</Box>

					<Flex direction="column" gap={{ base: 3.5, md: 4 }} flex="1" minH="0" overflowY="auto" pr="1">
						{experienceItems.map((item) => (
							<Box
								key={item.id}
								borderRadius={{ base: "2xl", md: "3xl" }}
								p={{ base: 4.5, md: 6 }}
								border="1px solid"
								borderColor="color-mix(in srgb, var(--surface-floating-border) 84%, transparent)"
								bg="color-mix(in srgb, var(--surface-floating) 72%, transparent)"
								css={{
									backdropFilter: "blur(12px) saturate(140%)",
									boxShadow: "0 24px 56px -42px rgba(14, 26, 42, 0.48)",
								}}
							>
								<Flex
									direction={{ base: "column", lg: "row" }}
									gap={{ base: 3.5, md: 4, lg: 7 }}
									align={{ lg: "flex-start" }}
								>
									<Box flex={{ lg: "0 0 260px" }}>
										<Text
											fontSize={{ base: "xs", md: "sm" }}
											fontWeight="700"
											letterSpacing="0.1em"
											textTransform="uppercase"
											color="var(--color-text-eyebrow)"
										>
											{item.period}
										</Text>
										<Heading as="h3" mt={{ base: 1.5, md: 2 }} fontSize={{ base: "xl", md: "2xl" }}>
											{item.role}
										</Heading>
										<Text mt="1.5" color="var(--color-text-accent-strong)" fontWeight="600">
											{item.company}
										</Text>
										{item.location ? (
											<Text mt="1" fontSize={{ base: "xs", md: "sm" }} color="var(--color-text-tertiary)">
												{item.location}
												{item.workType ? ` · ${item.workType}` : ""}
											</Text>
										) : null}
									</Box>

									<Box flex="1" minW="0">
										<Text
											fontSize={{ base: "sm", md: "md" }}
											lineHeight={{ base: "1.65", md: "1.7" }}
											color="var(--color-text-secondary)"
										>
											{item.summary}
										</Text>

										<Flex mt={{ base: 3, md: 3.5 }} direction="column" gap={{ base: 2, md: 2.5 }}>
											{item.highlights.map((highlight) => (
												<Flex key={highlight} align="flex-start" gap="3">
													<Box
														w="8px"
														h="8px"
														mt="0.52em"
														borderRadius="full"
														bg="var(--color-primary-500)"
														boxShadow="0 0 0 7px color-mix(in srgb, var(--color-primary-500) 18%, transparent)"
														flexShrink={0}
													/>
													<Text
														fontSize={{ base: "sm", md: "sm" }}
														lineHeight={{ base: "1.55", md: "1.6" }}
														color="var(--color-text-primary)"
													>
														{highlight}
													</Text>
												</Flex>
											))}
										</Flex>
									</Box>
								</Flex>
							</Box>
						))}
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}

export default Experience;
