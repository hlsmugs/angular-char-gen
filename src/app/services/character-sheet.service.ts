import { Inject, Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { PlayerCharacterModel } from '../models/player-character.model';
import { AbilityScores } from '../models/_enums/ability-scores';
import { LOCAL_STORAGE } from '../tokens/storageToken';

@Injectable({
  providedIn: 'root',
})
export class CharacterSheetService extends BrowserStorageService {
  protected characterList$: PlayerCharacterModel[] = [];
  protected currentCharacter$?: PlayerCharacterModel;

  constructor(@Inject(LOCAL_STORAGE) public override storage: Storage) {
    super(storage);
  }

  getAllCharacters(): PlayerCharacterModel[] {
    let characterList: PlayerCharacterModel[] = [];
    const characterListJSON = this.get('playerCharacters');
    if (characterListJSON != null) {
      const characterArray = JSON.parse(characterListJSON);
      //iterate through array
      for (const i of Object.keys(characterArray)) {
        const character: PlayerCharacterModel = characterArray[i];
        characterList.push(character);
      }
    }
    this.characterList$ = characterList;
    return this.characterList$;
  }

  getCharacterById(id: number): PlayerCharacterModel | undefined {
    const character = this.characterList$.filter(
      (character) => character?.id == id
    );
    return character[0];
  }

  deleteCharacterById(id: number): void {
    let newCharacterList: PlayerCharacterModel[] = [];
    newCharacterList = this.characterList$.filter(
      (character) => character?.id != id
    );
    this.characterList$ = newCharacterList;
    const newJSON = JSON.stringify(this.characterList$);
    this.set('playerCharacters', newJSON);
  }

  /**
   *
   * @param character is current character
   * @returns array [ability score name, ability score value]
   */
  getAbilityScores(character: PlayerCharacterModel) {
    let c = character.abilityScores;
    let abilityScores: string[][] = [];
    let abilityScoreValues: number[] = [
      c.strengthScore,
      c.dexterityScore,
      c.constitutionScore,
      c.intelligenceScore,
      c.wisdomScore,
      c.charismaScore,
    ];
    let index = 0;

    Object.keys(AbilityScores).forEach((key) => {
      {
        abilityScores.push([
          key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          abilityScoreValues[index].toString(),
        ]);
        index++;
      }
    });
    return abilityScores;
  }
  /**
   *
   * @returns labels for ability scores from AbilityScores enum
   */
  getAbilityScoreLabels(): string[][] {
    let abilityScoreLabels: string[][] = [];
    Object.entries(AbilityScores).forEach(([key, value]) =>
      abilityScoreLabels.push([
        key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
        value,
      ])
    );
    return abilityScoreLabels;
  }

  //editById
}
