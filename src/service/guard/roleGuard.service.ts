import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const RoleGuard: CanActivateFn = (route,state)=>{
    const router = inject(Router);
    const role = route.data['role'];
    if(role==="Admin"){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
}