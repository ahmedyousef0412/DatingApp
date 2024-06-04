import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/memberDto';
import { UsersService } from '../../../Services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MomentModule } from 'ngx-moment';
import { SlickCarouselModule } from 'ngx-slick-carousel';
 import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryModule } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule,MatTabsModule,TabsModule,SlickCarouselModule,NgxGalleryModule,
    MomentModule
    ],

  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
  
})
export class MemberDetailsComponent implements OnInit {


  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute) { }

    memberAge:number;
   ngOnInit(): void {
 
    this.loadMember();
 
    this.setGalleryOptions();

  

   }

   getImages(): NgxGalleryImage[] {
    const imageUrls: NgxGalleryImage[] = [];
  
    this.member?.photos?.forEach(photo => photo?.url && imageUrls.push({
      small: photo.url,
      medium: photo.url,
      big: photo.url,
    }));
  
    return imageUrls;
  }
  loadMember() {


    this.userService.getMember(this.activatedRoute.snapshot.paramMap.get('username'))
      .subscribe(member => {
        this.member = member;
        this.memberAge = this.calculateAge(this.member.dateOfBirth);
         this.galleryImages = this.getImages();
        // console.log(this.member);
      })
      
  }

  setGalleryOptions(){
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
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

