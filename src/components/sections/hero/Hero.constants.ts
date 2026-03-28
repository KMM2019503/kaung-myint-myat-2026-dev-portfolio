export interface HeroFloatingChip {
	id: string;
	label: string;
	top: {
		base: string;
		md: string;
	};
	left?: {
		base: string;
		md: string;
	};
	right?: {
		base: string;
		md: string;
	};
	showOnMobile: boolean;
}

export const floatingChips: HeroFloatingChip[] = [
	{
		id: "chip-typescript",
		label: "TypeScript",
		top: { base: "-18px", md: "-26px" },
		left: { base: "18px", md: "-18px" },
		showOnMobile: true,
	},
	{
		id: "chip-react-native",
		label: "React Native",
		top: { base: "18%", md: "20%" },
		right: { base: "-14px", md: "-30px" },
		showOnMobile: false,
	},
	{
		id: "chip-react",
		label: "React",
		top: { base: "46%", md: "44%" },
		left: { base: "6px", md: "-22px" },
		showOnMobile: true,
	},
	{
		id: "chip-vue",
		label: "Vue.js",
		top: { base: "74%", md: "62%" },
		right: { base: "-8px", md: "-24px" },
		showOnMobile: true,
	},
	{
		id: "chip-node",
		label: "JavaScript",
		top: { base: "88%", md: "78%" },
		left: { base: "12px", md: "-8px" },
		showOnMobile: false,
	},
];

export const inCardBadges = [
	"Node.js",
	"Next.js",
	"Nuxt.js",
	"Express",
	"Prisma",
	"GraphQL",
	"Rest API",
	"Git",
	"Agent Coding",
	"SEO Optimization",
	"Performance Tuning",
	"Cross-Browser Compatibility",
];

export const inCardBadgeTickerItems = ["loop-a", "loop-b"].flatMap((loopId) =>
	inCardBadges.map((tag) => ({ key: `${loopId}-${tag}`, tag })),
);

export const codeLines = [
	"interface ProductExperience {",
	"  accessibility: true;",
	"  performance: 'optimized';",
	"  interactionDesign: 'intentional';",
	"}",
];

export const downloadCvHref =
	"https://drive.google.com/file/d/1XW9yeee0fN64HLe9Ara_e2-HZTqPveAV/view?usp=sharing";
