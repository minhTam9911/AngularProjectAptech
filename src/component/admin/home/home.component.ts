import { Component, OnInit } from '@angular/core';
import { CompanyDetail } from 'src/model/companyDetail.model';
import { EmpRegister } from 'src/model/empRegister.model';
import { Hospital } from 'src/model/hospitalInfo.model';
import { Policy } from 'src/model/policy.model';
import { PolicyRequestDetail } from 'src/model/policyRequestDetail.model';
import { CompanyDetailService } from 'src/service/admin/companyDetail.sevice';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { HospitalInforService } from 'src/service/admin/hospitalInfo.service';
import { PolicyService } from 'src/service/admin/policy.service';
import { PolicyRequestDetailService } from 'src/service/admin/policyRequestDetail.service';
import { TransactionDetailService } from 'src/service/admin/transactionDetail.service';

@Component({
    templateUrl: './home.component.html',
})

export class HomeAdminComponent implements OnInit {
  totalCompnay: Number = 0;
  totalHospital: Number =0;
  totalPolicy: Number = 0;
  totalAccountant: Number = 0;
  totalMember: Number = 0;
  totalRequetWaiting: Number = 0;
  totalRequetRefuse:Number = 0;
  totalMoney: Number = 0;
  constructor(    
    private policyRequestDetailService: PolicyRequestDetailService,
    private policyService: PolicyService,
    private empRegistersService: EmpRegisterService,
    private hospital: HospitalInforService,
    private companyService: CompanyDetailService,
    private transactionService: TransactionDetailService,){

  }
  async ngOnInit(){
    await this.companyService.findAll().then(company=>{
      var list = company as CompanyDetail[]
        this.totalCompnay = list.length
    })
    await this.hospital.findAll().then(res=>{
      var list = res as Hospital[]
        this.totalHospital = list.length
    })
    await this.policyService.findAll().then(res=>{
      var list = res as Policy[]
        this.totalPolicy = list.length
    })
    await this.empRegistersService.findAll().then(res=>{
      var list = res as EmpRegister[]
        this.totalAccountant = list.filter(a=>a.designation=="Accountant").length
        this.totalMember = list.filter(a=>a.designation=="Employee").length
    })
    await this.policyRequestDetailService.findAll().then(res=>{
      var list = res as PolicyRequestDetail[]
        this.totalRequetWaiting = list.filter(a=>a.status.toLowerCase().includes("waiting")).length
        this.totalRequetRefuse = list.filter(a=>a.status.toLowerCase().includes("refuse")).length
    })
    await this.transactionService.moneyAll().then(res=>{
        this.totalMoney = res as number
    })
  }
  
}
