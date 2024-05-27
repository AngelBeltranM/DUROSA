import { CanActivateFn } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(ApiServiceService);
  const router = inject(Router)

  if (authService.loggedIn()) {
    return true;
  }

  router.navigate(['/signin']);
  return false;



};


