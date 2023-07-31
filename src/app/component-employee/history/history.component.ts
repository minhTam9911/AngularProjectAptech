import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { EmpRegister } from "src/model/empRegister.model";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";
import { Policy } from "src/model/policy.model";
import { TransactionDetail } from "src/model/transactionDetail.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { PolicyService } from "src/service/admin/policy.service";
import { PoliciesonEmployeeService } from "src/service/admin/policyEmployee.service";
import { TransactionDetailService } from "src/service/admin/transactionDetail.service";

@Component({
    templateUrl: './history.component.html',
})
export class HistoryComponent  implements OnInit {
    history: TransactionDetail[];
    policyEmploye: PoliciesonEmployee
    emp:EmpRegister
    policy:Policy
    constructor(
        private messageService: MessageService,
        private empRegisterService: EmpRegisterService,
        private policyService: PolicyService,
        private policyEmployeeService: PoliciesonEmployeeService,
        private confirmationService : ConfirmationService,
        private transactionService: TransactionDetailService
      ) { }
    ngOnInit(){
       this.transactionService.findByColEmpNo(parseInt(localStorage.getItem('id'))).then(
        res=>{
            this.history = res as TransactionDetail[];
            console.log(res)
            this.empRegisterService.findById(parseInt(localStorage.getItem('id'))).then(
                res2=>this.emp = res2 as EmpRegister
            )
        }
       )
    }
}