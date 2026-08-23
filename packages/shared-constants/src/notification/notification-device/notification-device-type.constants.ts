/**
 * Notification Device Type Constants
 * Type definitions and classifications for notification devices
 */

export const NOTIFICATIONDEVICE_TYPE = {
  // Device Categories
  CATEGORIES: {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    WEARABLE: 'wearable',
    TV: 'tv',
    CONSOLE: 'console',
    IOT: 'iot',
    OTHER: 'other',
  } as const,

  // Device Sub-Types
  SUB_TYPES: {
    // Mobile
    SMARTPHONE: 'smartphone',
    PHABLET: 'phablet',
    FOLDABLE: 'foldable',

    // Tablet
    IPAD: 'ipad',
    ANDROID_TABLET: 'android_tablet',
    WINDOWS_TABLET: 'windows_tablet',

    // Desktop
    LAPTOP: 'laptop',
    DESKTOP_PC: 'desktop_pc',
    ALL_IN_ONE: 'all_in_one',

    // Wearable
    SMARTWATCH: 'smartwatch',
    FITNESS_BAND: 'fitness_band',
    SMART_GLASSES: 'smart_glasses',

    // TV
    SMART_TV: 'smart_tv',
    TV_STICK: 'tv_stick',
    TV_BOX: 'tv_box',

    // Console
    PLAYSTATION: 'playstation',
    XBOX: 'xbox',
    NINTENDO: 'nintendo',

    // IoT
    SMART_SPEAKER: 'smart_speaker',
    SMART_DISPLAY: 'smart_display',
    SMART_HUB: 'smart_hub',
    SMART_APPLIANCE: 'smart_appliance',
  } as const,

  // Device Form Factors
  FORM_FACTORS: {
    TOUCH: 'touch',
    KEYBOARD: 'keyboard',
    VOICE: 'voice',
    GESTURE: 'gesture',
    REMOTE: 'remote',
    HYBRID: 'hybrid',
  } as const,

  // Device OS Types
  OS_TYPES: {
    ANDROID: 'android',
    IOS: 'ios',
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    TIZEN: 'tizen',
    WEBOS: 'webos',
    FIREOS: 'fireos',
    CHROMEOS: 'chromeos',
    KAIOS: 'kaios',
    OTHER: 'other',
  } as const,

  // Device Connectivity
  CONNECTIVITY: {
    WIFI: 'wifi',
    CELLULAR: 'cellular',
    BLUETOOTH: 'bluetooth',
    ETHERNET: 'ethernet',
    NFC: 'nfc',
    ALL: 'all',
    NONE: 'none',
  } as const,
} as const;

// Device Categories
export type NotificationDeviceCategoryType =
  (typeof NOTIFICATIONDEVICE_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONDEVICE_TYPE.CATEGORIES];

// Device Sub-Types
export type NotificationDeviceSubType =
  (typeof NOTIFICATIONDEVICE_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONDEVICE_TYPE.SUB_TYPES];

// Device Form Factors
export type NotificationDeviceFormFactor =
  (typeof NOTIFICATIONDEVICE_TYPE.FORM_FACTORS)[keyof typeof NOTIFICATIONDEVICE_TYPE.FORM_FACTORS];

// Device OS Types
export type NotificationDeviceOSType =
  (typeof NOTIFICATIONDEVICE_TYPE.OS_TYPES)[keyof typeof NOTIFICATIONDEVICE_TYPE.OS_TYPES];

// Device Connectivity
export type NotificationDeviceConnectivity =
  (typeof NOTIFICATIONDEVICE_TYPE.CONNECTIVITY)[keyof typeof NOTIFICATIONDEVICE_TYPE.CONNECTIVITY];

// Utility Functions
export function notificationdeviceGetCategoryLabel(
  category: NotificationDeviceCategoryType
): string {
  const labels: Record<NotificationDeviceCategoryType, string> = {
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.MOBILE]: 'Mobile',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.TABLET]: 'Tablet',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.DESKTOP]: 'Desktop',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.WEARABLE]: 'Wearable',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.TV]: 'TV',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.CONSOLE]: 'Console',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.IOT]: 'IoT',
    [NOTIFICATIONDEVICE_TYPE.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationdeviceGetSubTypeLabel(subType: NotificationDeviceSubType): string {
  const labels: Record<NotificationDeviceSubType, string> = {
    // Mobile
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMARTPHONE]: 'Smartphone',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.PHABLET]: 'Phablet',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.FOLDABLE]: 'Foldable',

    // Tablet
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.IPAD]: 'iPad',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.ANDROID_TABLET]: 'Android Tablet',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.WINDOWS_TABLET]: 'Windows Tablet',

    // Desktop
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.LAPTOP]: 'Laptop',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.DESKTOP_PC]: 'Desktop PC',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.ALL_IN_ONE]: 'All-in-One',

    // Wearable
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMARTWATCH]: 'Smartwatch',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.FITNESS_BAND]: 'Fitness Band',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMART_GLASSES]: 'Smart Glasses',

    // TV
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMART_TV]: 'Smart TV',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.TV_STICK]: 'TV Stick',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.TV_BOX]: 'TV Box',

    // Console
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.PLAYSTATION]: 'PlayStation',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.XBOX]: 'Xbox',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.NINTENDO]: 'Nintendo',

    // IoT
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMART_SPEAKER]: 'Smart Speaker',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMART_DISPLAY]: 'Smart Display',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMART_HUB]: 'Smart Hub',
    [NOTIFICATIONDEVICE_TYPE.SUB_TYPES.SMART_APPLIANCE]: 'Smart Appliance',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationdeviceGetFormFactorLabel(
  formFactor: NotificationDeviceFormFactor
): string {
  const labels: Record<NotificationDeviceFormFactor, string> = {
    [NOTIFICATIONDEVICE_TYPE.FORM_FACTORS.TOUCH]: 'Touch',
    [NOTIFICATIONDEVICE_TYPE.FORM_FACTORS.KEYBOARD]: 'Keyboard',
    [NOTIFICATIONDEVICE_TYPE.FORM_FACTORS.VOICE]: 'Voice',
    [NOTIFICATIONDEVICE_TYPE.FORM_FACTORS.GESTURE]: 'Gesture',
    [NOTIFICATIONDEVICE_TYPE.FORM_FACTORS.REMOTE]: 'Remote',
    [NOTIFICATIONDEVICE_TYPE.FORM_FACTORS.HYBRID]: 'Hybrid',
  };
  return labels[formFactor] || 'Unknown Form Factor';
}

export function notificationdeviceGetOSTypeLabel(osType: NotificationDeviceOSType): string {
  const labels: Record<NotificationDeviceOSType, string> = {
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.ANDROID]: 'Android',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.IOS]: 'iOS',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.WINDOWS]: 'Windows',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.MACOS]: 'macOS',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.LINUX]: 'Linux',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.TIZEN]: 'Tizen',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.WEBOS]: 'webOS',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.FIREOS]: 'FireOS',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.CHROMEOS]: 'ChromeOS',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.KAIOS]: 'KaiOS',
    [NOTIFICATIONDEVICE_TYPE.OS_TYPES.OTHER]: 'Other',
  };
  return labels[osType] || 'Unknown OS Type';
}

export function notificationdeviceGetConnectivityLabel(
  connectivity: NotificationDeviceConnectivity
): string {
  const labels: Record<NotificationDeviceConnectivity, string> = {
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.WIFI]: 'WiFi',
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.CELLULAR]: 'Cellular',
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.BLUETOOTH]: 'Bluetooth',
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.ETHERNET]: 'Ethernet',
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.NFC]: 'NFC',
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.ALL]: 'All',
    [NOTIFICATIONDEVICE_TYPE.CONNECTIVITY.NONE]: 'None',
  };
  return labels[connectivity] || 'Unknown Connectivity';
}

export function notificationdeviceIsMobileCategory(
  category: NotificationDeviceCategoryType
): boolean {
  const mobileCategories: NotificationDeviceCategoryType[] = [
    NOTIFICATIONDEVICE_TYPE.CATEGORIES.MOBILE,
    NOTIFICATIONDEVICE_TYPE.CATEGORIES.TABLET,
    NOTIFICATIONDEVICE_TYPE.CATEGORIES.WEARABLE,
  ];
  return mobileCategories.includes(category);
}

export function notificationdeviceIsDesktopCategory(
  category: NotificationDeviceCategoryType
): boolean {
  return category === NOTIFICATIONDEVICE_TYPE.CATEGORIES.DESKTOP;
}

export function notificationdeviceIsTVCategory(category: NotificationDeviceCategoryType): boolean {
  return category === NOTIFICATIONDEVICE_TYPE.CATEGORIES.TV;
}

export function notificationdeviceIsConsoleCategory(
  category: NotificationDeviceCategoryType
): boolean {
  return category === NOTIFICATIONDEVICE_TYPE.CATEGORIES.CONSOLE;
}

export function notificationdeviceIsIoTCategory(category: NotificationDeviceCategoryType): boolean {
  return category === NOTIFICATIONDEVICE_TYPE.CATEGORIES.IOT;
}
