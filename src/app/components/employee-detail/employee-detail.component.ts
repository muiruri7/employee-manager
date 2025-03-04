import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    NgIf,
    CommonModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
  ]})
export class EmployeeDetailsComponent implements OnInit {
  employee?: Employee;
  newReview: string='';

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeeService.getEmployeeById(id);
    if(this.employee){
      this.employee.reviews=this.employee.reviews || [];
    }
  }

  addReview(){
    if (this.employee && this.newReview.trim()){
      this.employee.reviews = this.employee.reviews || [];
      this.employee.reviews.push(this.newReview);
      this.newReview='';
    }
  }

  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployee(id);
      this.router.navigate(['/employees']);
    }
  }
}
