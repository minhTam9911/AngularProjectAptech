import { Injectable, inject, ɵɵinject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../admin/login.service";

export const AuthGuardAccountant :  CanActivateFn = (route,state)=>{
    const router =inject(Router);
    const service = ɵɵinject(LoginService)
    if(service.isLogin()&&service.getRole()=="Accountant"){
        
        return true
    }else{
        router.navigate(['/login'])
        return false;
    }
}