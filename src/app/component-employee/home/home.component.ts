import { Component, OnInit } from '@angular/core';
import { PoliciesonEmployee } from 'src/model/policiesonEmployee.model';
import { Policy } from 'src/model/policy.model';
import { PolicyRequestDetail } from 'src/model/policyRequestDetail.model';
import { TransactionDetail } from 'src/model/transactionDetail.model';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { PolicyService } from 'src/service/admin/policy.service';
import { PolicyApprovalDetailService } from 'src/service/admin/policyApprovalDetail.service';
import { PoliciesonEmployeeService } from 'src/service/admin/policyEmployee.service';
import { PolicyRequestDetailService } from 'src/service/admin/policyRequestDetail.service';
import { TransactionDetailService } from 'src/service/admin/transactionDetail.service';

@Component({
  selector:"home-demo",
    templateUrl: './home.component.html',
})
export class HomeEmployeeComponent implements OnInit {
  countPolicy:Number
  countPolicyEmployee:Number;
  totalMoney:Number;
  emi:Number;
  totalPolicyAldreadyAccept:Number;
  constructor(
    private policyRequestDetailService: PolicyRequestDetailService,
    private policyService: PolicyService,
    private empRegistersService: EmpRegisterService,
    private policyEployeeService: PoliciesonEmployeeService,
    private transactionService: TransactionDetailService,
  ) { }

  async ngOnInit(){
    await this.policyService.findAll().then(
      res=> { var countX = res as Policy[]
                this.countPolicy = countX.length
          }
    )
    await this.policyEployeeService.findByColEmpNo(parseInt(localStorage.getItem('id'))).then(
      res=> { var count = res as PoliciesonEmployee[]
              this.countPolicyEmployee = count.length
      }
     
    ) 
    await this.transactionService.moneyByColEmpNo(parseInt(localStorage.getItem('id'))).then(
      res=>{this.totalMoney = res as number
        console.log(this.totalMoney)
        console.log(res)
      }
    )
    await this.policyRequestDetailService.findByColEmpNo(parseInt(localStorage.getItem('id'))).then(
      res=> {
        var list = res as PolicyRequestDetail[]
        this.totalPolicyAldreadyAccept = list.filter(p=>p.status.toUpperCase().includes("ALREADY ACCEPTED")).length
      }
    )
  }

}
