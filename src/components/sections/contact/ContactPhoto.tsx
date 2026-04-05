import { Box, Image } from "@chakra-ui/react";
import type { RefObject } from "react";
import contactWavingImage from "@/assets/images/contact_waving.webp";

interface ContactPhotoProps {
	photoRef: RefObject<HTMLDivElement | null>;
}

export function ContactPhoto({ photoRef }: ContactPhotoProps) {
	return (
		<Box
			ref={photoRef}
			data-contact-photo="true"
			alignSelf="center"
			position="relative"
			w={{ base: "152px", md: "174px", lg: "192px" }}
			h={{ base: "152px", md: "174px", lg: "192px" }}
			p="4px"
		>
			<Box w="full" h="full" overflow="hidden">
				<Image
					src={contactWavingImage}
					alt="Kaung Myint Myat waving"
					w="full"
					h="full"
					objectFit="cover"
				/>
			</Box>
		</Box>
	);
}
