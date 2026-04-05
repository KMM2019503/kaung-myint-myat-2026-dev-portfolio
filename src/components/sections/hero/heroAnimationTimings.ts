export const HERO_ART_ENTER_DURATION_S = 0.95;
export const HERO_HEADING_ENTER_DURATION_S = 0.82;
export const HERO_HEADING_ENTER_STAGGER_S = 0.12;
export const HERO_SUPPORT_ENTER_DURATION_S = 0.78;
export const HERO_SUPPORT_ENTER_STAGGER_S = 0.1;
export const HERO_SUPPORT_OVERLAP_WITH_HEADING_S = 0.5;

// Keep these counts in sync with direct children under `headingRef` and `supportRef`.
export const HERO_HEADING_ENTER_ITEM_COUNT = 6;
export const HERO_SUPPORT_ENTER_ITEM_COUNT = 4;

const headingEnterTotalDurationS =
	HERO_HEADING_ENTER_DURATION_S +
	HERO_HEADING_ENTER_STAGGER_S * (HERO_HEADING_ENTER_ITEM_COUNT - 1);
const supportEnterTotalDurationS =
	HERO_SUPPORT_ENTER_DURATION_S +
	HERO_SUPPORT_ENTER_STAGGER_S * (HERO_SUPPORT_ENTER_ITEM_COUNT - 1);

const headingStartS = HERO_ART_ENTER_DURATION_S;
const headingEndS = headingStartS + headingEnterTotalDurationS;
const supportStartS = headingEndS - HERO_SUPPORT_OVERLAP_WITH_HEADING_S;
const supportEndS = supportStartS + supportEnterTotalDurationS;

export const HERO_PRIMARY_APPEAR_DURATION_MS = Math.round(
	Math.max(headingEndS, supportEndS) * 1000 - 500,
);
