import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/memberDto';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  members: Member[] = [];
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getMembers() {

    //first will check on the list of Members 
    if (this.members.length > 0)
      return of(this.members);

    //else
    return this.http.get<Member[]>(`${this.baseUrl}Users`).pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(userName: string) {

    //Check if no member will send request , else will return the member already exist.
    const existingMember = this.members.find(m => m.userName === userName);
    if (existingMember)
      return of(existingMember);
    //else
    return this.http.get<Member>(`${this.baseUrl}Users/${userName}`);
  }


  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}Users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
