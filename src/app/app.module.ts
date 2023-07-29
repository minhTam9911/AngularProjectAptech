import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from 'src/component/admin/dashboard.component';
import { HomeAdminComponent } from 'src/component/admin/home/home.component';
import { footerAdminComponent } from 'src/component/admin/footerAdmin.component';
import { LoginAdminComponent } from 'src/component/admin/login/login.component';
import { AddCompanyAdminComponent } from 'src/component/admin/company/addCompany.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetailService } from 'src/service/admin/companyDetail.sevice';
import { BaseUrl } from 'src/service/baseUrl.service';
import { CompanyAdminComponent } from 'src/component/admin/company/company.component';
import { EditCompanyAdminComponent } from 'src/component/admin/company/updateCompany.component';
import { AddPolicyAdminComponent } from 'src/component/admin/polices/addPolicy.component';
import { EditPolicyAdminComponent } from 'src/component/admin/polices/updatePolicy.component';
import { PolicyAdminComponent } from 'src/component/admin/polices/policy.component';
import { PolicyService } from 'src/service/admin/policy.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEmpRegisterAdminComponent } from 'src/component/admin/empRegister/addEmpRegister.component';
import { EmpRegisterAdminComponent } from 'src/component/admin/empRegister/empRegister.component';
import { EmpRegisterService } from 'src/service/admin/empRegister.service';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginService } from 'src/service/admin/login.service';
import { AddHospitalAdminComponent } from 'src/component/admin/hospital/addHospital.component';
import { HospitalAdminComponent } from 'src/component/admin/hospital/hospital.component';
import { EditHospitalAdminComponent } from 'src/component/admin/hospital/updateHospital.component';
import { HospitalInforService } from 'src/service/admin/hospitalInfo.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AcctiveAccountComponent } from 'src/component/admin/activeAccount/activeAccount.component';
import { ForgotPasswordAdminComponent } from 'src/component/employee/forgotPasswordEmp.component';
import { VerifyCodeForgotAccountComponent } from 'src/component/employee/checkCodeChangePass.component';
import { ChangeForgotPasswordAdminComponent } from 'src/component/employee/changePasswordEmpRegister.component';
import { EditEmpRegisterAdminComponent } from 'src/component/admin/empRegister/updateEmpRegister.component';
import { ProfileAdminComponent } from 'src/component/admin/profile/profileAdmin.component';
import { AddPoliciesonEmployeeAdminComponent } from 'src/component/admin/policyEmployee/addPoliciesonEmployee.component';
import { PoliciesonEmployeeAdminComponent } from 'src/component/admin/policyEmployee/PoliciesonEmployee.component';
import { EditPoliciesonEmployeeAdminComponent } from 'src/component/admin/policyEmployee/updatePoliciesonEmployee.component';
import { PoliciesonEmployeeService } from 'src/service/admin/policyEmployee.service';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { PolicyRequestDetailService } from 'src/service/admin/policyRequestDetail.service';
import { PolicyRequestDetailComponent } from 'src/component/admin/policyRequestDetail/policyRequestDetail.component';
import { AddPolicyRequestDetailComponent } from 'src/component/admin/policyRequestDetail/addPolicyRequest.component';
import { UpdatePolicyRequestDetailsComponent } from 'src/component/admin/policyRequestDetail/updatePolicyRequest.component';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    HomeAdminComponent,
    footerAdminComponent,
    AddCompanyAdminComponent,
    CompanyAdminComponent,
     EditCompanyAdminComponent,
     AddPolicyAdminComponent,
     EditPolicyAdminComponent,
     PolicyAdminComponent,
     AddEmpRegisterAdminComponent,
     EmpRegisterAdminComponent,
     LoginAdminComponent,
     AddHospitalAdminComponent,
     HospitalAdminComponent,
     EditHospitalAdminComponent,
     LoginComponent,
     RegisterComponent,
     HomeComponent,
     AcctiveAccountComponent,
     ForgotPasswordAdminComponent,
     VerifyCodeForgotAccountComponent,
     ChangeForgotPasswordAdminComponent,
     EditEmpRegisterAdminComponent,
     ProfileAdminComponent,
     AddPoliciesonEmployeeAdminComponent,
     PoliciesonEmployeeAdminComponent,
     EditPoliciesonEmployeeAdminComponent,
     PolicyRequestDetailComponent,
     AddPolicyRequestDetailComponent,
     UpdatePolicyRequestDetailsComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    ToastModule, 
    NgxPaginationModule,
    CalendarModule,
    ChipsModule,
    InputSwitchModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,
    DropdownModule
  ],
  providers: [MessageService,
    ConfirmationService,
    HospitalInforService, 
    CompanyDetailService, 
    BaseUrl, 
    PolicyService, 
    EmpRegisterService, 
    LoginService,
    PoliciesonEmployeeService,
    PolicyRequestDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
