import { Box, Flex, Text } from "@chakra-ui/react";
import { DotIcon } from "lucide-react";
import type { RefObject } from "react";

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
			<Flex
				mt={{ base: 2, md: 3 }}
				align="end"
				gap={{ base: 2, md: 2.5 }}
				w="fit-content"
				py={{ base: 1.5, md: 2 }}
				color="var(--color-text-accent-strong)"
			>
				<Text
					fontSize={{ base: "xl", md: "3xl", xl: "3xl" }}
					fontWeight="700"
					letterSpacing="0.06em"
					lineHeight="1"
				>
					Hey,
				</Text>
				<Text
					fontSize={{ base: "xs", sm: "sm" }}
					fontWeight="700"
					letterSpacing="0.06em"
					lineHeight="1"
				>
					I'm
				</Text>
			</Flex>
			<Text
				mt={{ base: 2, md: 3 }}
				fontSize={{ base: "sm", md: "xl", xl: "xl" }}
				fontWeight="700"
				letterSpacing="0.16em"
				textTransform="uppercase"
				color="var(--color-text-eyebrow)"
			>
				Kaung Myint Myat
			</Text>
			<Text
				as="h1"
				display="block"
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
			<Flex
				mt={{ base: 3.5, md: 4 }}
				direction="column"
				gap={{ base: "1.5", md: "2" }}
				maxW={{ base: "38ch", xl: "34ch" }}
			>
				<Text
					fontFamily='"Ubuntu", sans-serif'
					fontSize={{ base: "xs" }}
					fontWeight="500"
					lineHeight="1.5"
					letterSpacing="0.01em"
					color="var(--color-text-secondary)"
				>
					<DotIcon size={18} color="var(--color-accent)" style={{ display: "inline" }} />
					Specializing in NEXT.js, React, Vue, and React Native
				</Text>
				<Text
					fontFamily='"Ubuntu", sans-serif'
					fontSize={{ base: "xs" }}
					fontWeight="500"
					lineHeight="1.5"
					letterSpacing="0.01em"
					color="var(--color-text-secondary)"
				>
					<DotIcon size={18} color="var(--color-accent)" style={{ display: "inline" }} />
					1.5+ years experience delivering scalable web & mobile applications
				</Text>
			</Flex>
		</Box>
	);
}
