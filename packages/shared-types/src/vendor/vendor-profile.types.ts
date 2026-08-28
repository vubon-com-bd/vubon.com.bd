/**
 * Vendor Profile Types
 * Type definitions for vendor profiles based on shared-constants
 * @module VendorProfileTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  Email,
  PhoneNumber,
  Address,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Core Vendor
  VendorType,
  VendorStatus,
  VendorTier,
  VendorVerification,
  VendorApproval,
  VendorSuspension,
  VendorCommission,
  // Vendor Type
  VendorTypeType,
  VendorTypeCategory,
  VendorTypeColor,
  VendorTypeIcon,
  // Vendor Tier
  VendorTierType,
  VendorTierLevel,
  VendorTierRequirements,
  VendorTierColor,
  VendorTierIcon,
  // Vendor Status
  VendorStatusType,
  VendorStatusCategory,
  VendorStatusColor,
  VendorStatusIcon,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Profile Extended Types
// ============================================================

/**
 * Vendor profile
 */
export interface VendorProfile extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  vendorId: ID;
  name: string;
  slug: string;
  email: Email;
  phone: PhoneNumber;
  address: Address;
  logo?: string;
  banner?: string;
  description?: string;
  shortDescription?: string;
  foundedYear?: number;
  website?: string;
  socialMedia: VendorSocialMedia[];
  businessType: VendorBusinessType;
  type: VendorTypeType;
  status: VendorStatusType;
  tier: VendorTierType;
  verification: VendorVerification;
  approval: VendorApproval;
  suspension: VendorSuspension;
  commission: VendorCommission;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  canSell: boolean;
  metadata?: Metadata;
}

/**
 * Vendor social media
 */
export interface VendorSocialMedia {
  platform:
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'linkedin'
    | 'youtube'
    | 'tiktok'
    | 'pinterest'
    | 'whatsapp'
    | 'telegram'
    | 'other';
  url: string;
  username?: string;
  isActive: boolean;
}

/**
 * Vendor business type
 */
export interface VendorBusinessType {
  category: string;
  subCategory?: string;
  industry: string;
  type:
    | 'sole_proprietorship'
    | 'partnership'
    | 'corporation'
    | 'llc'
    | 'non_profit'
    | 'government'
    | 'other';
  size: 'micro' | 'small' | 'medium' | 'large' | 'enterprise';
  employeeCount?: number;
  annualRevenue?: number;
  currency?: string;
}

/**
 * Vendor profile filter
 */
export interface VendorProfileFilter {
  ids?: ID[];
  userIds?: ID[];
  vendorIds?: ID[];
  types?: VendorTypeType[];
  statuses?: VendorStatusType[];
  tiers?: VendorTierType[];
  businessTypes?: string[];
  industries?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isVerified?: boolean;
  isApproved?: boolean;
  canSell?: boolean;
  searchTerm?: string;
  name?: string;
  email?: string;
  phone?: string;
}

/**
 * Vendor profile statistics
 */
export interface VendorProfileStatistics {
  vendorId: ID;
  totalProfiles: number;
  activeProfiles: number;
  verifiedProfiles: number;
  approvedProfiles: number;
  byType: Record<VendorTypeType, number>;
  byStatus: Record<VendorStatusType, number>;
  byTier: Record<VendorTierType, number>;
  byBusinessType: Record<string, number>;
  byIndustry: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRating: number;
  totalReviews: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  mostFrequentType: VendorTypeType;
  mostFrequentStatus: VendorStatusType;
  mostFrequentTier: VendorTierType;
  mostFrequentIndustry: string;
}

/**
 * Vendor profile summary
 */
export interface VendorProfileSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalProfiles: number;
  active: number;
  verified: number;
  approved: number;
  byType: Record<VendorTypeType, number>;
  byStatus: Record<VendorStatusType, number>;
  byTier: Record<VendorTierType, number>;
  byBusinessType: Record<string, number>;
  byIndustry: Record<string, number>;
  profileTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topTypes: {
    type: VendorTypeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorStatusType;
    count: number;
    label: string;
  }[];
  topTiers: {
    tier: VendorTierType;
    count: number;
    label: string;
  }[];
  topIndustries: {
    industry: string;
    count: number;
  }[];
}

/**
 * Vendor profile configuration
 */
export interface VendorProfileConfiguration {
  enabled: boolean;
  requireLogo: boolean;
  requireBanner: boolean;
  requireDescription: boolean;
  requireSocialMedia: boolean;
  requireBusinessType: boolean;
  maxSocialMediaLinks: number;
  allowedSocialMedia: (
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'linkedin'
    | 'youtube'
    | 'tiktok'
    | 'pinterest'
    | 'whatsapp'
    | 'telegram'
    | 'other'
  )[];
  autoApproveProfile: boolean;
  requireVerification: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  notificationOnApproval: boolean;
  alertConfig?: VendorProfileAlertConfig;
}

/**
 * Vendor profile alert configuration
 */
export interface VendorProfileAlertConfig {
  enabled: boolean;
  incompleteProfileAlert: boolean;
  duplicateNameAlert: boolean;
  suspiciousProfileAlert: boolean;
  verificationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor profile history
 */
export interface VendorProfileHistory extends BaseEntity, Timestamp {
  id: ID;
  profileId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'verify'
    | 'unverify'
    | 'approve'
    | 'reject'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor profile validation
 */
export interface VendorProfileValidation {
  isValid: boolean;
  profileId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor profile export
 */
export interface VendorProfileExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorProfileFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Vendor
  VendorType,
  VendorStatus,
  VendorTier,
  VendorVerification,
  VendorApproval,
  VendorSuspension,
  VendorCommission,
  // Vendor Type
  VendorTypeType,
  VendorTypeCategory,
  VendorTypeColor,
  VendorTypeIcon,
  // Vendor Tier
  VendorTierType,
  VendorTierLevel,
  VendorTierRequirements,
  VendorTierColor,
  VendorTierIcon,
  // Vendor Status
  VendorStatusType,
  VendorStatusCategory,
  VendorStatusColor,
  VendorStatusIcon,
};
