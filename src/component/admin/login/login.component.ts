import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Account } from "src/model/account.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { LoginService } from "src/service/admin/login.service";

@Component({
    templateUrl: './login.component.html'
})


export class LoginAdminComponent implements OnInit {
    formLogin: FormGroup
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
        this.formLogin = this.formBuilder.group({
            username:['', Validators.required],
            password:['', Validators.required]
        })  
    }
     login(){
        var abc = this.formLogin.value as Account;
        var data = new FormData();
        data.append("data",JSON.stringify(abc));
        this.loginService.processLogin(data).then(
            res=>{
                console.log(res)
                this.responseData = res ;
                console.log(this.responseData)
                if(this.responseData != null){
                     if(this.responseData['status']){
                         localStorage.setItem('username', this.responseData['username'])
                         localStorage.setItem('role', this.responseData['role'])
                        this.router.navigate(['/admin'])
                     }else{
                        //this.router.navigate(['/login-user'])
                         this.router.navigate(['/active-employee',{id:this.responseData['id']}])
                     }
                    
                }else{
                    this.messageService.add({
                        severity: 'error', summary: 'Fail', detail: 'UserName or Password invalid'
                    })
                }
                
            },err=>{console.log(err)
                
                this.messageService.add({
                    severity: 'error', summary: 'Fail', detail: err['error']['result']
                })
            }
        );

        //localStorage.setItem("token",Math.random().toString());
       // localStorage.setItem("username",abc.username)
        //sessionStorage.setItem("usernameId","123")
        //this.router.navigate(['/admin']);
    }

}