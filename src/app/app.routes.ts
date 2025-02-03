import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { app } from '../../server';
import { CreateACharacterComponent } from './components/create-a-character/create-a-character.component';

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
    path: 'create-a-character',
    component: CreateACharacterComponent,
  },
];
