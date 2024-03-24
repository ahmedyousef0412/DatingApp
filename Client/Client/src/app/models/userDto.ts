export interface User {
    userName: string;
    token?: string;
    isLoggedIn: boolean;
    photoUrl?: string;
    knowAs?: string;
    gender?: string;
    roles?: string[];
}