import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import type { RefObject } from "react";
import { SECTION_CONTAINER_PROPS, SECTION_VERTICAL_PADDING } from "@/theme/sectionLayout";
import { FeaturedProjectsIntroCard } from "./FeaturedProjectsIntroCard";

interface ProjectIntroPanelProps {
	cardRef: RefObject<HTMLDivElement | null>;
	chipLayerRef: RefObject<HTMLDivElement | null>;
	badgeTickerRef: RefObject<HTMLDivElement | null>;
	typedCodeLines: readonly string[];
	activeTypingLine: number | null;
}

export function ProjectIntroPanel({
	cardRef,
	chipLayerRef,
	badgeTickerRef,
	typedCodeLines,
	activeTypingLine,
}: ProjectIntroPanelProps) {
	return (
		<Box
			data-project-panel
			flex="0 0 100vw"
			h="var(--viewport-height-dynamic)"
			display="flex"
			alignItems="center"
			py={SECTION_VERTICAL_PADDING}
		>
			<Container {...SECTION_CONTAINER_PROPS}>
				<Grid
					w="full"
					templateColumns={{
						base: "1fr",
						lg: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
					}}
					gap={{ base: 8, md: 10, lg: 12 }}
					alignItems="center"
				>
					<Box display="grid" gap={{ base: 4, md: 5 }}>
						<Text
							data-project-intro-eyebrow
							fontSize={{ base: "xs", md: "sm" }}
							fontWeight="700"
							letterSpacing="0.2em"
							textTransform="uppercase"
							color="var(--color-text-accent)"
						>
							Project Mindset
						</Text>
						<Heading
							data-project-intro-title
							as="h2"
							fontSize={{ base: "2xl", md: "4xl", xl: "5xl" }}
							lineHeight={{ base: 1.22, md: 1.15 }}
							color="var(--color-text-primary)"
							maxW="18ch"
						>
							How I approach building products!
						</Heading>
						<Text
							data-project-intro-line
							fontSize={{ base: "md", md: "xl" }}
							lineHeight={{ base: 1.8, md: 1.9 }}
							color="var(--color-text-secondary)"
							maxW="56ch"
						>
							Before building anything, I first understand what the product needs, where users
							struggle, and what trade-offs make sense.
						</Text>
						<Text
							data-project-intro-line
							fontSize={{ base: "md", md: "xl" }}
							lineHeight={{ base: 1.8, md: 1.9 }}
							color="var(--color-text-secondary)"
							maxW="56ch"
						>
							This helps me create solutions that are not just working—but thoughtful, reliable, and
							able to grow over time.
						</Text>
					</Box>

					<FeaturedProjectsIntroCard
						cardRef={cardRef}
						chipLayerRef={chipLayerRef}
						badgeTickerRef={badgeTickerRef}
						typedCodeLines={typedCodeLines}
						activeTypingLine={activeTypingLine}
					/>
				</Grid>
			</Container>
		</Box>
	);
}
