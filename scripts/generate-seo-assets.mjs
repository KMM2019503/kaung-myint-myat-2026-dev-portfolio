import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FALLBACK_SITE_URL = "https://kaung-myint-myat-2026-dev-portfolio.vercel.app";

const normalizeSiteUrl = (value) => value.trim().replace(/\/+$/, "");

const resolveSiteUrl = () => {
	const siteUrlFromEnv = process.env.SITE_URL ?? process.env.VITE_SITE_URL;
	if (siteUrlFromEnv) {
		return normalizeSiteUrl(siteUrlFromEnv);
	}

	return FALLBACK_SITE_URL;
};

const createSitemapXml = (siteUrl, lastModified) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const createRobotsTxt = (siteUrl) => `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const run = async () => {
	const siteUrl = resolveSiteUrl();
	const lastModified = new Date().toISOString().slice(0, 10);
	const sitemap = createSitemapXml(siteUrl, lastModified);
	const robots = createRobotsTxt(siteUrl);

	const currentFilePath = fileURLToPath(import.meta.url);
	const scriptsDir = path.dirname(currentFilePath);
	const projectRoot = path.resolve(scriptsDir, "..");
	const publicDir = path.join(projectRoot, "public");

	await mkdir(publicDir, { recursive: true });
	await Promise.all([
		writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8"),
		writeFile(path.join(publicDir, "robots.txt"), robots, "utf8"),
	]);

	if (!process.env.SITE_URL && !process.env.VITE_SITE_URL) {
		console.warn(
			`[seo] SITE_URL and VITE_SITE_URL are not set. Using fallback URL: ${FALLBACK_SITE_URL}`,
		);
	}

	console.info(`[seo] Generated sitemap.xml and robots.txt with site URL: ${siteUrl}`);
};

run().catch((error) => {
	console.error("[seo] Failed to generate SEO assets.");
	console.error(error);
	process.exit(1);
});
