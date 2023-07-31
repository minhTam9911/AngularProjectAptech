import { DatePipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetail } from 'src/model/companyDetail.model';
import { EmpRegister } from 'src/model/empRegister.model';
import { Hospital } from 'src/model/hospitalInfo.model';
import { PoliciesonEmployee } from 'src/model/policiesonEmployee.model';
import { Policy } from 'src/model/policy.model';
import { TransactionDetail } from 'src/model/transactionDetail.model';
import { CompanyDetailService } from 'src/service/admin/companyDetail.sevice';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { HospitalInforService } from 'src/service/admin/hospitalInfo.service';
import { PolicyService } from 'src/service/admin/policy.service';
import { PoliciesonEmployeeService } from 'src/service/admin/policyEmployee.service';
import { TransactionDetailService } from 'src/service/admin/transactionDetail.service';

@Component({
    templateUrl: './transaction.component.html',
})
export class TransactionAccountantComponent implements OnInit {
    policyEmp: PoliciesonEmployee
    empRegister: EmpRegister;
    policy: Policy
    hospital:Hospital;
    company: CompanyDetail
    form: FormGroup
    empNo:Number=0
    emi:number=0
    totalMonth:number=0
    totalAmount:number =0
    startDate:String
    endDate:String
    futureDate:Date;
    dateNow:string;
    currentDate = new Date();
    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
 //       private policyRequestDetailService: PolicyRequestDetailService,
        private router: Router ,
        private empRegisterService: EmpRegisterService,
        private policyService: PolicyService,
        private companyService: CompanyDetailService,
//      private policyApprovalService: PolicyApprovalDetailService,
        private hospitalService: HospitalInforService,
        private policyEmployeeService: PoliciesonEmployeeService,
        private confirmationService : ConfirmationService,
        private transactionService: TransactionDetailService
      ) { }
    ngOnInit(){
       
        this.startDate = new DatePipe('en-US').transform(this.currentDate, 'dd-MM-yyyy');
        //this.dateNow = this.currentDate.getDate()+'-'+(this.currentDate.getMonth()+1)+'-'+this.currentDate.getFullYear()
        this.form = this.formBuilder.group({
            empNo:[this.empNo,Validators.required],
            transactionDate:[this.startDate,Validators.required],
            amount:[this.totalAmount,Validators.required],
            policyEmployeeId:["",Validators.required],
            accountantId:[localStorage.getItem('id'),Validators.required]
        })
    }
    save(){
        
        if(this.totalAmount>0){
            var formData = new FormData();
            var data = this.form.value as TransactionDetail
            data.empNo = this.empNo;
            data.amount = this.totalAmount
            
            formData.append("strTransaction",JSON.stringify(data));
            this.transactionService.create2(formData).then(
                res=>{
                    var result = res as boolean;
                    if(result){
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payment success.' });
                        this.policyEmployeeService.findById(data.policyEmployeeId as number).then(
                            res2=>{
                                var response2 = res2 as PoliciesonEmployee
                                
                                    response2.startDate = data.transactionDate
//                                    var strEnd = this.futureDate.getDate()+'-'+(this.futureDate.getMonth()+1)+'-'+this.futureDate.getFullYear()
                                    response2.endDate = this.endDate;
                                    response2.policyStatus = true
                                    response2.policyDuration += (this.totalMonth *30)
                                    var data2 = new FormData()
                                    data2.append("strpoliciesonEmployee",JSON.stringify(response2))
                                    console.log(response2)
                                    this.policyEmployeeService.update2(data2).then(
                                        res=>console.log(res),
                                        err=>console.log(err)
                                    )
                            }
                        )
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Errorr', detail: 'Payment Fail.' });
                    }
                },err=>{console.log(err);}
            )
        }else{
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Pay amount must be over 0 $' });
        }
    }
    async findPolicyEmp(evn:any){
       await this.policyEmployeeService.findById(evn.target.value).then(
            result =>{this.policyEmp = result as PoliciesonEmployee
                if(this.policyEmp !=null){
                    console.log(this.policyEmp.empNo)
                    this.empNo = this.policyEmp.empNo
                    this.emi = this.policyEmp.emi as number
                    this.startDate = this.policyEmp.startDate 
                    this.endDate = this.policyEmp.endDate
                }else{
                    this.empNo = 0
                    this.emi = 0
                    this.startDate = null 
                    this.endDate = null
                    this.messageService.add({ severity: 'warn', summary: 'Waring', detail: 'Policy Employee not found!!!' });
                }
               
            },err=>{console.log(err)}
        )
    }
    totalMouth(evn:any){
        this.totalMonth = evn.target.value as number
        this.totalAmount = this.totalMonth * this.emi
        this.futureDate = new Date(this.currentDate.getTime() + (30 * 24 * 60 * 60 * 1000 * this.totalMonth));
       // var strEnd = this.futureDate.getDate()+'-'+(this.futureDate.getMonth()+1)+'-'+this.futureDate.getFullYear()
        this.endDate = new DatePipe('en-US').transform(this.futureDate, 'dd-MM-yyyy');
        
        console.log(this.startDate)
    }
    
}
