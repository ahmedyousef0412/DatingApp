import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "./Components/home/home.component";
import { NavComponent } from "./Components/nav/nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, HomeComponent, NavComponent]
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
