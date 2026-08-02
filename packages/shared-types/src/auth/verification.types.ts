/**
 * Email verification-related type definitions for the monorepo
 * All email verification types are centralized here for consistent usage across packages
 */

/**
 * Email verification status types
 * Represents the current status of an email verification
 */
export type EmailVerificationStatus = 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'FAILED';

/**
 * Email verification interface
 * Represents an email verification record
 */
export interface EmailVerification {
  /** Unique identifier for the verification record */
  id: string;
  /** User ID associated with the verification */
  userId: string;
  /** Email address being verified */
  email: string;
  /** Verification token */
  token: string;
  /** Current status of the verification */
  status: EmailVerificationStatus;
  /** Timestamp when the verification expires */
  expiresAt: Date;
  /** Timestamp when the verification was created */
  createdAt: Date;
  /** Timestamp when the email was verified (null if not verified) */
  verifiedAt: Date | null;
  /** Number of verification attempts */
  attempts: number;
  /** Timestamp of the last verification attempt */
  lastAttemptAt?: Date;
  /** Error message if verification failed */
  errorMessage?: string;
}

/**
 * Send verification email request interface
 * Used when requesting a verification email
 */
export interface SendVerificationEmailRequest {
  /** Email address to send verification to */
  email: string;
  /** User ID if known (optional) */
  userId?: string;
  /** Base URL for verification links */
  baseUrl?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Verify email request interface
 * Used when verifying an email with a token
 */
export interface VerifyEmailRequest {
  /** Verification token */
  token: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Verify email response interface
 * Response after email verification attempt
 */
export interface VerifyEmailResponse {
  /** Whether the verification was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Verified email address if successful */
  email?: string;
  /** User ID if verification was successful */
  userId?: string;
  /** Error code if verification failed */
  errorCode?: string;
  /** Whether the email was already verified */
  alreadyVerified?: boolean;
  /** Whether the verification token has expired */
  tokenExpired?: boolean;
}

/**
 * Resend verification email request interface
 * Used when requesting to resend a verification email
 */
export interface ResendVerificationEmailRequest {
  /** Email address to resend verification to */
  email: string;
  /** Base URL for verification links */
  baseUrl?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Resend verification email response interface
 * Response after requesting to resend verification email
 */
export interface ResendVerificationEmailResponse {
  /** Whether the resend was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Time when the next resend is allowed (in seconds) */
  cooldownSeconds?: number;
  /** Whether the email was already verified */
  alreadyVerified?: boolean;
}

/**
 * Email verification status response interface
 * Current verification status of an email
 */
export interface EmailVerificationStatusResponse {
  /** Email address */
  email: string;
  /** Whether the email is verified */
  isVerified: boolean;
  /** Current verification status */
  status: EmailVerificationStatus;
  /** When the email was verified (if applicable) */
  verifiedAt?: Date;
  /** When the verification expires (if applicable) */
  expiresAt?: Date;
  /** Whether a verification email was sent recently */
  recentEmailSent?: boolean;
  /** Time until next verification email can be sent (in seconds) */
  nextResendAvailableIn?: number;
}

/**
 * Email verification configuration interface
 * Configuration for email verification system
 */
export interface EmailVerificationConfig {
  /** Verification token expiry in hours */
  tokenExpiryHours: number;
  /** Maximum number of verification attempts */
  maxAttempts: number;
  /** Maximum number of resend attempts */
  maxResendAttempts: number;
  /** Cooldown period between resends in seconds */
  resendCooldownSeconds: number;
  /** Whether verification is required for registration */
  requiredForRegistration: boolean;
  /** Whether to automatically verify emails from trusted providers */
  autoVerifyTrustedProviders: boolean;
  /** Whether to log all verification attempts */
  logAllAttempts: boolean;
  /** Whether to notify on verification success */
  notifyOnSuccess: boolean;
  /** Whether to notify on verification failure */
  notifyOnFailure: boolean;
}

/**
 * Email verification statistics interface
 * Statistical data about email verifications
 */
export interface EmailVerificationStatistics {
  /** Total number of verification requests */
  totalRequests: number;
  /** Number of successful verifications */
  successfulVerifications: number;
  /** Number of failed verifications */
  failedVerifications: number;
  /** Number of expired verifications */
  expiredVerifications: number;
  /** Success rate as a percentage */
  successRate: number;
  /** Average verification time in seconds */
  averageVerificationTime: number;
  /** Verification attempts by status */
  attemptsByStatus: Record<EmailVerificationStatus, number>;
  /** Recent verifications (last 24 hours) */
  recentVerifications: {
    total: number;
    success: number;
    failure: number;
  };
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Email verification filter interface
 * Used for filtering verification records in lists
 */
export interface EmailVerificationFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by email address */
  email?: string;
  /** Filter by status */
  status?: EmailVerificationStatus;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Filter by verification attempts */
  minAttempts?: number;
  maxAttempts?: number;
  /** Search term for email or token */
  search?: string;
}

/**
 * Email verification list response interface
 * Paginated list of verification records
 */
export interface EmailVerificationListResponse {
  /** Array of verification records */
  verifications: EmailVerification[];
  /** Total number of records */
  total: number;
  /** Current page number */
  page: number;
  /** Number of records per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Email verification event interface
 * Used for verification-related events
 */
export interface EmailVerificationEvent {
  /** Type of verification event */
  type: 'REQUESTED' | 'RESENT' | 'VERIFIED' | 'EXPIRED' | 'FAILED';
  /** User ID */
  userId?: string;
  /** Email address */
  email: string;
  /** Verification status */
  status: EmailVerificationStatus;
  /** Timestamp of the event */
  timestamp: Date;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Email verification webhook payload interface
 * Used for sending verification events to webhooks
 */
export interface EmailVerificationWebhookPayload {
  /** Event type */
  event:
    'email.verification.requested' | 'email.verification.verified' | 'email.verification.expired';
  /** User ID */
  userId?: string;
  /** Email address */
  email: string;
  /** Verification status */
  status: EmailVerificationStatus;
  /** Timestamp of the event */
  timestamp: string;
  /** Additional data */
  data: {
    token?: string;
    attempts?: number;
    verifiedAt?: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Email verification token generation interface
 * Used for generating verification tokens
 */
export interface EmailVerificationTokenGeneration {
  /** User ID for the token */
  userId: string;
  /** Email address to verify */
  email: string;
  /** Token expiry in hours (optional) */
  expiryHours?: number;
  /** Additional claims to include */
  additionalClaims?: Record<string, unknown>;
}

/**
 * Email verification validation result interface
 * Result of validating a verification token
 */
export interface EmailVerificationValidationResult {
  /** Whether the token is valid */
  isValid: boolean;
  /** User ID if token is valid */
  userId?: string;
  /** Email address if token is valid */
  email?: string;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
  /** Whether the token is expired */
  isExpired?: boolean;
  /** Whether the email is already verified */
  alreadyVerified?: boolean;
}
