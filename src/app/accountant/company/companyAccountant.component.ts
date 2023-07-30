import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './companyAccountant.component.html'
})


export class    CompanyAccountantComponent implements OnInit {
    result: Result
    companies: CompanyDetail[];
    formAdd: FormGroup;
    page : number=1;
    count : number = 0;
    tableSize : number=10;
    tableSizes :any = [5,10,15,20];
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private companyService: CompanyDetailService,
        private router: Router,
        private confirmationService: ConfirmationService
        ){}

    ngOnInit(): void {
     this.getAll();
    }

    getAll(){
      this.companyService.findAll().then(
        res =>{
            this.companies = res as CompanyDetail[];
            console.log(this.companies)
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
    async delete(id: number){
      await  this.confirmationService.confirm({
        message: 'Are you sure that you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
             this.companyService.delete(id).then(
              res =>{
                  this.result = res as Result
                  if(this.result){
                    this.messageService.add({severity:"success",summary:"Delete Company Detail",detail:"Delete Company Detail Successful"});
                 }
                 else{
                    this.messageService.add({severity:"error",summary:"Delete Company Detail",detail:"Delete Company Detail Fail"});
               
                 }
                  this.companyService.findAll().then(
                   res =>{
                      this.companies = res as CompanyDetail[];
                       console.log(this.companies);
                        
                   },
                   err =>{console.log(err)}
                 )
              },  
              err =>{console.log(err)}
            )
            console.log(this.result)
           
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
     update(id:number){
      this.router.navigate(["/admin/update-company",{companyId:id}])
    }
}