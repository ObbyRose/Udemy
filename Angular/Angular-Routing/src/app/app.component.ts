import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { RouterOutlet } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Ensure this is styleUrls
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}
