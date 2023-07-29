import { inject, ɵɵinject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const service = ɵɵinject(AuthService);
  if(service.isLoggedIn()){
    return true;
  }else{
    router.navigate(['login-user']);
    return false;
  }
  
};
