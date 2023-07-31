import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyDetail } from "src/model/companyDetail.model";
import { MessageService } from 'primeng/api';
import { CompanyDetailService } from "src/service/admin/companyDetail.sevice";
import { Result } from "src/service/result.service";
import { Router } from "@angular/router";
import { PolicyService } from "src/service/admin/policy.service";
import { Policy } from "src/model/policy.model";
import { EmpRegisterService } from "src/service/admin/empRegister.service";
import { EmpRegister } from "src/model/empRegister.model";

@Component({
  templateUrl: './addEmpRegister.component.html'
})


export class AddEmpRegisterAdminComponent implements OnInit {
  result: string
  policy: Policy[];
  formAdd: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private policyService: PolicyService,
    private router: Router,
    private empRegisterService: EmpRegisterService,

  ) { }

  ngOnInit(): void {
    this.policyService.findAll().then(
      res => {
        this.policy = res as Policy[];
        console.log(this.policy);
      },
      err => { console.log(err) }
    )
    this.formAdd = this.formBuilder.group({
      designation: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      joinDate: ['', Validators.required],
      salary: ["", [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      userName: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9_]{5,255}$")]],
      password: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]],
      //Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
      address:["",[Validators.required, Validators.minLength(2),Validators.maxLength(150)]],
      contactNo:["",[Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
      state:["",[Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
      country:["",[Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
      city:["",[Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
      roleName:[""],
      accountStatus:[false,[Validators.required]],
      email:["",[Validators.required,Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]],

    })
  }
  async save() {
    var empRegisterSave: EmpRegister = this.formAdd.value as EmpRegister
    console.log(empRegisterSave)
    var data = new FormData();
     data.append("strRegister",JSON.stringify(empRegisterSave));
     console.log(data)
    await this.empRegisterService.create(data).then(
      result => {
        this.result = result as string
        console.log(this.result)
        console.log(empRegisterSave)
        console.log(result)
        if (String(this.result['result'])=="true" || this.result =="true") {
          this.messageService.add({ severity: "success", summary: "Add Emp Register", detail: "Emp Register add successful" })
        }
        else{
          this.messageService.add({ severity: "error", summary: "Add Emp Register", detail: "Emp Register add fail. " + String(this.result['result']) })
        }
      },
      err => console.log(err)

    )
  }
}