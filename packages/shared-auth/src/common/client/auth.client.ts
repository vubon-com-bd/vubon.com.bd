/**
 * Auth Client
 * অথেনটিকেশন ক্লায়েন্ট
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  isVerified: boolean;
  isLocked: boolean;
  permissions?: string[];
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterDataIn {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthClientConfig {
  baseURL: string;
  storage: 'localStorage' | 'sessionStorage' | 'cookie';
  tokenKey: string;
  refreshKey: string;
  userKey: string;
}

export class AuthClient {
  private config: AuthClientConfig;

  constructor(config: AuthClientConfig) {
    this.config = config;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.config.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data: AuthResponse = await response.json();
    this.setTokens(data.tokens);
    this.setUser(data.user);
    return data;
  }

  async register(data: RegisterDataIn): Promise<AuthResponse> {
    const response = await fetch(`${this.config.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const result: AuthResponse = await response.json();
    this.setTokens(result.tokens);
    this.setUser(result.user);
    return result;
  }

  async logout(): Promise<void> {
    const token = this.getAccessToken();
    if (token) {
      try {
        await fetch(`${this.config.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch {
        // Ignore logout errors
      }
    }
    this.clearTokens();
    this.clearUser();
  }

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.config.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      this.clearTokens();
      this.clearUser();
      throw new Error('Token refresh failed');
    }

    const tokens: AuthTokens = await response.json();
    this.setTokens(tokens);
    return tokens;
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const token = this.getAccessToken();
    if (!token) return null;

    const user = this.getUser();
    if (user) return user;

    try {
      const response = await fetch(`${this.config.baseURL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        this.clearTokens();
        this.clearUser();
        return null;
      }

      const userData: AuthUser = await response.json();
      this.setUser(userData);
      return userData;
    } catch {
      return null;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    const response = await fetch(`${this.config.baseURL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset request failed');
    }
  }

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    const response = await fetch(`${this.config.baseURL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset failed');
    }
  }

  async changePassword(data: PasswordChangeRequest): Promise<void> {
    const token = this.getAccessToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${this.config.baseURL}/auth/change-password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password change failed');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await fetch(`${this.config.baseURL}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Email verification failed');
    }
  }

  async resendVerification(email: string): Promise<void> {
    const response = await fetch(`${this.config.baseURL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Resend verification failed');
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  getAccessToken(): string | null {
    const storage = this.getStorage();
    return storage.getItem(`${this.config.tokenKey}`);
  }

  getRefreshToken(): string | null {
    const storage = this.getStorage();
    return storage.getItem(`${this.config.refreshKey}`);
  }

  getUser(): AuthUser | null {
    const storage = this.getStorage();
    const userStr = storage.getItem(`${this.config.userKey}`);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  private setTokens(tokens: AuthTokens): void {
    const storage = this.getStorage();
    storage.setItem(`${this.config.tokenKey}`, tokens.accessToken);
    storage.setItem(`${this.config.refreshKey}`, tokens.refreshToken);
  }

  private setUser(user: AuthUser): void {
    const storage = this.getStorage();
    storage.setItem(`${this.config.userKey}`, JSON.stringify(user));
  }

  private clearTokens(): void {
    const storage = this.getStorage();
    storage.removeItem(`${this.config.tokenKey}`);
    storage.removeItem(`${this.config.refreshKey}`);
  }

  private clearUser(): void {
    const storage = this.getStorage();
    storage.removeItem(`${this.config.userKey}`);
  }

  private getStorage(): Storage {
    if (this.config.storage === 'localStorage') {
      return localStorage;
    } else if (this.config.storage === 'sessionStorage') {
      return sessionStorage;
    } else {
      // Cookie storage - fallback to localStorage
      return localStorage;
    }
  }
}

export const createAuthClient = (config: AuthClientConfig): AuthClient => {
  return new AuthClient(config);
};
