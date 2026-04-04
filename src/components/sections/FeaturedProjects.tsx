import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SECTION_SCROLL_MARGIN_TOP } from "@/theme/sectionLayout";
import {
	projectCaseStudies,
	projectIntroCodeLines,
	projectPlaceholders,
} from "./featuredProjects/featuredProjects.constants";
import { ProjectCaseStudyPanel } from "./featuredProjects/ProjectCaseStudyPanel";
import { ProjectIntroPanel } from "./featuredProjects/ProjectIntroPanel";
import { ProjectPlaceholderPanel } from "./featuredProjects/ProjectPlaceholderPanel";
import { useFeaturedProjectsAnimations } from "./featuredProjects/useFeaturedProjectsAnimations";
import { useProjectIntroTyping } from "./featuredProjects/useProjectIntroTyping";

export function FeaturedProjects() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const introCardRef = useRef<HTMLDivElement>(null);
	const introChipLayerRef = useRef<HTMLDivElement>(null);
	const introBadgeTickerRef = useRef<HTMLDivElement>(null);
	const [shouldStartTyping, setShouldStartTyping] = useState(false);

	useFeaturedProjectsAnimations({
		sectionRef,
		trackRef,
		introCardRef,
		introChipLayerRef,
		introBadgeTickerRef,
		shouldStartTyping,
		setShouldStartTyping,
	});

	const { typedCodeLines, activeTypingLine } = useProjectIntroTyping({
		shouldStartTyping,
		lines: projectIntroCodeLines,
	});

	return (
		<Box
			as="section"
			id="projects"
			ref={sectionRef}
			minH="var(--viewport-height-dynamic)"
			position="relative"
			zIndex="1"
			scrollMarginTop={SECTION_SCROLL_MARGIN_TOP}
			overflow="clip"
		>
			<Box
				ref={trackRef}
				display="flex"
				flexWrap="nowrap"
				h="var(--viewport-height-dynamic)"
				willChange="transform"
			>
				<ProjectIntroPanel
					cardRef={introCardRef}
					chipLayerRef={introChipLayerRef}
					badgeTickerRef={introBadgeTickerRef}
					typedCodeLines={typedCodeLines}
					activeTypingLine={activeTypingLine}
				/>
				{projectCaseStudies.map((project) => (
					<ProjectCaseStudyPanel key={project.id} project={project} />
				))}

				{projectPlaceholders.map((panel) => (
					<ProjectPlaceholderPanel key={panel.id} panel={panel} />
				))}
			</Box>
		</Box>
	);
}

export default FeaturedProjects;
