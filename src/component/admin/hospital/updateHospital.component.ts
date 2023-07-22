import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Hospital } from "src/model/hospitalInfo.model";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";

@Component({
    templateUrl: './updateHospital.component.html'
})


export class    EditHospitalAdminComponent implements OnInit {
    result: Result
    hospital: Hospital;
    formAdd: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private hospitalService: HospitalInforService,
        private routerAcive : ActivatedRoute
        ){}

    ngOnInit(): void {
        this.routerAcive.paramMap.subscribe( value=> {
             var id = parseInt(value.get('hospitalId'));
             this.hospitalService.findById(id).then(
                res =>{
                    this.hospital = res as Hospital
                    this.formAdd =   this.formBuilder.group({
                        hospitalId: this.hospital.hospitalId,
                        hospitalName:[this.hospital.hospitalName,[Validators.required, Validators.minLength(5),Validators.maxLength(50)]],
                        location:[this.hospital.location,[Validators.required, Validators.minLength(5),Validators.maxLength(150)]],
                        phoneNo:[this.hospital.phoneNo,[Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern("^[0-9]*$")]],
                        url:[this.hospital.url,[Validators.required, Validators.pattern(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/)]]
                   })

                },err =>{console.log(err)}
             )
        }
        )
     
    }
    async save(){
        var hospitalSave: Hospital = this.formAdd.value as Hospital
       await this.hospitalService.update(hospitalSave).then(
            res => {
                console.log(res)
                this.result = res as Result;
                console.log(this.result)
                if(this.result){
                    this.messageService.add({severity:"success",summary:"Update Success", detail:"Hospital add successful"})
                    }
                    else{
                        this.messageService.add({severity:"error",summary:"Update Success", detail:"Hospital add fail"})
                    }
            },

            err => console.log(err)
        )
    }
    show(){
        
    }
}