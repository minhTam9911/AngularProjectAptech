import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { EmpRegister } from "src/model/empRegister.model";

@Component({
    templateUrl: './empRegister.component.html'
})


export class   EmpRegisterAdminComponent implements OnInit {
    result: Result
    companies: CompanyDetail[];
    formAdd: FormGroup;
    empRegisteres: EmpRegister[]
    page : number=1;
    count : number = 0;
    tableSize : number=10;
    tableSizes :any = [5,10,15,20];
    displayModal: boolean;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private companyService: CompanyDetailService,
        private router: Router,
        private employeeService: EmpRegisterService
        ){}

    ngOnInit(): void {
     this.getAll();
    }

    getAll(){
      this.employeeService.findAll().then(
        res =>{
            this.empRegisteres = res as EmpRegister[];
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
      await this.employeeService.delete(id).then(
        result =>{
            this.result = result as Result
        },  
        err =>{console.log(err)}
      )
      console.log(this.result)
      if(this.result){
        await this.messageService.add({severity:"success",summary:"Success",detail:"Delete Emp Register Successful"});
      }
      else{
        await this.messageService.add({severity:"error",summary:"Waring",detail:"Delete Emp Register Fail"});
    
      }
      await this.employeeService.findAll().then(
        res =>{
           this.empRegisteres = res as EmpRegister[];
            
        },
        err =>{console.log(err)}
      )
    }
     update(id:number){
      this.router.navigate(["/admin/update-company",{companyId:id}])
    }
    showModelDialog(){
      this.displayModal=true;
    }
}