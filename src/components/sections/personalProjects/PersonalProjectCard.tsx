import { Badge, Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import {
	PersonalProjectDetailsButton,
	PersonalProjectLiveSiteButton,
} from "./PersonalProjectActionButtons";
import type { PersonalProject } from "./personalProjects.constants";

interface PersonalProjectCardProps {
	project: PersonalProject;
	projectNumber: string;
	onViewDetails: (project: PersonalProject) => void;
}

const techStackMarquee = keyframes`
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-50%, 0, 0);
	}
`;

export function PersonalProjectCard({
	project,
	projectNumber,
	onViewDetails,
}: PersonalProjectCardProps) {
	const techOccurrenceCounter = new Map<string, number>();
	const baseTechStackItems = project.techStack.map((tech) => {
		const occurrence = (techOccurrenceCounter.get(tech) ?? 0) + 1;
		techOccurrenceCounter.set(tech, occurrence);

		return {
			id: `${tech}-${occurrence}`,
			label: tech,
		};
	});

	const shouldAnimateTechStack = project.techStack.length > 1;
	const marqueeTechStack = shouldAnimateTechStack
		? [
				...baseTechStackItems,
				...baseTechStackItems.map((item) => ({
					id: `${item.id}-duplicate`,
					label: item.label,
				})),
			]
		: baseTechStackItems;

	return (
		<Box
			position="relative"
			overflow="hidden"
			h="full"
			transform={{ md: "rotate(2deg)" }}
			transition="transform 240ms cubic-bezier(0.22, 1, 0.36, 1)"
			willChange="transform"
			borderRadius={{ base: "20px", md: "28px" }}
			border="1px solid color-mix(in srgb, var(--surface-floating-border) 88%, transparent)"
			background="linear-gradient(130deg, color-mix(in srgb, var(--color-primary-100) 48%, transparent), color-mix(in srgb, var(--surface-floating-solid) 88%, transparent))"
			p={{ base: 4, md: 5 }}
			css={{
				"@media (hover: hover)": {
					"&:hover, &:focus-within": {
						transform: "rotate(0deg)",
					},
				},
				"@media (prefers-reduced-motion: reduce)": {
					transition: "none",
				},
			}}
		>
			<Box
				position="absolute"
				inset="-18% auto auto -12%"
				w={{ base: "160px", md: "200px" }}
				h={{ base: "160px", md: "200px" }}
				rounded="full"
				pointerEvents="none"
				bg="radial-gradient(circle, color-mix(in srgb, var(--color-primary-400) 34%, transparent), transparent 70%)"
			/>
			<Box
				position="absolute"
				inset="auto -10% -18% auto"
				w={{ base: "140px", md: "180px" }}
				h={{ base: "140px", md: "180px" }}
				rounded="full"
				pointerEvents="none"
				bg="radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 26%, transparent), transparent 72%)"
			/>

			<Flex position="relative" direction="column" h="full" gap={{ base: 3, md: 4 }}>
				<Flex direction="column" gap={{ base: 4, md: 5 }}>
					<Flex
						align={{ base: "flex-start", sm: "center" }}
						justify="space-between"
						gap={3}
						flexWrap="wrap"
					>
						<Badge
							alignSelf="flex-start"
							px={2.5}
							py={1}
							borderRadius="full"
							fontSize="0.58rem"
							fontWeight="700"
							letterSpacing="0.16em"
							textTransform="uppercase"
							bg="color-mix(in srgb, var(--color-primary-500) 14%, transparent)"
							color="var(--color-text-accent-strong)"
							border="1px solid color-mix(in srgb, var(--color-primary-500) 32%, transparent)"
						>
							Personal Build
						</Badge>
						<Text
							display={{ base: "none", md: "block" }}
							fontSize={{ base: "2xs", md: "xs" }}
							fontWeight="700"
							letterSpacing="0.2em"
							textTransform="uppercase"
							color="var(--color-text-tertiary)"
						>
							Project {projectNumber}
						</Text>
					</Flex>

					<Box position="relative" overflow="hidden" borderRadius={{ base: "14px", md: "18px" }}>
						<Image
							src={project.image.src}
							alt={project.image.alt}
							w="full"
							h={{ base: "150px", md: "170px", xl: "180px" }}
							objectFit="cover"
						/>
					</Box>
				</Flex>

				<Box minW={0}>
					<Heading
						as="h3"
						fontSize={{ base: "lg", md: "medium" }}
						fontWeight="extrabold"
						letterSpacing="-0.02em"
						lineHeight={{ base: 1.25, md: 1.18 }}
						css={{
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							"@media screen and (min-width: 48em)": {
								WebkitLineClamp: 2,
							},
						}}
					>
						{project.projectTitle}
					</Heading>
					<Text
						mt={2}
						fontSize={{ base: "sm", md: "sm" }}
						lineHeight={{ base: 1.75, md: 1.7 }}
						color="var(--color-text-secondary)"
						css={{
							display: "-webkit-box",
							WebkitLineClamp: 4,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							"@media screen and (min-width: 48em)": {
								WebkitLineClamp: 3,
							},
						}}
					>
						{project.oneLineSummary}
					</Text>
				</Box>

				<Box>
					<Text
						fontSize={{ base: "2xs", md: "xs" }}
						fontWeight="700"
						letterSpacing="0.13em"
						textTransform="uppercase"
						color="var(--color-text-eyebrow)"
						mb={2}
					>
						Tech Stack
					</Text>
					<Box position="relative" overflow="hidden">
						<Flex
							w="max-content"
							gap={2}
							pr={2}
							animation={
								shouldAnimateTechStack ? `${techStackMarquee} 18s linear infinite` : undefined
							}
							willChange={shouldAnimateTechStack ? "transform" : undefined}
							css={{
								"@media (hover: hover)": {
									"&:hover": {
										animationPlayState: "paused",
									},
								},
								"@media (prefers-reduced-motion: reduce)": {
									animation: "none",
								},
							}}
						>
							{marqueeTechStack.map((techItem) => {
								const isDuplicate = techItem.id.endsWith("-duplicate");

								return (
									<Badge
										key={techItem.id}
										aria-hidden={isDuplicate ? true : undefined}
										borderRadius="full"
										px={2.5}
										py={1}
										fontSize="0.64rem"
										fontWeight="700"
										letterSpacing="0.04em"
										bg="color-mix(in srgb, var(--color-primary-500) 12%, transparent)"
										color="var(--color-text-secondary)"
										border="1px solid color-mix(in srgb, var(--surface-floating-border) 88%, transparent)"
									>
										{techItem.label}
									</Badge>
								);
							})}
						</Flex>
						<Box
							display={{ base: "none", md: "block" }}
							position="absolute"
							left={0}
							top={0}
							bottom={0}
							w={5}
							pointerEvents="none"
							bg="linear-gradient(to right, color-mix(in srgb, var(--surface-floating-solid) 96%, transparent), transparent)"
						/>
						<Box
							display={{ base: "none", md: "block" }}
							position="absolute"
							right={0}
							top={0}
							bottom={0}
							w={5}
							pointerEvents="none"
							bg="linear-gradient(to left, color-mix(in srgb, var(--surface-floating-solid) 96%, transparent), transparent)"
						/>
					</Box>
				</Box>

				<Grid
					mt="auto"
					w="full"
					templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
					gap={2.5}
				>
					<PersonalProjectDetailsButton onClick={() => onViewDetails(project)} />
					<PersonalProjectLiveSiteButton liveUrl={project.liveUrl} />
				</Grid>
			</Flex>
		</Box>
	);
}
