import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: { value: '"Lora", serif' },
				body: { value: '"Ubuntu", sans-serif' },
			},
			colors: {
				primary: {
					50: { value: "#faf5ff" },
					100: { value: "#f3e8ff" },
					200: { value: "#e9d5ff" },
					300: { value: "#d8b4fe" },
					400: { value: "#c084fc" },
					500: { value: "#a855f7" },
					600: { value: "#9333ea" },
					700: { value: "#7c3aed" },
					800: { value: "#6b21a8" },
					900: { value: "#581c87" },
					950: { value: "#3b0764" },
				},
			},
		},
		semanticTokens: {
			colors: {
				accent: {
					solid: { value: "{colors.primary.600}" },
					text: { value: "{colors.primary.600}" },
					bg: { value: "{colors.primary.600}" },
					fg: { value: "white" },
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, customConfig);
