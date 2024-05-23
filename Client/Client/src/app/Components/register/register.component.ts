import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,RouterLink,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  maxDate: string;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
     private router: Router,
     private authService:AuthService,
     private toastr:ToastrService) {


    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.maxDate = yesterday.toISOString().split('T')[0];
   }



  ngOnInit(): void {
    this.initializeSignUpForm();
  }
 

  private initializeSignUpForm(): void {
    this.signUpForm = this.fb.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, [Validators.required,Validators.min(6)]],
      confirmPassword: [null, [Validators.required , this.matchValue('password')]],
      knowAs: [null, Validators.required],
      gender: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
     
      dateOfBirth: [null, Validators.required]
    });
  }



  matchValue(matchTo:string):ValidatorFn{
    return (control:AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching:true}
    }
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
  
  } public get confirmPassword(): FormControl {

    return this.signUpForm.get('confirmPassword') as FormControl;
  }
  public get DateOfBirth(): FormControl {

    return this.signUpForm.get('dateOfBirth') as FormControl;
  }
  
    startDate = new Date(1996,1,1);
  
  onSubmit(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // Save in Database
  
      this.authService.register(this.signUpForm.value).subscribe({
        next:(res)=>{
          this.router.navigateByUrl('/members');

         this.signUpForm.reset();
         
         
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









