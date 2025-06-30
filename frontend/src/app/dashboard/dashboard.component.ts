import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  iconClass: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  userInitials: string = 'U';
  userName: string = 'User';
  
  statsCards: StatCard[] = [
    {
      title: 'Total Balance',
      value: '$12,450.00',
      change: '+2.5% from last month',
      changeType: 'positive',
      icon: 'account_balance',
      iconClass: 'income'
    },
    {
      title: 'Monthly Income',
      value: '$5,200.00',
      change: '+8.2% from last month',
      changeType: 'positive',
      icon: 'trending_up',
      iconClass: 'income'
    },
    {
      title: 'Monthly Expenses',
      value: '$3,150.00',
      change: '+12.3% from last month',
      changeType: 'negative',
      icon: 'trending_down',
      iconClass: 'expense'
    },
    {
      title: 'Savings Goal',
      value: '$2,050.00',
      change: '68% of $3,000 goal',
      changeType: 'positive',
      icon: 'savings',
      iconClass: 'savings'
    }
  ];

  quickActions = [
    { icon: 'add_circle', title: 'Add Income' },
    { icon: 'remove_circle', title: 'Add Expense' },
    { icon: 'transfer_within_a_station', title: 'Transfer' },
    { icon: 'account_balance', title: 'Add Account' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userData = this.authService.getCurrentUser();
    if (!userData) {
      this.router.navigate(['/auth']);
      return;
    }

    this.user = userData;
    this.userName = userData.firstName || userData.username;
    this.userInitials = (userData.firstName || userData.username).charAt(0).toUpperCase();
  }

  onQuickAction(action: any): void {
    console.log('Quick action clicked:', action.title);
    // Implement action logic here
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
  }

  navigateTo(route: string): void {
    console.log('Navigate to:', route);
    // Implement navigation logic here
  }
}