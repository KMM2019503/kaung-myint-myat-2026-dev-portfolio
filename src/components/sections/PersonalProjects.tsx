import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useRef } from "react";
import {
	SECTION_CONTAINER_PROPS,
	SECTION_SCROLL_MARGIN_TOP,
	SECTION_VERTICAL_PADDING,
} from "@/theme/sectionLayout";
import { PersonalProjectCard } from "./personalProjects/PersonalProjectCard";
import { personalProjects } from "./personalProjects/personalProjects.constants";
import { usePersonalProjectsAnimations } from "./personalProjects/usePersonalProjectsAnimations";

export function PersonalProjects() {
	const sectionRef = useRef<HTMLDivElement>(null);
	usePersonalProjectsAnimations({ sectionRef });

	return (
		<Box
			as="section"
			id="personal-projects"
			ref={sectionRef}
			position="relative"
			zIndex="1"
			overflow="clip"
			scrollMarginTop={SECTION_SCROLL_MARGIN_TOP}
			py={SECTION_VERTICAL_PADDING}
		>
			<Container {...SECTION_CONTAINER_PROPS}>
				<Flex direction="column" gap={{ base: 5, md: 7 }}>
					<Box maxW={{ base: "full", md: "2xl" }}>
						<Text
							data-personal-projects-intro
							fontSize={{ base: "2xs", md: "xs" }}
							fontWeight="700"
							letterSpacing="0.16em"
							textTransform="uppercase"
							color="var(--color-text-eyebrow)"
							mb={{ base: 2, md: 2.5 }}
						>
							Independent Build
						</Text>
						<Heading
							as="h2"
							data-personal-projects-intro
							fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
							letterSpacing="-0.01em"
							lineHeight={{ base: 1.3, md: 1.22 }}
						>
							Personal Projects
						</Heading>
						<Text
							data-personal-projects-intro
							mt={{ base: 2.5, md: 3 }}
							fontSize={{ base: "sm", md: "md" }}
							color="var(--color-text-secondary)"
							lineHeight={{ base: 1.8, md: 1.75 }}
						>
							Production-focused side projects where I own product flow, interaction detail, and
							frontend architecture end to end.
						</Text>
					</Box>

					<Grid
						templateColumns={{
							base: "1fr",
							md: "repeat(2, minmax(0, 1fr))",
							xl: "repeat(3, minmax(0, 1fr))",
						}}
						gap={{ base: 4.5, md: 5, xl: 6 }}
						alignItems="stretch"
					>
						{personalProjects.map((project, index) => (
							<Box key={project.id} data-personal-project-card>
								<PersonalProjectCard
									project={project}
									projectNumber={String(index + 1).padStart(2, "0")}
								/>
							</Box>
						))}
					</Grid>
				</Flex>
			</Container>
		</Box>
	);
}

export default PersonalProjects;
