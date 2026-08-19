/**
 * যানবাহনের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * যানবাহন স্ট্যাটাস
 */
export const VEHICLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  REPAIR: 'repair',
  ON_ROUTE: 'on_route',
  AVAILABLE: 'available',
  OUT_OF_SERVICE: 'out_of_service',
} as const;

/**
 * যানবাহন স্ট্যাটাস টাইপ
 */
export type VehicleStatus = (typeof VEHICLE_STATUS)[keyof typeof VEHICLE_STATUS];

/**
 * যানবাহন স্ট্যাটাসের বিবরণ
 */
export const VEHICLE_STATUS_DESCRIPTIONS: Record<VehicleStatus, string> = {
  [VEHICLE_STATUS.ACTIVE]: 'সক্রিয় - যানবাহন চলমান অবস্থায় আছে',
  [VEHICLE_STATUS.INACTIVE]: 'নিষ্ক্রিয় - যানবাহন বর্তমানে সক্রিয় নয়',
  [VEHICLE_STATUS.MAINTENANCE]: 'রক্ষণাবেক্ষণ - যানবাহন রক্ষণাবেক্ষণে রয়েছে',
  [VEHICLE_STATUS.REPAIR]: 'মেরামত - যানবাহন মেরামত করা হচ্ছে',
  [VEHICLE_STATUS.ON_ROUTE]: 'রুটে - যানবাহন ডেলিভারি রুটে রয়েছে',
  [VEHICLE_STATUS.AVAILABLE]: 'উপলব্ধ - যানবাহন ডেলিভারির জন্য প্রস্তুত',
  [VEHICLE_STATUS.OUT_OF_SERVICE]: 'পরিষেবার বাইরে - যানবাহন পরিষেবার বাইরে',
};

/**
 * যানবাহন স্ট্যাটাসের রং (UI এর জন্য)
 */
export const VEHICLE_STATUS_COLORS: Record<VehicleStatus, string> = {
  [VEHICLE_STATUS.ACTIVE]: '#2ECC71', // সবুজ
  [VEHICLE_STATUS.INACTIVE]: '#95A5A6', // ধূসর
  [VEHICLE_STATUS.MAINTENANCE]: '#F39C12', // কমলা
  [VEHICLE_STATUS.REPAIR]: '#E74C3C', // লাল
  [VEHICLE_STATUS.ON_ROUTE]: '#3498DB', // নীল
  [VEHICLE_STATUS.AVAILABLE]: '#27AE60', // গাঢ় সবুজ
  [VEHICLE_STATUS.OUT_OF_SERVICE]: '#7F8C8D', // গাঢ় ধূসর
};

/**
 * যানবাহন স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const VEHICLE_STATUS_ICONS: Record<VehicleStatus, string> = {
  [VEHICLE_STATUS.ACTIVE]: 'play',
  [VEHICLE_STATUS.INACTIVE]: 'pause',
  [VEHICLE_STATUS.MAINTENANCE]: 'wrench',
  [VEHICLE_STATUS.REPAIR]: 'tools',
  [VEHICLE_STATUS.ON_ROUTE]: 'truck',
  [VEHICLE_STATUS.AVAILABLE]: 'check-circle',
  [VEHICLE_STATUS.OUT_OF_SERVICE]: 'ban',
};

/**
 * অ্যাক্টিভ যানবাহন স্ট্যাটাসসমূহ
 */
export const ACTIVE_VEHICLE_STATUSES: readonly VehicleStatus[] = [
  VEHICLE_STATUS.ACTIVE,
  VEHICLE_STATUS.ON_ROUTE,
  VEHICLE_STATUS.AVAILABLE,
] as const;

/**
 * ইনঅ্যাক্টিভ যানবাহন স্ট্যাটাসসমূহ
 */
export const INACTIVE_VEHICLE_STATUSES: readonly VehicleStatus[] = [
  VEHICLE_STATUS.INACTIVE,
  VEHICLE_STATUS.MAINTENANCE,
  VEHICLE_STATUS.REPAIR,
  VEHICLE_STATUS.OUT_OF_SERVICE,
] as const;

/**
 * যানবাহন স্ট্যাটাস গ্রুপ
 */
export const VEHICLE_STATUS_GROUPS = {
  ALL: Object.values(VEHICLE_STATUS),
  ACTIVE: ACTIVE_VEHICLE_STATUSES,
  INACTIVE: INACTIVE_VEHICLE_STATUSES,
} as const;

/**
 * যানবাহন স্ট্যাটাস গ্রুপ টাইপ
 */
export type VehicleStatusGroup = typeof VEHICLE_STATUS_GROUPS;

/**
 * যানবাহন স্ট্যাটাস ট্রানজিশন
 */
export const VEHICLE_STATUS_TRANSITIONS: Record<VehicleStatus, readonly VehicleStatus[]> = {
  [VEHICLE_STATUS.AVAILABLE]: [
    VEHICLE_STATUS.ACTIVE,
    VEHICLE_STATUS.ON_ROUTE,
    VEHICLE_STATUS.MAINTENANCE,
    VEHICLE_STATUS.INACTIVE,
  ],
  [VEHICLE_STATUS.ACTIVE]: [
    VEHICLE_STATUS.ON_ROUTE,
    VEHICLE_STATUS.MAINTENANCE,
    VEHICLE_STATUS.REPAIR,
    VEHICLE_STATUS.INACTIVE,
  ],
  [VEHICLE_STATUS.ON_ROUTE]: [
    VEHICLE_STATUS.AVAILABLE,
    VEHICLE_STATUS.ACTIVE,
    VEHICLE_STATUS.MAINTENANCE,
    VEHICLE_STATUS.REPAIR,
  ],
  [VEHICLE_STATUS.MAINTENANCE]: [
    VEHICLE_STATUS.AVAILABLE,
    VEHICLE_STATUS.ACTIVE,
    VEHICLE_STATUS.REPAIR,
    VEHICLE_STATUS.OUT_OF_SERVICE,
  ],
  [VEHICLE_STATUS.REPAIR]: [
    VEHICLE_STATUS.AVAILABLE,
    VEHICLE_STATUS.ACTIVE,
    VEHICLE_STATUS.MAINTENANCE,
    VEHICLE_STATUS.OUT_OF_SERVICE,
  ],
  [VEHICLE_STATUS.INACTIVE]: [VEHICLE_STATUS.AVAILABLE, VEHICLE_STATUS.OUT_OF_SERVICE],
  [VEHICLE_STATUS.OUT_OF_SERVICE]: [
    VEHICLE_STATUS.INACTIVE,
    VEHICLE_STATUS.MAINTENANCE,
    VEHICLE_STATUS.REPAIR,
  ],
};

/**
 * যানবাহন স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type VehicleStatusTransitions = typeof VEHICLE_STATUS_TRANSITIONS;

/**
 * যানবাহন স্ট্যাটাস কনফিগারেশন
 */
export const VEHICLE_STATUS_CONFIG = {
  STATUS: VEHICLE_STATUS,
  DESCRIPTIONS: VEHICLE_STATUS_DESCRIPTIONS,
  COLORS: VEHICLE_STATUS_COLORS,
  ICONS: VEHICLE_STATUS_ICONS,
  GROUPS: VEHICLE_STATUS_GROUPS,
  TRANSITIONS: VEHICLE_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_VEHICLE_STATUSES,
  INACTIVE_STATUSES: INACTIVE_VEHICLE_STATUSES,
} as const;

/**
 * যানবাহন স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type VehicleStatusConfig = typeof VEHICLE_STATUS_CONFIG;

/**
 * চেক করে যে যানবাহন স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isVehicleStatusActive(status: VehicleStatus): boolean {
  return (ACTIVE_VEHICLE_STATUSES as readonly VehicleStatus[]).includes(status);
}

/**
 * চেক করে যে যানবাহন স্ট্যাটাস ইনঅ্যাক্টিভ কিনা
 */
export function isVehicleStatusInactive(status: VehicleStatus): boolean {
  return (INACTIVE_VEHICLE_STATUSES as readonly VehicleStatus[]).includes(status);
}

/**
 * দুটি যানবাহন স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canVehicleStatusTransition(from: VehicleStatus, to: VehicleStatus): boolean {
  const allowedTransitions = VEHICLE_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * যানবাহন স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getVehicleStatusDescription(status: VehicleStatus): string {
  return VEHICLE_STATUS_DESCRIPTIONS[status];
}

/**
 * যানবাহন স্ট্যাটাসের রং পাওয়া
 */
export function getVehicleStatusColor(status: VehicleStatus): string {
  return VEHICLE_STATUS_COLORS[status];
}

/**
 * যানবাহন স্ট্যাটাসের আইকন পাওয়া
 */
export function getVehicleStatusIcon(status: VehicleStatus): string {
  return VEHICLE_STATUS_ICONS[status];
}

/**
 * যানবাহন স্ট্যাটাস পরিষেবার জন্য প্রস্তুত কিনা
 */
export function isVehicleReadyForService(status: VehicleStatus): boolean {
  return status === VEHICLE_STATUS.AVAILABLE || status === VEHICLE_STATUS.ACTIVE;
}

/**
 * যানবাহন স্ট্যাটাস রক্ষণাবেক্ষণের প্রয়োজন কিনা
 */
export function isVehicleMaintenanceRequired(status: VehicleStatus): boolean {
  return (
    status === VEHICLE_STATUS.MAINTENANCE ||
    status === VEHICLE_STATUS.REPAIR ||
    status === VEHICLE_STATUS.OUT_OF_SERVICE
  );
}
