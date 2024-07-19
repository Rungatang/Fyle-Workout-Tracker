import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { FormsModule } from '@angular/forms';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, UserListComponent], // Import UserListComponent
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
