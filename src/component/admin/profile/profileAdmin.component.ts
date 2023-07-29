import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { EmpRegister } from 'src/model/empRegister.model';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';

@Component({
    templateUrl: './profileAdmin.component.html',
})
export class ProfileAdminComponent implements OnInit{
  title = 'Health Insurance';
  displayMenu=false;
  displayEmpRegister  = false;
  displayPolicy=false;
  emp: EmpRegister
  constructor(private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private empService: EmpRegisterService) {
    
    sessionStorage.clear();
  }
    async ngOnInit(){
        await this.empService.findByUsername(localStorage.getItem("username")).then(
          res=>{
          this.emp = res as EmpRegister
        },err=>console.log(err))
    }
  
  
 
}
