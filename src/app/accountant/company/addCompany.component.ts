import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import {  MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";

@Component({
    templateUrl: './addCompany.component.html'
})


export class    AddCompanyAdminComponent implements OnInit {
    result: Result
    company: CompanyDetail;
    formAdd: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private companyService: CompanyDetailService
        ){}

    ngOnInit(): void {
     this.formAdd =   this.formBuilder.group({
            companyName:["",[Validators.required, Validators.minLength(5),Validators.maxLength(50)]],
            address:["",[Validators.required, Validators.minLength(5),Validators.maxLength(150)]],
            phone:["",[Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern("^[0-9]*$")]],
            companyUrl:["",[Validators.required, Validators.pattern(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/)]]
       })
    }
    async save(){
        var companySave: CompanyDetail = this.formAdd.value as CompanyDetail
       await this.companyService.create(companySave).then(
            result => {  this.result = result as Result
            console.log(this.result)
           
            if(this.result){
                this.messageService.add({severity:"success",summary:"Successful", detail:"Company add successful"})
               }
               else{
                   this.messageService.add({severity:"error",summary:"Error", detail:"Company add fail"})
               }
            },
            err => console.log(err)
        )


    }

}