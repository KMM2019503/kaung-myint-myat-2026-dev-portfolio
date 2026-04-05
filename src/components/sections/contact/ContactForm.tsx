import { Box, Button, chakra, Flex, Grid, Input, Text, Textarea } from "@chakra-ui/react";
import type { FormEvent } from "react";

interface ContactFormProps {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
	return (
		<chakra.form
			onSubmit={onSubmit}
			display="flex"
			flexDirection="column"
			gap={{ base: 4, md: 5 }}
			w="full"
			maxW={{ base: "full", lg: "560px" }}
			ml={{ lg: "auto" }}
			borderRadius={{ base: "xl", md: "2xl" }}
			p={{ base: 3.5, md: 4 }}
			border="1px solid"
			borderColor="var(--surface-floating-border)"
			bg="var(--surface-floating-solid)"
			boxShadow="var(--shadow-sm)"
		>
			<Box
				data-contact-form-row="true"
				pb={{ base: 2.5, md: 3 }}
				borderBottom="1px solid"
				borderColor="var(--surface-floating-border)"
			>
				<Text
					fontSize="xs"
					fontWeight="700"
					textTransform="uppercase"
					color="var(--color-text-eyebrow)"
				>
					Name
				</Text>
				<Input
					type="text"
					name="name"
					defaultValue="Ava Chen"
					mt={{ base: 1.5, md: 2 }}
					w="full"
					variant="subtle"
					bg="transparent"
					border="none"
					outline="none"
					p={0}
					fontSize={{ base: "md", md: "md" }}
					lineHeight="1.5"
					color="var(--color-text-primary)"
					_focusVisible={{ outline: "none", boxShadow: "none" }}
					_placeholder={{ color: "var(--color-text-tertiary)" }}
					required
				/>
			</Box>

			<Box
				data-contact-form-row="true"
				pb={{ base: 2.5, md: 3 }}
				borderBottom="1px solid"
				borderColor="var(--surface-floating-border)"
			>
				<Text
					fontSize="xs"
					fontWeight="700"
					textTransform="uppercase"
					color="var(--color-text-eyebrow)"
				>
					Work Email
				</Text>
				<Input
					type="email"
					name="email"
					defaultValue="ava.chen@northpeak.studio"
					mt={{ base: 1.5, md: 2 }}
					w="full"
					variant="subtle"
					bg="transparent"
					border="none"
					outline="none"
					p={0}
					fontSize={{ base: "md", md: "md" }}
					lineHeight="1.5"
					color="var(--color-text-primary)"
					_focusVisible={{ outline: "none", boxShadow: "none" }}
					required
				/>
			</Box>

			<Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={{ base: 4, md: 5 }}>
				<Box
					data-contact-form-row="true"
					pb={{ base: 2.5, md: 3 }}
					borderBottom="1px solid"
					borderColor="var(--surface-floating-border)"
				>
					<Text
						fontSize="xs"
						fontWeight="700"
						textTransform="uppercase"
						color="var(--color-text-eyebrow)"
					>
						Company
					</Text>
					<Input
						type="text"
						name="company"
						defaultValue="Northpeak Studio"
						mt={{ base: 1.5, md: 2 }}
						w="full"
						variant="subtle"
						bg="transparent"
						border="none"
						outline="none"
						p={0}
						fontSize={{ base: "sm", md: "md" }}
						lineHeight="1.5"
						color="var(--color-text-primary)"
						_focusVisible={{ outline: "none", boxShadow: "none" }}
					/>
				</Box>

				<Box
					data-contact-form-row="true"
					pb={{ base: 2.5, md: 3 }}
					borderBottom="1px solid"
					borderColor="var(--surface-floating-border)"
				>
					<Text
						fontSize="xs"
						fontWeight="700"
						textTransform="uppercase"
						color="var(--color-text-eyebrow)"
					>
						Target Timeline
					</Text>
					<Input
						type="text"
						name="timeline"
						defaultValue="Q3 2026"
						mt={{ base: 1.5, md: 2 }}
						w="full"
						variant="subtle"
						bg="transparent"
						border="none"
						outline="none"
						p={0}
						fontSize={{ base: "sm", md: "md" }}
						lineHeight="1.5"
						color="var(--color-text-primary)"
						_focusVisible={{ outline: "none", boxShadow: "none" }}
					/>
				</Box>
			</Grid>

			<Box
				data-contact-form-row="true"
				pb={{ base: 2.5, md: 3 }}
				borderBottom="1px solid"
				borderColor="var(--surface-floating-border)"
			>
				<Text
					fontSize="xs"
					fontWeight="700"
					textTransform="uppercase"
					color="var(--color-text-eyebrow)"
				>
					Content
				</Text>
				<Textarea
					name="message"
					mt={{ base: 1.5, md: 2 }}
					w="full"
					minH={{ base: "50px", md: "80px" }}
					resize="vertical"
					variant="subtle"
					bg="transparent"
					border="none"
					outline="none"
					p={0}
					fontSize={{ base: "sm", md: "md" }}
					lineHeight="1.7"
					color="var(--color-text-primary)"
					_focusVisible={{ outline: "none", boxShadow: "none" }}
					required
				/>
			</Box>

			<Flex
				data-contact-form-actions="true"
				justify="end"
				align={{ base: "flex-start", md: "center" }}
				direction={{ base: "column", md: "row" }}
				gap={{ base: 2.5, md: 3 }}
			>
				<Button
					type="submit"
					h="42px"
					px={{ base: 5, md: 6 }}
					borderRadius="full"
					bg="var(--color-primary-600)"
					color="var(--color-text-inverse)"
					fontSize={{ base: "sm", md: "md" }}
					fontWeight="700"
					letterSpacing="0.02em"
					_hover={{ bg: "var(--color-primary-700)" }}
					_focusVisible={{
						outline: "none",
						boxShadow: "0 0 0 2px color-mix(in srgb, var(--color-primary-500) 36%, transparent)",
					}}
				>
					Send Email Draft
				</Button>
			</Flex>
		</chakra.form>
	);
}
