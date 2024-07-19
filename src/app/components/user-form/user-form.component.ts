import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

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

  constructor(private router: Router) {} // Inject Router

  addUser() {
    if (!this.user.name || !this.workoutType || this.workoutMinutes <= 0) {
      return; // Or handle validation errors
    }

    // Load existing users from localStorage
    const existingData = localStorage.getItem('userData');
    const users = existingData ? JSON.parse(existingData) : [];

    // Find user or create a new one
    const userIndex = users.findIndex((u: User) => u.name === this.user.name);
    if (userIndex > -1) {
      // User exists, add the new workout to this user
      users[userIndex].workouts.push({ type: this.workoutType, minutes: this.workoutMinutes });
    } else {
      // Create a new user
      users.push({ name: this.user.name, workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }] });
    }

    // Save updated users to localStorage
    localStorage.setItem('userData', JSON.stringify(users));

    // Reset form
    this.user = { name: '', workouts: [] };
    this.workoutType = '';
    this.workoutMinutes = 0;

    // Navigate to the user-list page
    this.router.navigate(['/user-list']);
  }
}
