import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Hospital } from "src/model/hospitalInfo.model";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";

@Component({
    templateUrl: './addHospital.component.html'
})


export class    AddHospitalAdminComponent implements OnInit {
    result: Result
    hospital: Hospital;
    formAdd: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private hospitalService: HospitalInforService
        ){}

    ngOnInit(): void {
     this.formAdd =   this.formBuilder.group({
            hospitalName:["",[Validators.required, Validators.minLength(3),Validators.maxLength(255)]],
            location:["",[Validators.required, Validators.minLength(3),Validators.maxLength(500)]],
            phoneNo:["",[Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern("^[0-9]*$")]],
            url:["",[Validators.required, Validators.pattern(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/)]]
       })
    }
    async save(){
        var hospitalSave: Hospital = this.formAdd.value as Hospital
       await this.hospitalService.create(hospitalSave).then(
            result => {  this.result = result as Result
            console.log(this.result)
           
            if(this.result){
                this.messageService.add({severity:"success",summary:"Add Success", detail:"Hospital add successful"})
               }
               else{
                   this.messageService.add({severity:"error",summary:"Add Success", detail:"Hospital add fail"})
               }
            },
            err => console.log(err)
        )


    }

}