import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { LoginAdminComponent } from '../login/login.component';
import { LoginService } from 'src/service/admin/login.service';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { EmpRegister } from 'src/model/empRegister.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/service/result.service';

@Component({
    templateUrl: './acctiveAccount.component.html',
})
export class AcctiveAccountComponent implements OnInit {
    email: string;
    formVerify: FormGroup;
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
            this.empService.findById(id).then(
                res => {
                    var data = res as EmpRegister
                    this.email = data.email;
                    this.loginService.sendCode(this.email).then(
                        res => {
                            var result = res as Result
                            if (result) {
                                this.messageService.add({
                                    severity: 'warn', summary: 'Check Email', detail: 'Please check your email, and enter the code to activate your account.'
                                })
                            } else {
                                this.messageService.add({
                                    severity: 'error', summary: 'Send Email', detail: 'Activation code sent failed.'
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
                    this.router.navigate(['/login']);
                } else {
                    this.messageService.add({
                        severity: 'error', summary: 'Invalid', detail: 'Your activation code does not match.'
                    })

                }
            }

        )
    }
    reSend(){
        this.loginService.sendCode(this.email).then(
            res => {
                var result = res as Result
                if (result) {
                    this.messageService.add({
                        severity: 'warn', summary: 'Check Email', detail: 'Please check your email, and enter the code to activate your account.'
                    })
                } else {
                    this.messageService.add({
                        severity: 'error', summary: 'Send Email', detail: 'Activation code sent failed.'
                    })

                }
            },
            err => { console.log(err); }
        )
    }

}
