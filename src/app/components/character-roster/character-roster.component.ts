import { Component, HostListener, inject } from '@angular/core';
import { PlayerCharacterModel } from '../../models/player-character.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterSheetService } from '../../services/character-sheet.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Title } from '@angular/platform-browser';
import { ScrollerService } from '../../services/scroller.service';

@Component({
  selector: 'app-character-roster',
  standalone: true,
  imports: [RouterModule, InfiniteScrollDirective],
  templateUrl: './character-roster.component.html',
  styleUrl: './character-roster.component.scss',
})
export class CharacterRosterComponent {
  @HostListener('window:scroll', ['$event'])
  onScrollTop(event: any) {
    const offsetScrollHeight =
      document.getElementById('character-roster')?.scrollTop;
    if (window.scrollY <= offsetScrollHeight!) {
      this.loadLimit = this.loadDefault;
    }
  }

  public title: string = 'Character Roster';
  characterSheetService: CharacterSheetService = inject(CharacterSheetService);
  characterList$: PlayerCharacterModel[] = [];
  filteredCharacterList$: PlayerCharacterModel[] = [];
  selectedId?: number;

  //character load limit
  charactersLoaded?: number;
  loadLimit?: number;
  loadIncrement?: number;
  loadDefault = 10;

  //filters
  isSearchByName?: boolean;
  isSearchByClass?: boolean;
  isSearchBySpecies?: boolean;
  isSearchByBackground?: boolean;

  constructor(
    private readonly titleService: Title,
    private route: ActivatedRoute,
    private scrollerService: ScrollerService
  ) {
    this.titleService.setTitle(this.title);
    this.characterList$ = this.characterSheetService.getAllCharacters();
    this.filteredCharacterList$ = this.characterList$;
    this.isSearchByName = true;
    this.isSearchByClass = true;
    this.isSearchBySpecies = true;
    this.isSearchByBackground = true;
    //default val
    this.loadLimit = this.loadDefault;
    this.loadIncrement = this.loadDefault;
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

  onScroll() {
    this.loadLimit! += this.loadIncrement!;
  }

  scrollToTop() {
    this.scrollerService.scrollToTop();
  }
}
