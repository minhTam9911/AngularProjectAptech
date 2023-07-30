import { inject, ɵɵinject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../admin/login.service";

export const AuthGuardAdmin  :  CanActivateFn = (route,state)=>{
    const router =inject(Router);
    const service = ɵɵinject(LoginService)
    if(service.isLogin()&&service.getRole()=="Admin"){
        
        return true
    }else{
        router.navigate(['/login'])
        return false;
    }
}