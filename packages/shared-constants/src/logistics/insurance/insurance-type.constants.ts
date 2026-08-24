/**
 * Insurance Type Constants
 * Types of logistics insurance
 */

import { LOGISTICS_INSURANCE } from './insurance.constants';
import type { LogisticsInsuranceType } from './insurance.constants';

// Insurance Type Categories
const CATEGORIES = {
  CARGO: 'cargo',
  TRANSIT: 'transit',
  STORAGE: 'storage',
  RISK: 'risk',
  SPECIAL: 'special',
};

// Insurance Type Icons
const ICONS = {
  CARGO: '📦',
  TRANSIT: '🚚',
  STORAGE: '🏠',
  ALL_RISK: '🛡️',
  FPA: '📋',
  WA: '⚖️',
  WAR: '⚔️',
  STRIKE: '👊',
};

// Insurance Type Colors
const COLORS = {
  CARGO: '#blue-500',
  TRANSIT: '#orange-500',
  STORAGE: '#green-500',
  ALL_RISK: '#purple-500',
  FPA: '#teal-500',
  WA: '#cyan-500',
  WAR: '#red-500',
  STRIKE: '#red-600',
};

// Risk Levels
const RISK_LEVELS = {
  CARGO: 3,
  TRANSIT: 4,
  STORAGE: 2,
  ALL_RISK: 5,
  FPA: 2,
  WA: 3,
  WAR: 5,
  STRIKE: 4,
};

// Policy Types
const POLICY_TYPES = {
  CARGO: 'annual',
  TRANSIT: 'single',
  STORAGE: 'annual',
  ALL_RISK: 'annual',
  FPA: 'single',
  WA: 'single',
  WAR: 'single',
  STRIKE: 'single',
};

// Required Documents (as mutable arrays - without as const)
const DOCUMENTS = {
  CARGO: ['invoice', 'packing_list', 'bill_of_lading'],
  TRANSIT: ['invoice', 'packing_list', 'waybill'],
  STORAGE: ['invoice', 'warehouse_receipt'],
  ALL_RISK: ['invoice', 'packing_list', 'bill_of_lading', 'survey_report'],
  FPA: ['invoice', 'packing_list'],
  WA: ['invoice', 'packing_list'],
  WAR: ['invoice', 'packing_list', 'war_risk_certificate'],
  STRIKE: ['invoice', 'packing_list', 'strike_risk_certificate'],
};

export const LOGISTICS_INSURANCE_TYPE = {
  CATEGORIES: CATEGORIES,
  ICONS: ICONS,
  COLORS: COLORS,
  RISK_LEVELS: RISK_LEVELS,
  POLICY_TYPES: POLICY_TYPES,
  DOCUMENTS: DOCUMENTS,
} as const;

// Type Categories
export type LogisticsInsuranceTypeCategory = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// Type Icons
export type LogisticsInsuranceTypeIcon = (typeof ICONS)[keyof typeof ICONS];

// Type Colors
export type LogisticsInsuranceTypeColor = (typeof COLORS)[keyof typeof COLORS];

// Policy Types
export type LogisticsInsurancePolicyType = (typeof POLICY_TYPES)[keyof typeof POLICY_TYPES];

// Utility Functions
export function logisticsInsuranceTypeGetCategory(
  type: LogisticsInsuranceType
): LogisticsInsuranceTypeCategory {
  const categories: Record<LogisticsInsuranceType, LogisticsInsuranceTypeCategory> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: CATEGORIES.CARGO,
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: CATEGORIES.TRANSIT,
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: CATEGORIES.STORAGE,
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: CATEGORIES.RISK,
    [LOGISTICS_INSURANCE.TYPES.FPA]: CATEGORIES.RISK,
    [LOGISTICS_INSURANCE.TYPES.WA]: CATEGORIES.RISK,
    [LOGISTICS_INSURANCE.TYPES.WAR]: CATEGORIES.SPECIAL,
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: CATEGORIES.SPECIAL,
  };
  return categories[type] || CATEGORIES.RISK;
}

export function logisticsInsuranceTypeGetIcon(
  type: LogisticsInsuranceType
): LogisticsInsuranceTypeIcon {
  const icons: Record<LogisticsInsuranceType, LogisticsInsuranceTypeIcon> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: ICONS.CARGO,
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: ICONS.TRANSIT,
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: ICONS.STORAGE,
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: ICONS.ALL_RISK,
    [LOGISTICS_INSURANCE.TYPES.FPA]: ICONS.FPA,
    [LOGISTICS_INSURANCE.TYPES.WA]: ICONS.WA,
    [LOGISTICS_INSURANCE.TYPES.WAR]: ICONS.WAR,
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: ICONS.STRIKE,
  };
  return icons[type] || '📦';
}

export function logisticsInsuranceTypeGetColor(
  type: LogisticsInsuranceType
): LogisticsInsuranceTypeColor {
  const colors: Record<LogisticsInsuranceType, LogisticsInsuranceTypeColor> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: COLORS.CARGO,
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: COLORS.TRANSIT,
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: COLORS.STORAGE,
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: COLORS.ALL_RISK,
    [LOGISTICS_INSURANCE.TYPES.FPA]: COLORS.FPA,
    [LOGISTICS_INSURANCE.TYPES.WA]: COLORS.WA,
    [LOGISTICS_INSURANCE.TYPES.WAR]: COLORS.WAR,
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: COLORS.STRIKE,
  };
  return colors[type] || '#blue-500';
}

export function logisticsInsuranceTypeGetRiskLevel(type: LogisticsInsuranceType): number {
  const levels: Record<LogisticsInsuranceType, number> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: RISK_LEVELS.CARGO,
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: RISK_LEVELS.TRANSIT,
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: RISK_LEVELS.STORAGE,
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: RISK_LEVELS.ALL_RISK,
    [LOGISTICS_INSURANCE.TYPES.FPA]: RISK_LEVELS.FPA,
    [LOGISTICS_INSURANCE.TYPES.WA]: RISK_LEVELS.WA,
    [LOGISTICS_INSURANCE.TYPES.WAR]: RISK_LEVELS.WAR,
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: RISK_LEVELS.STRIKE,
  };
  return levels[type] || 3;
}

export function logisticsInsuranceTypeGetPolicyType(
  type: LogisticsInsuranceType
): LogisticsInsurancePolicyType {
  const policyTypes: Record<LogisticsInsuranceType, LogisticsInsurancePolicyType> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: POLICY_TYPES.CARGO,
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: POLICY_TYPES.TRANSIT,
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: POLICY_TYPES.STORAGE,
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: POLICY_TYPES.ALL_RISK,
    [LOGISTICS_INSURANCE.TYPES.FPA]: POLICY_TYPES.FPA,
    [LOGISTICS_INSURANCE.TYPES.WA]: POLICY_TYPES.WA,
    [LOGISTICS_INSURANCE.TYPES.WAR]: POLICY_TYPES.WAR,
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: POLICY_TYPES.STRIKE,
  };
  return policyTypes[type] || 'single';
}

export function logisticsInsuranceTypeGetDocuments(type: LogisticsInsuranceType): string[] {
  const documents: Record<LogisticsInsuranceType, string[]> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: DOCUMENTS.CARGO,
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: DOCUMENTS.TRANSIT,
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: DOCUMENTS.STORAGE,
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: DOCUMENTS.ALL_RISK,
    [LOGISTICS_INSURANCE.TYPES.FPA]: DOCUMENTS.FPA,
    [LOGISTICS_INSURANCE.TYPES.WA]: DOCUMENTS.WA,
    [LOGISTICS_INSURANCE.TYPES.WAR]: DOCUMENTS.WAR,
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: DOCUMENTS.STRIKE,
  };
  return documents[type] || ['invoice'];
}
