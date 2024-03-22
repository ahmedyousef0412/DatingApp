import { Photo } from './photoDto';
export interface Register{
    
    email: string;
    password: string;
    userName: string;
    dateOfBirth: Date;
    knowAs: string;
    gender: string;
    city: string;
    country: string;
    Photos:Photo[]
}