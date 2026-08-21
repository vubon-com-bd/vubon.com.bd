/**
 * User KYC Types Module
 * Know Your Customer (KYC) types for the e-commerce platform
 * Handles identity verification, document submission, and compliance
 */

import { UserId, Email, PhoneNumber, Timestamp } from '../auth/core-primitives.types';

/**
 * KYC Status
 * Status of KYC verification
 */
export type KYCStatus =
  'not_started' | 'pending' | 'in_progress' | 'verified' | 'rejected' | 'expired' | 'manual_review';

/**
 * KYC Level
 * Level of KYC verification
 */
export type KYCLevel = 'unverified' | 'basic' | 'intermediate' | 'advanced' | 'premium';

/**
 * Document Type
 * Types of documents for KYC
 */
export type DocumentType =
  | 'passport'
  | 'national_id'
  | 'drivers_license'
  | 'voter_id'
  | 'pan_card'
  | 'aadhaar'
  | 'birth_certificate'
  | 'residence_permit'
  | 'utility_bill'
  | 'bank_statement'
  | 'tax_return';

/**
 * Document Status
 * Status of a document
 */
export type DocumentStatus =
  'uploaded' | 'pending' | 'processing' | 'verified' | 'rejected' | 'expired';

/**
 * KYC Profile
 * User KYC profile
 */
export interface KYCProfile {
  userId: UserId;
  level: KYCLevel;
  status: KYCStatus;
  documents: KYCDocument[];
  personalInfo?: KYCBasicInfo;
  addressInfo?: KYCAddressInfo;
  incomeInfo?: KYCIncomeInfo;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  submittedAt: Timestamp;
  verifiedAt?: Timestamp;
  expiresAt?: Timestamp;
  rejectionReason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Basic Info
 * Basic personal information for KYC
 */
export interface KYCBasicInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  email: Email;
  phoneNumber: PhoneNumber;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Address Info
 * Address information for KYC
 */
export interface KYCAddressInfo {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  residentialStatus: 'own' | 'rent' | 'family' | 'other';
  yearsAtAddress: number;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Income Info
 * Income information for KYC
 */
export interface KYCIncomeInfo {
  occupation: string;
  employmentStatus: 'employed' | 'self_employed' | 'student' | 'retired' | 'unemployed';
  annualIncome: number;
  incomeCurrency: string;
  sourceOfFunds: string;
  employerName?: string;
  employerAddress?: string;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Document
 * KYC document record
 */
export interface KYCDocument {
  id: string;
  userId: UserId;
  type: DocumentType;
  documentNumber: string;
  issuingCountry: string;
  issuingDate?: Timestamp;
  expiryDate?: Timestamp;
  status: DocumentStatus;
  frontImage: string;
  backImage?: string;
  selfieImage?: string;
  verificationScore?: number;
  submittedAt: Timestamp;
  verifiedAt?: Timestamp;
  rejectionReason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Submit Request
 * Request to submit KYC
 */
export interface KYCSubmitRequest {
  userId: UserId;
  personalInfo: KYCBasicInfo;
  addressInfo: KYCAddressInfo;
  documents: {
    type: DocumentType;
    documentNumber: string;
    frontImage: string;
    backImage?: string;
  }[];
  metadata?: Record<string, unknown>;
}

/**
 * KYC Submit Response
 * Response after KYC submission
 */
export interface KYCSubmitResponse {
  success: boolean;
  data?: {
    profile: KYCProfile;
    status: KYCStatus;
    level: KYCLevel;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * KYC Status Request
 * Request to get KYC status
 */
export interface KYCStatusRequest {
  userId: UserId;
}

/**
 * KYC Status Response
 * Response after getting KYC status
 */
export interface KYCStatusResponse {
  success: boolean;
  data?: {
    profile: KYCProfile;
    status: KYCStatus;
    level: KYCLevel;
    completedSteps: string[];
    nextSteps: string[];
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * KYC Document Submit Request
 * Request to submit document
 */
export interface KYCDocumentSubmitRequest {
  userId: UserId;
  type: DocumentType;
  documentNumber: string;
  issuingCountry: string;
  issuingDate?: string;
  expiryDate?: string;
  frontImage: string;
  backImage?: string;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Document Submit Response
 * Response after document submission
 */
export interface KYCDocumentSubmitResponse {
  success: boolean;
  data?: {
    document: KYCDocument;
    status: DocumentStatus;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * KYC Update Request
 * Request to update KYC
 */
export interface KYCUpdateRequest {
  userId: UserId;
  personalInfo?: Partial<KYCBasicInfo>;
  addressInfo?: Partial<KYCAddressInfo>;
  incomeInfo?: Partial<KYCIncomeInfo>;
  metadata?: Record<string, unknown>;
}

/**
 * KYC Update Response
 * Response after KYC update
 */
export interface KYCUpdateResponse {
  success: boolean;
  data?: {
    profile: KYCProfile;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * KYC Filter
 * Filter criteria for KYC queries
 */
export interface KYCFilter {
  userId?: UserId[];
  status?: KYCStatus[];
  level?: KYCLevel[];
  documentType?: DocumentType[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * KYC Response Builder
 * Helper for building KYC responses
 */
export interface KYCResponseBuilder {
  submitSuccess(response: KYCSubmitResponse): KYCSubmitResponse;
  statusSuccess(response: KYCStatusResponse): KYCStatusResponse;
  documentSuccess(response: KYCDocumentSubmitResponse): KYCDocumentSubmitResponse;
  updateSuccess(response: KYCUpdateResponse): KYCUpdateResponse;
  error(code: string, message: string, details?: Record<string, unknown>): KYCErrorResponse;
}

/**
 * KYC Error Response
 * Error response for KYC operations
 */
export interface KYCErrorResponse {
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
 * KYC Constants
 * KYC-related constants
 */
export const KYC_STATUS = {
  NOT_STARTED: 'not_started',
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  MANUAL_REVIEW: 'manual_review',
} as const;

export const KYC_LEVEL = {
  UNVERIFIED: 'unverified',
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  PREMIUM: 'premium',
} as const;

export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  NATIONAL_ID: 'national_id',
  DRIVERS_LICENSE: 'drivers_license',
  VOTER_ID: 'voter_id',
  PAN_CARD: 'pan_card',
  AADHAAR: 'aadhaar',
  BIRTH_CERTIFICATE: 'birth_certificate',
  RESIDENCE_PERMIT: 'residence_permit',
  UTILITY_BILL: 'utility_bill',
  BANK_STATEMENT: 'bank_statement',
  TAX_RETURN: 'tax_return',
} as const;

export const DOCUMENT_STATUS = {
  UPLOADED: 'uploaded',
  PENDING: 'pending',
  PROCESSING: 'processing',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
} as const;

/**
 * Default KYC Configuration
 */
export const DEFAULT_KYC_CONFIG = {
  requireBasicKYC: true,
  requireIntermediateKYC: false,
  requireAdvancedKYC: false,
  maxDocumentSize: 10, // MB
  allowedDocumentTypes: ['passport', 'national_id', 'drivers_license'],
  manualReviewThreshold: 0.7,
  autoVerificationEnabled: true,
  verificationTimeout: 3600, // 1 hour
  expiryDuration: 31536000, // 1 year
} as const;

/**
 * KYC Audit Log
 * Audit log for KYC operations
 */
export interface KYCAuditLog {
  id: string;
  userId: UserId;
  operation: 'submit' | 'update' | 'verify' | 'reject' | 'expire' | 'review';
  type: string;
  status: KYCStatus;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * KYC Statistics
 * Statistical data about KYC
 */
export interface KYCStatistics {
  totalSubmissions: number;
  verified: number;
  rejected: number;
  pending: number;
  byLevel: Record<KYCLevel, number>;
  byStatus: Record<KYCStatus, number>;
  byDocumentType: Record<DocumentType, number>;
  averageVerificationTime: number;
  rejectionRate: number;
  manualReviewRate: number;
  timestamp: Timestamp;
}

/**
 * KYC Webhook
 * Webhook payload for KYC events
 */
export interface KYCWebhook {
  event: string;
  userId: UserId;
  status: KYCStatus;
  level: KYCLevel;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}
