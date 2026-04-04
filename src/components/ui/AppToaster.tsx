import { createToaster, Portal, Stack, Toast, Toaster } from "@chakra-ui/react";

export const appToaster = createToaster({
	placement: "top-end",
	pauseOnPageIdle: true,
});

export function AppToaster() {
	return (
		<Portal>
			<Toaster toaster={appToaster}>
				{(toast) => (
					<Toast.Root maxW={{ base: "xs", md: "sm" }}>
						<Toast.Indicator />
						<Stack gap="0.5" flex="1" maxW="100%">
							{toast.title ? <Toast.Title>{toast.title}</Toast.Title> : null}
							{toast.description ? (
								<Toast.Description>{toast.description}</Toast.Description>
							) : null}
						</Stack>
						<Toast.CloseTrigger />
					</Toast.Root>
				)}
			</Toaster>
		</Portal>
	);
}

export default AppToaster;
