import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { sectionAmbientBackground } from "@/theme/backgrounds";

interface OrbConfig {
	baseX: number;
	baseY: number;
	radius: number;
	speed: number;
	phase: number;
	driftX: number;
	driftY: number;
	scrollFactor: number;
	waveX: number;
	alpha: number;
	colorVar: string;
}

interface AmbientBackgroundProps {
	opacityMultiplier?: number;
	orbOpacityMultipliers?: number[];
	lightOpacityMultiplier?: number;
	darkOpacityMultiplier?: number;
	lightOrbOpacityMultipliers?: number[];
	darkOrbOpacityMultipliers?: number[];
}

const EMPTY_OPACITY_MULTIPLIERS: number[] = [];
const MOBILE_MAX_WIDTH_PX = 767;
const MOBILE_ORB_INDICES = new Set([1, 2, 3]); // top-right, center, bottom-left

const orbConfigs: OrbConfig[] = [
	{
		baseX: 0.14,
		baseY: 0.14,
		radius: 0.34,
		speed: 0.22,
		phase: 0.2,
		driftX: 0.025,
		driftY: 0.05,
		scrollFactor: 0.04,
		waveX: 0.016,
		alpha: 0.34,
		colorVar: "--color-primary-300",
	},
	{
		baseX: 0.86,
		baseY: 0.22,
		radius: 0.3,
		speed: 0.18,
		phase: 1.1,
		driftX: 0.02,
		driftY: 0.045,
		scrollFactor: 0.03,
		waveX: 0.014,
		alpha: 0.29,
		colorVar: "--color-primary-400",
	},
	{
		baseX: 0.54,
		baseY: 0.56,
		radius: 0.4,
		speed: 0.15,
		phase: 2.1,
		driftX: 0.018,
		driftY: 0.03,
		scrollFactor: 0.05,
		waveX: 0.012,
		alpha: 0.25,
		colorVar: "--color-primary-200",
	},
	{
		baseX: 0.22,
		baseY: 0.82,
		radius: 0.32,
		speed: 0.19,
		phase: 3.4,
		driftX: 0.02,
		driftY: 0.028,
		scrollFactor: 0.045,
		waveX: 0.01,
		alpha: 0.23,
		colorVar: "--color-primary-300",
	},
	{
		baseX: 0.9,
		baseY: 0.88,
		radius: 0.3,
		speed: 0.17,
		phase: 4.25,
		driftX: 0.022,
		driftY: 0.03,
		scrollFactor: 0.038,
		waveX: 0.012,
		alpha: 0.28,
		colorVar: "--color-primary-400",
	},
];

function hexToRgba(hexColor: string, alpha: number) {
	const fallback = `rgba(93, 187, 244, ${alpha})`;
	const hex = hexColor.trim().replace("#", "");

	if (!(hex.length === 3 || hex.length === 6)) {
		return fallback;
	}

	const normalizedHex =
		hex.length === 3 ? `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}` : hex;

	const parsed = Number.parseInt(normalizedHex, 16);
	if (Number.isNaN(parsed)) {
		return fallback;
	}

	const red = (parsed >> 16) & 255;
	const green = (parsed >> 8) & 255;
	const blue = parsed & 255;

	return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function clamp01(value: number) {
	return Math.min(1, Math.max(0, value));
}

export function AmbientBackground({
	opacityMultiplier = 1,
	orbOpacityMultipliers = EMPTY_OPACITY_MULTIPLIERS,
	lightOpacityMultiplier,
	darkOpacityMultiplier,
	lightOrbOpacityMultipliers,
	darkOrbOpacityMultipliers,
}: AmbientBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			canvas.style.display = "none";
			return;
		}

		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}

		let frameId = 0;
		let width = 0;
		let height = 0;
		let scrollY = window.scrollY;
		let isMobileViewport = window.innerWidth <= MOBILE_MAX_WIDTH_PX;

		const readColor = (token: string, fallback: string) => {
			const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
			return value || fallback;
		};

		const palette = {
			"--color-primary-200": readColor("--color-primary-200", "#bbe4ff"),
			"--color-primary-300": readColor("--color-primary-300", "#91d4ff"),
			"--color-primary-400": readColor("--color-primary-400", "#5dbbf4"),
		};

		const resizeCanvas = () => {
			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.getBoundingClientRect();
			isMobileViewport = window.innerWidth <= MOBILE_MAX_WIDTH_PX;

			width = Math.max(1, rect.width);
			height = Math.max(1, rect.height);

			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));

			context.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const drawFrame = (timeMs: number) => {
			const time = timeMs / 1000;
			context.clearRect(0, 0, width, height);
			const isDarkMode = document.documentElement.classList.contains("dark");
			const activeOpacityMultiplier = isDarkMode
				? (darkOpacityMultiplier ?? opacityMultiplier)
				: (lightOpacityMultiplier ?? opacityMultiplier);
			const activeOrbOpacityMultipliers = isDarkMode
				? (darkOrbOpacityMultipliers ?? orbOpacityMultipliers)
				: (lightOrbOpacityMultipliers ?? orbOpacityMultipliers);

			for (const [index, orb] of orbConfigs.entries()) {
				if (isMobileViewport && !MOBILE_ORB_INDICES.has(index)) {
					continue;
				}

				const wave = Math.sin(scrollY * 0.0022 + time * orb.speed + orb.phase) * width * orb.waveX;
				const x =
					width * orb.baseX + Math.sin(time * orb.speed + orb.phase) * width * orb.driftX + wave;
				const y =
					height * orb.baseY +
					Math.cos(time * (orb.speed * 1.2) + orb.phase) * height * orb.driftY +
					scrollY * orb.scrollFactor;
				const radius = Math.max(width, height) * orb.radius;
				const color =
					palette[orb.colorVar as keyof typeof palette] ?? palette["--color-primary-300"];
				const perOrbMultiplier = activeOrbOpacityMultipliers[index] ?? 1;
				const finalAlpha = clamp01(orb.alpha * activeOpacityMultiplier * perOrbMultiplier);
				const coreAlpha = Math.min(finalAlpha * 1.2, 0.58);
				const midAlpha = Math.min(finalAlpha * 0.85, 0.42);
				const outerAlpha = Math.min(finalAlpha * 0.35, 0.18);

				const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
				gradient.addColorStop(0, hexToRgba(color, coreAlpha));
				gradient.addColorStop(0.35, hexToRgba(color, midAlpha));
				gradient.addColorStop(0.75, hexToRgba(color, outerAlpha));
				gradient.addColorStop(1, hexToRgba(color, 0));

				context.fillStyle = gradient;
				context.beginPath();
				context.arc(x, y, radius, 0, Math.PI * 2);
				context.fill();

				context.strokeStyle = hexToRgba(color, Math.min(finalAlpha * 1.05, 0.34));
				context.lineWidth = Math.max(1.25, radius * 0.0032);
				context.beginPath();
				context.arc(x, y, radius * 0.74, 0, Math.PI * 2);
				context.stroke();

				context.fillStyle = hexToRgba(color, Math.min(finalAlpha * 1.45, 0.48));
				context.beginPath();
				context.arc(x, y, Math.max(4, radius * 0.028), 0, Math.PI * 2);
				context.fill();
			}

			frameId = window.requestAnimationFrame(drawFrame);
		};

		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);
		window.addEventListener("scroll", handleScroll, { passive: true });
		frameId = window.requestAnimationFrame(drawFrame);

		return () => {
			window.cancelAnimationFrame(frameId);
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [
		darkOpacityMultiplier,
		darkOrbOpacityMultipliers,
		lightOpacityMultiplier,
		lightOrbOpacityMultipliers,
		opacityMultiplier,
		orbOpacityMultipliers,
	]);

	return (
		<Box
			position="fixed"
			inset="0"
			zIndex={0}
			pointerEvents="none"
			overflow="hidden"
			aria-hidden="true"
		>
			<Box
				position="absolute"
				inset="0"
				css={{
					background: sectionAmbientBackground,
				}}
			/>
			<canvas
				ref={canvasRef}
				style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}
			/>
		</Box>
	);
}

export default AmbientBackground;
