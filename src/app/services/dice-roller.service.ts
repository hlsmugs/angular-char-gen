import { Injectable } from '@angular/core';
import { RandomizerService } from './randomizer.service';

@Injectable({
  providedIn: 'root',
})
export class DiceRollerService extends RandomizerService {
  constructor() {
    super();
  }

  /**
   *
   * @param diceSize is any number
   * @returns a random number between 1 and the max die size
   */
  rollDice(diceSize: number): number {
    return this.getRandomNumber(0, diceSize) + 1;
  }

  /**
   *
   * @param numberOfDice is the number of dice you want to roll
   * @param diceSize is any number
   * @returns the array of dice rolled
   */
  multiRoll(numberOfDice: number, diceSize: number): number[] {
    let i = 0;
    let sum = 0;
    let rollArray = [];
    while (i < numberOfDice) {
      let roll = this.rollDice(diceSize);
      rollArray.push(roll);
      sum += roll;
      i++;
    }
    return rollArray;
  }

  getSumOfRolls(numArray: number[]): number {
    let sum = 0;
    numArray.forEach((val) => (sum += val));
    return sum;
  }

  //function to roll multiple die, return sum

  //function to roll multiple die, drop lowest value(s), return sum of remaining

  //function to roll multiple die, keep highest value(s), return sum of remaining
}
