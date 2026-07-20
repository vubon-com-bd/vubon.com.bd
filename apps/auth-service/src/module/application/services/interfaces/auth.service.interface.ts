/**
 * Authentication service interface
 * Defines the contract for authentication operations
 */
import type { RegisterDto, RegisterResponseDto } from '../../dtos/auth/register.dto';

export interface AuthService {
  /**
   * Register a new user
   * @param data - Registration data
   * @returns Registration response with user details and verification info
   */
  register(data: RegisterDto): Promise<RegisterResponseDto>;
}

export interface AuthServiceConfig {
  /**
   * Whether email verification is required
   * @default true
   */
  requireEmailVerification?: boolean;

  /**
   * Whether to send welcome email
   * @default true
   */
  sendWelcomeEmail?: boolean;

  /**
   * Whether to log registration activity
   * @default true
   */
  logRegistrationActivity?: boolean;

  /**
   * Default role for new users
   * @default 'customer'
   */
  defaultRole?: string;

  /**
   * Allowed domains for registration (empty means all allowed)
   */
  allowedDomains?: string[];

  /**
   * Whether to block disposable email addresses
   * @default true
   */
  blockDisposableEmails?: boolean;
}

export interface AuthServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
  timestamp: Date;
}

export interface AuthServiceError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}
