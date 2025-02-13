import { Component } from '@angular/core';
import { DiceRollerService } from '../../services/dice-roller.service';

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

  constructor(private diceRollerService: DiceRollerService) {
    this.numberOfDice = 0;
    this.diceSize = 0;
    this.rollResults = [];
    this.rollSum = [];
  }

  setNumberOfDice(evt: any) {
    this.numberOfDice = evt.target.value;
  }

  setDiceSize(evt: any) {
    this.diceSize = evt.target.value;
  }

  rollDice() {
    let res: number[] = this.diceRollerService.multiRoll(
      this.numberOfDice,
      this.diceSize
    );
    this.rollResults?.push(res);
    this.rollSum?.push(this.diceRollerService.getSumOfRolls(res));
    console.log(this.rollSum);
  }
}
