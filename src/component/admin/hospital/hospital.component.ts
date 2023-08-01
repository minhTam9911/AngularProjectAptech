import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { HospitalInforService } from "src/service/admin/hospitalInfo.service";
import { Hospital } from "src/model/hospitalInfo.model";

@Component({
  templateUrl: './hospital.component.html'
})


export class HospitalAdminComponent implements OnInit {
  result: Result
  hospitales: Hospital[];
  demoData:Hospital[]
  formAdd: FormGroup;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private hospitalService: HospitalInforService,
    private router: Router,
    private confirmationService : ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.hospitalService.findAll().then(
      res => {
        this.hospitales = res as Hospital[];
        this.demoData = this.hospitales
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
       this.hospitalService.delete(id).then(
          res => {
              this.result = res as Result
              console.log(res)
             if (this.result) {
              this.messageService.add({ severity: "success", summary: "Delete Hospital Detail", detail: "Delete Hospital Successful" });
              this.hospitalService.findAll().then(
                res => {
                  this.hospitales = res as Hospital[];
                  console.log(this.hospitales);
          
                },
                err => { console.log(err) }
              )
            }
            else {
              this.messageService.add({ severity: "error", summary: "Delete Hospital Detail", detail: "Delete Hospital Fail" });
    
            }
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
    this.router.navigate(["/admin/update-hospital", { hospitalId: id }])
  }
  searchName(evn:any){
    var keyword = evn.target.value;
    if(keyword==null){
      this.getAll()
    }else{
      this.hospitales = this.demoData.filter(p=>p.hospitalName.toLowerCase().includes(keyword.toLowerCase()))
    }
  }
}