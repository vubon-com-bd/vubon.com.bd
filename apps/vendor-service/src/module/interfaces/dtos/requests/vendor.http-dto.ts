/**
 * Vendor HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 *
 * These are the HTTP-facing shapes. They are mapped to application DTOs
 * via VendorControllerMapper before dispatching commands.
 */
import type {
  VENDOR_TYPE,
  VENDOR_BUSINESS_TYPE,
  VENDOR_APPROVAL_REASON,
  VENDOR_SUSPENSION_REASON,
  VENDOR_DOCUMENT_TYPE,
  VENDOR_ROLE,
} from '@vubon/shared-constants/business';

// ─── Auth-shape helper ───
export interface ActorContext {
  readonly userId: string;
  readonly sessionId?: string;
}

// ─── Register vendor ───
export interface RegisterVendorHttpDTO {
  ownerId: string;
  businessName: string;
  displayName: string;
  slug?: string;
  vendorType: (typeof VENDOR_TYPE)[keyof typeof VENDOR_TYPE];
  businessType: (typeof VENDOR_BUSINESS_TYPE)[keyof typeof VENDOR_BUSINESS_TYPE];
  businessRegistration?: string;
  businessDescription?: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2?: string;
  division: string;
  district: string;
  upazila?: string;
  postalCode?: string;
  acceptTerms: true;
  documents?: Array<{
    type: (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
    url: string;
    documentNumber?: string;
    issuedAt?: string;
    expiresAt?: string;
  }>;
  idempotencyKey?: string;
}

// ─── Update vendor ───
export interface UpdateVendorHttpDTO {
  name?: string;
  displayName?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  website?: string;
  idempotencyKey?: string;
}

// ─── Update profile ───
export interface UpdateVendorProfileHttpDTO {
  tagline?: string;
  about?: string;
  logoUrl?: string;
  bannerUrl?: string;
  categories?: readonly string[];
  languages?: readonly string[];
  socialLinks?: Readonly<Record<string, string>>;
  idempotencyKey?: string;
}

// ─── Update business ───
export interface UpdateVendorBusinessHttpDTO {
  type?: (typeof VENDOR_TYPE)[keyof typeof VENDOR_TYPE];
  businessType?: (typeof VENDOR_BUSINESS_TYPE)[keyof typeof VENDOR_BUSINESS_TYPE];
  legalName?: string;
  registrationNumber?: string;
  description?: string;
  idempotencyKey?: string;
}

// ─── Lifecycle ───
export interface ActivateVendorHttpDTO {
  activatedBy?: string;
  idempotencyKey?: string;
}

export interface DeactivateVendorHttpDTO {
  reason?: string;
  idempotencyKey?: string;
}

export interface SuspendVendorHttpDTO {
  reason: (typeof VENDOR_SUSPENSION_REASON)[keyof typeof VENDOR_SUSPENSION_REASON];
  durationDays: number;
  notes?: string;
  idempotencyKey?: string;
}

export interface ReinstateVendorHttpDTO {
  notes?: string;
  idempotencyKey?: string;
}

// ─── Approval workflow ───
export interface ApproveVendorHttpDTO {
  note?: string;
  idempotencyKey?: string;
}

export interface RejectVendorHttpDTO {
  reason: (typeof VENDOR_APPROVAL_REASON)[keyof typeof VENDOR_APPROVAL_REASON];
  note?: string;
  idempotencyKey?: string;
}

export interface AppealSuspensionHttpDTO {
  suspensionId: string;
  appealReason: string;
  evidenceUrls?: readonly string[];
  idempotencyKey?: string;
}

// ─── List query ───
export interface ListVendorsHttpQueryDTO {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  tier?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  minRating?: number;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'totalSales' | 'rating' | 'name';
  sortDir?: 'asc' | 'desc';
}

// ─── Slug helpers ───
export interface CheckVendorSlugHttpQueryDTO {
  slug: string;
}

export interface SuggestVendorSlugHttpQueryDTO {
  name: string;
}

// ─── Document upload ───
export interface UploadVendorDocumentHttpDTO {
  type: (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
  fileUrl: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  documentNumber?: string;
  issuedAt?: string;
  expiresAt?: string;
  notes?: string;
  idempotencyKey?: string;
}

// ─── Verification submit ───
export interface SubmitVerificationHttpDTO {
  documents: Array<{
    type: string;
    url: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    documentNumber?: string;
    issuedAt?: string;
    expiresAt?: string;
  }>;
  idempotencyKey?: string;
}

// ─── Team invite ───
export interface InviteTeamMemberHttpDTO {
  email: string;
  role: (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];
  message?: string;
  idempotencyKey?: string;
}

export interface AcceptTeamInviteHttpDTO {
  token: string;
  name: string;
  idempotencyKey?: string;
}

export interface ChangeTeamMemberRoleHttpDTO {
  newRole: (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];
  idempotencyKey?: string;
}
