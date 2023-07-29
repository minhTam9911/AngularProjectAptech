import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  responseData:any
  isRegister : boolean = false;
  updateData:any;
  constructor(private router: Router, 
          private formBuilder: FormBuilder,
          private messageService: MessageService,
          private authService : AuthService
          ){}
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
  })  
  }
  proccessLogin(){
    if(this.formLogin.valid){
      this.authService.getByCode(this.formLogin.value['username']).then(
        res=>{
          this.updateData=res
         if(this.updateData['password']===this.formLogin.value['password']){
          if(this.updateData['status']){
            this.messageService.add({severity:"success",summary:"Successful",detail:"Login Succesful"})
            sessionStorage.setItem("username",this.updateData['userName'])
            sessionStorage.setItem("role",this.updateData['role'])
            this.router.navigate(['/home'])
          }else{
            this.messageService.add({severity:"warn",summary:"Waring",detail:"Is active account"})
          }
          
         }else{
          this.messageService.add({severity:"error",summary:"Fail",detail:"Login Fail"})
         }
        },err=>console.log(err)
      )
    }
  }
}
