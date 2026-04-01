import { Box, Container, Grid } from "@chakra-ui/react";
import { useRef } from "react";
import { HeroArtStage } from "./hero/HeroArtStage";
import { HeroInfoBlock } from "./hero/HeroInfoBlock";
import { HeroSupportBlock } from "./hero/HeroSupportBlock";
import { useHeroAnimations } from "./hero/useHeroAnimations";

export function Hero() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const artRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const supportRef = useRef<HTMLDivElement>(null);
	const codingLogoRef = useRef<HTMLDivElement>(null);

	useHeroAnimations({
		sectionRef,
		artRef,
		headingRef,
		supportRef,
		codingLogoRef,
	});

	return (
		<Box
			as="section"
			id="home"
			ref={sectionRef}
			minH="var(--viewport-height-dynamic)"
			position="relative"
			zIndex="1"
			overflowX="hidden"
			display="flex"
			alignItems="center"
			justifyContent="center"
			scrollMarginTop="120px"
		>
			<Container
				maxW="7xl"
				w="full"
				mx="auto"
				px={{ base: 5, md: 8, lg: 10 }}
				position="relative"
				zIndex="1"
				pt={{ base: "88px", md: "118px" }}
				pb={{ base: 12, md: 18 }}
			>
				<Grid
					templateColumns={{
						base: "1fr",
						lg: "minmax(0, 1fr) minmax(320px, 420px) minmax(0, 1fr)",
						xl: "minmax(0, 1fr) minmax(360px, 500px) minmax(0, 1fr)",
					}}
					columnGap={{ base: 6, md: 8, lg: 8, xl: 10 }}
					rowGap={{ base: 6, md: 8 }}
					alignItems={{ base: "start", lg: "center" }}
				>
					<HeroInfoBlock headingRef={headingRef} />
					<HeroArtStage artRef={artRef} codingLogoRef={codingLogoRef} />
					<HeroSupportBlock supportRef={supportRef} />
				</Grid>
			</Container>
		</Box>
	);
}

export default Hero;
