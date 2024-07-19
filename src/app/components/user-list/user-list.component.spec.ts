import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [UserListComponent],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    const mockUserData: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] },
      { id: 3, name: 'Jim Beam', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    localStorage.setItem('userData', JSON.stringify(mockUserData));

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('userData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    component.ngOnInit();
    expect(component.users.length).toBe(3);
  });

  // Add more tests to cover other functionalities
});
