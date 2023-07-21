import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyAdminComponent } from 'src/component/admin/company/addCompany.component';
import { CompanyAdminComponent } from 'src/component/admin/company/company.component';
import { EditCompanyAdminComponent } from 'src/component/admin/company/updateCompany.component';
import { DashBoardComponent } from 'src/component/admin/dashboard.component';
import { AddEmpRegisterAdminComponent } from 'src/component/admin/empRegister/addEmpRegister.component';
import { EmpRegisterAdminComponent } from 'src/component/admin/empRegister/empRegister.component';
import { HomeAdminComponent } from 'src/component/admin/home/home.component';
import { LoginAdminComponent } from 'src/component/admin/login/login.component';
import { AddPolicyAdminComponent } from 'src/component/admin/polices/addPolicy.component';
import { PolicyAdminComponent } from 'src/component/admin/polices/policy.component';
import { EditPolicyAdminComponent } from 'src/component/admin/polices/updatePolicy.component';
import { AuthGuard } from 'src/service/guard/authGuard.serve';
import { RoleGuard } from 'src/service/guard/roleGuard.service';



const routes: Routes = [
  {path:"login", component:LoginAdminComponent },
  {path:"", component:LoginAdminComponent },
  {path:"admin", component:DashBoardComponent,canActivate: [AuthGuard],children:[
    {canActivateChild:[RoleGuard],path:"", component:HomeAdminComponent},
    {path:"dashboard", component:HomeAdminComponent},
    {path:"addCompany", component:AddCompanyAdminComponent},
    {path:"company", component:CompanyAdminComponent},
    {path:"update-company", component:EditCompanyAdminComponent},
    {path:"policy",component:PolicyAdminComponent},
    {path:"update-policy", component:EditPolicyAdminComponent},
    {path:"addPolicy",component:AddPolicyAdminComponent},
    {path:"addEmpRegister",component:AddEmpRegisterAdminComponent},
    { path:"empRegister",component:EmpRegisterAdminComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
