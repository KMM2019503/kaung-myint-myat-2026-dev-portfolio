import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";
import { FolderOpen, Home, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface NavLink {
	label: string;
	href: string;
	icon: LucideIcon;
}

const navLinks: NavLink[] = [
	{ label: "Home", href: "#home", icon: Home },
	{ label: "Projects", href: "#projects", icon: FolderOpen },
];

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isInitialVisible, setIsInitialVisible] = useState(false);
	const [isNavVisible, setIsNavVisible] = useState(true);
	const [activeSection, setActiveSection] = useState("#home");
	const lastScrollYRef = useRef(0);
	const scrollRafRef = useRef<number | null>(null);
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		const timer = setTimeout(() => setIsInitialVisible(true), 100);

		const updateNavState = () => {
			const currentScrollY = window.scrollY;
			const scrollDelta = currentScrollY - lastScrollYRef.current;
			const isNearTop = currentScrollY <= 28;

			setIsScrolled(currentScrollY > 16);

			if (isNearTop) {
				setIsNavVisible(true);
			} else if (Math.abs(scrollDelta) > 6) {
				setIsNavVisible(scrollDelta < 0);
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

		const observer = new IntersectionObserver(
			(entries) => {
				const currentSection = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (currentSection?.target.id) {
					setActiveSection(`#${currentSection.target.id}`);
				}
			},
			{
				rootMargin: "-35% 0px -55% 0px",
				threshold: [0.2, 0.45, 0.65],
			},
		);

		sections.forEach((section) => {
			observer.observe(section);
		});

		const onHashChange = () => {
			if (window.location.hash) {
				setActiveSection(window.location.hash);
			}
		};

		onHashChange();
		window.addEventListener("hashchange", onHashChange);

		return () => {
			observer.disconnect();
			window.removeEventListener("hashchange", onHashChange);
		};
	}, []);

	return (
		<Box
			as="nav"
			position="fixed"
			top={{ base: "2", sm: "3", md: "4", lg: "5" }}
			left="50%"
			transform={`translateX(-50%) translateY(${isInitialVisible && isNavVisible ? "0" : "-130%"})`}
			zIndex="1000"
			opacity={isInitialVisible && isNavVisible ? 1 : 0}
			transition="transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease"
			w="auto"
			pointerEvents="none"
		>
			<Flex
				align="center"
				gap={{ base: "1", sm: "1.5", md: "1.5", lg: "2" }}
				px={{ base: "1.5", sm: "2", md: "2", lg: "2.25" }}
				py={{ base: "1.5", sm: "1.75", md: "2", lg: "2.25" }}
				borderRadius="999px"
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
				<Flex align="center" gap="1">
					{navLinks.map((link, index) => {
						const Icon = link.icon;
						const isActive = activeSection === link.href;

						return (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setActiveSection(link.href)}
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
					w="1px"
					h={{ base: "20px", sm: "21px", md: "22px", lg: "24px" }}
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
