import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";

@Injectable()
export class PolicyRequestDetailService {
    constructor(
        private http : HttpClient,
        private url : BaseUrl,
    ){

    }
    baseUrl:String = String(this.url["base_url"])
    async findAll(){

        return await lastValueFrom(this.http.get(this.baseUrl+ "policy-request/get"));
    }
    async create(policyRequestDetail: FormData){
        return await lastValueFrom(this.http.post(this.baseUrl + "policy-request/create", policyRequestDetail));
    }
    async delete(id: Number){
        return await lastValueFrom(this.http.delete(this.baseUrl + "policy-request/delete/"+ id));
    }
    async update(policyRequestDetail: FormData){
        return await lastValueFrom(this.http.put(this.baseUrl + "policy-request/update", policyRequestDetail));
    }
    async findById(id: Number){
        return await lastValueFrom(this.http.get(this.baseUrl + "policy-request/find/"+id));
    }
    async findByColEmpNo(id: Number){
        return await lastValueFrom(this.http.get(this.baseUrl + "policy-request/find-emp-no/"+id));
    }
   
}