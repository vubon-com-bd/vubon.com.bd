/**
 * Insurance Types
 * Type definitions for logistics insurance based on shared-constants
 * @module InsuranceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics insurance
// ============================================================
import {
  // Insurance Constants
  LOGISTICS_INSURANCE,
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
  logisticsInsuranceGetTypeLabel,
  logisticsInsuranceGetStatusLabel,
  logisticsInsuranceGetProviderLabel,
  logisticsInsuranceGetCoverageRate,
  logisticsInsuranceGetCoverageLabel,
  logisticsInsuranceGetClaimLimit,
  logisticsInsuranceGetExcess,
  logisticsInsuranceIsActive,
  logisticsInsuranceIsActiveOrPending,
  logisticsInsuranceCalculatePremium,
  // Insurance Type Constants
  LOGISTICS_INSURANCE_TYPE,
  LogisticsInsuranceTypeCategory,
  LogisticsInsuranceTypeIcon,
  LogisticsInsuranceTypeColor,
  LogisticsInsurancePolicyType,
  logisticsInsuranceTypeGetCategory,
  logisticsInsuranceTypeGetIcon,
  logisticsInsuranceTypeGetColor,
  logisticsInsuranceTypeGetRiskLevel,
  logisticsInsuranceTypeGetPolicyType,
  logisticsInsuranceTypeGetDocuments,
  // Insurance Status Constants
  LOGISTICS_INSURANCE_STATUS,
  LogisticsInsuranceStatusType,
  LogisticsInsuranceStatusCategory,
  LogisticsInsuranceStatusColor,
  LogisticsInsuranceStatusIcon,
  LogisticsInsuranceStatusTransition,
  logisticsInsuranceStatusGetLabel,
  logisticsInsuranceStatusGetCategory,
  logisticsInsuranceStatusIsActive,
  logisticsInsuranceStatusIsActiveOrPending,
  logisticsInsuranceStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Insurance Extended Types
// ============================================================

/**
 * Insurance
 */
export interface Insurance extends BaseEntity, Timestamp {
  id: ID;
  shipmentId: ID;
  type: LogisticsInsuranceType;
  status: LogisticsInsuranceStatusType;
  provider: LogisticsInsuranceProvider;
  coverageType: LogisticsInsuranceCoverageType;
  coverageRate: number;
  coverageAmount: number;
  currency: string;
  claimLimit: number;
  excess: number;
  isActive: boolean;
  isActiveOrPending: boolean;
  policyNumber: string;
  policyType: LogisticsInsurancePolicyType;
  startDate: Date;
  endDate?: Date;
  metadata?: Metadata;
}

/**
 * Insurance filter
 */
export interface InsuranceFilter {
  ids?: ID[];
  shipmentIds?: ID[];
  types?: LogisticsInsuranceType[];
  statuses?: LogisticsInsuranceStatusType[];
  providers?: LogisticsInsuranceProvider[];
  coverageTypes?: LogisticsInsuranceCoverageType[];
  policyTypes?: LogisticsInsurancePolicyType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isActiveOrPending?: boolean;
  minCoverageAmount?: number;
  maxCoverageAmount?: number;
  minClaimLimit?: number;
  maxClaimLimit?: number;
  minExcess?: number;
  maxExcess?: number;
  searchTerm?: string;
  policyNumber?: string;
}

/**
 * Insurance statistics
 */
export interface InsuranceStatistics {
  totalInsurances: number;
  activeInsurances: number;
  activeOrPendingInsurances: number;
  byType: Record<LogisticsInsuranceType, number>;
  byStatus: Record<LogisticsInsuranceStatusType, number>;
  byProvider: Record<LogisticsInsuranceProvider, number>;
  byCoverageType: Record<LogisticsInsuranceCoverageType, number>;
  byPolicyType: Record<LogisticsInsurancePolicyType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCoverageAmount: number;
  maxCoverageAmount: number;
  minCoverageAmount: number;
  averageClaimLimit: number;
  maxClaimLimit: number;
  minClaimLimit: number;
  averageExcess: number;
  maxExcess: number;
  minExcess: number;
  mostFrequentType: LogisticsInsuranceType;
  mostFrequentStatus: LogisticsInsuranceStatusType;
  mostFrequentProvider: LogisticsInsuranceProvider;
  mostFrequentCoverageType: LogisticsInsuranceCoverageType;
}

/**
 * Insurance summary
 */
export interface InsuranceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalInsurances: number;
  active: number;
  activeOrPending: number;
  byType: Record<LogisticsInsuranceType, number>;
  byStatus: Record<LogisticsInsuranceStatusType, number>;
  byProvider: Record<LogisticsInsuranceProvider, number>;
  byCoverageType: Record<LogisticsInsuranceCoverageType, number>;
  byPolicyType: Record<LogisticsInsurancePolicyType, number>;
  insuranceTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: LogisticsInsuranceType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsInsuranceStatusType;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: LogisticsInsuranceProvider;
    count: number;
    label: string;
  }[];
  topCoverageTypes: {
    coverageType: LogisticsInsuranceCoverageType;
    count: number;
    label: string;
  }[];
  coverageSummary: {
    averageCoverageAmount: number;
    maxCoverageAmount: number;
    minCoverageAmount: number;
  };
  limitsSummary: {
    averageClaimLimit: number;
    maxClaimLimit: number;
    minClaimLimit: number;
    averageExcess: number;
    maxExcess: number;
    minExcess: number;
  };
}

/**
 * Insurance configuration
 */
export interface InsuranceConfiguration {
  enabled: boolean;
  defaultType: LogisticsInsuranceType;
  defaultProvider: LogisticsInsuranceProvider;
  defaultCoverageType: LogisticsInsuranceCoverageType;
  defaultPolicyType: LogisticsInsurancePolicyType;
  defaultCoverageRate: number;
  defaultExcess: number;
  defaultClaimLimit: number;
  requirePolicyNumber: boolean;
  requireCoverageAmount: boolean;
  maxInsurances: number;
  autoAssign: boolean;
  autoAssignStrategy: 'cost' | 'coverage' | 'provider' | 'preference';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: InsuranceAlertConfig;
}

/**
 * Insurance alert configuration
 */
export interface InsuranceAlertConfig {
  enabled: boolean;
  coverageExpiryAlert: boolean;
  coverageExpiryThreshold: number;
  claimLimitAlert: boolean;
  claimLimitThreshold: number;
  premiumAlert: boolean;
  premiumThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Insurance history
 */
export interface InsuranceHistory extends BaseEntity, Timestamp {
  id: ID;
  insuranceId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'status_change' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Insurance validation
 */
export interface InsuranceValidation {
  isValid: boolean;
  insuranceId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Insurance export
 */
export interface InsuranceExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: InsuranceFilter;
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
  // Insurance Constants
  LOGISTICS_INSURANCE,
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
  logisticsInsuranceGetTypeLabel,
  logisticsInsuranceGetStatusLabel,
  logisticsInsuranceGetProviderLabel,
  logisticsInsuranceGetCoverageRate,
  logisticsInsuranceGetCoverageLabel,
  logisticsInsuranceGetClaimLimit,
  logisticsInsuranceGetExcess,
  logisticsInsuranceIsActive,
  logisticsInsuranceIsActiveOrPending,
  logisticsInsuranceCalculatePremium,
  // Insurance Type Constants
  LOGISTICS_INSURANCE_TYPE,
  LogisticsInsuranceTypeCategory,
  LogisticsInsuranceTypeIcon,
  LogisticsInsuranceTypeColor,
  LogisticsInsurancePolicyType,
  logisticsInsuranceTypeGetCategory,
  logisticsInsuranceTypeGetIcon,
  logisticsInsuranceTypeGetColor,
  logisticsInsuranceTypeGetRiskLevel,
  logisticsInsuranceTypeGetPolicyType,
  logisticsInsuranceTypeGetDocuments,
  // Insurance Status Constants
  LOGISTICS_INSURANCE_STATUS,
  LogisticsInsuranceStatusType,
  LogisticsInsuranceStatusCategory,
  LogisticsInsuranceStatusColor,
  LogisticsInsuranceStatusIcon,
  LogisticsInsuranceStatusTransition,
  logisticsInsuranceStatusGetLabel,
  logisticsInsuranceStatusGetCategory,
  logisticsInsuranceStatusIsActive,
  logisticsInsuranceStatusIsActiveOrPending,
  logisticsInsuranceStatusCanTransition,
};
