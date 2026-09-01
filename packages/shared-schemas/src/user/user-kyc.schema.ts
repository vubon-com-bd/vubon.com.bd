/**
 * User KYC Schema
 * Zod schemas for user KYC (Know Your Customer) management
 */

import { z } from 'zod';
import {
  USER_KYC_STATUS,
  USER_KYC_LEVEL,
  USER_KYC_DOCUMENT_TYPE,
  USER_KYC_DOCUMENT_STATUS,
  USER_KYC_RISK_LEVEL,
  USER_KYC_REJECTION_REASON,
  USER_KYC_VERIFICATION_METHOD,
  USER_KYC_STATUS_LABELS,
  USER_KYC_LEVEL_LABELS,
  USER_KYC_DOCUMENT_TYPE_LABELS,
  USER_KYC_DOCUMENT_STATUS_LABELS,
  USER_KYC_RISK_LEVEL_LABELS,
  USER_KYC_REJECTION_REASON_LABELS,
  USER_KYC_VERIFICATION_METHOD_LABELS,
} from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  urlSchema,
} from '../common/core-primitives.schema';

// ============================================================
// USER KYC TYPE SCHEMAS
// ============================================================

/**
 * User KYC status schema
 */
export const userKycStatusSchema = z.enum([
  USER_KYC_STATUS.NOT_SUBMITTED,
  USER_KYC_STATUS.PENDING,
  USER_KYC_STATUS.IN_PROGRESS,
  USER_KYC_STATUS.APPROVED,
  USER_KYC_STATUS.REJECTED,
  USER_KYC_STATUS.REQUIRES_INFO,
  USER_KYC_STATUS.EXPIRED,
  USER_KYC_STATUS.ON_HOLD,
  USER_KYC_STATUS.REQUIRES_REVIEW,
  USER_KYC_STATUS.FLAGGED,
  USER_KYC_STATUS.SUSPENDED,
]);

/**
 * User KYC level schema
 */
export const userKycLevelSchema = z.enum([
  USER_KYC_LEVEL.LEVEL_0,
  USER_KYC_LEVEL.LEVEL_1,
  USER_KYC_LEVEL.LEVEL_2,
  USER_KYC_LEVEL.LEVEL_3,
  USER_KYC_LEVEL.LEVEL_4,
  USER_KYC_LEVEL.LEVEL_5,
]);

/**
 * User KYC document type schema
 */
export const userKycDocumentTypeSchema = z.enum([
  USER_KYC_DOCUMENT_TYPE.NATIONAL_ID,
  USER_KYC_DOCUMENT_TYPE.PASSPORT,
  USER_KYC_DOCUMENT_TYPE.DRIVERS_LICENSE,
  USER_KYC_DOCUMENT_TYPE.VOTER_ID,
  USER_KYC_DOCUMENT_TYPE.BIRTH_CERTIFICATE,
  USER_KYC_DOCUMENT_TYPE.UTILITY_BILL,
  USER_KYC_DOCUMENT_TYPE.BANK_STATEMENT,
  USER_KYC_DOCUMENT_TYPE.TAX_ID,
  USER_KYC_DOCUMENT_TYPE.BUSINESS_REGISTRATION,
  USER_KYC_DOCUMENT_TYPE.TRADE_LICENSE,
  USER_KYC_DOCUMENT_TYPE.TIN_CERTIFICATE,
  USER_KYC_DOCUMENT_TYPE.COMPANY_PROFILE,
  USER_KYC_DOCUMENT_TYPE.FINANCIAL_STATEMENT,
  USER_KYC_DOCUMENT_TYPE.INCORPORATION_CERTIFICATE,
  USER_KYC_DOCUMENT_TYPE.SHAREHOLDERS_AGREEMENT,
  USER_KYC_DOCUMENT_TYPE.BOARD_RESOLUTION,
]);

/**
 * User KYC document status schema
 */
export const userKycDocumentStatusSchema = z.enum([
  USER_KYC_DOCUMENT_STATUS.UPLOADED,
  USER_KYC_DOCUMENT_STATUS.PROCESSING,
  USER_KYC_DOCUMENT_STATUS.VERIFIED,
  USER_KYC_DOCUMENT_STATUS.REJECTED,
  USER_KYC_DOCUMENT_STATUS.EXPIRED,
  USER_KYC_DOCUMENT_STATUS.REQUIRES_REVIEW,
  USER_KYC_DOCUMENT_STATUS.ON_HOLD,
  USER_KYC_DOCUMENT_STATUS.FLAGGED,
]);

/**
 * User KYC risk level schema
 */
export const userKycRiskLevelSchema = z.enum([
  USER_KYC_RISK_LEVEL.LOW,
  USER_KYC_RISK_LEVEL.MEDIUM,
  USER_KYC_RISK_LEVEL.HIGH,
  USER_KYC_RISK_LEVEL.VERY_HIGH,
  USER_KYC_RISK_LEVEL.CRITICAL,
]);

/**
 * User KYC rejection reason schema
 */
export const userKycRejectionReasonSchema = z.enum([
  USER_KYC_REJECTION_REASON.DOCUMENT_UNCLEAR,
  USER_KYC_REJECTION_REASON.DOCUMENT_EXPIRED,
  USER_KYC_REJECTION_REASON.DOCUMENT_FORGED,
  USER_KYC_REJECTION_REASON.DOCUMENT_INVALID,
  USER_KYC_REJECTION_REASON.INFO_MISMATCH,
  USER_KYC_REJECTION_REASON.INSUFFICIENT_INFO,
  USER_KYC_REJECTION_REASON.SUSPICIOUS_ACTIVITY,
  USER_KYC_REJECTION_REASON.SANCTIONS_MATCH,
  USER_KYC_REJECTION_REASON.PEP,
  USER_KYC_REJECTION_REASON.ADVERSE_MEDIA,
  USER_KYC_REJECTION_REASON.DUPLICATE,
  USER_KYC_REJECTION_REASON.AGE_RESTRICTION,
  USER_KYC_REJECTION_REASON.COUNTRY_RESTRICTION,
  USER_KYC_REJECTION_REASON.OTHER,
]);

/**
 * User KYC verification method schema
 */
export const userKycVerificationMethodSchema = z.enum([
  USER_KYC_VERIFICATION_METHOD.MANUAL,
  USER_KYC_VERIFICATION_METHOD.AUTOMATED,
  USER_KYC_VERIFICATION_METHOD.THIRD_PARTY,
  USER_KYC_VERIFICATION_METHOD.AI,
  USER_KYC_VERIFICATION_METHOD.BIOMETRIC,
  USER_KYC_VERIFICATION_METHOD.VIDEO,
  USER_KYC_VERIFICATION_METHOD.LIVE,
]);

// ============================================================
// USER KYC DOCUMENT SCHEMA
// ============================================================

/**
 * User KYC document schema
 */
export const userKycDocumentSchema = z.object({
  id: idSchema,
  userId: idSchema,
  documentType: userKycDocumentTypeSchema,
  status: userKycDocumentStatusSchema,
  fileUrl: urlSchema,
  fileName: z.string().min(1),
  fileSize: z.number().int().min(0),
  mimeType: z.string().min(1),
  notes: z.string().optional(),
  reviewedBy: idSchema.optional(),
  rejectionReason: userKycRejectionReasonSchema.optional(),
  uploadedAt: timestampSchema,
  reviewedAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER KYC RECORD SCHEMA
// ============================================================

/**
 * User KYC record schema
 */
export const userKycRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  status: userKycStatusSchema,
  level: userKycLevelSchema,
  riskLevel: userKycRiskLevelSchema,
  verificationMethod: userKycVerificationMethodSchema,
  documents: z.array(userKycDocumentSchema),
  submittedBy: idSchema,
  reviewedBy: idSchema.optional(),
  rejectionReason: userKycRejectionReasonSchema.optional(),
  notes: z.string().optional(),
  submittedAt: timestampSchema,
  reviewedAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER KYC REQUEST SCHEMAS
// ============================================================

/**
 * User KYC submission request schema
 */
export const userKycSubmissionRequestSchema = z.object({
  userId: idSchema,
  documents: z.array(
    z.object({
      type: userKycDocumentTypeSchema,
      file: z.union([z.string(), z.instanceof(File)]),
      metadata: jsonObjectSchema.optional(),
    })
  ),
  notes: z.string().optional(),
});

/**
 * User KYC review request schema
 */
export const userKycReviewRequestSchema = z.object({
  kycId: idSchema,
  status: z.enum(['approved', 'rejected', 'requires_info']),
  rejectionReason: userKycRejectionReasonSchema.optional(),
  notes: z.string().optional(),
  reviewedBy: idSchema,
});

/**
 * User KYC update request schema
 */
export const userKycUpdateRequestSchema = z.object({
  kycId: idSchema,
  documents: z
    .array(
      z.object({
        type: userKycDocumentTypeSchema,
        file: z.union([z.string(), z.instanceof(File)]),
        metadata: jsonObjectSchema.optional(),
      })
    )
    .optional(),
  notes: z.string().optional(),
});

// ============================================================
// USER KYC RESPONSE SCHEMA
// ============================================================

/**
 * User KYC response schema
 */
export const userKycResponseSchema = z.object({
  success: z.boolean(),
  kyc: userKycRecordSchema.optional(),
  error: z.string().optional(),
  requiredDocuments: z.array(userKycDocumentTypeSchema).optional(),
  nextLevel: userKycLevelSchema.optional(),
});

// ============================================================
// USER KYC FILTER SCHEMA
// ============================================================

/**
 * User KYC filter schema
 */
export const userKycFilterSchema = z.object({
  userId: idSchema.optional(),
  status: z.union([userKycStatusSchema, z.array(userKycStatusSchema)]).optional(),
  level: z.union([userKycLevelSchema, z.array(userKycLevelSchema)]).optional(),
  riskLevel: z.union([userKycRiskLevelSchema, z.array(userKycRiskLevelSchema)]).optional(),
  documentType: z.union([userKycDocumentTypeSchema, z.array(userKycDocumentTypeSchema)]).optional(),
  verificationMethod: z
    .union([userKycVerificationMethodSchema, z.array(userKycVerificationMethodSchema)])
    .optional(),
  activeOnly: z.boolean().optional(),
  approvedOnly: z.boolean().optional(),
  dateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

// ============================================================
// USER KYC SUMMARY SCHEMA
// ============================================================

/**
 * User KYC summary schema
 */
export const userKycSummarySchema = z.object({
  userId: idSchema,
  status: userKycStatusSchema,
  level: userKycLevelSchema,
  totalDocuments: z.number().int().min(0),
  verifiedDocuments: z.number().int().min(0),
  pendingDocuments: z.number().int().min(0),
  rejectedDocuments: z.number().int().min(0),
  riskLevel: userKycRiskLevelSchema,
  submittedAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  nextLevel: userKycLevelSchema.optional(),
  requiredDocuments: z.array(userKycDocumentTypeSchema),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserKycStatus = z.infer<typeof userKycStatusSchema>;
export type UserKycLevel = z.infer<typeof userKycLevelSchema>;
export type UserKycDocumentType = z.infer<typeof userKycDocumentTypeSchema>;
export type UserKycDocumentStatus = z.infer<typeof userKycDocumentStatusSchema>;
export type UserKycRiskLevel = z.infer<typeof userKycRiskLevelSchema>;
export type UserKycRejectionReason = z.infer<typeof userKycRejectionReasonSchema>;
export type UserKycVerificationMethod = z.infer<typeof userKycVerificationMethodSchema>;
export type UserKycDocument = z.infer<typeof userKycDocumentSchema>;
export type UserKycRecord = z.infer<typeof userKycRecordSchema>;
export type UserKycSubmissionRequest = z.infer<typeof userKycSubmissionRequestSchema>;
export type UserKycReviewRequest = z.infer<typeof userKycReviewRequestSchema>;
export type UserKycUpdateRequest = z.infer<typeof userKycUpdateRequestSchema>;
export type UserKycResponse = z.infer<typeof userKycResponseSchema>;
export type UserKycFilter = z.infer<typeof userKycFilterSchema>;
export type UserKycSummary = z.infer<typeof userKycSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user KYC status is valid
 */
export function isValidUserKycStatus(status: string): status is UserKycStatus {
  return Object.values(USER_KYC_STATUS).includes(status as UserKycStatus);
}

/**
 * Check if user KYC level is valid
 */
export function isValidUserKycLevel(level: string): level is UserKycLevel {
  return Object.values(USER_KYC_LEVEL).includes(level as UserKycLevel);
}

/**
 * Check if user KYC document type is valid
 */
export function isValidUserKycDocumentType(type: string): type is UserKycDocumentType {
  return Object.values(USER_KYC_DOCUMENT_TYPE).includes(type as UserKycDocumentType);
}

/**
 * Check if user KYC document status is valid
 */
export function isValidUserKycDocumentStatus(status: string): status is UserKycDocumentStatus {
  return Object.values(USER_KYC_DOCUMENT_STATUS).includes(status as UserKycDocumentStatus);
}

/**
 * Check if user KYC risk level is valid
 */
export function isValidUserKycRiskLevel(level: string): level is UserKycRiskLevel {
  return Object.values(USER_KYC_RISK_LEVEL).includes(level as UserKycRiskLevel);
}

/**
 * Check if user KYC rejection reason is valid
 */
export function isValidUserKycRejectionReason(reason: string): reason is UserKycRejectionReason {
  return Object.values(USER_KYC_REJECTION_REASON).includes(reason as UserKycRejectionReason);
}

/**
 * Check if user KYC verification method is valid
 */
export function isValidUserKycVerificationMethod(
  method: string
): method is UserKycVerificationMethod {
  return Object.values(USER_KYC_VERIFICATION_METHOD).includes(method as UserKycVerificationMethod);
}

/**
 * Get user KYC status display name
 */
export function getUserKycStatusDisplayName(status: UserKycStatus): string {
  return USER_KYC_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC level display name
 */
export function getUserKycLevelDisplayName(level: UserKycLevel): string {
  return USER_KYC_LEVEL_LABELS[level] || level;
}

/**
 * Get user KYC document type display name
 */
export function getUserKycDocumentTypeDisplayName(type: UserKycDocumentType): string {
  return USER_KYC_DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * Get user KYC document status display name
 */
export function getUserKycDocumentStatusDisplayName(status: UserKycDocumentStatus): string {
  return USER_KYC_DOCUMENT_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC risk level display name
 */
export function getUserKycRiskLevelDisplayName(level: UserKycRiskLevel): string {
  return USER_KYC_RISK_LEVEL_LABELS[level] || level;
}

/**
 * Get user KYC rejection reason display name
 */
export function getUserKycRejectionReasonDisplayName(reason: UserKycRejectionReason): string {
  return USER_KYC_REJECTION_REASON_LABELS[reason] || reason;
}

/**
 * Get user KYC verification method display name
 */
export function getUserKycVerificationMethodDisplayName(method: UserKycVerificationMethod): string {
  return USER_KYC_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Check if KYC is approved
 */
export function isUserKycApproved(status: UserKycStatus): boolean {
  return status === USER_KYC_STATUS.APPROVED;
}

/**
 * Check if KYC is pending
 */
export function isUserKycPending(status: UserKycStatus): boolean {
  const pendingStatuses: UserKycStatus[] = [
    'pending',
    'in_progress',
    'requires_info',
    'requires_review',
  ];
  return pendingStatuses.includes(status);
}

/**
 * Check if KYC is rejected
 */
export function isUserKycRejected(status: UserKycStatus): boolean {
  const rejectedStatuses: UserKycStatus[] = ['rejected', 'expired', 'flagged'];
  return rejectedStatuses.includes(status);
}

/**
 * Check if KYC is active
 */
export function isUserKycActive(status: UserKycStatus): boolean {
  const activeStatuses: UserKycStatus[] = ['pending', 'in_progress', 'requires_info', 'approved'];
  return activeStatuses.includes(status);
}

/**
 * Get all user KYC statuses
 */
export function getAllUserKycStatuses(): UserKycStatus[] {
  return Object.values(USER_KYC_STATUS);
}

/**
 * Get all user KYC levels
 */
export function getAllUserKycLevels(): UserKycLevel[] {
  return Object.values(USER_KYC_LEVEL);
}

/**
 * Get all user KYC document types
 */
export function getAllUserKycDocumentTypes(): UserKycDocumentType[] {
  return Object.values(USER_KYC_DOCUMENT_TYPE);
}

/**
 * Get all user KYC document statuses
 */
export function getAllUserKycDocumentStatuses(): UserKycDocumentStatus[] {
  return Object.values(USER_KYC_DOCUMENT_STATUS);
}

/**
 * Get all user KYC risk levels
 */
export function getAllUserKycRiskLevels(): UserKycRiskLevel[] {
  return Object.values(USER_KYC_RISK_LEVEL);
}

/**
 * Get all user KYC rejection reasons
 */
export function getAllUserKycRejectionReasons(): UserKycRejectionReason[] {
  return Object.values(USER_KYC_REJECTION_REASON);
}

/**
 * Get all user KYC verification methods
 */
export function getAllUserKycVerificationMethods(): UserKycVerificationMethod[] {
  return Object.values(USER_KYC_VERIFICATION_METHOD);
}

/**
 * Get required documents for KYC level
 */
export function getUserKycLevelDocuments(level: UserKycLevel): UserKycDocumentType[] {
  const documentMap: Record<UserKycLevel, UserKycDocumentType[]> = {
    level_0: [],
    level_1: ['national_id'],
    level_2: ['national_id', 'passport', 'drivers_license'],
    level_3: ['national_id', 'passport', 'drivers_license', 'utility_bill', 'bank_statement'],
    level_4: [
      'national_id',
      'passport',
      'drivers_license',
      'utility_bill',
      'bank_statement',
      'tax_id',
    ],
    level_5: [
      'national_id',
      'passport',
      'drivers_license',
      'utility_bill',
      'bank_statement',
      'tax_id',
      'business_registration',
      'trade_license',
      'tin_certificate',
      'company_profile',
    ],
  };
  return documentMap[level] || [];
}

/**
 * Get next KYC level
 */
export function getUserKycNextLevel(currentLevel: UserKycLevel): UserKycLevel | null {
  const levels = getAllUserKycLevels();
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex >= levels.length - 1) {
    return null;
  }
  return levels[currentIndex + 1];
}

/**
 * Get KYC level from status
 */
export function getUserKycLevelFromStatus(status: UserKycStatus): UserKycLevel {
  const levelMap: Record<UserKycStatus, UserKycLevel> = {
    not_submitted: 'level_0',
    pending: 'level_1',
    in_progress: 'level_1',
    approved: 'level_2',
    rejected: 'level_0',
    requires_info: 'level_1',
    expired: 'level_0',
    on_hold: 'level_1',
    requires_review: 'level_1',
    flagged: 'level_0',
    suspended: 'level_0',
  };
  return levelMap[status] || 'level_0';
}

/**
 * Check if KYC document is verified
 */
export function isUserKycDocumentVerified(status: UserKycDocumentStatus): boolean {
  return status === USER_KYC_DOCUMENT_STATUS.VERIFIED;
}

/**
 * Check if KYC document is rejected
 */
export function isUserKycDocumentRejected(status: UserKycDocumentStatus): boolean {
  return status === USER_KYC_DOCUMENT_STATUS.REJECTED;
}

/**
 * Check if KYC document is pending
 */
export function isUserKycDocumentPending(status: UserKycDocumentStatus): boolean {
  const pendingStatuses: UserKycDocumentStatus[] = [
    'uploaded',
    'processing',
    'requires_review',
    'on_hold',
  ];
  return pendingStatuses.includes(status);
}

/**
 * Check if KYC document is expired
 */
export function isUserKycDocumentExpired(status: UserKycDocumentStatus): boolean {
  return status === USER_KYC_DOCUMENT_STATUS.EXPIRED;
}

/**
 * Get document status color
 */
export function getUserKycDocumentStatusColor(status: UserKycDocumentStatus): string {
  const colors: Record<UserKycDocumentStatus, string> = {
    uploaded: '#2196F3',
    processing: '#FF9800',
    verified: '#4CAF50',
    rejected: '#F44336',
    expired: '#9E9E9E',
    requires_review: '#FFC107',
    on_hold: '#FF9800',
    flagged: '#F44336',
  };
  return colors[status] || '#9E9E9E';
}
