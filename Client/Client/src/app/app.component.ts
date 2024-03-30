import { UsersService } from './Services/users.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from "./Components/home/home.component";
import { NavComponent } from "./Components/nav/nav.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './Services/auth.service';
import { User } from './models/userDto';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HomeComponent, NavComponent,NgxSpinnerModule]
})
export class AppComponent   {
  title = 'Client';

  users: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.setCurrentUser(user);
     
    }
  
}
}
