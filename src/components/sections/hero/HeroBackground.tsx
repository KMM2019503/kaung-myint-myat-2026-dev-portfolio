import { Box } from "@chakra-ui/react";
import { sectionAmbientBackground } from "@/theme/backgrounds";

export function HeroBackground() {
	return (
		<Box
			position="absolute"
			inset="0"
			pointerEvents="none"
			css={{
				background: sectionAmbientBackground,
			}}
		/>
	);
}
