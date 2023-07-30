import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "../baseUrl.service";
import { lastValueFrom } from "rxjs";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";

@Injectable()
export class PolicyApprovalDetailService {
    constructor(
        private http: HttpClient,
        private url: BaseUrl,
    ) {

    }
    baseUrl: String = String(this.url["base_url"])
    async findAll() {

        return await lastValueFrom(this.http.get(this.baseUrl + "policy-approval/get"));
    }
    async create(policyApprovalDetail: FormData) {
        return await lastValueFrom(this.http.post(this.baseUrl + "policy-approval/create", policyApprovalDetail));
    }
    async delete(id: number) {
        return await lastValueFrom(this.http.delete(this.baseUrl + "policy-approval/delete/" + id));
    }
    async deleteColRequestId(id: number) {
        return await lastValueFrom(this.http.delete(this.baseUrl + "policy-approval/delete-col-request/" + id));
    }
    async update(policyApprovalDetail: FormData) {
        return await lastValueFrom(this.http.put(this.baseUrl + "policy-approval/update", policyApprovalDetail));
    }
    async findById(id: number) {
        return await lastValueFrom(this.http.get(this.baseUrl + "policy-approval/find/" + id));
    }

    async findByWaitingForApproval() {
        return await lastValueFrom(this.http.get(this.baseUrl + "policy-approval/find-waiting-for-approval"));
    }
    async findByAlreadyAccepted() {
        return await lastValueFrom(this.http.get(this.baseUrl + "policy-approval/find-already-accepted"));
    }
    async findByRefuse() {
        return await lastValueFrom(this.http.get(this.baseUrl + "policy-approval/find-refuse"));
    }
}