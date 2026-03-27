import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";
import { Home, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface NavLink {
	label: string;
	href: string;
	icon: LucideIcon;
}

const navLinks: NavLink[] = [{ label: "Home", href: "#home", icon: Home }];

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [activeSection, setActiveSection] = useState("#home");
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 16);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", handleScroll);
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
			top={{ base: "3", md: "6" }}
			left="50%"
			transform={`translateX(-50%) translateY(${isVisible ? "0" : "-20px"})`}
			zIndex="1000"
			opacity={isVisible ? 1 : 0}
			transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
			w="auto"
			pointerEvents="none"
		>
			<Flex
				align="center"
				gap={{ base: "1.5", md: "2" }}
				px={{ base: "2", md: "2.5" }}
				py={{ base: "2", md: "2.5" }}
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
								w={{ base: "38px", md: "40px" }}
								h={{ base: "38px", md: "40px" }}
								borderRadius="full"
								opacity={isVisible ? 1 : 0}
								transform={isVisible ? "translateY(0)" : "translateY(-4px)"}
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
								<Icon size={18} />
							</Link>
						);
					})}
				</Flex>

				<Box
					w="1px"
					h={{ base: "24px", md: "26px" }}
					bg="color-mix(in srgb, var(--surface-floating-border) 85%, transparent)"
				/>

				<Flex align="center" gap="2">
					<IconButton
						variant="ghost"
						onClick={toggleTheme}
						w={{ base: "38px", md: "40px" }}
						h={{ base: "38px", md: "40px" }}
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
						{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
					</IconButton>
				</Flex>
			</Flex>
		</Box>
	);
}

export default Navbar;
