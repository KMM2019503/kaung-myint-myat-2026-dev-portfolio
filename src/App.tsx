import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import SeniorRecommendations from "@/components/sections/SeniorRecommendations";
import AmbientBackground from "@/components/ui/AmbientBackground";
import AppToaster from "@/components/ui/AppToaster";
import Navbar from "@/components/ui/Navbar";
import { useInitialLoading } from "@/hooks/useInitialLoading";
import { useSeoMetadata } from "@/seo/useSeoMetadata";

const LOADING_TO_HERO_TRANSITION_MS = 920;

function App() {
	useSeoMetadata();

	const isLoading = useInitialLoading();
	const [isMainMounted, setIsMainMounted] = useState(false);
	const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		setIsMainMounted(true);
		setIsTransitioning(true);

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const transitionDuration = prefersReducedMotion ? 0 : LOADING_TO_HERO_TRANSITION_MS;

		const timeoutId = window.setTimeout(() => {
			setShowLoadingOverlay(false);
			setIsTransitioning(false);
		}, transitionDuration);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [isLoading]);

	return (
		<Box
			minH="var(--viewport-height-dynamic)"
			position="relative"
			background="var(--color-bg-primary)"
			color="var(--color-text-primary)"
			overflowX="clip"
		>
			{isMainMounted ? (
				<Box className={isTransitioning ? "app-main-shell is-entering" : "app-main-shell"}>
					<AmbientBackground
						lightOpacityMultiplier={1.8}
						darkOpacityMultiplier={0.55}
						lightOrbOpacityMultipliers={[0.45, 0.55, 0.7, 0.35, 0.3]}
						darkOrbOpacityMultipliers={[0.3, 0.4, 0.8, 0.2, 0.5]}
					/>
					<Navbar />
					<AppToaster />

					<Box as="main" position="relative" zIndex="1">
						<Hero />
						<Experience />
						<FeaturedProjects />
						<SeniorRecommendations />
						<Contact />
					</Box>
				</Box>
			) : null}

			{showLoadingOverlay ? (
				<Box
					className={isTransitioning ? "app-loading-overlay is-exiting" : "app-loading-overlay"}
					pointerEvents={isTransitioning ? "none" : "auto"}
				>
					<LoadingScreen />
				</Box>
			) : null}
		</Box>
	);
}

export default App;
