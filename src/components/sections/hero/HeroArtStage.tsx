import { Box, Image } from "@chakra-ui/react";
import type { RefObject } from "react";
import codingLogo from "@/assets/images/hero.webp";
import iceBallImage from "@/assets/images/ice_ball.webp";
import lavaBallImage from "@/assets/images/lava_ball.webp";
import spaceBallImage from "@/assets/images/space_ball.webp";

interface HeroArtStageProps {
	artRef: RefObject<HTMLDivElement | null>;
	codingLogoRef: RefObject<HTMLDivElement | null>;
}

interface OrbitChipObject {
	id: string;
	angle: number;
	duration: number;
	type: "chip";
	label: string;
	orbitInset: {
		base: string;
		md: string;
		xl: string;
	};
	chipWidth: {
		base: string;
		md: string;
		xl: string;
	};
	chipHeight: {
		base: string;
		md: string;
		xl: string;
	};
	glowWidth: {
		base: string;
		md: string;
		xl: string;
	};
	glowHeight: {
		base: string;
		md: string;
		xl: string;
	};
}

interface OrbitBallObject {
	id: string;
	angle: number;
	duration: number;
	type: "ball";
	orbitInset: {
		base: string;
		md: string;
		xl: string;
	};
	image: string;
	alt: string;
	size: {
		base: string;
		md: string;
		xl: string;
	};
	glowWidth: {
		base: string;
		md: string;
		xl: string;
	};
	glowHeight: {
		base: string;
		md: string;
		xl: string;
	};
}

type OrbitObject = OrbitChipObject | OrbitBallObject;

const orbitingObjects: OrbitObject[] = [
	{
		id: "scalable-architecture",
		angle: 6,
		duration: 22,
		type: "chip",
		label: "Scalable Architecture",
		orbitInset: { base: "8px", md: "12px", xl: "14px" },
		chipWidth: { base: "150px", md: "172px", xl: "186px" },
		chipHeight: { base: "56px", md: "62px", xl: "66px" },
		glowWidth: { base: "120px", md: "140px", xl: "156px" },
		glowHeight: { base: "24px", md: "28px", xl: "30px" },
	},
	{
		id: "ball-ice",
		angle: 74,
		duration: 22,
		type: "ball",
		orbitInset: { base: "8px", md: "12px", xl: "14px" },
		image: iceBallImage,
		alt: "Orbiting ice ball",
		size: { base: "28px", md: "32px", xl: "36px" },
		glowWidth: { base: "48px", md: "56px", xl: "62px" },
		glowHeight: { base: "12px", md: "14px", xl: "16px" },
	},
	{
		id: "chip-product-focused",
		angle: 146,
		duration: 22,
		type: "chip",
		label: "Product-focused",
		orbitInset: { base: "8px", md: "12px", xl: "14px" },
		chipWidth: { base: "188px", md: "214px", xl: "232px" },
		chipHeight: { base: "58px", md: "64px", xl: "68px" },
		glowWidth: { base: "146px", md: "170px", xl: "186px" },
		glowHeight: { base: "26px", md: "30px", xl: "32px" },
	},
	{
		id: "ball-lava",
		angle: 222,
		duration: 22,
		type: "ball",
		orbitInset: { base: "8px", md: "12px", xl: "14px" },
		image: lavaBallImage,
		alt: "Orbiting lava ball",
		size: { base: "30px", md: "34px", xl: "38px" },
		glowWidth: { base: "50px", md: "58px", xl: "64px" },
		glowHeight: { base: "12px", md: "14px", xl: "16px" },
	},
	{
		id: "ball-space",
		angle: 294,
		duration: 22,
		type: "ball",
		orbitInset: { base: "8px", md: "12px", xl: "14px" },
		image: spaceBallImage,
		alt: "Orbiting space ball",
		size: { base: "28px", md: "32px", xl: "36px" },
		glowWidth: { base: "48px", md: "56px", xl: "62px" },
		glowHeight: { base: "12px", md: "14px", xl: "16px" },
	},
];

function OrbitChip({
	id,
	label,
	width,
	height,
}: {
	id: string;
	label: string;
	width: OrbitChipObject["chipWidth"];
	height: OrbitChipObject["chipHeight"];
}) {
	const textPathId = `orbit-chip-text-${id}`;

	return (
		<Box
			w={width}
			h={height}
			css={{
				filter:
					"drop-shadow(0 14px 24px color-mix(in srgb, var(--color-primary-900) 45%, transparent))",
			}}
		>
			<svg viewBox="0 0 240 84" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<title>{`${label} orbit chip`}</title>
				<defs>
					<path id={textPathId} d="M 28 56 Q 120 22 212 56" />
				</defs>

				<path
					d="M 24 58 Q 120 16 216 58"
					stroke="color-mix(in srgb, var(--color-primary-300) 42%, transparent)"
					strokeWidth="42"
					strokeLinecap="round"
					fill="none"
				/>
				<path
					d="M 24 58 Q 120 16 216 58"
					stroke="color-mix(in srgb, var(--color-primary-100) 16%, rgba(18, 35, 62, 0.9))"
					strokeWidth="38"
					strokeLinecap="round"
					fill="none"
				/>

				<text
					fill="color-mix(in srgb, var(--color-primary-100) 92%, white)"
					fontFamily="Ubuntu, sans-serif"
					fontSize="15"
					fontWeight="700"
					letterSpacing="0.35"
				>
					<textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
						{label}
					</textPath>
				</text>
			</svg>
		</Box>
	);
}

export function HeroArtStage({ artRef, codingLogoRef }: HeroArtStageProps) {
	return (
		<Box
			order={{ base: 1, xl: 2 }}
			ref={artRef}
			position="relative"
			w="full"
			maxW={{ lg: "420px", xl: "500px" }}
			justifySelf="center"
			top={{ lg: "-50px", xl: "-80px" }}
			minH={{ base: "280px", sm: "340px", md: "420px", xl: "520px" }}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%, -50%)"
				w={{ base: "250px", sm: "320px", md: "380px", xl: "430px" }}
				h={{ base: "250px", sm: "320px", md: "380px", xl: "430px" }}
				borderRadius="full"
				bg="radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--color-primary-50) 88%, white) 0%, color-mix(in srgb, var(--color-primary-200) 72%, var(--color-primary-50)) 24%, color-mix(in srgb, var(--color-primary-400) 42%, transparent) 58%, color-mix(in srgb, var(--color-primary-700) 18%, transparent) 100%)"
				css={{
					boxShadow:
						"0 42px 80px -54px rgba(15, 23, 42, 0.45), inset 0 28px 56px -32px rgba(255, 255, 255, 0.88)",
				}}
			/>
			<Box
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%, -50%)"
				w={{ base: "282px", sm: "352px", md: "418px", xl: "470px" }}
				h={{ base: "282px", sm: "352px", md: "418px", xl: "470px" }}
				borderRadius="full"
				border="1px solid"
				borderColor="color-mix(in srgb, var(--color-primary-300) 36%, transparent)"
				opacity="0.65"
			/>
			<Box
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%, -50%)"
				w={{ base: "298px", sm: "372px", md: "442px", xl: "498px" }}
				h={{ base: "298px", sm: "372px", md: "442px", xl: "498px" }}
				pointerEvents="none"
				zIndex="3"
			>
				{orbitingObjects.map((object) => (
					<Box
						key={object.id}
						data-hero-orbit-track
						data-orbit-duration={object.duration}
						position="absolute"
						inset="0"
						transform={`rotate(${object.angle}deg)`}
					>
						<Box
							position="absolute"
							left="50%"
							top={object.orbitInset}
							transform="translate(-50%, -50%)"
							w={object.glowWidth}
							h={object.glowHeight}
							opacity="0.92"
							css={{
								filter:
									"drop-shadow(0 0 10px color-mix(in srgb, var(--color-primary-300) 78%, transparent))",
							}}
						/>

						<Box
							position="absolute"
							left="50%"
							top={object.orbitInset}
							transform="translate(-50%, -50%)"
						>
							{object.type === "chip" ? (
								<OrbitChip
									id={object.id}
									label={object.label}
									width={object.chipWidth}
									height={object.chipHeight}
								/>
							) : (
								<Box
									w={object.size}
									h={object.size}
									filter="drop-shadow(0 12px 20px rgba(15, 23, 42, 0.28))"
								>
									<Image
										src={object.image}
										alt={object.alt}
										w="full"
										h="full"
										objectFit="contain"
									/>
								</Box>
							)}
						</Box>
					</Box>
				))}
			</Box>
			<Box
				ref={codingLogoRef}
				position="relative"
				zIndex="2"
				w={{ base: "205px", sm: "240px", md: "280px", xl: "310px" }}
				h={{ base: "205px", sm: "240px", md: "280px", xl: "310px" }}
				mt={{ base: "12px", md: "20px", xl: "28px" }}
			>
				<Image
					src={codingLogo}
					alt="Coding astronaut illustration"
					w="full"
					h="full"
					objectFit="contain"
					filter="drop-shadow(0 24px 36px rgba(15, 23, 42, 0.22))"
				/>
			</Box>
		</Box>
	);
}
