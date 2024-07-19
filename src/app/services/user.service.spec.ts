import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);

    const mockUserData: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] },
      { id: 3, name: 'Jim Beam', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    localStorage.setItem('userData', JSON.stringify(mockUserData));
  });

  afterEach(() => {
    localStorage.removeItem('userData');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data from local storage', () => {
    const expectedUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] },
      { id: 3, name: 'Jim Beam', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    expect(service.getUsers()).toEqual(expectedUsers);
  });

  it('should add a new user', () => {
    const newUser: User = { id: 4, name: 'Alice Wonderland', workouts: [{ type: 'Gym', minutes: 50 }] };
    service.addUser(newUser);

    const expectedUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] },
      { id: 3, name: 'Jim Beam', workouts: [{ type: 'Swimming', minutes: 60 }] },
      { id: 4, name: 'Alice Wonderland', workouts: [{ type: 'Gym', minutes: 50 }] }
    ];
    expect(service.getUsers()).toEqual(expectedUsers);
  });

  // Add more tests to cover other methods and scenarios
});
