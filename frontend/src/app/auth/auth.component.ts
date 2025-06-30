import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest, SignupRequest } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  currentTab: 'login' | 'register' = 'login';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.initializeForms();
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });
  }

  switchTab(tab: 'login' | 'register'): void {
    if (this.isLoading) return;
    
    this.currentTab = tab;
    this.clearMessages();
    this.resetForms();
  }

  onLogin(): void {
    if (this.loginForm.invalid || this.isLoading) return;

    const loginData: LoginRequest = this.loginForm.value;
    this.setLoading(true);
    this.clearMessages();

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.showSuccess('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.showError(error.error?.message || 'Login failed. Please try again.');
        this.setLoading(false);
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid || this.isLoading) return;

    const registerData: SignupRequest = this.registerForm.value;
    this.setLoading(true);
    this.clearMessages();

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.showSuccess('Registration successful! You can now sign in.');
        // Auto-switch to login tab after 2 seconds
        setTimeout(() => {
          this.switchTab('login');
          this.loginForm.patchValue({ username: registerData.username });
        }, 2000);
        this.setLoading(false);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.showError(error.error?.message || 'Registration failed. Please try again.');
        this.setLoading(false);
      }
    });
  }

  getPasswordStrength(password: string): { width: string; className: string; text: string } {
    if (!password) {
      return { width: '0%', className: '', text: 'Enter a password' };
    }

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;

    if (strength < 50) {
      return { width: strength + '%', className: '', text: 'Weak password' };
    } else if (strength < 75) {
      return { width: strength + '%', className: 'medium', text: 'Medium password' };
    } else {
      return { width: strength + '%', className: 'strong', text: 'Strong password' };
    }
  }

  get currentPassword(): string {
    return this.registerForm.get('password')?.value || '';
  }

  get passwordStrength() {
    return this.getPasswordStrength(this.currentPassword);
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private resetForms(): void {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  // Getters for form validation
  get loginUsername() { return this.loginForm.get('username'); }
  get loginPassword() { return this.loginForm.get('password'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get registerUsername() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get registerPassword() { return this.registerForm.get('password'); }
}