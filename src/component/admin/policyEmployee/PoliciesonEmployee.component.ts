import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
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


export class    PoliciesonEmployeeAdminComponent implements OnInit {
    result: Result
    policiesonEmployee: PoliciesonEmployee[];
    demoData:PoliciesonEmployee[]
    formAdd: FormGroup;
    page : number=1;
    count : number = 0;
    tableSize : number=10;
    tableSizes :any = [5,10,15,20];
    policyonEmployeeDetail:PoliciesonEmployee
    policy: Policy
    company: CompanyDetail
    hospital:Hospital
    visible:boolean =false
    btn:boolean = false
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private policyEmpService: PoliciesonEmployeeService,
        private router: Router,
        private hospitalService: HospitalInforService,
        private companyService: CompanyDetailService,
        private policyService: PolicyService,
        private confirmationService: ConfirmationService
        ){}

    ngOnInit(): void {
      if(localStorage.getItem('role')=="Admin"){
        this.btn = true
      }else{
        this.btn =false
      }
     this.getAll();
    }

    getAll(){
      this.policyEmpService.findAll().then(
        res =>{
            this.policiesonEmployee = res as PoliciesonEmployee[];
            this.demoData = this.policiesonEmployee 
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
    async delete(id: any){
      await this.confirmationService.confirm({
        message: 'Are you sure that you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
        
           this.policyEmpService.delete(id).then(
            result =>{
                this.result = result as Result
                if(this.result){
                   this.messageService.add({severity:"success",summary:"Successful",detail:"Delete Policieson Employee Successful"});
                }
                else{
                   this.messageService.add({severity:"error",summary:"Error",detail:"Delete Policieson Employee Fail"});
              
                }
                 this.getAll()
            },  
            err =>{console.log(err)}
          )
        },
        reject: (type) => {
          var typeS = type as ConfirmEventType
            switch (typeS) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
      });
     
      
    }
     update(id:any){
      this.router.navigate(["/admin/update-policieson-employee",{id:id}])
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
 
      search(evn:any){
        var keyword = evn.target.value;
        if(keyword==null){
          this.getAll()
        }else{
          this.policiesonEmployee = this.demoData.filter(p=>p.empNo.toString().includes(keyword.toLowerCase()))
        }
      }
    
}