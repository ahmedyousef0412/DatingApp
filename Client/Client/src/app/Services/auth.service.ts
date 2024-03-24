import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Register } from '../models/RegisterDto';

import { Router } from '@angular/router';
import { Auth } from '../models/authModel';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Login } from '../models/LoginDto';
import { User } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = `${environment.apiUrl}`;
  private isLoggedInSubject = new BehaviorSubject<User>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  
    if (typeof window !== 'undefined' && window.localStorage) {
      this.restoreAuthenticationState();
    }
  }

  private restoreAuthenticationState(): void {
    const token = this.getToken();
    const userName =this.getUserName();
    const knowAs = this.getUserKnowAs();
    const isLoggedIn = !!token;
    this.isLoggedInSubject.next({ isLoggedIn, userName,knowAs });
  }


  //Register
  register(register: Register): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}Account/Register`, register);
  }


  //Login
  login(login: Login): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}Account/Login`, login).pipe(
      tap((auth: Auth) => {
        this.storeToken(auth.token);
        this.isLoggedInSubject.next({ isLoggedIn: true, userName: auth.userName, knowAs: auth.knowAs });
      }),catchError((err)=>{
        return throwError(err)
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  storeUserName(userName: string): void {
    localStorage.setItem('userName', userName);
  }
  storeUserKnowAs(knowAs: string): void {
    localStorage.setItem('knowAs', knowAs);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
  getUserKnowAs(): string | null {
    return localStorage.getItem('knowAs');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('knowAs');
    this.isLoggedInSubject.next({ isLoggedIn: false, userName: null,knowAs:null });
    this.router.navigate(['Login']);
  }
}
