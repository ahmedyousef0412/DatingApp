import { UsersService } from './../../../Services/users.service';
import { User } from './../../../models/userDto';
import { Pagination } from './../../../models/pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/memberDto';

import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, NgModel } from '@angular/forms';
import { UserParams } from '../../../models/userParams';
import { AuthService } from '../../../Services/auth.service';
import{ButtonsModule} from 'ngx-bootstrap/buttons'


@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, PaginationModule, FormsModule ,ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  user:User;
  members: Member[];
  pagination: Pagination;
  userParams:UserParams;
  genderList =[{value:'male' ,display:'Males'} ,{value:'female' ,display:'Females'}]
  
  constructor(private userService: UsersService, private toastr: ToastrService) { 

     this.userParams =this.userService.getUserParams();
  }

  ngOnInit(): void {
    
    this.loadMembers();
  }


  loadMembers() {
    this.userService.setUserParams(this.userParams);
    
    this.userService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination
    });
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.userService.setUserParams(this.userParams);
    this.loadMembers();
  }

 resetFilters(){
  this.userParams = this.userService.resetUserParams();
  this.loadMembers();
 }
}