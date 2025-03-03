import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-detail/employee-detail.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee/add', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'employee/edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
