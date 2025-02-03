import { Component, inject } from '@angular/core';
import defaultClasses from '../../../../public/json/default-classes.json';
import defaultSpecies from '../../../../public/json/default-species.json';
import defaultBackgrounds from '../../../../public/json/default-backgrounds.json';

import { CharacterClass } from '../../models/character-class.model';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss',
})
export class CharacterSheetComponent {
  public characterClasses: {
    characterClassName: string;
    hitDiceSize: number;
    isSpellcaster: boolean;
    spellcastingAbility: string;
  }[] = defaultClasses;
  public characterSpecies: {
    speciesName: string;
  }[] = defaultSpecies;
  public characterBackground: {
    backgroundName: string;
    backgroundDescription: string;
  }[] = defaultBackgrounds;
}
