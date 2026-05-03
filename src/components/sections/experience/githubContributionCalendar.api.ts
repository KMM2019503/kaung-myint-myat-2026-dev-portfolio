import type { GitHubContributionCalendarPayload } from "@/lib/githubContributionCalendar";
import { isGitHubContributionCalendarPayload } from "@/lib/githubContributionCalendar";

function getErrorMessage(body: unknown) {
	if (
		typeof body === "object" &&
		body !== null &&
		"error" in body &&
		typeof body.error === "string"
	) {
		return body.error;
	}

	return "GitHub contribution data could not be loaded.";
}

export async function fetchGitHubContributionCalendar(
	signal?: AbortSignal,
): Promise<GitHubContributionCalendarPayload> {
	const response = await fetch("/api/github-contributions", {
		headers: {
			Accept: "application/json",
		},
		signal,
	});
	let body: unknown = null;

	try {
		body = await response.json();
	} catch {
		body = null;
	}

	if (!response.ok) {
		throw new Error(getErrorMessage(body));
	}

	if (!isGitHubContributionCalendarPayload(body)) {
		throw new Error("GitHub contribution data was incomplete.");
	}

	return body;
}
