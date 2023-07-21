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
import { Policy } from 'src/model/policy.model';
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
     LoginAdminComponent
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
    
    
  ],
  providers: [MessageService,ConfirmationService, CompanyDetailService, BaseUrl, PolicyService, EmpRegisterService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
