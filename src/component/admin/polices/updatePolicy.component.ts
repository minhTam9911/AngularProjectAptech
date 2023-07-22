import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import { MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PolicyService } from "src/service/admin/policy.service";
import { Policy } from "src/model/policy.model";
import { Hospital } from "src/model/hospitalInfo.model";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";

@Component({
    templateUrl: './updatePolicy.component.html'
})


export class EditPolicyAdminComponent implements OnInit {
    result: Result
    company: CompanyDetail[];
    formAdd: FormGroup;
    policy: Policy
    medical:Hospital[]
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private companyService: CompanyDetailService,
        private routerAcive: ActivatedRoute,
        private policyService: PolicyService,
        private hospitalService:HospitalInforService
    ) { }

   async ngOnInit() {
        await this.companyService.findAll().then(
            res =>  this.company = res as CompanyDetail[],
            err => console.log(err)
        );
        await this.hospitalService.findAll().then(
            res =>  this.medical = res as Hospital[],
            err => console.log(err)
        );
        this.routerAcive.paramMap.subscribe(value => {
            var id = parseInt(value.get('policyId'));
            this.policyService.findById(id).then(
                res => {
                    this.policy = res as Policy
                    this.formAdd = this.formBuilder.group({
                        policyId: this.policy.policyId,
                        policyName: [this.policy.policyName, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
                        policyDesc: [this.policy.policyDesc, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
                        amount: [this.policy.amount, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
                        emi: [this.policy.emi, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
                        companyId: this.policy.companyId,
                        medicalid: [this.policy.medicalid, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
                    })
                }, err => { console.log(err) }
            )
        }
        )

    }
    async save() {
        var policySave: Policy = this.formAdd.value as Policy
        await this.policyService.update(policySave).then(
            res => {
                console.log(res)
                this.result = res as Result;
                console.log(this.result)
                if (this.result) {
                    this.messageService.add({ severity: "success", summary: "Add Success", detail: "Policy add successful" })
                }
                else {
                    this.messageService.add({ severity: "error", summary: "Add Success", detail: "Policy add fail" })
                }
            },

            err => console.log(err)
        )
    }
   
}