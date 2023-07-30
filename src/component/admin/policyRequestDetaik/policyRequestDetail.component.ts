import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PolicyRequestDetail } from "src/model/policyRequestDetail.model";
import { PolicyRequestDetailService } from "src/service/admin/policyRequestDetail.service";
import { Result } from "src/service/result.service";

@Component({
    templateUrl: './policyRequestDetail.component.html',
  })
  export class PolicyRequestDetailComponent implements OnInit {
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
      private router: Router
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
      this.policyRequestDetailService.findAll().then(
        (res) => {
          this.policyRequestDetails = res as PolicyRequestDetail[];
          console.log(this.policyRequestDetails);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    async delete(id: any) {
      await this.policyRequestDetailService.delete(id).then(
        (result) => {
          this.result = result as Result;
        },
        (err) => {
          console.log(err);
        }
      );
      console.log(this.result);
      if (this.result) {
        await this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Delete Policy Request Successful',
        });
      } else {
        await this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Delete Policy Request Fail',
        });
      }
      await this.policyRequestDetailService.findAll().then(
        (res) => {
          this.policyRequestDetails = res as PolicyRequestDetail[];
          console.log(this.policyRequestDetails);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    update(id: any) {
      this.router.navigate(['/admin/update-policy-request', { requestId: id }]);
    }
  }
  