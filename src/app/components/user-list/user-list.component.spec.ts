import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ UserService ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [] },
      { id: 2, name: 'Jane Smith', workouts: [] }
    ];

   
    fixture.detectChanges();

    const req = httpMock.expectOne('api/users'); 
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    fixture.detectChanges();

   
    expect(component.users).toEqual(mockUsers);
    const userElements = fixture.nativeElement.querySelectorAll('tr');
    expect(userElements.length).toBe(mockUsers.length + 1); 
  });

  afterEach(() => {
    httpMock.verify();
  });
});
