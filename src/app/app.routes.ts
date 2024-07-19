import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: 'user-form', component: UserFormComponent },
  { path: '', redirectTo: '/user-form', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent },
  {path : '', redirectTo : 'user-form', pathMatch: 'full'},
  {path: '**', redirectTo: 'user-form', pathMatch:'full'}

  ];
  

