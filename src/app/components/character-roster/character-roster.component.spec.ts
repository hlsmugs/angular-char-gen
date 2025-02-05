import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRosterComponent } from './character-roster.component';

describe('CharacterRosterComponent', () => {
  let component: CharacterRosterComponent;
  let fixture: ComponentFixture<CharacterRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterRosterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
