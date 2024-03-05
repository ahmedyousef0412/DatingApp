import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Register } from '../models/RegisterDto';
import { Login } from '../models/LoginDto';
import { Router } from '@angular/router';
import { Auth } from '../models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = `${environment.apiUrl}`;

  constructor(private http:HttpClient,private router:Router) { }


  register(register:Register){
   
    return this.http.post<Auth>(`${this.baseUrl}/Account/Register`,register);
  }

  login(login:Login){
    return this.http.post<Auth>(`${this.baseUrl}/Account/Login`,login);
  }
  storeToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return !!this.getToken();
  }

  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/Login']);
  }
}
