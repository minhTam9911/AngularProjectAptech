import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PoliciesonEmployee } from 'src/model/policiesonEmployee.model';
import { Policy } from 'src/model/policy.model';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { PolicyService } from 'src/service/admin/policy.service';
import { PoliciesonEmployeeService } from 'src/service/admin/policyEmployee.service';
import { PolicyRequestDetailService } from 'src/service/admin/policyRequestDetail.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashBoardForEmployeeComponent  implements OnInit {
  title = 'Health Insurance';
  displayMenu=false;
  displayEmpRegister  = false;
  displayPolicy=false;
  countPolicy:Number
  countPolicyEmployee:Number;
  totalMoney:Number;
  emi:Number;
  constructor(private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private policyRequestDetailService: PolicyRequestDetailService,
    private policyService: PolicyService,
    private empRegistersService: EmpRegisterService,
    private policyEployeeService: PoliciesonEmployeeService){
   
  }
  ngOnInit(): void {
    this.policyService.findAll().then(
      res=> { var countX = res as Policy[]
                this.countPolicy = countX.length
          }
    )
    this.policyEployeeService.findByColEmpNo(parseInt(localStorage.getItem('id'))).then(
      res=> { var count = res as PoliciesonEmployee[]
              this.countPolicyEmployee = count.length
      }
    )
  }
  
  menuDisplay(){
    
  }
  logout(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted' });
          localStorage.removeItem("id")
          localStorage.removeItem("role");
          localStorage.removeItem("username");
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
