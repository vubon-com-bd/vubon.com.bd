/**
 * Verification Types - Pure TypeScript type contracts for Email/Phone Verification
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/auth/verification.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO sending logic, email generation, SMS implementation
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  TOKEN_EXPIRY,
  OTP_CONFIG,
} from '@vubon/shared-constants';

// ============================================================
// Verification Types (Based on constants)
// ============================================================
export type VerificationType = 
  | 'email_verification'
  | 'phone_verification'
  | 'password_reset'
  | 'magic_link'
  | 'email_change'
  | 'phone_change'
  | 'account_recovery'
  | 'device_verification'
  | 'mfa_setup'
  | 'whatsapp_verification'      // Bangladesh specific
  | 'imo_verification'            // Bangladesh specific
  | 'bkash_verification'          // Bangladesh specific
  | 'nagad_verification'          // Bangladesh specific
  | 'rocket_verification';        // Bangladesh specific

// ============================================================
// Verification Status
// ============================================================
export type VerificationStatus = 
  | 'pending'      // Awaiting user verification
  | 'verified'     // Successfully verified
  | 'expired'      // Token/code expired
  | 'failed'       // Verification failed (max attempts exceeded)
  | 'cancelled'    // User or admin cancelled
  | 'used';        // Token/code already used

// ============================================================
// Verification Method (How verification is sent)
// ============================================================
export type VerificationMethod = 
  | 'email'
  | 'sms'
  | 'whatsapp'     // Bangladesh specific
  | 'imo'          // Bangladesh specific
  | 'voice_call'   // For feature phones (Bangladesh specific)
  | 'push';        // Mobile app push notification

// ============================================================
// Verification Entity (Core domain model)
// ============================================================
export interface Verification {
  readonly id: string;
  readonly userId: string;
  readonly type: VerificationType;
  readonly method: VerificationMethod;
  readonly target: string;                    // email or phone number
  readonly tokenHash: string;                 // Hashed token (for security)
  readonly codeHash: string | null;           // Hashed OTP code
  readonly status: VerificationStatus;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly verifiedAt: Date | null;
  readonly cancelledAt: Date | null;
  readonly metadata: VerificationMetadata;
}

// ============================================================
// Verification Metadata
// ============================================================
export interface VerificationMetadata {
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly redirectUrl?: string;
  readonly newValue?: string;                 // For email/phone change
  readonly oldValue?: string;                // For email/phone change
  readonly requestId?: string;
  readonly sessionId?: string;
  
  // Bangladesh specific
  readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  readonly whatsappBusinessAccount?: boolean;
  readonly voiceCallLanguage?: 'en' | 'bn';
}

// ============================================================
// Create Verification Request (Internal)
// ============================================================
export interface CreateVerificationRequest {
  readonly userId: string;
  readonly type: VerificationType;
  readonly method: VerificationMethod;
  readonly target: string;
  readonly expiresInSeconds?: number;
  readonly maxAttempts?: number;
  readonly metadata?: Partial<VerificationMetadata>;
}

// ============================================================
// Verification Request (User input)
// ============================================================
export interface VerifyRequest {
  readonly token?: string;
  readonly code?: string;
  readonly userId: string;
  readonly type: VerificationType;
  readonly method?: VerificationMethod;
}

// ============================================================
// Verification Result
// ============================================================
export interface VerificationResult {
  readonly success: boolean;
  readonly status: VerificationStatus;
  readonly message?: string;
  readonly verifiedAt?: Date;
  readonly remainingAttempts?: number;
  readonly expiresAt?: Date;
  readonly requiresNewCode?: boolean;
}

// ============================================================
// Resend Verification Request
// ============================================================
export interface ResendVerificationRequest {
  readonly userId: string;
  readonly type: VerificationType;
  readonly method?: VerificationMethod;
  readonly target?: string;
  readonly reason?: string;
}

export interface ResendVerificationResponse {
  readonly success: boolean;
  readonly message: string;
  readonly cooldownSeconds: number;
  readonly expiresAt: Date;
  readonly method: VerificationMethod;
}

// ============================================================
// Verification DTO for API Responses
// ============================================================
export interface VerificationDTO {
  readonly id: string;
  readonly type: VerificationType;
  readonly method: VerificationMethod;
  readonly target: string;                    // Masked (e.g., u***@example.com)
  readonly status: VerificationStatus;
  readonly expiresAt: string;                // ISO date
  readonly createdAt: string;                // ISO date
  readonly verifiedAt: string | null;
  readonly remainingAttempts: number;
}

// ============================================================
// Magic Link Request/Response
// ============================================================
export interface MagicLinkRequest {
  readonly email: string;
  readonly redirectUrl: string;
  readonly deviceInfo?: {
    readonly deviceId?: string;
    readonly userAgent?: string;
    readonly ipAddress?: string;
  };
  readonly action?: 'login' | 'signup' | 'verify';
}

export interface MagicLinkResponse {
  readonly success: boolean;
  readonly message: string;
  readonly emailSent: boolean;
  readonly expiresInSeconds: number;
  readonly resendCooldownSeconds: number;
}

// ============================================================
// Magic Link Verification
// ============================================================
export interface MagicLinkVerification {
  readonly token: string;
  readonly email: string;
  readonly isValid: boolean;
  readonly expiresAt: Date;
  readonly action: 'login' | 'signup' | 'verify';
  readonly userId?: string;
  readonly redirectUrl?: string;
}

// ============================================================
// Email Change Request
// ============================================================
export interface EmailChangeRequest {
  readonly userId: string;
  readonly newEmail: string;
  readonly password: string;
  readonly reason?: string;
}

export interface EmailChangeResponse {
  readonly success: boolean;
  readonly message: string;
  readonly verificationSent: boolean;
  readonly targetEmail: string;              // Masked
  readonly expiresInSeconds: number;
}

// ============================================================
// Email Change Verification
// ============================================================
export interface EmailChangeVerification {
  readonly userId: string;
  readonly oldEmail: string;
  readonly newEmail: string;
  readonly token: string;
  readonly expiresAt: Date;
  readonly status: 'pending' | 'completed' | 'expired';
}

// ============================================================
// Phone Change Request (Bangladesh specific)
// ============================================================
export interface PhoneChangeRequest {
  readonly userId: string;
  readonly newPhoneNumber: string;
  readonly password: string;
  readonly reason?: string;
}

export interface PhoneChangeResponse {
  readonly success: boolean;
  readonly message: string;
  readonly verificationSent: boolean;
  readonly method: VerificationMethod;
  readonly expiresInSeconds: number;
}

// ============================================================
// Phone Verification Request (Bangladesh specific)
// ============================================================
export interface PhoneVerificationRequest {
  readonly phoneNumber: string;
  readonly countryCode: string;              // '+880' for Bangladesh
  readonly method?: 'sms' | 'whatsapp' | 'voice';
  readonly locale?: 'en' | 'bn';
}

export interface PhoneVerificationResponse {
  readonly success: boolean;
  readonly message: string;
  readonly verificationId: string;
  readonly method: VerificationMethod;
  readonly expiresInSeconds: number;
  readonly resendCooldownSeconds: number;
}

// ============================================================
// WhatsApp Verification (Bangladesh specific)
// ============================================================
export interface WhatsAppVerificationRequest {
  readonly phoneNumber: string;
  readonly businessAccountId?: string;
  readonly templateName?: string;
  readonly locale?: 'en' | 'bn';
}

export interface WhatsAppVerificationResponse {
  readonly success: boolean;
  readonly messageId: string;
  readonly expiresInSeconds: number;
  readonly status: 'sent' | 'pending' | 'failed';
}

// ============================================================
// Voice Call Verification (For feature phones - Bangladesh specific)
// ============================================================
export interface VoiceVerificationRequest {
  readonly phoneNumber: string;
  readonly language: 'en' | 'bn';
  readonly retryCount?: number;
}

export interface VoiceVerificationResponse {
  readonly success: boolean;
  readonly callId: string;
  readonly expiresInSeconds: number;
  readonly status: 'initiated' | 'in_progress' | 'completed' | 'failed';
}

// ============================================================
// Verification Statistics (For admin dashboard)
// ============================================================
export interface VerificationStatistics {
  readonly totalSent: number;
  readonly totalVerified: number;
  readonly totalExpired: number;
  readonly totalFailed: number;
  readonly totalCancelled: number;
  
  readonly successRate: number;               // Percentage
  readonly averageVerificationTimeSeconds: number;
  readonly medianVerificationTimeSeconds: number;
  
  readonly byType: Record<VerificationType, {
    readonly sent: number;
    readonly verified: number;
    readonly successRate: number;
  }>;
  
  readonly byMethod: Record<VerificationMethod, {
    readonly sent: number;
    readonly verified: number;
    readonly successRate: number;
  }>;
  
  readonly byHour: ReadonlyArray<{
    readonly hour: string;
    readonly sent: number;
    readonly verified: number;
  }>;
  
  readonly topFailedReasons: ReadonlyArray<{
    readonly reason: string;
    readonly count: number;
  }>;
  
  // Bangladesh specific
  readonly smsSuccessRate: number;
  readonly whatsappSuccessRate: number;
  readonly voiceCallSuccessRate: number;
  readonly mobileOperatorBreakdown: Record<string, number>;
}

// ============================================================
// Verification Filter Options
// ============================================================
export interface VerificationFilterOptions {
  readonly userId?: string;
  readonly type?: VerificationType;
  readonly method?: VerificationMethod;
  readonly status?: VerificationStatus;
  readonly target?: string;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'createdAt' | 'expiresAt' | 'verifiedAt';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Verification Rate Limit Status
// ============================================================
export interface VerificationRateLimit {
  readonly limited: boolean;
  readonly remaining: number;
  readonly resetAt: Date;
  readonly limit: number;
  readonly windowMs: number;
}

// ============================================================
// Verification Cleanup Criteria
// ============================================================
export interface VerificationCleanupCriteria {
  readonly olderThan?: Date;
  readonly status?: readonly VerificationStatus[];
  readonly type?: readonly VerificationType[];
  readonly limit?: number;
}

export interface VerificationCleanupResult {
  readonly totalDeleted: number;
  readonly deletedByStatus: Record<VerificationStatus, number>;
  readonly archivedCount: number;
  readonly cleanupCompletedAt: Date;
}

// ============================================================
// Verification Webhook Events
// ============================================================
export type VerificationWebhookEventType = 
  | 'verification.sent'
  | 'verification.verified'
  | 'verification.expired'
  | 'verification.failed'
  | 'verification.resend'
  | 'verification.cancelled';

export interface VerificationWebhookPayload {
  readonly eventType: VerificationWebhookEventType;
  readonly verificationId: string;
  readonly userId: string;
  readonly type: VerificationType;
  readonly method: VerificationMethod;
  readonly target: string;
  readonly timestamp: Date;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// OTP Configuration Type (From constants)
// ============================================================
export interface OTPConfig {
  readonly length: number;
  readonly digitsOnly: boolean;
  readonly totpIntervalSeconds: number;
  readonly totpDigits: number;
  readonly totpAlgorithm: string;
  readonly smsMaxLength: number;
  readonly voiceOtpEnabled: boolean;
  readonly voiceLanguage: 'en' | 'bn';
  readonly whatsappTemplate: string;
}

// ============================================================
// Verification Template Data (For emails/SMS)
// ============================================================
export interface EmailVerificationTemplate {
  readonly subject: string;
  readonly subjectBn?: string;
  readonly body: string;
  readonly bodyBn?: string;
  readonly buttonText: string;
  readonly buttonTextBn?: string;
  readonly expiryWarning: string;
}

export interface SMSVerificationTemplate {
  readonly message: string;
  readonly messageBn?: string;
  readonly expirySeconds: number;
}

export interface WhatsAppVerificationTemplate {
  readonly templateName: string;
  readonly language: 'en' | 'bn';
  readonly components: readonly {
    readonly type: 'body' | 'header' | 'footer';
    readonly parameters: readonly {
      readonly type: 'text' | 'currency' | 'date_time';
      readonly text?: string;
    }[];
  }[];
}

// ============================================================
// Verification Audit Log
// ============================================================
export interface VerificationAuditLog {
  readonly id: string;
  readonly verificationId: string;
  readonly userId: string;
  readonly action: 'create' | 'resend' | 'verify' | 'expire' | 'cancel';
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// Verification Health Check
// ============================================================
export interface VerificationHealthStatus {
  readonly emailServiceHealthy: boolean;
  readonly smsServiceHealthy: boolean;
  readonly whatsappServiceHealthy: boolean;
  readonly voiceServiceHealthy: boolean;
  readonly averageLatencyMs: number;
  readonly lastFailureAt: Date | null;
  readonly successRateLastHour: number;
}
