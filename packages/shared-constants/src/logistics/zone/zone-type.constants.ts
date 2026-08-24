/**
 * Zone Type Constants
 * Types of zones
 */

import { LOGISTICS_ZONE } from './zone.constants';
import type { LogisticsZoneType } from './zone.constants';

export const LOGISTICS_ZONE_TYPE = {
  // Type Categories
  CATEGORIES: {
    URBAN: 'urban',
    SUBURBAN: 'suburban',
    RURAL: 'rural',
    INDUSTRIAL: 'industrial',
    COMMERCIAL: 'commercial',
    RESIDENTIAL: 'residential',
    MIXED: 'mixed',
    SPECIAL: 'special',
  } as const,

  // Type Icons (for UI)
  ICONS: {
    URBAN: '🏙️',
    SUBURBAN: '🏘️',
    RURAL: '🌾',
    INDUSTRIAL: '🏭',
    COMMERCIAL: '🏪',
    RESIDENTIAL: '🏠',
    MIXED: '🏢',
    SPECIAL: '⭐',
  } as const,

  // Type Colors (for UI)
  COLORS: {
    URBAN: '#purple-500',
    SUBURBAN: '#blue-500',
    RURAL: '#green-500',
    INDUSTRIAL: '#orange-500',
    COMMERCIAL: '#red-500',
    RESIDENTIAL: '#teal-500',
    MIXED: '#gray-500',
    SPECIAL: '#gold-500',
  } as const,

  // Population Density (people/sq km)
  DENSITY: {
    URBAN: 10000,
    SUBURBAN: 5000,
    RURAL: 1000,
    INDUSTRIAL: 3000,
    COMMERCIAL: 8000,
    RESIDENTIAL: 6000,
    MIXED: 7000,
    SPECIAL: 2000,
  } as const,

  // Area Type
  AREA_TYPES: {
    URBAN: 'city',
    SUBURBAN: 'suburb',
    RURAL: 'village',
    INDUSTRIAL: 'industrial_area',
    COMMERCIAL: 'business_area',
    RESIDENTIAL: 'residential_area',
    MIXED: 'mixed_area',
    SPECIAL: 'special_area',
  } as const,
} as const;

// Type Categories
export type LogisticsZoneTypeCategory =
  (typeof LOGISTICS_ZONE_TYPE.CATEGORIES)[keyof typeof LOGISTICS_ZONE_TYPE.CATEGORIES];

// Type Icons
export type LogisticsZoneTypeIcon =
  (typeof LOGISTICS_ZONE_TYPE.ICONS)[keyof typeof LOGISTICS_ZONE_TYPE.ICONS];

// Type Colors
export type LogisticsZoneTypeColor =
  (typeof LOGISTICS_ZONE_TYPE.COLORS)[keyof typeof LOGISTICS_ZONE_TYPE.COLORS];

// Area Types
export type LogisticsZoneAreaType =
  (typeof LOGISTICS_ZONE_TYPE.AREA_TYPES)[keyof typeof LOGISTICS_ZONE_TYPE.AREA_TYPES];

// Utility Functions
export function logisticsZoneTypeGetLabel(type: LogisticsZoneType): string {
  const labels: Record<LogisticsZoneType, string> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: 'Urban',
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: 'Suburban',
    [LOGISTICS_ZONE.TYPES.RURAL]: 'Rural',
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: 'Industrial',
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: 'Commercial',
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: 'Residential',
    [LOGISTICS_ZONE.TYPES.MIXED]: 'Mixed',
    [LOGISTICS_ZONE.TYPES.SPECIAL]: 'Special',
  };
  return labels[type] || 'Unknown';
}

export function logisticsZoneTypeGetIcon(type: LogisticsZoneType): LogisticsZoneTypeIcon {
  const icons: Record<LogisticsZoneType, LogisticsZoneTypeIcon> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: LOGISTICS_ZONE_TYPE.ICONS.URBAN,
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: LOGISTICS_ZONE_TYPE.ICONS.SUBURBAN,
    [LOGISTICS_ZONE.TYPES.RURAL]: LOGISTICS_ZONE_TYPE.ICONS.RURAL,
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: LOGISTICS_ZONE_TYPE.ICONS.INDUSTRIAL,
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: LOGISTICS_ZONE_TYPE.ICONS.COMMERCIAL,
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: LOGISTICS_ZONE_TYPE.ICONS.RESIDENTIAL,
    [LOGISTICS_ZONE.TYPES.MIXED]: LOGISTICS_ZONE_TYPE.ICONS.MIXED,
    [LOGISTICS_ZONE.TYPES.SPECIAL]: LOGISTICS_ZONE_TYPE.ICONS.SPECIAL,
  };
  return icons[type] || '🏙️';
}

export function logisticsZoneTypeGetColor(type: LogisticsZoneType): LogisticsZoneTypeColor {
  const colors: Record<LogisticsZoneType, LogisticsZoneTypeColor> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: LOGISTICS_ZONE_TYPE.COLORS.URBAN,
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: LOGISTICS_ZONE_TYPE.COLORS.SUBURBAN,
    [LOGISTICS_ZONE.TYPES.RURAL]: LOGISTICS_ZONE_TYPE.COLORS.RURAL,
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: LOGISTICS_ZONE_TYPE.COLORS.INDUSTRIAL,
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: LOGISTICS_ZONE_TYPE.COLORS.COMMERCIAL,
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: LOGISTICS_ZONE_TYPE.COLORS.RESIDENTIAL,
    [LOGISTICS_ZONE.TYPES.MIXED]: LOGISTICS_ZONE_TYPE.COLORS.MIXED,
    [LOGISTICS_ZONE.TYPES.SPECIAL]: LOGISTICS_ZONE_TYPE.COLORS.SPECIAL,
  };
  return colors[type] || '#purple-500';
}

export function logisticsZoneTypeGetDensity(type: LogisticsZoneType): number {
  const densities: Record<LogisticsZoneType, number> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: LOGISTICS_ZONE_TYPE.DENSITY.URBAN,
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: LOGISTICS_ZONE_TYPE.DENSITY.SUBURBAN,
    [LOGISTICS_ZONE.TYPES.RURAL]: LOGISTICS_ZONE_TYPE.DENSITY.RURAL,
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: LOGISTICS_ZONE_TYPE.DENSITY.INDUSTRIAL,
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: LOGISTICS_ZONE_TYPE.DENSITY.COMMERCIAL,
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: LOGISTICS_ZONE_TYPE.DENSITY.RESIDENTIAL,
    [LOGISTICS_ZONE.TYPES.MIXED]: LOGISTICS_ZONE_TYPE.DENSITY.MIXED,
    [LOGISTICS_ZONE.TYPES.SPECIAL]: LOGISTICS_ZONE_TYPE.DENSITY.SPECIAL,
  };
  return densities[type] || LOGISTICS_ZONE_TYPE.DENSITY.RURAL;
}

export function logisticsZoneTypeGetAreaType(type: LogisticsZoneType): LogisticsZoneAreaType {
  const areaTypes: Record<LogisticsZoneType, LogisticsZoneAreaType> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: LOGISTICS_ZONE_TYPE.AREA_TYPES.URBAN,
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: LOGISTICS_ZONE_TYPE.AREA_TYPES.SUBURBAN,
    [LOGISTICS_ZONE.TYPES.RURAL]: LOGISTICS_ZONE_TYPE.AREA_TYPES.RURAL,
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: LOGISTICS_ZONE_TYPE.AREA_TYPES.INDUSTRIAL,
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: LOGISTICS_ZONE_TYPE.AREA_TYPES.COMMERCIAL,
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: LOGISTICS_ZONE_TYPE.AREA_TYPES.RESIDENTIAL,
    [LOGISTICS_ZONE.TYPES.MIXED]: LOGISTICS_ZONE_TYPE.AREA_TYPES.MIXED,
    [LOGISTICS_ZONE.TYPES.SPECIAL]: LOGISTICS_ZONE_TYPE.AREA_TYPES.SPECIAL,
  };
  return areaTypes[type] || LOGISTICS_ZONE_TYPE.AREA_TYPES.RURAL;
}
