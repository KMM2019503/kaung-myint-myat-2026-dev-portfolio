import { Box, Text } from "@chakra-ui/react";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import AmbientBackground from "@/components/ui/AmbientBackground";
import AppToaster from "@/components/ui/AppToaster";
import Navbar from "@/components/ui/Navbar";

function App() {
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
				<Hero />
				<Experience />
				<FeaturedProjects />
				<Contact />
			</Box>
		</Box>
	);
}

export default App;
