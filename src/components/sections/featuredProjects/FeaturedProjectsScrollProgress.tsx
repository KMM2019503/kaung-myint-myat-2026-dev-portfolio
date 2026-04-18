import { Box } from "@chakra-ui/react";

interface FeaturedProjectsScrollProgressProps {
	progress: number;
}

export function FeaturedProjectsScrollProgress({ progress }: FeaturedProjectsScrollProgressProps) {
	const normalizedProgress = Math.min(1, Math.max(0, progress));

	return (
		<Box
			position="absolute"
			left="50%"
			bottom={{ base: "18px", md: "24px" }}
			transform="translateX(-50%)"
			zIndex="8"
			pointerEvents="none"
			w={{ base: "min(88vw, 460px)", md: "min(42vw, 520px)" }}
		>
			<Box
				role="progressbar"
				aria-label="Featured projects scroll progress"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(normalizedProgress * 100)}
			>
				<Box className="featured-projects-progress-track">
					<Box
						className="featured-projects-progress-fill"
						w={`${(normalizedProgress * 100).toFixed(2)}%`}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default FeaturedProjectsScrollProgress;
