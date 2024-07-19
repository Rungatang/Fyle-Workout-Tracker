import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from '../components/user-list/user-list.component';
import { UserFormComponent } from '../components/user-form/user-form.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
