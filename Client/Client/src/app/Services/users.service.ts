import { PaginatedResult } from './../models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/memberDto';
import { Observable, from, map, of, take } from 'rxjs';
import { UserParams } from '../models/userParams';
import { AuthService } from './auth.service';
import { User } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  members: Member[] = [];
  private baseUrl = `${environment.apiUrl}`;
  memberCache  = new Map();
  user:User;
  userParams :UserParams;

  constructor(private http: HttpClient ,private authService:AuthService) {

    this.authService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      //userParams contain all user data 
      this.userParams = new UserParams(user);
     })
   }

   getUserParams(){
    return this.userParams;
   }
   
   setUserParams(params:UserParams){
    this.userParams = params;
   }

   resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
   }
  getMembers(userParams:UserParams) {
      
    console.log(this.memberCache);
    
    let response = this.memberCache.get(Object.values(userParams).join('-'));

    if(response){
      return of(response);
    }


    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('gender',userParams.gender);
    params = params.append('orderBy',userParams.orderBy);


    return this.getPaginatedResult<Member[]>(`${this.baseUrl}Users`,params)
    .pipe(map(response =>{
      this.memberCache.set(Object.values(userParams).join('-'),response)
    }));
  }

  


  getMember(userName: string) {

     const member = [...this.memberCache.values()]
     .reduce((arr,elem) => arr.concat(elem.result),[])
     .find((member:Member) => member.userName ===userName);

     if(member){
      return of(member);
     }
      


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

  private getPaginatedResult<T>(url: string,params: HttpParams) {

    const paginatedResult:PaginatedResult<T> = new PaginatedResult<T>();
     return this.http.get<T>(url, { observe: 'response', params }).pipe(
 
       map(response => {
         paginatedResult.result = response.body;
 
         if (response.headers.get('Pagination') != null) {
           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
         }
         return paginatedResult;
       })
     );
   }
 

  private getPaginationHeaders(pageNumber:number , pageSize:number){
    let params = new HttpParams();

    if(pageNumber !== null && pageSize !==null){
      params = params.append("pageNumber",pageNumber.toString());
      params = params.append("pageSize",pageSize.toString());
    }

    return params;
  }
}
