import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "../baseUrl.service";
import { async } from "@angular/core/testing";
import { lastValueFrom } from "rxjs";
import { CompanyDetail } from "src/model/companyDetail.model";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";
import { TransactionDetail } from "src/model/transactionDetail.model";

@Injectable()
export class TransactionDetailService{
    
constructor(
   private http: HttpClient, 
   private  url: BaseUrl){
}

baseUrl:String = String(this.url["base_url"])

async findAll(){
    
    return await lastValueFrom(this.http.get(this.baseUrl+ "transaction/get"));
}

async create(policiesonEmployee: TransactionDetail){
    return await lastValueFrom(this.http.post(this.baseUrl + "transaction/create2", policiesonEmployee));
}

async create2(policiesonEmployee: FormData){
    return await lastValueFrom(this.http.post(this.baseUrl + "transaction/create", policiesonEmployee));
}

async delete(id: number){
    return await lastValueFrom(this.http.delete(this.baseUrl + "transaction/delete/"+ id));
}
// async update(policiesonEmployee: PoliciesonEmployee){
//     return await lastValueFrom(this.http.put(this.baseUrl + "transaction/update", policiesonEmployee));
// }
async findById(id: number){
    return await lastValueFrom(this.http.get(this.baseUrl + "transaction/find/"+id));
}

async findByColEmpNo(id: number){
    return await lastValueFrom(this.http.get(this.baseUrl + "transaction/find-col-empno/"+id));
}
}