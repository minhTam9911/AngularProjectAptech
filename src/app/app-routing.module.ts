import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyAdminComponent } from 'src/component/admin/company/addCompany.component';
import { CompanyAdminComponent } from 'src/component/admin/company/company.component';
import { EditCompanyAdminComponent } from 'src/component/admin/company/updateCompany.component';
import { DashBoardComponent } from 'src/component/admin/dashboard.component';
import { AddEmpRegisterAdminComponent } from 'src/component/admin/empRegister/addEmpRegister.component';
import { EmpRegisterAdminComponent } from 'src/component/admin/empRegister/empRegister.component';
import { HomeAdminComponent } from 'src/component/admin/home/home.component';
import { AddHospitalAdminComponent } from 'src/component/admin/hospital/addHospital.component';
import { HospitalAdminComponent } from 'src/component/admin/hospital/hospital.component';
import { EditHospitalAdminComponent } from 'src/component/admin/hospital/updateHospital.component';
import { LoginAdminComponent } from 'src/component/admin/login/login.component';
import { AddPolicyAdminComponent } from 'src/component/admin/polices/addPolicy.component';
import { PolicyAdminComponent } from 'src/component/admin/polices/policy.component';
import { EditPolicyAdminComponent } from 'src/component/admin/polices/updatePolicy.component';
import { RoleGuard } from 'src/service/guard/roleGuard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { AcctiveAccountComponent } from 'src/component/admin/activeAccount/activeAccount.component';
import { ForgotPasswordAdminComponent } from 'src/component/employee/forgotPasswordEmp.component';
import { VerifyCodeForgotAccountComponent } from 'src/component/employee/checkCodeChangePass.component';
import { ChangeForgotPasswordAdminComponent } from 'src/component/employee/changePasswordEmpRegister.component';
import { EditEmpRegisterAdminComponent } from 'src/component/admin/empRegister/updateEmpRegister.component';
import { ProfileAdminComponent } from 'src/component/admin/profile/profileAdmin.component';
import { AddPoliciesonEmployeeAdminComponent } from 'src/component/admin/policyEmployee/addPoliciesonEmployee.component';
import { PoliciesonEmployeeAdminComponent } from 'src/component/admin/policyEmployee/PoliciesonEmployee.component';
import { EditPoliciesonEmployeeAdminComponent } from 'src/component/admin/policyEmployee/updatePoliciesonEmployee.component';
import { PolicyRequestDetailComponent } from 'src/component/admin/policyRequestDetaik/policyRequestDetail.component';
import { AddPolicyRequestDetailComponent } from 'src/component/admin/policyRequestDetaik/addPolicyRequest.component';
import { UpdatePolicyRequestDetailsComponent } from 'src/component/admin/policyRequestDetaik/updatePolicyRequest.component';
import { PolicyApprovalComponent } from 'src/component/admin/policyApprove/policyApprove.component';
import { DashBoardForEmployeeComponent } from './component-employee/dashboard.component';
import { HomeEmployeeComponent } from './component-employee/home/home.component';
import { PolicyComponentEmployee } from './component-employee/policy/policy.component';
import { AddPolicyRequestDetailComponentEmployee } from './component-employee/policyRequestDetaik/addPolicyRequest.component';
import { PolicyRequestDetailForEmpComponent } from './component-employee/policyRequestDetaik/policyRequestDetail.component';
import { PoliciesonEmployeeEmployeeComponent } from './component-employee/policyEmployee/PoliciesonEmployee.component';
import { ProfileEmployeeComponent } from './component-employee/profile/profileEmployee.component';
import { AuthGuardAdmin } from 'src/service/guard/authGuardAdmin.service';
import { AuthGuardEmployee } from 'src/service/guard/authGuardEmployeeservice';
import { ChangeForgotPasswordComponent } from './component-employee/profile/changePassword.component';
import { ChangeForgotPasswordProfileComponent } from 'src/component/admin/profile/changePassword.component';
import { DashBoardAccountantComponent } from './accountant/dashboardAccountant.component';
import { AuthGuardAccountant } from 'src/service/guard/authGuardAccountant.service';
import { PolicyApprovalAccountantComponent } from './accountant/policyApprove/policyApproveAccountant.component';
import { PolicyAccountantComponent } from './accountant/polices/policyAccountant.component';
import { ProfileAccountantComponent } from './accountant/profile/profileAccountant.component';
import { CompanyAccountantComponent } from './accountant/company/companyAccountant.component';
import { HospitalAccountantComponent } from './accountant/hospital/hospitalAccountant.component';
import { EditEmpRegisterAccountantComponent } from './accountant/empRegister/updateEmpRegisterAccountant.component';
import { EmpRegisterAccountantComponent } from './accountant/empRegister/empRegisterAccountant.component';





const routes: Routes = [
  // {path:"home", component:HomeComponent },
  // {path:"register",component:RegisterComponent},
  // {path:"login-user",component:LoginComponent},
  {path:"login", component:LoginAdminComponent },
  {path:"active-employee", component:AcctiveAccountComponent},
  {path:"forgot-password", component:ForgotPasswordAdminComponent},
  {path:"verify-check-code", component:VerifyCodeForgotAccountComponent},
  {path:"change-password", component:ChangeForgotPasswordAdminComponent},
  {path:"", component:LoginAdminComponent },
  {path:"admin", component:DashBoardComponent,canActivate:[AuthGuardAdmin],children:[
    {path:"", component:HomeAdminComponent},
    {path:"dashboard", component:HomeAdminComponent},
    {path:"addCompany", component:AddCompanyAdminComponent},
    {path:"company", component:CompanyAdminComponent},
    {path:"update-company", component:EditCompanyAdminComponent},
    {path:"addHospital", component:AddHospitalAdminComponent},
    {path:"hospital", component:HospitalAdminComponent},
    {path:"update-hospital", component:EditHospitalAdminComponent},
    {path:"policy",component:PolicyAdminComponent},
    {path:"update-policy", component:EditPolicyAdminComponent},
    {path:"addPolicy",component:AddPolicyAdminComponent},
    {path:"addEmpRegister",component:AddEmpRegisterAdminComponent},
    {path:"empRegister",component:EmpRegisterAdminComponent},
    {path:"edit-emp",component:EditEmpRegisterAdminComponent},
    {path:"profile",component:ProfileAdminComponent},
    {path:"add-policieson-employee", component:AddPoliciesonEmployeeAdminComponent},
    {path:"policieson-employee", component:PoliciesonEmployeeAdminComponent},
    {path:"update-policieson-employee", component:EditPoliciesonEmployeeAdminComponent},
    {path:"policy-request", component:PolicyRequestDetailComponent},
    {path:"add-policy-request", component:AddPolicyRequestDetailComponent},
    {path:"update-policy-request", component:UpdatePolicyRequestDetailsComponent},
    {path:"policy-approval",component:PolicyApprovalComponent},
    {path:"change-password",component:ChangeForgotPasswordProfileComponent}
  ]},
  {path:"employee",component:DashBoardForEmployeeComponent,canActivate:[AuthGuardEmployee],children:[
    {path:"",component:PolicyComponentEmployee},
    {path:"home",component:PolicyComponentEmployee},
    {path:"policy",component:PolicyComponentEmployee},
    {path:"add-policy-request",component:AddPolicyRequestDetailComponentEmployee},
    {path:"policy-request",component:PolicyRequestDetailForEmpComponent},
    {path:"policy-employee",component:PoliciesonEmployeeEmployeeComponent},
    {path:"profile",component:ProfileEmployeeComponent},
    {path:"policieson-employee",component:PoliciesonEmployeeEmployeeComponent},
    {path:"change-password",component:ChangeForgotPasswordComponent}
  ]},

  {path:"accountant",component:DashBoardAccountantComponent,canActivate:[AuthGuardAccountant],children:[
    {path:"",component:PolicyApprovalAccountantComponent},
    {path:"home",component:PolicyApprovalAccountantComponent},
    {path:"company",component:CompanyAccountantComponent},
    {path:"hospital",component:HospitalAccountantComponent},
    {path:"policy",component:PolicyAccountantComponent},
    {path:"policy-approval",component:PolicyApprovalAccountantComponent},
    {path:"policy-employee",component:PoliciesonEmployeeAdminComponent},
    {path:"profile",component:ProfileAccountantComponent},
    {path:"empRegister",component:EmpRegisterAccountantComponent},
    {path:"policieson-employee",component:PoliciesonEmployeeAdminComponent},
    {path:"change-password",component:ChangeForgotPasswordComponent},
    {path:"edit-emp",component:EditEmpRegisterAccountantComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
