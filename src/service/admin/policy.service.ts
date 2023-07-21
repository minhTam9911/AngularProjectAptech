import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { Policy } from "src/model/policy.model";
import { Injectable } from "@angular/core";

@Injectable()
export class PolicyService{
    constructor(
        private http : HttpClient,
        private url : BaseUrl,
    ){

    }
    baseUrl:String = String(this.url["base_url"])
    async findAll(){

        return await lastValueFrom(this.http.get(this.baseUrl+ "policy/get"));
    }
    async create(policy: Policy){
        return await lastValueFrom(this.http.post(this.baseUrl + "policy/create", policy));
    }
    async delete(id: number){
        return await lastValueFrom(this.http.delete(this.baseUrl + "policy/delete/"+ id));
    }
    async update(policy: Policy){
        return await lastValueFrom(this.http.put(this.baseUrl + "policy/update", policy));
    }
    async findById(id: number){
        return await lastValueFrom(this.http.get(this.baseUrl + "policy/find/"+id));
    }
}