import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'wealthbuddy-frontend';
  isLoggedIn = false;
  private authSubscription?: Subscription;
  private routerSubscription?: Subscription;

  // Navigation properties
  currentPageTitle: string = 'Dashboard';
  currentContentTitle: string = 'Financial Overview';
  currentContentSubtitle: string = 'Track your income, expenses, and financial goals';
  currentBreadcrumbs: string[] = ['Dashboard'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        
        // If logged out, redirect to auth page
        if (!loggedIn && this.router.url !== '/auth') {
          this.router.navigate(['/auth']);
        }
      }
    );

    // Subscribe to route changes to update navigation
    this.routerSubscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateNavigationForRoute(event.url);
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateNavigationForRoute(url: string): void {
    switch (url) {
      case '/dashboard':
        this.currentPageTitle = 'Dashboard';
        this.currentContentTitle = 'Financial Overview';
        this.currentContentSubtitle = 'Track your income, expenses, and financial goals';
        this.currentBreadcrumbs = ['Dashboard'];
        break;
      
      case '/accounts':
        this.currentPageTitle = 'Accounts';
        this.currentContentTitle = 'Account Management';
        this.currentContentSubtitle = 'Manage your bank accounts, credit cards, and investments';
        this.currentBreadcrumbs = ['Dashboard', 'Accounts'];
        break;
      
      default:
        this.currentPageTitle = 'Dashboard';
        this.currentContentTitle = 'Financial Overview';
        this.currentContentSubtitle = 'Track your income, expenses, and financial goals';
        this.currentBreadcrumbs = ['Dashboard'];
    }
  }
}