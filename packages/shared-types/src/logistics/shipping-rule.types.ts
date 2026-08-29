/**
 * Shipping Rule Types
 * Type definitions for logistics shipping rules based on shared-constants
 * @module ShippingRuleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics shipping
// ============================================================
import {
  // Shipping Method Constants
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
  // Shipping Rate Constants
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  LogisticsShippingRateCalculation,
} from '@vubon/shared-constants';

// ============================================================
// Shipping Rule Extended Types
// ============================================================

/**
 * Shipping rule
 */
export interface ShippingRule extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: 'global' | 'zone' | 'weight' | 'order' | 'customer' | 'product';
  priority: number;
  isActive: boolean;
  conditions: ShippingRuleCondition[];
  actions: ShippingRuleAction[];
  metadata?: Metadata;
}

/**
 * Shipping rule condition
 */
export interface ShippingRuleCondition {
  id: string;
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'between';
  value: unknown;
  condition: 'and' | 'or';
  metadata?: Metadata;
}

/**
 * Shipping rule action
 */
export interface ShippingRuleAction {
  id: string;
  type: 'set_method' | 'set_rate' | 'add_charge' | 'discount' | 'free_shipping' | 'weight_charge';
  value: number;
  method?: LogisticsShippingMethod;
  rateType?: LogisticsShippingRateType;
  metadata?: Metadata;
}

/**
 * Shipping rule filter
 */
export interface ShippingRuleFilter {
  ids?: ID[];
  types?: ('global' | 'zone' | 'weight' | 'order' | 'customer' | 'product')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minPriority?: number;
  maxPriority?: number;
  searchTerm?: string;
}

/**
 * Shipping rule statistics
 */
export interface ShippingRuleStatistics {
  totalRules: number;
  activeRules: number;
  byType: Record<string, number>;
  byPriority: Record<number, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePriority: number;
  maxPriority: number;
  minPriority: number;
  mostFrequentType: string;
  mostFrequentCondition: string;
  mostFrequentAction: string;
}

/**
 * Shipping rule summary
 */
export interface ShippingRuleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRules: number;
  active: number;
  byType: Record<string, number>;
  byPriority: Record<number, number>;
  ruleTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  topActions: {
    action: string;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averagePriority: number;
    maxPriority: number;
    minPriority: number;
  };
}

/**
 * Shipping rule configuration
 */
export interface ShippingRuleConfiguration {
  enabled: boolean;
  defaultType: 'global' | 'zone' | 'weight' | 'order' | 'customer' | 'product';
  defaultPriority: number;
  requireConditions: boolean;
  requireActions: boolean;
  maxRules: number;
  allowMultipleConditions: boolean;
  allowMultipleActions: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ShippingRuleAlertConfig;
}

/**
 * Shipping rule alert configuration
 */
export interface ShippingRuleAlertConfig {
  enabled: boolean;
  ruleConflictAlert: boolean;
  duplicateRuleAlert: boolean;
  inactiveRuleAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipping rule history
 */
export interface ShippingRuleHistory extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipping rule validation
 */
export interface ShippingRuleValidation {
  isValid: boolean;
  ruleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipping rule export
 */
export interface ShippingRuleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShippingRuleFilter;
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
  // Shipping Method Constants
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
  // Shipping Rate Constants
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  LogisticsShippingRateCalculation,
};
