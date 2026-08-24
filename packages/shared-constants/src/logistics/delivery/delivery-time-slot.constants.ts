/**
 * Delivery Time Slot Constants
 * Time slots for deliveries - Bangladesh based
 */

export const LOGISTICS_DELIVERY_TIME_SLOT = {
  // Time Slot Types
  TYPES: {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    ANY: 'any',
  } as const,

  // Time Slot Labels
  LABELS: {
    MORNING: 'Morning (9AM - 1PM)',
    AFTERNOON: 'Afternoon (2PM - 6PM)',
    EVENING: 'Evening (6PM - 9PM)',
    NIGHT: 'Night (9PM - 11PM)',
    ANY: 'Any Time',
  } as const,

  // Time Slot Hours
  HOURS: {
    MORNING: { start: 9, end: 13 },
    AFTERNOON: { start: 14, end: 18 },
    EVENING: { start: 18, end: 21 },
    NIGHT: { start: 21, end: 23 },
    ANY: { start: 9, end: 23 },
  } as const,

  // Time Slot Priorities
  PRIORITIES: {
    MORNING: 1,
    AFTERNOON: 2,
    EVENING: 3,
    NIGHT: 4,
    ANY: 0,
  } as const,

  // Time Slot Colors (for UI)
  COLORS: {
    MORNING: '#orange-400',
    AFTERNOON: '#blue-400',
    EVENING: '#purple-400',
    NIGHT: '#indigo-400',
    ANY: '#gray-400',
  } as const,

  // Time Slot Icons (for UI)
  ICONS: {
    MORNING: '🌅',
    AFTERNOON: '☀️',
    EVENING: '🌆',
    NIGHT: '🌙',
    ANY: '🕐',
  } as const,

  // Weekend Time Slots (Bangladesh - Friday is holiday)
  WEEKEND: {
    MORNING: { start: 9, end: 12 },
    AFTERNOON: { start: 14, end: 17 },
    EVENING: { start: 18, end: 20 },
    NIGHT: { start: 20, end: 22 },
    ANY: { start: 9, end: 22 },
  } as const,

  // Holiday Time Slots
  HOLIDAY: {
    MORNING: { start: 10, end: 12 },
    AFTERNOON: { start: 14, end: 16 },
    EVENING: { start: 18, end: 20 },
    NIGHT: { start: 20, end: 22 },
    ANY: { start: 10, end: 22 },
  } as const,
} as const;

// Time Slot Types
export type LogisticsDeliveryTimeSlotType =
  (typeof LOGISTICS_DELIVERY_TIME_SLOT.TYPES)[keyof typeof LOGISTICS_DELIVERY_TIME_SLOT.TYPES];

// Time Slot Labels
export type LogisticsDeliveryTimeSlotLabel =
  (typeof LOGISTICS_DELIVERY_TIME_SLOT.LABELS)[keyof typeof LOGISTICS_DELIVERY_TIME_SLOT.LABELS];

// Time Slot Colors
export type LogisticsDeliveryTimeSlotColor =
  (typeof LOGISTICS_DELIVERY_TIME_SLOT.COLORS)[keyof typeof LOGISTICS_DELIVERY_TIME_SLOT.COLORS];

// Time Slot Icons
export type LogisticsDeliveryTimeSlotIcon =
  (typeof LOGISTICS_DELIVERY_TIME_SLOT.ICONS)[keyof typeof LOGISTICS_DELIVERY_TIME_SLOT.ICONS];

// Utility Functions
export function logisticsDeliveryTimeSlotGetLabel(
  slot: LogisticsDeliveryTimeSlotType
): LogisticsDeliveryTimeSlotLabel {
  const labels: Record<LogisticsDeliveryTimeSlotType, LogisticsDeliveryTimeSlotLabel> = {
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.LABELS.MORNING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]: LOGISTICS_DELIVERY_TIME_SLOT.LABELS.AFTERNOON,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.LABELS.EVENING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.LABELS.NIGHT,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.LABELS.ANY,
  };
  return labels[slot] || LOGISTICS_DELIVERY_TIME_SLOT.LABELS.ANY;
}

export function logisticsDeliveryTimeSlotGetHours(slot: LogisticsDeliveryTimeSlotType): {
  start: number;
  end: number;
} {
  const hours: Record<LogisticsDeliveryTimeSlotType, { start: number; end: number }> = {
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.HOURS.MORNING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]: LOGISTICS_DELIVERY_TIME_SLOT.HOURS.AFTERNOON,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.HOURS.EVENING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.HOURS.NIGHT,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.HOURS.ANY,
  };
  return hours[slot] || LOGISTICS_DELIVERY_TIME_SLOT.HOURS.ANY;
}

export function logisticsDeliveryTimeSlotGetPriority(slot: LogisticsDeliveryTimeSlotType): number {
  const priorities: Record<LogisticsDeliveryTimeSlotType, number> = {
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.PRIORITIES.MORNING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]:
      LOGISTICS_DELIVERY_TIME_SLOT.PRIORITIES.AFTERNOON,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.PRIORITIES.EVENING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.PRIORITIES.NIGHT,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.PRIORITIES.ANY,
  };
  return priorities[slot] || 0;
}

export function logisticsDeliveryTimeSlotGetColor(
  slot: LogisticsDeliveryTimeSlotType
): LogisticsDeliveryTimeSlotColor {
  const colors: Record<LogisticsDeliveryTimeSlotType, LogisticsDeliveryTimeSlotColor> = {
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.COLORS.MORNING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]: LOGISTICS_DELIVERY_TIME_SLOT.COLORS.AFTERNOON,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.COLORS.EVENING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.COLORS.NIGHT,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.COLORS.ANY,
  };
  return colors[slot] || LOGISTICS_DELIVERY_TIME_SLOT.COLORS.ANY;
}

export function logisticsDeliveryTimeSlotGetIcon(
  slot: LogisticsDeliveryTimeSlotType
): LogisticsDeliveryTimeSlotIcon {
  const icons: Record<LogisticsDeliveryTimeSlotType, LogisticsDeliveryTimeSlotIcon> = {
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.ICONS.MORNING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]: LOGISTICS_DELIVERY_TIME_SLOT.ICONS.AFTERNOON,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.ICONS.EVENING,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.ICONS.NIGHT,
    [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.ICONS.ANY,
  };
  return icons[slot] || LOGISTICS_DELIVERY_TIME_SLOT.ICONS.ANY;
}

export function logisticsDeliveryTimeSlotIsWeekend(): boolean {
  const today = new Date();
  const day = today.getDay();
  return day === 5; // Friday is holiday in Bangladesh
}

export function logisticsDeliveryTimeSlotGetHoursForDay(
  slot: LogisticsDeliveryTimeSlotType,
  isWeekend: boolean = false,
  isHoliday: boolean = false
): { start: number; end: number } {
  if (isHoliday) {
    const holidayHours: Record<LogisticsDeliveryTimeSlotType, { start: number; end: number }> = {
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.HOLIDAY.MORNING,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]:
        LOGISTICS_DELIVERY_TIME_SLOT.HOLIDAY.AFTERNOON,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.HOLIDAY.EVENING,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.HOLIDAY.NIGHT,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.HOLIDAY.ANY,
    };
    return holidayHours[slot] || LOGISTICS_DELIVERY_TIME_SLOT.HOLIDAY.ANY;
  }

  if (isWeekend) {
    const weekendHours: Record<LogisticsDeliveryTimeSlotType, { start: number; end: number }> = {
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.MORNING]: LOGISTICS_DELIVERY_TIME_SLOT.WEEKEND.MORNING,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.AFTERNOON]:
        LOGISTICS_DELIVERY_TIME_SLOT.WEEKEND.AFTERNOON,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.EVENING]: LOGISTICS_DELIVERY_TIME_SLOT.WEEKEND.EVENING,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.NIGHT]: LOGISTICS_DELIVERY_TIME_SLOT.WEEKEND.NIGHT,
      [LOGISTICS_DELIVERY_TIME_SLOT.TYPES.ANY]: LOGISTICS_DELIVERY_TIME_SLOT.WEEKEND.ANY,
    };
    return weekendHours[slot] || LOGISTICS_DELIVERY_TIME_SLOT.WEEKEND.ANY;
  }

  return logisticsDeliveryTimeSlotGetHours(slot);
}
