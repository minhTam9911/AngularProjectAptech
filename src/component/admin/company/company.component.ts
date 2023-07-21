import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './company.component.html'
})


export class    CompanyAdminComponent implements OnInit {
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
        private router: Router
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
      await this.companyService.delete(id).then(
        result =>{
            this.result = result as Result
        },  
        err =>{console.log(err)}
      )
      console.log(this.result)
      if(this.result){
        await this.messageService.add({severity:"success",summary:"Delete Company Detail",detail:"Delete Company Detail Successful"});
      }
      else{
        await this.messageService.add({severity:"error",summary:"Delete Company Detail",detail:"Delete Company Detail Fail"});
    
      }
      await this.companyService.findAll().then(
        res =>{
           this.companies = res as CompanyDetail[];
            console.log(this.companies);
             
        },
        err =>{console.log(err)}
      )
    }
     update(id:number){
      this.router.navigate(["/admin/update-company",{companyId:id}])
    }
}