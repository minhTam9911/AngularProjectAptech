import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { EmpRegister } from "src/model/empRegister.model";
import { Injectable } from "@angular/core";
import { Account } from "src/model/account.model";

@Injectable()
export class LoginService{
    constructor(
        private http: HttpClient, 
        private  url: BaseUrl){
     }
     
     baseUrl:String = String(this.url["base_url"])
     
     async processLogin(data:Account){
         return await lastValueFrom(this.http.post(this.baseUrl+ "empRegister/login",data));
     }
}