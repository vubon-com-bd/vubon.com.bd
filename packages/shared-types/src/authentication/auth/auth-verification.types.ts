/**
 * Authentication Verification Types Module
 * Email, Phone, and Identity verification types for authentication system
 * Handles verification processes, OTP, and identity validation
 */

import { UserId, Email, Timestamp, Token } from './core-primitives.types';

/**
 * Verification Type
 * Types of verification processes
 */
export type VerificationType =
  | 'email'
  | 'phone'
  | 'identity'
  | 'two_factor'
  | 'password_reset'
  | 'account_activation'
  | 'device_verification'
  | 'document_verification';

/**
 * Verification Status
 * Current status of verification
 */
export type VerificationStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'expired'
  | 'revoked'
  | 'in_progress'
  | 'rejected'
  | 'suspended';

/**
 * Verification Method
 * Methods used for verification
 */
export type VerificationMethod =
  | 'otp'
  | 'email_link'
  | 'sms'
  | 'authenticator'
  | 'backup_code'
  | 'security_question'
  | 'biometric'
  | 'document'
  | 'face_id'
  | 'fingerprint';

/**
 * OTP Type
 * Types of One-Time Passwords
 */
export type OTPType =
  | 'email_verification'
  | 'phone_verification'
  | 'two_factor'
  | 'password_reset'
  | 'transaction'
  | 'login'
  | 'device_verification';

/**
 * OTP Delivery Method
 * How OTP is delivered
 */
export type OTPDeliveryMethod =
  'email' | 'sms' | 'whatsapp' | 'push_notification' | 'authenticator_app' | 'voice_call';

/**
 * Verification Request
 * Base verification request
 */
export interface VerificationRequest {
  userId: UserId;
  type: VerificationType;
  method: VerificationMethod;
  email?: Email;
  phoneNumber?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Response
 * Base verification response
 */
export interface VerificationResponse {
  success: boolean;
  data?: {
    verificationId: string;
    status: VerificationStatus;
    type: VerificationType;
    method: VerificationMethod;
    sentAt: Timestamp;
    expiresAt: Timestamp;
    attempts: number;
    maxAttempts: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OTP Generation Request
 * Request to generate OTP
 */
export interface OTPGenerationRequest {
  userId: UserId;
  type: OTPType;
  deliveryMethod: OTPDeliveryMethod;
  email?: Email;
  phoneNumber?: string;
  length?: number;
  expirySeconds?: number;
  maxAttempts?: number;
  metadata?: Record<string, unknown>;
}

/**
 * OTP Generation Response
 * Response after OTP generation
 */
export interface OTPGenerationResponse {
  success: boolean;
  data?: {
    otpId: string;
    otpCode?: string;
    type: OTPType;
    deliveryMethod: OTPDeliveryMethod;
    sentAt: Timestamp;
    expiresAt: Timestamp;
    expirySeconds: number;
    maxAttempts: number;
    maskedRecipient: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OTP Verification Request
 * Request to verify OTP
 */
export interface OTPVerificationRequest {
  userId: UserId;
  otpId: string;
  otpCode: string;
  type: OTPType;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * OTP Verification Response
 * Response after OTP verification
 */
export interface OTPVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    verificationId?: string;
    status: VerificationStatus;
    verifiedAt: Timestamp;
    attemptsUsed: number;
    remainingAttempts: number;
    token?: Token;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Email Verification Request
 * Request to verify email
 */
export interface EmailVerificationRequest {
  userId: UserId;
  email: Email;
  token?: string;
  resend?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Email Verification Response
 * Response after email verification
 */
export interface EmailVerificationResponse {
  success: boolean;
  data?: {
    email: Email;
    verified: boolean;
    verifiedAt: Timestamp;
    verificationId: string;
    status: VerificationStatus;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Phone Verification Request
 * Request to verify phone number
 */
export interface PhoneVerificationRequest {
  userId: UserId;
  phoneNumber: string;
  countryCode: string;
  token?: string;
  resend?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Phone Verification Response
 * Response after phone verification
 */
export interface PhoneVerificationResponse {
  success: boolean;
  data?: {
    phoneNumber: string;
    countryCode: string;
    verified: boolean;
    verifiedAt: Timestamp;
    verificationId: string;
    status: VerificationStatus;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Identity Verification Request
 * Request for identity verification
 */
export interface IdentityVerificationRequest {
  userId: UserId;
  documentType: string;
  documentNumber: string;
  fullName: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Identity Verification Response
 * Response after identity verification
 */
export interface IdentityVerificationResponse {
  success: boolean;
  data?: {
    verificationId: string;
    status: VerificationStatus;
    documentType: string;
    documentNumber: string;
    verifiedAt?: Timestamp;
    rejectionReason?: string;
    score?: number;
    metadata?: Record<string, unknown>;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Two-Factor Verification Request
 * Request for 2FA verification
 */
export interface TwoFactorVerificationRequest {
  userId: UserId;
  method: 'authenticator' | 'sms' | 'email' | 'backup_code';
  code: string;
  rememberDevice?: boolean;
  deviceId?: string;
  backupCode?: string;
}

/**
 * Two-Factor Verification Response
 * Response after 2FA verification
 */
export interface TwoFactorVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    method: string;
    verifiedAt: Timestamp;
    deviceRemembered: boolean;
    backupCodesRemaining?: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Verification Token
 * Token for verification processes
 */
export interface VerificationToken {
  id: string;
  userId: UserId;
  type: VerificationType;
  token: Token;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  usedAt?: Timestamp;
  used: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Verification History
 * History of verification attempts
 */
export interface VerificationHistory {
  id: string;
  userId: UserId;
  type: VerificationType;
  method: VerificationMethod;
  status: VerificationStatus;
  attemptedAt: Timestamp;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Security
 * Security settings for verification
 */
export interface VerificationSecurity {
  maxAttempts: number;
  blockDuration: number;
  resendCooldown: number;
  otpLength: number;
  otpExpirySeconds: number;
  requireCaptcha: boolean;
  enableRateLimiting: boolean;
  maxRequestsPerHour: number;
  maxRequestsPerDay: number;
  allowedMethods: VerificationMethod[];
  requiredVerifications: VerificationType[];
  enforceTwoFactor: boolean;
  enforceIdentityVerification: boolean;
}

/**
 * Verification Statistics
 * Statistical data about verifications
 */
export interface VerificationStatistics {
  totalVerifications: number;
  successRate: number;
  failureRate: number;
  byType: Record<VerificationType, number>;
  byMethod: Record<VerificationMethod, number>;
  byStatus: Record<VerificationStatus, number>;
  averageAttempts: number;
  averageTimeToVerify: number;
  timestamp: Timestamp;
}

/**
 * Verification Filter
 * Filter criteria for verification queries
 */
export interface VerificationFilter {
  userId?: UserId[];
  type?: VerificationType[];
  status?: VerificationStatus[];
  method?: VerificationMethod[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  verified?: boolean;
}

/**
 * Verification Response Builder
 * Helper for building verification responses
 */
export interface VerificationResponseBuilder {
  success(response: VerificationResponse): VerificationResponse;
  otpSuccess(response: OTPGenerationResponse): OTPGenerationResponse;
  verifySuccess(response: OTPVerificationResponse): OTPVerificationResponse;
  emailSuccess(response: EmailVerificationResponse): EmailVerificationResponse;
  phoneSuccess(response: PhoneVerificationResponse): PhoneVerificationResponse;
  identitySuccess(response: IdentityVerificationResponse): IdentityVerificationResponse;
  twoFactorSuccess(response: TwoFactorVerificationResponse): TwoFactorVerificationResponse;
  error(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ): VerificationErrorResponse;
}

/**
 * Verification Error Response
 * Error response for verification operations
 */
export interface VerificationErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Verification Constants
 * Verification-related constants
 */
export const VERIFICATION_TYPES = {
  EMAIL: 'email',
  PHONE: 'phone',
  IDENTITY: 'identity',
  TWO_FACTOR: 'two_factor',
  PASSWORD_RESET: 'password_reset',
  ACCOUNT_ACTIVATION: 'account_activation',
  DEVICE_VERIFICATION: 'device_verification',
  DOCUMENT_VERIFICATION: 'document_verification',
} as const;

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  IN_PROGRESS: 'in_progress',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

export const VERIFICATION_METHODS = {
  OTP: 'otp',
  EMAIL_LINK: 'email_link',
  SMS: 'sms',
  AUTHENTICATOR: 'authenticator',
  BACKUP_CODE: 'backup_code',
  SECURITY_QUESTION: 'security_question',
  BIOMETRIC: 'biometric',
  DOCUMENT: 'document',
  FACE_ID: 'face_id',
  FINGERPRINT: 'fingerprint',
} as const;

export const OTP_DELIVERY_METHODS = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  PUSH: 'push_notification',
  AUTHENTICATOR: 'authenticator_app',
  VOICE: 'voice_call',
} as const;

/**
 * Default Verification Configuration
 */
export const DEFAULT_VERIFICATION_CONFIG = {
  maxAttempts: 5,
  blockDuration: 900, // 15 minutes
  resendCooldown: 60, // 1 minute
  otpLength: 6,
  otpExpirySeconds: 300, // 5 minutes
  requireCaptcha: true,
  enableRateLimiting: true,
  maxRequestsPerHour: 10,
  maxRequestsPerDay: 50,
  allowedMethods: ['otp', 'email_link', 'sms', 'authenticator'] as VerificationMethod[],
  requiredVerifications: ['email'] as VerificationType[],
  enforceTwoFactor: false,
  enforceIdentityVerification: false,
} as const;

/**
 * OTP Delivery Status
 * Status of OTP delivery
 */
export interface OTPDeliveryStatus {
  delivered: boolean;
  method: OTPDeliveryMethod;
  sentAt: Timestamp;
  deliveredAt?: Timestamp;
  error?: string;
  attempts: number;
  success: boolean;
}

/**
 * Verification Session
 * Active verification session
 */
export interface VerificationSession {
  id: string;
  userId: UserId;
  type: VerificationType;
  status: VerificationStatus;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  completedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * Resend Verification Request
 * Request to resend verification
 */
export interface ResendVerificationRequest {
  userId: UserId;
  type: VerificationType;
  method: VerificationMethod;
  email?: Email;
  phoneNumber?: string;
  reason?: string;
}

/**
 * Resend Verification Response
 * Response after resend verification
 */
export interface ResendVerificationResponse {
  success: boolean;
  data?: {
    verificationId: string;
    sentAt: Timestamp;
    expiresAt: Timestamp;
    nextResendAvailableAt: Timestamp;
    method: VerificationMethod;
    recipient: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Verification Webhook
 * Webhook payload for verification events
 */
export interface VerificationWebhook {
  event: string;
  userId: UserId;
  type: VerificationType;
  status: VerificationStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Document Verification
 * Document verification details
 */
export interface DocumentVerification {
  documentId: string;
  userId: UserId;
  documentType: string;
  documentNumber: string;
  frontImage: string;
  backImage?: string;
  selfieImage?: string;
  status: VerificationStatus;
  submittedAt: Timestamp;
  verifiedAt?: Timestamp;
  rejectionReason?: string;
  metadata?: Record<string, unknown>;
  verificationScore?: number;
  confidence?: number;
}
