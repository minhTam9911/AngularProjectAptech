import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { EmpRegister } from "src/model/empRegister.model";
import { Policy } from "src/model/policy.model";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { PolicyService } from "src/service/admin/policy.service";
import { PolicyRequestDetailService } from "src/service/admin/policyRequestDetail.service";

@Component({
  templateUrl: './addPolicyRequest.component.html',
})
export class AddPolicyRequestDetailComponent implements OnInit {
  result: boolean;
  id: number;
  policy: Policy[];
  policyRequestDetail: PolicyRequestDetail[];
  formAdd: FormGroup;
  policyName: string
  companyId: number;
  companyName: string;
  emi: number;
  policyAmount: number
  dataOnRead: Policy
  emp: EmpRegister[]
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private policyRequestDetailService: PolicyRequestDetailService,
    private policyService: PolicyService,
    private empRegistersService: EmpRegisterService
  ) { }

  ngOnInit(): void {
    this.policyService.findAll().then(
      (res) => {
        this.policy = res as Policy[];
        console.log(this.policy);
      },
      (err) => {
        console.log(err);
      }
    );
    this.empRegistersService.findAll().then(res => { this.emp = res as EmpRegister[] })
    this.formAdd = this.formBuilder.group({
      policyId: ['', [Validators.required]],
      policyName: [this.policyName, [Validators.required]],
      policyAmount: [this.policyAmount, [Validators.required]],
      emi: [this.emi, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      companyName: [this.companyName, [Validators.required]],
      requestDate: ['', Validators.required],
      empNo: ['', Validators.required],
      status: ["Waiting for approval"],

      //Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
    });
  }
  async save() {
    var policyRequestDetailSave: PolicyRequestDetail = this.formAdd
      .value as PolicyRequestDetail;
    console.log(policyRequestDetailSave);
    var data = new FormData();
    data.append(
      'strPolicyRequest',
      JSON.stringify(policyRequestDetailSave)
    );
    console.log(data);
    await this.policyRequestDetailService.create(data).then(
      (result) => {
        this.result = result as boolean;
        if (this.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: ' Policy Request Detail Add successful',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Fail',
            detail: 'Add Policy Request Fail',
          });
        }
      },
      (err) => console.log(err)
    );
  }
  async selectedPolicy(evn: any) {
    var policyId = parseInt(evn.target.value);
    await this.policyService.findById(policyId).then(
      res => {
        this.dataOnRead = res as Policy
        this.companyId = this.dataOnRead.companyId
        this.companyName = this.dataOnRead.companyName
        this.policyName = this.dataOnRead.policyName
        this.emi = this.dataOnRead.emi
        this.policyAmount = this.dataOnRead.amount
      }, err => console.log(err)
    )
  }
}
