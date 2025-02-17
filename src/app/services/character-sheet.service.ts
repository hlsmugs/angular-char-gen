import { Inject, Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import {
  CharacterAbilityScores,
  PlayerCharacterModel,
} from '../models/player-character.model';
import { AbilityScores } from '../models/_enums/ability-scores';
import { LOCAL_STORAGE } from '../tokens/storageToken';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CharacterSheetService extends BrowserStorageService {
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
    return characterList;
  }

  getCharacterById(id: number): PlayerCharacterModel {
    let characterArray = this.getAllCharacters();
    const character = characterArray.filter((character) => character?.id == id);
    return character[0];
  }

  getCurrentCharacter(route: ActivatedRoute): PlayerCharacterModel {
    let currentCharacter!: PlayerCharacterModel;
    route.params.subscribe((params) => {
      let selectedId = params['id'];
      currentCharacter = this.getCharacterById(selectedId);
    });
    return currentCharacter;
  }

  saveCharacters(characterArray: PlayerCharacterModel[]): void {
    this.set('playerCharacters', JSON.stringify(characterArray));
  }

  deleteCharacterById(id: number): void {
    let characterArray = this.getAllCharacters();
    let newCharacterList: PlayerCharacterModel[] = [];
    newCharacterList = characterArray.filter(
      (character) => character?.id != id
    );
    characterArray = newCharacterList;
    this.saveCharacters(characterArray);
  }

  editCharacter(
    character: PlayerCharacterModel,
    characterArray: PlayerCharacterModel[],
    formGroup: FormGroup
  ) {
    const selectedId = character.id;
    formGroup.controls['id'].setValue(selectedId);
    const editedCharacter = formGroup.value;
    this.deleteCharacterById(selectedId);
    characterArray = this.getAllCharacters();
    characterArray.unshift(editedCharacter);
    this.saveCharacters(characterArray);
  }

  /**
   *
   * @param character is current character
   * @returns array [ability score name, ability score value]
   */
  getAbilityScores(character: PlayerCharacterModel): string[][] {
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

  getAbilityScoreValues(character: PlayerCharacterModel): number[] {
    //ability scores
    let a = character.abilityScores;
    let abilityScoreValues: number[] = [
      a.strengthScore,
      a.dexterityScore,
      a.constitutionScore,
      a.intelligenceScore,
      a.wisdomScore,
      a.charismaScore,
    ];
    return abilityScoreValues;
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

  getDescriptionDropdrown(txtFile: any): any[] {
    let descriptionDropDown: any[] = [];
    return descriptionDropDown;
  }
}
