import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AddPerson } from './components/add-person/add-person';
import { EditPerson } from './components/edit-person/edit-person';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'add-person', component: AddPerson },
  { path: 'edit-person/:id', component: EditPerson },
  { path: '**', redirectTo: '' }
];
