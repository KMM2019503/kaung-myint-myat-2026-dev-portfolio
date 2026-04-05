import { useEffect } from "react";
import {
	CONTACT_EMAIL,
	SITE_DESCRIPTION,
	SITE_IMAGE_PATH,
	SITE_KEYWORDS,
	SITE_LOCALE,
	SITE_NAME,
	SITE_TITLE,
	SOCIAL_PROFILES,
} from "./siteMetadata";

const SEO_SCRIPT_SELECTOR = 'script[data-seo-schema="person"]';
const CANONICAL_SELECTOR = 'link[rel="canonical"]';

const setMetaTag = (attribute: "name" | "property", attributeValue: string, content: string) => {
	let element = document.head.querySelector<HTMLMetaElement>(
		`meta[${attribute}="${attributeValue}"]`,
	);

	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, attributeValue);
		document.head.append(element);
	}

	element.setAttribute("content", content);
};

const setCanonicalLink = (href: string) => {
	let canonical = document.head.querySelector<HTMLLinkElement>(CANONICAL_SELECTOR);

	if (!canonical) {
		canonical = document.createElement("link");
		canonical.setAttribute("rel", "canonical");
		document.head.append(canonical);
	}

	canonical.setAttribute("href", href);
};

const setPersonStructuredData = (canonicalUrl: string, imageUrl: string) => {
	const personData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: SITE_NAME,
		jobTitle: "Frontend & Mobile Developer",
		email: `mailto:${CONTACT_EMAIL}`,
		url: canonicalUrl,
		image: imageUrl,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Yangon",
			addressCountry: "MM",
		},
		sameAs: SOCIAL_PROFILES,
		knowsAbout: [
			"React",
			"Vue.js",
			"React Native",
			"TypeScript",
			"Frontend Architecture",
			"Performance Optimization",
		],
	};

	let schemaScript = document.head.querySelector<HTMLScriptElement>(SEO_SCRIPT_SELECTOR);

	if (!schemaScript) {
		schemaScript = document.createElement("script");
		schemaScript.setAttribute("type", "application/ld+json");
		schemaScript.setAttribute("data-seo-schema", "person");
		document.head.append(schemaScript);
	}

	schemaScript.text = JSON.stringify(personData);
};

const getSiteUrl = () => {
	const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
	if (configuredSiteUrl) {
		return configuredSiteUrl.replace(/\/+$/, "");
	}

	return window.location.origin;
};

export function useSeoMetadata() {
	useEffect(() => {
		const siteUrl = getSiteUrl();
		const canonicalUrl = `${siteUrl}/`;
		const socialImageUrl = new URL(SITE_IMAGE_PATH, siteUrl).toString();

		document.title = SITE_TITLE;
		setCanonicalLink(canonicalUrl);

		setMetaTag("name", "description", SITE_DESCRIPTION);
		setMetaTag("name", "keywords", SITE_KEYWORDS.join(", "));
		setMetaTag("name", "author", SITE_NAME);
		setMetaTag("property", "og:title", SITE_TITLE);
		setMetaTag("property", "og:description", SITE_DESCRIPTION);
		setMetaTag("property", "og:type", "website");
		setMetaTag("property", "og:locale", SITE_LOCALE);
		setMetaTag("property", "og:site_name", `${SITE_NAME} Portfolio`);
		setMetaTag("property", "og:url", canonicalUrl);
		setMetaTag("property", "og:image", socialImageUrl);
		setMetaTag("property", "og:image:alt", `Portrait of ${SITE_NAME}`);
		setMetaTag("name", "twitter:card", "summary_large_image");
		setMetaTag("name", "twitter:title", SITE_TITLE);
		setMetaTag("name", "twitter:description", SITE_DESCRIPTION);
		setMetaTag("name", "twitter:image", socialImageUrl);

		setPersonStructuredData(canonicalUrl, socialImageUrl);
	}, []);
}
