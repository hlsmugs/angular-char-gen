import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import defaultClasses from '../../../../public/json/default-classes.json';
import defaultSpecies from '../../../../public/json/default-species.json';
import defaultBackgrounds from '../../../../public/json/default-backgrounds.json';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import {
  CharacterBackgroundModel,
  CharacterClassModel,
  CharacterSpeciesModel,
  PlayerCharacterModel,
} from '../../models/player-character.model';
import { CharacterSheetService } from '../../services/character-sheet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PointBuyComponent } from '../point-buy/point-buy.component';
import { DiceRollerService } from '../../services/dice-roller.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [ReactiveFormsModule, PointBuyComponent],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss',
})
export class CharacterSheetComponent {
  @Input() isNewCharacter?: boolean;

  pointsUsed: number;
  abilityScoreGenMethod?: string;
  atMax?: boolean;
  atMin?: boolean;
  currentCharacter$?: PlayerCharacterModel;
  bonuses: number[] = [];
  abilityScoreValues?: number[] = [];
  abilityScoreValuesWithBonuses?: number[] = [];
  public playerCharacterForm$!: FormGroup;
  // public playerCharacterModel!: PlayerCharacterModel;
  public playerCharacterList$: PlayerCharacterModel[] = [];

  //default dropdown lists
  public abilityScoreLabels?: string[][] = [];
  public defaultClasses$: CharacterClassModel[] = defaultClasses;
  public defaultSpecies$: CharacterSpeciesModel[] = defaultSpecies;
  public defaultBackgrounds$: CharacterBackgroundModel[] = defaultBackgrounds;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private characterSheetService: CharacterSheetService,
    private randomService: DiceRollerService,
    public fb: FormBuilder,
    public location: Location
  ) {
    this.getCurrentCharacter();
    this.createCharacterSheet();
    //default
    this.bonuses = [0, 0, 0, 0, 0, 0];
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
    this.abilityScoreGenMethod = 'pointBuy';
    this.pointsUsed = 0;
  }

  // point buy
  addPoints(evt: any, evt2: any, index: number): void {
    let currentVal = this.abilityScoreValues![index];
    //soft limit for points
    let points = this.pointsUsed;
    switch (points <= 27) {
      // //18 max
      // case currentVal == 18:
      //   console.log('Cannot go past maximum');
      //   break;
      // //17
      // case currentVal == 17:
      //   if (points + 4 > 27) {
      //     break;
      //   }
      //   this.abilityScoreValues![index] += 1;
      //   this.pointsUsed += 4;
      //   break;
      // case currentVal == 16:
      // case currentVal == 15:
      //   if (points + 3 > 27) {
      //     break;
      //   }
      //   this.abilityScoreValues![index] += 1;
      //   this.pointsUsed += 3;
      //   break;
      //15 max before bonuses
      case currentVal == 15:
        console.log('Cannot go past maximum');
        break;

      //13, 14
      case currentVal == 13 || currentVal == 14:
        if (points + 2 > 27) {
          break;
        }
        this.abilityScoreValues![index] += 1;
        this.pointsUsed += 2;
        break;
      //6-12
      case currentVal <= 12 && currentVal > 5:
        if (points + 1 > 27) {
          break;
        }
        this.abilityScoreValues![index] += 1;
        this.pointsUsed += 1;
        break;
    }
    this.abilityScoreValuesWithBonuses = this.getAbilityScoreValuesWithBonuses(
      this.abilityScoreValues!,
      this.bonuses
    );
  }

  subtractPoints(evt: any, evt2: any, index: number): void {
    let currentVal = this.abilityScoreValues![index];
    //formula for how much each increase costs
    switch (true) {
      case currentVal == 18:
        this.abilityScoreValues![index] -= 1;
        this.pointsUsed -= 4;
        break;
      //range 17 to 16
      case currentVal >= 16:
        this.abilityScoreValues![index] -= 1;
        this.pointsUsed -= 3;
        break;
      //range 15 to 14
      case currentVal >= 14:
        this.abilityScoreValues![index] -= 1;
        this.pointsUsed -= 2;
        break;
      //range 13-6
      case currentVal > 6:
        this.abilityScoreValues![index] -= 1;
        this.pointsUsed -= 1;
        break;
      //range 6 and below
      case currentVal == 6:
        console.log('Cannot go past minimum');
        break;
    }
    this.abilityScoreValuesWithBonuses = this.getAbilityScoreValuesWithBonuses(
      this.abilityScoreValues!,
      this.bonuses
    );
  }

  /**
   *
   * @param evt event of current radio button
   * @param val event of other radio button
   * @param index of the radio button
   */
  setBonuses(evt: any, val: any, index: number) {
    //do if other radio button is unchecked
    if (val.checked) {
      evt.target.checked = false;
      val.checked = false;
    }
    evt.target.checked = true;
    //apply bonus to abilityScoresValues
    let plusOne: boolean = false;
    let plusTwo: boolean = false;
    if (evt.target.value == 1) {
      plusOne = true;
    }
    if (evt.target.value == 2) {
      plusTwo = true;
    }
    this.bonuses.forEach((val, i) => {
      {
        if (plusOne) {
          if (val == 1) {
            this.bonuses[i] = 0;
          }
          this.bonuses[index] = 1;
        }
        if (plusTwo) {
          if (val == 2) {
            this.bonuses[i] = 0;
          }
          this.bonuses[index] = 2;
        }
      }
    });

    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
  }

  getAbilityScoreValuesWithBonuses(
    currentVals: number[],
    bonuses: number[]
  ): number[] | undefined {
    let res: number[] = [];
    this.abilityScoreValuesWithBonuses?.forEach((val, index) => {
      {
        val = currentVals[index] + bonuses[index];
        res.push(val);
      }
    });
    return res;
  }

  updateAbilityScores(evt: any) {
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
    this.abilityScoreValuesWithBonuses = this.getAbilityScoreValuesWithBonuses(
      this.abilityScoreValues!,
      this.bonuses
    );
  }

  /**TODO:
   * random number gen for indexes to select random drop down option
   * 4d6 drop lowest roll method
   * 3d6 roll method
   * standard array
   * ^ above methods put the numbers in a pool that can be dragged and dropped into the section
   * ^ also can drag and drop numbers to swap values
   *
   * pool of names or some API to pull from
   * pool of character description stuff
   *
   * random generation entire character method
   * - should be biased where highest stats go depending on class
   *
   * save as JSON / PDF
   */

  createCharacterSheet() {
    this.createForm();
    this.abilityScoreValues = [8, 8, 8, 8, 8, 8];
    this.playerCharacterList$ = this.characterSheetService.getAllCharacters();
    let c = this.currentCharacter$;
    if (c) {
      this.populateCharacterSheet(c);
      this.abilityScoreValues = [
        c.abilityScores.strengthScore,
        c.abilityScores.dexterityScore,
        c.abilityScores.constitutionScore,
        c.abilityScores.intelligenceScore,
        c.abilityScores.wisdomScore,
        c.abilityScores.charismaScore,
      ];
    }
    //create abiilty scores
    this.abilityScoreLabels =
      this.characterSheetService.getAbilityScoreLabels();
  }

  createForm() {
    this.playerCharacterForm$ = this.fb.group({
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

  //for editing characters
  populateCharacterSheet(currentCharacter$: PlayerCharacterModel) {
    this.playerCharacterForm$ = this.fb.group({
      id: [currentCharacter$.id, [Validators.required]],
      characterName: [currentCharacter$.characterName, [Validators.required]],
      characterClass: [currentCharacter$.characterClass, [Validators.required]],
      characterSpecies: [
        currentCharacter$.characterSpecies,
        [Validators.required],
      ],
      characterBackground: [
        currentCharacter$.characterBackground,
        [Validators.required],
      ],
      abilityScores: this.fb.group({
        strengthScore: [
          currentCharacter$.abilityScores.strengthScore,
          [Validators.required],
        ],
        dexterityScore: [
          currentCharacter$.abilityScores.dexterityScore,
          [Validators.required],
        ],
        constitutionScore: [
          currentCharacter$.abilityScores.constitutionScore,
          [Validators.required],
        ],
        intelligenceScore: [
          currentCharacter$.abilityScores.intelligenceScore,
          [Validators.required],
        ],
        wisdomScore: [
          currentCharacter$.abilityScores.wisdomScore,
          [Validators.required],
        ],
        charismaScore: [
          currentCharacter$.abilityScores.charismaScore,
          [Validators.required],
        ],
      }),
      characterDescription: this.fb.group({
        personalityTraits: [
          currentCharacter$.characterDescription.personalityTraits,
          [Validators.required],
        ],
        ideals: [
          currentCharacter$.characterDescription.ideals,
          [Validators.required],
        ],
        bonds: [
          currentCharacter$.characterDescription.bonds,
          [Validators.required],
        ],
        flaws: [
          currentCharacter$.characterDescription.flaws,
          [Validators.required],
        ],
      }),
    });
  }

  getCurrentCharacter(): void {
    this.route.params.subscribe((params) => {
      let selectedId = params['id'];
      if (selectedId != null) {
        this.currentCharacter$ =
          this.characterSheetService.getCharacterById(selectedId);
      }
    });
  }

  createCharacter(name: string) {
    this.createUniqueId();
    //place new character at front of list
    this.playerCharacterList$.unshift(this.playerCharacterForm$.value);
    this.characterSheetService.set(
      'playerCharacters',
      JSON.stringify(this.playerCharacterList$)
    );
    alert(name + ' has been added to your roster');
    console.log(this.playerCharacterForm$.value);
    this.clearFields();
  }

  saveEditedCharacter() {
    if (this.playerCharacterList$ != null && this.currentCharacter$) {
      this.setAbiltyScoreFormValues();
      if (confirm('Are you sure you want to overwrite this character?')) {
        const editedCharacterId = this.currentCharacter$.id;
        //retain same id
        this.playerCharacterForm$.controls['id'].setValue(editedCharacterId);
        const editedCharacter = this.playerCharacterForm$.value;
        //deletes old entry by id
        this.characterSheetService.deleteCharacterById(editedCharacterId);
        this.playerCharacterList$ =
          this.characterSheetService.getAllCharacters();
        //put new edited char at front of list
        this.playerCharacterList$.unshift(editedCharacter);
        this.characterSheetService.set(
          'playerCharacters',
          JSON.stringify(this.playerCharacterList$)
        );
        alert('Saved changes');
      }
    }
  }

  //set abilityScore values for form
  setAbiltyScoreFormValues() {
    let newScores = this.abilityScoreValuesWithBonuses;
    let form = this.fb.group({
      strengthScore: [newScores![0], [Validators.required]],
      dexterityScore: [newScores![1], [Validators.required]],
      constitutionScore: [newScores![2], [Validators.required]],
      intelligenceScore: [newScores![3], [Validators.required]],
      wisdomScore: [newScores![4], [Validators.required]],
      charismaScore: [newScores![5], [Validators.required]],
    });
    this.playerCharacterForm$.controls['abilityScores'] = form;
    let abilityScores =
      this.playerCharacterForm$.controls['abilityScores'].value;
  }

  clearFields() {
    this.createCharacterSheet();
  }

  createUniqueId() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.playerCharacterList$.forEach((character) => {
      if (character.id == random) {
        this.createUniqueId();
      } else {
        this.playerCharacterForm$.controls['id'].setValue(random);
      }
    });
  }

  randomizeField(field: string) {
    switch (field) {
      case 'name': {
        //create default random names
        break;
      }
      case 'class': {
        const randomNumber = this.randomService.getRandomNumber(
          0,
          this.defaultClasses$.length
        );
        this.playerCharacterForm$.controls['characterClass'].setValue(
          this.defaultClasses$[randomNumber].characterClassName
        );
        break;
      }
      case 'species': {
        const randomNumber = this.randomService.getRandomNumber(
          0,
          this.defaultSpecies$.length
        );
        this.playerCharacterForm$.controls['characterSpecies'].setValue(
          this.defaultSpecies$[randomNumber].speciesName
        );
        break;
      }
      case 'background': {
        const randomNumber = this.randomService.getRandomNumber(
          0,
          this.defaultBackgrounds$.length
        );
        this.playerCharacterForm$.controls['characterBackground'].setValue(
          this.defaultBackgrounds$[randomNumber].backgroundName
        );
        break;
      }
      case 'personalityTraits': {
        //create default random traits
        break;
      }
      case 'ideals': {
        //create default random ideals
        break;
      }
      case 'bonds': {
        //create default random bonds
        break;
      }
      case 'flaws': {
        //create default random flaws
        break;
      }
    }
  }
  randomizeAll() {
    const array = [
      'name',
      'class',
      'species',
      'background',
      'personalityTraits',
      'ideals',
      'bonds',
      'flaws',
    ];
    array.forEach((field) => this.randomizeField(field));
    if (this.abilityScoreGenMethod == 'standardArray') {
      this.randomizeStandardArray();
    }
  }

  resetAbilityScoreDefaults() {
    this.pointsUsed = 0;
    this.abilityScoreValues = [8, 8, 8, 8, 8, 8];
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
  }

  setAbilityGenMethod(genMethod: string) {
    this.abilityScoreGenMethod = genMethod;
    this.resetAbilityScoreDefaults();
    //if standard array
    //todo: turn field into drop down where u can pick a value from the standard array (including a blank one); choosing a value that is already chosen should make the other dropdown with that value blank instead
    if (genMethod == 'standardArray') {
      this.randomizeStandardArray();
      console.log('Standard Array chosen');
    }
  }

  //randomize standard array
  randomizeStandardArray() {
    let standardArray: number[] = [15, 14, 13, 12, 10, 8];
    let randomizedArray = this.randomService.getRandomizedArray(standardArray);
    this.abilityScoreValues = randomizedArray;
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
  }

  //roll 3d6 across the board to create an array
  randomize3d6Array() {
    let array: number[] = [];
    let i = 0;
    while (i < 5) {
      array.push(
        this.randomService.rollDice(6) +
          this.randomService.rollDice(6) +
          this.randomService.rollDice(6)
      );
    }
  }

  //how to navigate after saving
  onSubmit() {
    this.router.navigate(['/character-roster']);
  }

  //export character as JSON file
  exportToJSON() {
    let exportData = this.playerCharacterForm$.value;
    let fileName: string =
      this.playerCharacterForm$.controls['characterName'].value +
      '-character-sheet.json';
    return saveAs(
      new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }),
      fileName
    );
  }
  //export as pdf

  //goes back to previous page
  goBack() {
    this.location.back();
  }
}
