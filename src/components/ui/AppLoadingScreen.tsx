import { Box, Text } from "@chakra-ui/react";
import { useEffect, useId, useRef } from "react";
import AmbientBackground from "@/components/ui/AmbientBackground";

const SVG_PATH_DRAW_DURATION_MS = 420;
const SVG_PATH_DRAW_STAGGER_MS = 80;
const SVG_FILL_SWEEP_DURATION_MS = 420;
const SVG_FILL_START_OFFSET_MS = 80;
const SVG_VIEWBOX_WIDTH = 1177;
const SVG_VIEWBOX_HEIGHT = 165;
const LOADING_PATH_SEGMENTS = [
	"M2 163H35V115H98.5V98.5H114V17.5H98.5V2.5H2V163Z",
	"M162 2.5H131.5V33.5H162V2.5Z",
	"M162 51.5H131.5V163H162V51.5Z",
	"M275 33.5H196.5V51.5H179V67.5H260.5V82H196.5V98.5H179V147.5H196.5V163H243V147.5H260.5V163H291.5V51.5H275V33.5Z",
	"M420 33.5H308V67.5H372.5V82H356V98.5H339.5V115H323.5V130H308V163H420V130H372.5V115H388V98.5H404V82H420V33.5Z",
	"M532.5 3H436.5V33.5H468V163H501V33.5H532.5V3Z",
	"M581 3H548.5V163H581V67.5H629V163H661V51.5H645V33.5H598V51.5H581V3Z",
	"M693 51.5H677.5V146.5H693V163H773.5V146.5H790V132H708.5V114.5H790V51.5H773.5V33.5H693V51.5Z",
	"M902.5 2H806.5V163H902.5V146.5H917V19H902.5V2Z",
	"M951 51.5H935.5V146.5H951V163H1031V146.5H1047V132H967V114.5H1047V51.5H1031V33.5H951V51.5Z",
	"M1096 33.5H1063.5V114.5H1079V129.5H1096V146.5H1111V163H1128V146.5H1144V129.5H1158.5V114.5H1175V33.5H1144V98H1128V114.5H1111V98H1096V33.5Z",
];

export default function AppLoadingScreen() {
	const svgRef = useRef<SVGSVGElement>(null);
	const fillClipPathId = useId().replace(/:/g, "");

	useEffect(() => {
		const loadingSvg = svgRef.current;
		if (!loadingSvg) {
			return;
		}

		const svgPaths = Array.from(
			loadingSvg.querySelectorAll<SVGPathElement>(".app-loading-svg-path"),
		);
		const drawSequenceDurationMs =
			SVG_PATH_DRAW_DURATION_MS + (LOADING_PATH_SEGMENTS.length - 1) * SVG_PATH_DRAW_STAGGER_MS;
		const fillStartDelayMs = drawSequenceDurationMs + SVG_FILL_START_OFFSET_MS;

		loadingSvg.style.setProperty("--app-loader-path-duration-ms", `${SVG_PATH_DRAW_DURATION_MS}ms`);
		loadingSvg.style.setProperty("--app-loader-fill-delay-ms", `${fillStartDelayMs}ms`);
		loadingSvg.style.setProperty(
			"--app-loader-fill-duration-ms",
			`${SVG_FILL_SWEEP_DURATION_MS}ms`,
		);
		loadingSvg.style.setProperty("--app-loader-fill-target-width", `${SVG_VIEWBOX_WIDTH}px`);

		svgPaths.forEach((path, index) => {
			const pathIndex = Number.parseInt(path.dataset.loaderPathIndex ?? `${index}`, 10);
			const pathLength = path.getTotalLength();
			path.style.setProperty("--app-loader-path-length", `${pathLength}`);
			path.style.setProperty(
				"--app-loader-path-delay-ms",
				`${pathIndex * SVG_PATH_DRAW_STAGGER_MS}ms`,
			);
		});

		return () => {
			loadingSvg.style.removeProperty("--app-loader-path-duration-ms");
			loadingSvg.style.removeProperty("--app-loader-fill-delay-ms");
			loadingSvg.style.removeProperty("--app-loader-fill-duration-ms");
			loadingSvg.style.removeProperty("--app-loader-fill-target-width");
			svgPaths.forEach((path) => {
				path.style.removeProperty("--app-loader-path-length");
				path.style.removeProperty("--app-loader-path-delay-ms");
			});
		};
	}, []);

	return (
		<Box
			minH="var(--viewport-height-dynamic)"
			position="relative"
			display="flex"
			alignItems="center"
			justifyContent="center"
			overflow="hidden"
			px={6}
			background="var(--color-bg-primary)"
		>
			<AmbientBackground
				lightOpacityMultiplier={1.8}
				darkOpacityMultiplier={0.55}
				lightOrbOpacityMultipliers={[0.45, 0.55, 0.7, 0.35, 0.3]}
				darkOrbOpacityMultipliers={[0.3, 0.4, 0.8, 0.2, 0.5]}
			/>

			<Box
				position="relative"
				zIndex="1"
				w="full"
				maxW={{ base: "320px", sm: "480px", md: "640px", lg: "760px" }}
				display="flex"
				flexDirection="column"
				alignItems="center"
				gap={5}
			>
				<Box w="full">
					<svg
						ref={svgRef}
						className="app-loading-svg"
						width={SVG_VIEWBOX_WIDTH}
						height={SVG_VIEWBOX_HEIGHT}
						viewBox={`0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`}
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						aria-hidden="false"
						role="img"
					>
						<title>Loading portfolio</title>
						<defs>
							<clipPath id={fillClipPathId}>
								<rect
									className="app-loading-fill-clip-rect"
									x="0"
									y="0"
									width="0"
									height={SVG_VIEWBOX_HEIGHT}
								/>
							</clipPath>
						</defs>

						<g className="app-loading-fill-layer" clipPath={`url(#${fillClipPathId})`}>
							{LOADING_PATH_SEGMENTS.map((segment, index) => (
								<path
									// biome-ignore lint/suspicious/noArrayIndexKey: static ordered path list from a fixed SVG
									key={`fill-${index}`}
									className="app-loading-svg-fill-path"
									d={segment}
								/>
							))}
						</g>

						<g className="app-loading-stroke-layer">
							{LOADING_PATH_SEGMENTS.map((segment, index) => (
								<path
									// biome-ignore lint/suspicious/noArrayIndexKey: static ordered path list from a fixed SVG
									key={`stroke-${index}`}
									data-loader-path-index={index}
									className="app-loading-svg-path"
									d={segment}
									stroke="var(--app-loader-stroke, #2f9ddd)"
									strokeWidth="4"
									strokeLinejoin="round"
								/>
							))}
						</g>
					</svg>
				</Box>

				<Box
					role="img"
					aria-label="Loading progress indicator"
					w="full"
					display="flex"
					justifyContent="center"
				>
					<Box className="app-loading-progress-track">
						<Box className="app-loading-progress-fill" />
					</Box>
				</Box>

				<Text
					fontSize={{ base: "sm", md: "md" }}
					fontWeight="600"
					letterSpacing="0.35px"
					color="var(--color-text-secondary)"
					textAlign="center"
				>
					Loading hero assets...
				</Text>
			</Box>
		</Box>
	);
}
