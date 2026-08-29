/**
 * Packaging Types
 * Type definitions for logistics packaging based on shared-constants
 * @module PackagingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics packaging
// ============================================================
import {
  // Packaging Constants
  LOGISTICS_PACKAGING,
  LogisticsPackagingType,
  LogisticsPackagingStatus,
  LogisticsPackagingMaterial,
  LogisticsPackagingSize,
  LogisticsPackagingEcoFriendly,
  logisticsPackagingGetTypeLabel,
  logisticsPackagingGetStatusLabel,
  logisticsPackagingGetMaterialLabel,
  logisticsPackagingGetSizeLabel,
  logisticsPackagingGetDimensions,
  logisticsPackagingGetWeightLimit,
  logisticsPackagingGetCost,
  logisticsPackagingIsAvailable,
  logisticsPackagingIsUsable,
  logisticsPackagingGetEcoFriendlyLabel,
  // Packaging Type Constants
  LOGISTICS_PACKAGING_TYPE,
  LogisticsPackagingTypeCategory,
  LogisticsPackagingTypeIcon,
  LogisticsPackagingTypeColor,
  logisticsPackagingTypeGetCategory,
  logisticsPackagingTypeGetIcon,
  logisticsPackagingTypeGetColor,
  logisticsPackagingTypeGetDurability,
  logisticsPackagingTypeIsReusable,
  logisticsPackagingTypeIsRecyclable,
} from '@vubon/shared-constants';

// ============================================================
// Packaging Extended Types
// ============================================================

/**
 * Packaging
 */
export interface Packaging extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsPackagingType;
  status: LogisticsPackagingStatus;
  material: LogisticsPackagingMaterial;
  size: LogisticsPackagingSize;
  ecoFriendly: LogisticsPackagingEcoFriendly;
  name: string;
  code: string;
  dimensions: string;
  weightLimit: number;
  cost: number;
  currency: string;
  isAvailable: boolean;
  isUsable: boolean;
  durability: number;
  isReusable: boolean;
  isRecyclable: boolean;
  metadata?: Metadata;
}

/**
 * Packaging filter
 */
export interface PackagingFilter {
  ids?: ID[];
  types?: LogisticsPackagingType[];
  statuses?: LogisticsPackagingStatus[];
  materials?: LogisticsPackagingMaterial[];
  sizes?: LogisticsPackagingSize[];
  ecoFriendlys?: LogisticsPackagingEcoFriendly[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isAvailable?: boolean;
  isUsable?: boolean;
  isReusable?: boolean;
  isRecyclable?: boolean;
  minWeightLimit?: number;
  maxWeightLimit?: number;
  minCost?: number;
  maxCost?: number;
  searchTerm?: string;
}

/**
 * Packaging statistics
 */
export interface PackagingStatistics {
  totalPackagings: number;
  availablePackagings: number;
  usablePackagings: number;
  byType: Record<LogisticsPackagingType, number>;
  byStatus: Record<LogisticsPackagingStatus, number>;
  byMaterial: Record<LogisticsPackagingMaterial, number>;
  bySize: Record<LogisticsPackagingSize, number>;
  byEcoFriendly: Record<LogisticsPackagingEcoFriendly, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageWeightLimit: number;
  maxWeightLimit: number;
  minWeightLimit: number;
  averageCost: number;
  maxCost: number;
  minCost: number;
  reusableCount: number;
  recyclableCount: number;
  mostFrequentType: LogisticsPackagingType;
  mostFrequentStatus: LogisticsPackagingStatus;
  mostFrequentMaterial: LogisticsPackagingMaterial;
  mostFrequentSize: LogisticsPackagingSize;
}

/**
 * Packaging summary
 */
export interface PackagingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPackagings: number;
  available: number;
  usable: number;
  byType: Record<LogisticsPackagingType, number>;
  byStatus: Record<LogisticsPackagingStatus, number>;
  byMaterial: Record<LogisticsPackagingMaterial, number>;
  bySize: Record<LogisticsPackagingSize, number>;
  byEcoFriendly: Record<LogisticsPackagingEcoFriendly, number>;
  packagingTrend: {
    date: Date;
    total: number;
    available: number;
  }[];
  topTypes: {
    type: LogisticsPackagingType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsPackagingStatus;
    count: number;
    label: string;
  }[];
  topMaterials: {
    material: LogisticsPackagingMaterial;
    count: number;
    label: string;
  }[];
  topSizes: {
    size: LogisticsPackagingSize;
    count: number;
    label: string;
  }[];
  capacitySummary: {
    averageWeightLimit: number;
    maxWeightLimit: number;
    minWeightLimit: number;
  };
  costSummary: {
    averageCost: number;
    maxCost: number;
    minCost: number;
  };
  ecoSummary: {
    reusable: number;
    recyclable: number;
    ecoFriendlyRate: number;
  };
}

/**
 * Packaging configuration
 */
export interface PackagingConfiguration {
  enabled: boolean;
  defaultType: LogisticsPackagingType;
  defaultMaterial: LogisticsPackagingMaterial;
  defaultSize: LogisticsPackagingSize;
  defaultEcoFriendly: LogisticsPackagingEcoFriendly;
  requireDimensions: boolean;
  requireWeightLimit: boolean;
  requireCost: boolean;
  maxPackagings: number;
  autoAssign: boolean;
  autoAssignStrategy: 'size' | 'weight' | 'cost' | 'eco' | 'preference';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: PackagingAlertConfig;
}

/**
 * Packaging alert configuration
 */
export interface PackagingAlertConfig {
  enabled: boolean;
  availabilityAlert: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  costAlert: boolean;
  costThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Packaging history
 */
export interface PackagingHistory extends BaseEntity, Timestamp {
  id: ID;
  packagingId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'status_change' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Packaging validation
 */
export interface PackagingValidation {
  isValid: boolean;
  packagingId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Packaging export
 */
export interface PackagingExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PackagingFilter;
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
  // Packaging Constants
  LOGISTICS_PACKAGING,
  LogisticsPackagingType,
  LogisticsPackagingStatus,
  LogisticsPackagingMaterial,
  LogisticsPackagingSize,
  LogisticsPackagingEcoFriendly,
  logisticsPackagingGetTypeLabel,
  logisticsPackagingGetStatusLabel,
  logisticsPackagingGetMaterialLabel,
  logisticsPackagingGetSizeLabel,
  logisticsPackagingGetDimensions,
  logisticsPackagingGetWeightLimit,
  logisticsPackagingGetCost,
  logisticsPackagingIsAvailable,
  logisticsPackagingIsUsable,
  logisticsPackagingGetEcoFriendlyLabel,
  // Packaging Type Constants
  LOGISTICS_PACKAGING_TYPE,
  LogisticsPackagingTypeCategory,
  LogisticsPackagingTypeIcon,
  LogisticsPackagingTypeColor,
  logisticsPackagingTypeGetCategory,
  logisticsPackagingTypeGetIcon,
  logisticsPackagingTypeGetColor,
  logisticsPackagingTypeGetDurability,
  logisticsPackagingTypeIsReusable,
  logisticsPackagingTypeIsRecyclable,
};
