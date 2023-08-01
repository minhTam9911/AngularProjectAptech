import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { EmpRegister } from "src/model/empRegister.model";

@Component({
  templateUrl: './empRegisterAccountant.component.html'
})


export class EmpRegisterAccountantComponent implements OnInit {
  result: Result
  companies: CompanyDetail[];
  formAdd: FormGroup;
  empRegisteres: EmpRegister[]
  emp: EmpRegister
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  displayModal: boolean;
  demoData:EmpRegister[]
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private companyService: CompanyDetailService,
    private router: Router,
    private employeeService: EmpRegisterService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.employeeService.findAll().then(
      res => {var result = res as EmpRegister[];
        this.empRegisteres = result.filter(e=>e.designation.includes("Employee"))
        this.demoData = this.empRegisteres
        console.log(res)
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

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.delete(id).then(
          result => {
            this.result = result as Result
            if (this.result) {
              this.messageService.add({ severity: "success", summary: "Success", detail: "Delete Emp Register Successful" });
              this.employeeService.findAll().then(
                res => {
                  this.empRegisteres = res as EmpRegister[];

                },
                err => { console.log(err) }
              )
            }
            else {
              this.messageService.add({ severity: "error", summary: "Waring", detail: "Delete Emp Register Fail" });

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
    this.router.navigate(["/accountant/edit-emp", { empNo: id }])
  }
  async showModelDialog(emp: number) {
    await this.employeeService.findById(emp).then(
      res => this.emp = res as EmpRegister,
      err => console.log(err)
    )
    this.displayModal = true;

  }
  searchName(evn:any){
    var keyword = evn.target.value;
    if(keyword==null){
      this.getAll()
    }else{
      this.empRegisteres = this.demoData.filter(p=>p.email.toLowerCase().includes(keyword.toLowerCase()))
    }
  }
}