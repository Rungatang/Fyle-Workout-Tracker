import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component'; // Import the standalone AppComponent
import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app.routes'; // Define your routes if needed

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Provide your routes
  ]
})
.catch(err => console.error(err));
