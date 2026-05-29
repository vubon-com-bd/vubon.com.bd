/**
 * Device Fingerprint Client - Browser fingerprint abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/device-fingerprint.client
 *
 * RULES:
 * ✅ ONLY browser fingerprint abstraction - NO invasive tracking
 * ✅ NO canvas spyware, biometric collection, hidden tracking
 * ✅ Pure client-side fingerprinting for device identification
 * ✅ Singleton pattern for consistent device ID
 * ✅ TypeScript strict
 */

// Import from shared-utils and shared-config
import { 
  generateFingerprint, 
  getDeviceInfo as getDeviceInfoFromUtils,
  type DeviceInfo as UtilsDeviceInfo 
} from '@vubon/shared-utils';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface DeviceFingerprintComponents {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  colorDepth: number;
  pixelRatio: number;
  hardwareConcurrency: number;
  /** Bangladesh specific - mobile operator detection from user agent */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  /** Network type (if available) */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  /** Whether data saver is enabled */
  dataSaverEnabled?: boolean;
  /** Device fingerprint hash (from shared-utils) */
  fingerprintHash?: string;
}

export interface DeviceFingerprint {
  deviceId: string;
  components: DeviceFingerprintComponents;
  generatedAt: number;
  version: number;
}

export interface DeviceInfo {
  deviceType: 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'feature_phone' | 'unknown';
  os: string;
  osVersion?: string;
  browser: string;
  browserVersion?: string;
  isMobile: boolean;
  isTouchDevice: boolean;
  language: string;
  timezone: string;
  screenResolution: string;
  /** Bangladesh specific */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  /** Whether data saver is enabled (Bangladesh specific) */
  dataSaverEnabled?: boolean;
}

// ==================== Constants ====================

const FINGERPRINT_VERSION = 2;
const STORAGE_KEY_PREFIX = 'vubon_device_';
const DEFAULT_STORAGE_KEY = `${STORAGE_KEY_PREFIX}id`;

// Mobile operator patterns (Bangladesh) - Enhanced
const MOBILE_OPERATOR_PATTERNS: Array<{ pattern: RegExp; operator: DeviceInfo['mobileOperator'] }> = [
  { pattern: /Grameenphone|GP|GPB|GrameenPhone/i, operator: 'gp' },
  { pattern: /Robi|ROBI|Airtel|robi/i, operator: 'robi' },
  { pattern: /Banglalink|BL|Banglalink/i, operator: 'banglalink' },
  { pattern: /Teletalk|TELETALK|Teletalk/i, operator: 'teletalk' },
];

// Network type detection patterns (from user agent as fallback)
const NETWORK_TYPE_PATTERNS: Array<{ pattern: RegExp; type: DeviceInfo['networkType'] }> = [
  { pattern: /2g|EDGE|GPRS/i, type: '2g' },
  { pattern: /3g|HSPA|UMTS/i, type: '3g' },
  { pattern: /4g|LTE/i, type: '4g' },
  { pattern: /5g/i, type: '5g' },
  { pattern: /WiFi|WLAN|802.11/i, type: 'wifi' },
];

// ==================== Private Helpers ====================

/**
 * Check if running in browser environment
 */
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined';
};

/**
 * Generate secure device ID using shared-utils fingerprint
 */
const generateSecureDeviceId = (components: DeviceFingerprintComponents): string => {
  // Use shared-utils fingerprint generation for better entropy
  const fingerprintString = [
    components.userAgent,
    components.language,
    components.platform,
    components.screenResolution,
    components.timezone,
    components.colorDepth,
    components.pixelRatio,
    components.hardwareConcurrency,
    components.mobileOperator,
    components.networkType,
  ].join('|');
  
  // Use shared-utils generateFingerprint for SHA-256 hashing
  try {
    // Create a pseudo-implementation if generateFingerprint expects array
    const fingerprintArray = [
      components.userAgent,
      components.language,
      components.platform,
      components.screenResolution,
      components.timezone,
    ];
    return generateFingerprint(fingerprintArray);
  } catch {
    // Fallback to simple hash if shared-utils not available
    let hash = 0;
    for (let i = 0; i < fingerprintString.length; i++) {
      const char = fingerprintString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
};

/**
 * Detect mobile operator from user agent (Bangladesh specific)
 */
const detectMobileOperator = (userAgent: string): DeviceInfo['mobileOperator'] => {
  for (const { pattern, operator } of MOBILE_OPERATOR_PATTERNS) {
    if (pattern.test(userAgent)) {
      return operator;
    }
  }
  return 'unknown';
};

/**
 * Detect network type using Network Information API (if available)
 */
const detectNetworkType = (userAgent?: string): DeviceInfo['networkType'] => {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (connection) {
    const type = connection.effectiveType;
    if (type === 'slow-2g' || type === '2g') return '2g';
    if (type === '3g') return '3g';
    if (type === '4g') return '4g';
    if (type === '5g') return '5g';
    if (connection.type === 'wifi') return 'wifi';
  }
  
  // Fallback to user agent pattern detection
  if (userAgent) {
    for (const { pattern, type } of NETWORK_TYPE_PATTERNS) {
      if (pattern.test(userAgent)) {
        return type;
      }
    }
  }
  
  return 'unknown';
};

/**
 * Check if data saver is enabled
 */
const isDataSaverEnabled = (): boolean => {
  const connection = (navigator as any).connection;
  return connection?.saveData === true;
};

/**
 * Check if it's a feature phone (Bangladesh specific)
 */
const isFeaturePhone = (userAgent: string): boolean => {
  const featurePhonePatterns = [
    /Feature Phone/i,
    /Nokia[\s/]?[0-9]+/i,
    /JioPhone/i,
    /KaiOS/i,
    /Opera Mini/i,
    /Mobile Safari.*Nokia/i,
  ];
  return featurePhonePatterns.some(pattern => pattern.test(userAgent));
};

// ==================== Device Fingerprint Client ====================

class DeviceFingerprintClient {
  private cachedFingerprint: DeviceFingerprint | null = null;
  private cachedDeviceInfo: DeviceInfo | null = null;
  private storageKey: string;

  constructor(storageKey?: string) {
    if (!isBrowser()) {
      throw new Error('Device fingerprint client can only be used in browser environment');
    }
    this.storageKey = storageKey || DEFAULT_STORAGE_KEY;
  }

  /**
   * Get fingerprint components (non-invasive)
   * Collects only standard browser APIs - no canvas fingerprinting or spyware
   */
  getFingerprintComponents(): DeviceFingerprintComponents {
    const screen = window.screen;
    const userAgent = navigator.userAgent;
    const components = {
      userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      mobileOperator: detectMobileOperator(userAgent),
      networkType: detectNetworkType(userAgent),
      dataSaverEnabled: isDataSaverEnabled(),
    };
    
    // Add fingerprint hash using shared-utils
    return {
      ...components,
      fingerprintHash: generateSecureDeviceId(components),
    };
  }

  /**
   * Generate device ID from fingerprint components
   * Deterministic based on the components
   */
  generateDeviceId(components?: DeviceFingerprintComponents): string {
    const comps = components || this.getFingerprintComponents();
    return generateSecureDeviceId(comps);
  }

  /**
   * Get full device fingerprint
   */
  getFingerprint(): DeviceFingerprint {
    // Return cached fingerprint if available
    if (this.cachedFingerprint) {
      return this.cachedFingerprint;
    }
    
    const components = this.getFingerprintComponents();
    const deviceId = this.generateDeviceId(components);
    
    this.cachedFingerprint = {
      deviceId,
      components,
      generatedAt: Date.now(),
      version: FINGERPRINT_VERSION,
    };
    
    return this.cachedFingerprint;
  }

  /**
   * Get normalized device info using shared-utils when available
   */
  getDeviceInfo(): DeviceInfo {
    // Return cached device info if available
    if (this.cachedDeviceInfo) {
      return this.cachedDeviceInfo;
    }
    
    const ua = navigator.userAgent;
    const screen = window.screen;
    
    // Try to use shared-utils device info if available
    let utilsDeviceInfo: UtilsDeviceInfo | null = null;
    try {
      // getDeviceInfoFromUtils expects user agent string
      utilsDeviceInfo = getDeviceInfoFromUtils(ua);
    } catch {
      // Fallback to manual detection
    }
    
    const isFeaturePhoneFlag = isFeaturePhone(ua);
    const isMobileFlag = /Mobile|Android|iPhone|iPod|Opera Mini|BlackBerry|IEMobile/i.test(ua) || isFeaturePhoneFlag;
    const isTabletFlag = /iPad|Android(?!.*Mobile)|Kindle|Silk/i.test(ua);
    const isTouchDeviceFlag = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Device Type Detection
    let deviceType: DeviceInfo['deviceType'] = 'unknown';
    if (isFeaturePhoneFlag) {
      deviceType = 'feature_phone';
    } else if (isMobileFlag && !isTabletFlag) {
      deviceType = 'mobile';
    } else if (isTabletFlag) {
      deviceType = 'tablet';
    } else if (ua.includes('Mac') || ua.includes('Windows') || ua.includes('Linux')) {
      deviceType = 'desktop';
    }
    
    // Use shared-utils data when available
    const os = utilsDeviceInfo?.os || this.detectOS(ua);
    const osVersion = utilsDeviceInfo?.osVersion;
    const browser = utilsDeviceInfo?.browser || this.detectBrowser(ua);
    const browserVersion = utilsDeviceInfo?.browserVersion;
    
    const mobileOperator = detectMobileOperator(ua);
    const networkType = detectNetworkType(ua);
    const dataSaverEnabled = isDataSaverEnabled();
    
    this.cachedDeviceInfo = {
      deviceType,
      os,
      osVersion,
      browser,
      browserVersion,
      isMobile: isMobileFlag || isFeaturePhoneFlag,
      isTouchDevice: isTouchDeviceFlag,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${screen.width}x${screen.height}`,
      mobileOperator,
      networkType,
      dataSaverEnabled,
    };
    
    return this.cachedDeviceInfo;
  }

  /**
   * Detect OS from user agent (fallback when shared-utils not available)
   */
  private detectOS(ua: string): string {
    if (ua.includes('Windows NT 10.0')) return 'Windows 10';
    if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (ua.includes('Windows NT 6.2')) return 'Windows 8';
    if (ua.includes('Windows NT 6.1')) return 'Windows 7';
    if (ua.includes('Mac OS X')) return 'macOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Unknown';
  }

  /**
   * Detect browser from user agent (fallback when shared-utils not available)
   */
  private detectBrowser(ua: string): string {
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    if (ua.includes('UCBrowser')) return 'UC Browser';
    if (ua.includes('Opera Mini')) return 'Opera Mini';
    return 'Unknown';
  }

  /**
   * Get persisted device ID from localStorage or generate new one
   */
  getPersistedDeviceId(key?: string): string {
    const storageKey = key || this.storageKey;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return stored;
      }
      
      const newId = this.generateDeviceId();
      localStorage.setItem(storageKey, newId);
      return newId;
    } catch {
      // localStorage might be unavailable (private browsing)
      return this.generateDeviceId();
    }
  }

  /**
   * Set persisted device ID (useful for syncing across tabs)
   */
  setPersistedDeviceId(deviceId: string, key?: string): void {
    const storageKey = key || this.storageKey;
    try {
      localStorage.setItem(storageKey, deviceId);
    } catch {
      // Silently fail if localStorage not available
    }
  }

  /**
   * Clear cached fingerprint and device info
   */
  clearCache(): void {
    this.cachedFingerprint = null;
    this.cachedDeviceInfo = null;
  }

  /**
   * Clear persisted device ID
   */
  clearPersistedDeviceId(key?: string): void {
    const storageKey = key || this.storageKey;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Silently fail
    }
  }

  /**
   * Get current fingerprint version
   */
  getVersion(): number {
    return FINGERPRINT_VERSION;
  }

  /**
   * Check if fingerprint has changed significantly
   */
  hasChanged(previousFingerprint: DeviceFingerprint): boolean {
    const current = this.getFingerprint();
    
    // Compare key components
    const significantChanged = 
      previousFingerprint.components.userAgent !== current.components.userAgent ||
      previousFingerprint.components.platform !== current.components.platform ||
      previousFingerprint.components.language !== current.components.language;
    
    return significantChanged;
  }

  /**
   * Check if this is a new device (compared to stored fingerprint)
   */
  isNewDevice(storedDeviceId?: string): boolean {
    const currentId = this.getPersistedDeviceId();
    if (storedDeviceId) {
      return currentId !== storedDeviceId;
    }
    return false;
  }
}

// ==================== Singleton ====================

let fingerprintInstance: DeviceFingerprintClient | null = null;

/**
 * Get device fingerprint client singleton
 * Throws error if called outside browser
 */
export const getDeviceFingerprintClient = (storageKey?: string): DeviceFingerprintClient => {
  if (!isBrowser()) {
    throw new Error('Device fingerprint client can only be used in browser environment');
  }
  
  if (!fingerprintInstance) {
    fingerprintInstance = new DeviceFingerprintClient(storageKey);
  }
  return fingerprintInstance;
};

/**
 * Check if device fingerprint is available (browser environment)
 */
export const isDeviceFingerprintAvailable = (): boolean => {
  return isBrowser();
};

/**
 * Reset device fingerprint client (for testing)
 */
export const resetDeviceFingerprintClient = (): void => {
  fingerprintInstance = null;
};

// ==================== Type Exports ====================

export type { DeviceFingerprintClient };
