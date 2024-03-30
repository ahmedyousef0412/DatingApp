import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  loginForm!: FormGroup;
  userName:string;

  constructor(private fb:FormBuilder 
    ,private router:Router
    ,private authService:AuthService,
    private toastr:ToastrService ){}
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
    // debugger;
    if(this.loginForm.valid){
      // console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe({

       next:(res)=>{
        this.router.navigate(['/members']);

         this.loginForm.reset();
        
        //  this.authService.storeUserName(res.userName);
        //  this.authService.storeToken(res.token);
        //  this.authService.storeUserKnowAs(res.knowAs);
        //  this.authService.storeUserPhotoUrl(res.photoUrl);
        //  this.toastr.success(`Welcome : ${res.userName}`);
          // console.log("success");
       },
       error:(err)=>{
    
       
        console.error(err);
          this.toastr.error(err.error);
         
       },
       complete:()=>{
          console.log("complete");
          
       }
      });
      
    }
    else{

      this.toastr.error('Please fill in all fields correctly.');

    }
}
}