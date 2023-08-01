import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetail } from 'src/model/companyDetail.model';
import { Hospital } from 'src/model/hospitalInfo.model';
import { Policy } from 'src/model/policy.model';
import { PolicyRequestDetail } from 'src/model/policyRequestDetail.model';
import { CompanyDetailService } from 'src/service/admin/companyDetail.sevice';
import { HospitalInforService } from 'src/service/admin/hospitalInfo.service';
import { PolicyService } from 'src/service/admin/policy.service';
import { PolicyRequestDetailService } from 'src/service/admin/policyRequestDetail.service';

@Component({
  templateUrl: './dashboardAccountant.component.html',
})
export class DashBoardAccountantComponent implements OnInit {
  title = 'Health Insurance';
  displayMenu = false;
  displayEmpRegister = false;
  displayPolicy = false;
  totalCompnay: Number = 0;
  totalHospital: Number = 0;
  totalPolicy: Number = 0;
  totalRequetWaiting: Number = 0;
  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,
    private policyRequestDetailService: PolicyRequestDetailService,
    private policyService: PolicyService,
    
    private hospital: HospitalInforService,
    private companyService: CompanyDetailService,
    
    ) {
    sessionStorage.clear();
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
    await this.policyRequestDetailService.findAll().then(res=>{
      var list = res as PolicyRequestDetail[]
        this.totalRequetWaiting = list.filter(a=>a.status.toLowerCase().includes("waiting")).length
       
    })
  }

  menuDisplay() {

  }
  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted' });
        localStorage.clear()
        this.router.navigate(['/login']);
      },
      reject: (type) => {
        var typeS = type as ConfirmEventType
        switch (typeS) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
}
