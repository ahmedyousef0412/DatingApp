import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/memberDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //https://localhost:7137/api/Users/GetAllUsers'
  private baseUrl = `${environment.apiUrl}`;
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<Member[]>(`${this.baseUrl}Users`);
  }
  getUser(userName:string){
    return this.http.get<Member>(`${this.baseUrl}Users/${userName}`);
  }
}
