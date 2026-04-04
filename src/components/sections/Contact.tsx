import {
	Box,
	Button,
	Container,
	chakra,
	Flex,
	Grid,
	Heading,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import type { FormEvent } from "react";
import { useRef } from "react";
import {
	SECTION_CONTAINER_PROPS,
	SECTION_SCROLL_MARGIN_TOP,
	SECTION_VERTICAL_PADDING,
} from "@/theme/sectionLayout";
import { appToaster } from "../ui/AppToaster";
import {
	availabilityRails,
	type ChannelRailItem,
	CONTACT_EMAIL,
	channelRails,
	collaborationRails,
} from "./contact/contact.constants";
import { useContactAnimations } from "./contact/useContactAnimations";

const CONTACT_SUBJECT_PREFIX = "Portfolio Inquiry";

function createMailtoLink(formData: FormData) {
	const name = (formData.get("name")?.toString().trim() || "Anonymous").slice(0, 120);
	const senderEmail = (formData.get("email")?.toString().trim() || "Not provided").slice(0, 160);
	const company = (formData.get("company")?.toString().trim() || "Independent").slice(0, 160);
	const timeline = (formData.get("timeline")?.toString().trim() || "Flexible").slice(0, 120);
	const message = (
		formData.get("message")?.toString().trim() ||
		"Hi Kaung, I would like to discuss a frontend collaboration."
	).slice(0, 2000);

	const subject = `${CONTACT_SUBJECT_PREFIX}: ${company}`;
	const body = [
		`Name: ${name}`,
		`Email: ${senderEmail}`,
		`Company: ${company}`,
		`Timeline: ${timeline}`,
		"",
		"Project Brief:",
		message,
		"",
		"Sent from portfolio contact section.",
	].join("\n");

	return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useContactAnimations({ sectionRef });

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

					<Grid
						templateColumns={{ base: "1fr", lg: "minmax(0, 1.18fr) minmax(360px, 0.82fr)" }}
						columnGap={{ base: 0, lg: 10 }}
						rowGap={{ base: 8, md: 10 }}
					>
						<Flex direction="column" gap={{ base: 4, md: 5 }}>
							{collaborationRails.map((item) => (
								<Box key={item.id} data-contact-line="true" py={{ base: 2.5, md: 3 }}>
									<Flex
										direction={{ base: "column", sm: "row" }}
										justify="space-between"
										gap={{ base: 1, sm: 4 }}
									>
										<Text
											fontSize={{ base: "xs", md: "sm" }}
											fontWeight="700"
											letterSpacing="0.08em"
											textTransform="uppercase"
											color="var(--color-text-eyebrow)"
										>
											{item.label}
										</Text>
										<Text
											fontSize={{ base: "sm", md: "md" }}
											fontWeight="600"
											color="var(--color-text-primary)"
										>
											{item.value}
										</Text>
									</Flex>
									{item.note ? (
										<Text
											mt="1"
											fontSize={{ base: "sm", md: "sm" }}
											color="var(--color-text-secondary)"
										>
											{item.note}
										</Text>
									) : null}
								</Box>
							))}

							{availabilityRails.map((item) => (
								<Flex
									key={item.id}
									data-contact-line="true"
									py={{ base: 2.25, md: 2.5 }}
									justify="space-between"
									gap={4}
									align="baseline"
								>
									<Text fontSize={{ base: "xs", md: "sm" }} color="var(--color-text-tertiary)">
										{item.label}
									</Text>
									<Text fontSize={{ base: "sm", md: "md" }} fontWeight="600" textAlign="right">
										{item.value}
									</Text>
								</Flex>
							))}

							{channelRails.map((item) => (
								<Flex
									key={item.id}
									data-contact-line="true"
									py={{ base: 2.25, md: 2.5 }}
									justify="space-between"
									gap={4}
									align="center"
								>
									<Text fontSize={{ base: "xs", md: "sm" }} color="var(--color-text-tertiary)">
										{item.label}
									</Text>
									<Flex align="center" gap={{ base: 2, md: 2.5 }}>
										<chakra.button
											type="button"
											onClick={() => void handleChannelAction(item)}
											fontSize={{ base: "sm", md: "md" }}
											fontWeight="600"
											lineHeight="1.45"
											textAlign="right"
											color={
												item.interactionType === "next-tab"
													? "var(--color-text-accent-strong)"
													: "var(--color-text-primary)"
											}
											textDecoration={item.interactionType === "next-tab" ? "underline" : "none"}
											textUnderlineOffset="3px"
											cursor={item.interactionType === "copy" ? "copy" : "pointer"}
											_hover={{ color: "var(--color-text-accent)" }}
											_focusVisible={{
												outline: "none",
												boxShadow:
													"0 0 0 2px color-mix(in srgb, var(--color-primary-500) 36%, transparent)",
											}}
										>
											{item.value}
										</chakra.button>
									</Flex>
								</Flex>
							))}
						</Flex>

						<chakra.form
							onSubmit={handleSubmit}
							display="flex"
							flexDirection="column"
							gap={{ base: 4, md: 5 }}
							w="full"
							maxW={{ base: "full", lg: "560px" }}
							ml={{ lg: "auto" }}
							borderRadius={{ base: "xl", md: "2xl" }}
							p={{ base: 3.5, md: 4 }}
							border="1px solid"
							borderColor="var(--surface-floating-border)"
							bg="var(--surface-floating-solid)"
							boxShadow="var(--shadow-sm)"
						>
							<Box
								data-contact-form-row="true"
								pb={{ base: 2.5, md: 3 }}
								borderBottom="1px solid"
								borderColor="var(--surface-floating-border)"
							>
								<Text
									fontSize="xs"
									fontWeight="700"
									textTransform="uppercase"
									color="var(--color-text-eyebrow)"
								>
									Name
								</Text>
								<Input
									type="text"
									name="name"
									defaultValue="Ava Chen"
									mt={{ base: 1.5, md: 2 }}
									w="full"
									variant="subtle"
									bg="transparent"
									border="none"
									outline="none"
									p={0}
									fontSize={{ base: "md", md: "md" }}
									lineHeight="1.5"
									color="var(--color-text-primary)"
									_focusVisible={{ outline: "none", boxShadow: "none" }}
									_placeholder={{ color: "var(--color-text-tertiary)" }}
									required
								/>
							</Box>

							<Box
								data-contact-form-row="true"
								pb={{ base: 2.5, md: 3 }}
								borderBottom="1px solid"
								borderColor="var(--surface-floating-border)"
							>
								<Text
									fontSize="xs"
									fontWeight="700"
									textTransform="uppercase"
									color="var(--color-text-eyebrow)"
								>
									Work Email
								</Text>
								<Input
									type="email"
									name="email"
									defaultValue="ava.chen@northpeak.studio"
									mt={{ base: 1.5, md: 2 }}
									w="full"
									variant="subtle"
									bg="transparent"
									border="none"
									outline="none"
									p={0}
									fontSize={{ base: "md", md: "md" }}
									lineHeight="1.5"
									color="var(--color-text-primary)"
									_focusVisible={{ outline: "none", boxShadow: "none" }}
									required
								/>
							</Box>

							<Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={{ base: 4, md: 5 }}>
								<Box
									data-contact-form-row="true"
									pb={{ base: 2.5, md: 3 }}
									borderBottom="1px solid"
									borderColor="var(--surface-floating-border)"
								>
									<Text
										fontSize="xs"
										fontWeight="700"
										textTransform="uppercase"
										color="var(--color-text-eyebrow)"
									>
										Company
									</Text>
									<Input
										type="text"
										name="company"
										defaultValue="Northpeak Studio"
										mt={{ base: 1.5, md: 2 }}
										w="full"
										variant="subtle"
										bg="transparent"
										border="none"
										outline="none"
										p={0}
										fontSize={{ base: "sm", md: "md" }}
										lineHeight="1.5"
										color="var(--color-text-primary)"
										_focusVisible={{ outline: "none", boxShadow: "none" }}
									/>
								</Box>

								<Box
									data-contact-form-row="true"
									pb={{ base: 2.5, md: 3 }}
									borderBottom="1px solid"
									borderColor="var(--surface-floating-border)"
								>
									<Text
										fontSize="xs"
										fontWeight="700"
										textTransform="uppercase"
										color="var(--color-text-eyebrow)"
									>
										Target Timeline
									</Text>
									<Input
										type="text"
										name="timeline"
										defaultValue="Q3 2026"
										mt={{ base: 1.5, md: 2 }}
										w="full"
										variant="subtle"
										bg="transparent"
										border="none"
										outline="none"
										p={0}
										fontSize={{ base: "sm", md: "md" }}
										lineHeight="1.5"
										color="var(--color-text-primary)"
										_focusVisible={{ outline: "none", boxShadow: "none" }}
									/>
								</Box>
							</Grid>

							<Box
								data-contact-form-row="true"
								pb={{ base: 2.5, md: 3 }}
								borderBottom="1px solid"
								borderColor="var(--surface-floating-border)"
							>
								<Text
									fontSize="xs"
									fontWeight="700"
									textTransform="uppercase"
									color="var(--color-text-eyebrow)"
								>
									Content
								</Text>
								<Textarea
									name="message"
									mt={{ base: 1.5, md: 2 }}
									w="full"
									minH={{ base: "50px", md: "80px" }}
									resize="vertical"
									variant="subtle"
									bg="transparent"
									border="none"
									outline="none"
									p={0}
									fontSize={{ base: "sm", md: "md" }}
									lineHeight="1.7"
									color="var(--color-text-primary)"
									_focusVisible={{ outline: "none", boxShadow: "none" }}
									required
								/>
							</Box>

							<Flex
								data-contact-form-actions="true"
								justify="end"
								align={{ base: "flex-start", md: "center" }}
								direction={{ base: "column", md: "row" }}
								gap={{ base: 2.5, md: 3 }}
							>
								<Button
									type="submit"
									h="42px"
									px={{ base: 5, md: 6 }}
									borderRadius="full"
									bg="var(--color-primary-600)"
									color="var(--color-text-inverse)"
									fontSize={{ base: "sm", md: "md" }}
									fontWeight="700"
									letterSpacing="0.02em"
									_hover={{ bg: "var(--color-primary-700)" }}
									_focusVisible={{
										outline: "none",
										boxShadow:
											"0 0 0 2px color-mix(in srgb, var(--color-primary-500) 36%, transparent)",
									}}
								>
									Send Email Draft
								</Button>
							</Flex>
						</chakra.form>
					</Grid>
				</Flex>
			</Container>
		</Box>
	);
}

export default Contact;
