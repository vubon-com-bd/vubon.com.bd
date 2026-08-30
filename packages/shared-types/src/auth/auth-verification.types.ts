/**
 * Authentication Verification Types
 * Email, phone, identity, and document verification data types
 */

import type {
  VerificationType,
  VerificationStatus,
  VerificationMethod,
  DocumentType,
  DocumentStatus,
} from '@vubon/shared-constants';

import type { ID, Timestamp, Email, PhoneNumber } from '../common/core-primitives.types';

/**
 * Verification Data
 * Complete verification record
 */
export interface VerificationData {
  /** Unique identifier for the verification record */
  id: ID;
  /** User ID associated with this verification */
  userId: ID;
  /** Type of verification being performed */
  type: VerificationType;
  /** Current verification status */
  status: VerificationStatus;
  /** Method used for verification */
  method: VerificationMethod;
  /** Value being verified (email, phone, etc.) */
  value: string;
  /** Verification code or token */
  code?: string;
  /** Code expiry timestamp */
  codeExpiresAt?: Timestamp;
  /** Number of attempts made */
  attempts: number;
  /** Maximum allowed attempts */
  maxAttempts: number;
  /** Verification metadata */
  metadata?: Record<string, unknown>;
  /** When verification was initiated */
  createdAt: Timestamp;
  /** When verification was completed */
  completedAt?: Timestamp;
  /** When verification expires */
  expiresAt?: Timestamp;
}

/**
 * Verification Request
 * Request to initiate verification
 */
export interface VerificationRequest {
  /** User ID */
  userId: ID;
  /** Verification type */
  type: VerificationType;
  /** Verification method */
  method: VerificationMethod;
  /** Value to verify (email, phone, etc.) */
  value: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Verify Code Request
 * Request to verify a code
 */
export interface VerifyCodeRequest {
  /** Verification ID or user ID */
  identifier: ID;
  /** Verification code */
  code: string;
  /** Verification type (optional) */
  type?: VerificationType;
}

/**
 * Verification Result
 * Result of a verification attempt
 */
export interface VerificationResult {
  /** Whether verification was successful */
  success: boolean;
  /** Verification status after attempt */
  status: VerificationStatus;
  /** Verification data (if successful) */
  data?: VerificationData;
  /** Error message (if failed) */
  error?: string;
  /** Remaining attempts (if failed) */
  remainingAttempts?: number;
}

/**
 * Document Data
 * Document uploaded for verification (KYC)
 */
export interface DocumentData {
  /** Unique identifier for the document */
  id: ID;
  /** User ID */
  userId: ID;
  /** Document type */
  type: DocumentType;
  /** Document status */
  status: DocumentStatus;
  /** Document file name */
  fileName: string;
  /** Document file URL */
  fileUrl: string;
  /** Document file size in bytes */
  fileSize: number;
  /** Document MIME type */
  mimeType: string;
  /** Document metadata (extracted info) */
  metadata?: DocumentMetadata;
  /** Verification notes */
  notes?: string;
  /** When document was uploaded */
  uploadedAt: Timestamp;
  /** When document was verified/rejected */
  processedAt?: Timestamp;
  /** When document expires */
  expiresAt?: Timestamp;
}

/**
 * Document Metadata
 * Extracted information from documents
 */
export interface DocumentMetadata {
  /** Full name from document */
  fullName?: string;
  /** Date of birth */
  dateOfBirth?: Date;
  /** National ID number */
  nationalId?: string;
  /** Passport number */
  passportNumber?: string;
  /** Driver's license number */
  driversLicenseNumber?: string;
  /** Tax ID number */
  taxId?: string;
  /** Business registration number */
  businessRegistrationNumber?: string;
  /** Trade license number */
  tradeLicenseNumber?: string;
  /** TIN certificate number */
  tinCertificateNumber?: string;
  /** Address from document */
  address?: string;
  /** City from document */
  city?: string;
  /** Country from document */
  country?: string;
  /** Document issue date */
  issueDate?: Date;
  /** Document expiry date */
  expiryDate?: Date;
  /** Additional extracted fields */
  [key: string]: unknown;
}

/**
 * Document Upload Request
 * Request to upload a document
 */
export interface DocumentUploadRequest {
  /** User ID */
  userId: ID;
  /** Document type */
  type: DocumentType;
  /** Document file (base64 or FormData) */
  file: string | File;
  /** File name */
  fileName: string;
  /** File MIME type */
  mimeType: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Identity Verification Data
 * Identity-specific verification information
 */
export interface IdentityVerificationData {
  /** Full name */
  fullName: string;
  /** Date of birth */
  dateOfBirth: Date;
  /** National ID number */
  nationalId: string;
  /** Additional identity data */
  additionalData?: Record<string, unknown>;
}

/**
 * Address Verification Data
 * Address-specific verification information
 */
export interface AddressVerificationData {
  /** Street address */
  street: string;
  /** City */
  city: string;
  /** State/Province */
  state?: string;
  /** Postal code */
  postalCode: string;
  /** Country */
  country: string;
  /** Address type (billing, shipping, etc.) */
  addressType: string;
}

/**
 * Business Verification Data
 * Business-specific verification information
 */
export interface BusinessVerificationData {
  /** Business name */
  businessName: string;
  /** Business registration number */
  registrationNumber: string;
  /** Business tax ID */
  taxId?: string;
  /** Business address */
  address: string;
  /** Business phone */
  phone: PhoneNumber;
  /** Business email */
  email: Email;
  /** Business type */
  businessType: string;
  /** Number of employees */
  employeeCount?: number;
  /** Year established */
  establishedYear?: number;
}

/**
 * Bank Account Verification Data
 * Bank account-specific verification information
 */
export interface BankAccountVerificationData {
  /** Bank name */
  bankName: string;
  /** Account holder name */
  accountHolderName: string;
  /** Account number */
  accountNumber: string;
  /** Routing number */
  routingNumber?: string;
  /** Bank branch */
  branch?: string;
  /** Account type (savings, checking, etc.) */
  accountType: string;
}

/**
 * Verification Statistics
 * Verification usage statistics
 */
export interface VerificationStatistics {
  /** Total verifications initiated */
  totalInitiated: number;
  /** Total verifications completed */
  totalCompleted: number;
  /** Total verifications successful */
  totalSuccessful: number;
  /** Total verifications failed */
  totalFailed: number;
  /** Success rate percentage */
  successRate: number;
  /** Average verification time in seconds */
  averageTime: number;
  /** Verifications by type */
  byType: Record<VerificationType, number>;
  /** Verifications by method */
  byMethod: Record<VerificationMethod, number>;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Verification Session
 * Active verification session data
 */
export interface VerificationSession {
  /** Session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Verification type */
  type: VerificationType;
  /** Verification method */
  method: VerificationMethod;
  /** Session status */
  status: VerificationStatus;
  /** Session start timestamp */
  startedAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
  /** Number of attempts made */
  attempts: number;
  /** Session data */
  data: Record<string, unknown>;
}
