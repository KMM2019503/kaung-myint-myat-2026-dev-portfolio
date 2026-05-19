import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
	SECTION_CONTAINER_PROPS,
	SECTION_SCROLL_MARGIN_TOP,
	SECTION_VERTICAL_PADDING,
} from "@/theme/sectionLayout";

interface ExperienceItem {
	id: string;
	period: string;
	role: string;
	organization: string;
	meta?: string;
	summary: string;
}

const experienceItems: ExperienceItem[] = [
	{
		id: "yojin-company",
		period: "February 2022 - June 2022",
		role: "Computer Technician",
		organization: "Yojin Myanmar Cement",
		meta: "Yangon, Myanmar - On-site",
		summary: "Worked as a computer technician supporting office systems.",
	},
	{
		id: "ncc-diploma",
		period: "2023 - 2024",
		role: "Taking NCC Lv 4 Diploma by UK",
		organization: "Academic Milestone",
		meta: "Programming Foundation",
		summary: "Built programming fundamentals through NCC Level 4 study.",
	},
	{
		id: "better-ltd",
		period: "October 2024 - Present",
		role: "Frontend Web Developer",
		organization: "Better Technology Ltd",
		meta: "Yangon, Myanmar - On-site",
		summary: "First professional role as a web developer with strong frontend product exposure.",
	},
];

export function Experience() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);
	const progressLineRef = useRef<HTMLDivElement>(null);
	const curveCanvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!sectionRef.current || !timelineRef.current) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const media = gsap.matchMedia();
		const ctx = gsap.context(() => {
			const introTargets = gsap.utils.toArray<HTMLElement>("[data-experience-intro]");
			const cards = gsap.utils.toArray<HTMLElement>("[data-experience-card]");
			const dots = gsap.utils.toArray<HTMLElement>("[data-experience-dot]");

			if (introTargets.length > 0) {
				gsap.from(introTargets, {
					y: 28,
					opacity: 0,
					duration: 0.76,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 78%",
					},
				});
			}

			const getProgressScrollTriggerConfig = () => {
				const firstCard = cards[0];
				const lastCard = cards[cards.length - 1];

				if (firstCard && lastCard) {
					return {
						trigger: firstCard,
						start: "top 86%",
						endTrigger: lastCard,
						end: "top 46%",
						scrub: true,
						invalidateOnRefresh: true,
					};
				}

				return {
					trigger: timelineRef.current,
					start: "top 72%",
					end: "bottom 28%",
					scrub: true,
					invalidateOnRefresh: true,
				};
			};

			media.add("(max-width: 61.99em)", () => {
				if (!progressLineRef.current) {
					return;
				}

				gsap.fromTo(
					progressLineRef.current,
					{ scaleY: 0, transformOrigin: "top center" },
					{
						scaleY: 1,
						ease: "none",
						scrollTrigger: getProgressScrollTriggerConfig(),
					},
				);
			});

			media.add("(min-width: 62em)", () => {
				if (!curveCanvasRef.current) {
					return;
				}

				const canvas = curveCanvasRef.current;
				const canvasContext = canvas.getContext("2d");
				if (!canvasContext) {
					return;
				}

				type Point = { x: number; y: number };
				type CubicSegment = [Point, Point, Point, Point];

				const drawState = { progress: 0 };
				let cssWidth = 0;
				let cssHeight = 0;

				const cubicPoint = (t: number, [p0, p1, p2, p3]: CubicSegment): Point => {
					const inverse = 1 - t;
					const inverseSquare = inverse * inverse;
					const tSquare = t * t;

					return {
						x:
							inverseSquare * inverse * p0.x +
							3 * inverseSquare * t * p1.x +
							3 * inverse * tSquare * p2.x +
							tSquare * t * p3.x,
						y:
							inverseSquare * inverse * p0.y +
							3 * inverseSquare * t * p1.y +
							3 * inverse * tSquare * p2.y +
							tSquare * t * p3.y,
					};
				};

				const clamp = (value: number, minimum: number, maximum: number) =>
					Math.min(maximum, Math.max(minimum, value));

				const getCurveSegments = (width: number, height: number): CubicSegment[] => {
					const centerX = width * 0.5;
					const amplitude = Math.min(width * 0.075, 56);
					const canvasRect = canvas.getBoundingClientRect();
					const dotCenters = dots
						.map((dot) => {
							const dotRect = dot.getBoundingClientRect();
							return {
								x: dotRect.left + dotRect.width / 2 - canvasRect.left,
								y: dotRect.top + dotRect.height / 2 - canvasRect.top,
							};
						})
						.sort((pointA, pointB) => pointA.y - pointB.y);

					const firstDot = dotCenters[0];
					const middleDot = dotCenters[Math.floor(dotCenters.length / 2)];
					const lastDot = dotCenters[dotCenters.length - 1];
					const hasUsableAnchors =
						Boolean(firstDot && middleDot && lastDot) && (lastDot?.y ?? 0) - (firstDot?.y ?? 0) > 8;

					const topPoint: Point = hasUsableAnchors
						? {
								x: clamp(firstDot?.x ?? centerX, 0, width),
								y: clamp(firstDot?.y ?? 0, 0, height),
							}
						: { x: centerX, y: height * 0.03 };
					const middlePoint: Point = hasUsableAnchors
						? {
								x: clamp(middleDot?.x ?? centerX, 0, width),
								y: clamp(middleDot?.y ?? 0, 0, height),
							}
						: { x: centerX, y: height * 0.5 };
					const bottomPoint: Point = hasUsableAnchors
						? {
								x: clamp(lastDot?.x ?? centerX, 0, width),
								y: clamp(lastDot?.y ?? 0, 0, height),
							}
						: { x: centerX, y: height * 0.97 };

					const upperSpan = Math.max(36, middlePoint.y - topPoint.y);
					const lowerSpan = Math.max(36, bottomPoint.y - middlePoint.y);

					return [
						[
							topPoint,
							{ x: centerX, y: topPoint.y + upperSpan * 0.34 },
							{ x: middlePoint.x + amplitude, y: topPoint.y + upperSpan * 0.66 },
							middlePoint,
						],
						[
							middlePoint,
							{ x: middlePoint.x - amplitude, y: middlePoint.y + lowerSpan * 0.34 },
							{ x: bottomPoint.x, y: middlePoint.y + lowerSpan * 0.66 },
							bottomPoint,
						],
					];
				};

				const estimateCurveLength = (segments: CubicSegment[]) => {
					let total = 0;
					const samples = 40;

					for (const segment of segments) {
						let previous = cubicPoint(0, segment);

						for (let index = 1; index <= samples; index += 1) {
							const current = cubicPoint(index / samples, segment);
							total += Math.hypot(current.x - previous.x, current.y - previous.y);
							previous = current;
						}
					}

					return total;
				};

				const traceCurve = (context2d: CanvasRenderingContext2D, segments: CubicSegment[]) => {
					const firstSegment = segments[0];
					if (!firstSegment) {
						return;
					}

					context2d.beginPath();
					context2d.moveTo(firstSegment[0].x, firstSegment[0].y);

					for (const [, controlA, controlB, end] of segments) {
						context2d.bezierCurveTo(controlA.x, controlA.y, controlB.x, controlB.y, end.x, end.y);
					}
				};

				const drawCurve = () => {
					if (cssWidth <= 0 || cssHeight <= 0) {
						return;
					}

					const styles = getComputedStyle(document.documentElement);
					const progressColor = styles.getPropertyValue("--color-primary-500").trim() || "#2f9ddd";
					const railColor =
						styles.getPropertyValue("--surface-floating-border").trim() ||
						"rgba(143, 167, 188, 0.45)";
					const segments = getCurveSegments(cssWidth, cssHeight);
					const currentPathLength = estimateCurveLength(segments);

					canvasContext.clearRect(0, 0, cssWidth, cssHeight);
					canvasContext.lineWidth = 3;
					canvasContext.lineCap = "round";
					canvasContext.lineJoin = "round";

					traceCurve(canvasContext, segments);
					canvasContext.setLineDash([]);
					canvasContext.strokeStyle = railColor;
					canvasContext.shadowColor = "transparent";
					canvasContext.stroke();

					traceCurve(canvasContext, segments);
					canvasContext.setLineDash([currentPathLength, currentPathLength]);
					canvasContext.lineDashOffset = currentPathLength * (1 - drawState.progress);
					canvasContext.strokeStyle = progressColor;
					canvasContext.shadowColor = progressColor;
					canvasContext.shadowBlur = 8;
					canvasContext.stroke();
					canvasContext.setLineDash([]);
					canvasContext.shadowBlur = 0;
				};

				const resizeCanvas = () => {
					const rect = canvas.getBoundingClientRect();
					const dpr = window.devicePixelRatio || 1;

					cssWidth = Math.max(1, rect.width);
					cssHeight = Math.max(1, rect.height);

					canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
					canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
					canvasContext.setTransform(dpr, 0, 0, dpr, 0, 0);
					drawCurve();
				};

				resizeCanvas();

				const tween = gsap.to(drawState, {
					progress: 1,
					ease: "none",
					onUpdate: drawCurve,
					scrollTrigger: getProgressScrollTriggerConfig(),
				});

				window.addEventListener("resize", resizeCanvas);

				return () => {
					window.removeEventListener("resize", resizeCanvas);
					tween.kill();
				};
			});

			for (const [index, card] of cards.entries()) {
				const side = card.dataset.side ?? "right";
				const xOffset = side === "left" ? -42 : 42;
				const revealStarts = ["top 90%", "top 86%", "top 82%"];
				const cardTrigger = {
					trigger: card,
					start: revealStarts[index] ?? "top 84%",
					toggleActions: "play none none reverse",
					invalidateOnRefresh: true,
				};

				gsap.from(card, {
					x: xOffset,
					y: 24,
					scale: 0.98,
					opacity: 0,
					duration: 0.72,
					ease: "power3.out",
					scrollTrigger: cardTrigger,
				});

				const linkedDot = dots[index];
				if (linkedDot) {
					gsap.from(linkedDot, {
						scale: 0,
						opacity: 0,
						duration: 0.44,
						ease: "back.out(2)",
						scrollTrigger: cardTrigger,
					});
				}
			}
		}, sectionRef);

		return () => {
			media.revert();
			ctx.revert();
		};
	}, []);

	return (
		<Box
			as="section"
			id="experience"
			ref={sectionRef}
			position="relative"
			zIndex={1}
			overflow="hidden"
			scrollMarginTop={SECTION_SCROLL_MARGIN_TOP}
			py={SECTION_VERTICAL_PADDING}
			minH="var(--viewport-height-dynamic)"
		>
			<Container {...SECTION_CONTAINER_PROPS} position="relative" zIndex={1}>
				<Flex direction="column" gap={{ base: 8, md: 10 }}>
					<Box
						maxW={{ base: "2xl", lg: "3xl" }}
						mx={{ base: "auto", lg: 0 }}
						mr={{ lg: "auto" }}
						textAlign="left"
					>
						<Text
							data-experience-intro="true"
							fontSize={{ base: "xs", md: "sm" }}
							fontWeight="700"
							letterSpacing="0.12em"
							textTransform="uppercase"
							color="var(--color-text-eyebrow)"
						>
							Experience
						</Text>
						<Heading
							data-experience-intro="true"
							as="h2"
							mt={{ base: 2, md: 3 }}
							fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
							lineHeight={{ base: "1.12", md: "1.06" }}
							letterSpacing="-0.03em"
						>
							Career Timeline
						</Heading>
						<Text
							data-experience-intro="true"
							mt={{ base: 3.5, md: 4.5 }}
							fontSize={{ base: "sm", md: "lg" }}
							lineHeight={{ base: "1.7", md: "1.6" }}
							color="var(--color-text-secondary)"
							maxW="58ch"
						>
							My professional journey from technical support into modern frontend engineering, with
							focus on real product delivery and long-term architecture growth.
						</Text>
					</Box>

					<Box
						ref={timelineRef}
						position="relative"
						pb={{ base: 1, md: 2 }}
						maxW={{ base: "full", lg: "980px" }}
						mx="auto"
						w="full"
					>
						<Box
							position="absolute"
							top="10px"
							bottom="10px"
							left="0"
							right="0"
							display={{ base: "none", lg: "block" }}
							pointerEvents="none"
						>
							<canvas
								ref={curveCanvasRef}
								style={{ width: "100%", height: "100%", display: "block" }}
							/>
						</Box>

						<Box
							position="absolute"
							top="10px"
							bottom="10px"
							left={{ base: "15px", lg: "50%" }}
							transform={{ lg: "translateX(-50%)" }}
							w={{ base: "2px", lg: "3px" }}
							borderRadius="full"
							bg="color-mix(in srgb, var(--surface-floating-border) 70%, transparent)"
							display={{ base: "block", lg: "none" }}
						/>
						<Box
							ref={progressLineRef}
							position="absolute"
							top="10px"
							bottom="10px"
							left={{ base: "15px", lg: "50%" }}
							transform={{ lg: "translateX(-50%)" }}
							w={{ base: "2px", lg: "3px" }}
							borderRadius="full"
							bg="linear-gradient(180deg, var(--color-primary-400), var(--color-primary-700))"
							boxShadow="0 0 18px color-mix(in srgb, var(--color-primary-500) 42%, transparent)"
							display={{ base: "block", lg: "none" }}
						/>

						<Flex direction="column" gap={{ base: 4, md: 5, lg: 6 }}>
							{experienceItems.map((item, index) => {
								const isLeft = index % 2 === 0;

								return (
									<Box key={item.id} position="relative" pl={{ base: 7, lg: 0 }}>
										<Box
											data-experience-dot="true"
											position="absolute"
											top={{ base: "24px", md: "28px" }}
											left={{ base: "15px", lg: "50%" }}
											transform="translate(-50%, -50%)"
											w={{ base: "11px", md: "12px" }}
											h={{ base: "11px", md: "12px" }}
											borderRadius="full"
											bg="var(--color-primary-500)"
											border="2px solid"
											borderColor="color-mix(in srgb, var(--surface-floating-solid) 88%, transparent)"
											boxShadow="0 0 0 6px color-mix(in srgb, var(--color-primary-500) 20%, transparent)"
											zIndex={2}
										/>

										<Flex justify={{ lg: isLeft ? "flex-start" : "flex-end" }}>
											<Box
												data-experience-card="true"
												data-side={isLeft ? "left" : "right"}
												w={{ base: "full", lg: "calc(50% - 2.25rem)" }}
												maxW={{ lg: "460px" }}
												borderRadius={{ base: "2xl", md: "3xl" }}
												p={{ base: 3.5, md: 4.5 }}
												border="1px solid"
												borderColor="color-mix(in srgb, var(--surface-floating-border) 84%, transparent)"
												bg="color-mix(in srgb, var(--surface-floating) 72%, transparent)"
												css={{
													backdropFilter: "blur(12px) saturate(140%)",
													boxShadow: "0 24px 56px -42px rgba(14, 26, 42, 0.48)",
												}}
											>
												<Box>
													<Box>
														<Text
															fontSize={{ base: "xs", md: "sm" }}
															fontWeight="700"
															letterSpacing="0.1em"
															textTransform="uppercase"
															color="var(--color-text-eyebrow)"
														>
															{item.period}
														</Text>
														<Heading
															as="h3"
															mt={{ base: 1, md: 1.5 }}
															fontSize={{ base: "lg", md: "xl" }}
														>
															{item.role}
														</Heading>
														<Text mt="1" color="var(--color-text-accent-strong)" fontWeight="600">
															{item.organization}
														</Text>
														{item.meta ? (
															<Text
																mt="0.75"
																fontSize={{ base: "xs", md: "sm" }}
																color="var(--color-text-tertiary)"
															>
																{item.meta}
															</Text>
														) : null}
													</Box>
												</Box>

												<Text
													mt={{ base: 3, md: 3.5 }}
													fontSize={{ base: "sm", md: "sm" }}
													lineHeight={{ base: "1.55", md: "1.6" }}
													color="var(--color-text-secondary)"
												>
													{item.summary}
												</Text>
											</Box>
										</Flex>
									</Box>
								);
							})}
						</Flex>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}

export default Experience;
