import yogoAdminDashboardImage from "@/assets/images/personal_project/yogo/yogo_admin_dashboard.webp";

export interface PersonalProjectImage {
	src: string;
	alt: string;
	caption: string;
}

export interface PersonalProject {
	id: string;
	projectTitle: string;
	liveUrl?: string;
	oneLineSummary: string;
	projectOverview: string;
	myContribution: readonly string[];
	impactHighlights: readonly string[];
	techStack: readonly string[];
	statusStates: readonly string[];
	image: PersonalProjectImage;
}

export interface PersonalProjectSnapshot {
	id: string;
	src: string;
	alt: string;
	timestamp: string;
	label: string;
	viewport: "desktop" | "mobile";
}

const yogoCareProjectBase: Omit<PersonalProject, "id"> = {
	projectTitle: "Yogo Care Appointment Platform",
	liveUrl: "http://yogo-drab.vercel.app/",
	oneLineSummary:
		"Built a full healthcare appointment workflow with separate patient and admin experiences using Next.js and React.",
	projectOverview:
		"Developed a modern appointment management platform that guides patients from registration to appointment request, while giving admins a clear dashboard to manage scheduling and status updates. The product focuses on usability, fast workflows, and clean data visibility for daily operations.",
	myContribution: [
		"Built key frontend flows for patient registration, appointment booking, and appointment status tracking.",
		"Implemented admin dashboard screens for schedule management and queue monitoring.",
		"Structured reusable UI components (cards, charts, summaries) for consistency and easier scaling.",
		"Improved UX with clear status states (scheduled, pending, cancelled) and actionable layouts.",
	],
	impactHighlights: [
		"Delivered an end-to-end booking experience from patient onboarding to admin handling.",
		"Reduced operational friction with role-based views tailored to patients and administrators.",
		"Improved monitoring with dashboard summaries, trend visuals, and status breakdowns.",
		"Established a maintainable component-driven frontend architecture for future expansion.",
	],
	techStack: [
		"Next.js 15",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"Shadcn UI",
		"Recharts",
		"Appwrite",
	],
	statusStates: ["Scheduled", "Pending", "Cancelled"],
	image: {
		src: yogoAdminDashboardImage,
		alt: "Yogo Care admin dashboard showing appointment analytics and queue status",
		caption: "Admin queue and appointment visibility",
	}
};

export const personalProjects: readonly PersonalProject[] = [
	{ id: "yogo-care-appointment-platform-01", ...yogoCareProjectBase },
	{ id: "yogo-care-appointment-platform-02", ...yogoCareProjectBase },
	{ id: "yogo-care-appointment-platform-03", ...yogoCareProjectBase },
] as const;
