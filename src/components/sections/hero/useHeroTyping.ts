import { useEffect, useState } from "react";
import { codeLines } from "./Hero.constants";

export function useHeroTyping() {
	const [typedCodeLines, setTypedCodeLines] = useState<string[]>(() => codeLines.map(() => ""));
	const [activeTypingLine, setActiveTypingLine] = useState<number | null>(0);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setTypedCodeLines(codeLines);
			setActiveTypingLine(null);
			return;
		}

		let lineIndex = 0;
		let charIndex = 0;
		let timeoutId: number | undefined;

		const startDelay = 380;
		const charDelay = 26;
		const lineDelay = 160;

		const typeNext = () => {
			if (lineIndex >= codeLines.length) {
				setActiveTypingLine(null);
				return;
			}

			setActiveTypingLine(lineIndex);
			const currentLine = codeLines[lineIndex];

			if (charIndex < currentLine.length) {
				const nextCharIndex = charIndex + 1;
				setTypedCodeLines((prev) => {
					const next = [...prev];
					next[lineIndex] = currentLine.slice(0, nextCharIndex);
					return next;
				});
				charIndex = nextCharIndex;
				timeoutId = window.setTimeout(typeNext, charDelay);
				return;
			}

			lineIndex += 1;
			charIndex = 0;
			timeoutId = window.setTimeout(typeNext, lineDelay);
		};

		timeoutId = window.setTimeout(typeNext, startDelay);
		return () => {
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}
		};
	}, []);

	return {
		activeTypingLine,
		typedCodeLines,
	};
}
