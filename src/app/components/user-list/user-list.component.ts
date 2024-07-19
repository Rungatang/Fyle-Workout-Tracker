import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Array to store all users
  filteredUsers: User[] = []; // Array to store filtered users
  paginatedUsers: User[] = []; // Array to store users for current page
  searchText: string = '';
  workoutTypeFilter: string = '';
  workoutTypes: string[] = ['Swimming', 'Yoga', 'Running', 'Cycling']; // Define workout types
  currentPage: number = 1;
  itemsPerPage: number = 5; // Default items per page
  totalPages: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15, 20]; // Options for items per page
  deleteMode: boolean = false;
  userToDelete: User | null = null;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingData = localStorage.getItem('userData');
      this.users = existingData ? JSON.parse(existingData) : [];
      this.filteredUsers = [...this.users]; // Initialize filteredUsers with all users
      this.updatePagination();
    }
  }

  search() {
    // Filter users based on searchText and workoutTypeFilter
    this.filteredUsers = this.users.filter(user => {
      const matchesName = user.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesWorkoutType = this.workoutTypeFilter
        ? user.workouts.some(workout => workout.type === this.workoutTypeFilter)
        : true;
      return matchesName && matchesWorkoutType;
    });
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  updateItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
    this.updatePagination();
  }

  getWorkoutTypes(user: User): string {
    return user.workouts.map(workout => workout.type).join(', ');
  }

  getTotalDuration(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  deleteUser(user: User) {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
      localStorage.setItem('userData', JSON.stringify(this.users));
      this.filteredUsers = [...this.users];
      this.updatePagination();
    }
  }
}
