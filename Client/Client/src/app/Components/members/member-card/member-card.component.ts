import { Photo } from './../../../models/photoDto';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from '../../../models/memberDto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
 
})
export class MemberCardComponent implements OnInit {
 

  @Input() member:Member;
 
   memberAge:number;
  ngOnInit(): void {
    this.memberAge= this.calculateAge(this.member.dateOfBirth)
  } 
  calculateAge(birthDateStr: Date): number {
    // Parse the birth date string into a Date object
    const birthDate = new Date(birthDateStr);

    // Calculate today's date
    const today = new Date();

    // Calculate age in years (ignoring months and days for simplicity)
    let age = today.getFullYear() - birthDate.getFullYear();

    // Handle cases where the birthday hasn't happened this year yet (subtract 1)
    if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
  
}
