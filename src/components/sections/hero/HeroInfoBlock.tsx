import { Box, Flex, Link, Text } from "@chakra-ui/react";
import type { RefObject } from "react";
import { downloadCvHref } from "./Hero.constants";

interface HeroInfoBlockProps {
	headingRef: RefObject<HTMLDivElement | null>;
}

export function HeroInfoBlock({ headingRef }: HeroInfoBlockProps) {
	return (
		<Box
			order={{ base: 2, xl: 1 }}
			ref={headingRef}
			w="full"
			maxW={{ base: "unset", lg: "360px", xl: "400px" }}
			justifySelf={{ lg: "end" }}
			pr={{ lg: 3, xl: 4 }}
		>
			<Text
				as="h1"
				mt={{ base: 3, md: 4 }}
				fontFamily='"Lora", serif'
				fontSize={{ base: "3xl", sm: "4xl", md: "4xl", xl: "4xl" }}
				letterSpacing="-0.05em"
				lineHeight={{ base: "0.98", md: "0.92" }}
				color="var(--color-text-primary)"
			>
				Frontend &
			</Text>
			<Text
				as="h1"
				mt={{ base: 3, md: 4 }}
				fontFamily='"Lora", serif'
				fontSize={{ base: "3xl", sm: "4xl", md: "4xl", xl: "4xl" }}
				letterSpacing="-0.05em"
				lineHeight={{ base: "0.98", md: "0.92" }}
				color="var(--color-text-primary)"
			>
				Mobile Developer
			</Text>
			<Text
				mt={{ base: 2, md: 3 }}
				fontSize={{ base: "sm", md: "md", xl: "lg" }}
				fontWeight="700"
				letterSpacing="0.16em"
				textTransform="uppercase"
				color="var(--color-text-eyebrow)"
			>
				Kaung Myint Myat
			</Text>

			<Flex mt={{ base: 4, md: 5 }} align="center" gap={{ base: 3, md: 4 }} wrap="nowrap">
				<Link
					href={downloadCvHref}
					target="_blank"
					rel="noopener noreferrer"
					display="inline-flex"
					fontSize={{ base: "md", md: "lg" }}
					fontWeight="700"
					color="var(--color-text-primary)"
					textDecoration="none"
					letterSpacing="-0.01em"
					w="fit-content"
					whiteSpace="nowrap"
					_hover={{
						color: "var(--color-text-accent-strong)",
					}}
					transition="all 0.24s ease"
				>
					Download CV
				</Link>

				<Link
					href="#projects"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					px={{ base: 3.5, md: 4.5 }}
					py={{ base: 2.25, md: 2.75 }}
					borderRadius="full"
					fontSize={{ base: "sm", md: "md" }}
					fontWeight="700"
					color="var(--color-text-primary)"
					textDecoration="none"
					border="1px solid"
					borderColor="var(--color-border)"
					bg="color-mix(in srgb, var(--color-bg-primary) 72%, transparent)"
					whiteSpace="nowrap"
					_hover={{
						borderColor: "var(--color-primary-500)",
						color: "var(--color-text-accent-strong)",
						transform: "translateY(-1px)",
					}}
					transition="all 0.24s ease"
				>
					Explore About Me
				</Link>
			</Flex>
		</Box>
	);
}
