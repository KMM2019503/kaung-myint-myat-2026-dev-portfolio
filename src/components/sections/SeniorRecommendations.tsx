import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { SECTION_CONTAINER_PROPS, SECTION_SCROLL_MARGIN_TOP } from "@/theme/sectionLayout";

interface SeniorRecommendation {
	id: string;
	name: string;
	position: string;
	company: string;
	review: string;
}

const seniorRecommendations: SeniorRecommendation[] = [
	{
		id: "than-zaw-oo",
		name: "Than Zaw Oo",
		position: "Senior Frontend Engineer",
		company: "Better Technology Ltd",
		review:
			"Kaung quickly turns design feedback into polished UI and consistently delivers clean, reliable code with great ownership.",
	},
	{
		id: "ei-thandar",
		name: "Ei Thandar Win",
		position: "Engineering Lead",
		company: "Better Technology Ltd",
		review:
			"He communicates clearly, asks the right technical questions, and collaborates well across product and design during delivery.",
	},
	{
		id: "min-khant",
		name: "Min Khant Kyaw",
		position: "Senior Software Engineer",
		company: "Better Technology Ltd",
		review:
			"Kaung is dependable under pressure, learns quickly, and keeps code quality high while still moving projects forward.",
	},
	{
		id: "mya-thu-zin",
		name: "Mya Thu Zin",
		position: "Product Manager",
		company: "Better Technology Ltd",
		review:
			"He translates product goals into thoughtful UX details and always follows through on commitments with strong accountability.",
	},
	{
		id: "zin-mar-htwe",
		name: "Zin Mar Htwe",
		position: "Senior QA Engineer",
		company: "Better Technology Ltd",
		review:
			"His handoffs are clear, bug fixes are fast, and he proactively validates edge cases before features go live.",
	},
];

const recommendationMarquee = keyframes`
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-50%, 0, 0);
	}
`;

export function SeniorRecommendations() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

		updatePreference();

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", updatePreference);
			return () => mediaQuery.removeEventListener("change", updatePreference);
		}

		mediaQuery.addListener(updatePreference);
		return () => mediaQuery.removeListener(updatePreference);
	}, []);

	const cards = prefersReducedMotion
		? seniorRecommendations
		: [...seniorRecommendations, ...seniorRecommendations];

	return (
		<Box
			as="section"
			id="recommendations"
			position="relative"
			zIndex="1"
			overflow="clip"
			scrollMarginTop={SECTION_SCROLL_MARGIN_TOP}
			py={{ base: 10, md: 14 }}
		>
			<Container {...SECTION_CONTAINER_PROPS}>
				<Flex direction="column" gap={{ base: 5, md: 6 }}>
					<Box maxW={{ base: "full", md: "2xl" }}>
						<Text
							fontSize={{ base: "2xs", md: "xs" }}
							fontWeight="700"
							letterSpacing="0.16em"
							textTransform="uppercase"
							color="var(--color-text-eyebrow)"
							mb={{ base: 2, md: 2.5 }}
						>
							Team Feedback
						</Text>
						<Heading
							as="h2"
							fontSize={{ base: "xl", md: "2xl" }}
							letterSpacing="-0.01em"
							lineHeight={{ base: 1.3, md: 1.22 }}
						>
							Senior Recommendations
						</Heading>
					</Box>

					<Box
						position="relative"
						overflowX={prefersReducedMotion ? "auto" : "hidden"}
						overflowY="visible"
						pb={1}
					>
						<Flex
							role="list"
							aria-label="Senior recommendations"
							w="max-content"
							gap={{ base: 3, md: 4 }}
							animation={
								prefersReducedMotion ? undefined : `${recommendationMarquee} 34s linear infinite`
							}
							willChange={prefersReducedMotion ? undefined : "transform"}
							pr={{ base: 3, md: 4 }}
							css={
								prefersReducedMotion
									? undefined
									: {
											"@media (hover: hover)": {
												"&:hover": {
													animationPlayState: "paused",
												},
											},
										}
							}
						>
							{cards.map((item, index) => {
								const isDuplicate = !prefersReducedMotion && index >= seniorRecommendations.length;

								return (
									<Box
										role="listitem"
										key={`${item.id}-${index}`}
										aria-hidden={isDuplicate ? true : undefined}
										flex="0 0 auto"
										w={{ base: "76vw", sm: "260px", md: "292px" }}
										maxW={{ base: "280px", sm: "292px" }}
										minH={{ base: "178px", md: "188px" }}
										p={{ base: 4, md: 5 }}
										borderRadius="2xl"
										bg="color-mix(in srgb, var(--surface-floating) 88%, transparent)"
										border="1px solid color-mix(in srgb, var(--surface-floating-border) 88%, transparent)"
										display="flex"
										flexDirection="column"
										justifyContent="space-between"
										gap={{ base: 4, md: 4.5 }}
									>
										<Text
											fontSize={{ base: "sm", md: "sm" }}
											lineHeight="1.68"
											color="var(--color-text-secondary)"
										>
											“{item.review}”
										</Text>

										<Box>
											<Text
												fontSize={{ base: "sm", md: "sm" }}
												fontWeight="700"
												color="var(--color-text-primary)"
												letterSpacing="0.01em"
											>
												{item.name}
											</Text>
											<Text fontSize={{ base: "xs", md: "xs" }} color="var(--color-text-tertiary)">
												{item.position}
											</Text>
											<Text
												fontSize={{ base: "2xs", md: "xs" }}
												fontWeight="600"
												letterSpacing="0.06em"
												textTransform="uppercase"
												color="var(--color-text-accent)"
												mt={1}
											>
												{item.company}
											</Text>
										</Box>
									</Box>
								);
							})}
						</Flex>

						{prefersReducedMotion ? null : (
							<>
								<Box
									position="absolute"
									left={0}
									top={0}
									bottom={0}
									w={{ base: 8, md: 12 }}
									pointerEvents="none"
									bg="linear-gradient(to right, var(--color-bg-primary), transparent)"
								/>
								<Box
									position="absolute"
									right={0}
									top={0}
									bottom={0}
									w={{ base: 8, md: 12 }}
									pointerEvents="none"
									bg="linear-gradient(to left, var(--color-bg-primary), transparent)"
								/>
							</>
						)}
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}

export default SeniorRecommendations;
