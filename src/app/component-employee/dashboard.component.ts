import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashBoardForEmployeeComponent  {
  title = 'Health Insurance';
  displayMenu=false;
  displayEmpRegister  = false;
  displayPolicy=false;

  constructor(private router: Router,private confirmationService: ConfirmationService, private messageService: MessageService){
    sessionStorage.clear();
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
