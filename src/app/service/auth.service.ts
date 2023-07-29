import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseUrl } from 'src/service/baseUrl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private url: BaseUrl) { }
  baseUrl:String = String(this.url["base_url"])
  getAll(){
    return lastValueFrom(this.http.get(this.baseUrl + "user/get"));
  }
  getByCode(code:any){
    return lastValueFrom(this.http.get(this.baseUrl + "user/get/"+code));
  }
  processRegister(register:any){
    return lastValueFrom(this.http.post(this.baseUrl + "user/create",register))
  }
 updateRegister(code:any,register:any){
    return lastValueFrom(this.http.put(this.baseUrl + "user/update",register))
  }
  isLoggedIn(){
    return sessionStorage.getItem("username")!=null;
  }
  getUserRole(){
    return sessionStorage.getItem("role")!=null?sessionStorage.getItem("role")?.toString() :"";
  }
}
