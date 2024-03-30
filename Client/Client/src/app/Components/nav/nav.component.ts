import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HomeComponent } from "../home/home.component";
import { Observable } from 'rxjs';
import { User } from '../../models/userDto';

@Component({
    selector: 'app-nav',
    standalone: true,
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    imports: [CommonModule, RouterLink,RouterLinkActive ,ReactiveFormsModule, HomeComponent]
})
export class NavComponent implements OnInit  {

  isLogged: boolean = false;
  userName: string;
  knowAs:string;
  photoUrl:string;

  currentUser$:Observable<User>;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
  
  }

  logout(): void {
    this.authService.logOut();
    this.isLogged = false;
  }
}
