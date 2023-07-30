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

@Component({
  templateUrl: './policy.component.html'
})


export class PolicyComponentEmployee implements OnInit {
  result: Result
  policies: Policy[];
  formAdd: FormGroup; page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  visible: boolean = false;
  policy:Policy;
  hospital:Hospital
  company:CompanyDetail
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private policyService: PolicyService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.policyService.findAll().then(
      res => {
        this.policies = res as Policy[];
        console.log(this.policies)
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
  async detail(id: any){
    this.visible = true;
    this.policyService.findById(id).then(
      res=>this.policy = res as Policy,
      error=>console.log(error)
    )
  }
}