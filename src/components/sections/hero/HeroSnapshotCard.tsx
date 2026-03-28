import { Box, Flex, Text } from "@chakra-ui/react";
import type { RefObject } from "react";
import { codeLines, floatingChips, inCardBadges, inCardBadgeTickerItems } from "./Hero.constants";

interface HeroSnapshotCardProps {
	visualRef: RefObject<HTMLDivElement | null>;
	chipLayerRef: RefObject<HTMLDivElement | null>;
	inCardBadgeTickerRef: RefObject<HTMLDivElement | null>;
	typedCodeLines: string[];
	activeTypingLine: number | null;
}

export function HeroSnapshotCard({
	visualRef,
	chipLayerRef,
	inCardBadgeTickerRef,
	typedCodeLines,
	activeTypingLine,
}: HeroSnapshotCardProps) {
	return (
		<Box
			order={{ base: 3, xl: 3 }}
			w="full"
			minW="0"
			maxW={{ xl: "540px" }}
			ref={visualRef}
			position="relative"
			justifySelf={{ xl: "end" }}
		>
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
					justify="space-between"
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
					<Box
						px={{ base: 3, md: 4 }}
						py={{ base: "1.5", md: "2" }}
						borderRadius="full"
						bg="color-mix(in srgb, var(--color-bg-primary) 80%, transparent)"
						color="var(--color-text-accent-strong)"
						fontSize={{ base: "xs", md: "sm" }}
						fontWeight="700"
						boxShadow="0 20px 30px -22px color-mix(in srgb, var(--color-accent) 84%, transparent)"
					>
						Frontend & Mobile Focus
					</Box>
				</Flex>

				<Box
					borderRadius={{ base: "2xl", md: "28px" }}
					bg="color-mix(in srgb, var(--color-bg-secondary) 86%, transparent)"
					border="1px solid"
					borderColor="var(--color-border)"
					p={{ base: 4, md: 5 }}
					minH={{ base: "180px", md: "220px" }}
					overflowX="auto"
				>
					{codeLines.map((line, index) => (
						<Text
							key={line}
							fontFamily='"IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace'
							fontSize={{ base: "sm", md: "md" }}
							lineHeight={{ base: "1.8", md: "1.9" }}
							whiteSpace="pre"
							color={
								index === 0 || index === codeLines.length - 1
									? "var(--color-text-accent)"
									: "var(--color-text-secondary)"
							}
							display="flex"
							alignItems="center"
						>
							{typedCodeLines[index] || "\u00a0"}
							{activeTypingLine === index ? (
								<Box
									as="span"
									ml="1"
									color="var(--color-text-accent)"
									fontWeight="700"
									lineHeight="1"
									style={{ animation: "code-caret-blink 1s steps(1) infinite" }}
								>
									|
								</Box>
							) : null}
						</Text>
					))}
				</Box>

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
					<Flex display={{ base: "flex", md: "none" }} flexWrap="wrap" gap="2">
						{inCardBadges.map((tag) => (
							<Flex
								key={tag}
								align="center"
								gap="1.5"
								px="3"
								py="1.5"
								borderRadius="full"
								fontSize="xs"
								fontWeight="600"
								bg="var(--color-bg-secondary)"
								color="var(--color-text-secondary)"
							>
								<Box
									w="6px"
									h="6px"
									borderRadius="full"
									bg="var(--color-primary-500)"
									opacity="0.82"
								/>
								{tag}
							</Flex>
						))}
					</Flex>

					<Flex
						ref={inCardBadgeTickerRef}
						display={{ base: "none", md: "inline-flex" }}
						align="center"
						gap={{ base: "1.5", md: "2" }}
						w="max-content"
						pr={{ base: "1.5", md: "2" }}
						css={{ willChange: "transform" }}
					>
						{inCardBadgeTickerItems.map((item) => (
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
				{floatingChips.map((chip) => (
					<Box
						key={chip.id}
						data-float-chip="true"
						display={{ base: chip.showOnMobile ? "block" : "none", md: "block" }}
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

			<Box
				data-orbit="true"
				display={{ base: "none", md: "inline-flex" }}
				position="absolute"
				bottom={{ base: "-14px", md: "-18px" }}
				right={{ base: "16px", md: "24px" }}
				px={{ base: "4", md: "5" }}
				py={{ base: "2.5", md: "3" }}
				borderRadius="2xl"
				bg="var(--color-accent)"
				color="white"
				fontSize={{ base: "sm", md: "md" }}
				fontWeight="700"
				boxShadow="0 20px 30px -20px color-mix(in srgb, var(--color-accent) 84%, transparent)"
			>
				Ship fast, scale clean.
			</Box>
		</Box>
	);
}
