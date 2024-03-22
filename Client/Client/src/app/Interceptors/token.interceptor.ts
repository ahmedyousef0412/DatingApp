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

  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
