import { CanActivateFn, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { inject } from '@angular/core';


export const authadminGuard: CanActivateFn = (route, state) => {

  const service = inject(ApiServiceService);
  const router = inject(Router);

  if(service.loggedAdmin()){
    return true;
  }

  router.navigate(['/admin']);
  return false;

};
