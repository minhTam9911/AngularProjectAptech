import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { EmpRegister } from "src/model/empRegister.model";
import { Injectable } from "@angular/core";
import { Account } from "src/model/account.model";
import { Router } from "@angular/router";

@Injectable()
export class LoginService{
    constructor(
        private http: HttpClient, 
        private  url: BaseUrl,
        private router: Router){
     }
     
     baseUrl:String = String(this.url["base_url"])
     tokenResp:any;
     logout(){
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['login'])
     }
     async processLogin(data:FormData){
         return await lastValueFrom(this.http.post(this.baseUrl+ "empRegister/login",data));
     }
     getRoleByToken(token:any){
        let _token = token.split(".")[1];
        this.tokenResp = JSON.parse(atob(_token));
        console.log(this.tokenResp)
     }
}