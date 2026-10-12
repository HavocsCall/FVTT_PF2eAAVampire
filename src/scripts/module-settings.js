import {
	DEFAULT_HUNGER,
	FORMER_ANCESTRY_SETTING,
	FORMER_ANCESTRY_SOURCE_SETTING,
	HUNGER_CONFUSED_THRESHOLD_SETTING,
	HUNGER_CONDITIONS_SETTING,
	HUNGER_DEATH_THRESHOLD_SETTING,
	HUNGER_DRAINED_THRESHOLD_SETTING,
	HUNGER_METER_SETTING,
	HUNGER_REST_INCREASE_SETTING,
	MODULE_ID,
} from "./module-constants.js";
import { refreshFormerAncestryChoices } from "/modules/FVTT_Pf2eAALibrary/src/scripts/former-ancestry-choices.js";
import { reconcileFormerAncestryMode } from "/modules/FVTT_Pf2eAALibrary/src/scripts/former-ancestry-sync.js";

export function registerSettings() {
	game.settings.register(MODULE_ID, FORMER_ANCESTRY_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.FORMERANCESTRYMODE.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.FORMERANCESTRYMODE.HINT",
		scope: "world",
		config: true,
		type: Boolean,
		default: true,
		onChange: () => {
			if (!game.user?.isGM) return;
			void reconcileFormerAncestryMode("vampire");
		},
	});

	game.settings.register(MODULE_ID, FORMER_ANCESTRY_SOURCE_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.FORMERANCESTRYSOURCE.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.FORMERANCESTRYSOURCE.HINT",
		scope: "world",
		config: true,
		type: String,
		choices: {
			pf2e: "FVTT_PF2EAAVAMPIRE.SETTINGS.FORMERANCESTRYSOURCE.PF2E",
			all: "FVTT_PF2EAAVAMPIRE.SETTINGS.FORMERANCESTRYSOURCE.ALL",
		},
		default: "pf2e",
		onChange: () => void refreshFormerAncestryChoices("vampire"),
	});

	game.settings.register(MODULE_ID, HUNGER_METER_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERMETER.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERMETER.HINT",
		scope: "world",
		config: true,
		type: Boolean,
		default: true,
		onChange: rerenderOpenActorWindows,
	});

	game.settings.register(MODULE_ID, HUNGER_CONDITIONS_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERCONDITIONS.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERCONDITIONS.HINT",
		scope: "world",
		config: true,
		type: Boolean,
		default: true,
		onChange: () => {
			Hooks.callAll(`${MODULE_ID}.hungerConditionsChanged`);
		},
	});

	game.settings.register(MODULE_ID, HUNGER_REST_INCREASE_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERRESTINCREASE.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERRESTINCREASE.HINT",
		scope: "world",
		config: true,
		type: Boolean,
		default: true,
	});

	game.settings.register(MODULE_ID, HUNGER_DRAINED_THRESHOLD_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERTHRESHOLDS.DRAINED.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERTHRESHOLDS.DRAINED.HINT",
		scope: "world",
		config: true,
		type: Number,
		default: DEFAULT_HUNGER.baseThresholds.drained,
		onChange: onThresholdSettingChange,
	});

	game.settings.register(MODULE_ID, HUNGER_CONFUSED_THRESHOLD_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERTHRESHOLDS.CONFUSED.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERTHRESHOLDS.CONFUSED.HINT",
		scope: "world",
		config: true,
		type: Number,
		default: DEFAULT_HUNGER.baseThresholds.confused,
		onChange: onThresholdSettingChange,
	});

	game.settings.register(MODULE_ID, HUNGER_DEATH_THRESHOLD_SETTING, {
		name: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERTHRESHOLDS.DEATH.NAME",
		hint: "FVTT_PF2EAAVAMPIRE.SETTINGS.HUNGERTHRESHOLDS.DEATH.HINT",
		scope: "world",
		config: true,
		type: Number,
		default: DEFAULT_HUNGER.baseThresholds.death,
		onChange: onThresholdSettingChange,
	});
}

export function isFormerAncestrySyncEnabled() {
	return game.settings.get(MODULE_ID, FORMER_ANCESTRY_SETTING) === true;
}

export function getFormerAncestrySource() {
	return game.settings.get(MODULE_ID, FORMER_ANCESTRY_SOURCE_SETTING);
}

export function isHungerMeterEnabled() {
	return game.settings.get(MODULE_ID, HUNGER_METER_SETTING) === true;
}

export function isHungerConditionAutomationEnabled() {
	return game.settings.get(MODULE_ID, HUNGER_CONDITIONS_SETTING) === true;
}

export function isHungerRestIncreaseEnabled() {
	return game.settings.get(MODULE_ID, HUNGER_REST_INCREASE_SETTING) === true;
}

export function getDefaultHungerThresholds() {
	return {
		drained: getThresholdSetting(HUNGER_DRAINED_THRESHOLD_SETTING, DEFAULT_HUNGER.baseThresholds.drained),
		confused: getThresholdSetting(HUNGER_CONFUSED_THRESHOLD_SETTING, DEFAULT_HUNGER.baseThresholds.confused),
		death: getThresholdSetting(HUNGER_DEATH_THRESHOLD_SETTING, DEFAULT_HUNGER.baseThresholds.death),
	};
}

function onThresholdSettingChange() {
	rerenderOpenActorWindows();
	Hooks.callAll(`${MODULE_ID}.hungerThresholdsChanged`);
}

function rerenderOpenActorWindows() {
	for (const app of Object.values(ui.windows)) {
		if (app.document?.documentName === "Actor") app.render(true);
	}
}

function getThresholdSetting(setting, fallback) {
	const value = Number(game.settings.get(MODULE_ID, setting));
	return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : fallback;
}
