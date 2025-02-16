import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomizerService {
  constructor() {}

  //inclusive
  getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   *
   * @param array is any array
   */
  getRandomizedArray(array: any[]): any[] {
    let length = array.length;
    while (--length) {
      let current = this.getRandomNumber(0, length);
      let temp = array[current];
      array[current] = array[length];
      array[length] = temp;
    }
    return array;
  }

  //weighted random array / biased towards a class' "optimal" array
}
