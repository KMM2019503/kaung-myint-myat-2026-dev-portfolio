export const projectIntroCodeLines = [
	"const buildIntentionalProduct = {",
	"  alignProductGoals: true,",
	"  mapUserFriction: true,",
	"  exposeTradeoffs: true,",
	"  outcome: ['stable', 'scalable'],",
	"};",
] as const;

export interface IntroFloatingChip {
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
}

export const introFloatingChips: IntroFloatingChip[] = [
	{
		id: "chip-typescript",
		label: "TypeScript",
		top: { base: "-16px", md: "-22px" },
		left: { base: "10px", md: "-18px" },
	},
	{
		id: "chip-react-native",
		label: "React Native",
		top: { base: "98%", md: "98%" },
		right: { base: "40%", md: "40%" },
	},
	{
		id: "chip-react",
		label: "React",
		top: { base: "54%", md: "56%" },
		left: { base: "-12px", md: "-24px" },
	},
	{
		id: "chip-vue",
		label: "Vue.js",
		top: { base: "74%", md: "66%" },
		right: { base: "-10px", md: "-24px" },
	},
	{
		id: "chip-javascript",
		label: "JavaScript",
		top: { base: "-16px", md: "-22px" },
		right: { base: "-12px", md: "-30px" },
	},
];

export const projectTechBadges = [
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
] as const;

export const projectTechBadgeTickerItems = ["loop-a", "loop-b"].flatMap((loopId) =>
	projectTechBadges.map((tag) => ({ key: `${loopId}-${tag}`, tag })),
);

export interface ProjectPlaceholderPanelData {
	id: string;
	title: string;
	caption: string;
}

export const projectPlaceholders: readonly ProjectPlaceholderPanelData[] = [
	{ id: "project-panel-1", title: "Project 01", caption: "Detailed project story coming next." },
	{ id: "project-panel-2", title: "Project 02", caption: "Detailed project story coming next." },
	{ id: "project-panel-3", title: "Project 03", caption: "Detailed project story coming next." },
];
