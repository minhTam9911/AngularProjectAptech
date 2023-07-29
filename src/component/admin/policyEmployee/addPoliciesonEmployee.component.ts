import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import { MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Policy } from "src/model/policy.model";
import { EmpRegister } from "src/model/empRegister.model";
import { PolicyService } from "src/service/admin/policy.service";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";
import { PoliciesonEmployeeService } from "src/service/admin/policyEmployee.service";

@Component({
    templateUrl: './addPoliciesonEmployee.component.html'
})


export class AddPoliciesonEmployeeAdminComponent implements OnInit {
    result: Result
    policy: Policy[];
    emp: EmpRegister[]
    formAdd: FormGroup;
    policyName: string
    companyId: number;
    companyName: string;
    emi:number;
    policyAmount: number
    dataOnRead: Policy
    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private policyService: PolicyService,
        private employeeService: EmpRegisterService,
        private policiesonEmpservice: PoliciesonEmployeeService
    ) { }

    ngOnInit(): void {
        this.policyService.findAll().then(
            res => this.policy = res as Policy[],
            err => console.log(err))
        this.employeeService.findAll().then(
            res => this.emp = res as EmpRegister[],
            err => console.log(err))
        this.formAdd = this.formBuilder.group({
            empNo: ["", Validators.required],
            policyId: ["", Validators.required],
            policyName: [this.policyName, Validators.required],
            policyStatus: [false],
            policyAmount: [this.policyAmount, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
            policyDuration: ["", [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
            emi: [this.emi, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
            companyId: [this.companyId, Validators.required],
            companyName: [this.companyName, Validators.required]

        })
    }
    async save() {
        var policyEmp: PoliciesonEmployee = this.formAdd.value as PoliciesonEmployee
        // var data = new FormData()
        // data.append("strPolicyEmp",JSON.stringify(policyEmp))
        await this.policiesonEmpservice.create(policyEmp).then(
            result => {
                this.result = result as Result
                console.log(this.result)

                if (this.result) {
                    this.messageService.add({ severity: "success", summary: "Successful", detail: "Policy Employe add successful" })
                }
                else {
                    this.messageService.add({ severity: "error", summary: "Error", detail: "Policy Employee add fail" })
                }
            },
            err => console.log(err)
        )
    }
    async selectedPolicy(evn: any) {
        var policyId = parseInt(evn.target.value);
        await this.policyService.findById(policyId).then(
            res => {
                this.dataOnRead = res as Policy
                this.companyId = this.dataOnRead.companyId
                this.companyName=this.dataOnRead.companyName
                this.policyName = this.dataOnRead.policyName
                this.emi = this.dataOnRead.emi
                this.policyAmount = this.dataOnRead.amount
            },err => console.log(err)
        )
    }
}