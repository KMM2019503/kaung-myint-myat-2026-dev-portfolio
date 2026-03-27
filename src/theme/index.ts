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
					50: { value: "#eef9ff" },
					100: { value: "#daf0ff" },
					200: { value: "#bbe4ff" },
					300: { value: "#91d4ff" },
					400: { value: "#5dbbf4" },
					500: { value: "#2f9ddd" },
					600: { value: "#1a82c2" },
					700: { value: "#16689d" },
					800: { value: "#17547d" },
					900: { value: "#184564" },
					950: { value: "#132d42" },
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
