import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
const routes: Routes = [
  { path: '', component: UserListComponent },
];

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    CanvasJSAngularChartsModule
  ],

  bootstrap: []
})
export class AppModule { }
