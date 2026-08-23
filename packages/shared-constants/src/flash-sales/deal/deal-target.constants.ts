/**
 * Deal Target Constants
 * Target audiences and segments for deals
 */

export const DEAL_TARGET = {
  // Target Types
  TYPES: {
    ALL: 'all',
    NEW: 'new',
    RETURNING: 'returning',
    VIP: 'vip',
    MEMBERS: 'members',
    SUBSCRIBERS: 'subscribers',
    FIRST_TIME: 'first_time',
    HIGH_VALUE: 'high_value',
    INACTIVE: 'inactive',
    AT_RISK: 'at_risk',
    LOYAL: 'loyal',
    CART_ABANDONERS: 'cart_abandoners',
  },

  // Target Segments
  SEGMENTS: {
    DEMOGRAPHIC: 'demographic',
    GEOGRAPHIC: 'geographic',
    BEHAVIORAL: 'behavioral',
    PSYCHOGRAPHIC: 'psychographic',
    PURCHASE: 'purchase',
    ENGAGEMENT: 'engagement',
    CUSTOM: 'custom',
  },

  // Target Criteria
  CRITERIA: {
    AGE: 'age',
    GENDER: 'gender',
    LOCATION: 'location',
    INCOME: 'income',
    OCCUPATION: 'occupation',
    EDUCATION: 'education',
    PURCHASE_HISTORY: 'purchase_history',
    BROWSING_BEHAVIOR: 'browsing_behavior',
    DEVICE_TYPE: 'device_type',
    CHANNEL: 'channel',
    SEASON: 'season',
    TIME: 'time',
  },

  // Target Priority
  PRIORITY: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
  },
} as const;

// Target Types
export type DealTargetType = (typeof DEAL_TARGET.TYPES)[keyof typeof DEAL_TARGET.TYPES];

// Target Segments
export type DealTargetSegment = (typeof DEAL_TARGET.SEGMENTS)[keyof typeof DEAL_TARGET.SEGMENTS];

// Target Criteria
export type DealTargetCriteria = (typeof DEAL_TARGET.CRITERIA)[keyof typeof DEAL_TARGET.CRITERIA];

// Target Priority
export type DealTargetPriority = (typeof DEAL_TARGET.PRIORITY)[keyof typeof DEAL_TARGET.PRIORITY];

// Utility Functions
export function flashsalesDealTargetGetTypeLabel(type: DealTargetType): string {
  const labels: Record<DealTargetType, string> = {
    [DEAL_TARGET.TYPES.ALL]: 'All Customers',
    [DEAL_TARGET.TYPES.NEW]: 'New Customers',
    [DEAL_TARGET.TYPES.RETURNING]: 'Returning Customers',
    [DEAL_TARGET.TYPES.VIP]: 'VIP Customers',
    [DEAL_TARGET.TYPES.MEMBERS]: 'Members',
    [DEAL_TARGET.TYPES.SUBSCRIBERS]: 'Subscribers',
    [DEAL_TARGET.TYPES.FIRST_TIME]: 'First Time Buyers',
    [DEAL_TARGET.TYPES.HIGH_VALUE]: 'High Value Customers',
    [DEAL_TARGET.TYPES.INACTIVE]: 'Inactive Customers',
    [DEAL_TARGET.TYPES.AT_RISK]: 'At Risk Customers',
    [DEAL_TARGET.TYPES.LOYAL]: 'Loyal Customers',
    [DEAL_TARGET.TYPES.CART_ABANDONERS]: 'Cart Abandoners',
  };
  return labels[type] || 'Unknown Target Type';
}

export function flashsalesDealTargetGetSegmentLabel(segment: DealTargetSegment): string {
  const labels: Record<DealTargetSegment, string> = {
    [DEAL_TARGET.SEGMENTS.DEMOGRAPHIC]: 'Demographic',
    [DEAL_TARGET.SEGMENTS.GEOGRAPHIC]: 'Geographic',
    [DEAL_TARGET.SEGMENTS.BEHAVIORAL]: 'Behavioral',
    [DEAL_TARGET.SEGMENTS.PSYCHOGRAPHIC]: 'Psychographic',
    [DEAL_TARGET.SEGMENTS.PURCHASE]: 'Purchase Based',
    [DEAL_TARGET.SEGMENTS.ENGAGEMENT]: 'Engagement Based',
    [DEAL_TARGET.SEGMENTS.CUSTOM]: 'Custom Segment',
  };
  return labels[segment] || 'Unknown Segment';
}

export function flashsalesDealTargetGetCriteriaLabel(criteria: DealTargetCriteria): string {
  const labels: Record<DealTargetCriteria, string> = {
    [DEAL_TARGET.CRITERIA.AGE]: 'Age',
    [DEAL_TARGET.CRITERIA.GENDER]: 'Gender',
    [DEAL_TARGET.CRITERIA.LOCATION]: 'Location',
    [DEAL_TARGET.CRITERIA.INCOME]: 'Income',
    [DEAL_TARGET.CRITERIA.OCCUPATION]: 'Occupation',
    [DEAL_TARGET.CRITERIA.EDUCATION]: 'Education',
    [DEAL_TARGET.CRITERIA.PURCHASE_HISTORY]: 'Purchase History',
    [DEAL_TARGET.CRITERIA.BROWSING_BEHAVIOR]: 'Browsing Behavior',
    [DEAL_TARGET.CRITERIA.DEVICE_TYPE]: 'Device Type',
    [DEAL_TARGET.CRITERIA.CHANNEL]: 'Channel',
    [DEAL_TARGET.CRITERIA.SEASON]: 'Season',
    [DEAL_TARGET.CRITERIA.TIME]: 'Time',
  };
  return labels[criteria] || 'Unknown Criteria';
}

export function flashsalesDealTargetGetPriorityLabel(priority: DealTargetPriority): string {
  const labels: Record<DealTargetPriority, string> = {
    [DEAL_TARGET.PRIORITY.PRIMARY]: 'Primary Target',
    [DEAL_TARGET.PRIORITY.SECONDARY]: 'Secondary Target',
    [DEAL_TARGET.PRIORITY.TERTIARY]: 'Tertiary Target',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesDealTargetIsValidType(type: string): type is DealTargetType {
  return Object.values(DEAL_TARGET.TYPES).includes(type as DealTargetType);
}

export function flashsalesDealTargetIsValidSegment(segment: string): segment is DealTargetSegment {
  return Object.values(DEAL_TARGET.SEGMENTS).includes(segment as DealTargetSegment);
}

export function flashsalesDealTargetIsHighValue(type: DealTargetType): boolean {
  const highValueTypes: DealTargetType[] = [
    DEAL_TARGET.TYPES.VIP,
    DEAL_TARGET.TYPES.HIGH_VALUE,
    DEAL_TARGET.TYPES.LOYAL,
  ];
  return highValueTypes.includes(type);
}

export function flashsalesDealTargetIsNewCustomer(type: DealTargetType): boolean {
  const newCustomerTypes: DealTargetType[] = [DEAL_TARGET.TYPES.NEW, DEAL_TARGET.TYPES.FIRST_TIME];
  return newCustomerTypes.includes(type);
}
