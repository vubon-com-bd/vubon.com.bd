/**
 * Brand Types
 * Type definitions for product brands based on shared-constants
 * @module BrandTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Brand
  PRODUCTBRAND,
  ProductBrandStatus,
  ProductBrandType,
  ProductBrandVerification,
  ProductBrandDefault,
  ProductBrandLimit,
  productbrandGetStatusLabel,
  productbrandGetTypeLabel,
  productbrandGetVerificationLabel,
  productbrandIsActive,
  productbrandIsVerified,
} from '@vubon/shared-constants';

// ============================================================
// Brand Extended Types
// ============================================================

/**
 * Product brand
 */
export interface ProductBrand extends BaseEntity, Timestamp {
  id: ID;
  type: ProductBrandType;
  status: ProductBrandStatus;
  verification: ProductBrandVerification;
  name: string;
  slug: Slug;
  description?: string;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  isVerified: boolean;
  metadata?: Metadata;
}

/**
 * Brand filter
 */
export interface BrandFilter {
  ids?: ID[];
  types?: ProductBrandType[];
  statuses?: ProductBrandStatus[];
  verifications?: ProductBrandVerification[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isVerified?: boolean;
  searchTerm?: string;
  slug?: string;
}

/**
 * Brand statistics
 */
export interface BrandStatistics {
  totalBrands: number;
  activeBrands: number;
  verifiedBrands: number;
  byType: Record<ProductBrandType, number>;
  byStatus: Record<ProductBrandStatus, number>;
  byVerification: Record<ProductBrandVerification, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  brandsWithLogo: number;
  brandsWithWebsite: number;
  mostFrequentType: ProductBrandType;
  mostFrequentStatus: ProductBrandStatus;
  mostFrequentVerification: ProductBrandVerification;
}

/**
 * Brand summary
 */
export interface BrandSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  verified: number;
  byType: Record<ProductBrandType, number>;
  byStatus: Record<ProductBrandStatus, number>;
  byVerification: Record<ProductBrandVerification, number>;
  brandTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topTypes: {
    type: ProductBrandType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductBrandStatus;
    count: number;
    label: string;
  }[];
  topVerifications: {
    verification: ProductBrandVerification;
    count: number;
    label: string;
  }[];
}

/**
 * Brand configuration
 */
export interface BrandConfiguration {
  enabled: boolean;
  defaultType: ProductBrandType;
  requireVerification: boolean;
  requireLogo: boolean;
  requireWebsite: boolean;
  autoApprove: boolean;
  maxBrandsPerUser: number;
  allowMultipleTypes: boolean;
  requireUniqueSlug: boolean;
  autoGenerateSlug: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: BrandAlertConfig;
}

/**
 * Brand alert configuration
 */
export interface BrandAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  unverifiedBrandAlert: boolean;
  inactiveBrandAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Brand history
 */
export interface BrandHistory extends BaseEntity, Timestamp {
  id: ID;
  brandId: ID;
  action:
    'create' | 'update' | 'verify' | 'unverify' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Brand validation
 */
export interface BrandValidation {
  isValid: boolean;
  brandId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Brand verification
 */
export interface BrandVerification extends BaseEntity, Timestamp {
  id: ID;
  brandId: ID;
  verifierId: ID;
  status: ProductBrandVerification;
  comments?: string;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Brand export
 */
export interface BrandExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: BrandFilter;
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
  // Brand
  PRODUCTBRAND,
  ProductBrandStatus,
  ProductBrandType,
  ProductBrandVerification,
  ProductBrandDefault,
  ProductBrandLimit,
  productbrandGetStatusLabel,
  productbrandGetTypeLabel,
  productbrandGetVerificationLabel,
  productbrandIsActive,
  productbrandIsVerified,
};
