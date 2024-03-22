import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  maxDate: string;
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
     private router: Router,
     private authService:AuthService,
     private toastr:ToastrService) {


    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.maxDate = yesterday.toISOString().split('T')[0];
   }



  ngOnInit(): void {
    this.initSignUpForm();
  }


  private initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      knowAs: [null, Validators.required],
      gender: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      dateOfBirth: [null, Validators.required]
    });
  }

  public get KnowAs(): FormControl {

    return this.signUpForm.get('knowAs') as FormControl;
  }
  public get Gender(): FormControl {

    return this.signUpForm.get('gender') as FormControl;
  }
 
  public get City(): FormControl {

    return this.signUpForm.get('city') as FormControl;
  }
  public get Country(): FormControl {

    return this.signUpForm.get('country') as FormControl;
  }
  public get Username(): FormControl {

    return this.signUpForm.get('username') as FormControl;
  }
  public get Email(): FormControl {

    return this.signUpForm.get('email') as FormControl;
  }
  public get Password(): FormControl {

    return this.signUpForm.get('password') as FormControl;
  }
  public get DateOfBirth(): FormControl {

    return this.signUpForm.get('dateOfBirth') as FormControl;
  }

  onSubmit(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // Save in Database
  
      this.authService.register(this.signUpForm.value).subscribe({
        next:(res)=>{
          this.router.navigate(['/NavBar']);

         this.signUpForm.reset();
         this.authService.storeToken(res.token);
         
          // this.toast.success({detail:"SUCCESS",summary:res.message , duration:5000});
          console.log("success");
        },error:(err)=>{
          console.log(err);
          this.toastr.error(err.error);
        
         }
      })
         
  }
}
}









