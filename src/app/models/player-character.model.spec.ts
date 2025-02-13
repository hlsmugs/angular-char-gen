import {
  CharacterAbilityScores,
  CharacterDescription,
  PlayerCharacterModel,
} from './player-character.model';

describe('PlayerCharacter', () => {
  it('should create an instance', () => {
    expect(
      new PlayerCharacterModel(
        0,
        'name',
        'class',
        'species',
        'background',
        new CharacterAbilityScores(10, 10, 10, 10, 10, 10),
        new CharacterDescription('traits', 'ideals', 'bonds', 'flaws')
      )
    ).toBeTruthy();
  });
});
