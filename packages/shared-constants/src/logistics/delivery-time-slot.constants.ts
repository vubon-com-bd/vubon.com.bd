/**
 * ডেলিভারি টাইম স্লট সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ডেলিভারি টাইম স্লট
 */
export const DELIVERY_TIME_SLOTS = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night',
} as const;

/**
 * ডেলিভারি টাইম স্লট টাইপ
 */
export type DeliveryTimeSlot = (typeof DELIVERY_TIME_SLOTS)[keyof typeof DELIVERY_TIME_SLOTS];

/**
 * ডেলিভারি টাইম স্লটের সময়
 */
export const DELIVERY_TIME_SLOT_TIMES: Record<DeliveryTimeSlot, { start: string; end: string }> = {
  [DELIVERY_TIME_SLOTS.MORNING]: { start: '08:00', end: '12:00' },
  [DELIVERY_TIME_SLOTS.AFTERNOON]: { start: '12:00', end: '16:00' },
  [DELIVERY_TIME_SLOTS.EVENING]: { start: '16:00', end: '20:00' },
  [DELIVERY_TIME_SLOTS.NIGHT]: { start: '20:00', end: '22:00' },
};

/**
 * ডেলিভারি টাইম স্লটের বিবরণ
 */
export const DELIVERY_TIME_SLOT_DESCRIPTIONS: Record<DeliveryTimeSlot, string> = {
  [DELIVERY_TIME_SLOTS.MORNING]: 'সকালের স্লট - ০৮:০০ থেকে ১২:০০ পর্যন্ত',
  [DELIVERY_TIME_SLOTS.AFTERNOON]: 'দুপুরের স্লট - ১২:০০ থেকে ১৬:০০ পর্যন্ত',
  [DELIVERY_TIME_SLOTS.EVENING]: 'বিকালের স্লট - ১৬:০০ থেকে ২০:০০ পর্যন্ত',
  [DELIVERY_TIME_SLOTS.NIGHT]: 'সন্ধ্যার স্লট - ২০:০০ থেকে ২২:০০ পর্যন্ত',
};

/**
 * ডেলিভারি টাইম স্লটের রং (UI এর জন্য)
 */
export const DELIVERY_TIME_SLOT_COLORS: Record<DeliveryTimeSlot, string> = {
  [DELIVERY_TIME_SLOTS.MORNING]: '#F1C40F', // সোনালী
  [DELIVERY_TIME_SLOTS.AFTERNOON]: '#3498DB', // নীল
  [DELIVERY_TIME_SLOTS.EVENING]: '#E67E22', // কমলা
  [DELIVERY_TIME_SLOTS.NIGHT]: '#2C3E50', // গাঢ় নীল
};

/**
 * ডেলিভারি টাইম স্লটের আইকন (UI এর জন্য)
 */
export const DELIVERY_TIME_SLOT_ICONS: Record<DeliveryTimeSlot, string> = {
  [DELIVERY_TIME_SLOTS.MORNING]: 'sunrise',
  [DELIVERY_TIME_SLOTS.AFTERNOON]: 'sun',
  [DELIVERY_TIME_SLOTS.EVENING]: 'sunset',
  [DELIVERY_TIME_SLOTS.NIGHT]: 'moon',
};

/**
 * ডেলিভারি টাইম স্লটের অগ্রাধিকার
 */
export const DELIVERY_TIME_SLOT_PRIORITY: Record<DeliveryTimeSlot, number> = {
  [DELIVERY_TIME_SLOTS.MORNING]: 1,
  [DELIVERY_TIME_SLOTS.AFTERNOON]: 2,
  [DELIVERY_TIME_SLOTS.EVENING]: 3,
  [DELIVERY_TIME_SLOTS.NIGHT]: 4,
};

/**
 * সপ্তাহের দিন
 */
export const WEEKDAYS = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
} as const;

/**
 * সপ্তাহের দিন টাইপ
 */
export type Weekday = (typeof WEEKDAYS)[keyof typeof WEEKDAYS];

/**
 * সপ্তাহের দিনের বিবরণ
 */
export const WEEKDAY_DESCRIPTIONS: Record<Weekday, string> = {
  [WEEKDAYS.SUNDAY]: 'রবিবার',
  [WEEKDAYS.MONDAY]: 'সোমবার',
  [WEEKDAYS.TUESDAY]: 'মঙ্গলবার',
  [WEEKDAYS.WEDNESDAY]: 'বুধবার',
  [WEEKDAYS.THURSDAY]: 'বৃহস্পতিবার',
  [WEEKDAYS.FRIDAY]: 'শুক্রবার',
  [WEEKDAYS.SATURDAY]: 'শনিবার',
};

/**
 * সপ্তাহের দিনের সংক্ষিপ্ত নাম
 */
export const WEEKDAY_SHORT_NAMES: Record<Weekday, string> = {
  [WEEKDAYS.SUNDAY]: 'রবি',
  [WEEKDAYS.MONDAY]: 'সোম',
  [WEEKDAYS.TUESDAY]: 'মঙ্গল',
  [WEEKDAYS.WEDNESDAY]: 'বুধ',
  [WEEKDAYS.THURSDAY]: 'বৃহস্পতি',
  [WEEKDAYS.FRIDAY]: 'শুক্র',
  [WEEKDAYS.SATURDAY]: 'শনি',
};

/**
 * সাপ্তাহিক ছুটির দিন
 */
export const WEEKEND_DAYS: readonly Weekday[] = [WEEKDAYS.FRIDAY, WEEKDAYS.SATURDAY] as const;

/**
 * কর্মদিবস
 */
export const WORKING_DAYS: readonly Weekday[] = [
  WEEKDAYS.SUNDAY,
  WEEKDAYS.MONDAY,
  WEEKDAYS.TUESDAY,
  WEEKDAYS.WEDNESDAY,
  WEEKDAYS.THURSDAY,
] as const;

/**
 * সর্বোচ্চ স্লট প্রতি বুকিং সংখ্যা
 */
export const MAX_BOOKINGS_PER_SLOT = 10;

/**
 * ডেলিভারি স্লটের সর্বোচ্চ সময় (মিনিটে)
 */
export const MAX_SLOT_DURATION_MINUTES = 240; // 4 ঘন্টা

/**
 * ডেলিভারি স্লটের ন্যূনতম সময় (মিনিটে)
 */
export const MIN_SLOT_DURATION_MINUTES = 60; // 1 ঘন্টা

/**
 * ডেলিভারি স্লটের মধ্যে বিরতি (মিনিটে)
 */
export const SLOT_BREAK_MINUTES = 30;

/**
 * অগ্রিম বুকিং সময় (ঘন্টায়)
 */
export const ADVANCE_BOOKING_HOURS = 24;

/**
 * সর্বোচ্চ অগ্রিম বুকিং দিন
 */
export const MAX_ADVANCE_BOOKING_DAYS = 7;

/**
 * ডেলিভারি স্লট কনফিগারেশন
 */
export const DELIVERY_TIME_SLOT_CONFIG = {
  SLOTS: DELIVERY_TIME_SLOTS,
  SLOT_TIMES: DELIVERY_TIME_SLOT_TIMES,
  DESCRIPTIONS: DELIVERY_TIME_SLOT_DESCRIPTIONS,
  COLORS: DELIVERY_TIME_SLOT_COLORS,
  ICONS: DELIVERY_TIME_SLOT_ICONS,
  PRIORITY: DELIVERY_TIME_SLOT_PRIORITY,
  WEEKDAYS,
  WEEKDAY_DESCRIPTIONS,
  WEEKDAY_SHORT_NAMES,
  WEEKEND_DAYS,
  WORKING_DAYS,
  MAX_BOOKINGS_PER_SLOT,
  MAX_SLOT_DURATION_MINUTES,
  MIN_SLOT_DURATION_MINUTES,
  SLOT_BREAK_MINUTES,
  ADVANCE_BOOKING_HOURS,
  MAX_ADVANCE_BOOKING_DAYS,
} as const;

/**
 * ডেলিভারি স্লট কনফিগারেশন টাইপ
 */
export type DeliveryTimeSlotConfig = typeof DELIVERY_TIME_SLOT_CONFIG;

/**
 * চেক করে যে দিনটি সাপ্তাহিক ছুটির দিন কিনা
 */
export function isWeekend(day: Weekday): boolean {
  return (WEEKEND_DAYS as readonly Weekday[]).includes(day);
}

/**
 * চেক করে যে দিনটি কর্মদিবস কিনা
 */
export function isWorkingDay(day: Weekday): boolean {
  return (WORKING_DAYS as readonly Weekday[]).includes(day);
}

/**
 * ডেলিভারি স্লটের সময় পাওয়া
 */
export function getSlotTime(slot: DeliveryTimeSlot): { start: string; end: string } {
  return DELIVERY_TIME_SLOT_TIMES[slot];
}

/**
 * ডেলিভারি স্লটের বিবরণ পাওয়া
 */
export function getSlotDescription(slot: DeliveryTimeSlot): string {
  return DELIVERY_TIME_SLOT_DESCRIPTIONS[slot];
}

/**
 * ডেলিভারি স্লটের অগ্রাধিকার পাওয়া
 */
export function getSlotPriority(slot: DeliveryTimeSlot): number {
  return DELIVERY_TIME_SLOT_PRIORITY[slot];
}

/**
 * ডেলিভারি স্লটের সময়কাল (মিনিটে)
 */
export function getSlotDurationMinutes(slot: DeliveryTimeSlot): number {
  const times = DELIVERY_TIME_SLOT_TIMES[slot];
  const start = times.start.split(':').map(Number);
  const end = times.end.split(':').map(Number);
  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];
  return endMinutes - startMinutes;
}

/**
 * সপ্তাহের দিনের বিবরণ পাওয়া
 */
export function getWeekdayDescription(day: Weekday): string {
  return WEEKDAY_DESCRIPTIONS[day];
}

/**
 * সপ্তাহের দিনের সংক্ষিপ্ত নাম পাওয়া
 */
export function getWeekdayShortName(day: Weekday): string {
  return WEEKDAY_SHORT_NAMES[day];
}

/**
 * বর্তমান দিনটি সাপ্তাহিক ছুটির দিন কিনা চেক করে
 */
export function isTodayWeekend(): boolean {
  const today = new Date().getDay();
  // রবিবার = 0, সোমবার = 1, ... শনিবার = 6
  // আমাদের WEEKDAYS: sunday=0, monday=1, ..., saturday=6
  const weekdays = Object.values(WEEKDAYS);
  const todayName = weekdays[today];
  return isWeekend(todayName as Weekday);
}

/**
 * বর্তমান সময়ের জন্য উপযুক্ত স্লট পাওয়া
 */
export function getCurrentTimeSlot(): DeliveryTimeSlot | null {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  for (const slot of Object.values(DELIVERY_TIME_SLOTS)) {
    const times = DELIVERY_TIME_SLOT_TIMES[slot as DeliveryTimeSlot];
    const start = times.start.split(':').map(Number);
    const end = times.end.split(':').map(Number);
    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return slot as DeliveryTimeSlot;
    }
  }

  return null;
}

/**
 * উপলব্ধ ডেলিভারি স্লট পাওয়া
 */
export function getAvailableTimeSlots(date: Date): DeliveryTimeSlot[] {
  const dayOfWeek = date.getDay();
  const weekdays = Object.values(WEEKDAYS);
  const dayName = weekdays[dayOfWeek] as Weekday;

  // সাপ্তাহিক ছুটির দিনে শুধু সকাল ও বিকালের স্লট উপলব্ধ
  if (isWeekend(dayName)) {
    return [DELIVERY_TIME_SLOTS.MORNING, DELIVERY_TIME_SLOTS.AFTERNOON];
  }

  // কর্মদিবসে সব স্লট উপলব্ধ
  return Object.values(DELIVERY_TIME_SLOTS);
}
