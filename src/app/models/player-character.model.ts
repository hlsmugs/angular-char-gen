import { AbilityScores } from '../interfaces/ability-scores';

export class PlayerCharacterModel {
  id: number;
  characterName: string;
  characterClass: string; //replace with CharacterClass later
  characterSpecies: string; //replace with CharacterSpecies later
  characterBackground: string;
  abilityScores: AbilityScores;
  characterDescription: CharacterDescription;
  // to implement later / out of scope:
  // skills, equipment, spells, class level, subclass, feats, etc.

  constructor(
    id: number,
    characterName: string,
    characterClass: string,
    characterSpecies: string,
    characterBackground: string,
    abilityScores: AbilityScores,
    characterDescription: CharacterDescription
  ) {
    this.id = id;
    this.characterName = characterName;
    this.characterClass = characterClass;
    this.characterSpecies = characterSpecies;
    this.characterBackground = characterBackground;
    this.abilityScores = abilityScores;
    this.characterDescription = characterDescription;
  }
}

export class CharacterAbilityScores implements AbilityScores {
  strengthScore: number;
  dexterityScore: number;
  constitutionScore: number;
  intelligenceScore: number;
  wisdomScore: number;
  charismaScore: number;
  constructor(
    strengthScore: number,
    dexterityScore: number,
    constitutionScore: number,
    intelligenceScore: number,
    wisdomScore: number,
    charismaScore: number
  ) {
    this.strengthScore = strengthScore;
    this.dexterityScore = dexterityScore;
    this.constitutionScore = constitutionScore;
    this.intelligenceScore = intelligenceScore;
    this.wisdomScore = wisdomScore;
    this.charismaScore = charismaScore;
  }
}

export class CharacterDescription {
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;

  constructor(
    personalityTraits: string,
    ideals: string,
    bonds: string,
    flaws: string
  ) {
    this.personalityTraits = personalityTraits;
    this.ideals = ideals;
    this.bonds = bonds;
    this.flaws = flaws;
  }
}

export class CharacterClassModel {
  characterClassName: string;
  hitDiceSize: number;
  isSpellcaster: boolean;
  spellcastingAbility: string;
  // to add: saving throws, default proficiencies

  constructor(
    characterClassName: string,
    hitDiceSize: number,
    isSpellcaster: boolean,
    spellcastingAbility: string
  ) {
    this.characterClassName = characterClassName;
    this.hitDiceSize = hitDiceSize;
    this.isSpellcaster = isSpellcaster;
    this.spellcastingAbility = spellcastingAbility;
  }
}

export class CharacterSpeciesModel {
  speciesName: string;
  constructor(speciesName: string) {
    this.speciesName = speciesName;
  }
}

export class CharacterBackgroundModel {
  backgroundName: string;
  backgroundDescription: string;
  constructor(backgroundName: string, backgroundDescription: string) {
    this.backgroundName = backgroundName;
    this.backgroundDescription = backgroundDescription;
  }
}
