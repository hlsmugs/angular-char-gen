import { TestBed } from '@angular/core/testing';

import { DiceRollerService } from './dice-roller.service';

describe('DiceRollerService', () => {
  let service: DiceRollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceRollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
