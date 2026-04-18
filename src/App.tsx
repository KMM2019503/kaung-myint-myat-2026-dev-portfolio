import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/images/hero.webp";
import iceBallImage from "@/assets/images/ice_ball.webp";
import lavaBallImage from "@/assets/images/lava_ball.webp";
import spaceBallImage from "@/assets/images/space_ball.webp";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import PersonalProjects from "@/components/sections/PersonalProjects";
import SeniorRecommendations from "@/components/sections/SeniorRecommendations";
import AmbientBackground from "@/components/ui/AmbientBackground";
import AppLoadingScreen from "@/components/ui/AppLoadingScreen";
import AppToaster from "@/components/ui/AppToaster";
import Navbar from "@/components/ui/Navbar";
import ScrollIdleIndicator from "@/components/ui/ScrollIdleIndicator";
import { sectionVisibility } from "@/config/featureFlags";
import { useSeoMetadata } from "@/seo/useSeoMetadata";

const HERO_ASSET_SOURCES = [heroImage, iceBallImage, lavaBallImage, spaceBallImage];
const MIN_LOADING_SCREEN_MS = 1800;

function preloadImage(source: string) {
	return new Promise<void>((resolve) => {
		const image = new Image();
		let isResolved = false;

		const resolveLoaded = () => {
			if (isResolved) {
				return;
			}
			isResolved = true;
			image.onload = null;
			image.onerror = null;
			resolve();
		};

		image.onload = resolveLoaded;
		image.onerror = resolveLoaded;
		image.decoding = "async";
		image.loading = "eager";
		image.src = source;

		if (image.complete) {
			if (typeof image.decode === "function") {
				image.decode().then(resolveLoaded).catch(resolveLoaded);
				return;
			}

			resolveLoaded();
		}
	});
}

function App() {
	useSeoMetadata();
	const [isInitialLoading, setIsInitialLoading] = useState(true);

	useEffect(() => {
		let isCancelled = false;
		let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
		const loadingStartedAt = performance.now();

		const preloadHeroAssets = async () => {
			await Promise.allSettled(HERO_ASSET_SOURCES.map(preloadImage));
			if (isCancelled) {
				return;
			}

			const elapsedMs = performance.now() - loadingStartedAt;
			const remainingDelayMs = Math.max(0, MIN_LOADING_SCREEN_MS - elapsedMs);

			loadingTimeout = setTimeout(() => {
				if (isCancelled) {
					return;
				}

				requestAnimationFrame(() => {
					if (!isCancelled) {
						setIsInitialLoading(false);
					}
				});
			}, remainingDelayMs);
		};

		preloadHeroAssets();

		return () => {
			isCancelled = true;
			if (loadingTimeout !== undefined) {
				clearTimeout(loadingTimeout);
			}
		};
	}, []);

	if (isInitialLoading) {
		return <AppLoadingScreen />;
	}

	return (
		<Box
			minH="var(--viewport-height-dynamic)"
			position="relative"
			background="var(--color-bg-primary)"
			color="var(--color-text-primary)"
			overflowX="clip"
		>
			<AmbientBackground
				lightOpacityMultiplier={1.8}
				darkOpacityMultiplier={0.55}
				lightOrbOpacityMultipliers={[0.45, 0.55, 0.7, 0.35, 0.3]}
				darkOrbOpacityMultipliers={[0.3, 0.4, 0.8, 0.2, 0.5]}
			/>
			<Navbar />
			<AppToaster />

			<Box as="main" position="relative" zIndex="1">
				{sectionVisibility.hero ? <Hero /> : null}
				{sectionVisibility.experience ? <Experience /> : null}
				{sectionVisibility.featuredProjects ? <FeaturedProjects /> : null}
				{sectionVisibility.personalProjects ? <PersonalProjects /> : null}
				{sectionVisibility.seniorRecommendations ? <SeniorRecommendations /> : null}
				{sectionVisibility.contact ? <Contact /> : null}
			</Box>
			<ScrollIdleIndicator />
		</Box>
	);
}

export default App;
