import { Box } from "@chakra-ui/react";
import type { CSSProperties } from "react";
import loadingPathSvgRaw from "@/assets/svg/LoadingPath.svg?raw";
import loadingPathFinalSvgUrl from "@/assets/svg/LoadingPathFinal.svg";

function extractSvgPathData(svgRaw: string) {
	return [...svgRaw.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((match) => match[1]);
}

function extractSvgViewBox(svgRaw: string) {
	const match = svgRaw.match(/viewBox="([^"]+)"/);
	return match ? match[1] : "0 0 1177 165";
}

const loadingPathData = extractSvgPathData(loadingPathSvgRaw);
const loadingViewBox = extractSvgViewBox(loadingPathSvgRaw);

export function LoadingLogo() {
	if (loadingPathData.length === 0) {
		return (
			<Box w={{ base: "240px", md: "560px" }} h="auto">
				<img
					src={loadingPathFinalSvgUrl}
					alt=""
					aria-hidden="true"
					className="loading-logo-appear"
					style={{ width: "100%", height: "auto", display: "block" }}
				/>
			</Box>
		);
	}

	return (
		<Box w={{ base: "240px", md: "560px" }} h="auto">
			<svg
				className="loading-logo-appear"
				viewBox={loadingViewBox}
				fill="none"
				style={{ width: "100%", height: "auto", color: "var(--color-primary-600)" }}
				aria-hidden="true"
			>
				{loadingPathData.map((pathData, index) => (
					<path
						key={pathData}
						className="loading-logo-path"
						d={pathData}
						pathLength={1}
						stroke="currentColor"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
						style={
							{
								"--loading-delay": `${index * 0.05}s`,
							} as CSSProperties
						}
					/>
				))}
			</svg>
		</Box>
	);
}

export default LoadingLogo;
