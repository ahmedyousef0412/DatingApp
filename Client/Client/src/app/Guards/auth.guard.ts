import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastr :ToastrService = inject(ToastrService);

  if (authService.isLoggedIn()) {
    return true;
  }
  else {

    router.navigate(['/Login']);
    toastr.error('You must be logged in pass!! ');
    return false;
  }
}