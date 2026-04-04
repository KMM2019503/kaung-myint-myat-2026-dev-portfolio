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

type NonEmptyArray<T> = readonly [T, ...T[]];

export interface ProjectMetric {
	id: string;
	label: string;
	description: string;
}

export interface ProjectCaseStudyData {
	id: string;
	label: string;
	title: string;
	summary: NonEmptyArray<string>;
	metricHeading: string;
	metrics: NonEmptyArray<ProjectMetric>;
	modules: NonEmptyArray<string>;
	highlights: NonEmptyArray<string>;
}

export const projectCaseStudies: readonly ProjectCaseStudyData[] = [
	{
		id: "project-01",
		label: "BetterHR Mobile React Native",
		title: "Scaled a React Native HR app to 50K daily active users.",
		summary: [
			"I led Onboarding, Leave, KPI, Settings, Payslip, Scan & Remote Check In/Out, CV Screening, and Expense while aligning behavior with the legacy Swift and Kotlin apps.",
		],
		metricHeading: "Impact Snapshot",
		metrics: [
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
		],
		modules: [
			"Onboarding",
			"Leave",
			"KPI",
			"Settings",
			"Payslip",
			"Scan & Remote Check In/Out",
			"CV Screening",
			"Expense",
		],
		highlights: [
			"Reworked onboarding and delayed non-critical permission prompts for a smoother first-run flow.",
			"Centralized leave rules, strengthened permission/network handling, and reduced KPI list re-renders.",
			"Built a payslip normalization layer for country-specific payloads instead of hardcoded branches.",
		],
	},
	{
		id: "project-02",
		label: "BetterHR Web Dashboard (Vue 2, Nuxt 2)",
		title: "Optimized BetterHR core dashboard at scale.",
		summary: [
			"Worked on the BetterHR frontend (Vue 2, Nuxt 2) for 1 year, delivering high-impact features and improving performance in a large-scale HR system.",
		],
		metricHeading: "Impact Snapshot",
		metrics: [
			{
				id: "metric-id-payroll",
				label: "Indonesia Payroll",
				description: "Delivered region-specific payroll features for local requirements.",
			},
			{
				id: "metric-employee-table",
				label: "Employee Table Rewrite",
				description: "Restructured large tables for stronger performance and scalability.",
			},
			{
				id: "metric-duty-roster",
				label: "Duty Roster Analytics",
				description: "Optimized analytics and rendering for heavy roster datasets.",
			},
		],
		modules: ["Employee", "Payroll (Indonesia)", "Duty Roster", "KPI"],
		highlights: [
			"Delivered Indonesia Payroll features supporting region-specific requirements.",
			"Rewrote Employee table structure to significantly improve performance and scalability.",
			"Built Duty Roster Analytics and optimized large table rendering.",
			"Developed KPI View by Employee for better performance insights.",
			"Continuously improved stability through bug fixes and product enhancements.",
		],
	},
	{
		id: "project-03",
		label: "BetterHR Dashboard Refactor (React, vite)",
		title:
			"Refactoring BetterHR Dashboard to React",
		summary: [
			"Contributed to a full frontend migration from Vue 2 / Nuxt 2 to React, focusing on performance, user experience, and efficient data flow across core HR modules.",
		],
		metricHeading: "Impact Snapshot",
		metrics: [
			{
				id: "metric-migration-timeline",
				label: "1.5 Months",
				description: "Delivered migration across multiple core modules within a short timeline.",
			},
			{
				id: "metric-feature-parity",
				label: "Feature Parity",
				description: "Refactored legacy modules into React while preserving existing behavior.",
			},
			{
				id: "metric-core-modules",
				label: "4 Core Modules",
				description: "Dashboard, Base Pay & OT, Attendance (Duty Roster), and Employee.",
			},
		],
		modules: ["Dashboard", "Base Pay & OT", "Attendance (Duty Roster)", "Employee"],
		highlights: [
			"Refactored legacy modules into React while maintaining full feature parity.",
			"Improved load performance through optimized rendering and data prefetching.",
			"Enhanced user flows for clearer, more intuitive interactions.",
			"Delivered across multiple core modules within a short timeframe of 1.5 months.",
			"Contributed to a more scalable and maintainable frontend architecture.",
		],
	},
] as const;

export interface ProjectPlaceholderPanelData {
	id: string;
	title: string;
	caption: string;
}

export const projectPlaceholders: readonly ProjectPlaceholderPanelData[] = [
	// Intentionally empty: all current featured projects are represented as full case studies.
];
