import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Account } from "src/model/account.model";
import { EmpRegister } from "src/model/empRegister.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { LoginService } from "src/service/admin/login.service";

@Component({
    templateUrl: './changePasswordEmpRegister.component.html'
})


export class ChangeForgotPasswordAdminComponent implements OnInit {
    formNewPass: FormGroup
    constructor(private router: Router,
            private employeeService: EmpRegisterService,
            private formBuilder: FormBuilder,
        private loginService: LoginService,
        private messageService: MessageService
            ){

    }
    ngOnInit(): void {   
        this.formNewPass=this.formBuilder.group({
            password: ["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]],
            confirmPassword: ["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]],
        })  
    }
     save(){
        var data = this.formNewPass.value as any;
        var newPass = data['password']
        var confirmPass = data['confirmPassword'];
        if(newPass == confirmPass){
            this.loginService.changePassword(localStorage.getItem('id'),newPass);
            localStorage.clear();
            this.router.navigate(['/login']);
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Invalid', detail: 'New password and confirm password do not match.'
            }) 
        }
     }

}