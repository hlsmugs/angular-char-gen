import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterRosterComponent } from './components/character-roster/character-roster.component';
import { CreateACharacterComponent } from './components/create-a-character/create-a-character.component';
import { EditCharacterComponent } from './components/edit-character/edit-character.component';
import { ErrorHandler, inject } from '@angular/core';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { DiceRollerComponent } from './components/dice-roller/dice-roller.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'create-a-character',
    component: CreateACharacterComponent,
  },
  {
    path: 'character-roster',
    component: CharacterRosterComponent,
  },
  // {
  //   path: 'edit-character',
  //   redirectTo: ({ queryParams }) => {
  //     const errorHandler = inject(ErrorHandler);
  //     const characterIdParam = queryParams['id'];
  //     if (characterIdParam !== undefined) {
  //       return `edit-character/${characterIdParam}`;
  //     } else {
  //       errorHandler.handleError(
  //         new Error('Attempted navigation to character page without an id')
  //       );
  //       return '/not-found';
  //     }
  //   },
  // },
  { path: 'edit-character/:id', component: EditCharacterComponent },
  {
    path: 'dice-roller',
    component: DiceRollerComponent,
  },
];
