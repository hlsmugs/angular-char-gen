import { TestBed } from '@angular/core/testing';

import { CharacterSheetService } from './character-sheet.service';

describe('CharacterSheetService', () => {
  let service: CharacterSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
