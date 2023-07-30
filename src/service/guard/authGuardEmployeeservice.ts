import { Injectable, inject, ɵɵdirectiveInject, ɵɵinject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../admin/login.service";

export const AuthGuardEmployee :  CanActivateFn = (route,state)=>{
    const router =inject(Router);
    const service = ɵɵinject(LoginService)
    if(service.isLogin()&&service.getRole()=="Employee"){
        return true
    }else{
        router.navigate(['/login'])
        return false;
    }
   
}