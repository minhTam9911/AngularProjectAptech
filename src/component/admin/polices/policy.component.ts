import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { Policy } from "src/model/policy.model";
import { PolicyService } from "src/service/admin/policy.service";

@Component({
    templateUrl: './policy.component.html'
})


export class    PolicyAdminComponent implements OnInit {
    result: Result
    policies: Policy[];
    formAdd: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private policyService: PolicyService,
        private router: Router
        ){}

    ngOnInit(): void {
      this.policyService.findAll().then(
        res =>{
            this.policies = res as Policy[];
            console.log(this.policies)
        },
        err =>{console.log(err)}
      )
    }
    async delete(id: number){
      await this.policyService.delete(id).then(
        result =>{
            this.result = result as Result
        },  
        err =>{console.log(err)}
      )
      console.log(this.result)
      if(this.result){
        await this.messageService.add({severity:"success",summary:"Delete Policy",detail:"Delete Policy Successful"});
      }
      else{
        await this.messageService.add({severity:"error",summary:"Delete Policy",detail:"Delete Policy Fail"});
    
      }
      await this.policyService.findAll().then(
        res =>{
           this.policies = res as Policy[];
            console.log(this.policies);
             
        },
        err =>{console.log(err)}
      )
    }
     update(id:number){
      this.router.navigate(["/admin/update-policy",{policyId:id}])
    }
}