import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

import { LoginService } from 'src/service/admin/login.service';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { EmpRegister } from 'src/model/empRegister.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/service/result.service';

@Component({
    templateUrl: './checkCodeChangePass.component.html',
})
export class VerifyCodeForgotAccountComponent implements OnInit {
    email: string;
    username: string;
    formVerify: FormGroup;
    id:string
    constructor(private messageService: MessageService, private router: Router,
        private empService: EmpRegisterService,
        private loginService: LoginService,
        private routeActive: ActivatedRoute,
        private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.formVerify = this.formBuilder.group({
            first: ["", Validators.required],
            second: ["", Validators.required],
            third: ["", Validators.required],
            fourth: ["", Validators.required],
            fifth: ["", Validators.required],
            sixth: ["", Validators.required]
        })
        this.routeActive.paramMap.subscribe(value => {
            var id = parseInt(value.get("id"));
            this.id=id.toString()
            this.empService.findById(id).then(
                res => {
                    var data = res as EmpRegister
                    this.email = data.email;
                    this.username = data.username
                    this.loginService.sendCodeForgot(this.email,this.username).then(
                        res => {
                            var result = res as Result
                            if (result) {
                                this.messageService.add({
                                    severity: 'warn', summary: 'Check Email', detail: 'Please check your email and enter the correct code to change your password.'
                                })
                            } else {
                                this.messageService.add({
                                    severity: 'error', summary: 'Send Email', detail: 'Sending password change code failed.'
                                })

                            }
                        },
                        err => { console.log(err); }
                    )
                },
                err => { console.log(err); }
            )
        }
        )
    }
    verify() {
        var dataNoUse = this.formVerify.value as any;
        var code = dataNoUse['first'] + dataNoUse['second'] + dataNoUse['third'] + dataNoUse['fourth'] + dataNoUse['fifth'] + dataNoUse['sixth']
        this.loginService.verify(this.email, code).then(
            res => {
                var result = res as Result;
                if (result) {
                    localStorage.setItem('id',this.id);
                    this.router.navigate(['/change-password']);
                } else {
                    this.messageService.add({
                        severity: 'error', summary: 'Invalid', detail: 'Your activation code does not match.'
                    })

                }
            }

        )
    }
    async reSend(){
       await this.loginService.sendCodeForgot(this.email,this.username).then(
            res => {
                var result = res as Result
                if (result) {
                    this.messageService.add({
                        severity: 'warn', summary: 'Check Email', detail: 'Please check your email and enter the correct code to change your password..'
                    })
                } else {
                    this.messageService.add({
                        severity: 'error', summary: 'Send Email', detail: 'Sending password change code failed.'
                    })

                }
            },
            err => { console.log(err); }
        )
    }

}
