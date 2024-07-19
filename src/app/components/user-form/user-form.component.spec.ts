import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, UserFormComponent], // Import UserFormComponent
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
