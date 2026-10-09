export const MODULE_ID = "FVTT_Pf2eAAVampire";

export const FORMER_ANCESTRY_SETTING = "enableFormerAncestrySync";
export const FORMER_ANCESTRY_SOURCE_SETTING = "formerAncestrySource";
export const HUNGER_METER_SETTING = "enableHungerMeter";
export const HUNGER_CONDITIONS_SETTING = "enableHungerConditions";
export const HUNGER_REST_INCREASE_SETTING = "increaseHungerOnRest";
export const HUNGER_DRAINED_THRESHOLD_SETTING = "hungerDrainedThreshold";
export const HUNGER_CONFUSED_THRESHOLD_SETTING = "hungerConfusedThreshold";
export const HUNGER_DEATH_THRESHOLD_SETTING = "hungerDeathThreshold";

export const DEFAULT_HUNGER = Object.freeze({
	current: 0,
	baseMax: 7,
	maxModifier: 0,
	baseThresholds: {
		drained: 3,
		confused: 5,
		death: 7,
	},
	thresholdModifiers: {
		drained: 0,
		confused: 0,
		death: 0,
	},
});
