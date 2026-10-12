# PF2e Accursed Ancestries: Vampire

A custom vampire ancestry module for PF2e on Foundry VTT. It was created to address a few concerns with representing vampires through an archetype:

- Becoming a vampire changes your entire physiology.
- A dedication uses class-feat selections and generally grants feats only at even-numbered levels, so it does not allow a character to begin as a vampire at level 1.
- As a matter of personal preference, I did not like much of the existing dedication.

> GM Warning: This ancestry is intended for roleplay-heavy campaigns.
>
> Some potential roleplaying considerations include:
>
> - The average NPC may fear vampires, affecting their interactions with vampire characters both positively and negatively.
> - If people begin disappearing or showing signs of exsanguination and wounds on their necks, it probably was not "just the wind."

## Installation

```
https://github.com/HavocsCall/FVTT_Pf2eAAVampire/releases/latest/download/module.json
```

## Currently Implemented

### Former Ancestry Support

Select the ancestry your character had before becoming a vampire. This retains the former ancestry's HP, size, hands, reach, speed, boosts, flaws, languages, vision, traits, and items. When gaining an ancestry feat, you can select from both vampire feats and your former ancestry's feats.

### Hunger Tracking

Track your character's current Hunger with a series of dots beneath the dying meter. Left-click to increase Hunger and right-click to decrease it. Hunger can also increase automatically after resting for the night.

### Ancestry Feats

| Heritage   | Level 1 | Level 5 | Level 9 | Level 13 | Level 17 | Total |
| ---------- | ------: | ------: | ------: | -------: | -------: | ----: |
| Jiang-Shi  |       3 |       2 |       1 |        2 |        2 |    10 |
| Moroi      |       4 |       4 |       5 |        2 |        3 |    18 |
| Nosferatu  |       4 |       3 |       3 |        2 |        2 |    14 |
| Strigoi    |       3 |       3 |       3 |        3 |        3 |    15 |
| Vetalarana |       3 |       1 |       1 |        2 |        2 |     9 |
| Vrykolakas |       3 |       3 |       2 |        3 |        2 |    13 |

Counts include feats without a heritage-specific prerequisite for every heritage. Feats that name multiple heritages are included for each named heritage; all other prerequisites must still be met normally.

### Settings

- `Former Ancestry: Use expanded sync`
- `Former Ancestry: Available sources` (defaults to the PF2e Ancestries compendium)
- `Hunger Meter: Show character sheet panel`
- `Hunger: Automate conditions`
- `Hunger: Increase on rest`
- `Hunger Thresholds: Drained`
- `Hunger Thresholds: Confused`
- `Hunger Thresholds: Dying`

See [CONTRIBUTING.md](CONTRIBUTING.md) for the version policy and release commands.

## Special Thanks

- [Podfinder](https://www.youtube.com/@Podfinder) and [Wisdom Check](https://www.youtube.com/@WisdomCheck) for their [Vampire video](https://youtu.be/6jiTNdF-Cic).
- [Mythkeeper](https://www.youtube.com/@TheMythkeeper) for their [Undead/Vampire Lore video](https://www.youtube.com/watch?v=eCJ10IaMIQc&t=3485s).

## AI Acknowledgement

AI was used to assist with documentation, consistency checks, and a few code fixes. The ancestry, heritages, and feats were created by me and my PF2e group. All AI-generated output was reviewed and tested by me and my PF2e group.
