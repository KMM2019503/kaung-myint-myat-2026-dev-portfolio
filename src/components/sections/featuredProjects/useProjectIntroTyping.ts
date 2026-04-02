import { useEffect, useRef, useState } from "react";

interface UseProjectIntroTypingArgs {
	shouldStartTyping: boolean;
	lines: readonly string[];
}

export function useProjectIntroTyping({ shouldStartTyping, lines }: UseProjectIntroTypingArgs) {
	const hasStartedTypingRef = useRef(false);
	const [typedCodeLines, setTypedCodeLines] = useState<string[]>(() => lines.map(() => ""));
	const [activeTypingLine, setActiveTypingLine] = useState<number | null>(null);

	useEffect(() => {
		if (!shouldStartTyping || hasStartedTypingRef.current) {
			return;
		}

		hasStartedTypingRef.current = true;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setTypedCodeLines([...lines]);
			setActiveTypingLine(null);
			return;
		}

		setTypedCodeLines(lines.map(() => ""));
		setActiveTypingLine(0);

		let lineIndex = 0;
		let charIndex = 0;
		let timeoutId: number | undefined;

		const startDelay = 360;
		const charDelay = 24;
		const lineDelay = 140;

		const typeNext = () => {
			if (lineIndex >= lines.length) {
				setActiveTypingLine(null);
				return;
			}

			setActiveTypingLine(lineIndex);
			const currentLine = lines[lineIndex];

			if (charIndex < currentLine.length) {
				const nextCharIndex = charIndex + 1;
				setTypedCodeLines((previous) => {
					const next = [...previous];
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
			if (timeoutId !== undefined) {
				window.clearTimeout(timeoutId);
			}
		};
	}, [lines, shouldStartTyping]);

	return {
		typedCodeLines,
		activeTypingLine,
	};
}
