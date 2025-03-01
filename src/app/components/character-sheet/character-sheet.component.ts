import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import defaultClasses from '../../../../public/json/default-classes.json';
import defaultSpecies from '../../../../public/json/default-species.json';
import defaultBackgrounds from '../../../../public/json/default-backgrounds.json';
//list of names from
//https://www.reddit.com/r/DnDBehindTheScreen/comments/50pcg1/a_post_about_names_names_for_speakers_of_the/
import firstNames from '../../../../public/json/first-names.json';
import lastNames from '../../../../public/json/last-names.json';
//list of traits, ideals, bonds, flaws from:
//https://www.enworld.org/threads/list-of-all-personality-traits-ideals-bonds-flaws.469002/
import personalityTraits from '../../../../public/json/personality-traits.json';
import ideals from '../../../../public/json/ideals.json';
import bonds from '../../../../public/json/bonds.json';
import flaws from '../../../../public/json/flaws.json';
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
import { ExporterService } from '../../services/exporter.service';
import { ScrollerService } from '../../services/scroller.service';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [ReactiveFormsModule, PointBuyComponent],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss',
})
export class CharacterSheetComponent {
  @Input() isNewCharacter?: boolean;

  abilityScoreGenMethod?: string;
  pointsUsed: number;
  atMax?: boolean;
  atMin?: boolean;
  currentCharacter$?: PlayerCharacterModel;
  bonuses: number[] = [];
  isPlusOneChecked?: boolean;
  isPlusTwoChecked?: boolean;
  signature?: string;

  //ability scores
  abilityScoreValues?: number[] = [];
  abilityScoreValuesWithBonuses?: number[] = [];
  public playerCharacterForm$!: FormGroup;
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
    private exportService: ExporterService,
    private scrollerService: ScrollerService,
    public fb: FormBuilder,
    public location: Location
  ) {
    this.createCharacterSheet();
    //default
    this.bonuses = [0, 0, 0, 0, 0, 0];
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
    this.abilityScoreGenMethod = '';
    this.pointsUsed = 0;
  }

  createCharacterSheet() {
    this.createForm();
    this.abilityScoreValues = [8, 8, 8, 8, 8, 8];
    this.playerCharacterList$ = this.characterSheetService.getAllCharacters();
    //set current character
    this.currentCharacter$ = this.characterSheetService.getCurrentCharacter(
      this.route
    );
    //set current character vals
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

  createCharacter(name: string) {
    this.setAbiltyScoreFormValues();
    this.createUniqueId();
    this.playerCharacterList$.unshift(this.playerCharacterForm$.value);
    this.characterSheetService.saveCharacters(this.playerCharacterList$);
    alert(name + ' has been added to your roster');
    this.onSubmit();
  }

  saveEditedCharacter() {
    if (this.playerCharacterList$ != null && this.currentCharacter$) {
      this.setAbiltyScoreFormValues();
      if (confirm('Are you sure you want to overwrite this character?')) {
        this.characterSheetService.editCharacter(
          this.currentCharacter$,
          this.playerCharacterList$,
          this.playerCharacterForm$
        );
        alert('Saved changes');
        this.onSubmit();
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

  // point buy
  addPoints(index: number): void {
    let currentVal = this.abilityScoreValues![index];
    //soft limit for points
    if (this.abilityScoreGenMethod == 'pointBuy') {
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
          console.log('Maximum Reached');
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
    } else {
      if (currentVal < 30) {
        this.abilityScoreValues![index]++;
      }
    }
    this.updateAbilityScoreValuesWithBonuses();
  }

  subtractPoints(index: number): void {
    let currentVal = this.abilityScoreValues![index];
    //formula for how much each increase costs
    if (this.abilityScoreGenMethod == 'pointBuy') {
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
    } else {
      if (currentVal > 4) {
        this.abilityScoreValues![index]--;
      }
    }
    this.updateAbilityScoreValuesWithBonuses();
  }

  /**
   *
   * @param evt event of current radio button
   * @param val event of other radio button
   * @param index of the radio button
   */
  setBonuses(evt: any, val: any, index: number): void {
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
    this.updateAbilityScores();
  }

  //checks a random box
  clearChecked() {
    //clear by Name
  }

  updateAbilityScoreValuesWithBonuses(): void {
    const currentVals: number[] = this.abilityScoreValues!;
    const bonuses: number[] = this.bonuses;
    let res: number[] = [];
    this.abilityScoreValuesWithBonuses?.forEach((val, index) => {
      {
        val = currentVals[index] + bonuses[index];
        res.push(val);
      }
    });
    this.abilityScoreValuesWithBonuses = res;
  }

  updateAbilityScores() {
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
    this.updateAbilityScoreValuesWithBonuses();
  }

  /**TODO:
   * 4d6 drop lowest roll method
   * 3d6 roll method
   * number pool that can be dragged and dropped into the section
   * ^ also can drag and drop numbers to swap values
   *
   * biased stat randomizer based on class
   */

  resetAbilityScoreDefaults() {
    this.pointsUsed = 0;
    this.abilityScoreValues = [8, 8, 8, 8, 8, 8];
    this.abilityScoreValuesWithBonuses = this.abilityScoreValues;
  }

  setAbilityGenMethod(genMethod: string) {
    this.abilityScoreGenMethod = genMethod;
    //reset to defaults depending

    this.resetAbilityScoreDefaults();
    switch (genMethod) {
      case 'pointBuy':
        break;
      case 'standardArray':
        //todo: turn field into drop down where u can pick a value from the standard array (including a blank one); choosing a value that is already chosen should make the other dropdown with that value blank instead
        this.randomizeStandardArray();
        break;
      case '4d6dl':
        break;
      case '3d6':
        break;
      case 'customGen':
        break;
    }
  }
  //fix this id
  getCharacterSignature(): string {
    let initials!: string;
    let fullName: string =
      this.playerCharacterForm$.controls['characterName'].value;
    let firstInitial = fullName.charAt(0);
    let nameArray = fullName.split(' ');
    if (nameArray.length > 1) {
      let lastInital = nameArray[nameArray.length - 1].charAt(0);
      initials = firstInitial + lastInital;
    } else {
      initials = firstInitial;
    }
    return initials;
  }

  createUniqueId() {
    const random = this.randomService.getUniqueId();
    this.playerCharacterList$.forEach((character) => {
      if (character.id == random) {
        this.createUniqueId();
      } else {
        this.playerCharacterForm$.controls['id'].setValue(random);
      }
    });
  }

  //generate random character stuff
  getRandomString(field: string): string {
    let jsonArray: any[] = [];
    const rdmGen = (arr: any[]) => {
      return this.randomService.getRandomNumber(0, arr.length);
    };
    switch (field) {
      case 'characterName':
        return this.getRandomName();
      case 'firstName':
        jsonArray = firstNames;
        return jsonArray[rdmGen(jsonArray)].firstName;
      case 'lastName':
        jsonArray = lastNames;
        return jsonArray[rdmGen(jsonArray)].lastName;
      case 'characterClass':
        jsonArray = defaultClasses;
        return jsonArray[rdmGen(jsonArray)].characterClassName;
      case 'characterSpecies':
        jsonArray = defaultSpecies;
        return jsonArray[rdmGen(jsonArray)].speciesName;
      case 'characterBackground':
        jsonArray = defaultBackgrounds;
        return jsonArray[rdmGen(jsonArray)].backgroundName;
      case 'characterDescription.personalityTraits':
        jsonArray = personalityTraits;
        return jsonArray[rdmGen(jsonArray)].personalityTraitsText;
      case 'characterDescription.ideals':
        jsonArray = ideals;
        return jsonArray[rdmGen(jsonArray)].idealsText;
      case 'characterDescription.bonds':
        jsonArray = bonds;
        return jsonArray[rdmGen(jsonArray)].bondText;
      case 'characterDescription.flaws':
        jsonArray = flaws;
        return jsonArray[rdmGen(jsonArray)].flawsText;
      default:
        console.error('invalid field');
        return '';
    }
  }

  //generate random name combining random first and last name
  getRandomName(): string {
    const fName = this.getRandomString('firstName');
    const lName = this.getRandomString('lastName');
    return fName + ' ' + lName;
  }

  randomizeField(field: string) {
    const newVal = this.getRandomString(field);
    this.playerCharacterForm$.get(field)?.setValue(newVal);
  }

  //randomize radio selection

  randomizeAll() {
    const array = [
      'characterName',
      'characterClass',
      'characterSpecies',
      'characterBackground',
      'characterDescription.personalityTraits',
      'characterDescription.ideals',
      'characterDescription.bonds',
      'characterDescription.flaws',
    ];
    //make a way to 'lock' a field from being randomized

    //randomize fields
    array.forEach((field) => this.randomizeField(field));

    //randomize stats
    if (
      !this.abilityScoreGenMethod ||
      this.abilityScoreGenMethod == 'standardArray'
    ) {
      this.randomizeStandardArray();
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

  //export character as JSON file
  exportToJSON() {
    let exportData = this.playerCharacterForm$.value;
    let fileName: string =
      this.playerCharacterForm$.controls['characterName'].value +
      '-character-sheet.json';
    this.exportService.exportForm(exportData, fileName, 'JSON');
  }
  //export as pdf

  clearFields() {
    this.createCharacterSheet();
    this.clearChecked();
  }

  //goes back to previous page
  goBack() {
    this.location.back();
  }

  //how to navigate after saving
  onSubmit() {
    this.router.navigate(['/character-roster']);
  }

  scrollToTop() {
    this.scrollerService.scrollToTop();
  }

  //disable non-letters
  validate(evt: any) {}
}
