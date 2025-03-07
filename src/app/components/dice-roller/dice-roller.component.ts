import { Component } from '@angular/core';
import { DiceRollerService } from '../../services/dice-roller.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [],
  templateUrl: './dice-roller.component.html',
  styleUrl: './dice-roller.component.scss',
})
export class DiceRollerComponent {
  title: string = 'Dice Roller';
  rollResults?: any[];
  rollSum?: any[];
  numberOfDice: number;
  diceSize: number;
  diceRollerInput: string;
  diceRollerInputArray: string[];
  maxNumberOfDice: number;

  constructor(
    private readonly titleService: Title,
    private diceRollerService: DiceRollerService
  ) {
    this.titleService.setTitle(this.title);
    this.numberOfDice = 0;
    this.diceSize = 0;
    this.rollResults = [];
    this.rollSum = [];
    this.diceRollerInput = '';
    this.diceRollerInputArray = [];
    this.maxNumberOfDice = 10000;
  }

  validateInput(evt: any): boolean {
    const input = evt.key;
    //regex for input
    let validInput = new RegExp('^[0-9dhkl+-]*$');
    const isValidInput = validInput.test(input);
    const oldStr = this.diceRollerInput;
    const val = evt.target.value;

    if (input == 'Backspace') {
      return true;
    }
    if (isValidInput) {
      this.diceRollerInput = val;
    } else {
      this.diceRollerInput = oldStr;
    }

    return isValidInput;
  }

  //checks format of textarea input
  validateString(): boolean {
    const fullString = this.diceRollerInput;
    //regex for entire string; using diff way
    let standardRollRegex = /[1-9]\d*d\d+/g;
    let withConditionsRegex = /[1-9]\d*d\d+((d|k)(h|l))[1-9]\d*/g;
    let flatValueRegex = /[1-9]\d?/g;

    const isStandard: boolean = standardRollRegex.test(fullString);
    const hasConditions: boolean = withConditionsRegex.test(fullString);
    const isFlatValue: boolean = flatValueRegex.test(fullString);

    //separate the string using + or - to get multiple values

    switch (true) {
      //standard
      case isStandard && !hasConditions:
        console.log('standard string is valid');
        return true;
      //has condtions
      case hasConditions:
        console.log('fullString with conditions is valid');
        return true;
      case isFlatValue:
        console.log('flat value is valid');
        return true;
      default:
        return false;
    }
  }

  setDiceRollerInput(evt: any) {
    const oldStr = this.diceRollerInput;
    const isValidInput = this.validateInput(evt);
    const isValidString = this.validateString();
    const val = evt.target.value;
    if (isValidInput) {
      this.diceRollerInput = val;
    } else {
      this.diceRollerInput = oldStr;
    }
  }

  //split into multiple strings
  splitToArray(str: string) {
    const oldArray = this.diceRollerInputArray;
  }

  //need to only take valid format from regex
  //clear if invalid

  // const numberOfDice = val.split('d')[0];

  setNumberOfDice(num: number) {
    console.log(num);
    this.numberOfDice = num;
  }

  setDiceSize(num: number) {
    console.log(num);
    this.diceSize = num;
  }

  clearResults() {
    console.log('yeah');
    this.diceRollerInput = '';
    this.rollResults = [];
  }

  rollDice() {
    console.log(this.diceRollerInput);
  }

  // //old version
  // rollDice() {
  //   const isValid =
  //     this.numberOfDice > 0 &&
  //     this.numberOfDice < this.maxNumberOfDice &&
  //     this.diceSize > 0;
  //   if (isValid) {
  //     let res: number[] = this.diceRollerService.multiRoll(
  //       this.numberOfDice,
  //       this.diceSize
  //     );
  //     this.rollResults?.push(res);
  //     this.rollSum?.push(this.diceRollerService.getSumOfRolls(res));
  //   } else {
  //     console.error('Invalid entry');
  //   }
  // }
}
