import { Component, OnInit } from '@angular/core';
import { PoliciesonEmployee } from 'src/model/policiesonEmployee.model';
import { Policy } from 'src/model/policy.model';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { PolicyService } from 'src/service/admin/policy.service';
import { PolicyApprovalDetailService } from 'src/service/admin/policyApprovalDetail.service';
import { PoliciesonEmployeeService } from 'src/service/admin/policyEmployee.service';
import { PolicyRequestDetailService } from 'src/service/admin/policyRequestDetail.service';

@Component({
    templateUrl: './home.component.html',
})
export class HomeEmployeeComponent implements OnInit {
  countPolicy:Number
  countPolicyEmployee:Number;
  totalMoney:Number;
  emi:Number;
  constructor(
    private policyRequestDetailService: PolicyRequestDetailService,
    private policyService: PolicyService,
    private empRegistersService: EmpRegisterService,
    private policyEployeeService: PoliciesonEmployeeService
  ) { }

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

}
