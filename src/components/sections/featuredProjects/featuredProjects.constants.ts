export const projectIntroCodeLines = [
	"interface Product = {",
	"  performance: 'optimized',",
	"  accessibility: true,",
	"  interactionDesign: 'international',",
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
		id: "chip-expo",
		label: "Expo",
		top: { base: "54%", md: "56%" },
		left: { base: "-12px", md: "-24px" },
	},
	{
		id: "chip-eas-update",
		label: "EAS Update",
		top: { base: "74%", md: "66%" },
		right: { base: "-10px", md: "-24px" },
	},
	{
		id: "chip-i18n",
		label: "i18n",
		top: { base: "-16px", md: "-22px" },
		right: { base: "-12px", md: "-30px" },
	},
];

export const projectTechBadges = [
	"React Native",
	"Expo",
	"EAS Update",
	"TypeScript",
	"List Optimization",
	"i18n",
	"Passcode Auth",
	"Payload Normalization",
	"Retry Strategy",
	"Legacy UI Alignment",
] as const;

export const projectTechBadgeTickerItems = ["loop-a", "loop-b"].flatMap((loopId) =>
	projectTechBadges.map((tag) => ({ key: `${loopId}-${tag}`, tag })),
);

export const firstProjectMetrics = [
	{
		id: "metric-dau",
		label: "50K",
		description: "Daily Active Users",
	},
	{
		id: "metric-countries",
		label: "8 Countries",
		description: "Dynamic Payslip Structures",
	},
	{
		id: "metric-ota",
		label: "OTA Ready",
		description: "Faster UI + JS Releases via EAS Update",
	},
] as const;

export const firstProjectModules = [
	"Onboarding",
	"Leave",
	"KPI",
	"Settings",
	"Payslip",
	"Scan & Remote Check In/Out",
	"CV Screening",
	"Expense",
] as const;

export const firstProjectHighlights = [
	"Reworked onboarding and delayed non-critical permission prompts for a smoother first-run flow.",
	"Centralized leave rules, strengthened permission/network handling, and reduced KPI list re-renders.",
	"Built a payslip normalization layer for country-specific payloads instead of hardcoded branches.",
] as const;

export interface ProjectPlaceholderPanelData {
	id: string;
	title: string;
	caption: string;
}

export const projectPlaceholders: readonly ProjectPlaceholderPanelData[] = [
	{ id: "project-panel-2", title: "Project 02", caption: "Detailed project story coming next." },
	{ id: "project-panel-3", title: "Project 03", caption: "Detailed project story coming next." },
];
