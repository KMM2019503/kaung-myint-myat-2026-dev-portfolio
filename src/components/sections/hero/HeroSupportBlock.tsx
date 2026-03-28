import { Box, Flex, Text } from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import type { RefObject } from "react";

interface HeroSupportBlockProps {
	supportRef: RefObject<HTMLDivElement | null>;
}

export function HeroSupportBlock({ supportRef }: HeroSupportBlockProps) {
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
				mt={{ base: 5, md: 6 }}
				color="var(--color-text-secondary)"
				fontFamily='"Ubuntu", sans-serif'
			>
				<Flex align="center" gap="2" fontSize={{ base: "sm" }} fontWeight="500">
					<MapPin size={15} />
					<Text>Yangon, Myanmar | Remote-friendly collaborator</Text>
				</Flex>
			</Box>
		</Box>
	);
}
