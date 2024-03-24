import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from '../Services/busy.service';
import { delay, finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const busyService:BusyService = inject(BusyService);

  busyService.busy();
  return next(req).pipe(
    delay(1000),
    finalize(()=>{
      busyService.idle();
    })
  );
};
