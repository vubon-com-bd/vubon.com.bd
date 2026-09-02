import { ApiClient } from '../api-client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    status: string;
    isVerified: boolean;
  };
}

export class AuthEndpoints {
  constructor(private client: ApiClient) {}

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>('/auth/login', data);
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>('/auth/register', data);
  }

  async logout(): Promise<void> {
    return this.client.post<void>('/auth/logout');
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>('/auth/refresh', data);
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/verify-email', data);
  }

  async resendVerification(email: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/resend-verification', { email });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/forgot-password', data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/reset-password', data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/change-password', data);
  }
}
