import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateACharacterComponent } from './create-a-character.component';

describe('CreateACharacterComponent', () => {
  let component: CreateACharacterComponent;
  let fixture: ComponentFixture<CreateACharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateACharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateACharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
