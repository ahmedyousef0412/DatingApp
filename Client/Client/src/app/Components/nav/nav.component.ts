import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HomeComponent } from "../home/home.component";

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(({ isLoggedIn, userName,knowAs }) => {
      this.isLogged = isLoggedIn;
      this.userName = userName;
      this.knowAs = knowAs;
    });
  }

  logout(): void {
    this.authService.signOut();
    this.isLogged = false;
  }
}
