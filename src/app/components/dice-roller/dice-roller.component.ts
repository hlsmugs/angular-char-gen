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
  //REGEX
  standardRollRegex = /^[+-]?[1-9]\d*d[1-9]\d*$/;
  withConditionsRegex = /^[+-]?[1-9]\d*d[1-9]\d*((d|k)(h|l))[1-9]\d*$/;
  flatValueRegex = /^[+-]?[1-9]\d*$/;
  //array of diceResults
  allRollResults?: any[];
  //array of diceSums
  allRollSums?: any[];
  isValidInput?: boolean;
  numberOfDice: number;
  diceSize: number;
  //the textarea input
  textAreaInput: string;
  diceRollArray: string[];
  diceResults: any[];
  diceSum: number[];
  maxNumberOfDice: number;

  constructor(
    private readonly titleService: Title,
    private diceRollerService: DiceRollerService
  ) {
    this.titleService.setTitle(this.title);
    this.numberOfDice = 0;
    this.diceSize = 0;
    this.allRollResults = [];
    this.allRollSums = [];
    this.textAreaInput = '';
    this.diceRollArray = [];
    this.diceResults = [];
    this.diceSum = [];
    this.maxNumberOfDice = 10000;
  }

  validateInput(evt: any): boolean {
    const input = evt.key;
    //regex for input
    let validInput = new RegExp('^[0-9dhkl+-]*$');
    if (input == 'Backspace') {
      return true;
    }
    return validInput.test(input);
  }

  //checks format of textarea input
  validateDiceRollString(fullString: string): boolean {
    const isStandard: boolean = this.standardRollRegex.test(fullString);
    const hasConditions: boolean = this.withConditionsRegex.test(fullString);
    const isFlatValue: boolean = this.flatValueRegex.test(fullString);
    if ((isStandard && !hasConditions) || hasConditions || isFlatValue) {
      return true;
    } else {
      return false;
    }
  }

  setDiceRollerArrays(evt: any) {
    const oldStr = this.textAreaInput;
    const isValidInput = this.validateInput(evt);
    const val = evt.target.value;
    if (isValidInput) {
      this.textAreaInput = val;
      //split into array and then validate each
      if(val.match(/[+-]/)){
        this.splitToArray(val);
      } 
      if(this.validateDiceRollString(val)){
        //make diceRollArray just the value
        this.diceRollArray = [val];
        console.log(this.diceRollArray);
      }
    } else {
      this.textAreaInput = oldStr;
      this.diceRollArray = [];
    }
  }

  //split into multiple strings
  splitToArray(str: string) {
    let newArray: string[] = [];
    let validatedArray: string[] = [];

    newArray = str.split(/(?=[+-])/);
    newArray.forEach((val) => {
      if (this.validateDiceRollString(val)) {
        validatedArray.push(val);
      }
    });
    this.diceRollArray = validatedArray;
    console.log(validatedArray);
  }

  //take validated array and calculate each "roll"
  //put roll results in another array
  calculateDiceRoll(rollString: string){
    //rollstring must be valid
    switch(true){
      case this.standardRollRegex.test(rollString):
        console.log('is standard');
        break;
      case this.withConditionsRegex.test(rollString):
        console.log('has conditions')
        break;
      case this.flatValueRegex.test(rollString):
        console.log('is flat')
        break;
    }


    //calc standard format
    //calc conditions
    //calc flat
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
    console.log('Cleared');
    this.textAreaInput = '';
  }

  rollDice() {
    const rollArray = this.diceRollArray;
    //roll each entry in array
    rollArray.forEach((val) =>{
      console.log('value is: ' + val);      
      const leadingSign = val.charAt(0);
      switch(true) {
      //roll standard
        case (this.standardRollRegex.test(val)):
          const resArray = this.diceRollerService.rollStandard(val);
          const sumOfRolls = this.diceRollerService.getSumOfRolls(resArray);
          console.log('resArray: ' + resArray + '\nsumOfRolls: ' + sumOfRolls);
          break;
          //flat
          case (this.flatValueRegex.test(val)):
            console.log('flat number value: ' + val);
            break;
          default: break;
      //roll with condtions          
      }
      //check if + or -
      if(leadingSign == '+'){
        console.log('leading sign is positive');
      }
      if(leadingSign == '-'){
        console.log('leading sign is negative');
      }
    });
    //push result of each individual die roll into result array
    //calculate sum of each roll entry
    //push sum into sum array
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
