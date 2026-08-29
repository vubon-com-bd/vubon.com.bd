/**
 * Driver Types
 * Type definitions for logistics drivers based on shared-constants
 * @module DriverTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics driver
// ============================================================
import {
  // Driver Constants
  LOGISTICS_DRIVER,
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
  logisticsDriverGetTypeLabel,
  logisticsDriverGetStatusLabel,
  logisticsDriverGetLicenseTypeLabel,
  logisticsDriverGetLicenseClassLabel,
  logisticsDriverGetExperienceLevelLabel,
  logisticsDriverIsAvailable,
  logisticsDriverIsActive,
  logisticsDriverGetDocumentTypeLabel,
  // Driver Status Constants
  LOGISTICS_DRIVER_STATUS,
  LogisticsDriverStatusType,
  LogisticsDriverStatusCategory,
  LogisticsDriverStatusColor,
  LogisticsDriverStatusIcon,
  LogisticsDriverStatusTransition,
  logisticsDriverStatusGetLabel,
  logisticsDriverStatusGetCategory,
  logisticsDriverStatusIsAvailable,
  logisticsDriverStatusIsActive,
  logisticsDriverStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Driver Extended Types
// ============================================================

/**
 * Driver
 */
export interface Driver extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsDriverType;
  status: LogisticsDriverStatusType;
  licenseType: LogisticsDriverLicenseType;
  licenseClass: LogisticsDriverLicenseClass;
  experienceLevel: LogisticsDriverExperienceLevel;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: Date;
  isAvailable: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Driver filter
 */
export interface DriverFilter {
  ids?: ID[];
  types?: LogisticsDriverType[];
  statuses?: LogisticsDriverStatusType[];
  licenseTypes?: LogisticsDriverLicenseType[];
  licenseClasses?: LogisticsDriverLicenseClass[];
  experienceLevels?: LogisticsDriverExperienceLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isAvailable?: boolean;
  isActive?: boolean;
  searchTerm?: string;
  licenseNumber?: string;
}

/**
 * Driver statistics
 */
export interface DriverStatistics {
  totalDrivers: number;
  availableDrivers: number;
  activeDrivers: number;
  byType: Record<LogisticsDriverType, number>;
  byStatus: Record<LogisticsDriverStatusType, number>;
  byLicenseType: Record<LogisticsDriverLicenseType, number>;
  byLicenseClass: Record<LogisticsDriverLicenseClass, number>;
  byExperienceLevel: Record<LogisticsDriverExperienceLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  licenseExpirySoon: number;
  licenseExpiryThreshold: number;
  mostFrequentType: LogisticsDriverType;
  mostFrequentStatus: LogisticsDriverStatusType;
  mostFrequentLicenseType: LogisticsDriverLicenseType;
  mostFrequentExperienceLevel: LogisticsDriverExperienceLevel;
}

/**
 * Driver summary
 */
export interface DriverSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDrivers: number;
  available: number;
  active: number;
  byType: Record<LogisticsDriverType, number>;
  byStatus: Record<LogisticsDriverStatusType, number>;
  byLicenseType: Record<LogisticsDriverLicenseType, number>;
  byLicenseClass: Record<LogisticsDriverLicenseClass, number>;
  byExperienceLevel: Record<LogisticsDriverExperienceLevel, number>;
  driverTrend: {
    date: Date;
    total: number;
    available: number;
    active: number;
  }[];
  topTypes: {
    type: LogisticsDriverType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsDriverStatusType;
    count: number;
    label: string;
  }[];
  topLicenseTypes: {
    licenseType: LogisticsDriverLicenseType;
    count: number;
    label: string;
  }[];
  topExperienceLevels: {
    experienceLevel: LogisticsDriverExperienceLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Driver configuration
 */
export interface DriverConfiguration {
  enabled: boolean;
  defaultType: LogisticsDriverType;
  requireLicense: boolean;
  requireLicenseExpiry: boolean;
  maxDrivers: number;
  autoAssign: boolean;
  autoAssignStrategy: 'availability' | 'experience' | 'preference' | 'type';
  licenseExpiryWarningDays: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  notificationOnLicenseExpiry: boolean;
  alertConfig?: DriverAlertConfig;
}

/**
 * Driver alert configuration
 */
export interface DriverAlertConfig {
  enabled: boolean;
  availabilityAlert: boolean;
  licenseExpiryAlert: boolean;
  licenseExpiryThreshold: number;
  inactivityAlert: boolean;
  inactivityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Driver history
 */
export interface DriverHistory extends BaseEntity, Timestamp {
  id: ID;
  driverId: ID;
  action: 'create' | 'update' | 'available' | 'active' | 'inactive' | 'license_update' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Driver validation
 */
export interface DriverValidation {
  isValid: boolean;
  driverId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Driver export
 */
export interface DriverExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DriverFilter;
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
  // Driver Constants
  LOGISTICS_DRIVER,
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
  logisticsDriverGetTypeLabel,
  logisticsDriverGetStatusLabel,
  logisticsDriverGetLicenseTypeLabel,
  logisticsDriverGetLicenseClassLabel,
  logisticsDriverGetExperienceLevelLabel,
  logisticsDriverIsAvailable,
  logisticsDriverIsActive,
  logisticsDriverGetDocumentTypeLabel,
  // Driver Status Constants
  LOGISTICS_DRIVER_STATUS,
  LogisticsDriverStatusType,
  LogisticsDriverStatusCategory,
  LogisticsDriverStatusColor,
  LogisticsDriverStatusIcon,
  LogisticsDriverStatusTransition,
  logisticsDriverStatusGetLabel,
  logisticsDriverStatusGetCategory,
  logisticsDriverStatusIsAvailable,
  logisticsDriverStatusIsActive,
  logisticsDriverStatusCanTransition,
};
