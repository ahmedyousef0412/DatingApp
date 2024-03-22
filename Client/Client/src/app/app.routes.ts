import { MessagesComponent } from './Components/messages/messages.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MemberDetailsComponent } from './Components/members/member-details/member-details.component';
import { Routes } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './Guards/auth.guard';
import { HomeComponent } from './Components/home/home.component';
import { MemberListComponent } from './Components/members/member-list/member-list.component';
import { NotFoundComponent } from './Components/Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Components/Errors/server-error/server-error.component';

export const routes: Routes = [

    { path: "", component: HomeComponent },
    {
        path:"", runGuardsAndResolvers:'always'
        ,canActivate:[authGuard],
        children:[
            { path: 'members', component: MemberListComponent,canActivate: [authGuard] },
            { path: 'member/:username', component: MemberDetailsComponent,canActivate: [authGuard] },
            { path: 'lists', component: ListsComponent,canActivate: [authGuard] },
            { path: 'message', component: MessagesComponent,canActivate: [authGuard] },
            { path: "NavBar", component: NavComponent, canActivate: [authGuard] },
        ]
    },
    {path: 'Not-found', component: NotFoundComponent},
    {path: 'Server-error', component: ServerErrorComponent},
    { path: "Login", component: LoginComponent, },
    { path: "Register", component: RegisterComponent },
    { path: '**', component: NotFoundComponent,pathMatch:'full' }
];



