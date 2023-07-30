import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: './updateCompany.component.html'
})


export class    EditCompanyAdminComponent implements OnInit {
    result: Result
    company: CompanyDetail;
    formAdd: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private companyService: CompanyDetailService,
        private routerAcive : ActivatedRoute
        ){}

    ngOnInit(): void {
        this.routerAcive.paramMap.subscribe( value=> {
             var id = parseInt(value.get('companyId'));
             this.companyService.findById(id).then(
                res =>{
                    this.company = res as CompanyDetail
                    this.formAdd =   this.formBuilder.group({
                        companyId: this.company.companyId,
                        companyName:[this.company.companyName,[Validators.required, Validators.minLength(5),Validators.maxLength(50)]],
                        address:[this.company.address,[Validators.required, Validators.minLength(5),Validators.maxLength(150)]],
                        phone:[this.company.phone,[Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern("^[0-9]*$")]],
                        companyUrl:[this.company.companyUrl,[Validators.required, Validators.pattern(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/)]]
                   })

                },err =>{console.log(err)}
             )
        }
        )
     
    }
    async save(){
        var companySave: CompanyDetail = this.formAdd.value as CompanyDetail
       await this.companyService.update(companySave).then(
            res => {
                console.log(res)
                this.result = res as Result;
                console.log(this.result)
                if(this.result){
                    this.messageService.add({severity:"success",summary:"Add Success", detail:"Company Update successful"})
                    }
                    else{
                        this.messageService.add({severity:"error",summary:"Add Success", detail:"Company Update fail"})
                    }
            },

            err => console.log(err)
        )
    }
    show(){
        
    }
}