import { Box } from "@chakra-ui/react";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import AmbientBackground from "@/components/ui/AmbientBackground";
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
			<AmbientBackground />
			<Navbar />

			<Box as="main" position="relative" zIndex="1">
				<Hero />
				<Experience />
				<FeaturedProjects />
			</Box>
		</Box>
	);
}

export default App;
