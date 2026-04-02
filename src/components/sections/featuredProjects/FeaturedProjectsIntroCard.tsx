import { Box, Flex, Text } from "@chakra-ui/react";
import type { RefObject } from "react";
import { TechnicalCodeBlock } from "@/components/ui/TechnicalCodeBlock";
import {
	introFloatingChips,
	projectIntroCodeLines,
	projectTechBadgeTickerItems,
} from "./featuredProjects.constants";

interface FeaturedProjectsIntroCardProps {
	cardRef: RefObject<HTMLDivElement | null>;
	chipLayerRef: RefObject<HTMLDivElement | null>;
	badgeTickerRef: RefObject<HTMLDivElement | null>;
	typedCodeLines: readonly string[];
	activeTypingLine: number | null;
}

export function FeaturedProjectsIntroCard({
	cardRef,
	chipLayerRef,
	badgeTickerRef,
	typedCodeLines,
	activeTypingLine,
}: FeaturedProjectsIntroCardProps) {
	return (
		<Box data-project-intro-card ref={cardRef} position="relative" minW="0">
			<Box
				w="full"
				p={{ base: 5, md: 6 }}
				borderRadius={{ base: "3xl", md: "32px" }}
				border="1px solid"
				borderColor="var(--color-border)"
				bg="color-mix(in srgb, var(--color-bg-primary) 84%, transparent)"
				css={{
					backdropFilter: "blur(16px)",
					boxShadow: "0 26px 52px -38px rgba(15, 23, 42, 0.55)",
				}}
			>
				<Flex
					align={{ base: "flex-start", md: "center" }}
					mb={{ base: 4, md: 5 }}
					flexWrap="wrap"
					gap="3"
				>
					<Text
						fontSize={{ base: "xs", md: "sm" }}
						textTransform="uppercase"
						letterSpacing="0.12em"
						fontWeight="700"
						color="var(--color-text-tertiary)"
					>
						Technical Snapshot
					</Text>
				</Flex>

				<TechnicalCodeBlock
					lines={projectIntroCodeLines}
					typedLines={typedCodeLines}
					activeLineIndex={activeTypingLine}
				/>

				<Box
					mt={{ base: 4, md: 5 }}
					overflow="hidden"
					position="relative"
					css={{
						maskImage:
							"linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
						WebkitMaskImage:
							"linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
					}}
				>
					<Flex
						ref={badgeTickerRef}
						align="center"
						gap={{ base: "1.5", md: "2" }}
						w="max-content"
						pr={{ base: "1.5", md: "2" }}
						css={{ willChange: "transform" }}
					>
						{projectTechBadgeTickerItems.map((item) => (
							<Flex
								key={item.key}
								align="center"
								gap="1.5"
								px={{ base: "2.5", md: "3" }}
								py={{ base: "1", md: "1.5" }}
								borderRadius="full"
								fontSize={{ base: "2xs", md: "xs" }}
								fontWeight="600"
								bg="var(--color-bg-secondary)"
								color="var(--color-text-secondary)"
								flexShrink={0}
							>
								<Box
									w={{ base: "5px", md: "6px" }}
									h={{ base: "5px", md: "6px" }}
									borderRadius="full"
									bg="var(--color-primary-500)"
									opacity="0.82"
								/>
								{item.tag}
							</Flex>
						))}
					</Flex>
				</Box>
			</Box>

			<Box ref={chipLayerRef} position="absolute" inset="0" pointerEvents="none" display="block">
				{introFloatingChips.map((chip) => (
					<Box
						key={chip.id}
						position="absolute"
						top={chip.top}
						left={chip.left}
						right={chip.right}
						px={{ base: "3", md: "4" }}
						py={{ base: "1.5", md: "2" }}
						borderRadius="full"
						border="1px solid"
						borderColor="var(--color-border)"
						bg="color-mix(in srgb, var(--color-bg-primary) 82%, transparent)"
						fontSize={{ base: "xs", md: "sm" }}
						fontWeight="700"
						color="var(--color-text-secondary)"
						css={{
							backdropFilter: "blur(10px)",
							boxShadow: "0 16px 24px -22px rgba(15, 23, 42, 0.45)",
						}}
					>
						{chip.label}
					</Box>
				))}
			</Box>
		</Box>
	);
}
