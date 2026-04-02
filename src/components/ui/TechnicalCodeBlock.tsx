import { Box, Text } from "@chakra-ui/react";

interface TechnicalCodeBlockProps {
	lines: readonly string[];
	typedLines: readonly string[];
	activeLineIndex: number | null;
}

export function TechnicalCodeBlock({
	lines,
	typedLines,
	activeLineIndex,
}: TechnicalCodeBlockProps) {
	return (
		<Box
			borderRadius={{ base: "2xl", md: "28px" }}
			bg="color-mix(in srgb, var(--color-bg-secondary) 86%, transparent)"
			border="1px solid"
			borderColor="var(--color-border)"
			p={{ base: 4, md: 5 }}
			minH={{ base: "180px", md: "220px" }}
			overflowX="auto"
		>
			{lines.map((line, index) => (
				<Text
					key={line}
					fontFamily='"IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace'
					fontSize={{ base: "sm", md: "md" }}
					lineHeight={{ base: "1.8", md: "1.9" }}
					whiteSpace="pre"
					color={
						index === 0 || index === lines.length - 1
							? "var(--color-text-accent)"
							: "var(--color-text-secondary)"
					}
					display="flex"
					alignItems="center"
				>
					{typedLines[index] || "\u00a0"}
					{activeLineIndex === index ? (
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
	);
}
