import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BaseUrl } from "./baseUrl.service";
import { map } from "rxjs";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
     private apiUrl= String(this.baseUrl["base_url"])
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private baseUrl: BaseUrl) { }
    
    login(username: string, password: string) {
      return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
        .pipe(map(result => {
          localStorage.setItem('access_token', result.token);
  
          if (result && result.token) {
            return true;
          } else {
            return false;
          }
        }));
    }
  
    logout() {
      localStorage.removeItem('access_token');
    }
  
    isLoggedIn() {
      const token = localStorage.getItem('access_token');
  
      if (!token) {
        return false;
      }
  
      const expiration = this.jwtHelper.getTokenExpirationDate(token);
      const isExpired = moment().isSameOrAfter(expiration);
  
      if (isExpired) {
        localStorage.removeItem('access_token');
        return false;
      }
  
      return true;
    }
  
  }