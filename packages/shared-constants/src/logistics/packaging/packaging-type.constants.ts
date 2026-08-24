/**
 * Packaging Type Constants
 * Types of packaging
 */

import { LOGISTICS_PACKAGING } from './packaging.constants';
import type { LogisticsPackagingType } from './packaging.constants';

// Packaging Type Categories (without as const to avoid readonly)
const CATEGORIES = {
  BOX: 'box',
  ENVELOPE: 'envelope',
  PALLET: 'pallet',
  CRATE: 'crate',
  BAG: 'bag',
  TUBE: 'tube',
  WRAP: 'wrap',
  CUSTOM: 'custom',
};

// Packaging Type Icons
const ICONS = {
  BOX: '📦',
  ENVELOPE: '✉️',
  PALLET: '📋',
  CRATE: '📐',
  BAG: '🛍️',
  TUBE: '🧴',
  BUBBLE_WRAP: '🫧',
  STRETCH_WRAP: '🔄',
  CUSTOM: '⚙️',
};

// Packaging Type Colors
const COLORS = {
  BOX: '#blue-500',
  ENVELOPE: '#gray-500',
  PALLET: '#orange-500',
  CRATE: '#brown-500',
  BAG: '#green-500',
  TUBE: '#purple-500',
  BUBBLE_WRAP: '#cyan-500',
  STRETCH_WRAP: '#teal-500',
  CUSTOM: '#gray-400',
};

// Durability Levels
const DURABILITY = {
  BOX: 3,
  ENVELOPE: 1,
  PALLET: 5,
  CRATE: 4,
  BAG: 2,
  TUBE: 3,
  BUBBLE_WRAP: 2,
  STRETCH_WRAP: 2,
  CUSTOM: 3,
};

// Reusability
const REUSABLE = {
  BOX: true,
  ENVELOPE: false,
  PALLET: true,
  CRATE: true,
  BAG: false,
  TUBE: false,
  BUBBLE_WRAP: false,
  STRETCH_WRAP: false,
  CUSTOM: true,
};

// Recyclability
const RECYCLABLE = {
  BOX: true,
  ENVELOPE: false,
  PALLET: false,
  CRATE: true,
  BAG: false,
  TUBE: false,
  BUBBLE_WRAP: false,
  STRETCH_WRAP: false,
  CUSTOM: true,
};

export const LOGISTICS_PACKAGING_TYPE = {
  CATEGORIES: CATEGORIES,
  ICONS: ICONS,
  COLORS: COLORS,
  DURABILITY: DURABILITY,
  REUSABLE: REUSABLE,
  RECYCLABLE: RECYCLABLE,
} as const;

// Type Categories
export type LogisticsPackagingTypeCategory = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// Type Icons
export type LogisticsPackagingTypeIcon = (typeof ICONS)[keyof typeof ICONS];

// Type Colors
export type LogisticsPackagingTypeColor = (typeof COLORS)[keyof typeof COLORS];

// Utility Functions
export function logisticsPackagingTypeGetCategory(
  type: LogisticsPackagingType
): LogisticsPackagingTypeCategory {
  const categories: Record<LogisticsPackagingType, LogisticsPackagingTypeCategory> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: CATEGORIES.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: CATEGORIES.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: CATEGORIES.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: CATEGORIES.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: CATEGORIES.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: CATEGORIES.TUBE,
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: CATEGORIES.WRAP,
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: CATEGORIES.WRAP,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: CATEGORIES.CUSTOM,
  };
  return categories[type] || CATEGORIES.CUSTOM;
}

export function logisticsPackagingTypeGetIcon(
  type: LogisticsPackagingType
): LogisticsPackagingTypeIcon {
  const icons: Record<LogisticsPackagingType, LogisticsPackagingTypeIcon> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: ICONS.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: ICONS.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: ICONS.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: ICONS.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: ICONS.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: ICONS.TUBE,
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: ICONS.BUBBLE_WRAP,
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: ICONS.STRETCH_WRAP,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: ICONS.CUSTOM,
  };
  return icons[type] || '📦';
}

export function logisticsPackagingTypeGetColor(
  type: LogisticsPackagingType
): LogisticsPackagingTypeColor {
  const colors: Record<LogisticsPackagingType, LogisticsPackagingTypeColor> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: COLORS.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: COLORS.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: COLORS.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: COLORS.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: COLORS.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: COLORS.TUBE,
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: COLORS.BUBBLE_WRAP,
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: COLORS.STRETCH_WRAP,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: COLORS.CUSTOM,
  };
  return colors[type] || '#blue-500';
}

export function logisticsPackagingTypeGetDurability(type: LogisticsPackagingType): number {
  const durability: Record<LogisticsPackagingType, number> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: DURABILITY.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: DURABILITY.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: DURABILITY.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: DURABILITY.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: DURABILITY.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: DURABILITY.TUBE,
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: DURABILITY.BUBBLE_WRAP,
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: DURABILITY.STRETCH_WRAP,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: DURABILITY.CUSTOM,
  };
  return durability[type] || 3;
}

export function logisticsPackagingTypeIsReusable(type: LogisticsPackagingType): boolean {
  const reusable: Record<LogisticsPackagingType, boolean> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: REUSABLE.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: REUSABLE.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: REUSABLE.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: REUSABLE.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: REUSABLE.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: REUSABLE.TUBE,
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: REUSABLE.BUBBLE_WRAP,
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: REUSABLE.STRETCH_WRAP,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: REUSABLE.CUSTOM,
  };
  return reusable[type] || false;
}

export function logisticsPackagingTypeIsRecyclable(type: LogisticsPackagingType): boolean {
  const recyclable: Record<LogisticsPackagingType, boolean> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: RECYCLABLE.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: RECYCLABLE.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: RECYCLABLE.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: RECYCLABLE.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: RECYCLABLE.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: RECYCLABLE.TUBE,
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: RECYCLABLE.BUBBLE_WRAP,
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: RECYCLABLE.STRETCH_WRAP,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: RECYCLABLE.CUSTOM,
  };
  return recyclable[type] || false;
}
