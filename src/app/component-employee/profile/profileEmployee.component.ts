import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { EmpRegister } from 'src/model/empRegister.model';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';

@Component({
    templateUrl: './profileEmployee.component.html',
})
export class ProfileEmployeeComponent implements OnInit{
  title = 'Health Insurance';
  displayMenu=false;
  displayEmpRegister  = false;
  displayPolicy=false;
  emp: EmpRegister
  formAdd: FormGroup;
  result:String
  constructor(private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private empService: EmpRegisterService,
    private formBuilder: FormBuilder) {
    
    sessionStorage.clear();
  }
    async ngOnInit(){
        await this.empService.findByUsername(localStorage.getItem("username")).then(
          res=>{
          this.emp = res as EmpRegister
        },err=>console.log(err))
    }
    visible: boolean = false;

    updateInfor(id:any) {
        this.visible = true;
        this.empService.findById(id).then(res => {
          this.emp = res as EmpRegister;
          console.log(this.emp)
          this.formAdd = this.formBuilder.group({
               empNo: this.emp.empNo,
              designation: [this.emp.designation, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
              joinDate: [this.emp.joinDate, Validators.required],
              salary: [this.emp.salary, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
              firstName: [this.emp.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
              lastName: [this.emp.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
              userName: [this.emp.username, [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9_]{5,255}$")]],
              password: [this.emp.password, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]],
              //Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
              address: [this.emp.address, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
              contactNo: [this.emp.contactNo, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
              state: [this.emp.state, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
              country: [this.emp.country, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
              city: [this.emp.city, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
              accountStatus: [this.emp.accountStatus, [Validators.required]],
              email: [this.emp.email, [Validators.required, Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]],
  
          })
      }, err => console.log(err))
    }
    async save() {
      var empRegisterSave: EmpRegister = this.formAdd.value as EmpRegister
      console.log(empRegisterSave)
      var data = new FormData();
      data.append("strRegister", JSON.stringify(empRegisterSave));
      console.log(data)
      await this.empService.update(data).then(
          result => {
              this.result = result as string
              if (String(this.result['result']) == "true" || this.result == "true") {
                  this.messageService.add({ severity: "success", summary: "Update Emp Register", detail: "Emp Register update successful" })
                   this.empService.findByUsername(localStorage.getItem("username")).then(
                    res=>{
                    this.emp = res as EmpRegister
                  },err=>console.log(err))
                }
              else {
                  this.messageService.add({ severity: "error", summary: "Update Emp Register", detail: "Update Emp Resgiter fail. " + String(this.result['result']) })
              }
          },
          err => console.log(err)

      )
  }
}
