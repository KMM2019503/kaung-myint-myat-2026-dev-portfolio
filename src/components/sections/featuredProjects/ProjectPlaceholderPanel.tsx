import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { SECTION_CONTAINER_PROPS, SECTION_VERTICAL_PADDING } from "@/theme/sectionLayout";
import type { ProjectPlaceholderPanelData } from "./featuredProjects.constants";

interface ProjectPlaceholderPanelProps {
	panel: ProjectPlaceholderPanelData;
}

export function ProjectPlaceholderPanel({ panel }: ProjectPlaceholderPanelProps) {
	return (
		<Box
			data-project-panel
			flex="0 0 100vw"
			h="var(--viewport-height-dynamic)"
			display="flex"
			alignItems="center"
			justifyContent="center"
			py={SECTION_VERTICAL_PADDING}
		>
			<Container {...SECTION_CONTAINER_PROPS}>
				<Box
					w="full"
					maxW="5xl"
					mx="auto"
					borderRadius={{ base: "2xl", md: "3xl" }}
					border="1px solid"
					borderColor="var(--surface-floating-border)"
					bg="color-mix(in srgb, var(--surface-floating-solid) 88%, transparent)"
					px={{ base: 6, md: 10 }}
					py={{ base: 10, md: 14 }}
					textAlign="center"
				>
					<Text
						fontSize={{ base: "sm", md: "md" }}
						fontWeight="700"
						textTransform="uppercase"
						letterSpacing="0.18em"
						color="var(--color-text-accent)"
					>
						{panel.title}
					</Text>
					<Heading mt={{ base: 4, md: 5 }} fontSize={{ base: "2xl", md: "4xl" }}>
						{panel.caption}
					</Heading>
				</Box>
			</Container>
		</Box>
	);
}
