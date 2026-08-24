/**
 * Route Constants
 * Configuration for routes - Bangladesh based
 */

export const LOGISTICS_ROUTE = {
  // Route Types
  TYPES: {
    LOCAL: 'local',
    REGIONAL: 'regional',
    NATIONAL: 'national',
    INTERNATIONAL: 'international',
    URBAN: 'urban',
    RURAL: 'rural',
    HIGHWAY: 'highway',
    EXPRESS: 'express',
  } as const,

  // Route Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    CLOSED: 'closed',
    RESTRICTED: 'restricted',
    PLANNED: 'planned',
  } as const,

  // Route Priorities
  PRIORITIES: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    BACKGROUND: 1,
  } as const,

  // Route Distances (in km)
  DISTANCES: {
    LOCAL: 50,
    REGIONAL: 200,
    NATIONAL: 500,
    INTERNATIONAL: 1000,
    URBAN: 30,
    RURAL: 100,
    HIGHWAY: 300,
    EXPRESS: 150,
  } as const,

  // Route Durations (in hours)
  DURATIONS: {
    LOCAL: 1,
    REGIONAL: 4,
    NATIONAL: 8,
    INTERNATIONAL: 12,
    URBAN: 0.5,
    RURAL: 2,
    HIGHWAY: 4,
    EXPRESS: 2,
  } as const,

  // Route Conditions
  CONDITIONS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    HAZARDOUS: 'hazardous',
    UNDER_CONSTRUCTION: 'under_construction',
  } as const,

  // Route Types (Bangladesh)
  BANGLADESH_ROUTES: {
    DHAKA_CHITTAGONG: 'dhaka_chittagong',
    DHAKA_SYLHET: 'dhaka_sylhet',
    DHAKA_RAJSHAHI: 'dhaka_rajshahi',
    DHAKA_KHULNA: 'dhaka_khulna',
    DHAKA_BARISHAL: 'dhaka_barishal',
    DHAKA_RANGPUR: 'dhaka_rangpur',
    DHAKA_MYMENSINGH: 'dhaka_mymensingh',
    CHITTAGONG_SYLHET: 'chittagong_sylhet',
    RAJSHAHI_RANGPUR: 'rajshahi_rangpur',
    KHULNA_BARISHAL: 'khulna_barishal',
  } as const,

  // Route Labels
  ROUTE_LABELS: {
    DHAKA_CHITTAGONG: 'Dhaka - Chittagong (via Cumilla)',
    DHAKA_SYLHET: 'Dhaka - Sylhet (via Bhairab)',
    DHAKA_RAJSHAHI: 'Dhaka - Rajshahi (via Bangabandhu Bridge)',
    DHAKA_KHULNA: 'Dhaka - Khulna (via Faridpur)',
    DHAKA_BARISHAL: 'Dhaka - Barishal (via Mawa Ferry)',
    DHAKA_RANGPUR: 'Dhaka - Rangpur (via Bogra)',
    DHAKA_MYMENSINGH: 'Dhaka - Mymensingh (via Gazipur)',
    CHITTAGONG_SYLHET: 'Chittagong - Sylhet (via Feni)',
    RAJSHAHI_RANGPUR: 'Rajshahi - Rangpur (via Bogra)',
    KHULNA_BARISHAL: 'Khulna - Barishal (via Bagerhat)',
  } as const,
} as const;

// Route Types
export type LogisticsRouteType = (typeof LOGISTICS_ROUTE.TYPES)[keyof typeof LOGISTICS_ROUTE.TYPES];

// Route Statuses
export type LogisticsRouteStatus =
  (typeof LOGISTICS_ROUTE.STATUS)[keyof typeof LOGISTICS_ROUTE.STATUS];

// Route Priorities
export type LogisticsRoutePriority =
  (typeof LOGISTICS_ROUTE.PRIORITIES)[keyof typeof LOGISTICS_ROUTE.PRIORITIES];

// Route Conditions
export type LogisticsRouteCondition =
  (typeof LOGISTICS_ROUTE.CONDITIONS)[keyof typeof LOGISTICS_ROUTE.CONDITIONS];

// Bangladesh Routes
export type LogisticsBangladeshRoute =
  (typeof LOGISTICS_ROUTE.BANGLADESH_ROUTES)[keyof typeof LOGISTICS_ROUTE.BANGLADESH_ROUTES];

// Utility Functions
export function logisticsRouteGetTypeLabel(type: LogisticsRouteType): string {
  const labels: Record<LogisticsRouteType, string> = {
    [LOGISTICS_ROUTE.TYPES.LOCAL]: 'Local',
    [LOGISTICS_ROUTE.TYPES.REGIONAL]: 'Regional',
    [LOGISTICS_ROUTE.TYPES.NATIONAL]: 'National',
    [LOGISTICS_ROUTE.TYPES.INTERNATIONAL]: 'International',
    [LOGISTICS_ROUTE.TYPES.URBAN]: 'Urban',
    [LOGISTICS_ROUTE.TYPES.RURAL]: 'Rural',
    [LOGISTICS_ROUTE.TYPES.HIGHWAY]: 'Highway',
    [LOGISTICS_ROUTE.TYPES.EXPRESS]: 'Express',
  };
  return labels[type] || 'Unknown';
}

export function logisticsRouteGetStatusLabel(status: LogisticsRouteStatus): string {
  const labels: Record<LogisticsRouteStatus, string> = {
    [LOGISTICS_ROUTE.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_ROUTE.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_ROUTE.STATUS.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_ROUTE.STATUS.CLOSED]: 'Closed',
    [LOGISTICS_ROUTE.STATUS.RESTRICTED]: 'Restricted',
    [LOGISTICS_ROUTE.STATUS.PLANNED]: 'Planned',
  };
  return labels[status] || 'Unknown';
}

export function logisticsRouteGetPriorityLabel(priority: LogisticsRoutePriority): string {
  const labels: Record<LogisticsRoutePriority, string> = {
    [LOGISTICS_ROUTE.PRIORITIES.CRITICAL]: 'Critical',
    [LOGISTICS_ROUTE.PRIORITIES.HIGH]: 'High',
    [LOGISTICS_ROUTE.PRIORITIES.MEDIUM]: 'Medium',
    [LOGISTICS_ROUTE.PRIORITIES.LOW]: 'Low',
    [LOGISTICS_ROUTE.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsRouteGetDistance(type: LogisticsRouteType): number {
  const distances: Record<LogisticsRouteType, number> = {
    [LOGISTICS_ROUTE.TYPES.LOCAL]: LOGISTICS_ROUTE.DISTANCES.LOCAL,
    [LOGISTICS_ROUTE.TYPES.REGIONAL]: LOGISTICS_ROUTE.DISTANCES.REGIONAL,
    [LOGISTICS_ROUTE.TYPES.NATIONAL]: LOGISTICS_ROUTE.DISTANCES.NATIONAL,
    [LOGISTICS_ROUTE.TYPES.INTERNATIONAL]: LOGISTICS_ROUTE.DISTANCES.INTERNATIONAL,
    [LOGISTICS_ROUTE.TYPES.URBAN]: LOGISTICS_ROUTE.DISTANCES.URBAN,
    [LOGISTICS_ROUTE.TYPES.RURAL]: LOGISTICS_ROUTE.DISTANCES.RURAL,
    [LOGISTICS_ROUTE.TYPES.HIGHWAY]: LOGISTICS_ROUTE.DISTANCES.HIGHWAY,
    [LOGISTICS_ROUTE.TYPES.EXPRESS]: LOGISTICS_ROUTE.DISTANCES.EXPRESS,
  };
  return distances[type] || LOGISTICS_ROUTE.DISTANCES.LOCAL;
}

export function logisticsRouteGetDuration(type: LogisticsRouteType): number {
  const durations: Record<LogisticsRouteType, number> = {
    [LOGISTICS_ROUTE.TYPES.LOCAL]: LOGISTICS_ROUTE.DURATIONS.LOCAL,
    [LOGISTICS_ROUTE.TYPES.REGIONAL]: LOGISTICS_ROUTE.DURATIONS.REGIONAL,
    [LOGISTICS_ROUTE.TYPES.NATIONAL]: LOGISTICS_ROUTE.DURATIONS.NATIONAL,
    [LOGISTICS_ROUTE.TYPES.INTERNATIONAL]: LOGISTICS_ROUTE.DURATIONS.INTERNATIONAL,
    [LOGISTICS_ROUTE.TYPES.URBAN]: LOGISTICS_ROUTE.DURATIONS.URBAN,
    [LOGISTICS_ROUTE.TYPES.RURAL]: LOGISTICS_ROUTE.DURATIONS.RURAL,
    [LOGISTICS_ROUTE.TYPES.HIGHWAY]: LOGISTICS_ROUTE.DURATIONS.HIGHWAY,
    [LOGISTICS_ROUTE.TYPES.EXPRESS]: LOGISTICS_ROUTE.DURATIONS.EXPRESS,
  };
  return durations[type] || LOGISTICS_ROUTE.DURATIONS.LOCAL;
}

export function logisticsRouteGetConditionLabel(condition: LogisticsRouteCondition): string {
  const labels: Record<LogisticsRouteCondition, string> = {
    [LOGISTICS_ROUTE.CONDITIONS.EXCELLENT]: 'Excellent',
    [LOGISTICS_ROUTE.CONDITIONS.GOOD]: 'Good',
    [LOGISTICS_ROUTE.CONDITIONS.FAIR]: 'Fair',
    [LOGISTICS_ROUTE.CONDITIONS.POOR]: 'Poor',
    [LOGISTICS_ROUTE.CONDITIONS.HAZARDOUS]: 'Hazardous',
    [LOGISTICS_ROUTE.CONDITIONS.UNDER_CONSTRUCTION]: 'Under Construction',
  };
  return labels[condition] || 'Unknown';
}

export function logisticsRouteGetBangladeshRouteLabel(route: LogisticsBangladeshRoute): string {
  const labels: Record<LogisticsBangladeshRoute, string> = {
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_CHITTAGONG]:
      LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_CHITTAGONG,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_SYLHET]: LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_SYLHET,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_RAJSHAHI]: LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_RAJSHAHI,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_KHULNA]: LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_KHULNA,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_BARISHAL]: LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_BARISHAL,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_RANGPUR]: LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_RANGPUR,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.DHAKA_MYMENSINGH]:
      LOGISTICS_ROUTE.ROUTE_LABELS.DHAKA_MYMENSINGH,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.CHITTAGONG_SYLHET]:
      LOGISTICS_ROUTE.ROUTE_LABELS.CHITTAGONG_SYLHET,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.RAJSHAHI_RANGPUR]:
      LOGISTICS_ROUTE.ROUTE_LABELS.RAJSHAHI_RANGPUR,
    [LOGISTICS_ROUTE.BANGLADESH_ROUTES.KHULNA_BARISHAL]:
      LOGISTICS_ROUTE.ROUTE_LABELS.KHULNA_BARISHAL,
  };
  return labels[route] || 'Unknown';
}

export function logisticsRouteIsActive(status: LogisticsRouteStatus): boolean {
  return status === LOGISTICS_ROUTE.STATUS.ACTIVE;
}

export function logisticsRouteIsOperational(status: LogisticsRouteStatus): boolean {
  const operationalStatuses: LogisticsRouteStatus[] = [
    LOGISTICS_ROUTE.STATUS.ACTIVE,
    LOGISTICS_ROUTE.STATUS.MAINTENANCE,
  ];
  return operationalStatuses.includes(status);
}
