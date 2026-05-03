export interface GitHubContributionDay {
	date: string;
	contributionCount: number;
	color: string;
}

export interface GitHubContributionWeek {
	contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendarPayload {
	username: string;
	totalContributions: number;
	weeks: GitHubContributionWeek[];
	fetchedAt: string;
}

export interface ContributionMonthLabel {
	label: string;
	weekIndex: number;
}

const CONTRIBUTION_INTENSITY_BACKGROUNDS = [
	"var(--github-contribution-level-0)",
	"var(--github-contribution-level-1)",
	"var(--github-contribution-level-2)",
	"var(--github-contribution-level-3)",
	"var(--github-contribution-level-4)",
] as const;

const DAY_IN_MS = 86_400_000;

const fullDateFormatter = new Intl.DateTimeFormat("en", {
	weekday: "long",
	month: "long",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

const compactDateFormatter = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en", {
	month: "short",
	timeZone: "UTC",
});

const numberFormatter = new Intl.NumberFormat("en");

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function parseCalendarDate(date: string) {
	return new Date(`${date}T00:00:00.000Z`);
}

function getCalendarDateTime(date: string) {
	return parseCalendarDate(date).getTime();
}

function getTodayIsoDate() {
	return new Date().toISOString().slice(0, 10);
}

function isContributionDay(value: unknown): value is GitHubContributionDay {
	if (!isObject(value)) {
		return false;
	}

	return (
		typeof value.date === "string" &&
		typeof value.contributionCount === "number" &&
		typeof value.color === "string"
	);
}

function isContributionWeek(value: unknown): value is GitHubContributionWeek {
	if (!isObject(value) || !Array.isArray(value.contributionDays)) {
		return false;
	}

	return value.contributionDays.every(isContributionDay);
}

export function isGitHubContributionCalendarPayload(
	value: unknown,
): value is GitHubContributionCalendarPayload {
	if (!isObject(value) || !Array.isArray(value.weeks)) {
		return false;
	}

	return (
		typeof value.username === "string" &&
		typeof value.totalContributions === "number" &&
		typeof value.fetchedAt === "string" &&
		value.weeks.every(isContributionWeek)
	);
}

export function flattenContributionDays(weeks: GitHubContributionWeek[]) {
	return weeks
		.flatMap((week) => week.contributionDays)
		.sort((dayA, dayB) => dayA.date.localeCompare(dayB.date));
}

export function getContributionTotal(weeks: GitHubContributionWeek[]) {
	return flattenContributionDays(weeks).reduce((total, day) => total + day.contributionCount, 0);
}

export function getRecentContributionWeeks(weeks: GitHubContributionWeek[], monthCount: number) {
	if (monthCount <= 0) {
		return [];
	}

	const days = flattenContributionDays(weeks);
	const lastDay = days[days.length - 1];

	if (!lastDay) {
		return [];
	}

	const startDate = parseCalendarDate(lastDay.date);
	startDate.setUTCMonth(startDate.getUTCMonth() - monthCount);
	const startDateTime = startDate.getTime();

	return weeks
		.map((week) => ({
			contributionDays: week.contributionDays.filter(
				(day) => getCalendarDateTime(day.date) >= startDateTime,
			),
		}))
		.filter((week) => week.contributionDays.length > 0);
}

export function formatContributionDate(date: string) {
	return fullDateFormatter.format(parseCalendarDate(date));
}

export function formatCompactContributionDate(date: string) {
	return compactDateFormatter.format(parseCalendarDate(date));
}

export function formatContributionCount(count: number) {
	return `${numberFormatter.format(count)} ${count === 1 ? "contribution" : "contributions"}`;
}

export function formatContributionTotal(count: number) {
	return numberFormatter.format(count);
}

export function getUtcWeekday(date: string) {
	return parseCalendarDate(date).getUTCDay();
}

export function getContributionIntensity(contributionCount: number, maxContributionCount: number) {
	if (contributionCount <= 0 || maxContributionCount <= 0) {
		return 0;
	}

	const ratio = contributionCount / maxContributionCount;

	if (ratio <= 0.25) {
		return 1;
	}

	if (ratio <= 0.5) {
		return 2;
	}

	if (ratio <= 0.75) {
		return 3;
	}

	return 4;
}

export function getContributionCellBackground(
	day: GitHubContributionDay,
	maxContributionCount: number,
) {
	const intensity = getContributionIntensity(day.contributionCount, maxContributionCount);

	return CONTRIBUTION_INTENSITY_BACKGROUNDS[intensity] ?? day.color;
}

export function getMaxContributionDay(weeks: GitHubContributionWeek[]) {
	const days = flattenContributionDays(weeks);
	let maxDay: GitHubContributionDay | undefined;

	for (const day of days) {
		if (!maxDay || day.contributionCount > maxDay.contributionCount) {
			maxDay = day;
		}
	}

	return maxDay && maxDay.contributionCount > 0 ? maxDay : undefined;
}

export function getCurrentContributionStreak(weeks: GitHubContributionWeek[]) {
	const days = flattenContributionDays(weeks);
	const today = getTodayIsoDate();
	let currentIndex = days.length - 1;

	while (currentIndex >= 0 && days[currentIndex].date > today) {
		currentIndex -= 1;
	}

	if (currentIndex < 0) {
		return 0;
	}

	let expectedDateTime = getCalendarDateTime(days[currentIndex].date);
	let streak = 0;

	for (let index = currentIndex; index >= 0; index -= 1) {
		const day = days[index];

		if (getCalendarDateTime(day.date) !== expectedDateTime || day.contributionCount <= 0) {
			break;
		}

		streak += 1;
		expectedDateTime -= DAY_IN_MS;
	}

	return streak;
}

export function getContributionMonthLabels(weeks: GitHubContributionWeek[]) {
	const labels: ContributionMonthLabel[] = [];
	let previousMonthKey = "";
	let previousLabelWeekIndex = -8;

	for (const [weekIndex, week] of weeks.entries()) {
		const firstMonthDay = week.contributionDays.find((day) => day.date.endsWith("-01"));
		const labelDay = firstMonthDay ?? week.contributionDays[0];

		if (!labelDay) {
			continue;
		}

		const monthKey = labelDay.date.slice(0, 7);

		if (monthKey !== previousMonthKey) {
			if (weekIndex - previousLabelWeekIndex >= 3) {
				labels.push({
					label: monthFormatter.format(parseCalendarDate(labelDay.date)),
					weekIndex,
				});
				previousLabelWeekIndex = weekIndex;
			}

			previousMonthKey = monthKey;
		}
	}

	return labels;
}
