import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, RouterOutlet, FooterComponent] // Include necessary modules here
 // Include necessary modules here
})
export class AppComponent {
  title = 'Workout';
}
