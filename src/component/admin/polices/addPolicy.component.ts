import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Policy } from "src/model/policy.model";
import { PolicyService } from "src/service/admin/policy.service";

@Component({
    templateUrl: './addPolicy.component.html'
})


export class    AddPolicyAdminComponent implements OnInit {
    result: Result
    company: CompanyDetail[];
    formAdd: FormGroup;
    policy: Policy;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private companyService: CompanyDetailService,
        private policyService : PolicyService
        ){}

   async ngOnInit() {
       await this.companyService.findAll().then(
            res =>  this.company = res as CompanyDetail[],
            err => console.log(err)
        );
    this.formAdd =   this.formBuilder.group({
            policyName:["",[Validators.required, Validators.minLength(5),Validators.maxLength(50)]],
            policyDesc:["",[Validators.required, Validators.minLength(5),Validators.maxLength(255)]],
            amount:["",[Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
            emi:["",[Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
            companyId:1,
            medicalid:["",[Validators.required, Validators.minLength(5),Validators.maxLength(50)]],

       })
       console.log(this.company)
    }
    async save(){
        var policySave: Policy = this.formAdd.value as Policy
       await this.policyService.create(policySave).then(
            result => {this.result = result as Result 
                if(this.result){
                    this.messageService.add({severity:"success",summary:"Add Success", detail:"Policy add successful"})
                   }
                   else{
                       this.messageService.add({severity:"error",summary:"Add Fail", detail:"Policy add fail"})
                   }            
            },
            err => console.log(err)
        )
    }
     

}