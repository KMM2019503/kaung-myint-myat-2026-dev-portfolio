import { Button } from "@chakra-ui/react";

interface PersonalProjectDetailsButtonProps {
	onClick: () => void;
}

export function PersonalProjectDetailsButton({ onClick }: PersonalProjectDetailsButtonProps) {
	return (
		<Button
			type="button"
			onClick={onClick}
			w="full"
			minW={0}
			px={3}
			py={2}
			borderRadius="full"
			fontSize={{ base: "sm", md: "sm" }}
			fontWeight="700"
			letterSpacing="0.01em"
			whiteSpace="nowrap"
			bg="var(--color-primary-600)"
			color="var(--color-text-inverse)"
			_hover={{ bg: "var(--color-primary-700)" }}
		>
			View Details
		</Button>
	);
}

interface PersonalProjectLiveSiteButtonProps {
	liveUrl?: string;
}

export function PersonalProjectLiveSiteButton({ liveUrl }: PersonalProjectLiveSiteButtonProps) {
	const hasLiveUrl = typeof liveUrl === "string" && /^https?:\/\//.test(liveUrl);

	return (
		<Button
			type="button"
			onClick={() => {
				if (hasLiveUrl) {
					window.open(liveUrl, "_blank", "noopener,noreferrer");
				}
			}}
			disabled={!hasLiveUrl}
			w="full"
			minW={0}
			px={3}
			py={2}
			borderRadius="full"
			fontSize={{ base: "sm", md: "sm" }}
			fontWeight="700"
			letterSpacing="0.01em"
			whiteSpace="nowrap"
			bg="color-mix(in srgb, var(--surface-floating-solid) 88%, transparent)"
			color="var(--color-text-accent-strong)"
			border="1px solid color-mix(in srgb, var(--surface-floating-border) 92%, transparent)"
			_hover={{
				bg: "color-mix(in srgb, var(--color-primary-500) 14%, transparent)",
			}}
			_disabled={{
				opacity: 0.58,
				cursor: "not-allowed",
				bg: "color-mix(in srgb, var(--surface-floating-solid) 84%, transparent)",
				color: "var(--color-text-tertiary)",
				borderColor: "color-mix(in srgb, var(--surface-floating-border) 80%, transparent)",
				_hover: {
					bg: "color-mix(in srgb, var(--surface-floating-solid) 84%, transparent)",
				},
			}}
		>
			{hasLiveUrl ? "Live Site" : "Live Soon"}
		</Button>
	);
}
