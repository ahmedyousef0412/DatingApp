import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/memberDto';
import { UsersService } from '../../../Services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
 import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryModule } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule,MatTabsModule,TabsModule,SlickCarouselModule,NgxGalleryModule],

  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {


  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute) { }


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
 
}

