import { Box, Heading, Text } from "@chakra-ui/react";

export function ContactHeader() {
	return (
		<Box maxW={{ base: "2xl", lg: "3xl" }}>
			<Text
				data-contact-intro="true"
				fontSize={{ base: "xs", md: "sm" }}
				fontWeight="700"
				letterSpacing="0.12em"
				textTransform="uppercase"
				color="var(--color-text-eyebrow)"
			>
				Contact
			</Text>
			<Heading
				data-contact-intro="true"
				as="h2"
				mt={{ base: 2, md: 3 }}
				fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
				lineHeight={{ base: "1.12", md: "1.06" }}
				letterSpacing="-0.03em"
			>
				Let&apos;s build your next product release.
			</Heading>
		</Box>
	);
}
