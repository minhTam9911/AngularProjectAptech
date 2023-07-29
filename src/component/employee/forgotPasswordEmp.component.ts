import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Account } from "src/model/account.model";
import { EmpRegister } from "src/model/empRegister.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { LoginService } from "src/service/admin/login.service";

@Component({
    templateUrl: './forgotPasswordEmp.component.html'
})


export class ForgotPasswordAdminComponent implements OnInit {
    formForgot: FormGroup
    responseData:any
    isRegister : boolean = false;
    constructor(private router: Router,
            private employeeService: EmpRegisterService,
            private formBuilder: FormBuilder,
        private loginService: LoginService,
        private messageService: MessageService
            ){

    }
    ngOnInit(): void {   
        this.formForgot=this.formBuilder.group({
            email:['', Validators.required],
            username:['', Validators.required]
        })  
    }
     forgot(){
       var data = this.formForgot.value as any ;
       var email = data['email'];
       var username = data['username'];
       this.loginService.checkExistEmailAndUsername(email, username).then(
        res=> {
            var result = res as boolean;
            console.log(res);
            if(result){
                this.employeeService.findByUsername(username).then(
                    res1=> {
                        var dataFind = res1 as EmpRegister
                        this.router.navigate(['/verify-check-code',{id:dataFind.empNo}]);
                    },err=> {console.log(err);}
                ) 
            }else{
                this.messageService.add({
                    severity: 'error', summary: 'Error', detail: 'Username and email do not match or do not exist.'
                })

            }
        },err=> console.log(err)
       );
     }
    

}