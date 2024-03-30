import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);
   let token: any;
   authService.getToken().subscribe((token) =>{
    token = token;
    console.log(token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
   });
  
  
 

  return next(req);
};
