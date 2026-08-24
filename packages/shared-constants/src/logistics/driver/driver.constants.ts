/**
 * Driver Constants
 * Configuration for drivers - Bangladesh based
 */

export const LOGISTICS_DRIVER = {
  // Driver Types
  TYPES: {
    PERMANENT: 'permanent',
    CONTRACTUAL: 'contractual',
    PART_TIME: 'part_time',
    TRAINEE: 'trainee',
  } as const,

  // Driver Statuses
  STATUS: {
    AVAILABLE: 'available',
    ACTIVE: 'active',
    ON_DUTY: 'on_duty',
    OFF_DUTY: 'off_duty',
    ON_BREAK: 'on_break',
    ON_LEAVE: 'on_leave',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
  } as const,

  // License Types (Bangladesh)
  LICENSE_TYPES: {
    PROFESSIONAL: 'professional',
    LIGHT: 'light',
    HEAVY: 'heavy',
    MOTORCYCLE: 'motorcycle',
    BOTH: 'both',
  } as const,

  // License Classes (Bangladesh)
  LICENSE_CLASSES: {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    G: 'G',
    H: 'H',
  } as const,

  // Driver Experience Levels
  EXPERIENCE_LEVELS: {
    FRESH: 'fresh',
    JUNIOR: 'junior',
    SENIOR: 'senior',
    EXPERT: 'expert',
    MASTER: 'master',
  } as const,

  // Driver Ratings
  RATINGS: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 3,
  } as const,

  // Driver Limits
  LIMITS: {
    MAX_HOURS_PER_DAY: 8,
    MAX_HOURS_PER_WEEK: 48,
    MAX_CONSECUTIVE_DAYS: 6,
    MIN_REST_HOURS: 8,
    MAX_DISTANCE_PER_DAY: 300, // km
    MAX_TRIPS_PER_DAY: 5,
  } as const,

  // Document Types (Bangladesh)
  DOCUMENT_TYPES: {
    DRIVING_LICENSE: 'driving_license',
    NID: 'nid',
    PASSPORT: 'passport',
    BIRTH_CERTIFICATE: 'birth_certificate',
    TRADE_LICENSE: 'trade_license',
    FITNESS_CERTIFICATE: 'fitness_certificate',
    POLICE_CLEARANCE: 'police_clearance',
    MEDICAL_CERTIFICATE: 'medical_certificate',
    TRAINING_CERTIFICATE: 'training_certificate',
  } as const,
} as const;

// Driver Types
export type LogisticsDriverType =
  (typeof LOGISTICS_DRIVER.TYPES)[keyof typeof LOGISTICS_DRIVER.TYPES];

// Driver Statuses
export type LogisticsDriverStatus =
  (typeof LOGISTICS_DRIVER.STATUS)[keyof typeof LOGISTICS_DRIVER.STATUS];

// License Types
export type LogisticsDriverLicenseType =
  (typeof LOGISTICS_DRIVER.LICENSE_TYPES)[keyof typeof LOGISTICS_DRIVER.LICENSE_TYPES];

// License Classes
export type LogisticsDriverLicenseClass =
  (typeof LOGISTICS_DRIVER.LICENSE_CLASSES)[keyof typeof LOGISTICS_DRIVER.LICENSE_CLASSES];

// Experience Levels
export type LogisticsDriverExperienceLevel =
  (typeof LOGISTICS_DRIVER.EXPERIENCE_LEVELS)[keyof typeof LOGISTICS_DRIVER.EXPERIENCE_LEVELS];

// Document Types
export type LogisticsDriverDocumentType =
  (typeof LOGISTICS_DRIVER.DOCUMENT_TYPES)[keyof typeof LOGISTICS_DRIVER.DOCUMENT_TYPES];

// Utility Functions
export function logisticsDriverGetTypeLabel(type: LogisticsDriverType): string {
  const labels: Record<LogisticsDriverType, string> = {
    [LOGISTICS_DRIVER.TYPES.PERMANENT]: 'Permanent',
    [LOGISTICS_DRIVER.TYPES.CONTRACTUAL]: 'Contractual',
    [LOGISTICS_DRIVER.TYPES.PART_TIME]: 'Part Time',
    [LOGISTICS_DRIVER.TYPES.TRAINEE]: 'Trainee',
  };
  return labels[type] || 'Unknown';
}

export function logisticsDriverGetStatusLabel(status: LogisticsDriverStatus): string {
  const labels: Record<LogisticsDriverStatus, string> = {
    [LOGISTICS_DRIVER.STATUS.AVAILABLE]: 'Available',
    [LOGISTICS_DRIVER.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_DRIVER.STATUS.ON_DUTY]: 'On Duty',
    [LOGISTICS_DRIVER.STATUS.OFF_DUTY]: 'Off Duty',
    [LOGISTICS_DRIVER.STATUS.ON_BREAK]: 'On Break',
    [LOGISTICS_DRIVER.STATUS.ON_LEAVE]: 'On Leave',
    [LOGISTICS_DRIVER.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_DRIVER.STATUS.SUSPENDED]: 'Suspended',
    [LOGISTICS_DRIVER.STATUS.TERMINATED]: 'Terminated',
  };
  return labels[status] || 'Unknown';
}

export function logisticsDriverGetLicenseTypeLabel(
  licenseType: LogisticsDriverLicenseType
): string {
  const labels: Record<LogisticsDriverLicenseType, string> = {
    [LOGISTICS_DRIVER.LICENSE_TYPES.PROFESSIONAL]: 'Professional',
    [LOGISTICS_DRIVER.LICENSE_TYPES.LIGHT]: 'Light Vehicle',
    [LOGISTICS_DRIVER.LICENSE_TYPES.HEAVY]: 'Heavy Vehicle',
    [LOGISTICS_DRIVER.LICENSE_TYPES.MOTORCYCLE]: 'Motorcycle',
    [LOGISTICS_DRIVER.LICENSE_TYPES.BOTH]: 'Both Light & Heavy',
  };
  return labels[licenseType] || 'Unknown';
}

export function logisticsDriverGetLicenseClassLabel(
  licenseClass: LogisticsDriverLicenseClass
): string {
  const labels: Record<LogisticsDriverLicenseClass, string> = {
    [LOGISTICS_DRIVER.LICENSE_CLASSES.A]: 'Class A - Motorcycle',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.B]: 'Class B - Light Vehicle',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.C]: 'Class C - Heavy Vehicle',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.D]: 'Class D - Bus',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.E]: 'Class E - Truck',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.F]: 'Class F - Trailer',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.G]: 'Class G - Special Vehicle',
    [LOGISTICS_DRIVER.LICENSE_CLASSES.H]: 'Class H - All Vehicles',
  };
  return labels[licenseClass] || 'Unknown';
}

export function logisticsDriverGetExperienceLevelLabel(
  level: LogisticsDriverExperienceLevel
): string {
  const labels: Record<LogisticsDriverExperienceLevel, string> = {
    [LOGISTICS_DRIVER.EXPERIENCE_LEVELS.FRESH]: 'Fresh (0-1 year)',
    [LOGISTICS_DRIVER.EXPERIENCE_LEVELS.JUNIOR]: 'Junior (1-3 years)',
    [LOGISTICS_DRIVER.EXPERIENCE_LEVELS.SENIOR]: 'Senior (3-7 years)',
    [LOGISTICS_DRIVER.EXPERIENCE_LEVELS.EXPERT]: 'Expert (7-12 years)',
    [LOGISTICS_DRIVER.EXPERIENCE_LEVELS.MASTER]: 'Master (12+ years)',
  };
  return labels[level] || 'Unknown';
}

export function logisticsDriverIsAvailable(status: LogisticsDriverStatus): boolean {
  const availableStatuses: LogisticsDriverStatus[] = [
    LOGISTICS_DRIVER.STATUS.AVAILABLE,
    LOGISTICS_DRIVER.STATUS.ACTIVE,
    LOGISTICS_DRIVER.STATUS.ON_DUTY,
  ];
  return availableStatuses.includes(status);
}

export function logisticsDriverIsActive(status: LogisticsDriverStatus): boolean {
  const activeStatuses: LogisticsDriverStatus[] = [
    LOGISTICS_DRIVER.STATUS.AVAILABLE,
    LOGISTICS_DRIVER.STATUS.ACTIVE,
    LOGISTICS_DRIVER.STATUS.ON_DUTY,
    LOGISTICS_DRIVER.STATUS.ON_BREAK,
  ];
  return activeStatuses.includes(status);
}

export function logisticsDriverGetDocumentTypeLabel(docType: LogisticsDriverDocumentType): string {
  const labels: Record<LogisticsDriverDocumentType, string> = {
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.DRIVING_LICENSE]: 'Driving License',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.NID]: 'National ID (NID)',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.PASSPORT]: 'Passport',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.BIRTH_CERTIFICATE]: 'Birth Certificate',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.TRADE_LICENSE]: 'Trade License',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.FITNESS_CERTIFICATE]: 'Fitness Certificate',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.POLICE_CLEARANCE]: 'Police Clearance',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.MEDICAL_CERTIFICATE]: 'Medical Certificate',
    [LOGISTICS_DRIVER.DOCUMENT_TYPES.TRAINING_CERTIFICATE]: 'Training Certificate',
  };
  return labels[docType] || 'Unknown';
}
