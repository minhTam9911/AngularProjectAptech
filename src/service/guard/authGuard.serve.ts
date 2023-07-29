import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const AuthGuard :  CanActivateFn = (route,state)=>{
    const router =inject(Router);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if(username!=null){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
   
}