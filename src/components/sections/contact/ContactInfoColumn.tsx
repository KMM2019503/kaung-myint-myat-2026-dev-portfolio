import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import type { RefObject } from "react";
import { ContactPhoto } from "./ContactPhoto";
import {
	availabilityRails,
	type ChannelRailItem,
	channelRails,
	collaborationRails,
} from "./contact.constants";

interface ContactInfoColumnProps {
	photoRef: RefObject<HTMLDivElement | null>;
	onChannelAction: (item: ChannelRailItem) => Promise<void>;
}

export function ContactInfoColumn({ photoRef, onChannelAction }: ContactInfoColumnProps) {
	return (
		<Flex direction="column" gap={{ base: 4, md: 5 }}>
			<ContactPhoto photoRef={photoRef} />

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
						<Text mt="1" fontSize={{ base: "sm", md: "sm" }} color="var(--color-text-secondary)">
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
							onClick={() => void onChannelAction(item)}
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
	);
}
