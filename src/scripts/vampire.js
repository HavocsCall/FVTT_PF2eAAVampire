import { registerAncestryProfile } from "/modules/FVTT_Pf2eAALibrary/src/scripts/ancestry-registry.js";
import { registerSettings, getDefaultHungerThresholds } from "./accursed-meter-settings.js";
import { registerConditionHooks } from "./vampire-hunger-conditions.js";
import { registerRestHook } from "./vampire-hunger-rest.js";
import { MODULE_ID } from "./module-constants.js";

registerAncestryProfile({
    slug: "vampire",
    meter: {
        moduleId: MODULE_ID,
        flag: "hunger",
        label: "FVTT_PF2EAAVAMPIRE.METERS.HUNGER.LABEL",
        empty: "FVTT_PF2EAAVAMPIRE.METERS.HUNGER.EMPTY",
        defaultMax: 7,
        getDefaults: () => ({ baseMax: 7, baseThresholds: getDefaultHungerThresholds() }),
    },
});

Hooks.once("init", registerSettings);
registerConditionHooks();
registerRestHook();
