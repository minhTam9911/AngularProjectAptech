import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";
import { Hospital } from "src/model/hospitalInfo.model";

@Component({
    templateUrl: './hospital.component.html'
})


export class    HospitalAdminComponent implements OnInit {
    result: Result
    hospitales: Hospital[];
    formAdd: FormGroup;
    page : number=1;
    count : number = 0;
    tableSize : number=10;
    tableSizes :any = [5,10,15,20];
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private hospitalService: HospitalInforService,
        private router: Router
        ){}

    ngOnInit(): void {
     this.getAll();
    }

    getAll(){
      this.hospitalService.findAll().then(
        res =>{
            this.hospitales = res as Hospital[];
            console.log(this.hospitales)
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
      await this.hospitalService.delete(id).then(
        result =>{
            this.result = result as Result
        },  
        err =>{console.log(err)}
      )
      console.log(this.result)
      if(this.result){
        await this.messageService.add({severity:"success",summary:"Delete Hospital Detail",detail:"Delete Hospital Successful"});
      }
      else{
        await this.messageService.add({severity:"error",summary:"Delete Hospital Detail",detail:"Delete Hospital Fail"});
    
      }
      await this.hospitalService.findAll().then(
        res =>{
           this.hospitales = res as Hospital[];
            console.log(this.hospitales);
             
        },
        err =>{console.log(err)}
      )
    }
     update(id:number){
      this.router.navigate(["/admin/update-hospital",{hospitalId:id}])
    }
}