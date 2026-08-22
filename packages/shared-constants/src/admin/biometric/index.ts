/**
 * Admin Biometric Constants Index
 * Export all admin biometric constants for easy importing
 */

// Admin Biometric Core Constants
export {
  ADMIN_BIOMETRIC,
  ADMIN_BIOMETRIC_TYPE_LABELS,
  ADMIN_BIOMETRIC_TYPE_ICONS,
  ADMIN_BIOMETRIC_STATUS_LABELS,
  ADMIN_BIOMETRIC_STATUS_COLORS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_PRIORITY,
  ADMIN_BIOMETRIC_ACCURACY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_VERIFICATION_METHOD_LABELS,
  ADMIN_BIOMETRIC_CONFIDENCE_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SENSOR_LABELS,
  ADMIN_BIOMETRIC_QUALITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_CAPTURE_METHOD_LABELS,
  getAdminBiometricTypeLabel,
  getAdminBiometricTypeIcon,
  getAdminBiometricStatusLabel,
  getAdminBiometricStatusColor,
  getAdminBiometricSecurityLevelLabel,
  getAdminBiometricSecurityLevelPriority,
  getAdminBiometricAccuracyLevelLabel,
  getAdminBiometricVerificationMethodLabel,
  getAdminBiometricConfidenceLevelLabel,
  getAdminBiometricSensorLabel,
  getAdminBiometricQualityLevelLabel,
  getAdminBiometricCaptureMethodLabel,
  // রিনেম করা ফাংশনগুলো এক্সপোর্ট করা হলো
  isAdminBiometricActive,
  isAdminBiometricInactive,
  isAdminBiometricLocked,
  isAdminBiometricFailed,
  getAdminBiometricTimeout,
  getAdminBiometricSecurityLevel,
  getAdminBiometricAccuracyLevel,
} from './admin-biometric.constants';

export type {
  AdminBiometricType,
  AdminBiometricStatus,
  AdminBiometricSecurityLevel,
  AdminBiometricAccuracyLevel,
  AdminBiometricVerificationMethod,
  AdminBiometricConfidenceLevel,
  AdminBiometricSensor,
  AdminBiometricQualityLevel,
  AdminBiometricCaptureMethod,
} from './admin-biometric.constants';

// Admin Biometric Type Constants
export {
  ADMIN_BIOMETRIC_TYPE,
  ADMIN_BIOMETRIC_TYPE_CATEGORIES,
  ADMIN_BIOMETRIC_TYPE_LABELS_DETAIL,
  getAdminBiometricTypeCategory,
  getAdminBiometricTypeLabel as getAdminBiometricTypeLabelDetail,
  isFingerprintType,
  isFaceType,
  isEyeType,
  isVoiceType,
  isHandType,
  isBehavioralType,
  isPhysiologicalType,
  isElectroPhysiologicalType,
  isMultimodalType,
  getBiometricTypeCategory,
} from './admin-biometric-type.constants';

export type { AdminBiometricTypeDetail } from './admin-biometric-type.constants';

// Admin Biometric Status Constants
export {
  ADMIN_BIOMETRIC_STATUS,
  ADMIN_BIOMETRIC_STATUS_LABELS_DETAIL,
  ADMIN_BIOMETRIC_STATUS_COLORS_DETAIL,
  ADMIN_BIOMETRIC_STATUS_GROUPS,
  getAdminBiometricStatusLabel as getAdminBiometricStatusLabelDetail,
  getAdminBiometricStatusColor as getAdminBiometricStatusColorDetail,
  isRegisteredStatus,
  isUnregisteredStatus,
  isVerifiedStatus,
  isUnverifiedStatus,
  isPendingStatus,
  isActiveStatus,
  isInactiveStatus,
  isSecurityStatus,
  isExpiredStatus,
  isQualityStatus,
  isErrorStatus,
  isFinalStatus,
  isUsableStatus,
  isTerminalStatus,
  getStatusPriority,
  getAdminBiometricStatuses,
  getRegisteredStatuses,
  getUnregisteredStatuses,
  getVerifiedStatuses,
  getUnverifiedStatuses,
  getPendingStatuses,
  getActiveStatuses,
  getInactiveStatuses,
  getSecurityStatuses,
  getExpiredStatuses,
  getQualityStatuses,
  getErrorStatuses,
  getFinalStatuses,
} from './admin-biometric-status.constants';

export type { AdminBiometricStatusDetail } from './admin-biometric-status.constants';
