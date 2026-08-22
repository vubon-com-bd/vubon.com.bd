/**
 * Admin Biometric Constants
 * Admin biometric authentication and verification definitions
 */

export const ADMIN_BIOMETRIC = {
  // Biometric types
  TYPES: {
    FINGERPRINT: 'fingerprint',
    FACE: 'face',
    IRIS: 'iris',
    RETINA: 'retina',
    VOICE: 'voice',
    PALM: 'palm',
    HAND_GEOMETRY: 'hand_geometry',
    FINGER_VEIN: 'finger_vein',
    PALM_VEIN: 'palm_vein',
    DNA: 'dna',
    KEYSTROKE: 'keystroke',
    GAIT: 'gait',
    EAR: 'ear',
    ODOR: 'odor',
    THERMOGRAM: 'thermogram',
  },

  // Biometric statuses
  STATUSES: {
    REGISTERED: 'registered',
    VERIFIED: 'verified',
    PENDING: 'pending',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    SUSPENDED: 'suspended',
    FAILED: 'failed',
    LOCKED: 'locked',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    UPDATED: 'updated',
  },

  // Biometric security levels
  SECURITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    MAXIMUM: 'maximum',
  },

  // Biometric accuracy levels
  ACCURACY_LEVELS: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ENHANCED: 'enhanced',
    HIGH: 'high',
    PRECISION: 'precision',
  },

  // Biometric verification methods
  VERIFICATION_METHODS: {
    ONE_TO_ONE: 'one_to_one',
    ONE_TO_MANY: 'one_to_many',
    CONTINUOUS: 'continuous',
    PASSIVE: 'passive',
    ACTIVE: 'active',
    MULTI_FACTOR: 'multi_factor',
  },

  // Biometric confidence levels
  CONFIDENCE_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    MAXIMUM: 'maximum',
  },

  // Biometric timeouts (in seconds)
  TIMEOUTS: {
    FINGERPRINT: 30,
    FACE: 10,
    IRIS: 15,
    RETINA: 20,
    VOICE: 45,
    PALM: 30,
    HAND_GEOMETRY: 30,
    FINGER_VEIN: 25,
    PALM_VEIN: 25,
    DNA: 300,
    KEYSTROKE: 60,
    GAIT: 120,
    EAR: 30,
    ODOR: 60,
    THERMOGRAM: 15,
  },

  // Biometric limits
  LIMITS: {
    MAX_ATTEMPTS: 3,
    MAX_REGISTRATIONS: 5,
    MAX_PER_USER: 3,
    MAX_FAILED_ATTEMPTS: 5,
    LOCKOUT_DURATION: 900, // 15 minutes
    SESSION_TIMEOUT: 300, // 5 minutes
  },

  // Biometric sensors
  SENSORS: {
    OPTICAL: 'optical',
    CAPACITIVE: 'capacitive',
    ULTRASONIC: 'ultrasonic',
    THERMAL: 'thermal',
    PRESSURE: 'pressure',
    ELECTROCARDIOGRAM: 'electrocardiogram',
    ELECTROENCEPHALOGRAM: 'electroencephalogram',
    PHOTOPLETHYSMOGRAPH: 'photoplethysmograph',
  },

  // Biometric quality levels
  QUALITY_LEVELS: {
    POOR: 'poor',
    FAIR: 'fair',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    PERFECT: 'perfect',
  },

  // Biometric capture methods
  CAPTURE_METHODS: {
    SCAN: 'scan',
    SENSOR: 'sensor',
    CAMERA: 'camera',
    MICROPHONE: 'microphone',
    TOUCH: 'touch',
    SWIPE: 'swipe',
    PRESS: 'press',
    HOLD: 'hold',
  },
} as const;

export type AdminBiometricType = (typeof ADMIN_BIOMETRIC.TYPES)[keyof typeof ADMIN_BIOMETRIC.TYPES];
export type AdminBiometricStatus =
  (typeof ADMIN_BIOMETRIC.STATUSES)[keyof typeof ADMIN_BIOMETRIC.STATUSES];
export type AdminBiometricSecurityLevel =
  (typeof ADMIN_BIOMETRIC.SECURITY_LEVELS)[keyof typeof ADMIN_BIOMETRIC.SECURITY_LEVELS];
export type AdminBiometricAccuracyLevel =
  (typeof ADMIN_BIOMETRIC.ACCURACY_LEVELS)[keyof typeof ADMIN_BIOMETRIC.ACCURACY_LEVELS];
export type AdminBiometricVerificationMethod =
  (typeof ADMIN_BIOMETRIC.VERIFICATION_METHODS)[keyof typeof ADMIN_BIOMETRIC.VERIFICATION_METHODS];
export type AdminBiometricConfidenceLevel =
  (typeof ADMIN_BIOMETRIC.CONFIDENCE_LEVELS)[keyof typeof ADMIN_BIOMETRIC.CONFIDENCE_LEVELS];
export type AdminBiometricSensor =
  (typeof ADMIN_BIOMETRIC.SENSORS)[keyof typeof ADMIN_BIOMETRIC.SENSORS];
export type AdminBiometricQualityLevel =
  (typeof ADMIN_BIOMETRIC.QUALITY_LEVELS)[keyof typeof ADMIN_BIOMETRIC.QUALITY_LEVELS];
export type AdminBiometricCaptureMethod =
  (typeof ADMIN_BIOMETRIC.CAPTURE_METHODS)[keyof typeof ADMIN_BIOMETRIC.CAPTURE_METHODS];

// ... (লেবেল অবজেক্টগুলো আগের মতোই থাকবে, শুধু ফাংশনের নাম পরিবর্তন করা হবে)

export const ADMIN_BIOMETRIC_TYPE_LABELS: Record<AdminBiometricType, string> = {
  [ADMIN_BIOMETRIC.TYPES.FINGERPRINT]: 'Fingerprint',
  [ADMIN_BIOMETRIC.TYPES.FACE]: 'Face Recognition',
  [ADMIN_BIOMETRIC.TYPES.IRIS]: 'Iris Scan',
  [ADMIN_BIOMETRIC.TYPES.RETINA]: 'Retina Scan',
  [ADMIN_BIOMETRIC.TYPES.VOICE]: 'Voice Recognition',
  [ADMIN_BIOMETRIC.TYPES.PALM]: 'Palm Scan',
  [ADMIN_BIOMETRIC.TYPES.HAND_GEOMETRY]: 'Hand Geometry',
  [ADMIN_BIOMETRIC.TYPES.FINGER_VEIN]: 'Finger Vein',
  [ADMIN_BIOMETRIC.TYPES.PALM_VEIN]: 'Palm Vein',
  [ADMIN_BIOMETRIC.TYPES.DNA]: 'DNA',
  [ADMIN_BIOMETRIC.TYPES.KEYSTROKE]: 'Keystroke Dynamics',
  [ADMIN_BIOMETRIC.TYPES.GAIT]: 'Gait Analysis',
  [ADMIN_BIOMETRIC.TYPES.EAR]: 'Ear Recognition',
  [ADMIN_BIOMETRIC.TYPES.ODOR]: 'Odor Recognition',
  [ADMIN_BIOMETRIC.TYPES.THERMOGRAM]: 'Thermogram',
};

export const ADMIN_BIOMETRIC_TYPE_ICONS: Record<AdminBiometricType, string> = {
  [ADMIN_BIOMETRIC.TYPES.FINGERPRINT]: '🖐️',
  [ADMIN_BIOMETRIC.TYPES.FACE]: '👤',
  [ADMIN_BIOMETRIC.TYPES.IRIS]: '👁️',
  [ADMIN_BIOMETRIC.TYPES.RETINA]: '👁️',
  [ADMIN_BIOMETRIC.TYPES.VOICE]: '🎤',
  [ADMIN_BIOMETRIC.TYPES.PALM]: '🤲',
  [ADMIN_BIOMETRIC.TYPES.HAND_GEOMETRY]: '✋',
  [ADMIN_BIOMETRIC.TYPES.FINGER_VEIN]: '🩸',
  [ADMIN_BIOMETRIC.TYPES.PALM_VEIN]: '🩸',
  [ADMIN_BIOMETRIC.TYPES.DNA]: '🧬',
  [ADMIN_BIOMETRIC.TYPES.KEYSTROKE]: '⌨️',
  [ADMIN_BIOMETRIC.TYPES.GAIT]: '🚶',
  [ADMIN_BIOMETRIC.TYPES.EAR]: '👂',
  [ADMIN_BIOMETRIC.TYPES.ODOR]: '👃',
  [ADMIN_BIOMETRIC.TYPES.THERMOGRAM]: '🌡️',
};

export const ADMIN_BIOMETRIC_STATUS_LABELS: Record<AdminBiometricStatus, string> = {
  [ADMIN_BIOMETRIC.STATUSES.REGISTERED]: 'Registered',
  [ADMIN_BIOMETRIC.STATUSES.VERIFIED]: 'Verified',
  [ADMIN_BIOMETRIC.STATUSES.PENDING]: 'Pending',
  [ADMIN_BIOMETRIC.STATUSES.REJECTED]: 'Rejected',
  [ADMIN_BIOMETRIC.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_BIOMETRIC.STATUSES.REVOKED]: 'Revoked',
  [ADMIN_BIOMETRIC.STATUSES.SUSPENDED]: 'Suspended',
  [ADMIN_BIOMETRIC.STATUSES.FAILED]: 'Failed',
  [ADMIN_BIOMETRIC.STATUSES.LOCKED]: 'Locked',
  [ADMIN_BIOMETRIC.STATUSES.ACTIVE]: 'Active',
  [ADMIN_BIOMETRIC.STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_BIOMETRIC.STATUSES.UPDATED]: 'Updated',
};

export const ADMIN_BIOMETRIC_STATUS_COLORS: Record<AdminBiometricStatus, string> = {
  [ADMIN_BIOMETRIC.STATUSES.REGISTERED]: '#3B82F6',
  [ADMIN_BIOMETRIC.STATUSES.VERIFIED]: '#10B981',
  [ADMIN_BIOMETRIC.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_BIOMETRIC.STATUSES.REJECTED]: '#EF4444',
  [ADMIN_BIOMETRIC.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_BIOMETRIC.STATUSES.REVOKED]: '#DC2626',
  [ADMIN_BIOMETRIC.STATUSES.SUSPENDED]: '#F97316',
  [ADMIN_BIOMETRIC.STATUSES.FAILED]: '#EF4444',
  [ADMIN_BIOMETRIC.STATUSES.LOCKED]: '#DC2626',
  [ADMIN_BIOMETRIC.STATUSES.ACTIVE]: '#10B981',
  [ADMIN_BIOMETRIC.STATUSES.INACTIVE]: '#6B7280',
  [ADMIN_BIOMETRIC.STATUSES.UPDATED]: '#8B5CF6',
};

export const ADMIN_BIOMETRIC_SECURITY_LEVEL_LABELS: Record<AdminBiometricSecurityLevel, string> = {
  [ADMIN_BIOMETRIC.SECURITY_LEVELS.LOW]: 'Low',
  [ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM]: 'Medium',
  [ADMIN_BIOMETRIC.SECURITY_LEVELS.HIGH]: 'High',
  [ADMIN_BIOMETRIC.SECURITY_LEVELS.VERY_HIGH]: 'Very High',
  [ADMIN_BIOMETRIC.SECURITY_LEVELS.MAXIMUM]: 'Maximum',
};

export const ADMIN_BIOMETRIC_SECURITY_LEVEL_PRIORITY: Record<AdminBiometricSecurityLevel, number> =
  {
    [ADMIN_BIOMETRIC.SECURITY_LEVELS.LOW]: 1,
    [ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM]: 2,
    [ADMIN_BIOMETRIC.SECURITY_LEVELS.HIGH]: 3,
    [ADMIN_BIOMETRIC.SECURITY_LEVELS.VERY_HIGH]: 4,
    [ADMIN_BIOMETRIC.SECURITY_LEVELS.MAXIMUM]: 5,
  };

export const ADMIN_BIOMETRIC_ACCURACY_LEVEL_LABELS: Record<AdminBiometricAccuracyLevel, string> = {
  [ADMIN_BIOMETRIC.ACCURACY_LEVELS.BASIC]: 'Basic',
  [ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD]: 'Standard',
  [ADMIN_BIOMETRIC.ACCURACY_LEVELS.ENHANCED]: 'Enhanced',
  [ADMIN_BIOMETRIC.ACCURACY_LEVELS.HIGH]: 'High',
  [ADMIN_BIOMETRIC.ACCURACY_LEVELS.PRECISION]: 'Precision',
};

export const ADMIN_BIOMETRIC_VERIFICATION_METHOD_LABELS: Record<
  AdminBiometricVerificationMethod,
  string
> = {
  [ADMIN_BIOMETRIC.VERIFICATION_METHODS.ONE_TO_ONE]: '1:1 Verification',
  [ADMIN_BIOMETRIC.VERIFICATION_METHODS.ONE_TO_MANY]: '1:N Identification',
  [ADMIN_BIOMETRIC.VERIFICATION_METHODS.CONTINUOUS]: 'Continuous',
  [ADMIN_BIOMETRIC.VERIFICATION_METHODS.PASSIVE]: 'Passive',
  [ADMIN_BIOMETRIC.VERIFICATION_METHODS.ACTIVE]: 'Active',
  [ADMIN_BIOMETRIC.VERIFICATION_METHODS.MULTI_FACTOR]: 'Multi-Factor',
};

export const ADMIN_BIOMETRIC_CONFIDENCE_LEVEL_LABELS: Record<
  AdminBiometricConfidenceLevel,
  string
> = {
  [ADMIN_BIOMETRIC.CONFIDENCE_LEVELS.LOW]: 'Low',
  [ADMIN_BIOMETRIC.CONFIDENCE_LEVELS.MEDIUM]: 'Medium',
  [ADMIN_BIOMETRIC.CONFIDENCE_LEVELS.HIGH]: 'High',
  [ADMIN_BIOMETRIC.CONFIDENCE_LEVELS.VERY_HIGH]: 'Very High',
  [ADMIN_BIOMETRIC.CONFIDENCE_LEVELS.MAXIMUM]: 'Maximum',
};

export const ADMIN_BIOMETRIC_SENSOR_LABELS: Record<AdminBiometricSensor, string> = {
  [ADMIN_BIOMETRIC.SENSORS.OPTICAL]: 'Optical',
  [ADMIN_BIOMETRIC.SENSORS.CAPACITIVE]: 'Capacitive',
  [ADMIN_BIOMETRIC.SENSORS.ULTRASONIC]: 'Ultrasonic',
  [ADMIN_BIOMETRIC.SENSORS.THERMAL]: 'Thermal',
  [ADMIN_BIOMETRIC.SENSORS.PRESSURE]: 'Pressure',
  [ADMIN_BIOMETRIC.SENSORS.ELECTROCARDIOGRAM]: 'ECG',
  [ADMIN_BIOMETRIC.SENSORS.ELECTROENCEPHALOGRAM]: 'EEG',
  [ADMIN_BIOMETRIC.SENSORS.PHOTOPLETHYSMOGRAPH]: 'PPG',
};

export const ADMIN_BIOMETRIC_QUALITY_LEVEL_LABELS: Record<AdminBiometricQualityLevel, string> = {
  [ADMIN_BIOMETRIC.QUALITY_LEVELS.POOR]: 'Poor',
  [ADMIN_BIOMETRIC.QUALITY_LEVELS.FAIR]: 'Fair',
  [ADMIN_BIOMETRIC.QUALITY_LEVELS.GOOD]: 'Good',
  [ADMIN_BIOMETRIC.QUALITY_LEVELS.EXCELLENT]: 'Excellent',
  [ADMIN_BIOMETRIC.QUALITY_LEVELS.PERFECT]: 'Perfect',
};

export const ADMIN_BIOMETRIC_CAPTURE_METHOD_LABELS: Record<AdminBiometricCaptureMethod, string> = {
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.SCAN]: 'Scan',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.SENSOR]: 'Sensor',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.CAMERA]: 'Camera',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.MICROPHONE]: 'Microphone',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.TOUCH]: 'Touch',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.SWIPE]: 'Swipe',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.PRESS]: 'Press',
  [ADMIN_BIOMETRIC.CAPTURE_METHODS.HOLD]: 'Hold',
};

// সব ফাংশনের নামে Admin প্রিফিক্স যোগ করা হলো
export function getAdminBiometricTypeLabel(type: AdminBiometricType): string {
  return ADMIN_BIOMETRIC_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminBiometricTypeIcon(type: AdminBiometricType): string {
  return ADMIN_BIOMETRIC_TYPE_ICONS[type] || '❓';
}

export function getAdminBiometricStatusLabel(status: AdminBiometricStatus): string {
  return ADMIN_BIOMETRIC_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminBiometricStatusColor(status: AdminBiometricStatus): string {
  return ADMIN_BIOMETRIC_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminBiometricSecurityLevelLabel(level: AdminBiometricSecurityLevel): string {
  return ADMIN_BIOMETRIC_SECURITY_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdminBiometricSecurityLevelPriority(level: AdminBiometricSecurityLevel): number {
  return ADMIN_BIOMETRIC_SECURITY_LEVEL_PRIORITY[level] || 0;
}

export function getAdminBiometricAccuracyLevelLabel(level: AdminBiometricAccuracyLevel): string {
  return ADMIN_BIOMETRIC_ACCURACY_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdminBiometricVerificationMethodLabel(
  method: AdminBiometricVerificationMethod
): string {
  return ADMIN_BIOMETRIC_VERIFICATION_METHOD_LABELS[method] || 'Unknown Method';
}

export function getAdminBiometricConfidenceLevelLabel(
  level: AdminBiometricConfidenceLevel
): string {
  return ADMIN_BIOMETRIC_CONFIDENCE_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdminBiometricSensorLabel(sensor: AdminBiometricSensor): string {
  return ADMIN_BIOMETRIC_SENSOR_LABELS[sensor] || 'Unknown Sensor';
}

export function getAdminBiometricQualityLevelLabel(level: AdminBiometricQualityLevel): string {
  return ADMIN_BIOMETRIC_QUALITY_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdminBiometricCaptureMethodLabel(method: AdminBiometricCaptureMethod): string {
  return ADMIN_BIOMETRIC_CAPTURE_METHOD_LABELS[method] || 'Unknown Method';
}

// কনফ্লিক্ট এড়াতে ফাংশনের নামে Admin প্রিফিক্স যোগ করা হলো
export function isAdminBiometricActive(status: AdminBiometricStatus): boolean {
  return (
    status === ADMIN_BIOMETRIC.STATUSES.ACTIVE ||
    status === ADMIN_BIOMETRIC.STATUSES.VERIFIED ||
    status === ADMIN_BIOMETRIC.STATUSES.REGISTERED
  );
}

export function isAdminBiometricInactive(status: AdminBiometricStatus): boolean {
  return (
    status === ADMIN_BIOMETRIC.STATUSES.INACTIVE ||
    status === ADMIN_BIOMETRIC.STATUSES.EXPIRED ||
    status === ADMIN_BIOMETRIC.STATUSES.REVOKED
  );
}

export function isAdminBiometricLocked(status: AdminBiometricStatus): boolean {
  return (
    status === ADMIN_BIOMETRIC.STATUSES.LOCKED || status === ADMIN_BIOMETRIC.STATUSES.SUSPENDED
  );
}

export function isAdminBiometricFailed(status: AdminBiometricStatus): boolean {
  return status === ADMIN_BIOMETRIC.STATUSES.FAILED || status === ADMIN_BIOMETRIC.STATUSES.REJECTED;
}

export function getAdminBiometricTimeout(type: AdminBiometricType): number {
  const timeoutMap: Record<AdminBiometricType, number> = {
    [ADMIN_BIOMETRIC.TYPES.FINGERPRINT]: ADMIN_BIOMETRIC.TIMEOUTS.FINGERPRINT,
    [ADMIN_BIOMETRIC.TYPES.FACE]: ADMIN_BIOMETRIC.TIMEOUTS.FACE,
    [ADMIN_BIOMETRIC.TYPES.IRIS]: ADMIN_BIOMETRIC.TIMEOUTS.IRIS,
    [ADMIN_BIOMETRIC.TYPES.RETINA]: ADMIN_BIOMETRIC.TIMEOUTS.RETINA,
    [ADMIN_BIOMETRIC.TYPES.VOICE]: ADMIN_BIOMETRIC.TIMEOUTS.VOICE,
    [ADMIN_BIOMETRIC.TYPES.PALM]: ADMIN_BIOMETRIC.TIMEOUTS.PALM,
    [ADMIN_BIOMETRIC.TYPES.HAND_GEOMETRY]: ADMIN_BIOMETRIC.TIMEOUTS.HAND_GEOMETRY,
    [ADMIN_BIOMETRIC.TYPES.FINGER_VEIN]: ADMIN_BIOMETRIC.TIMEOUTS.FINGER_VEIN,
    [ADMIN_BIOMETRIC.TYPES.PALM_VEIN]: ADMIN_BIOMETRIC.TIMEOUTS.PALM_VEIN,
    [ADMIN_BIOMETRIC.TYPES.DNA]: ADMIN_BIOMETRIC.TIMEOUTS.DNA,
    [ADMIN_BIOMETRIC.TYPES.KEYSTROKE]: ADMIN_BIOMETRIC.TIMEOUTS.KEYSTROKE,
    [ADMIN_BIOMETRIC.TYPES.GAIT]: ADMIN_BIOMETRIC.TIMEOUTS.GAIT,
    [ADMIN_BIOMETRIC.TYPES.EAR]: ADMIN_BIOMETRIC.TIMEOUTS.EAR,
    [ADMIN_BIOMETRIC.TYPES.ODOR]: ADMIN_BIOMETRIC.TIMEOUTS.ODOR,
    [ADMIN_BIOMETRIC.TYPES.THERMOGRAM]: ADMIN_BIOMETRIC.TIMEOUTS.THERMOGRAM,
  };
  return timeoutMap[type] || 30;
}

export function getAdminBiometricSecurityLevel(
  type: AdminBiometricType
): AdminBiometricSecurityLevel {
  const levelMap: Record<AdminBiometricType, AdminBiometricSecurityLevel> = {
    [ADMIN_BIOMETRIC.TYPES.FINGERPRINT]: ADMIN_BIOMETRIC.SECURITY_LEVELS.HIGH,
    [ADMIN_BIOMETRIC.TYPES.FACE]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM,
    [ADMIN_BIOMETRIC.TYPES.IRIS]: ADMIN_BIOMETRIC.SECURITY_LEVELS.VERY_HIGH,
    [ADMIN_BIOMETRIC.TYPES.RETINA]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MAXIMUM,
    [ADMIN_BIOMETRIC.TYPES.VOICE]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM,
    [ADMIN_BIOMETRIC.TYPES.PALM]: ADMIN_BIOMETRIC.SECURITY_LEVELS.HIGH,
    [ADMIN_BIOMETRIC.TYPES.HAND_GEOMETRY]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM,
    [ADMIN_BIOMETRIC.TYPES.FINGER_VEIN]: ADMIN_BIOMETRIC.SECURITY_LEVELS.VERY_HIGH,
    [ADMIN_BIOMETRIC.TYPES.PALM_VEIN]: ADMIN_BIOMETRIC.SECURITY_LEVELS.VERY_HIGH,
    [ADMIN_BIOMETRIC.TYPES.DNA]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MAXIMUM,
    [ADMIN_BIOMETRIC.TYPES.KEYSTROKE]: ADMIN_BIOMETRIC.SECURITY_LEVELS.LOW,
    [ADMIN_BIOMETRIC.TYPES.GAIT]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM,
    [ADMIN_BIOMETRIC.TYPES.EAR]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM,
    [ADMIN_BIOMETRIC.TYPES.ODOR]: ADMIN_BIOMETRIC.SECURITY_LEVELS.LOW,
    [ADMIN_BIOMETRIC.TYPES.THERMOGRAM]: ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM,
  };
  return levelMap[type] || ADMIN_BIOMETRIC.SECURITY_LEVELS.MEDIUM;
}

export function getAdminBiometricAccuracyLevel(
  type: AdminBiometricType
): AdminBiometricAccuracyLevel {
  const accuracyMap: Record<AdminBiometricType, AdminBiometricAccuracyLevel> = {
    [ADMIN_BIOMETRIC.TYPES.FINGERPRINT]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.HIGH,
    [ADMIN_BIOMETRIC.TYPES.FACE]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD,
    [ADMIN_BIOMETRIC.TYPES.IRIS]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.PRECISION,
    [ADMIN_BIOMETRIC.TYPES.RETINA]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.PRECISION,
    [ADMIN_BIOMETRIC.TYPES.VOICE]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD,
    [ADMIN_BIOMETRIC.TYPES.PALM]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.HIGH,
    [ADMIN_BIOMETRIC.TYPES.HAND_GEOMETRY]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD,
    [ADMIN_BIOMETRIC.TYPES.FINGER_VEIN]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.HIGH,
    [ADMIN_BIOMETRIC.TYPES.PALM_VEIN]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.HIGH,
    [ADMIN_BIOMETRIC.TYPES.DNA]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.PRECISION,
    [ADMIN_BIOMETRIC.TYPES.KEYSTROKE]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.BASIC,
    [ADMIN_BIOMETRIC.TYPES.GAIT]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD,
    [ADMIN_BIOMETRIC.TYPES.EAR]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD,
    [ADMIN_BIOMETRIC.TYPES.ODOR]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.BASIC,
    [ADMIN_BIOMETRIC.TYPES.THERMOGRAM]: ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD,
  };
  return accuracyMap[type] || ADMIN_BIOMETRIC.ACCURACY_LEVELS.STANDARD;
}
