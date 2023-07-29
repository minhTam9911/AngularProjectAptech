import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { EmpRegister } from "src/model/empRegister.model";
import { Injectable } from "@angular/core";

@Injectable()
export class EmpRegisterService{
    constructor(
        private http: HttpClient, 
        private  url: BaseUrl){
     }
     
     baseUrl:String = String(this.url["base_url"])
     
     async findAll(){     
         return await lastValueFrom(this.http.get(this.baseUrl+ "empRegister/get"));
     }

     async findByUsername(username:string){     
        return await lastValueFrom(this.http.get(this.baseUrl+ "empRegister/get-by-username/"+username));
    }
     
     async create(data:FormData){
         return await lastValueFrom(this.http.post(this.baseUrl + "empRegister/create", data));
     }
     
     async delete(id: number){
         return await lastValueFrom(this.http.delete(this.baseUrl + "empRegister/delete/"+ id));
     }
     async update(empRegister: FormData){
         return await lastValueFrom(this.http.put(this.baseUrl + "empRegister/update", empRegister));
     }
     async update2(id: number,empRegister: FormData){
        return await lastValueFrom(this.http.put(this.baseUrl + "empRegister/update2/"+id, empRegister));
    }
     async findById(id: number){
         return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/find/"+id));
     }
     async profile(id: number){
        return await lastValueFrom(this.http.get(this.baseUrl + "empRegister/profile/"+id));
    }
}