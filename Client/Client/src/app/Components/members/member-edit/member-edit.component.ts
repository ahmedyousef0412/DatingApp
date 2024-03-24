import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../models/memberDto';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../models/userDto';
import { UsersService } from '../../../Services/users.service';
import { Observable, race, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {


  @ViewChild("editForm") editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) beforeLoad($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member;
  user: User;


  constructor(private authService: AuthService
    , private userService: UsersService
    , private toastr: ToastrService) {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    })
  }


  ngOnInit(): void {
    this.loadMember()
  }


  loadMember() {
    this.userService.getMember(this.user.userName).subscribe((member) => {
      this.member = member;
    })
  }

  updateMember() {

    this.userService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Profile updated successfully.");
      this.editForm.reset(this.member);
    });
  }
}
