import {
    DEFAULT_HUNGER,
    HUNGER_CONFUSED_THRESHOLD_SETTING,
    HUNGER_CONDITIONS_SETTING,
    HUNGER_DEATH_THRESHOLD_SETTING,
    HUNGER_DRAINED_THRESHOLD_SETTING,
    HUNGER_REST_INCREASE_SETTING,
} from "./accursed-meter-constants.js";
import { MODULE_ID } from "./module-constants.js";

export function registerSettings() {
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
