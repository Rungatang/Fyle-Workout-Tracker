import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users from the API', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [] },
      { id: 2, name: 'Jane Smith', workouts: [] }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
