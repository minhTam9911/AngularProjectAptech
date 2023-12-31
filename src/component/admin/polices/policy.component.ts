import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { Policy } from "src/model/policy.model";
import { PolicyService } from "src/service/admin/policy.service";
import { Hospital } from "src/model/hospitalInfo.model";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";

@Component({
  templateUrl: './policy.component.html'
})


export class PolicyAdminComponent implements OnInit {
  result: Result
  policies: Policy[];
  formAdd: FormGroup;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  visible: boolean = false;
  policyDetail:Policy;
  hospital:Hospital
  company:CompanyDetail
  demoData:Policy[]
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private policyService: PolicyService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private hospitalService: HospitalInforService,
    private companyService: CompanyDetailService,
  ) { }


  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.policyService.findAll().then(
      res => {
        this.policies = res as Policy[];
        this.demoData = this.policies
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
  async delete(id: number) {


    await this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.policyService.delete(id).then(
          result => {
            this.result = result as Result
          },
          err => { console.log(err) }
        )
        if (this.result) {
          this.messageService.add({ severity: "success", summary: "Delete Policy", detail: "Delete Policy Successful" });
        }
        else {
          this.messageService.add({ severity: "error", summary: "Delete Policy", detail: "Delete Policy Fail" });

        }
        this.policyService.findAll().then(
          res => {
            this.policies = res as Policy[];
            console.log(this.policies);

          },
          err => { console.log(err) }
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
  update(id: number) {
    this.router.navigate(["/admin/update-policy", { policyId: id }])
  }
  async detail(id: any){
    this.visible = true;
    this.policyService.findById(id).then(
      res=>{this.policyDetail = res as Policy;
            this.hospitalService.findById(this.policyDetail.medicalid).then(
              res1=>
              this.hospital = res1 as Hospital
            )
            this.companyService.findById(this.policyDetail.companyId).then(
              res2=>
              this.company = res2 as CompanyDetail
            )
      },
      error=>console.log(error)
    )
  }
  searchName(evn:any){
    var keyword = evn.target.value;
    if(keyword==null){
      this.getAll()
    }else{
      this.policies = this.demoData.filter(p=>p.policyName.toLowerCase().includes(keyword.toLowerCase()))
    }
  }
}