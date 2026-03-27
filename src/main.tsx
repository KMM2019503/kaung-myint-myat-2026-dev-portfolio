import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { system } from "./theme/index.ts";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist in index.html
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChakraProvider value={system}>
			<App />
		</ChakraProvider>
	</StrictMode>,
);
