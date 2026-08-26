/**
 * Shipping Address Types
 * Type definitions for shipping addresses based on shared-constants
 * @module ShippingAddressTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Shipping Address
  SHIPPING_ADDRESS,
  ShippingAddressType,
  ShippingAddressStatus,
  ShippingAddressField,
  ShippingAddressDefault,
  ShippingAddressLimit,
  shippingaddressGetTypeLabel,
  shippingaddressGetStatusLabel,
  shippingaddressGetFieldLabel,
  shippingaddressIsHome,
  shippingaddressIsOffice,
  shippingaddressIsPickupPoint,
  shippingaddressIsVerified,
  shippingaddressGetDefaultCountry,
  shippingaddressGetDefaultDeliveryTime,
} from '@vubon/shared-constants';

// ============================================================
// Shipping Address Extended Types
// ============================================================

/**
 * Shipping address
 */
export interface ShippingAddress extends Address, BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: ShippingAddressType;
  status: ShippingAddressStatus;
  isHome: boolean;
  isOffice: boolean;
  isPickupPoint: boolean;
  isVerified: boolean;
  label?: string;
  deliveryInstructions?: string;
  preferredDeliveryTime?: string;
  metadata?: Metadata;
}

/**
 * Shipping address filter
 */
export interface ShippingAddressFilter {
  userIds?: ID[];
  types?: ShippingAddressType[];
  statuses?: ShippingAddressStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isHome?: boolean;
  isOffice?: boolean;
  isPickupPoint?: boolean;
  isVerified?: boolean;
  country?: string;
  city?: string;
  searchTerm?: string;
}

/**
 * Shipping address statistics
 */
export interface ShippingAddressStatistics {
  userId: ID;
  totalAddresses: number;
  homeAddresses: number;
  officeAddresses: number;
  pickupPoints: number;
  verifiedAddresses: number;
  byType: Record<ShippingAddressType, number>;
  byStatus: Record<ShippingAddressStatus, number>;
  byCountry: Record<string, number>;
  byCity: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: ShippingAddressType;
  mostFrequentCountry: string;
  mostFrequentCity: string;
  averageDeliveryTime: number;
}

/**
 * Shipping address summary
 */
export interface ShippingAddressSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  home: number;
  office: number;
  pickupPoint: number;
  verified: number;
  byType: Record<ShippingAddressType, number>;
  byStatus: Record<ShippingAddressStatus, number>;
  byCountry: Record<string, number>;
  byCity: Record<string, number>;
  addressTrend: {
    date: Date;
    total: number;
    verified: number;
  }[];
  topTypes: {
    type: ShippingAddressType;
    count: number;
    label: string;
  }[];
  topCountries: {
    country: string;
    count: number;
  }[];
  topCities: {
    city: string;
    count: number;
  }[];
}

/**
 * Shipping address configuration
 */
export interface ShippingAddressConfiguration {
  enabled: boolean;
  defaultType: ShippingAddressType;
  defaultCountry: string;
  defaultDeliveryTime: number;
  requireVerification: boolean;
  requirePhone: boolean;
  requireEmail: boolean;
  allowMultiple: boolean;
  maxAddressesPerUser: number;
  requireDeliveryInstructions: boolean;
  enablePickupPoints: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: ShippingAddressAlertConfig;
}

/**
 * Shipping address alert configuration
 */
export interface ShippingAddressAlertConfig {
  enabled: boolean;
  verificationAlert: boolean;
  suspiciousAddressAlert: boolean;
  duplicateAddressAlert: boolean;
  deliveryTimeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  deliveryTimeThreshold: number;
}

/**
 * Shipping address history
 */
export interface ShippingAddressHistory extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  userId: ID;
  action: 'create' | 'update' | 'delete' | 'verify' | 'unverify';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipping address verification
 */
export interface ShippingAddressVerification extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  userId: ID;
  method: 'postal' | 'phone' | 'email' | 'document' | 'manual';
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  verifiedAt?: Date;
  expiresAt?: Date;
  verifiedBy?: ID;
  metadata?: Metadata;
}

/**
 * Shipping address validation
 */
export interface ShippingAddressValidation {
  isValid: boolean;
  address: Address;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipping address delivery time
 */
export interface ShippingAddressDeliveryTime {
  addressId: ID;
  userId: ID;
  preferredTime: string;
  estimatedTime: number;
  actualTime?: number;
  isDelivered: boolean;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Shipping address export
 */
export interface ShippingAddressExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: ShippingAddressFilter;
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
  // Shipping Address
  SHIPPING_ADDRESS,
  ShippingAddressType,
  ShippingAddressStatus,
  ShippingAddressField,
  ShippingAddressDefault,
  ShippingAddressLimit,
  shippingaddressGetTypeLabel,
  shippingaddressGetStatusLabel,
  shippingaddressGetFieldLabel,
  shippingaddressIsHome,
  shippingaddressIsOffice,
  shippingaddressIsPickupPoint,
  shippingaddressIsVerified,
  shippingaddressGetDefaultCountry,
  shippingaddressGetDefaultDeliveryTime,
};
