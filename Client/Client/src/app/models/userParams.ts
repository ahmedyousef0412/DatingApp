import { User } from "./userDto";

export class UserParams{
    gender:string;
    minAge=18;
    maxAge=60;

    pageNumber =1;
    pageSize=10;
    orderBy ='lastActive';
    constructor(user:User){
        this.gender = user.gender === 'female'?'male':'female';
    }
}