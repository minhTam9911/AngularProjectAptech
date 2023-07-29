import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  form: FormGroup;
constructor(private formBuilder: FormBuilder, private messageService: MessageService,
        private authService: AuthService, private router: Router
  ){
  
}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username : ["", Validators.required],
      password : ["", Validators.required],
      email:["", Validators.required],
      gender:["", Validators.required],
      role:["User", Validators.required],
      status:[false]
    })
  }
  proccessRegister(){
    if(this.form.valid){
      this.authService.processRegister(this.form.value).then(
        res=>{ var result = res as boolean;
          console.log(result);
          console.log(this.form.value)
          if(result){
            this.messageService.add({severity:"success",summary:"Successful", detail:"Add register successful"});
            this.router.navigate(['/login-user']);
          }else{
            this.messageService.add({severity:"error",summary:"Error", detail:"Register add fail"})
          } 
      },err =>console.log(err)
      
      )
    }else{
           this.messageService.add({severity:"error",summary:"Error", detail:"Register add fail"})
    }
  }

}
