import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastr :ToastrService = inject(ToastrService);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) return true;
      toastr.error('You shall not pass!');
      return false; // Explicitly return false for unauthorized cases
    }),
    tap((isAuthorized) => {
      if (!isAuthorized) {
        router.navigate(['/login']); // Redirect to login if not authorized
      }
    })
  );
};

