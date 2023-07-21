import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/model/account.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { LoginService } from "src/service/admin/login.service";

@Component({
    templateUrl: './login.component.html'
})


export class LoginAdminComponent implements OnInit {
    formLogin: FormGroup
    constructor(private router: Router,
            private employeeService: EmpRegisterService,
            private formBuilder: FormBuilder,
        private loginService: LoginService
            ){

    }
    ngOnInit(): void {   
        this.formLogin = this.formBuilder.group({
            username:['', Validators.required],
            password:['', Validators.required]
        })  
    }
     login(){
        var abc = this.formLogin.value as Account;

        localStorage.setItem("token",Math.random().toString());
        localStorage.setItem("username",abc.username)
        sessionStorage.setItem("usernameId","123")
        this.router.navigate(['/admin']);
    }

}