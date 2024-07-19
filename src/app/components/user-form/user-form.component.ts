import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserFormComponent {
  user = { name: '', workouts: [] as Workout[] };
  workoutType = '';
  workoutMinutes = 0;

  workoutTypes: string[] = ['Swimming', 'Yoga', 'Running', 'Cycling'];

  constructor(private router: Router) {} 

  addUser() {
    if (!this.user.name || !this.workoutType || this.workoutMinutes <= 0) {
      return; 
    }

    
    const existingData = localStorage.getItem('userData');
    const users = existingData ? JSON.parse(existingData) : [];

    
    const userIndex = users.findIndex((u: User) => u.name === this.user.name);
    if (userIndex > -1) {
      
      users[userIndex].workouts.push({ type: this.workoutType, minutes: this.workoutMinutes });
    } else {
      
      users.push({ name: this.user.name, workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }] });
    }
    this.router.navigate(['/user-list']);

    
    localStorage.setItem('userData', JSON.stringify(users));

    
    this.user = { name: '', workouts: [] };
    this.workoutType = '';
    this.workoutMinutes = 0;

    
    this.router.navigate(['/user-list']);
  }
}
