import { Box } from "@chakra-ui/react";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
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
			<Box
				position="absolute"
				inset="0"
				pointerEvents="none"
				css={{
					background: `
						radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--color-primary-200) 48%, transparent) 0%, transparent 42%),
						radial-gradient(circle at 85% 18%, color-mix(in srgb, var(--color-primary-100) 54%, transparent) 0%, transparent 35%),
						var(--color-bg-primary)
					`,
				}}
			/>
			<Navbar />

			<Box as="main" position="relative" zIndex="1">
				<Hero />
				<FeaturedProjects />
			</Box>
		</Box>
	);
}

export default App;
