import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { PoliciesonEmployeeService } from "src/service/admin/policyEmployee.service";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";

@Component({
    templateUrl: './PoliciesonEmployee.component.html'
})


export class PoliciesonEmployeeEmployeeComponent implements OnInit {
    result: Result
    policiesonEmployee: PoliciesonEmployee[];
    formAdd: FormGroup;
    page : number=1;
    count : number = 0;
    tableSize : number=10;
    tableSizes :any = [5,10,15,20];
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private policyEmpService: PoliciesonEmployeeService,
        private router: Router
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
    }
}