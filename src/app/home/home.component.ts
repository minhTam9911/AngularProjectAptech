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
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { EmpRegister } from "src/model/empRegister.model";

@Component({
  selector:"app-root",
  templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {
  result: Result
  policies: Policy[];
  demoData:Policy[]
  formAdd: FormGroup; page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  visible: boolean = false;
  policyDetail:Policy;
  hospital:Hospital
  company:CompanyDetail
  totalPolicy: number =0;
  totalCompany: number = 0;
  totalHospital: number = 0;
  totalEmployees: number = 0 ;
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private empService: EmpRegisterService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private hospitalService: HospitalInforService,
    private companyService: CompanyDetailService,
    private policyService: PolicyService,
  ) { }


 async ngOnInit() {
    await this.getAll()
  }
 async getAll(){
    await this.policyService.findAll().then(
      res => {
        this.policies = res as Policy[];
        this.demoData = this.policies
        this.totalPolicy = this.policies.length
      },
      err => { console.log(err) }
    )
    await this.companyService.findAll().then(res=>{var list = res as CompanyDetail[]; this.totalCompany = list.length})
    await this.hospitalService.findAll().then(res=>{var list = res as HospitalInforService[]; this.totalHospital = list.length})
    await this.empService.findAll().then(res=>{var list = res as EmpRegister[]; this.totalEmployees = list.length})
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