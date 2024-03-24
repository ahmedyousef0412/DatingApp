import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/memberDto';
import { UsersService } from '../../../Services/users.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  users$: Observable<Member[]>;

  constructor(private userService: UsersService, private toastr: ToastrService) { }
  ngOnInit(): void {

    this.users$ = this.userService.getMembers();
  }
}
