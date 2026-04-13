import elektroniskAdminImage from "@/assets/images/personal_project/elektronisk_admin/elektronisk-admin-web-mockup.webp";
import elektroniskClientImage from "@/assets/images/personal_project/elektronisk_client/elektronisk-client-web-mockup.webp";
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
	image: PersonalProjectImage;
}

const yogoCareProject: PersonalProject = {
	id: "yogo-care-appointment-platform",
	projectTitle: "Healthcare Appointment Workflow System",
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
	image: {
		src: yogoAdminDashboardImage,
		alt: "Yogo Care admin dashboard showing appointment analytics and queue status",
		caption: "Admin queue and appointment visibility",
	},
};

const elektroniskStorefrontProject: PersonalProject = {
	id: "elektronisk-ecommerce-storefront",
	projectTitle: "Electronics Storefront and Checkout System",
	liveUrl: "https://elektronisk.vercel.app/",
	oneLineSummary:
		"Built a responsive electronics e-commerce storefront with API-driven product browsing, persistent cart state, and checkout session redirection using Next.js.",
	projectOverview:
		"Developed a modern shopping experience focused on electronics, including featured product discovery, category-based browsing, backcolor filtering, product quick preview, and detailed product pages with technical specs. The application uses a clean component architecture, client-side cart persistence, and backend-powered checkout flow for smooth purchasing.",
	myContribution: [
		"Implemented core storefront flows: featured products, category navigation, and product detail experiences.",
		"Built filtering by backcolor using query-string based URL state for shareable and dynamic category pages.",
		"Developed reusable UI modules (product cards, gallery tabs, modal preview, cart summary) for consistency and maintainability.",
		"Integrated persistent cart management with Zustand + localStorage and added checkout initiation via API endpoint.",
		"Handled post-checkout feedback UX (success/cancel states) with toast notifications and cart reset logic.",
	],
	impactHighlights: [
		"Delivered an end-to-end shopping journey from product discovery to checkout redirection.",
		"Improved user decision-making with quick preview modal, detailed specs, and suggested products.",
		"Reduced cart abandonment friction through persistent cart state across sessions.",
		"Enabled scalable frontend growth through typed models, reusable components, and route-based organization.",
	],
	techStack: [
		"Next.js 14",
		"React 18",
		"TypeScript",
		"Tailwind CSS",
		"Headless UI",
		"Zustand",
		"Axios",
		"query-string",
		"react-hot-toast",
		"Cloudinary (Next Image domain config)",
	],
	image: {
		src: elektroniskClientImage,
		alt: "Elektronisk storefront showcasing featured electronics and product browsing UI",
		caption: "Client storefront product journey",
	},
};

const elektroniskAdminProject: PersonalProject = {
	id: "elektronisk-admin-dashboard",
	projectTitle: "E-commerce Admin Operations System",
	liveUrl: "https://elektronisk-admin.vercel.app/",
	oneLineSummary:
		"Built a multi-store ecommerce admin CMS with secure auth, full catalog CRUD, Cloudinary media uploads, Stripe order processing, and sales analytics using Next.js 14.",
	projectOverview:
		"Developed a complete admin control panel for electronics ecommerce operations. The platform supports store creation/switching, billboard/category/color/product management, image upload workflows, order tracking, and business insights dashboards. It combines protected admin APIs, structured form validation, reusable UI components, and Stripe webhook-driven order state updates for a reliable operations workflow.",
	myContribution: [
		"Implemented multi-store architecture with Clerk-protected routes and per-store data isolation.",
		"Built end-to-end CRUD modules for billboards, categories, back colors, and products (including technical spec fields and image galleries).",
		"Integrated media upload pipeline with Cloudinary and reusable upload components for admin forms.",
		"Developed checkout + payment backend flow with Stripe session creation and webhook handling to mark orders paid and archive sold products.",
		"Created analytics and reporting UI (revenue chart, sales count chart, top-selling product, in-stock count) using Prisma queries and Recharts.",
		"Standardized admin UX with reusable form/table/modal patterns, validation via React Hook Form + Zod, and toast-driven feedback.",
	],
	impactHighlights: [
		"Enabled complete day-to-day ecommerce operations from one dashboard: catalog setup, pricing, merchandising, and order review.",
		"Improved data consistency through validated inputs, centralized API patterns, and relational schema design.",
		"Reduced manual order handling by automating payment confirmation and product status updates via Stripe webhook events.",
		"Improved decision support with real-time visual metrics for revenue trends, sales mix, and inventory visibility.",
		"Made the system easier to scale by using modular route-based architecture and reusable UI/data components.",
	],
	techStack: [
		"Next.js 14 (App Router)",
		"React 18",
		"TypeScript",
		"Prisma ORM",
		"MySQL",
		"Clerk Authentication",
		"Tailwind CSS",
		"shadcn/ui + Radix UI",
		"React Hook Form",
		"Zod",
		"Zustand",
		"@tanstack/react-table",
		"Recharts",
		"Stripe (Checkout + Webhooks)",
		"Cloudinary + next-cloudinary",
	],
	image: {
		src: elektroniskAdminImage,
		alt: "Elektronisk admin dashboard with ecommerce analytics and product management panels",
		caption: "Admin CMS operations dashboard",
	},
};

export const personalProjects: readonly PersonalProject[] = [
	yogoCareProject,
	elektroniskStorefrontProject,
	elektroniskAdminProject,
] as const;
