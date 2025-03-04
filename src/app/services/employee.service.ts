import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private storageKey = 'employees';

  constructor() {
    const storedEmployees = sessionStorage.getItem(this.storageKey);
    this.employees = storedEmployees ? JSON.parse(storedEmployees) : this.getDummyEmployees();
  }

  private getDummyEmployees(): Employee[] {
    return [
      {
        id: 1, fullName: 'John Doe', jobTitle: 'Software Engineer', department: 'IT', dateOfJoining: '2022-01-15', profilePicture: '',
        reviews: undefined
      },
      {
        id: 2, fullName: 'Jane Smith', jobTitle: 'HR Manager', department: 'Human Resources', dateOfJoining: '2021-07-22', profilePicture: '',
        reviews: undefined
      }
    ];
  }

  private saveEmployees() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.employees));
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee) {
    employee.id = this.employees.length ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
    this.employees.push(employee);
    this.saveEmployees();
    console.log('Employee Added:', employee);
  }

  updateEmployee(updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.saveEmployees();
      console.log('Employee Updated:', updatedEmployee);
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.saveEmployees();
    console.log('Employee Deleted:', id);
  }
}
