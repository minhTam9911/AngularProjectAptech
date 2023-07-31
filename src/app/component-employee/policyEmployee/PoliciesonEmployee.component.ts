import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { PoliciesonEmployeeService } from "src/service/admin/policyEmployee.service";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";
import { Policy } from "src/model/policy.model";
import { Hospital } from "src/model/hospitalInfo.model";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";
import { PolicyService } from "src/service/admin/policy.service";

@Component({
    templateUrl: './PoliciesonEmployee.component.html'
})


export class PoliciesonEmployeeEmployeeComponent implements OnInit {
    result: Result
    policiesonEmployee: PoliciesonEmployee[];
    policyonEmployeeDetail:PoliciesonEmployee
    policy: Policy
    company: CompanyDetail
    hospital:Hospital
    formAdd: FormGroup;
    page : number=1;
    count : number = 0;
    tableSize : number=10;
    tableSizes :any = [5,10,15,20];
    visible:boolean =false
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private policyEmpService: PoliciesonEmployeeService,
        private router: Router,
        private hospitalService: HospitalInforService,
        private companyService: CompanyDetailService,
        private policyService: PolicyService,
        ){}

    ngOnInit(): void {
     this.getAll();
    }

    getAll(){
      this.policyEmpService.findByColEmpNo(parseInt(localStorage.getItem('id'))).then(
        res =>{
            this.policiesonEmployee = res as PoliciesonEmployee[];
            console.log(this.policiesonEmployee)
        },
        err =>{console.log(err)}
      )
    }
    onTableSizeChange(evt:any){
      this.tableSize= evt.target.value;
      this.page = 1;
      this.getAll();
    }
    onTableDataChange(evt:any){
      this.page = evt;
      this.getAll();

  }
    async detail(id:any){
      this.visible=true;
     await this.policyEmpService.findById(id).then(
      res=>{
         this.policyonEmployeeDetail = res as PoliciesonEmployee
         this.policyService.findById(this.policyonEmployeeDetail.policyId as number).then(
          ress=>{this.policy = ress as Policy
            this.hospitalService.findById(this.policy.medicalid).then(
              res1=>
              this.hospital = res1 as Hospital
            )
            this.companyService.findById(this.policy.companyId).then(
              res2=>
              this.company = res2 as CompanyDetail
            )
          }
         ) 
      }
      )
    }
}