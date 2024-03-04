import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Client';

  users:any;
 constructor(private httpClient:HttpClient){}
  ngOnInit(): void {
    
    this.getUsers();
  }

  getUsers(){
    this.httpClient.get("https://localhost:7137/api/Users/GetAllUsers").subscribe((res)=>{

    this.users=res;
    })
  }
}
