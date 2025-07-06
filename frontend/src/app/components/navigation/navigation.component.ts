import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  section?: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'Dashboard';
  @Input() contentTitle: string = 'Welcome to WealthBuddy';
  @Input() contentSubtitle: string = 'Manage your finances with ease';
  @Input() breadcrumbs: string[] = [];

  // Component state
  sidebarOpen: boolean = false;
  userMenuOpen: boolean = false;
  activeItem: string = 'dashboard';
  userName: string = 'User';
  userEmail: string = 'user@example.com';
  userInitials: string = 'U';

  private authSubscription?: Subscription;

  // Navigation items configuration
  navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'accounts', label: 'Accounts', icon: 'account_balance_wallet' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt_long' },
    { id: 'cashflow', label: 'Cash Flow', icon: 'trending_up' },
    { id: 'reports', label: 'Reports', icon: 'assessment', section: 'Planning' },
    { id: 'budget', label: 'Budget', icon: 'pie_chart', section: 'Planning' },
    { id: 'recurring', label: 'Recurring', icon: 'repeat', section: 'Planning' },
    { id: 'goals', label: 'Goals', icon: 'track_changes', section: 'Planning' },
    { id: 'investments', label: 'Investments', icon: 'show_chart', section: 'Grow' },
    { id: 'advice', label: 'Advice', icon: 'lightbulb', section: 'Grow' },
    { id: 'help', label: 'Help & Support', icon: 'help' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.updatePageTitle();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Initialize user data from auth service
   */
  private initializeUser(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.firstName ? `${user.firstName} ${user.lastName}` : user.username;
      this.userEmail = user.email;
      this.userInitials = this.generateInitials(user.firstName || user.username, user.lastName || '');
    }
  }

  /**
   * Generate user initials from name
   */
  private generateInitials(firstName: string, lastName: string): string {
    if (lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return firstName.charAt(0).toUpperCase();
  }

  /**
   * Update page title based on active item
   */
  private updatePageTitle(): void {
    const activeNavItem = this.navigationItems.find(item => item.id === this.activeItem);
    if (activeNavItem) {
      this.pageTitle = activeNavItem.label;
      this.contentTitle = `${activeNavItem.label} Overview`;
    }
  }

  /**
   * Set active navigation item and navigate
   */
  setActiveItem(itemId: string): void {
    this.activeItem = itemId;
    this.updatePageTitle();
    this.updateBreadcrumbs(itemId);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 1024) {
      this.closeSidebar();
    }

    // Navigate to route
    this.router.navigate([`/${itemId}`]);
  }

  /**
   * Update breadcrumbs based on active item
   */
  private updateBreadcrumbs(itemId: string): void {
    const activeItem = this.navigationItems.find(item => item.id === itemId);
    if (activeItem) {
      this.breadcrumbs = activeItem.section 
        ? ['Dashboard', activeItem.section, activeItem.label]
        : ['Dashboard', activeItem.label];
    }
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Close sidebar
   */
  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  /**
   * Toggle user menu dropdown
   */
  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  /**
   * Close user menu
   */
  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  /**
   * View user profile
   */
  viewProfile(): void {
    this.closeUserMenu();
    console.log('Navigate to profile');
    // Implement profile navigation
  }

  /**
   * Open settings
   */
  openSettings(): void {
    this.closeUserMenu();
    this.setActiveItem('settings');
  }

  /**
   * Logout user
   */
  logout(): void {
    this.closeUserMenu();
    this.authService.logout();
    this.router.navigate(['/auth']);
    
    // You can add a success message here
    console.log('Successfully logged out');
  }

  /**
   * Refresh data action
   */
  refreshData(): void {
    console.log('Refreshing data...');
  }

  /**
   * Add account action
   */
  addAccount(): void {
    console.log('Adding new account...');
  }

  /**
   * Close user menu when clicking outside
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-container')) {
      this.closeUserMenu();
    }
  }

  /**
   * Handle window resize
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth > 1024) {
      this.sidebarOpen = false;
    }
  }

  /**
   * Handle escape key
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.sidebarOpen) {
      this.closeSidebar();
    }
    if (this.userMenuOpen) {
      this.closeUserMenu();
    }
  }
}