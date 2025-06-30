import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';
const API_BASE_URL = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string[];
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!window.localStorage.getItem(TOKEN_KEY);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/signin`, credentials, httpOptions)
      .pipe(
        map(response => {
          if (response.accessToken) {
            this.saveToken(response.accessToken);
            this.saveUser({
              id: response.id,
              username: response.username,
              email: response.email,
              roles: response.roles
            });
            this.isLoggedInSubject.next(true);
          }
          return response;
        })
      );
  }

  register(userData: SignupRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/signup`, userData, httpOptions);
  }

  logout(): void {
    window.localStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: User): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes(role) || false;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
}