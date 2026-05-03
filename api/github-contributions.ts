import type { IncomingMessage, ServerResponse } from "node:http";
import type {
	GitHubContributionCalendarPayload,
	GitHubContributionDay,
	GitHubContributionWeek,
} from "../src/lib/githubContributionCalendar";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const CONTRIBUTION_LOOKBACK_MONTHS = 7;

const GITHUB_CONTRIBUTIONS_QUERY = `
	query GitHubContributions($login: String!, $from: DateTime!, $to: DateTime!) {
		user(login: $login) {
			contributionsCollection(from: $from, to: $to) {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							date
							contributionCount
							color
						}
					}
				}
			}
		}
	}
`;

interface GitHubGraphQLResponse {
	data?: {
		user?: {
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: number;
					weeks: GitHubContributionWeek[];
				};
			};
		} | null;
	};
	errors?: Array<{ message: string }>;
}

function getContributionRange() {
	const to = new Date();
	const from = new Date(to);
	from.setUTCMonth(to.getUTCMonth() - CONTRIBUTION_LOOKBACK_MONTHS);

	return {
		from: from.toISOString(),
		to: to.toISOString(),
	};
}

function sendJson(
	response: ServerResponse,
	statusCode: number,
	body: GitHubContributionCalendarPayload | { error: string },
) {
	response.statusCode = statusCode;
	response.setHeader("Content-Type", "application/json; charset=utf-8");
	response.end(JSON.stringify(body));
}

function normalizeContributionWeeks(weeks: GitHubContributionWeek[]) {
	return weeks.map((week) => ({
		contributionDays: week.contributionDays.map<GitHubContributionDay>((day) => ({
			date: day.date,
			contributionCount: day.contributionCount,
			color: day.color,
		})),
	}));
}

export default async function handler(request: IncomingMessage, response: ServerResponse) {
	const method = request.method?.toUpperCase() ?? "GET";
	response.setHeader("Allow", "GET, OPTIONS");

	if (method === "OPTIONS") {
		response.statusCode = 204;
		response.end();
		return;
	}

	if (method !== "GET") {
		sendJson(response, 405, { error: "Method not allowed." });
		return;
	}

	const token = process.env.GITHUB_TOKEN?.trim();
	const username = process.env.GITHUB_USERNAME?.trim();

	if (!token || !username) {
		sendJson(response, 500, {
			error: "GitHub contribution environment variables are not configured.",
		});
		return;
	}

	try {
		const range = getContributionRange();
		const githubResponse = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				"User-Agent": "kaung-myint-myat-portfolio",
			},
			body: JSON.stringify({
				query: GITHUB_CONTRIBUTIONS_QUERY,
				variables: {
					login: username,
					from: range.from,
					to: range.to,
				},
			}),
		});

		const githubJson = (await githubResponse.json()) as GitHubGraphQLResponse;

		if (!githubResponse.ok || githubJson.errors?.length) {
			console.error("GitHub contribution calendar request failed", {
				status: githubResponse.status,
				errors: githubJson.errors,
			});
			sendJson(response, 502, { error: "GitHub contribution data could not be loaded." });
			return;
		}

		const calendar = githubJson.data?.user?.contributionsCollection.contributionCalendar;

		if (!calendar) {
			sendJson(response, 404, { error: "GitHub user contribution data was not found." });
			return;
		}

		response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
		sendJson(response, 200, {
			username,
			totalContributions: calendar.totalContributions,
			weeks: normalizeContributionWeeks(calendar.weeks),
			fetchedAt: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Unexpected GitHub contribution calendar error", error);
		sendJson(response, 500, { error: "GitHub contribution data is temporarily unavailable." });
	}
}
