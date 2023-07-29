import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "../baseUrl.service";
import { async } from "@angular/core/testing";
import { lastValueFrom } from "rxjs";
import { CompanyDetail } from "src/model/companyDetail.model";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";

@Injectable()
export class PoliciesonEmployeeService{
    
constructor(
   private http: HttpClient, 
   private  url: BaseUrl){
}

baseUrl:String = String(this.url["base_url"])

async findAll(){
    
    return await lastValueFrom(this.http.get(this.baseUrl+ "policy-employee/get"));
}

async create(policiesonEmployee: PoliciesonEmployee){
    return await lastValueFrom(this.http.post(this.baseUrl + "policy-employee/create", policiesonEmployee));
}

async delete(id: number){
    return await lastValueFrom(this.http.delete(this.baseUrl + "policy-employee/delete/"+ id));
}
async update(policiesonEmployee: PoliciesonEmployee){
    return await lastValueFrom(this.http.put(this.baseUrl + "policy-employee/update", policiesonEmployee));
}
async findById(id: number){
    return await lastValueFrom(this.http.get(this.baseUrl + "policy-employee/find/"+id));
}
}