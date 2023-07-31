import { Injectable, inject, ɵɵdirectiveInject, ɵɵinject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../admin/login.service";

export const AuthGuarIsLogin :  CanActivateFn = (route,state)=>{
    const router =inject(Router);
    const service = ɵɵinject(LoginService)
    console.log(localStorage.getItem('id'))
    if(localStorage.getItem('id')!=null){
        return true
    }else{
        router.navigate(['/login'])
        return false;
    }
   
}