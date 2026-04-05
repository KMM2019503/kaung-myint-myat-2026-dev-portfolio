import { useEffect, useState } from "react";
import heroImage from "@/assets/images/hero.webp";
import iceBallImage from "@/assets/images/ice_ball.webp";
import lavaBallImage from "@/assets/images/lava_ball.webp";
import spaceBallImage from "@/assets/images/space_ball.webp";

const MIN_LOADING_DELAY_MS = 2000;
const heroAssetSources = [heroImage, iceBallImage, lavaBallImage, spaceBallImage];

function wait(ms: number) {
	return new Promise<void>((resolve) => {
		window.setTimeout(resolve, ms);
	});
}

function preloadImage(src: string) {
	return new Promise<void>((resolve) => {
		const image = new window.Image();
		let settled = false;

		const finish = () => {
			if (settled) {
				return;
			}
			settled = true;
			resolve();
		};

		image.onload = finish;
		image.onerror = finish;
		image.decoding = "async";
		image.src = src;

		if (image.complete) {
			finish();
		}
	});
}

export function useInitialLoading() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		const loadInitialView = async () => {
			await Promise.all([
				wait(MIN_LOADING_DELAY_MS),
				Promise.all(heroAssetSources.map((source) => preloadImage(source))),
			]);

			if (!cancelled) {
				setIsLoading(false);
			}
		};

		void loadInitialView();

		return () => {
			cancelled = true;
		};
	}, []);

	return isLoading;
}
