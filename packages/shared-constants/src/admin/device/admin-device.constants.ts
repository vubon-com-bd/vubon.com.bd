/**
 * Admin Device Constants
 * Admin device management and configuration definitions
 */

export const ADMIN_DEVICE = {
  // Device types
  TYPES: {
    DESKTOP: 'desktop',
    LAPTOP: 'laptop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    WEARABLE: 'wearable',
    SERVER: 'server',
    VIRTUAL: 'virtual',
    OTHER: 'other',
  },

  // Device statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BLOCKED: 'blocked',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    REGISTERED: 'registered',
    UNREGISTERED: 'unregistered',
    COMPROMISED: 'compromised',
    LOST: 'lost',
    STOLEN: 'stolen',
    RETIRED: 'retired',
    DECOMMISSIONED: 'decommissioned',
  },

  // Device platforms
  PLATFORMS: {
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    IOS: 'ios',
    ANDROID: 'android',
    CHROME_OS: 'chrome_os',
    FIRE_OS: 'fire_os',
    WATCH_OS: 'watch_os',
    TV_OS: 'tv_os',
    UNKNOWN: 'unknown',
  },

  // Device trust levels
  TRUST_LEVELS: {
    UNKNOWN: 'unknown',
    UNTRUSTED: 'untrusted',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERIFIED: 'verified',
    TRUSTED: 'trusted',
  },

  // Device verification methods
  VERIFICATION_METHODS: {
    EMAIL: 'email',
    SMS: 'sms',
    QR_CODE: 'qr_code',
    CERTIFICATE: 'certificate',
    TOKEN: 'token',
    BIO_METRIC: 'bio_metric',
    TWO_FA: 'two_fa',
    DEVICE_FINGERPRINT: 'device_fingerprint',
  },

  // Device features
  FEATURES: {
    TOUCH: 'touch',
    KEYBOARD: 'keyboard',
    MOUSE: 'mouse',
    CAMERA: 'camera',
    MICROPHONE: 'microphone',
    GPS: 'gps',
    BIOMETRIC: 'biometric',
    NFC: 'nfc',
    BLUETOOTH: 'bluetooth',
    WIFI: 'wifi',
    CELLULAR: 'cellular',
    ETHERNET: 'ethernet',
  },

  // Device limits
  LIMITS: {
    MAX_PER_USER: 5,
    MAX_ACTIVE: 3,
    MAX_PENDING: 2,
    MAX_REGISTERED: 10,
  },

  // Device validation
  VALIDATION: {
    USER_AGENT: true,
    DEVICE_ID: true,
    FINGERPRINT: true,
    LOCATION: true,
    IP_ADDRESS: true,
  },
} as const;

export type AdminDeviceType = (typeof ADMIN_DEVICE.TYPES)[keyof typeof ADMIN_DEVICE.TYPES];
export type AdminDeviceStatus = (typeof ADMIN_DEVICE.STATUSES)[keyof typeof ADMIN_DEVICE.STATUSES];
export type AdminDevicePlatform =
  (typeof ADMIN_DEVICE.PLATFORMS)[keyof typeof ADMIN_DEVICE.PLATFORMS];
export type AdminDeviceTrustLevel =
  (typeof ADMIN_DEVICE.TRUST_LEVELS)[keyof typeof ADMIN_DEVICE.TRUST_LEVELS];
export type AdminDeviceVerificationMethod =
  (typeof ADMIN_DEVICE.VERIFICATION_METHODS)[keyof typeof ADMIN_DEVICE.VERIFICATION_METHODS];
export type AdminDeviceFeature = (typeof ADMIN_DEVICE.FEATURES)[keyof typeof ADMIN_DEVICE.FEATURES];

export const ADMIN_DEVICE_TYPE_LABELS: Record<AdminDeviceType, string> = {
  [ADMIN_DEVICE.TYPES.DESKTOP]: 'Desktop Computer',
  [ADMIN_DEVICE.TYPES.LAPTOP]: 'Laptop',
  [ADMIN_DEVICE.TYPES.TABLET]: 'Tablet',
  [ADMIN_DEVICE.TYPES.MOBILE]: 'Mobile Phone',
  [ADMIN_DEVICE.TYPES.WEARABLE]: 'Wearable Device',
  [ADMIN_DEVICE.TYPES.SERVER]: 'Server',
  [ADMIN_DEVICE.TYPES.VIRTUAL]: 'Virtual Device',
  [ADMIN_DEVICE.TYPES.OTHER]: 'Other Device',
};

export const ADMIN_DEVICE_TYPE_ICONS: Record<AdminDeviceType, string> = {
  [ADMIN_DEVICE.TYPES.DESKTOP]: '🖥️',
  [ADMIN_DEVICE.TYPES.LAPTOP]: '💻',
  [ADMIN_DEVICE.TYPES.TABLET]: '📱',
  [ADMIN_DEVICE.TYPES.MOBILE]: '📱',
  [ADMIN_DEVICE.TYPES.WEARABLE]: '⌚',
  [ADMIN_DEVICE.TYPES.SERVER]: '🖥️',
  [ADMIN_DEVICE.TYPES.VIRTUAL]: '🖥️',
  [ADMIN_DEVICE.TYPES.OTHER]: '❓',
};

export const ADMIN_DEVICE_STATUS_LABELS: Record<AdminDeviceStatus, string> = {
  [ADMIN_DEVICE.STATUSES.ACTIVE]: 'Active',
  [ADMIN_DEVICE.STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_DEVICE.STATUSES.SUSPENDED]: 'Suspended',
  [ADMIN_DEVICE.STATUSES.BLOCKED]: 'Blocked',
  [ADMIN_DEVICE.STATUSES.PENDING]: 'Pending',
  [ADMIN_DEVICE.STATUSES.VERIFIED]: 'Verified',
  [ADMIN_DEVICE.STATUSES.UNVERIFIED]: 'Unverified',
  [ADMIN_DEVICE.STATUSES.REGISTERED]: 'Registered',
  [ADMIN_DEVICE.STATUSES.UNREGISTERED]: 'Unregistered',
  [ADMIN_DEVICE.STATUSES.COMPROMISED]: 'Compromised',
  [ADMIN_DEVICE.STATUSES.LOST]: 'Lost',
  [ADMIN_DEVICE.STATUSES.STOLEN]: 'Stolen',
  [ADMIN_DEVICE.STATUSES.RETIRED]: 'Retired',
  [ADMIN_DEVICE.STATUSES.DECOMMISSIONED]: 'Decommissioned',
};

export const ADMIN_DEVICE_STATUS_COLORS: Record<AdminDeviceStatus, string> = {
  [ADMIN_DEVICE.STATUSES.ACTIVE]: '#10B981',
  [ADMIN_DEVICE.STATUSES.INACTIVE]: '#6B7280',
  [ADMIN_DEVICE.STATUSES.SUSPENDED]: '#F97316',
  [ADMIN_DEVICE.STATUSES.BLOCKED]: '#EF4444',
  [ADMIN_DEVICE.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_DEVICE.STATUSES.VERIFIED]: '#34D399',
  [ADMIN_DEVICE.STATUSES.UNVERIFIED]: '#F59E0B',
  [ADMIN_DEVICE.STATUSES.REGISTERED]: '#3B82F6',
  [ADMIN_DEVICE.STATUSES.UNREGISTERED]: '#9CA3AF',
  [ADMIN_DEVICE.STATUSES.COMPROMISED]: '#DC2626',
  [ADMIN_DEVICE.STATUSES.LOST]: '#F97316',
  [ADMIN_DEVICE.STATUSES.STOLEN]: '#EF4444',
  [ADMIN_DEVICE.STATUSES.RETIRED]: '#6B7280',
  [ADMIN_DEVICE.STATUSES.DECOMMISSIONED]: '#6B7280',
};

export const ADMIN_DEVICE_PLATFORM_LABELS: Record<AdminDevicePlatform, string> = {
  [ADMIN_DEVICE.PLATFORMS.WINDOWS]: 'Windows',
  [ADMIN_DEVICE.PLATFORMS.MACOS]: 'macOS',
  [ADMIN_DEVICE.PLATFORMS.LINUX]: 'Linux',
  [ADMIN_DEVICE.PLATFORMS.IOS]: 'iOS',
  [ADMIN_DEVICE.PLATFORMS.ANDROID]: 'Android',
  [ADMIN_DEVICE.PLATFORMS.CHROME_OS]: 'Chrome OS',
  [ADMIN_DEVICE.PLATFORMS.FIRE_OS]: 'Fire OS',
  [ADMIN_DEVICE.PLATFORMS.WATCH_OS]: 'watchOS',
  [ADMIN_DEVICE.PLATFORMS.TV_OS]: 'tvOS',
  [ADMIN_DEVICE.PLATFORMS.UNKNOWN]: 'Unknown Platform',
};

export const ADMIN_DEVICE_TRUST_LEVEL_LABELS: Record<AdminDeviceTrustLevel, string> = {
  [ADMIN_DEVICE.TRUST_LEVELS.UNKNOWN]: 'Unknown Trust',
  [ADMIN_DEVICE.TRUST_LEVELS.UNTRUSTED]: 'Untrusted',
  [ADMIN_DEVICE.TRUST_LEVELS.LOW]: 'Low Trust',
  [ADMIN_DEVICE.TRUST_LEVELS.MEDIUM]: 'Medium Trust',
  [ADMIN_DEVICE.TRUST_LEVELS.HIGH]: 'High Trust',
  [ADMIN_DEVICE.TRUST_LEVELS.VERIFIED]: 'Verified',
  [ADMIN_DEVICE.TRUST_LEVELS.TRUSTED]: 'Trusted',
};

export const ADMIN_DEVICE_TRUST_LEVEL_PRIORITY: Record<AdminDeviceTrustLevel, number> = {
  [ADMIN_DEVICE.TRUST_LEVELS.UNKNOWN]: 0,
  [ADMIN_DEVICE.TRUST_LEVELS.UNTRUSTED]: 1,
  [ADMIN_DEVICE.TRUST_LEVELS.LOW]: 2,
  [ADMIN_DEVICE.TRUST_LEVELS.MEDIUM]: 3,
  [ADMIN_DEVICE.TRUST_LEVELS.HIGH]: 4,
  [ADMIN_DEVICE.TRUST_LEVELS.VERIFIED]: 5,
  [ADMIN_DEVICE.TRUST_LEVELS.TRUSTED]: 6,
};

export function getAdminDeviceTypeLabel(type: AdminDeviceType): string {
  return ADMIN_DEVICE_TYPE_LABELS[type] || 'Unknown Device Type';
}

export function getAdminDeviceTypeIcon(type: AdminDeviceType): string {
  return ADMIN_DEVICE_TYPE_ICONS[type] || '❓';
}

export function getAdminDeviceStatusLabel(status: AdminDeviceStatus): string {
  return ADMIN_DEVICE_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminDeviceStatusColor(status: AdminDeviceStatus): string {
  return ADMIN_DEVICE_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminDevicePlatformLabel(platform: AdminDevicePlatform): string {
  return ADMIN_DEVICE_PLATFORM_LABELS[platform] || 'Unknown Platform';
}

export function getAdminDeviceTrustLevelLabel(level: AdminDeviceTrustLevel): string {
  return ADMIN_DEVICE_TRUST_LEVEL_LABELS[level] || 'Unknown Trust Level';
}

export function getAdminDeviceTrustLevelPriority(level: AdminDeviceTrustLevel): number {
  return ADMIN_DEVICE_TRUST_LEVEL_PRIORITY[level] || 0;
}

export function isAdminDeviceActive(status: AdminDeviceStatus): boolean {
  return (
    status === ADMIN_DEVICE.STATUSES.ACTIVE ||
    status === ADMIN_DEVICE.STATUSES.VERIFIED ||
    status === ADMIN_DEVICE.STATUSES.REGISTERED
  );
}

export function isAdminDeviceInactive(status: AdminDeviceStatus): boolean {
  return (
    status === ADMIN_DEVICE.STATUSES.INACTIVE ||
    status === ADMIN_DEVICE.STATUSES.UNREGISTERED ||
    status === ADMIN_DEVICE.STATUSES.RETIRED ||
    status === ADMIN_DEVICE.STATUSES.DECOMMISSIONED
  );
}

export function isAdminDeviceBlocked(status: AdminDeviceStatus): boolean {
  return (
    status === ADMIN_DEVICE.STATUSES.BLOCKED ||
    status === ADMIN_DEVICE.STATUSES.SUSPENDED ||
    status === ADMIN_DEVICE.STATUSES.COMPROMISED
  );
}

export function isAdminDeviceLostOrStolen(status: AdminDeviceStatus): boolean {
  return status === ADMIN_DEVICE.STATUSES.LOST || status === ADMIN_DEVICE.STATUSES.STOLEN;
}

export function isAdminDeviceVerifiable(status: AdminDeviceStatus): boolean {
  return (
    status === ADMIN_DEVICE.STATUSES.PENDING ||
    status === ADMIN_DEVICE.STATUSES.UNVERIFIED ||
    status === ADMIN_DEVICE.STATUSES.UNREGISTERED
  );
}

export function isAdminTrustedDevice(level: AdminDeviceTrustLevel): boolean {
  return (
    level === ADMIN_DEVICE.TRUST_LEVELS.TRUSTED ||
    level === ADMIN_DEVICE.TRUST_LEVELS.VERIFIED ||
    level === ADMIN_DEVICE.TRUST_LEVELS.HIGH
  );
}

export function isAdminMobileDevice(type: AdminDeviceType): boolean {
  return (
    type === ADMIN_DEVICE.TYPES.MOBILE ||
    type === ADMIN_DEVICE.TYPES.TABLET ||
    type === ADMIN_DEVICE.TYPES.WEARABLE
  );
}

export function isAdminDesktopDevice(type: AdminDeviceType): boolean {
  return type === ADMIN_DEVICE.TYPES.DESKTOP || type === ADMIN_DEVICE.TYPES.LAPTOP;
}

export function getAdminDeviceTypeFromPlatform(platform: AdminDevicePlatform): AdminDeviceType {
  const platformMap: Record<AdminDevicePlatform, AdminDeviceType> = {
    [ADMIN_DEVICE.PLATFORMS.WINDOWS]: ADMIN_DEVICE.TYPES.DESKTOP,
    [ADMIN_DEVICE.PLATFORMS.MACOS]: ADMIN_DEVICE.TYPES.DESKTOP,
    [ADMIN_DEVICE.PLATFORMS.LINUX]: ADMIN_DEVICE.TYPES.DESKTOP,
    [ADMIN_DEVICE.PLATFORMS.IOS]: ADMIN_DEVICE.TYPES.MOBILE,
    [ADMIN_DEVICE.PLATFORMS.ANDROID]: ADMIN_DEVICE.TYPES.MOBILE,
    [ADMIN_DEVICE.PLATFORMS.CHROME_OS]: ADMIN_DEVICE.TYPES.LAPTOP,
    [ADMIN_DEVICE.PLATFORMS.FIRE_OS]: ADMIN_DEVICE.TYPES.TABLET,
    [ADMIN_DEVICE.PLATFORMS.WATCH_OS]: ADMIN_DEVICE.TYPES.WEARABLE,
    [ADMIN_DEVICE.PLATFORMS.TV_OS]: ADMIN_DEVICE.TYPES.OTHER,
    [ADMIN_DEVICE.PLATFORMS.UNKNOWN]: ADMIN_DEVICE.TYPES.OTHER,
  };
  return platformMap[platform] || ADMIN_DEVICE.TYPES.OTHER;
}
