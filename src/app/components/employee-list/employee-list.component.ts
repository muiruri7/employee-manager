import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; 
import { NgIf, CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule, 
    NgIf,
    CommonModule,
    MatFormFieldModule, MatInput,
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = ['profilePicture', 'fullName', 'jobTitle', 'department', 'actions'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
    console.log("Employees Loaded in Component:", this.employees);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.fullName.toLowerCase().includes(filterValue) ||
      emp.jobTitle.toLowerCase().includes(filterValue) ||
      emp.department.toLowerCase().includes(filterValue)
    );
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
    this.employees = this.employeeService.getEmployees();
    console.log("Updated Employee List:", this.employees);
  }
}
