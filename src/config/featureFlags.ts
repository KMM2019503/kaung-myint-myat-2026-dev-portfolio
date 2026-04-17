function parseBooleanFlag(rawValue: string | undefined, defaultValue: boolean): boolean {
	if (rawValue === undefined) {
		return defaultValue;
	}

	const normalized = rawValue.trim().toLowerCase();

	if (["1", "true", "yes", "on"].includes(normalized)) {
		return true;
	}

	if (["0", "false", "no", "off"].includes(normalized)) {
		return false;
	}

	return defaultValue;
}

export const sectionVisibility = {
	hero: parseBooleanFlag(import.meta.env.VITE_SHOW_HERO_SECTION, true),
	experience: parseBooleanFlag(import.meta.env.VITE_SHOW_EXPERIENCE_SECTION, true),
	featuredProjects: parseBooleanFlag(import.meta.env.VITE_SHOW_FEATURED_PROJECTS_SECTION, true),
	personalProjects: parseBooleanFlag(import.meta.env.VITE_SHOW_PERSONAL_PROJECTS_SECTION, true),
	seniorRecommendations: parseBooleanFlag(
		import.meta.env.VITE_SHOW_SENIOR_RECOMMENDATIONS_SECTION,
		true,
	),
	contact: parseBooleanFlag(import.meta.env.VITE_SHOW_CONTACT_SECTION, true),
} as const;
