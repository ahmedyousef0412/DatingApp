import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit  {

  loginForm!: FormGroup;

  constructor(private fb:FormBuilder ){}
  ngOnInit(): void {
    this.initLoginForm();
  }


 

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  public get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onLogin(){

    console.log(this.loginForm.value);
  }
}
