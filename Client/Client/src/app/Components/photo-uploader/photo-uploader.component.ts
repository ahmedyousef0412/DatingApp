import { Photo } from './../../models/photoDto';
import { User } from './../../models/userDto';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../models/memberDto';
import { CommonModule } from '@angular/common';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../Services/auth.service';
import { environment } from '../../../environments/environment';

;
import { PhotoUploaderService } from '../../Services/photo-uploader.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-photo-uploader',
  standalone: true,
  imports: [CommonModule, FileUploadModule],
  templateUrl: './photo-uploader.component.html',
  styleUrl: './photo-uploader.component.css'
})
export class PhotoUploaderComponent implements OnInit {

  @Input() member: Member;

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  token: string;
  

  constructor(private authService: AuthService,private photoService:PhotoUploaderService) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }
  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Photos/UploadPhoto',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photos.push(photo);

      }
    }
  }
  setMainPhoto(photo: Photo) {
    this.photoService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.authService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  } 


  deletePhoto(photoId:number){
    this.photoService.deletePhoto(photoId).subscribe(()=>{
      
      this.member.photos = this.member.photos.filter(p =>p.id !== photoId);
    })
  }
}

