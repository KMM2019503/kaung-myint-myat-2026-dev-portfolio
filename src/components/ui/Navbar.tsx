import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";
import { Briefcase, FolderOpen, Home, Mail, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface NavLink {
	label: string;
	href: string;
	icon: LucideIcon;
}

const navLinks: NavLink[] = [
	{ label: "Home", href: "#home", icon: Home },
	{ label: "Experience", href: "#experience", icon: Briefcase },
	{ label: "Projects", href: "#projects", icon: FolderOpen },
	{ label: "Contact", href: "#contact", icon: Mail },
];

const NAV_SCROLL_DELTA_THRESHOLD = 6;
const NAV_REVEAL_SCROLL_UP_DISTANCE = 180;

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isInitialVisible, setIsInitialVisible] = useState(false);
	const [isNavVisible, setIsNavVisible] = useState(true);
	const [activeSection, setActiveSection] = useState("#home");
	const navRef = useRef<HTMLDivElement>(null);
	const lastScrollYRef = useRef(0);
	const upwardScrollDistanceRef = useRef(0);
	const scrollRafRef = useRef<number | null>(null);
	const { theme, toggleTheme } = useTheme();

	const scrollToSection = (href: string) => {
		const sectionId = href.replace("#", "");
		const targetSection = document.getElementById(sectionId);
		if (!targetSection) {
			return;
		}

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const isDesktopNav = window.matchMedia("(min-width: 62em)").matches;
		const navHeight = navRef.current?.offsetHeight ?? 0;
		const navTopOffset = navRef.current
			? Number.parseFloat(window.getComputedStyle(navRef.current).top || "0")
			: 0;
		const scrollOffset = isDesktopNav ? 20 : navHeight + navTopOffset + 10;
		const targetY = targetSection.getBoundingClientRect().top + window.scrollY - scrollOffset;

		window.history.replaceState(null, "", href);
		window.scrollTo({
			top: Math.max(0, targetY),
			behavior: prefersReducedMotion ? "auto" : "smooth",
		});
	};

	useEffect(() => {
		const timer = setTimeout(() => setIsInitialVisible(true), 100);

		const updateNavState = () => {
			const currentScrollY = window.scrollY;
			const scrollDelta = currentScrollY - lastScrollYRef.current;
			const isNearTop = currentScrollY <= 28;

			setIsScrolled(currentScrollY > 16);

			if (isNearTop) {
				upwardScrollDistanceRef.current = 0;
				setIsNavVisible(true);
			} else if (scrollDelta > NAV_SCROLL_DELTA_THRESHOLD) {
				upwardScrollDistanceRef.current = 0;
				setIsNavVisible(false);
			} else if (scrollDelta < -NAV_SCROLL_DELTA_THRESHOLD) {
				upwardScrollDistanceRef.current += Math.abs(scrollDelta);

				if (upwardScrollDistanceRef.current >= NAV_REVEAL_SCROLL_UP_DISTANCE) {
					upwardScrollDistanceRef.current = 0;
					setIsNavVisible(true);
				}
			}

			lastScrollYRef.current = currentScrollY;
			scrollRafRef.current = null;
		};

		lastScrollYRef.current = window.scrollY;
		updateNavState();

		const handleScroll = () => {
			if (scrollRafRef.current !== null) {
				return;
			}

			scrollRafRef.current = window.requestAnimationFrame(updateNavState);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", handleScroll);
			if (scrollRafRef.current !== null) {
				window.cancelAnimationFrame(scrollRafRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
		const sections = sectionIds
			.map((sectionId) => document.getElementById(sectionId))
			.filter((section): section is HTMLElement => section instanceof HTMLElement);

		if (sections.length === 0) {
			return;
		}

		let rafId: number | null = null;

		const updateActiveSection = () => {
			const probeY = window.scrollY + window.innerHeight * 0.35;
			let nextActiveSection = `#${sections[0].id}`;

			for (const section of sections) {
				const sectionTop = section.getBoundingClientRect().top + window.scrollY;
				if (sectionTop <= probeY) {
					nextActiveSection = `#${section.id}`;
				} else {
					break;
				}
			}

			const viewportBottom = window.scrollY + window.innerHeight;
			const documentBottom = document.documentElement.scrollHeight;
			if (viewportBottom >= documentBottom - 2) {
				nextActiveSection = `#${sections[sections.length - 1]?.id ?? sections[0].id}`;
			}

			setActiveSection((previous) =>
				previous === nextActiveSection ? previous : nextActiveSection,
			);
			rafId = null;
		};

		const queueActiveSectionUpdate = () => {
			if (rafId !== null) {
				return;
			}

			rafId = window.requestAnimationFrame(updateActiveSection);
		};

		const onHashChange = () => {
			if (window.location.hash) {
				setActiveSection(window.location.hash);
				queueActiveSectionUpdate();
			}
		};

		queueActiveSectionUpdate();
		window.addEventListener("scroll", queueActiveSectionUpdate, { passive: true });
		window.addEventListener("resize", queueActiveSectionUpdate);
		window.addEventListener("hashchange", onHashChange);

		return () => {
			window.removeEventListener("scroll", queueActiveSectionUpdate);
			window.removeEventListener("resize", queueActiveSectionUpdate);
			window.removeEventListener("hashchange", onHashChange);
			if (rafId !== null) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, []);

	const navTransform =
		isInitialVisible && isNavVisible
			? {
					base: "translateX(-50%) translateY(0)",
					lg: "translateY(-50%) translateX(0)",
				}
			: {
					base: "translateX(-50%) translateY(-130%)",
					lg: "translateY(-50%) translateX(130%)",
				};

	return (
		<Box
			as="nav"
			ref={navRef}
			position="fixed"
			top={{ base: "2", sm: "3", md: "4", lg: "50%" }}
			left={{ base: "50%", lg: "auto" }}
			right={{ base: "auto", lg: "5" }}
			transform={navTransform}
			zIndex="1000"
			opacity={isInitialVisible && isNavVisible ? 1 : 0}
			transition="transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease"
			w="auto"
			pointerEvents="none"
		>
			<Flex
				align="center"
				direction={{ base: "row", lg: "column" }}
				gap={{ base: "1", sm: "1.5", md: "1.5", lg: "1.25" }}
				px={{ base: "1.5", sm: "2", md: "2", lg: "2" }}
				py={{ base: "1.5", sm: "1.75", md: "2", lg: "2.25" }}
				borderRadius={{ base: "999px", lg: "2xl" }}
				pointerEvents="auto"
				css={{
					background: isScrolled ? "var(--surface-floating-solid)" : "var(--surface-floating)",
					backdropFilter: "blur(24px) saturate(185%)",
					boxShadow: isScrolled
						? "0 22px 42px -28px rgba(16, 24, 40, 0.45)"
						: "0 14px 32px -24px rgba(16, 24, 40, 0.35)",
					border: "1px solid color-mix(in srgb, var(--surface-floating-border) 75%, transparent)",
				}}
			>
				<Flex align="center" gap="1" direction={{ base: "row", lg: "column" }}>
					{navLinks.map((link, index) => {
						const Icon = link.icon;
						const isActive = activeSection === link.href;

						return (
							<Link
								key={link.label}
								href={link.href}
								onClick={(event) => {
									event.preventDefault();
									setActiveSection(link.href);
									setIsNavVisible(true);
									scrollToSection(link.href);
								}}
								display="flex"
								alignItems="center"
								justifyContent="center"
								w={{ base: "34px", sm: "35px", md: "36px", lg: "38px" }}
								h={{ base: "34px", sm: "35px", md: "36px", lg: "38px" }}
								borderRadius="full"
								opacity={isInitialVisible ? 1 : 0}
								transform={isInitialVisible ? "translateY(0)" : "translateY(-4px)"}
								transition={`all 0.28s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.04}s`}
								bg={
									isActive
										? "color-mix(in srgb, var(--color-primary-500) 16%, transparent)"
										: "transparent"
								}
								color={isActive ? "var(--color-text-accent-strong)" : "var(--color-text-secondary)"}
								textDecoration="none"
								border="1px solid"
								borderColor={
									isActive
										? "color-mix(in srgb, var(--color-primary-500) 28%, transparent)"
										: "transparent"
								}
								aria-label={link.label}
								aria-current={isActive ? "page" : undefined}
								_hover={{
									bg: isActive
										? "color-mix(in srgb, var(--color-primary-500) 22%, transparent)"
										: "var(--color-bg-secondary)",
									color: "var(--color-text-accent)",
								}}
								_focusVisible={{
									outline: "none",
									boxShadow:
										"0 0 0 2px color-mix(in srgb, var(--color-primary-500) 36%, transparent)",
								}}
							>
								<Icon size={16} />
							</Link>
						);
					})}
				</Flex>

				<Box
					w={{ base: "1px", lg: "20px" }}
					h={{ base: "20px", sm: "21px", md: "22px", lg: "1px" }}
					bg="color-mix(in srgb, var(--surface-floating-border) 85%, transparent)"
				/>

				<Flex align="center" gap={{ base: "1.5", md: "1.75", lg: "2" }}>
					<IconButton
						variant="ghost"
						onClick={toggleTheme}
						w={{ base: "34px", sm: "35px", md: "36px", lg: "38px" }}
						h={{ base: "34px", sm: "35px", md: "36px", lg: "38px" }}
						borderRadius="full"
						border="1px solid transparent"
						color="var(--color-text-secondary)"
						transition="all 0.2s ease"
						_hover={{
							color: "var(--color-text-accent)",
							bg: "var(--color-bg-secondary)",
							borderColor: "color-mix(in srgb, var(--surface-floating-border) 90%, transparent)",
						}}
						_focusVisible={{
							outline: "none",
							boxShadow: "0 0 0 2px color-mix(in srgb, var(--color-primary-500) 36%, transparent)",
						}}
						aria-label="Toggle theme"
					>
						{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
					</IconButton>
				</Flex>
			</Flex>
		</Box>
	);
}

export default Navbar;
