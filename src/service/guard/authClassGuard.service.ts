import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthClassGuard implements CanActivate{
    constructor(private router: Router){
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       const token = localStorage.getItem("token");
       console.log("Auth Class Guard");
       console.log(token);
       console.log(state);
       console.log(route);
       const roleAmin = route.data['role'];

       console.log("-------------------"+roleAmin);
        if(token){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }

}