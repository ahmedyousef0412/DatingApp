import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { map } from 'rxjs';
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
    if(this.loginForm.valid){
      // console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe({

       next:(res)=>{
        this.router.navigate(['/members']);

         this.loginForm.reset();

         this.authService.storeUserName(res.userName);
         this.authService.storeToken(res.token);
         
          // this.toast.success({detail:"SUCCESS",summary:res.message , duration:5000});
          console.log("success");
       },
       error:(err)=>{
        console.log(err);
        this.toastr.error(err.error)     
       },
       complete:()=>{
          console.log("complete");
          
       }
      });
      
    }
    else{

      // this.authService.login(this.loginForm.value).pipe(

      //   map()
      // )
     //Using Toastar
    }
}
}