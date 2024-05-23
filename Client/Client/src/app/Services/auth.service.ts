import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Register } from '../models/RegisterDto';

import { Router } from '@angular/router';
import { Auth } from '../models/authModel';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, take, tap, throwError } from 'rxjs';
import { Login } from '../models/LoginDto';
import { User } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}`;
  
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();
  token: string;
  
  constructor(private http: HttpClient, private router: Router) { }

  //Login

  login(login: Login) {
    return this.http.post(`${this.baseUrl}Account/Login`, login).pipe(
      map((res: Auth) => {

        const user = res;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user); //updates a state management mechanism
        }
      })
    );
  }



  //Register
  register(register: Register) {
    return this.http.post(`${this.baseUrl}Account/Register`, register).pipe(
      map((user: Auth) => {
        if (user) {
          this.currentUserSource.next(user);
        }
      })
    );
  }

  getToken(): Observable<string | null> {
    return this.currentUser$.pipe(
      take(1),
      map((user) => user?.token) // Access token safely
    );
  }


  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }


  logOut() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(['Login']);
  }


}
