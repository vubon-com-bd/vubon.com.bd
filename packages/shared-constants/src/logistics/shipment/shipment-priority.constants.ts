/**
 * Shipment Priority Constants
 * Priority levels for shipments
 */

export const LOGISTICS_SHIPMENT_PRIORITY = {
  // Priority Types
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    URGENT: 'urgent',
    SAME_DAY: 'same_day',
    OVERNIGHT: 'overnight',
  } as const,

  // Priority Levels (numeric)
  LEVELS: {
    STANDARD: 1,
    EXPRESS: 2,
    OVERNIGHT: 3,
    URGENT: 4,
    SAME_DAY: 5,
  } as const,

  // Priority Colors (for UI)
  COLORS: {
    STANDARD: '#blue-400',
    EXPRESS: '#green-500',
    OVERNIGHT: '#orange-500',
    URGENT: '#red-500',
    SAME_DAY: '#purple-500',
  } as const,

  // Delivery Time (in hours)
  DELIVERY_TIME: {
    STANDARD: 72,
    EXPRESS: 48,
    OVERNIGHT: 24,
    URGENT: 12,
    SAME_DAY: 8,
  } as const,

  // Price Multiplier
  PRICE_MULTIPLIER: {
    STANDARD: 1.0,
    EXPRESS: 1.5,
    OVERNIGHT: 2.0,
    URGENT: 2.5,
    SAME_DAY: 3.0,
  } as const,

  // Priority Icons (for UI)
  ICONS: {
    STANDARD: '📦',
    EXPRESS: '🚀',
    OVERNIGHT: '🌙',
    URGENT: '⚡',
    SAME_DAY: '☀️',
  } as const,
} as const;

// Priority Types
export type LogisticsShipmentPriorityType =
  (typeof LOGISTICS_SHIPMENT_PRIORITY.TYPES)[keyof typeof LOGISTICS_SHIPMENT_PRIORITY.TYPES];

// Priority Levels
export type LogisticsShipmentPriorityLevel =
  (typeof LOGISTICS_SHIPMENT_PRIORITY.LEVELS)[keyof typeof LOGISTICS_SHIPMENT_PRIORITY.LEVELS];

// Priority Colors
export type LogisticsShipmentPriorityColor =
  (typeof LOGISTICS_SHIPMENT_PRIORITY.COLORS)[keyof typeof LOGISTICS_SHIPMENT_PRIORITY.COLORS];

// Priority Icons
export type LogisticsShipmentPriorityIcon =
  (typeof LOGISTICS_SHIPMENT_PRIORITY.ICONS)[keyof typeof LOGISTICS_SHIPMENT_PRIORITY.ICONS];

// Utility Functions
export function logisticsShipmentPriorityGetLabel(priority: LogisticsShipmentPriorityType): string {
  const labels: Record<LogisticsShipmentPriorityType, string> = {
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.STANDARD]: 'Standard (2-3 days)',
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS]: 'Express (1-2 days)',
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT]: 'Overnight (24 hours)',
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT]: 'Urgent (12 hours)',
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY]: 'Same Day (8 hours)',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsShipmentPriorityGetLevel(priority: LogisticsShipmentPriorityType): number {
  const levels: Record<LogisticsShipmentPriorityType, number> = {
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.STANDARD]: LOGISTICS_SHIPMENT_PRIORITY.LEVELS.STANDARD,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS]: LOGISTICS_SHIPMENT_PRIORITY.LEVELS.EXPRESS,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT]: LOGISTICS_SHIPMENT_PRIORITY.LEVELS.OVERNIGHT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT]: LOGISTICS_SHIPMENT_PRIORITY.LEVELS.URGENT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY]: LOGISTICS_SHIPMENT_PRIORITY.LEVELS.SAME_DAY,
  };
  return levels[priority] || 1;
}

export function logisticsShipmentPriorityGetDeliveryTime(
  priority: LogisticsShipmentPriorityType
): number {
  const times: Record<LogisticsShipmentPriorityType, number> = {
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.STANDARD]:
      LOGISTICS_SHIPMENT_PRIORITY.DELIVERY_TIME.STANDARD,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS]: LOGISTICS_SHIPMENT_PRIORITY.DELIVERY_TIME.EXPRESS,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT]:
      LOGISTICS_SHIPMENT_PRIORITY.DELIVERY_TIME.OVERNIGHT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT]: LOGISTICS_SHIPMENT_PRIORITY.DELIVERY_TIME.URGENT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY]:
      LOGISTICS_SHIPMENT_PRIORITY.DELIVERY_TIME.SAME_DAY,
  };
  return times[priority] || LOGISTICS_SHIPMENT_PRIORITY.DELIVERY_TIME.STANDARD;
}

export function logisticsShipmentPriorityGetPriceMultiplier(
  priority: LogisticsShipmentPriorityType
): number {
  const multipliers: Record<LogisticsShipmentPriorityType, number> = {
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.STANDARD]:
      LOGISTICS_SHIPMENT_PRIORITY.PRICE_MULTIPLIER.STANDARD,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS]:
      LOGISTICS_SHIPMENT_PRIORITY.PRICE_MULTIPLIER.EXPRESS,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT]:
      LOGISTICS_SHIPMENT_PRIORITY.PRICE_MULTIPLIER.OVERNIGHT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT]: LOGISTICS_SHIPMENT_PRIORITY.PRICE_MULTIPLIER.URGENT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY]:
      LOGISTICS_SHIPMENT_PRIORITY.PRICE_MULTIPLIER.SAME_DAY,
  };
  return multipliers[priority] || 1.0;
}

export function logisticsShipmentPriorityGetColor(
  priority: LogisticsShipmentPriorityType
): LogisticsShipmentPriorityColor {
  const colors: Record<LogisticsShipmentPriorityType, LogisticsShipmentPriorityColor> = {
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.STANDARD]: LOGISTICS_SHIPMENT_PRIORITY.COLORS.STANDARD,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS]: LOGISTICS_SHIPMENT_PRIORITY.COLORS.EXPRESS,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT]: LOGISTICS_SHIPMENT_PRIORITY.COLORS.OVERNIGHT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT]: LOGISTICS_SHIPMENT_PRIORITY.COLORS.URGENT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY]: LOGISTICS_SHIPMENT_PRIORITY.COLORS.SAME_DAY,
  };
  return colors[priority] || '#blue-400';
}

export function logisticsShipmentPriorityGetIcon(
  priority: LogisticsShipmentPriorityType
): LogisticsShipmentPriorityIcon {
  const icons: Record<LogisticsShipmentPriorityType, LogisticsShipmentPriorityIcon> = {
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.STANDARD]: LOGISTICS_SHIPMENT_PRIORITY.ICONS.STANDARD,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS]: LOGISTICS_SHIPMENT_PRIORITY.ICONS.EXPRESS,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT]: LOGISTICS_SHIPMENT_PRIORITY.ICONS.OVERNIGHT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT]: LOGISTICS_SHIPMENT_PRIORITY.ICONS.URGENT,
    [LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY]: LOGISTICS_SHIPMENT_PRIORITY.ICONS.SAME_DAY,
  };
  return icons[priority] || '📦';
}

export function logisticsShipmentPriorityIsUrgent(
  priority: LogisticsShipmentPriorityType
): boolean {
  const urgentPriorities: LogisticsShipmentPriorityType[] = [
    LOGISTICS_SHIPMENT_PRIORITY.TYPES.URGENT,
    LOGISTICS_SHIPMENT_PRIORITY.TYPES.SAME_DAY,
  ];
  return urgentPriorities.includes(priority);
}

export function logisticsShipmentPriorityIsExpress(
  priority: LogisticsShipmentPriorityType
): boolean {
  const expressPriorities: LogisticsShipmentPriorityType[] = [
    LOGISTICS_SHIPMENT_PRIORITY.TYPES.EXPRESS,
    LOGISTICS_SHIPMENT_PRIORITY.TYPES.OVERNIGHT,
  ];
  return expressPriorities.includes(priority);
}
