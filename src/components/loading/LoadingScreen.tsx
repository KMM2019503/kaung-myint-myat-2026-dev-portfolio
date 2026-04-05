import { Box, VStack } from "@chakra-ui/react";
import LoadingLogo from "./LoadingLogo";

export function LoadingScreen() {
	return (
		<Box
			minH="var(--viewport-height-dynamic)"
			display="flex"
			alignItems="center"
			justifyContent="center"
			px={6}
			position="relative"
			zIndex="1"
		>
			<VStack gap={4}>
				<LoadingLogo />
			</VStack>
		</Box>
	);
}

export default LoadingScreen;
