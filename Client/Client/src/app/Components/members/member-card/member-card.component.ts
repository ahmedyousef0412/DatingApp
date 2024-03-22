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

  
  ngOnInit(): void {
 
  } 
  
  
}
