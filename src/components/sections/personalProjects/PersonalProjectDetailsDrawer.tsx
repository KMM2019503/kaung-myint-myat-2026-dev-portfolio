import { Badge, Box, Button, Drawer, Flex, Grid, Image, Portal, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { PersonalProject } from "./personalProjects.constants";

interface PersonalProjectDetailsDrawerProps {
	project: PersonalProject | null;
	isOpen: boolean;
	onClose: () => void;
}

export function PersonalProjectDetailsDrawer({
	project,
	isOpen,
	onClose,
}: PersonalProjectDetailsDrawerProps) {
	const drawerBodyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen || !drawerBodyRef.current) {
			return;
		}

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			return;
		}

		const ctx = gsap.context(() => {
			gsap.from("[data-personal-drawer-animate]", {
				y: 20,
				opacity: 0,
				stagger: 0.09,
				duration: 0.62,
				ease: "power3.out",
			});
		}, drawerBodyRef);

		return () => ctx.revert();
	}, [isOpen]);

	if (!project) {
		return null;
	}

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={(details) => {
				if (!details.open) {
					onClose();
				}
			}}
			placement="end"
			size="xl"
		>
			<Portal>
				<Drawer.Backdrop bg="rgba(8, 14, 24, 0.62)" backdropFilter="blur(5px)" />
				<Drawer.Positioner>
					<Drawer.Content
						bg="linear-gradient(180deg, color-mix(in srgb, var(--color-bg-primary) 95%, #f4f8fd), var(--color-bg-primary))"
						borderLeft="1px solid color-mix(in srgb, var(--surface-floating-border) 90%, transparent)"
						boxShadow="-26px 0 58px -40px rgba(16, 24, 40, 0.7)"
						padding={5}
					>
						<Drawer.Header
							display="flex"
							alignItems="flex-start"
							justifyContent="space-between"
							gap={3}
							pb={{ base: 3.5, md: 4 }}
							borderBottom="1px solid color-mix(in srgb, var(--surface-floating-border) 84%, transparent)"
						>
							<Box>
								<Badge
									px={2.5}
									py={1}
									borderRadius="full"
									fontSize="0.58rem"
									fontWeight="700"
									letterSpacing="0.14em"
									textTransform="uppercase"
									bg="color-mix(in srgb, var(--color-primary-500) 12%, transparent)"
									color="var(--color-text-accent-strong)"
									border="1px solid color-mix(in srgb, var(--surface-floating-border) 86%, transparent)"
									mb={2.5}
								>
									Case Study View
								</Badge>
								<Drawer.Title fontSize={{ base: "xl", md: "2xl" }} lineHeight={1.18}>
									{project.projectTitle}
								</Drawer.Title>
								<Drawer.Description mt={2} color="var(--color-text-secondary)">
									{project.oneLineSummary}
								</Drawer.Description>
							</Box>
							<Drawer.CloseTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									color="var(--color-text-secondary)"
									_hover={{ bg: "var(--color-bg-secondary)" }}
								>
									Close
								</Button>
							</Drawer.CloseTrigger>
						</Drawer.Header>

						<Drawer.Body ref={drawerBodyRef} pt={{ base: 5, md: 6 }} pb={{ base: 8, md: 9 }}>
							<Flex direction="column" gap={{ base: 5.5, md: 6.5 }}>
								<Box data-personal-drawer-animate>
									<Text
										fontSize={{ base: "2xs", md: "xs" }}
										fontWeight="700"
										letterSpacing="0.13em"
										textTransform="uppercase"
										color="var(--color-text-eyebrow)"
										mb={2}
									>
										Admin Dashboard Preview
									</Text>
									<Box position="relative" overflow="hidden" borderRadius="xl">
										<Image
											src={project.image.src}
											alt={project.image.alt}
											w="full"
											h={{ base: "220px", md: "450px" }}
											objectFit="cover"
										/>
										<Badge
											position="absolute"
											left={3}
											bottom={3}
											px={2.5}
											py={1}
											borderRadius="full"
											fontSize="0.58rem"
											fontWeight="700"
											letterSpacing="0.09em"
											textTransform="uppercase"
											bg="rgba(8, 18, 32, 0.68)"
											color="#eaf3fd"
											border="1px solid rgba(172, 200, 229, 0.5)"
										>
											{project.image.caption}
										</Badge>
									</Box>
								</Box>

								<Box data-personal-drawer-animate>
									<Text
										fontSize={{ base: "2xs", md: "xs" }}
										fontWeight="700"
										letterSpacing="0.13em"
										textTransform="uppercase"
										color="var(--color-text-eyebrow)"
										mb={2}
									>
										Project Overview
									</Text>
									<Text
										fontSize={{ base: "sm", md: "md" }}
										lineHeight={{ base: 1.75, md: 1.82 }}
										color="var(--color-text-secondary)"
									>
										{project.projectOverview}
									</Text>
								</Box>

								<Grid templateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }} gap={4.5}>
									<Box data-personal-drawer-animate>
										<Text
											fontSize={{ base: "2xs", md: "xs" }}
											fontWeight="700"
											letterSpacing="0.12em"
											textTransform="uppercase"
											color="var(--color-text-eyebrow)"
											mb={2.5}
										>
											My Contribution
										</Text>
										<Flex as="ul" direction="column" gap={2.5} pl={4}>
											{project.myContribution.map((item) => (
												<Box as="li" key={item}>
													<Text
														fontSize={{ base: "sm", md: "sm" }}
														lineHeight={{ base: 1.74, md: 1.78 }}
														color="var(--color-text-secondary)"
													>
														{item}
													</Text>
												</Box>
											))}
										</Flex>
									</Box>

									<Box
										data-personal-drawer-animate
										borderLeft={{
											base: "0px",
											md: "1px solid color-mix(in srgb, var(--surface-floating-border) 90%, transparent)",
										}}
										pl={{ base: 0, md: 5 }}
									>
										<Text
											fontSize={{ base: "2xs", md: "xs" }}
											fontWeight="700"
											letterSpacing="0.12em"
											textTransform="uppercase"
											color="var(--color-text-eyebrow)"
											mb={2.5}
										>
											Impact Highlights
										</Text>
										<Flex as="ul" direction="column" gap={2.5} pl={4}>
											{project.impactHighlights.map((item) => (
												<Box as="li" key={item}>
													<Text
														fontSize={{ base: "sm", md: "sm" }}
														lineHeight={{ base: 1.74, md: 1.78 }}
														color="var(--color-text-secondary)"
													>
														{item}
													</Text>
												</Box>
											))}
										</Flex>
									</Box>
								</Grid>

								<Box data-personal-drawer-animate>
									<Text
										fontSize={{ base: "2xs", md: "xs" }}
										fontWeight="700"
										letterSpacing="0.12em"
										textTransform="uppercase"
										color="var(--color-text-eyebrow)"
										mb={2}
									>
										Tech Stack
									</Text>
									<Flex wrap="wrap" gap={2}>
										{project.techStack.map((tech) => (
											<Badge
												key={tech}
												borderRadius="full"
												px={2.5}
												py={1}
												fontSize="0.64rem"
												fontWeight="700"
												letterSpacing="0.04em"
												bg="color-mix(in srgb, var(--color-primary-500) 12%, transparent)"
												color="var(--color-text-secondary)"
												border="1px solid color-mix(in srgb, var(--surface-floating-border) 88%, transparent)"
											>
												{tech}
											</Badge>
										))}
									</Flex>
								</Box>
							</Flex>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
}
