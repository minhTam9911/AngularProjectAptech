import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Policy } from "src/model/policy.model";
import { EmpRegister } from "src/model/empRegister.model";
import { PolicyService } from "src/service/admin/policy.service";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { PoliciesonEmployeeService } from "src/service/admin/policyEmployee.service";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";

@Component({
    templateUrl: './updatePoliciesonEmployee.component.html'
})


export class    EditPoliciesonEmployeeAdminComponent implements OnInit {
    result: Result
    policy: Policy[];
    emp: EmpRegister[]
    formAdd: FormGroup;
    policyName: string
    companyId: number;
    companyName: string;
    emi:any;
    policyAmount: any
    dataOnRead: Policy
    dataUpdate: PoliciesonEmployee
    constructor(private formBuilder: FormBuilder,
        private routerAcive : ActivatedRoute,
        private messageService: MessageService,
        private policyService: PolicyService,
        private employeeService: EmpRegisterService,
        private policiesonEmpservice: PoliciesonEmployeeService
    ) { }

   

    async ngOnInit(){
        this.policyService.findAll().then(
            res => this.policy = res as Policy[],
            err => console.log(err))
        this.employeeService.findAll().then(
            res => this.emp = res as EmpRegister[],
            err => console.log(err))
        
         await this.routerAcive.paramMap.subscribe( value=> {
             var id = parseInt(value.get('id'));
             this.policiesonEmpservice.findById(id).then(
                result =>{
                   this.dataUpdate = result as PoliciesonEmployee
                    if(this.dataUpdate!=null){
                        console.log(this.dataUpdate)
                    }
                    this.companyId = this.dataUpdate.companyId
                    this.companyName = this.dataUpdate.companyName.toString()
                    this.policyName = this.dataUpdate.policyName.toString()
                    this.policyAmount = this.dataUpdate.policyAmount
                    this.emi = this.dataUpdate.emi
                    this.formAdd = this.formBuilder.group({
                        id:this.dataUpdate.id,
                        empNo: [this.dataUpdate.empNo, Validators.required],
                        policyId: [this.dataUpdate.policyId, Validators.required],
                        policyName: [this.policyName, Validators.required],
                        policyStatus: [this.dataUpdate.policyStatus],
                        policyAmount: [this.policyAmount, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
                        policyDuration: [this.dataUpdate.id, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
                        emi: [this.emi, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
                        companyId: [this.companyId, Validators.required],
                        companyName: [this.companyName, Validators.required]
                    })
                },err =>{console.log(err)}
             )
        }
        )
     
    }
    async save(){
        var policiesonEmployee: PoliciesonEmployee = this.formAdd.value as PoliciesonEmployee
        console.log(policiesonEmployee)
       await this.policiesonEmpservice.update(policiesonEmployee).then(
            res => {
                console.log(res)
                this.result = res as Result;
                console.log(this.result)
                if(this.result){
                    this.messageService.add({severity:"success",summary:"Successful", detail:"Update Policy Employee successful"})
                    }
                    else{
                        this.messageService.add({severity:"error",summary:"Error", detail:"Update Policy Employee failed"})
                    }
            },

            err => console.log(err)
        )
    }
    show(){
        
    }
    async selectedPolicy(evn: any) {
        var policyId = parseInt(evn.target.value);
        await this.policyService.findById(policyId).then(
            res => {
                this.dataOnRead = res as Policy
                this.companyId = this.dataOnRead.companyId
                this.companyName=this.dataOnRead.companyName
                this.policyName = this.dataOnRead.policyName
                this.emi = this.dataOnRead.emi
                this.policyAmount = this.dataOnRead.amount
            },err => console.log(err)
        )
    }
}