/**
 * Authentication Device Type Constants
 * Types of devices that can authenticate
 */

export const AUTH_DEVICE_TYPE = {
  // Primary device types
  WEB: 'web',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  SMART_TV: 'smart_tv',
  GAMING_CONSOLE: 'gaming_console',
  WEARABLE: 'wearable',
  IOT: 'iot',
  EMBEDDED: 'embedded',
  API: 'api',
  CLI: 'cli',

  // Browser types
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  BRAVE: 'brave',
  VIVALDI: 'vivaldi',
  ARC: 'arc',

  // Mobile OS types
  ANDROID: 'android',
  IOS: 'ios',
  WINDOWS_PHONE: 'windows_phone',
  BLACKBERRY: 'blackberry',

  // Desktop OS types
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  CHROME_OS: 'chrome_os',

  // Browser engine types
  WEBKIT: 'webkit',
  GECKO: 'gecko',
  BLINK: 'blink',
  TRIDENT: 'trident',
  PRESTRO: 'prestro',

  // Device capabilities
  TOUCH: 'touch',
  NON_TOUCH: 'non_touch',
  KEYBOARD: 'keyboard',
  MOUSE: 'mouse',
  CAMERA: 'camera',
  MICROPHONE: 'microphone',
  GPS: 'gps',
  NFC: 'nfc',
  BLUETOOTH: 'bluetooth',
} as const;

export type AuthDeviceType = (typeof AUTH_DEVICE_TYPE)[keyof typeof AUTH_DEVICE_TYPE];

export const PRIMARY_DEVICE_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.WEB,
  AUTH_DEVICE_TYPE.MOBILE,
  AUTH_DEVICE_TYPE.TABLET,
  AUTH_DEVICE_TYPE.DESKTOP,
  AUTH_DEVICE_TYPE.SMART_TV,
  AUTH_DEVICE_TYPE.GAMING_CONSOLE,
  AUTH_DEVICE_TYPE.WEARABLE,
  AUTH_DEVICE_TYPE.IOT,
  AUTH_DEVICE_TYPE.EMBEDDED,
  AUTH_DEVICE_TYPE.API,
  AUTH_DEVICE_TYPE.CLI,
];

export const BROWSER_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.CHROME,
  AUTH_DEVICE_TYPE.FIREFOX,
  AUTH_DEVICE_TYPE.SAFARI,
  AUTH_DEVICE_TYPE.EDGE,
  AUTH_DEVICE_TYPE.OPERA,
  AUTH_DEVICE_TYPE.BRAVE,
  AUTH_DEVICE_TYPE.VIVALDI,
  AUTH_DEVICE_TYPE.ARC,
];

export const MOBILE_OS_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.ANDROID,
  AUTH_DEVICE_TYPE.IOS,
  AUTH_DEVICE_TYPE.WINDOWS_PHONE,
  AUTH_DEVICE_TYPE.BLACKBERRY,
];

export const DESKTOP_OS_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.WINDOWS,
  AUTH_DEVICE_TYPE.MACOS,
  AUTH_DEVICE_TYPE.LINUX,
  AUTH_DEVICE_TYPE.CHROME_OS,
];

export const BROWSER_ENGINE_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.WEBKIT,
  AUTH_DEVICE_TYPE.GECKO,
  AUTH_DEVICE_TYPE.BLINK,
  AUTH_DEVICE_TYPE.TRIDENT,
  AUTH_DEVICE_TYPE.PRESTRO,
];

export const DEVICE_CAPABILITIES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.TOUCH,
  AUTH_DEVICE_TYPE.NON_TOUCH,
  AUTH_DEVICE_TYPE.KEYBOARD,
  AUTH_DEVICE_TYPE.MOUSE,
  AUTH_DEVICE_TYPE.CAMERA,
  AUTH_DEVICE_TYPE.MICROPHONE,
  AUTH_DEVICE_TYPE.GPS,
  AUTH_DEVICE_TYPE.NFC,
  AUTH_DEVICE_TYPE.BLUETOOTH,
];

export const MOBILE_DEVICE_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.MOBILE,
  AUTH_DEVICE_TYPE.TABLET,
  AUTH_DEVICE_TYPE.WEARABLE,
];

export const DESKTOP_DEVICE_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.DESKTOP,
  AUTH_DEVICE_TYPE.WEB,
];

export const TOUCH_DEVICE_TYPES: AuthDeviceType[] = [
  AUTH_DEVICE_TYPE.TOUCH,
  AUTH_DEVICE_TYPE.MOBILE,
  AUTH_DEVICE_TYPE.TABLET,
];

export function isPrimaryDeviceType(type: AuthDeviceType): boolean {
  return PRIMARY_DEVICE_TYPES.includes(type);
}

export function isBrowserType(type: AuthDeviceType): boolean {
  return BROWSER_TYPES.includes(type);
}

export function isMobileOSType(type: AuthDeviceType): boolean {
  return MOBILE_OS_TYPES.includes(type);
}

export function isDesktopOSType(type: AuthDeviceType): boolean {
  return DESKTOP_OS_TYPES.includes(type);
}

export function isBrowserEngineType(type: AuthDeviceType): boolean {
  return BROWSER_ENGINE_TYPES.includes(type);
}

export function isDeviceCapability(type: AuthDeviceType): boolean {
  return DEVICE_CAPABILITIES.includes(type);
}

export function getDeviceTypeLabel(type: AuthDeviceType): string {
  const labels: Record<AuthDeviceType, string> = {
    [AUTH_DEVICE_TYPE.WEB]: 'Web Browser',
    [AUTH_DEVICE_TYPE.MOBILE]: 'Mobile Phone',
    [AUTH_DEVICE_TYPE.TABLET]: 'Tablet',
    [AUTH_DEVICE_TYPE.DESKTOP]: 'Desktop Computer',
    [AUTH_DEVICE_TYPE.SMART_TV]: 'Smart TV',
    [AUTH_DEVICE_TYPE.GAMING_CONSOLE]: 'Gaming Console',
    [AUTH_DEVICE_TYPE.WEARABLE]: 'Wearable Device',
    [AUTH_DEVICE_TYPE.IOT]: 'IoT Device',
    [AUTH_DEVICE_TYPE.EMBEDDED]: 'Embedded Device',
    [AUTH_DEVICE_TYPE.API]: 'API Client',
    [AUTH_DEVICE_TYPE.CLI]: 'CLI Client',
    [AUTH_DEVICE_TYPE.CHROME]: 'Chrome Browser',
    [AUTH_DEVICE_TYPE.FIREFOX]: 'Firefox Browser',
    [AUTH_DEVICE_TYPE.SAFARI]: 'Safari Browser',
    [AUTH_DEVICE_TYPE.EDGE]: 'Edge Browser',
    [AUTH_DEVICE_TYPE.OPERA]: 'Opera Browser',
    [AUTH_DEVICE_TYPE.BRAVE]: 'Brave Browser',
    [AUTH_DEVICE_TYPE.VIVALDI]: 'Vivaldi Browser',
    [AUTH_DEVICE_TYPE.ARC]: 'Arc Browser',
    [AUTH_DEVICE_TYPE.ANDROID]: 'Android OS',
    [AUTH_DEVICE_TYPE.IOS]: 'iOS',
    [AUTH_DEVICE_TYPE.WINDOWS_PHONE]: 'Windows Phone',
    [AUTH_DEVICE_TYPE.BLACKBERRY]: 'BlackBerry',
    [AUTH_DEVICE_TYPE.WINDOWS]: 'Windows OS',
    [AUTH_DEVICE_TYPE.MACOS]: 'macOS',
    [AUTH_DEVICE_TYPE.LINUX]: 'Linux OS',
    [AUTH_DEVICE_TYPE.CHROME_OS]: 'Chrome OS',
    [AUTH_DEVICE_TYPE.WEBKIT]: 'WebKit Engine',
    [AUTH_DEVICE_TYPE.GECKO]: 'Gecko Engine',
    [AUTH_DEVICE_TYPE.BLINK]: 'Blink Engine',
    [AUTH_DEVICE_TYPE.TRIDENT]: 'Trident Engine',
    [AUTH_DEVICE_TYPE.PRESTRO]: 'Prestro Engine',
    [AUTH_DEVICE_TYPE.TOUCH]: 'Touch Support',
    [AUTH_DEVICE_TYPE.NON_TOUCH]: 'Non-Touch Device',
    [AUTH_DEVICE_TYPE.KEYBOARD]: 'Keyboard Support',
    [AUTH_DEVICE_TYPE.MOUSE]: 'Mouse Support',
    [AUTH_DEVICE_TYPE.CAMERA]: 'Camera Support',
    [AUTH_DEVICE_TYPE.MICROPHONE]: 'Microphone Support',
    [AUTH_DEVICE_TYPE.GPS]: 'GPS Support',
    [AUTH_DEVICE_TYPE.NFC]: 'NFC Support',
    [AUTH_DEVICE_TYPE.BLUETOOTH]: 'Bluetooth Support',
  };

  return labels[type] || 'Unknown Device Type';
}

export function getDeviceTypeIcon(type: AuthDeviceType): string {
  const icons: Record<AuthDeviceType, string> = {
    [AUTH_DEVICE_TYPE.WEB]: '🌐',
    [AUTH_DEVICE_TYPE.MOBILE]: '📱',
    [AUTH_DEVICE_TYPE.TABLET]: '📱',
    [AUTH_DEVICE_TYPE.DESKTOP]: '💻',
    [AUTH_DEVICE_TYPE.SMART_TV]: '📺',
    [AUTH_DEVICE_TYPE.GAMING_CONSOLE]: '🎮',
    [AUTH_DEVICE_TYPE.WEARABLE]: '⌚',
    [AUTH_DEVICE_TYPE.IOT]: '📡',
    [AUTH_DEVICE_TYPE.EMBEDDED]: '🔌',
    [AUTH_DEVICE_TYPE.API]: '🔗',
    [AUTH_DEVICE_TYPE.CLI]: '💻',
    [AUTH_DEVICE_TYPE.CHROME]: '🟢',
    [AUTH_DEVICE_TYPE.FIREFOX]: '🦊',
    [AUTH_DEVICE_TYPE.SAFARI]: '🧭',
    [AUTH_DEVICE_TYPE.EDGE]: '🔵',
    [AUTH_DEVICE_TYPE.OPERA]: '🔴',
    [AUTH_DEVICE_TYPE.BRAVE]: '🦁',
    [AUTH_DEVICE_TYPE.VIVALDI]: '🎵',
    [AUTH_DEVICE_TYPE.ARC]: '🔮',
    [AUTH_DEVICE_TYPE.ANDROID]: '🤖',
    [AUTH_DEVICE_TYPE.IOS]: '🍎',
    [AUTH_DEVICE_TYPE.WINDOWS_PHONE]: '📱',
    [AUTH_DEVICE_TYPE.BLACKBERRY]: '📱',
    [AUTH_DEVICE_TYPE.WINDOWS]: '🪟',
    [AUTH_DEVICE_TYPE.MACOS]: '🍎',
    [AUTH_DEVICE_TYPE.LINUX]: '🐧',
    [AUTH_DEVICE_TYPE.CHROME_OS]: '🟢',
    [AUTH_DEVICE_TYPE.WEBKIT]: '🍏',
    [AUTH_DEVICE_TYPE.GECKO]: '🦊',
    [AUTH_DEVICE_TYPE.BLINK]: '⚡',
    [AUTH_DEVICE_TYPE.TRIDENT]: '⚓',
    [AUTH_DEVICE_TYPE.PRESTRO]: '🎭',
    [AUTH_DEVICE_TYPE.TOUCH]: '👆',
    [AUTH_DEVICE_TYPE.NON_TOUCH]: '🖱️',
    [AUTH_DEVICE_TYPE.KEYBOARD]: '⌨️',
    [AUTH_DEVICE_TYPE.MOUSE]: '🖱️',
    [AUTH_DEVICE_TYPE.CAMERA]: '📷',
    [AUTH_DEVICE_TYPE.MICROPHONE]: '🎤',
    [AUTH_DEVICE_TYPE.GPS]: '📍',
    [AUTH_DEVICE_TYPE.NFC]: '📡',
    [AUTH_DEVICE_TYPE.BLUETOOTH]: '🔵',
  };

  return icons[type] || '📱';
}

export function getDeviceTypeCategory(
  type: AuthDeviceType
): 'browser' | 'os' | 'engine' | 'capability' | 'primary' {
  if (isBrowserType(type)) return 'browser';
  if (isMobileOSType(type) || isDesktopOSType(type)) return 'os';
  if (isBrowserEngineType(type)) return 'engine';
  if (isDeviceCapability(type)) return 'capability';
  return 'primary';
}

export function isMobileDevice(type: AuthDeviceType): boolean {
  return MOBILE_DEVICE_TYPES.includes(type);
}

export function isDesktopDevice(type: AuthDeviceType): boolean {
  return DESKTOP_DEVICE_TYPES.includes(type);
}

export function isTouchDevice(type: AuthDeviceType): boolean {
  return TOUCH_DEVICE_TYPES.includes(type);
}
