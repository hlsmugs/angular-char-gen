import { Component } from '@angular/core';
import { CharacterSheetComponent } from '../character-sheet/character-sheet.component';

@Component({
  selector: 'app-create-a-character',
  standalone: true,
  imports: [CharacterSheetComponent],
  templateUrl: './create-a-character.component.html',
  styleUrl: './create-a-character.component.scss',
})
export class CreateACharacterComponent {}
