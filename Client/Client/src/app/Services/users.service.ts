import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //https://localhost:7137/api/Users/GetAllUsers'
  private baseUrl = `${environment.apiUrl}`;
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<User>(`${this.baseUrl}/Users/GetAllUsers`);
  }
}
