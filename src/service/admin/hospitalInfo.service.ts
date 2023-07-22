import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "../baseUrl.service";
import { async } from "@angular/core/testing";
import { lastValueFrom } from "rxjs";
import { CompanyDetail } from "src/model/companyDetail.model";
import { Hospital } from "src/model/hospitalInfo.model";

@Injectable()
export class HospitalInforService{
    
constructor(
   private http: HttpClient, 
   private  url: BaseUrl){
}

baseUrl:String = String(this.url["base_url"])

async findAll(){
    
    return await lastValueFrom(this.http.get(this.baseUrl+ "hospital/get"));
}

async create(hospital: Hospital){
    return await lastValueFrom(this.http.post(this.baseUrl + "hospital/create", hospital));
}

async delete(id: number){
    return await lastValueFrom(this.http.delete(this.baseUrl + "hospital/delete/"+ id));
}
async update(hospital: Hospital){
    return await lastValueFrom(this.http.put(this.baseUrl + "hospital/update", hospital));
}
async findById(id: number){
    return await lastValueFrom(this.http.get(this.baseUrl + "hospital/find/"+id));
}
}