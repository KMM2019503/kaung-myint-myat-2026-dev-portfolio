import { CONTACT_EMAIL } from "./contact.constants";

const CONTACT_SUBJECT_PREFIX = "Portfolio Inquiry";

export function createMailtoLink(formData: FormData) {
	const name = (formData.get("name")?.toString().trim() || "Anonymous").slice(0, 120);
	const senderEmail = (formData.get("email")?.toString().trim() || "Not provided").slice(0, 160);
	const company = (formData.get("company")?.toString().trim() || "Independent").slice(0, 160);
	const timeline = (formData.get("timeline")?.toString().trim() || "Flexible").slice(0, 120);
	const message = (
		formData.get("message")?.toString().trim() ||
		"Hi Kaung, I would like to discuss a frontend collaboration."
	).slice(0, 2000);

	const subject = `${CONTACT_SUBJECT_PREFIX}: ${company}`;
	const body = [
		`Name: ${name}`,
		`Email: ${senderEmail}`,
		`Company: ${company}`,
		`Timeline: ${timeline}`,
		"",
		"Project Brief:",
		message,
		"",
		"Sent from portfolio contact section.",
	].join("\n");

	return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
