import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import type { FormEvent } from "react";
import { useRef } from "react";
import {
	SECTION_CONTAINER_PROPS,
	SECTION_SCROLL_MARGIN_TOP,
	SECTION_VERTICAL_PADDING,
} from "@/theme/sectionLayout";
import { appToaster } from "../ui/AppToaster";
import { ContactForm } from "./contact/ContactForm";
import { ContactHeader } from "./contact/ContactHeader";
import { ContactInfoColumn } from "./contact/ContactInfoColumn";
import type { ChannelRailItem } from "./contact/contact.constants";
import { createMailtoLink } from "./contact/contact.mailto";
import { useContactAnimations } from "./contact/useContactAnimations";

export function Contact() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const photoRef = useRef<HTMLDivElement>(null);

	useContactAnimations({ sectionRef, photoRef });

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		window.location.href = createMailtoLink(formData);
	};

	const handleChannelAction = async (item: ChannelRailItem) => {
		if (item.interactionType === "next-tab") {
			const nextTabUrl = item.interactionTarget || item.value;
			window.open(nextTabUrl, "_blank", "noopener,noreferrer");
			return;
		}

		const copyValue = item.interactionTarget || item.value;

		try {
			await navigator.clipboard.writeText(copyValue);
			appToaster.success({
				title: "Copied to clipboard",
				description: `${item.label} has been copied.`,
			});
		} catch {
			appToaster.error({
				title: "Copy failed",
				description: "Could not copy. Please try again.",
			});
		}
	};

	return (
		<Box
			as="section"
			id="contact"
			ref={sectionRef}
			position="relative"
			zIndex={1}
			overflow="clip"
			scrollMarginTop={SECTION_SCROLL_MARGIN_TOP}
			py={SECTION_VERTICAL_PADDING}
			minH="var(--viewport-height-dynamic)"
		>
			<Container {...SECTION_CONTAINER_PROPS} position="relative" zIndex={1}>
				<Flex direction="column" gap={{ base: 8, md: 10 }}>
					<ContactHeader />

					<Grid
						templateColumns={{ base: "1fr", lg: "minmax(0, 1.18fr) minmax(360px, 0.82fr)" }}
						columnGap={{ base: 0, lg: 10 }}
						rowGap={{ base: 8, md: 10 }}
					>
						<ContactInfoColumn photoRef={photoRef} onChannelAction={handleChannelAction} />
						<ContactForm onSubmit={handleSubmit} />
					</Grid>

					<Box
						as="footer"
						position="relative"
						zIndex="1"
						px={{ base: 5, md: 8 }}
						pb={{ base: 6, md: 8 }}
						textAlign="center"
					>
						<Text
							fontSize={{ base: "xs", md: "sm" }}
							color="var(--color-text-tertiary)"
							letterSpacing="0.04em"
						>
							© {new Date().getFullYear()} Kaung Myint Myat. All rights reserved.
						</Text>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}

export default Contact;
