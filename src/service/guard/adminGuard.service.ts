import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivateChild {
    canActivateChild(childRoute: ActivatedRouteSnapshot,
         state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error("Method not implemented.");
    }

}