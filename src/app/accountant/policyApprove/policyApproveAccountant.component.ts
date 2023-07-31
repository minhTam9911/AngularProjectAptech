import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, RouterPreloader } from "@angular/router";
import { ConfirmEventType, ConfirmationService, MessageService } from "primeng/api";
import { async } from "rxjs";
import { CompanyDetail } from "src/model/companyDetail.model";
import { EmpRegister } from "src/model/empRegister.model";
import { Hospital } from "src/model/hospitalInfo.model";
import { PoliciesonEmployee } from "src/model/policiesonEmployee.model";
import { Policy } from "src/model/policy.model";
import { PolicyApprovalDetail } from "src/model/policyApprovalDetail.model";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";
import { PolicyService } from "src/service/admin/policy.service";
import { PolicyApprovalDetailService } from "src/service/admin/policyApprovalDetail.service";
import { PoliciesonEmployeeService } from "src/service/admin/policyEmployee.service";
import { PolicyRequestDetailService } from "src/service/admin/policyRequestDetail.service";
import { Result } from "src/service/result.service";

@Component({
  templateUrl: './policyApproveAccountant.component.html',
})
export class PolicyApprovalAccountantComponent implements OnInit {
  result: Result;
  policyRequestDetails: PolicyRequestDetail[];
  policyRequestDetail: PolicyRequestDetail;
  policy: Policy
  policies: Policy[];
  hospital: Hospital;
  company: CompanyDetail
  formAdd: FormGroup;
  policyApproval: PolicyApprovalDetail[]
  resultShowData: PolicyApprovalDetail[]
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  visible: boolean = false;
  emp: EmpRegister
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private policyRequestDetailService: PolicyRequestDetailService,
    private router: Router ,
    private empRegisterService: EmpRegisterService,
    private policyService: PolicyService,
    private companyService: CompanyDetailService,
    private policyApprovalService: PolicyApprovalDetailService,
    private hospitalService: HospitalInforService,
    private policyEmployeeService: PoliciesonEmployeeService,
    private confirmationService : ConfirmationService
  ) { }

  ngOnInit() {
    this.policyRequestDetailService.findAll().then(
      (res) => {
        this.policyRequestDetails = res as PolicyRequestDetail[];
        console.log(this.policyRequestDetails);
      },
      (err) => {
        console.log(err);
      }
    );
    this.policyApprovalService.findAll().then(
      res => {
        this.policyApproval = res as PolicyApprovalDetail[];
        this.resultShowData = this.policyApproval
      },
      err => { console.log(err) }
    )
  }
  onTableSizeChange(evt: any) {
    this.tableSize = evt.target.value;
    this.page = 1;
    this.getAll();
  }
  onTableDataChange(evt: any) {
    this.page = evt;
    this.getAll();
  }
  async getAll() {
    await this.policyApprovalService.findAll().then(
      res => {
        this.policyApproval = res as PolicyApprovalDetail[];
        this.resultShowData = this.policyApproval
      },
      err => { console.log(err) }
    )
  }
  async getWaitingForApproval() {
    this.resultShowData = this.policyApproval.filter(pa => pa.status.toLowerCase().includes("waiting for approval"));
    await this.resultShowData;
  }
  async getRefuse() {
    this.resultShowData = this.policyApproval.filter(pa => pa.status.toLowerCase().includes("refuse"));
    await this.resultShowData;
  }
  async getAlreadyAccepted() {
    this.resultShowData = this.policyApproval.filter(pa => pa.status.toLowerCase().includes("already accepted"));
    await this.resultShowData;
  }

  async alreadyAccepted(id: any) {
    await this.policyApprovalService.findById(id).then(
      res => {
        var data: PolicyApprovalDetail = res as PolicyApprovalDetail;
        data.status = "Already Accepted"
        var formData = new FormData();
        formData.append("strPolicyApproval", JSON.stringify(data));
        this.policyApprovalService.update(formData).then(
          resPA => {
            var pa = resPA as boolean;
            if (pa) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: ' Policy Approval Detail Update successful',
              }); this.getAll()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Fail',
                detail: 'Update Policy Approval Detail Fail',
              });
            }
          }, errPA => console.error(errPA)
        )
        this.policyRequestDetailService.findById(data.requestId).then(
          res2 => {
            var data2 = res2 as PolicyRequestDetail;
            data2.status = "Already Accepted";
            var formdata2 = new FormData();
            formdata2.append("strPolicyRequest", JSON.stringify(data2));
            var data3 = new PoliciesonEmployee();
            data3.empNo = data2.empNo;
            data3.policyId = data2.policyId
            data3.policyName = data2.policyName;
            data3.policyStatus = false;
            data3.policyAmount = data2.policyAmount;
            data3.startDate = data.date;
            if (data3.policyDuration == null) {
              data3.policyDuration = 0;
            }
            data3.emi = data2.emi;
            data3.companyId = data2.companyId;
            data3.companyName = data2.companyName;
            this.policyRequestDetailService.update(formdata2).then(
              resPR => {
                var pr = resPR as boolean;
                if (pr) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: ' Policy Request Detail Update successful',
                  }); this.getAll()
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Fail',
                    detail: 'Update Policy Request Detail Fail',
                  });
                }
              }, errPr => console.error(errPr)
            )
            var formData3 = new FormData();
            formData3.append("strPoliciesonEmployee", JSON.stringify(data3))
            this.policyEmployeeService.create2(formData3).then(
              respe => {
                var pe = respe as boolean;
                if (pe) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: ' Add Policy Employee successful',
                  }); this.getAll()
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Fail',
                    detail: 'Add Policy Employee Fail',
                  });
                }
              }, errPE => console.error(errPE)
            )
          }, err1 => console.log(err1)
        )
      }, err2 => console.log(err2)
    )
  }
  async refuse(id: any) {
    await this.policyApprovalService.findById(id).then(
      res => {
        var data: PolicyApprovalDetail = res as PolicyApprovalDetail;
        data.status = "Refuse"
        var formData = new FormData();
        formData.append("strPolicyApproval", JSON.stringify(data));
        this.policyApprovalService.update(formData).then(
          resPA => {
            var pa = resPA as boolean;
            if (pa) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: ' Policy Approval Detail Update successful',
              }); this.getAll()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Fail',
                detail: 'Update Policy Approval Detail Fail',
              });
            }
          }, errPA => console.error(errPA)
        )

        this.policyRequestDetailService.findById(data.requestId).then(
          res2 => {
            var data2 = res2 as PolicyRequestDetail;
            data2.status = "Refuse";
            var formdata2 = new FormData();
            formdata2.append("strPolicyRequest", JSON.stringify(data2));
            this.policyRequestDetailService.update(formdata2).then(
              resPR => {
                var pr = resPR as boolean;
                if (pr) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: ' Policy Request Detail Update successful',
                  }); this.getAll()
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Fail',
                    detail: 'Update Policy Request Detail Fail',
                  });
                }
              }, errPr => console.error(errPr)
            )
          }, err1 => console.log(err1)
        )
      }, err2 => console.log(err2)
    )
  }
  async delete(id: any) {

    await this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.policyApprovalService.delete(id).then(
          res => {
            var pa = res as boolean;
            console.log(pa)
            if (pa) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Delete Policy Approval Detail successful',
              }); this.getAll()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Fail',
                detail: 'Delete Policy Approval Detail Fail',
              });
            }
          }, err => console.error(err)
        )
        
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
  selectStatus(evn: any) {
    var chooser = evn.target.value;
    if (chooser == 0) {
      this.getAll()
    }
    else if (chooser == 1) {
      this.getWaitingForApproval()
    } else if (chooser == 2) {
      this.getRefuse()
    } else {
      this.getAlreadyAccepted()
    }
  }
  detail(id: any) {
    this.visible=true
    this.policyRequestDetailService.findById(id).then(
      response => {
        this.policyRequestDetail = response as PolicyRequestDetail
        this.policyService.findById(this.policyRequestDetail.policyId as number).then(
          response1 => {
            this.policy = response1 as Policy
            this.empRegisterService.findById(this.policyRequestDetail.empNo as number).then(response0=>this.emp=response0 as EmpRegister)
            this.companyService.findById(this.policy.companyId).then(response2 => this.company = response2 as CompanyDetail)
            this.hospitalService.findById(this.policy.medicalid).then(response3 => this.hospital = response3 as Hospital)
          })

      })

  }
}
