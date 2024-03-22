import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/memberDto';
import { UsersService } from '../../../Services/users.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule,MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  users:Member[];
  user:Member;
  
 constructor(private service:UsersService , private toastr:ToastrService){}
  ngOnInit(): void {
    
    this.loadMembers();
    // this.getUserByName("")
  }

  loadMembers() {
    this.service.getAllUsers().subscribe({
      next:(data)=>{
        this.users = data;
        this.toastr.success('Members loaded successfully!', 'Success');
      },
      error:(error)=>{
        this.toastr.error('Error',error.status);
      }
    }
      
    );
  }
 getUserByName(userName:string){
   this.service.getUser(userName).subscribe((res)=>{
     this.user= res;
     console.log(this.user);
   })
 }
}
