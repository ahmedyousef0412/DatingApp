import { Photo } from "./photoDto";

export class Member{
    email: string;
    password: string;
    userName: string;
    photoUrl: string;
    dateOfBirth: Date;
    created: Date;
    lastActive: Date;
    knowAs: string;
    gender: string;
    city: string;
    country: string;
    introduction: string;
    lookingFor: string;
    intrestes: string;

    photos:Photo[]
    
}