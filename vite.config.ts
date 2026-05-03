import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import githubContributionsHandler from "./api/github-contributions";

const GITHUB_ENV_KEYS = ["GITHUB_TOKEN", "GITHUB_USERNAME"] as const;

function loadPrivateGithubEnv(mode: string) {
	const env = loadEnv(mode, process.cwd(), "");

	for (const key of GITHUB_ENV_KEYS) {
		if (env[key] && !process.env[key]) {
			process.env[key] = env[key];
		}
	}
}

function githubContributionsDevApiPlugin(): Plugin {
	return {
		name: "github-contributions-dev-api",
		configureServer(server) {
			server.middlewares.use("/api/github-contributions", async (request, response) => {
				await githubContributionsHandler(request, response);
			});
		},
	};
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	loadPrivateGithubEnv(mode);

	return {
		plugins: [react(), tailwindcss(), githubContributionsDevApiPlugin()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
