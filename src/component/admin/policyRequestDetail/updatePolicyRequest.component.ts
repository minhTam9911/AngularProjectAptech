import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { EmpRegister } from "src/model/empRegister.model";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";
import { Policy } from "src/model/policy.model";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { PolicyService } from "src/service/admin/policy.service";
import { PolicyRequestDetailService } from "src/service/admin/policyRequestDetail.service";

@Component({
    templateUrl: './updatePolicyRequest.Component.html',
  })
  export class UpdatePolicyRequestDetailsComponent implements OnInit {
    result: string;
    policyRequestDetail: PolicyRequestDetail;
    formAdd: FormGroup;
    policyName: string
    companyId: any;
    companyName: string;
    emi:any;
    policyAmount: any
    dataOnRead: Policy
    dataUpdate: PoliciesonEmployee
    policy: Policy[];
    emp: EmpRegister[]
    constructor(
      private formBuilder: FormBuilder,
      private messageService: MessageService,
      private policyRequestDetailService: PolicyRequestDetailService,
      private routerAcive : ActivatedRoute,
      private policyService: PolicyService,
      private employeeService: EmpRegisterService,
      ) {}
  
    ngOnInit(): void {
        this.policyService.findAll().then(
            res => this.policy = res as Policy[],
            err => console.log(err))
        this.employeeService.findAll().then(
            res => this.emp = res as EmpRegister[],
            err => console.log(err))
        
      this.routerAcive.paramMap.subscribe( value=> {
          var id = parseInt(value.get('requestId'));
          this.policyRequestDetailService.findById(id).then(
             res =>{
                 this.policyRequestDetail = res as PolicyRequestDetail
                 this.companyId = this.policyRequestDetail.companyId
                 this.companyName = this.policyRequestDetail.companyName.toString()
                 this.policyName = this.policyRequestDetail.policyName.toString()
                 this.policyAmount = this.policyRequestDetail.policyAmount
                 this.emi = this.policyRequestDetail.emi
                 console.log(this.policyRequestDetail)
                 this.formAdd = this.formBuilder.group({
                  requestId:[this.policyRequestDetail.requestId],
                  policyId: [this.policyRequestDetail.policyId, [Validators.required]],
                  policyName: [this.policyName, [Validators.required]],
                  policyAmount: [this.policyAmount, [Validators.required]],
                  emi: [this.emi, [Validators.required]],
                  companyId: [this.companyId, [Validators.required]],
                  companyName: [this.companyName, [Validators.required]],
                  requestDate: [this.policyRequestDetail.requestDate,[Validators.required] ],
                  empNo: [this.policyRequestDetail.empNo, [Validators.required]],
                  status: [this.policyRequestDetail.status],
            
               
                  //Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
                });
  
             },err =>{console.log(err)}
          )
     }
     )
      this.policyRequestDetailService.findAll().then(
        (res) => {
          this.policyRequestDetail = res as PolicyRequestDetail;
          console.log(this.policyRequestDetail);
        },
        (err) => {
          console.log(err);
        }
      );
      
    }
    async save() {
      var policyRequestDetailSave: PolicyRequestDetail = this.formAdd.value as PolicyRequestDetail;
      console.log(policyRequestDetailSave);
      var data = new FormData();
      data.append('strPolicyRequest', JSON.stringify(policyRequestDetailSave));
      console.log(data);
      await this.policyRequestDetailService.update(data).then(
        (result) => {
          var res = result as boolean;
          console.log(this.result);
          console.log(policyRequestDetailSave);
          console.log(result);
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Update PolicyRequestDetail ',
              detail: ' Policy Request Detail update successful',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Update PolicyRequestDetail',
              detail: 'Policy Request Detail update fail. ' + String(this.result['result']),
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
                this.companyName=this.dataOnRead.companyName
                this.policyName = this.dataOnRead.policyName
                this.emi = this.dataOnRead.emi
                this.policyAmount = this.dataOnRead.amount
            },err => console.log(err)
        )
    }
  }
  