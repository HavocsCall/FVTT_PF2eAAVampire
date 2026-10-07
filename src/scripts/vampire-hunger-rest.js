import { isRegisteredAncestry } from "/modules/FVTT_Pf2eAALibrary/src/scripts/ancestry-registry.js";
import { adjustMeterCurrent } from "/modules/FVTT_Pf2eAALibrary/src/scripts/meter-state.js";
import {
	getDefaultHungerThresholds,
	isHungerConditionAutomationEnabled,
	isHungerMeterEnabled,
	isHungerRestIncreaseEnabled,
} from "./module-settings.js";
import { MODULE_ID } from "./module-constants.js";

const HUNGER_METER = {
	moduleId: MODULE_ID,
	flag: "hunger",
	defaultMax: 7,
	getDefaults: () => ({ baseMax: 7, baseThresholds: getDefaultHungerThresholds() }),
};

export function registerRestHook() {
	Hooks.on("pf2e.restForTheNight", (actor) => {
		void increaseHungerFromRest(actor);
	});
}

async function increaseHungerFromRest(actor) {
	if (!isHungerMeterEnabled() && !isHungerConditionAutomationEnabled()) return;
	if (!isHungerRestIncreaseEnabled()) return;
	if (!isRegisteredAncestry(actor, "vampire")) return;
	if (!actor?.isOwner) return;

	await adjustMeterCurrent(actor, HUNGER_METER, 1);
}
