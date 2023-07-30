import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { EmpRegister } from "src/model/empRegister.model";
import { Injectable } from "@angular/core";
import { Account } from "src/model/account.model";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
   constructor(
      private http: HttpClient,
      private url: BaseUrl,
      private router: Router) {
   }

   baseUrl: String = String(this.url["base_url"])
   tokenResp: any;
   logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['login'])
   }
   async processLogin(data: FormData) {
      return await lastValueFrom(this.http.post(this.baseUrl + "empRegister/login", data));
   }
   async sendCode(email: string) {
      return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/send-code/" + email));
   }
   async verify(email: string, code: string) {
      return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/verify/" + email + "/" + code));
   }
   async checkExistEmailAndUsername(email: string, username: string) {
      return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/check-exist-email-username/" + email + "/" + username));
   }
   async sendCodeForgot(email: string, username: string) {
      return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/send-code-forgot/" + email + "/" + username));
   }
   async changePassword(id: string, newPass: string) {
      return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/change-forgot-pass/" + id + "/" + newPass));
   }
   isLogin(){
      return localStorage.getItem('id')!= null || localStorage.getItem('id')!='0';
   }
   getRole() {
      return localStorage.getItem('role');
   }
}