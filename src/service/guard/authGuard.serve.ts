import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const AuthGuard :  CanActivateFn = (route,state)=>{
    const router =inject(Router);
    const token = localStorage.getItem("token");
    if(token){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
   
}