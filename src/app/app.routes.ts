import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-details/:name', component: UserDetailsComponent },
  {path : '', redirectTo : 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch:'full'}

  ];
  

