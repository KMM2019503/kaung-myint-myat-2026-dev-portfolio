import { Box, VStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SCROLL_IDLE_DELAY_MS = 5000;
const MIN_SCROLLABLE_SPACE_PX = 48;
const MIN_SCROLL_BELOW_THRESHOLD_PX = 72;

function canShowIndicator() {
	const viewportHeight = window.innerHeight;
	const pageHeight = document.documentElement.scrollHeight;
	const scrollBottom = window.scrollY + viewportHeight;
	const hasScrollableContent = pageHeight - viewportHeight > MIN_SCROLLABLE_SPACE_PX;
	const hasMoreContentBelow = pageHeight - scrollBottom > MIN_SCROLL_BELOW_THRESHOLD_PX;

	return hasScrollableContent && hasMoreContentBelow;
}

export function ScrollIdleIndicator() {
	const [isVisible, setIsVisible] = useState(false);
	const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const scrollRafRef = useRef<number | null>(null);

	useEffect(() => {
		const clearIdleTimeout = () => {
			if (idleTimeoutRef.current !== null) {
				clearTimeout(idleTimeoutRef.current);
				idleTimeoutRef.current = null;
			}
		};

		const scheduleReveal = () => {
			clearIdleTimeout();
			if (!canShowIndicator()) {
				setIsVisible(false);
				return;
			}

			idleTimeoutRef.current = setTimeout(() => {
				setIsVisible(canShowIndicator());
			}, SCROLL_IDLE_DELAY_MS);
		};

		const onScroll = () => {
			if (scrollRafRef.current !== null) {
				return;
			}

			scrollRafRef.current = window.requestAnimationFrame(() => {
				setIsVisible(false);
				scheduleReveal();
				scrollRafRef.current = null;
			});
		};

		const onResize = () => {
			setIsVisible(false);
			scheduleReveal();
		};

		scheduleReveal();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			if (scrollRafRef.current !== null) {
				window.cancelAnimationFrame(scrollRafRef.current);
			}
			clearIdleTimeout();
		};
	}, []);

	return (
		<Box
			position="fixed"
			left="50%"
			bottom={{ base: "16px", sm: "20px", md: "24px" }}
			transform={isVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(12px)"}
			opacity={isVisible ? 1 : 0}
			transition="opacity 0.28s ease, transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)"
			pointerEvents="none"
			zIndex="960"
		>
			<VStack
				gap="0.5"
				p={{ base: "2", md: "2.5" }}
				borderRadius="2xl"
				className="scroll-idle-indicator-float"
				css={{
					background: "color-mix(in srgb, var(--surface-floating-solid) 88%, transparent)",
					border: "1px solid color-mix(in srgb, var(--surface-floating-border) 68%, transparent)",
					boxShadow: "0 20px 38px -30px rgba(13, 23, 35, 0.8)",
					backdropFilter: "blur(12px) saturate(150%)",
				}}
			>
				<VStack gap="-3px" aria-hidden="true">
					<ChevronDown
						size={14}
						className="scroll-idle-indicator-arrow scroll-idle-indicator-arrow-first"
					/>
					<ChevronDown
						size={14}
						className="scroll-idle-indicator-arrow scroll-idle-indicator-arrow-second"
					/>
				</VStack>
			</VStack>
		</Box>
	);
}

export default ScrollIdleIndicator;
