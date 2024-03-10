import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Register } from '../models/RegisterDto';
import { Login } from '../models/LoginDto';
import { Router } from '@angular/router';
import { Auth } from '../models/authModel';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // private baseUrl = `${environment.apiUrl}`;

  // private isLoggedInSubject = new BehaviorSubject<{ isLoggedIn: boolean, userName: string }>(null);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();
  

  // constructor(private http:HttpClient,private router:Router) {}


  // register(register:Register){
   
  //   return this.http.post<Auth>(`${this.baseUrl}/Account/Register`,register);
  // }

  // login(login: Login) {
  //   return this.http.post<Auth>(`${this.baseUrl}/Account/Login`, login).pipe(
  //     tap((auth: Auth) => {
  //       this.storeToken(auth.token);
  //       this.isLoggedInSubject.next({ isLoggedIn: true, userName: auth.userName });
  //     })
  //   );
  // }


  
  // storeToken(token:string){
  //   localStorage.setItem('token',token);
  // }
  // storeUserName(userName:string){
  //   localStorage.setItem('userName',userName);
  // }

  // getToken(){
  //   return localStorage.getItem('token');
  // }
  // getUserName(){
  //   return localStorage.getItem('userName');
  // }
  // isLoggedIn():boolean{
  //   return !!this.getToken();
  // }

  // signOut() {
  //   // localStorage.removeItem('token');
  //   // localStorage.removeItem('userName');
  //   this.isLoggedInSubject.next({ isLoggedIn: false, userName: null });
  //   this.router.navigate(['/Login']);
  // }

  private baseUrl = `${environment.apiUrl}`;
  private isLoggedInSubject = new BehaviorSubject<{ isLoggedIn: boolean, userName: string }>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.restoreAuthenticationState();
    }
  }

  private restoreAuthenticationState(): void {
    const token = this.getToken();
    const userName =this.getUserName();
    const isLoggedIn = !!token;
    this.isLoggedInSubject.next({ isLoggedIn, userName });
  }


  //Register
  register(register: any): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/Account/Register`, register);
  }

  login(login: any): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/Account/Login`, login).pipe(
      tap((auth: Auth) => {
        this.storeToken(auth.token);
        this.isLoggedInSubject.next({ isLoggedIn: true, userName: auth.userName });
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  storeUserName(userName: string): void {
    localStorage.setItem('userName', userName);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.isLoggedInSubject.next({ isLoggedIn: false, userName: null });
    this.router.navigate(['/']);
  }
}
