import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUserKey = 'currentUser';
  private usersKey = 'users';

  constructor() {
    const storedUsers = localStorage.getItem(this.usersKey); // Use localStorage to persist users
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = this.getDummyUsers();
      this.saveUsers(); // Save dummy users when the app starts
    }
  }

  private getDummyUsers(): User[] {
    return [{ id: 1, fullName: 'Admin User', email: 'admin@example.com', password: 'admin123' }];
  }

  private saveUsers() {
    localStorage.setItem(this.usersKey, JSON.stringify(this.users)); // Persist users permanently
  }

  register(user: User): boolean {
    if (this.users.some(u => u.email === user.email)) {
      return false; // User already exists
    }
    user.id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push(user);
    this.saveUsers();
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem(this.currentUserKey, JSON.stringify(user)); // Store logged-in user
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const user = sessionStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.currentUserKey);
  }
}
