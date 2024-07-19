import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): User[] {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : [];
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('userData', JSON.stringify(users));
  }

  // Other methods to manipulate users
}
