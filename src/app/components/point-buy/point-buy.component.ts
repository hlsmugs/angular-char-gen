import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-point-buy',
  standalone: true,
  imports: [],
  templateUrl: './point-buy.component.html',
  styleUrl: './point-buy.component.scss',
})
export class PointBuyComponent {
  @Input() pointsRemaining!: number;
  pointBudget: number;

  constructor() {
    //defaults
    this.pointBudget = 27;
  }
}
