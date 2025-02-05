import { Component, inject } from '@angular/core';
import defaultClasses from '../../../../public/json/default-classes.json';
import defaultSpecies from '../../../../public/json/default-species.json';
import defaultBackgrounds from '../../../../public/json/default-backgrounds.json';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { PlayerCharacterModel } from '../../models/player-character.model';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss',
})
export class CharacterSheetComponent {
  public playerCharacterForm!: FormGroup;
  public playerCharacterModel!: PlayerCharacterModel;
  public playerCharacterList: PlayerCharacterModel[] = [];

  //default dropdown lists
  public defaultClasses: {
    characterClassName: string;
    hitDiceSize: number;
    isSpellcaster: boolean;
    spellcastingAbility: string;
  }[] = defaultClasses;
  public defaultSpecies: {
    speciesName: string;
  }[] = defaultSpecies;
  public defaultBackgrounds: {
    backgroundName: string;
    backgroundDescription: string;
  }[] = defaultBackgrounds;

  constructor(
    private browserStorageService: BrowserStorageService,
    public fb: FormBuilder
  ) {
    this.createCharacterSheet();
    const oldList = browserStorageService.get('playerCharacters');
    if (oldList != null) {
      this.playerCharacterList = JSON.parse(oldList);
    }
  }
  /**TODO:
   * random number gen for indexes to select random drop down option
   * 4d6 drop lowest roll method
   * 3d6 roll method
   * standard array
   * ^ above methods put the numbers in a pool that can be dragged and dropped into the section
   * ^ also can drag and drop numbers to swap values
   * point buy method and calculations
   *
   * pool of names or some API to pull from
   * pool of character description stuff
   *
   * random generation entire character method
   * - should be biased where highest stats go depending on class
   *
   *
   * clear all fields
   *
   * save as JSON / PDF
   */

  createCharacterSheet() {
    this.playerCharacterForm = this.fb.group({
      id: [0, [Validators.required]],
      characterName: ['', [Validators.required]],
      characterClass: ['', [Validators.required]],
      characterSpecies: ['', [Validators.required]],
      characterBackground: ['', [Validators.required]],
      abilityScores: this.fb.group({
        strengthScore: [8, [Validators.required]],
        dexterityScore: [8, [Validators.required]],
        constitutionScore: [8, [Validators.required]],
        intelligenceScore: [8, [Validators.required]],
        wisdomScore: [8, [Validators.required]],
        charismaScore: [8, [Validators.required]],
      }),
      characterDescription: this.fb.group({
        personalityTraits: ['', [Validators.required]],
        ideals: ['', [Validators.required]],
        bonds: ['', [Validators.required]],
        flaws: ['', [Validators.required]],
      }),
    });
  }

  saveCharacter() {
    const oldList = this.browserStorageService.get('playerCharacters');
    if (oldList != null) {
      const parseData = JSON.parse(oldList);
      this.playerCharacterForm.controls['id'].setValue(parseData.length);
      this.playerCharacterList.push(this.playerCharacterForm.value);
    } else {
      this.playerCharacterForm.controls['id'].setValue(0);
      this.playerCharacterList.push(this.playerCharacterForm.value);
    }
    this.browserStorageService.set(
      'playerCharacters',
      JSON.stringify(this.playerCharacterList)
    );
    alert('Character Created');
  }
}
