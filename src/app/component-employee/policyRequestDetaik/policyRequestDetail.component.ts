import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";
import { PolicyApprovalDetailService } from "src/service/admin/policyApprovalDetail.service";
import { PolicyRequestDetailService } from "src/service/admin/policyRequestDetail.service";
import { Result } from "src/service/result.service";

@Component({
    templateUrl: './policyRequestDetail.component.html',
  })
  export class PolicyRequestDetailForEmpComponent implements OnInit {
    result: Result;
    policyRequestDetails: PolicyRequestDetail[];
    formAdd: FormGroup;
    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    tableSizes: any = [5, 10, 15, 20];
    constructor(
      private formBuilder: FormBuilder,
      private messageService: MessageService,
      private policyRequestDetailService: PolicyRequestDetailService,
      private router: Router,
      private policyApprovalService: PolicyApprovalDetailService
    ) {}
  
    ngOnInit(): void {
     this.getAll()
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
    getAll(){
      this.policyRequestDetailService.findByColEmpNo(parseInt(localStorage.getItem('id'))).then(
        (res) => {
          this.policyRequestDetails = res as PolicyRequestDetail[];
          console.log(this.policyRequestDetails);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    async cancelRequest(id: any) {
      await this.policyApprovalService.deleteColRequestId(id).then(
        (res) => {
              var result = res as boolean;
              if(result) {
                 this.policyRequestDetailService.delete(id).then(
                  (res1) => {
                    var result2 = res1 as boolean;
                    if(result2) {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Cancel Request Successful',
                      });
                    }else{
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Cancel Request Fail',
                      });
                    }
                  },err1 =>console.log(err1));
              }
      },err=>console.log(err))
    }
  }
  