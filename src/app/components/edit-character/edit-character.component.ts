import { Component } from '@angular/core';
import { CharacterSheetComponent } from '../character-sheet/character-sheet.component';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-character',
  standalone: true,
  imports: [CharacterSheetComponent],
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.scss',
})
export class EditCharacterComponent {
  public title: string = 'Edit Character';
  currentCharacterId?: number;

  constructor(
    private route: ActivatedRoute,
    private readonly titleService: Title
  ) {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.currentCharacterId = id;
    });
    this.titleService.setTitle(this.title);
  }
}
