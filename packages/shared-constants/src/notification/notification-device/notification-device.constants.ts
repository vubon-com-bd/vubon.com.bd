/**
 * Notification Device Constants
 * Core notification device configuration and settings
 */

export const NOTIFICATIONDEVICE = {
  // Device Types
  TYPES: {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    WEARABLE: 'wearable',
    SMART_TV: 'smart_tv',
    GAMING_CONSOLE: 'gaming_console',
    IOT: 'iot',
    CUSTOM: 'custom',
  } as const,

  // Device Platforms
  PLATFORMS: {
    ANDROID: 'android',
    IOS: 'ios',
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    WEB: 'web',
    TIZEN: 'tizen',
    WEBOS: 'webos',
    FIREOS: 'fireos',
    CUSTOM: 'custom',
  } as const,

  // Device Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    REGISTERED: 'registered',
    UNREGISTERED: 'unregistered',
    SUSPENDED: 'suspended',
    BLOCKED: 'blocked',
    EXPIRED: 'expired',
    PENDING: 'pending',
    REJECTED: 'rejected',
    ARCHIVED: 'archived',
  } as const,

  // Device Capabilities
  CAPABILITIES: {
    PUSH: 'push',
    SMS: 'sms',
    EMAIL: 'email',
    IN_APP: 'in_app',
    VOICE: 'voice',
    VIDEO: 'video',
    LOCATION: 'location',
    CAMERA: 'camera',
    MICROPHONE: 'microphone',
    BLUETOOTH: 'bluetooth',
    NFC: 'nfc',
    WIFI: 'wifi',
    CELLULAR: 'cellular',
    CUSTOM: 'custom',
  } as const,

  // Device Trust Levels
  TRUST_LEVELS: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    UNTRUSTED: 'untrusted',
  } as const,

  // Device Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'mobile',
    DEFAULT_PLATFORM: 'android',
    DEFAULT_STATUS: 'active',
    DEFAULT_TRUST_LEVEL: 'medium',
    MAX_DEVICES_PER_USER: 10,
    MAX_PUSH_TOKENS_PER_DEVICE: 5,
    DEFAULT_PUSH_ENABLED: true,
    DEFAULT_SMS_ENABLED: false,
    DEFAULT_EMAIL_ENABLED: false,
    DEFAULT_IN_APP_ENABLED: true,
    DEFAULT_LOCATION_ENABLED: false,
    DEFAULT_NOTIFICATIONS_ENABLED: true,
    DEFAULT_SOUND_ENABLED: true,
    DEFAULT_VIBRATION_ENABLED: true,
    DEFAULT_BADGE_ENABLED: true,
  } as const,

  // Device Limits
  LIMITS: {
    MIN_DEVICE_NAME_LENGTH: 3,
    MAX_DEVICE_NAME_LENGTH: 100,
    MAX_DEVICES_PER_USER: 10,
    MAX_PUSH_TOKENS: 5,
    MAX_USER_AGENT_LENGTH: 500,
    MAX_IP_ADDRESS_LENGTH: 45,
    MAX_DEVICE_ID_LENGTH: 100,
  } as const,

  // Device Errors
  ERRORS: {
    INVALID_DEVICE: 'invalid_device',
    INVALID_PLATFORM: 'invalid_platform',
    INVALID_TOKEN: 'invalid_token',
    TOKEN_EXPIRED: 'token_expired',
    MAX_DEVICES_EXCEEDED: 'max_devices_exceeded',
    DEVICE_NOT_FOUND: 'device_not_found',
    PERMISSION_DENIED: 'permission_denied',
    REGISTRATION_FAILED: 'registration_failed',
    UNREGISTRATION_FAILED: 'unregistration_failed',
    PUSH_FAILED: 'push_failed',
  } as const,
} as const;

// Device Types
export type NotificationDeviceType =
  (typeof NOTIFICATIONDEVICE.TYPES)[keyof typeof NOTIFICATIONDEVICE.TYPES];

// Device Platforms
export type NotificationDevicePlatform =
  (typeof NOTIFICATIONDEVICE.PLATFORMS)[keyof typeof NOTIFICATIONDEVICE.PLATFORMS];

// Device Statuses
export type NotificationDeviceStatus =
  (typeof NOTIFICATIONDEVICE.STATUSES)[keyof typeof NOTIFICATIONDEVICE.STATUSES];

// Device Capabilities
export type NotificationDeviceCapability =
  (typeof NOTIFICATIONDEVICE.CAPABILITIES)[keyof typeof NOTIFICATIONDEVICE.CAPABILITIES];

// Device Trust Levels
export type NotificationDeviceTrustLevel =
  (typeof NOTIFICATIONDEVICE.TRUST_LEVELS)[keyof typeof NOTIFICATIONDEVICE.TRUST_LEVELS];

// Device Defaults
export type NotificationDeviceDefault =
  (typeof NOTIFICATIONDEVICE.DEFAULTS)[keyof typeof NOTIFICATIONDEVICE.DEFAULTS];

// Device Limits
export type NotificationDeviceLimit =
  (typeof NOTIFICATIONDEVICE.LIMITS)[keyof typeof NOTIFICATIONDEVICE.LIMITS];

// Device Errors
export type NotificationDeviceError =
  (typeof NOTIFICATIONDEVICE.ERRORS)[keyof typeof NOTIFICATIONDEVICE.ERRORS];

// Utility Functions
export function notificationdeviceGetTypeLabel(type: NotificationDeviceType): string {
  const labels: Record<NotificationDeviceType, string> = {
    [NOTIFICATIONDEVICE.TYPES.MOBILE]: 'Mobile',
    [NOTIFICATIONDEVICE.TYPES.TABLET]: 'Tablet',
    [NOTIFICATIONDEVICE.TYPES.DESKTOP]: 'Desktop',
    [NOTIFICATIONDEVICE.TYPES.WEARABLE]: 'Wearable',
    [NOTIFICATIONDEVICE.TYPES.SMART_TV]: 'Smart TV',
    [NOTIFICATIONDEVICE.TYPES.GAMING_CONSOLE]: 'Gaming Console',
    [NOTIFICATIONDEVICE.TYPES.IOT]: 'IoT Device',
    [NOTIFICATIONDEVICE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Device Type';
}

export function notificationdeviceGetPlatformLabel(platform: NotificationDevicePlatform): string {
  const labels: Record<NotificationDevicePlatform, string> = {
    [NOTIFICATIONDEVICE.PLATFORMS.ANDROID]: 'Android',
    [NOTIFICATIONDEVICE.PLATFORMS.IOS]: 'iOS',
    [NOTIFICATIONDEVICE.PLATFORMS.WINDOWS]: 'Windows',
    [NOTIFICATIONDEVICE.PLATFORMS.MACOS]: 'macOS',
    [NOTIFICATIONDEVICE.PLATFORMS.LINUX]: 'Linux',
    [NOTIFICATIONDEVICE.PLATFORMS.WEB]: 'Web',
    [NOTIFICATIONDEVICE.PLATFORMS.TIZEN]: 'Tizen',
    [NOTIFICATIONDEVICE.PLATFORMS.WEBOS]: 'webOS',
    [NOTIFICATIONDEVICE.PLATFORMS.FIREOS]: 'FireOS',
    [NOTIFICATIONDEVICE.PLATFORMS.CUSTOM]: 'Custom',
  };
  return labels[platform] || 'Unknown Platform';
}

export function notificationdeviceGetStatusLabel(status: NotificationDeviceStatus): string {
  const labels: Record<NotificationDeviceStatus, string> = {
    [NOTIFICATIONDEVICE.STATUSES.ACTIVE]: 'Active',
    [NOTIFICATIONDEVICE.STATUSES.INACTIVE]: 'Inactive',
    [NOTIFICATIONDEVICE.STATUSES.REGISTERED]: 'Registered',
    [NOTIFICATIONDEVICE.STATUSES.UNREGISTERED]: 'Unregistered',
    [NOTIFICATIONDEVICE.STATUSES.SUSPENDED]: 'Suspended',
    [NOTIFICATIONDEVICE.STATUSES.BLOCKED]: 'Blocked',
    [NOTIFICATIONDEVICE.STATUSES.EXPIRED]: 'Expired',
    [NOTIFICATIONDEVICE.STATUSES.PENDING]: 'Pending',
    [NOTIFICATIONDEVICE.STATUSES.REJECTED]: 'Rejected',
    [NOTIFICATIONDEVICE.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function notificationdeviceGetCapabilityLabel(
  capability: NotificationDeviceCapability
): string {
  const labels: Record<NotificationDeviceCapability, string> = {
    [NOTIFICATIONDEVICE.CAPABILITIES.PUSH]: 'Push',
    [NOTIFICATIONDEVICE.CAPABILITIES.SMS]: 'SMS',
    [NOTIFICATIONDEVICE.CAPABILITIES.EMAIL]: 'Email',
    [NOTIFICATIONDEVICE.CAPABILITIES.IN_APP]: 'In-App',
    [NOTIFICATIONDEVICE.CAPABILITIES.VOICE]: 'Voice',
    [NOTIFICATIONDEVICE.CAPABILITIES.VIDEO]: 'Video',
    [NOTIFICATIONDEVICE.CAPABILITIES.LOCATION]: 'Location',
    [NOTIFICATIONDEVICE.CAPABILITIES.CAMERA]: 'Camera',
    [NOTIFICATIONDEVICE.CAPABILITIES.MICROPHONE]: 'Microphone',
    [NOTIFICATIONDEVICE.CAPABILITIES.BLUETOOTH]: 'Bluetooth',
    [NOTIFICATIONDEVICE.CAPABILITIES.NFC]: 'NFC',
    [NOTIFICATIONDEVICE.CAPABILITIES.WIFI]: 'WiFi',
    [NOTIFICATIONDEVICE.CAPABILITIES.CELLULAR]: 'Cellular',
    [NOTIFICATIONDEVICE.CAPABILITIES.CUSTOM]: 'Custom',
  };
  return labels[capability] || 'Unknown Capability';
}

export function notificationdeviceGetTrustLevelLabel(level: NotificationDeviceTrustLevel): string {
  const labels: Record<NotificationDeviceTrustLevel, string> = {
    [NOTIFICATIONDEVICE.TRUST_LEVELS.HIGH]: 'High',
    [NOTIFICATIONDEVICE.TRUST_LEVELS.MEDIUM]: 'Medium',
    [NOTIFICATIONDEVICE.TRUST_LEVELS.LOW]: 'Low',
    [NOTIFICATIONDEVICE.TRUST_LEVELS.UNTRUSTED]: 'Untrusted',
  };
  return labels[level] || 'Unknown Trust Level';
}

export function notificationdeviceGetErrorLabel(error: NotificationDeviceError): string {
  const labels: Record<NotificationDeviceError, string> = {
    [NOTIFICATIONDEVICE.ERRORS.INVALID_DEVICE]: 'Invalid Device',
    [NOTIFICATIONDEVICE.ERRORS.INVALID_PLATFORM]: 'Invalid Platform',
    [NOTIFICATIONDEVICE.ERRORS.INVALID_TOKEN]: 'Invalid Token',
    [NOTIFICATIONDEVICE.ERRORS.TOKEN_EXPIRED]: 'Token Expired',
    [NOTIFICATIONDEVICE.ERRORS.MAX_DEVICES_EXCEEDED]: 'Max Devices Exceeded',
    [NOTIFICATIONDEVICE.ERRORS.DEVICE_NOT_FOUND]: 'Device Not Found',
    [NOTIFICATIONDEVICE.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONDEVICE.ERRORS.REGISTRATION_FAILED]: 'Registration Failed',
    [NOTIFICATIONDEVICE.ERRORS.UNREGISTRATION_FAILED]: 'Unregistration Failed',
    [NOTIFICATIONDEVICE.ERRORS.PUSH_FAILED]: 'Push Failed',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationdeviceGetDefaultMaxDevices(): number {
  return NOTIFICATIONDEVICE.DEFAULTS.MAX_DEVICES_PER_USER;
}

export function notificationdeviceIsMobile(type: NotificationDeviceType): boolean {
  const mobileTypes: NotificationDeviceType[] = [
    NOTIFICATIONDEVICE.TYPES.MOBILE,
    NOTIFICATIONDEVICE.TYPES.TABLET,
    NOTIFICATIONDEVICE.TYPES.WEARABLE,
  ];
  return mobileTypes.includes(type);
}

export function notificationdeviceIsDesktop(type: NotificationDeviceType): boolean {
  return type === NOTIFICATIONDEVICE.TYPES.DESKTOP;
}

export function notificationdeviceIsActive(status: NotificationDeviceStatus): boolean {
  const activeStatuses: NotificationDeviceStatus[] = [
    NOTIFICATIONDEVICE.STATUSES.ACTIVE,
    NOTIFICATIONDEVICE.STATUSES.REGISTERED,
  ];
  return activeStatuses.includes(status);
}

export function notificationdeviceIsAndroid(platform: NotificationDevicePlatform): boolean {
  return platform === NOTIFICATIONDEVICE.PLATFORMS.ANDROID;
}

export function notificationdeviceIsIOS(platform: NotificationDevicePlatform): boolean {
  return platform === NOTIFICATIONDEVICE.PLATFORMS.IOS;
}

export function notificationdeviceIsWeb(platform: NotificationDevicePlatform): boolean {
  return platform === NOTIFICATIONDEVICE.PLATFORMS.WEB;
}
