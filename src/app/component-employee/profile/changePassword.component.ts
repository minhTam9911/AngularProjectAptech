import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Account } from "src/model/account.model";
import { EmpRegister } from "src/model/empRegister.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { LoginService } from "src/service/admin/login.service";

@Component({
    templateUrl: './changePassword.component.html'
})


export class ChangeForgotPasswordComponent implements OnInit {
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
            username:localStorage.getItem('username'),
            password:["",Validators.required],
            newPassword: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]],
            confirmPassword: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]],
        })  
    }
     save(){
        var data = this.formNewPass.value as any;
        var formData = new FormData();
        formData.append("data",JSON.stringify(data));
        var newPass = data['newPassword']
        var confirmPass = data['confirmPassword'];
        this.loginService.processLogin(formData).then(
            response => {
                if(response!=null) {
                    if(newPass == confirmPass){
                        this.loginService.changePassword(localStorage.getItem('id'),newPass);
                        this.router.navigate(['/employee']);
                    }else{
                        this.messageService.add({
                            severity: 'error', summary: 'Invalid', detail: 'New password and confirm password do not match.'
                        }) 
                    }
                }else{
                    this.messageService.add({
                        severity: 'error', summary: 'Invalid', detail: 'Old password do not match.'
                    }) 
                }
            }
        )
        
     }

}