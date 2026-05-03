import { Box, Flex, Heading, Portal, Text } from "@chakra-ui/react";
import { Activity, Flame, Github, Trophy } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
	flattenContributionDays,
	formatCompactContributionDate,
	formatContributionCount,
	formatContributionDate,
	formatContributionTotal,
	type GitHubContributionCalendarPayload,
	type GitHubContributionDay,
	getContributionCellBackground,
	getContributionMonthLabels,
	getContributionTotal,
	getCurrentContributionStreak,
	getMaxContributionDay,
	getRecentContributionWeeks,
	getUtcWeekday,
} from "@/lib/githubContributionCalendar";
import { fetchGitHubContributionCalendar } from "./githubContributionCalendar.api";

const WEEKDAY_LABELS = [
	{ id: "sun", label: "" },
	{ id: "mon", label: "Mon" },
	{ id: "tue", label: "" },
	{ id: "wed", label: "Wed" },
	{ id: "thu", label: "" },
	{ id: "fri", label: "Fri" },
	{ id: "sat", label: "" },
] as const;
const SKELETON_WEEK_COUNT = 31;
const MOBILE_SKELETON_WEEK_COUNT = 15;
const SKELETON_DAY_COUNT = 7;
const SKELETON_MONTH_LABELS = [
	{ id: "first", weekIndex: 1 },
	{ id: "second", weekIndex: 5 },
	{ id: "third", weekIndex: 9 },
	{ id: "fourth", weekIndex: 13 },
	{ id: "fifth", weekIndex: 17 },
	{ id: "sixth", weekIndex: 21 },
	{ id: "seventh", weekIndex: 25 },
] as const;

const MOBILE_RANGE_QUERY = "(max-width: 47.99em)";
const MOBILE_VISIBLE_MONTHS = 3;

interface HoveredContribution {
	day: GitHubContributionDay;
	weekIndex: number;
	x: number;
	y: number;
}

interface CalendarDayWithLayout {
	day: GitHubContributionDay;
	weekIndex: number;
}

interface ContributionMetricProps {
	icon: ReactNode;
	label: string;
	value: string;
	detail?: string;
}

function ContributionMetric({ icon, label, value, detail }: ContributionMetricProps) {
	return (
		<Flex
			align="center"
			gap="2.5"
			minW={{ base: "auto", md: "7.25rem" }}
			borderLeft={{ base: "0", md: "1px solid" }}
			borderColor="color-mix(in srgb, var(--surface-floating-border) 72%, transparent)"
			pl={{ base: 0, md: 4 }}
		>
			<Box
				display="grid"
				placeItems="center"
				w="2rem"
				h="2rem"
				borderRadius="lg"
				bg="color-mix(in srgb, var(--color-primary-500) 15%, transparent)"
				color="var(--color-text-accent-strong)"
				flexShrink={0}
			>
				{icon}
			</Box>
			<Box minW={0}>
				<Text fontSize="xs" color="var(--color-text-tertiary)" lineHeight="1.1">
					{label}
				</Text>
				<Text mt="0.5" fontSize={{ base: "md", md: "lg" }} fontWeight="800" lineHeight="1.05">
					{value}
				</Text>
				{detail ? (
					<Text mt="0.5" fontSize="xs" color="var(--color-text-tertiary)" lineHeight="1.15">
						{detail}
					</Text>
				) : null}
			</Box>
		</Flex>
	);
}

function CalendarShell({ children }: { children: ReactNode }) {
	return (
		<Box
			data-experience-github-calendar="true"
			maxW="full"
			mx="auto"
			w={{ base: "full", md: "fit-content" }}
			border="1px solid"
			borderColor="color-mix(in srgb, var(--surface-floating-border) 86%, transparent)"
			borderRadius="lg"
			bg="color-mix(in srgb, var(--surface-floating) 80%, transparent)"
			p={{ base: 3.5, md: 4 }}
			css={{
				backdropFilter: "blur(14px) saturate(142%)",
			}}
		>
			{children}
		</Box>
	);
}

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(() =>
		typeof window === "undefined" ? false : window.matchMedia(query).matches,
	);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const updateMatches = () => setMatches(mediaQueryList.matches);

		updateMatches();
		mediaQueryList.addEventListener("change", updateMatches);

		return () => {
			mediaQueryList.removeEventListener("change", updateMatches);
		};
	}, [query]);

	return matches;
}

function GitHubContributionCalendarSkeleton({ isMobileRange }: { isMobileRange: boolean }) {
	const weekCount = isMobileRange ? MOBILE_SKELETON_WEEK_COUNT : SKELETON_WEEK_COUNT;
	const skeletonCells = Array.from(
		{ length: weekCount * SKELETON_DAY_COUNT },
		(_, index) => `github-calendar-skeleton-${index}`,
	);
	const skeletonMonthLabels = isMobileRange
		? SKELETON_MONTH_LABELS.slice(0, 4)
		: SKELETON_MONTH_LABELS;

	return (
		<CalendarShell>
			<Box role="status" aria-busy="true" aria-label="Loading GitHub contribution calendar">
				<Flex
					align={{ base: "flex-start", md: "center" }}
					justify="space-between"
					gap="4"
					direction={{ base: "column", md: "row" }}
				>
					<Flex align="center" gap="3">
						<Box className="github-calendar-skeleton-block" w="2.75rem" h="2.75rem" />
						<Box>
							<Box className="github-calendar-skeleton-line" w="7rem" h="0.7rem" />
							<Box className="github-calendar-skeleton-line" mt="2" w="13rem" h="1.35rem" />
						</Box>
					</Flex>
					<Flex gap={{ base: 4, md: 5 }} wrap="wrap">
						<Box className="github-calendar-skeleton-line" w="6.5rem" h="2.3rem" />
						<Box className="github-calendar-skeleton-line" w="6.5rem" h="2.3rem" />
						<Box className="github-calendar-skeleton-line" w="6.5rem" h="2.3rem" />
					</Flex>
				</Flex>

				<Box
					mt={{ base: 5, md: 6 }}
					overflowX="auto"
					overflowY="hidden"
					pb="1"
					css={{ WebkitOverflowScrolling: "touch" }}
				>
					<Box
						w="max-content"
						style={
							{
								"--github-cell-size": "10px",
								"--github-cell-gap": "4px",
							} as CSSProperties
						}
					>
						<Box
							display="grid"
							gridTemplateColumns={`2rem repeat(${weekCount}, var(--github-cell-size))`}
							columnGap="var(--github-cell-gap)"
							mb="2"
						>
							<Box />
							{skeletonMonthLabels.map((month) => (
								<Box
									key={month.id}
									className="github-calendar-skeleton-line"
									gridColumn={`${month.weekIndex + 2} / span 2`}
									w="1.35rem"
									h="0.55rem"
								/>
							))}
						</Box>
						<Box
							display="grid"
							gridTemplateColumns={`2rem repeat(${weekCount}, var(--github-cell-size))`}
							columnGap="var(--github-cell-gap)"
						>
							<Box
								display="grid"
								gridTemplateRows={`repeat(${SKELETON_DAY_COUNT}, var(--github-cell-size))`}
								rowGap="var(--github-cell-gap)"
							>
								{WEEKDAY_LABELS.map((day) => (
									<Text key={day.id} fontSize="2xs" color="var(--color-text-tertiary)">
										{day.label}
									</Text>
								))}
							</Box>
							<Box
								gridColumn="2 / -1"
								display="grid"
								gridTemplateColumns={`repeat(${weekCount}, var(--github-cell-size))`}
								gridTemplateRows={`repeat(${SKELETON_DAY_COUNT}, var(--github-cell-size))`}
								gap="var(--github-cell-gap)"
							>
								{skeletonCells.map((cellId) => (
									<Box
										key={cellId}
										className="github-calendar-skeleton-cell"
										w="var(--github-cell-size)"
										h="var(--github-cell-size)"
										borderRadius="3px"
									/>
								))}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</CalendarShell>
	);
}

function GitHubContributionCalendarError({ message }: { message: string }) {
	return (
		<CalendarShell>
			<Flex align="flex-start" gap="3">
				<Box
					display="grid"
					placeItems="center"
					w="2.75rem"
					h="2.75rem"
					borderRadius="lg"
					bg="color-mix(in srgb, var(--color-primary-500) 14%, transparent)"
					color="var(--color-text-accent-strong)"
					flexShrink={0}
				>
					<Github size={20} strokeWidth={2} />
				</Box>
				<Box>
					<Text
						fontSize="xs"
						fontWeight="700"
						letterSpacing="0.12em"
						textTransform="uppercase"
						color="var(--color-text-eyebrow)"
					>
						GitHub Activity
					</Text>
					<Heading as="h3" mt="1" fontSize={{ base: "lg", md: "xl" }}>
						Contribution calendar is unavailable
					</Heading>
					<Text mt="2" color="var(--color-text-secondary)" fontSize={{ base: "sm", md: "md" }}>
						{message}
					</Text>
				</Box>
			</Flex>
		</CalendarShell>
	);
}

function ContributionTooltip({
	hoveredContribution,
}: {
	hoveredContribution: HoveredContribution;
}) {
	return (
		<Portal>
			<Box
				position="fixed"
				left={`${hoveredContribution.x}px`}
				top={`${hoveredContribution.y}px`}
				transform="translate(-50%, calc(-100% - 0.7rem))"
				zIndex={2000}
				pointerEvents="none"
				px="3"
				py="2"
				borderRadius="lg"
				border="1px solid"
				borderColor="color-mix(in srgb, var(--surface-floating-border) 86%, transparent)"
				bg="var(--surface-floating-solid)"
				color="var(--color-text-primary)"
				css={{
					backdropFilter: "blur(16px) saturate(150%)",
				}}
			>
				<Text fontSize="xs" fontWeight="800" whiteSpace="nowrap" lineHeight="1.2">
					{formatContributionDate(hoveredContribution.day.date)}
				</Text>
				<Text mt="1" fontSize="xs" color="var(--color-text-secondary)" whiteSpace="nowrap">
					{formatContributionCount(hoveredContribution.day.contributionCount)}
				</Text>
			</Box>
		</Portal>
	);
}

function getTargetCenter(target: HTMLElement) {
	const rect = target.getBoundingClientRect();

	return {
		x: rect.left + rect.width / 2,
		y: rect.top,
	};
}

export function GitHubContributionCalendar() {
	const [calendar, setCalendar] = useState<GitHubContributionCalendarPayload | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hoveredContribution, setHoveredContribution] = useState<HoveredContribution | null>(null);
	const isMobileRange = useMediaQuery(MOBILE_RANGE_QUERY);

	useEffect(() => {
		const abortController = new AbortController();

		async function loadCalendar() {
			try {
				setIsLoading(true);
				setError(null);
				const payload = await fetchGitHubContributionCalendar(abortController.signal);
				setCalendar(payload);
			} catch (fetchError) {
				if (abortController.signal.aborted) {
					return;
				}

				setError(
					fetchError instanceof Error
						? fetchError.message
						: "GitHub contribution data could not be loaded.",
				);
			} finally {
				if (!abortController.signal.aborted) {
					setIsLoading(false);
				}
			}
		}

		loadCalendar();

		return () => {
			abortController.abort();
		};
	}, []);

	const visibleWeeks = useMemo(() => {
		if (!calendar) {
			return [];
		}

		return isMobileRange
			? getRecentContributionWeeks(calendar.weeks, MOBILE_VISIBLE_MONTHS)
			: calendar.weeks;
	}, [calendar, isMobileRange]);

	const daysWithLayout = useMemo<CalendarDayWithLayout[]>(() => {
		return visibleWeeks.flatMap((week, weekIndex) =>
			week.contributionDays.map((day) => ({
				day,
				weekIndex,
			})),
		);
	}, [visibleWeeks]);

	const contributionDays = useMemo(
		() => (visibleWeeks.length > 0 ? flattenContributionDays(visibleWeeks) : []),
		[visibleWeeks],
	);
	const maxContributionDay = useMemo(
		() => (visibleWeeks.length > 0 ? getMaxContributionDay(visibleWeeks) : undefined),
		[visibleWeeks],
	);
	const currentStreak = useMemo(
		() => (calendar ? getCurrentContributionStreak(calendar.weeks) : 0),
		[calendar],
	);
	const monthLabels = useMemo(
		() => (visibleWeeks.length > 0 ? getContributionMonthLabels(visibleWeeks) : []),
		[visibleWeeks],
	);
	const visibleTotalContributions = useMemo(
		() => getContributionTotal(visibleWeeks),
		[visibleWeeks],
	);
	const maxContributionCount = maxContributionDay?.contributionCount ?? 0;
	const firstContributionDay = contributionDays[0];
	const lastContributionDay = contributionDays[contributionDays.length - 1];
	const hoveredWeekIndex = hoveredContribution?.weekIndex;

	const handleContributionEnter = (
		day: GitHubContributionDay,
		weekIndex: number,
		target: HTMLElement,
	) => {
		const center = getTargetCenter(target);
		setHoveredContribution({
			day,
			weekIndex,
			x: center.x,
			y: center.y,
		});
	};

	if (isLoading) {
		return <GitHubContributionCalendarSkeleton isMobileRange={isMobileRange} />;
	}

	if (error || !calendar) {
		return (
			<GitHubContributionCalendarError
				message={error ?? "GitHub contribution data could not be loaded."}
			/>
		);
	}

	return (
		<CalendarShell>
			<Flex align="flex-start" justify="flex-start" gap={{ base: 4, md: 5 }} direction="column">
				<Flex align="center" gap="3.5" minW={0}>
					<Box
						display="grid"
						placeItems="center"
						w={{ base: "2.65rem", md: "3rem" }}
						h={{ base: "2.65rem", md: "3rem" }}
						borderRadius="lg"
						bg="linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))"
						color="white"
						flexShrink={0}
					>
						<Github size={22} strokeWidth={2.2} />
					</Box>
					<Box minW={0}>
						<Text
							fontSize="xs"
							fontWeight="700"
							letterSpacing="0.12em"
							textTransform="uppercase"
							color="var(--color-text-eyebrow)"
						>
							GitHub Activity
						</Text>
						<Heading as="h3" mt="1" fontSize={{ base: "xl", md: "2xl" }} lineHeight="1.08">
							Contribution calendar
						</Heading>
						<Text mt="1.5" fontSize={{ base: "xs", md: "sm" }} color="var(--color-text-tertiary)">
							@{calendar.username}
							{firstContributionDay && lastContributionDay
								? ` · ${formatCompactContributionDate(firstContributionDay.date)} - ${formatCompactContributionDate(lastContributionDay.date)}`
								: null}
						</Text>
					</Box>
				</Flex>

				<Flex
					align="center"
					gap={{ base: 4, md: 4.5 }}
					w="full"
					justify={{ base: "space-between", md: "flex-start" }}
					wrap="wrap"
				>
					<ContributionMetric
						icon={<Activity size={17} strokeWidth={2.2} />}
						label="Total"
						value={formatContributionTotal(visibleTotalContributions)}
						detail="contributions"
					/>
					<ContributionMetric
						icon={<Flame size={17} strokeWidth={2.2} />}
						label="Current streak"
						value={`${currentStreak}`}
						detail={currentStreak === 1 ? "day" : "days"}
					/>
					<ContributionMetric
						icon={<Trophy size={17} strokeWidth={2.2} />}
						label="Peak day"
						value={maxContributionDay ? `${maxContributionDay.contributionCount}` : "0"}
						detail={
							maxContributionDay
								? formatCompactContributionDate(maxContributionDay.date)
								: "No peak yet"
						}
					/>
				</Flex>
			</Flex>

			<Box
				mt={{ base: 4, md: 5 }}
				pt={{ base: 3.5, md: 4 }}
				borderTop="1px solid"
				borderColor="color-mix(in srgb, var(--surface-floating-border) 68%, transparent)"
			>
				<Box
					overflowX="auto"
					overflowY="hidden"
					pb="1.5"
					css={{ WebkitOverflowScrolling: "touch" }}
				>
					<Box
						w="max-content"
						style={
							{
								"--github-cell-size": "clamp(10px, 0.8vw, 12px)",
								"--github-cell-gap": "4px",
							} as CSSProperties
						}
					>
						<Box
							display="grid"
							gridTemplateColumns={`2rem repeat(${visibleWeeks.length}, var(--github-cell-size))`}
							columnGap="var(--github-cell-gap)"
							mb="2"
							alignItems="end"
						>
							<Box />
							{monthLabels.map((monthLabel) => (
								<Text
									key={`${monthLabel.label}-${monthLabel.weekIndex}`}
									gridColumn={`${monthLabel.weekIndex + 2} / span 4`}
									fontSize="2xs"
									color="var(--color-text-tertiary)"
									lineHeight="1"
								>
									{monthLabel.label}
								</Text>
							))}
						</Box>
						<Box
							display="grid"
							gridTemplateColumns={`2rem repeat(${visibleWeeks.length}, var(--github-cell-size))`}
							columnGap="var(--github-cell-gap)"
						>
							<Box
								display="grid"
								gridTemplateRows="repeat(7, var(--github-cell-size))"
								rowGap="var(--github-cell-gap)"
								pr="1"
							>
								{WEEKDAY_LABELS.map((day) => (
									<Text
										key={day.id}
										fontSize="2xs"
										color="var(--color-text-tertiary)"
										lineHeight="1"
									>
										{day.label}
									</Text>
								))}
							</Box>
							<Box
								gridColumn="2 / -1"
								display="grid"
								gridTemplateColumns={`repeat(${visibleWeeks.length}, var(--github-cell-size))`}
								gridTemplateRows="repeat(7, var(--github-cell-size))"
								columnGap="var(--github-cell-gap)"
								rowGap="var(--github-cell-gap)"
							>
								{daysWithLayout.map(({ day, weekIndex }, index) => {
									const isMaxContributionDay = maxContributionDay?.date === day.date;
									const isHoveredWeek = hoveredWeekIndex === weekIndex;
									const isDimmedByHover =
										hoveredWeekIndex !== undefined && hoveredWeekIndex !== weekIndex;

									return (
										<Box
											key={day.date}
											as="button"
											className="github-contribution-day"
											aria-label={`${formatContributionDate(day.date)}: ${formatContributionCount(day.contributionCount)}`}
											onPointerEnter={(event) =>
												handleContributionEnter(day, weekIndex, event.currentTarget)
											}
											onFocus={(event) =>
												handleContributionEnter(day, weekIndex, event.currentTarget)
											}
											onPointerLeave={() => setHoveredContribution(null)}
											onBlur={() => setHoveredContribution(null)}
											w="var(--github-cell-size)"
											h="var(--github-cell-size)"
											borderRadius="3px"
											border="1px solid"
											borderColor={
												isMaxContributionDay
													? "var(--github-contribution-border-active)"
													: isHoveredWeek
														? "var(--github-contribution-border-active)"
														: "var(--github-contribution-border)"
											}
											bg={getContributionCellBackground(day, maxContributionCount)}
											opacity={isDimmedByHover ? 0.38 : 1}
											cursor="default"
											style={
												{
													gridColumn: `${weekIndex + 1}`,
													gridRow: `${getUtcWeekday(day.date) + 1}`,
													"--github-day-delay": `${Math.min(index * 8, 620)}ms`,
												} as CSSProperties
											}
											_hover={{
												transform: "scale(1.38)",
												zIndex: 2,
												outline: "2px solid",
												outlineColor: "var(--github-contribution-border-active)",
												outlineOffset: "1px",
											}}
											_focusVisible={{
												outline: "2px solid",
												outlineColor: "var(--github-contribution-border-active)",
												outlineOffset: "2px",
												transform: "scale(1.38)",
												zIndex: 2,
											}}
										/>
									);
								})}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			{hoveredContribution ? (
				<ContributionTooltip hoveredContribution={hoveredContribution} />
			) : null}
		</CalendarShell>
	);
}

export default GitHubContributionCalendar;
