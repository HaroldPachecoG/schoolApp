import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { StudentRegistrationComponent } from './app/components/student-registration/student-registration.component';
import { StudentListComponent } from './app/components/student-list/student-list.component';
import { StudentEditComponent } from './app/components/student-edit/student-edit.component';
import { NavMenuComponent } from './app/components/nav-menu/nav-menu.component';

const routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: StudentRegistrationComponent },
  { path: 'list', component: StudentListComponent },
  { path: 'edit/:id', component: StudentEditComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent],
  template: `
    <app-nav-menu></app-nav-menu>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {
  name = 'Student Registration System';
}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));