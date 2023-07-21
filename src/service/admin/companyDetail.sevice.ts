import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "../baseUrl.service";
import { async } from "@angular/core/testing";
import { lastValueFrom } from "rxjs";
import { CompanyDetail } from "src/model/companyDetail.model";

@Injectable()
export class CompanyDetailService{
    
constructor(
   private http: HttpClient, 
   private  url: BaseUrl){
}

baseUrl:String = String(this.url["base_url"])

async findAll(){
    
    return await lastValueFrom(this.http.get(this.baseUrl+ "company-detail/get"));
}

async create(company: CompanyDetail){
    return await lastValueFrom(this.http.post(this.baseUrl + "company-detail/create", company));
}

async delete(id: number){
    return await lastValueFrom(this.http.delete(this.baseUrl + "company-detail/delete/"+ id));
}
async update(company: CompanyDetail){
    return await lastValueFrom(this.http.put(this.baseUrl + "company-detail/update", company));
}
async findById(id: number){
    return await lastValueFrom(this.http.get(this.baseUrl + "company-detail/find/"+id));
}
}