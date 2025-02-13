import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PlayerCharacterModel } from '../../models/player-character.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterSheetService } from '../../services/character-sheet.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-character-roster',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './character-roster.component.html',
  styleUrl: './character-roster.component.scss',
})
export class CharacterRosterComponent {
  public title: string = 'Character Roster';
  characterSheetService: CharacterSheetService = inject(CharacterSheetService);
  characterList$: PlayerCharacterModel[] = [];
  filteredCharacterList$: PlayerCharacterModel[] = [];
  selectedId?: number;

  //filters
  isSearchByName?: boolean;
  isSearchByClass?: boolean;
  isSearchBySpecies?: boolean;
  isSearchByBackground?: boolean;

  constructor(
    private readonly titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.title);
    this.characterList$ = this.characterSheetService.getAllCharacters();
    this.filteredCharacterList$ = this.characterList$;
    this.isSearchByName = true;
    this.isSearchByClass = true;
    this.isSearchBySpecies = true;
    this.isSearchByBackground = true;
  }

  searchCharacterRoster(text: string) {
    if (!text) {
      this.filteredCharacterList$ = this.characterList$;
      return;
    }
    this.filteredCharacterList$ = this.characterList$.filter(
      (character) =>
        (this.isSearchByName &&
          character?.characterName
            .toLowerCase()
            .includes(text.toLowerCase())) ||
        (this.isSearchByClass &&
          character?.characterClass
            .toLowerCase()
            .includes(text.toLowerCase())) ||
        (this.isSearchBySpecies &&
          character?.characterSpecies
            .toLowerCase()
            .includes(text.toLowerCase())) ||
        (this.isSearchByBackground &&
          character?.characterBackground
            .toLowerCase()
            .includes(text.toLowerCase()))
    );
  }
  //filter characters
  //open modal that has filters

  //delete character
  deleteCharacter(id: number, name: string) {
    if (
      confirm(
        'Are you sure you want to delete ' +
          name +
          ' with id: ' +
          id +
          '? This cannot be undone.'
      )
    ) {
      console.log('Removed ' + name);
      this.characterSheetService.deleteCharacterById(id);
      this.filteredCharacterList$ =
        this.characterSheetService.getAllCharacters();
    }
  }

  //ALSO: create a character service that can edit/delete or extend browserStorageService
}
