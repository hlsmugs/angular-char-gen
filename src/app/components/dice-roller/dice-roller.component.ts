import { Component } from '@angular/core';
import { DiceRollerService } from '../../services/dice-roller.service';
import { NumberSymbol } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [],
  templateUrl: './dice-roller.component.html',
  styleUrl: './dice-roller.component.scss',
})
export class DiceRollerComponent {
  rollResults?: any[];
  rollSum?: any[];
  numberOfDice: number;
  diceSize: number;
  maxNumberOfDice: number;

  constructor(private diceRollerService: DiceRollerService) {
    this.numberOfDice = 0;
    this.diceSize = 0;
    this.rollResults = [];
    this.rollSum = [];
    this.maxNumberOfDice = 10000;
  }

  setNumberOfDice(evt: any) {
    this.numberOfDice = evt.target.value;
  }

  setDiceSize(evt: any) {
    this.diceSize = evt.target.value;
  }

  clearResults() {
    this.rollResults = [];
  }

  rollDice() {
    const isValid =
      this.numberOfDice > 0 &&
      this.numberOfDice < this.maxNumberOfDice &&
      this.diceSize > 0;
    if (isValid) {
      let res: number[] = this.diceRollerService.multiRoll(
        this.numberOfDice,
        this.diceSize
      );
      this.rollResults?.push(res);
      this.rollSum?.push(this.diceRollerService.getSumOfRolls(res));
    } else {
      console.error('Invalid entry');
    }
    // if (this.numberOfDice > this.maxNumberOfDice) {
    //   console.error('Too many dice');
    // } else {
    //   console.error('No Dice');
    // }
  }
}
