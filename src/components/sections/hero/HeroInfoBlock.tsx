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
				px={{ base: 3, md: 3.5 }}
				py={{ base: 1.5, md: 2 }}
				borderRadius="2xl"
				bg="color-mix(in srgb, var(--color-primary-100) 14%, transparent)"
				border="1px solid"
				borderColor="color-mix(in srgb, var(--color-primary-500) 32%, transparent)"
				color="var(--color-text-accent-strong)"
				css={{
					boxShadow:
						"0 14px 24px -20px color-mix(in srgb, var(--color-text-accent-strong) 70%, transparent)",
				}}
			>
				<Text
					fontSize={{ base: "xl", md: "3xl", xl: "3xl" }}
					fontWeight="700"
					letterSpacing="0.06em"
					lineHeight="1"
				>
					Hola,
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
				as="span"
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
					Specializing in React, Vue, and React Native
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
