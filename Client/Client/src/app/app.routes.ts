import { Routes } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [

    {
        path:"NavBar",component: NavComponent,canActivate:[authGuard] 
        
    },
    {
        path:"Login",component: LoginComponent,  
    },
    {
        path:"Register",component: RegisterComponent,  
    }
];
