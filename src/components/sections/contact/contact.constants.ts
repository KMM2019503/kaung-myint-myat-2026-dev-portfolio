export const CONTACT_EMAIL = "kaungmyintmyat2003@gmail.com";

export interface ContactRailItem {
	id: string;
	label: string;
	value: string;
	note?: string;
}

export type ChannelInteractionType = "copy" | "next-tab";

export interface ChannelRailItem extends ContactRailItem {
	interactionType: ChannelInteractionType;
	interactionTarget?: string;
}

export const collaborationRails: readonly ContactRailItem[] = [
	{
		id: "rail-role",
		label: "Role Focus",
		value: "Frontend & Mobile Developer",
	},
] as const;

export const availabilityRails: readonly ContactRailItem[] = [
	{
		id: "availability-base-timezone",
		label: "Base / Timezone",
		value: "Yangon, Myanmar (MMT UTC+6:30)",
	},
] as const;

export const channelRails = [
	{
		id: "channel-linkedin",
		label: "LinkedIn",
		value: "https://www.linkedin.com/in/kaung-myint-myat-921273282/",
		interactionType: "next-tab",
		interactionTarget: "https://www.linkedin.com/in/kaung-myint-myat-921273282/",
	},
	{
		id: "telegram-acc",
		label: "Telegram",
		value: "@piaz19",
		interactionType: "copy",
	},
	{
		id: "phone-number",
		label: "Phone",
		value: "+95 99 517 035 30",
		interactionType: "copy",
	},
] as const satisfies readonly ChannelRailItem[];
