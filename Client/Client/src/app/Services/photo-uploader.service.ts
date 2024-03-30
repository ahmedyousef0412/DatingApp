import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploaderService {
  
  
  token: string;
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,private authService: AuthService) { 
    // this.token = authService.getToken();
  }
 

  setMainPhoto(photoId:number){
    return this.http.put(`${this.baseUrl}Photos/SetMain/${photoId}`,{});
  }

  deletePhoto(photoId:number){
    return this.http.delete(`${this.baseUrl}Photos/DeletePhoto/${photoId}`);
  }
}
