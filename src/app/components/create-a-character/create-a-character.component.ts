import { Component } from '@angular/core';
import { CharacterSheetComponent } from '../character-sheet/character-sheet.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-a-character',
  standalone: true,
  imports: [CharacterSheetComponent],
  templateUrl: './create-a-character.component.html',
  styleUrl: './create-a-character.component.scss',
})
export class CreateACharacterComponent {
  public title: string = 'Create a Character';

  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
