import { Box } from "@chakra-ui/react";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/ui/Navbar";
import { sectionAmbientBackground } from "@/theme/backgrounds";

function App() {
	return (
		<Box
			minH="var(--viewport-height-dynamic)"
			position="relative"
			background="var(--color-bg-primary)"
			color="var(--color-text-primary)"
			overflowX="clip"
		>
			<Box
				position="absolute"
				inset="0"
				pointerEvents="none"
				css={{
					background: sectionAmbientBackground,
				}}
			/>
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
