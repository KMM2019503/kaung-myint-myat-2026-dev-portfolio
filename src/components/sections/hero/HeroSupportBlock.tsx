import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { downloadCvHref } from "./Hero.constants";

interface HeroSupportBlockProps {
	supportRef: RefObject<HTMLDivElement | null>;
}

const linkedinHref = "https://www.linkedin.com/in/kaung-myint-myat-921273282/";
const githubHref = "https://github.com/KMM2019503";
const emailValue = "kaungmyintmyat2003@gmail.com";
const phoneValue = "09951703530";

export function HeroSupportBlock({ supportRef }: HeroSupportBlockProps) {
	const [copyNotice, setCopyNotice] = useState<string | null>(null);
	const noticeTimeoutRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (noticeTimeoutRef.current !== null) {
				window.clearTimeout(noticeTimeoutRef.current);
			}
		};
	}, []);

	const setNotice = (message: string) => {
		setCopyNotice(message);
		if (noticeTimeoutRef.current !== null) {
			window.clearTimeout(noticeTimeoutRef.current);
		}
		noticeTimeoutRef.current = window.setTimeout(() => {
			setCopyNotice(null);
			noticeTimeoutRef.current = null;
		}, 1800);
	};

	const copyToClipboard = async (value: string, label: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setNotice(`${label} copied`);
			return;
		} catch {
			const input = document.createElement("textarea");
			input.value = value;
			input.setAttribute("readonly", "true");
			input.style.position = "fixed";
			input.style.opacity = "0";
			document.body.appendChild(input);
			input.select();
			const copied = document.execCommand("copy");
			document.body.removeChild(input);
			setNotice(copied ? `${label} copied` : `Unable to copy ${label.toLowerCase()}`);
		}
	};

	return (
		<Box
			order={{ base: 3, xl: 3 }}
			ref={supportRef}
			w="full"
			maxW={{ base: "unset", lg: "360px", xl: "400px" }}
			justifySelf={{ lg: "start" }}
			pl={{ lg: 3, xl: 4 }}
		>
			<Text
				mt={{ base: 0, md: 0 }}
				fontFamily='"Ubuntu", sans-serif'
				fontSize={{ base: "xl", sm: "xl", md: "xl", xl: "2xl" }}
				fontWeight="500"
				letterSpacing="0.004em"
				lineHeight={{ base: "1.28", md: "1.24" }}
				background="var(--gradient-text-accent)"
				backgroundClip="text"
				color="transparent"
			>
				Building high-performance, user-centric digital products
			</Text>

			<Box
				mt={{ base: 4, md: 5 }}
				color="var(--color-text-secondary)"
				fontFamily='"Ubuntu", sans-serif'
			>
				<Flex align="center" gap="2" fontSize={{ base: "sm" }} fontWeight="500">
					<MapPin size={15} />
					<Text>Yangon, Myanmar</Text>
				</Flex>

				<Text mt={2} fontSize={{ base: "sm" }} fontWeight="500">
					Available for Remote-friendly collaborator
				</Text>
			</Box>

			<Flex mt={{ base: 4, md: 5 }} align="center" gap="2.5" wrap="wrap">
				<Link
					href={linkedinHref}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Open LinkedIn profile"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					w="38px"
					h="38px"
					borderRadius="full"
					border="1px solid"
					borderColor="var(--color-border)"
					bg="color-mix(in srgb, var(--color-bg-primary) 74%, transparent)"
					color="var(--color-text-primary)"
					_hover={{
						borderColor: "var(--color-primary-500)",
						color: "var(--color-text-accent-strong)",
						transform: "translateY(-1px)",
					}}
					transition="all 0.2s ease"
				>
					<Linkedin size={16} />
				</Link>

				<Link
					href={githubHref}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Open GitHub profile"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					w="38px"
					h="38px"
					borderRadius="full"
					border="1px solid"
					borderColor="var(--color-border)"
					bg="color-mix(in srgb, var(--color-bg-primary) 74%, transparent)"
					color="var(--color-text-primary)"
					_hover={{
						borderColor: "var(--color-primary-500)",
						color: "var(--color-text-accent-strong)",
						transform: "translateY(-1px)",
					}}
					transition="all 0.2s ease"
				>
					<Github size={16} />
				</Link>

				<Box
					as="button"
					onClick={() => void copyToClipboard(emailValue, "Email")}
					aria-label="Copy email address"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					w="38px"
					h="38px"
					borderRadius="full"
					border="1px solid"
					borderColor="var(--color-border)"
					bg="color-mix(in srgb, var(--color-bg-primary) 74%, transparent)"
					color="var(--color-text-primary)"
					cursor="pointer"
					_hover={{
						borderColor: "var(--color-primary-500)",
						color: "var(--color-text-accent-strong)",
						transform: "translateY(-1px)",
					}}
					transition="all 0.2s ease"
				>
					<Mail size={16} />
				</Box>

				<Box
					as="button"
					onClick={() => void copyToClipboard(phoneValue, "Phone number")}
					aria-label="Copy phone number"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					w="38px"
					h="38px"
					borderRadius="full"
					border="1px solid"
					borderColor="var(--color-border)"
					bg="color-mix(in srgb, var(--color-bg-primary) 74%, transparent)"
					color="var(--color-text-primary)"
					cursor="pointer"
					_hover={{
						borderColor: "var(--color-primary-500)",
						color: "var(--color-text-accent-strong)",
						transform: "translateY(-1px)",
					}}
					transition="all 0.2s ease"
				>
					<Phone size={16} />
				</Box>
			</Flex>

			{copyNotice ? (
				<Text
					mt="2"
					fontSize={{ base: "xs", md: "sm" }}
					fontWeight="600"
					color="var(--color-text-accent-strong)"
				>
					{copyNotice}
				</Text>
			) : null}

			<Flex
				mt={{ base: 5, md: 6 }}
				align="center"
				gap={{ base: 3, md: 4 }}
				wrap={{ base: "wrap", md: "nowrap" }}
			>
				<Link
					href={downloadCvHref}
					target="_blank"
					rel="noopener noreferrer"
					display="inline-flex"
					fontSize={{ base: "md", md: "lg" }}
					fontWeight="700"
					color="var(--color-text-primary)"
					textDecoration="none"
					letterSpacing="-0.01em"
					w="fit-content"
					whiteSpace="nowrap"
					_hover={{
						color: "var(--color-text-accent-strong)",
					}}
					transition="all 0.24s ease"
				>
					Download CV
				</Link>

				<Link
					href="#experience"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					px={{ base: 3.5, md: 4.5 }}
					py={{ base: 2.25, md: 2.75 }}
					borderRadius="full"
					fontSize={{ base: "sm", md: "md" }}
					fontWeight="700"
					color="var(--color-text-primary)"
					textDecoration="none"
					border="1px solid"
					borderColor="var(--color-border)"
					bg="color-mix(in srgb, var(--color-bg-primary) 72%, transparent)"
					whiteSpace="nowrap"
					_hover={{
						borderColor: "var(--color-primary-500)",
						color: "var(--color-text-accent-strong)",
						transform: "translateY(-1px)",
					}}
					transition="all 0.24s ease"
				>
					Explore About Me
				</Link>
			</Flex>
		</Box>
	);
}
