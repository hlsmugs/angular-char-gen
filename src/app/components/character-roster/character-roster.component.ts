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
  //for all scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // on scroll
    const currentScrollY = window.scrollY;
    if (this.prevScrollY! < currentScrollY) {
      this.isSTTShown = true;
      this.loadLimit! += this.loadIncrement!;
    }
    this.prevScrollY = currentScrollY;

    //if at top, hide scroll to top
    const offsetScrollHeight =
      document.getElementById('character-roster')?.scrollTop;
    if (window.scrollY <= offsetScrollHeight!) {
      this.isSTTShown = false;
      this.loadLimit = this.loadDefault;
    }
  }

  public title: string = 'Character Roster';
  characterSheetService: CharacterSheetService = inject(CharacterSheetService);
  characterList$: PlayerCharacterModel[] = [];
  filteredCharacterList$: PlayerCharacterModel[] = [];
  searchText: string = '';
  selectedId?: number;

  //character load limit
  charactersLoaded?: number;
  loadLimit?: number;
  loadIncrement?: number;
  loadDefault = 10;

  //scrolling
  prevScrollY?: number;
  isSTTShown?: boolean;

  //collapse
  isCollapsed?: boolean;

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
    this.prevScrollY = 0;
    this.isCollapsed = true;
    this.loadLimit = this.loadDefault;
    this.loadIncrement = this.loadDefault;
  }

  searchCharacterRoster(text: string) {
    if (!text) {
      this.filteredCharacterList$ = this.characterList$;
      return;
    }
    this.searchText = text;
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
      this.refresh();
    }
  }

  clearSearch() {
    this.searchText = '';
    this.filteredCharacterList$ = this.characterList$;
  }

  scrollToTop() {
    this.scrollerService.scrollToTop();
  }

  refresh() {
    window.location.reload();
  }
}
