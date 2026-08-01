/**
 * Device identification and management constants for the monorepo
 * All device-related constants are centralized here for consistent device handling
 */
/**
 * Device types for identification and categorization
 */
export declare const DEVICE_TYPES: {
    /**
     * Desktop computer - Laptop, PC, workstation
     */
    readonly DESKTOP: "desktop";
    /**
     * Mobile phone - Smartphone, mobile device
     */
    readonly MOBILE: "mobile";
    /**
     * Feature phone - Basic phone with limited capabilities
     * Common in Bangladesh market
     */
    readonly FEATURE_PHONE: "feature_phone";
    /**
     * Tablet device - iPad, Android tablet
     */
    readonly TABLET: "tablet";
    /**
     * Smart TV - Connected TV, streaming devices
     */
    readonly SMART_TV: "smart_tv";
    /**
     * Gaming console - PlayStation, Xbox, Nintendo
     */
    readonly GAMING_CONSOLE: "gaming_console";
    /**
     * IoT device - Smart home devices, sensors
     */
    readonly IOT: "iot";
    /**
     * Kiosk - Self-service kiosks, public terminals
     * Common in Bangladesh for banking, government services
     */
    readonly KIOSK: "kiosk";
    /**
     * POS device - Point of sale terminals
     * Common in Bangladesh retail
     */
    readonly POS: "pos";
    /**
     * Wearable - Smart watches, fitness trackers
     */
    readonly WEARABLE: "wearable";
    /**
     * Automotive - Car infotainment systems
     */
    readonly AUTOMOTIVE: "automotive";
    /**
     * Unknown - Cannot be determined
     */
    readonly UNKNOWN: "unknown";
};
export type DeviceType = (typeof DEVICE_TYPES)[keyof typeof DEVICE_TYPES];
/**
 * Device trust levels for security
 */
export declare const DEVICE_TRUST_LEVELS: {
    /**
     * Trusted device - Known, verified device
     */
    readonly TRUSTED: "trusted";
    /**
     * Suspicious device - Potential security risk
     */
    readonly SUSPICIOUS: "suspicious";
    /**
     * Blocked device - Blocked due to security violations
     */
    readonly BLOCKED: "blocked";
    /**
     * Unknown device - New or unrecognized device
     */
    readonly UNKNOWN: "unknown";
    /**
     * Untrusted device - Low trust level, requires verification
     */
    readonly UNTRUSTED: "untrusted";
    /**
     * Verified device - Verified through MFA
     */
    readonly VERIFIED: "verified";
    /**
     * Compromised device - Potentially compromised
     */
    readonly COMPROMISED: "compromised";
};
export type DeviceTrustLevel = (typeof DEVICE_TRUST_LEVELS)[keyof typeof DEVICE_TRUST_LEVELS];
/**
 * Device fingerprint components for identification
 */
export declare const DEVICE_FINGERPRINT_COMPONENTS: {
    /**
     * User agent string
     */
    readonly USER_AGENT: "user_agent";
    /**
     * IP address
     */
    readonly IP_ADDRESS: "ip_address";
    /**
     * Screen resolution
     */
    readonly SCREEN_RESOLUTION: "screen_resolution";
    /**
     * Timezone offset
     */
    readonly TIMEZONE_OFFSET: "timezone_offset";
    /**
     * Language settings
     */
    readonly LANGUAGE: "language";
    /**
     * Platform information
     */
    readonly PLATFORM: "platform";
    /**
     * Device memory
     */
    readonly DEVICE_MEMORY: "device_memory";
    /**
     * Hardware concurrency
     */
    readonly HARDWARE_CONCURRENCY: "hardware_concurrency";
    /**
     * WebGL vendor
     */
    readonly WEBGL_VENDOR: "webgl_vendor";
    /**
     * WebGL renderer
     */
    readonly WEBGL_RENDERER: "webgl_renderer";
    /**
     * Audio context fingerprint
     */
    readonly AUDIO_FINGERPRINT: "audio_fingerprint";
    /**
     * Canvas fingerprint
     */
    readonly CANVAS_FINGERPRINT: "canvas_fingerprint";
    /**
     * Fonts list
     */
    readonly FONTS_LIST: "fonts_list";
    /**
     * Touch support
     */
    readonly TOUCH_SUPPORT: "touch_support";
    /**
     * Cookies enabled
     */
    readonly COOKIES_ENABLED: "cookies_enabled";
    /**
     * Battery status
     */
    readonly BATTERY_STATUS: "battery_status";
    /**
     * Device orientation
     */
    readonly DEVICE_ORIENTATION: "device_orientation";
    /**
     * Network information
     */
    readonly NETWORK_INFORMATION: "network_information";
    /**
     * Browser plugins
     */
    readonly BROWSER_PLUGINS: "browser_plugins";
    /**
     * Do Not Track status
     */
    readonly DNT_STATUS: "dnt_status";
    /**
     * Connection type
     */
    readonly CONNECTION_TYPE: "connection_type";
};
export type DeviceFingerprintComponent = (typeof DEVICE_FINGERPRINT_COMPONENTS)[keyof typeof DEVICE_FINGERPRINT_COMPONENTS];
/**
 * Device operating systems
 */
export declare const DEVICE_OS: {
    readonly WINDOWS: "windows";
    readonly MACOS: "macos";
    readonly LINUX: "linux";
    readonly IOS: "ios";
    readonly ANDROID: "android";
    readonly CHROME_OS: "chrome_os";
    readonly TIZEN: "tizen";
    readonly WEBOS: "webos";
    readonly KAIOS: "kaios";
    readonly FREERTOS: "freertos";
    readonly WINDOWS_PHONE: "windows_phone";
    readonly FIRE_OS: "fire_os";
    readonly HARMONY_OS: "harmony_os";
    readonly MEEGO: "meego";
    readonly SYMBIAN: "symbian";
    readonly BLACKBERRY: "blackberry";
    readonly UNKNOWN: "unknown";
};
export type DeviceOS = (typeof DEVICE_OS)[keyof typeof DEVICE_OS];
/**
 * Device browsers
 */
export declare const DEVICE_BROWSERS: {
    readonly CHROME: "chrome";
    readonly FIREFOX: "firefox";
    readonly SAFARI: "safari";
    readonly EDGE: "edge";
    readonly OPERA: "opera";
    readonly BRAVE: "brave";
    readonly VIVALDI: "vivaldi";
    readonly SAMSUNG_INTERNET: "samsung_internet";
    readonly UC_BROWSER: "uc_browser";
    readonly OPERA_MINI: "opera_mini";
    readonly NOKIA_BROWSER: "nokia_browser";
    readonly KAIOS_BROWSER: "kaios_browser";
    readonly WEBVIEW: "webview";
    readonly UNKNOWN: "unknown";
};
export type DeviceBrowser = (typeof DEVICE_BROWSERS)[keyof typeof DEVICE_BROWSERS];
/**
 * Device vendors/manufacturers
 */
export declare const DEVICE_VENDORS: {
    readonly APPLE: "apple";
    readonly SAMSUNG: "samsung";
    readonly HUAWEI: "huawei";
    readonly XIAOMI: "xiaomi";
    readonly OPPO: "oppo";
    readonly VIVO: "vivo";
    readonly REALME: "realme";
    readonly ONEPLUS: "oneplus";
    readonly NOKIA: "nokia";
    readonly SYMPHONY: "symphony";
    readonly WALTON: "walton";
    readonly TRANSSION: "transsion";
    readonly LENOVO: "lenovo";
    readonly DELL: "dell";
    readonly HP: "hp";
    readonly ASUS: "asus";
    readonly ACER: "acer";
    readonly MICROSOFT: "microsoft";
    readonly GOOGLE: "google";
    readonly SONY: "sony";
    readonly LG: "lg";
    readonly PANASONIC: "panasonic";
    readonly UNKNOWN: "unknown";
};
export type DeviceVendor = (typeof DEVICE_VENDORS)[keyof typeof DEVICE_VENDORS];
/**
 * Device display orientations
 */
export declare const DEVICE_ORIENTATIONS: {
    readonly PORTRAIT: "portrait";
    readonly LANDSCAPE: "landscape";
    readonly SQUARE: "square";
    readonly UNKNOWN: "unknown";
};
export type DeviceOrientation = (typeof DEVICE_ORIENTATIONS)[keyof typeof DEVICE_ORIENTATIONS];
/**
 * Device connection types
 */
export declare const DEVICE_CONNECTION_TYPES: {
    readonly WIFI: "wifi";
    readonly CELLULAR: "cellular";
    readonly BLUETOOTH: "bluetooth";
    readonly ETHERNET: "ethernet";
    readonly VPN: "vpn";
    readonly PROXY: "proxy";
    readonly UNKNOWN: "unknown";
};
export type DeviceConnectionType = (typeof DEVICE_CONNECTION_TYPES)[keyof typeof DEVICE_CONNECTION_TYPES];
/**
 * Device configuration
 */
export declare const DEVICE_CONFIG: {
    /**
     * Maximum number of devices per user
     */
    readonly MAX_DEVICES_PER_USER: 10;
    /**
     * Device trust duration in days for trusted devices
     */
    readonly TRUST_DURATION_DAYS: 30;
    /**
     * Device verification expiry in minutes
     */
    readonly VERIFICATION_EXPIRY_MINUTES: 15;
    /**
     * Whether to require device verification for new devices
     */
    readonly REQUIRE_VERIFICATION_FOR_NEW_DEVICES: true;
    /**
     * Whether to allow trusted devices to bypass MFA
     */
    readonly ALLOW_TRUSTED_DEVICES_BYPASS_MFA: false;
    /**
     * Whether to track device location
     */
    readonly TRACK_LOCATION: true;
    /**
     * Whether to enable device fingerprinting
     */
    readonly ENABLE_FINGERPRINTING: true;
    /**
     * Fingerprint confidence threshold (0-1)
     */
    readonly FINGERPRINT_CONFIDENCE_THRESHOLD: 0.7;
    /**
     * Suspicious activity threshold before blocking
     */
    readonly SUSPICIOUS_ACTIVITY_THRESHOLD: 3;
    /**
     * Device blocking duration in minutes
     */
    readonly BLOCK_DURATION_MINUTES: 60;
    /**
     * Whether to auto-block suspicious devices
     */
    readonly AUTO_BLOCK_SUSPICIOUS_DEVICES: true;
    /**
     * Whether to notify users of new device logins
     */
    readonly NOTIFY_NEW_DEVICE_LOGIN: true;
    /**
     * Whether to notify users of suspicious device activity
     */
    readonly NOTIFY_SUSPICIOUS_ACTIVITY: true;
};
/**
 * Device interface
 */
export interface Device {
    /**
     * Device unique identifier
     */
    id: string;
    /**
     * User ID associated with the device
     */
    userId: string;
    /**
     * Device type
     */
    type: DeviceType;
    /**
     * Device name (user-provided)
     */
    name?: string;
    /**
     * Device trust level
     */
    trustLevel: DeviceTrustLevel;
    /**
     * Device fingerprint hash
     */
    fingerprint: string;
    /**
     * Device metadata
     */
    metadata: DeviceMetadata;
    /**
     * Device status
     */
    status: DeviceStatus;
    /**
     * When the device was first seen
     */
    firstSeenAt: Date;
    /**
     * When the device was last used
     */
    lastUsedAt: Date;
    /**
     * When the device was verified
     */
    verifiedAt?: Date;
    /**
     * When the device was blocked
     */
    blockedAt?: Date;
    /**
     * When the device trust expires
     */
    trustExpiresAt?: Date;
    /**
     * Total login count from this device
     */
    loginCount: number;
    /**
     * Failed login attempts from this device
     */
    failedAttempts: number;
    /**
     * Whether the device is active
     */
    isActive: boolean;
    /**
     * Whether the device is verified
     */
    isVerified: boolean;
    /**
     * Whether the device is blocked
     */
    isBlocked: boolean;
}
/**
 * Device metadata interface
 */
export interface DeviceMetadata {
    /**
     * Device vendor/manufacturer
     */
    vendor: DeviceVendor;
    /**
     * Device model
     */
    model?: string;
    /**
     * Operating system
     */
    os: DeviceOS;
    /**
     * Operating system version
     */
    osVersion?: string;
    /**
     * Browser
     */
    browser: DeviceBrowser;
    /**
     * Browser version
     */
    browserVersion?: string;
    /**
     * Screen resolution
     */
    screenResolution?: string;
    /**
     * Device orientation
     */
    orientation: DeviceOrientation;
    /**
     * Connection type
     */
    connectionType: DeviceConnectionType;
    /**
     * IP address
     */
    ipAddress: string;
    /**
     * User agent string
     */
    userAgent: string;
    /**
     * Location information
     */
    location?: DeviceLocation;
    /**
     * Device capabilities
     */
    capabilities: DeviceCapabilities;
    /**
     * Additional metadata
     */
    additional: Record<string, unknown>;
}
/**
 * Device location interface
 */
export interface DeviceLocation {
    /**
     * Country code (ISO-3166)
     */
    countryCode?: string;
    /**
     * City name
     */
    city?: string;
    /**
     * Region/state
     */
    region?: string;
    /**
     * Postal code
     */
    postalCode?: string;
    /**
     * Latitude
     */
    latitude?: number;
    /**
     * Longitude
     */
    longitude?: number;
    /**
     * Timezone
     */
    timezone?: string;
}
/**
 * Device capabilities interface
 */
export interface DeviceCapabilities {
    /**
     * Whether device has touch support
     */
    touchSupport: boolean;
    /**
     * Whether device has camera
     */
    hasCamera: boolean;
    /**
     * Whether device has microphone
     */
    hasMicrophone: boolean;
    /**
     * Whether device has GPS
     */
    hasGPS: boolean;
    /**
     * Whether device has NFC
     */
    hasNFC: boolean;
    /**
     * Whether device supports biometrics
     */
    supportsBiometrics: boolean;
    /**
     * Device memory in GB
     */
    memory?: number;
    /**
     * Device storage in GB
     */
    storage?: number;
    /**
     * Screen size in inches
     */
    screenSize?: number;
    /**
     * Pixel density
     */
    pixelDensity?: number;
}
/**
 * Device status types
 */
export declare const DEVICE_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly SUSPENDED: "suspended";
    readonly BLOCKED: "blocked";
    readonly VERIFIED: "verified";
    readonly PENDING_VERIFICATION: "pending_verification";
    readonly EXPIRED: "expired";
};
export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];
/**
 * Device events for logging
 */
export declare const DEVICE_EVENTS: {
    readonly DEVICE_REGISTERED: "device.registered";
    readonly DEVICE_VERIFIED: "device.verified";
    readonly DEVICE_TRUSTED: "device.trusted";
    readonly DEVICE_UNTRUSTED: "device.untrusted";
    readonly DEVICE_BLOCKED: "device.blocked";
    readonly DEVICE_UNBLOCKED: "device.unblocked";
    readonly DEVICE_SUSPECTED: "device.suspected";
    readonly DEVICE_REMOVED: "device.removed";
    readonly DEVICE_FINGERPRINT_GENERATED: "device.fingerprint.generated";
    readonly DEVICE_FINGERPRINT_MISMATCH: "device.fingerprint.mismatch";
    readonly DEVICE_VERIFICATION_ATTEMPT: "device.verification.attempt";
    readonly DEVICE_VERIFICATION_SUCCESS: "device.verification.success";
    readonly DEVICE_VERIFICATION_FAILURE: "device.verification.failure";
    readonly DEVICE_TOKEN_GENERATED: "device.token.generated";
    readonly DEVICE_TOKEN_USED: "device.token.used";
    readonly DEVICE_TOKEN_EXPIRED: "device.token.expired";
};
export type DeviceEvent = (typeof DEVICE_EVENTS)[keyof typeof DEVICE_EVENTS];
/**
 * Device error messages
 */
export declare const DEVICE_ERROR_MESSAGES: {
    readonly DEVICE_NOT_FOUND: "Device not found";
    readonly DEVICE_BLOCKED: "Device is blocked";
    readonly DEVICE_SUSPICIOUS: "Device is flagged as suspicious";
    readonly DEVICE_UNTRUSTED: "Device is not trusted";
    readonly DEVICE_NOT_VERIFIED: "Device is not verified";
    readonly DEVICE_VERIFICATION_FAILED: "Device verification failed";
    readonly DEVICE_FINGERPRINT_MISMATCH: "Device fingerprint mismatch";
    readonly DEVICE_LIMIT_EXCEEDED: "Maximum devices per user exceeded";
    readonly DEVICE_TOKEN_INVALID: "Invalid device verification token";
    readonly DEVICE_TOKEN_EXPIRED: "Device verification token expired";
    readonly DEVICE_VERIFICATION_REQUIRED: "Device verification required";
    readonly DEVICE_REGISTRATION_FAILED: "Device registration failed";
    readonly DEVICE_UPDATE_FAILED: "Device update failed";
    readonly DEVICE_REMOVAL_FAILED: "Device removal failed";
    readonly DEVICE_TYPE_UNSUPPORTED: "Device type not supported";
    readonly DEVICE_LOCATION_BLOCKED: "Device location is blocked";
};
export type DeviceErrorMessage = (typeof DEVICE_ERROR_MESSAGES)[keyof typeof DEVICE_ERROR_MESSAGES];
/**
 * Device success messages
 */
export declare const DEVICE_SUCCESS_MESSAGES: {
    readonly DEVICE_REGISTERED: "Device registered successfully";
    readonly DEVICE_VERIFIED: "Device verified successfully";
    readonly DEVICE_TRUSTED: "Device trusted successfully";
    readonly DEVICE_UNBLOCKED: "Device unblocked successfully";
    readonly DEVICE_REMOVED: "Device removed successfully";
    readonly DEVICE_TOKEN_GENERATED: "Device verification token generated";
    readonly DEVICE_FINGERPRINT_GENERATED: "Device fingerprint generated";
};
export type DeviceSuccessMessage = (typeof DEVICE_SUCCESS_MESSAGES)[keyof typeof DEVICE_SUCCESS_MESSAGES];
/**
 * Helper functions for device management
 */
export declare const DEVICE_UTILS: {
    /**
     * Get device type from user agent
     */
    readonly getDeviceTypeFromUserAgent: (userAgent: string) => DeviceType;
    /**
     * Get device vendor from user agent
     */
    readonly getDeviceVendor: (userAgent: string) => DeviceVendor;
    /**
     * Get device OS from user agent
     */
    readonly getDeviceOS: (userAgent: string) => DeviceOS;
    /**
     * Get device browser from user agent
     */
    readonly getDeviceBrowser: (userAgent: string) => DeviceBrowser;
    /**
     * Get device trust level based on factors
     */
    readonly getTrustLevel: (device: Partial<Device>) => DeviceTrustLevel;
    /**
     * Check if device is considered trusted
     */
    readonly isDeviceTrusted: (device: Partial<Device>) => boolean;
    /**
     * Check if device is suspicious
     */
    readonly isDeviceSuspicious: (device: Partial<Device>) => boolean;
    /**
     * Check if device is blocked
     */
    readonly isDeviceBlocked: (device: Partial<Device>) => boolean;
    /**
     * Get display name for device type
     */
    readonly getDeviceTypeDisplayName: (type: DeviceType) => string;
    /**
     * Get display name for trust level
     */
    readonly getTrustLevelDisplayName: (level: DeviceTrustLevel) => string;
    /**
     * Get color for trust level
     */
    readonly getTrustLevelColor: (level: DeviceTrustLevel) => string;
};
/**
 * All device constants for export
 */
export declare const DEVICE_CONSTANTS: {
    readonly TYPES: {
        /**
         * Desktop computer - Laptop, PC, workstation
         */
        readonly DESKTOP: "desktop";
        /**
         * Mobile phone - Smartphone, mobile device
         */
        readonly MOBILE: "mobile";
        /**
         * Feature phone - Basic phone with limited capabilities
         * Common in Bangladesh market
         */
        readonly FEATURE_PHONE: "feature_phone";
        /**
         * Tablet device - iPad, Android tablet
         */
        readonly TABLET: "tablet";
        /**
         * Smart TV - Connected TV, streaming devices
         */
        readonly SMART_TV: "smart_tv";
        /**
         * Gaming console - PlayStation, Xbox, Nintendo
         */
        readonly GAMING_CONSOLE: "gaming_console";
        /**
         * IoT device - Smart home devices, sensors
         */
        readonly IOT: "iot";
        /**
         * Kiosk - Self-service kiosks, public terminals
         * Common in Bangladesh for banking, government services
         */
        readonly KIOSK: "kiosk";
        /**
         * POS device - Point of sale terminals
         * Common in Bangladesh retail
         */
        readonly POS: "pos";
        /**
         * Wearable - Smart watches, fitness trackers
         */
        readonly WEARABLE: "wearable";
        /**
         * Automotive - Car infotainment systems
         */
        readonly AUTOMOTIVE: "automotive";
        /**
         * Unknown - Cannot be determined
         */
        readonly UNKNOWN: "unknown";
    };
    readonly TRUST_LEVELS: {
        /**
         * Trusted device - Known, verified device
         */
        readonly TRUSTED: "trusted";
        /**
         * Suspicious device - Potential security risk
         */
        readonly SUSPICIOUS: "suspicious";
        /**
         * Blocked device - Blocked due to security violations
         */
        readonly BLOCKED: "blocked";
        /**
         * Unknown device - New or unrecognized device
         */
        readonly UNKNOWN: "unknown";
        /**
         * Untrusted device - Low trust level, requires verification
         */
        readonly UNTRUSTED: "untrusted";
        /**
         * Verified device - Verified through MFA
         */
        readonly VERIFIED: "verified";
        /**
         * Compromised device - Potentially compromised
         */
        readonly COMPROMISED: "compromised";
    };
    readonly FINGERPRINT_COMPONENTS: {
        /**
         * User agent string
         */
        readonly USER_AGENT: "user_agent";
        /**
         * IP address
         */
        readonly IP_ADDRESS: "ip_address";
        /**
         * Screen resolution
         */
        readonly SCREEN_RESOLUTION: "screen_resolution";
        /**
         * Timezone offset
         */
        readonly TIMEZONE_OFFSET: "timezone_offset";
        /**
         * Language settings
         */
        readonly LANGUAGE: "language";
        /**
         * Platform information
         */
        readonly PLATFORM: "platform";
        /**
         * Device memory
         */
        readonly DEVICE_MEMORY: "device_memory";
        /**
         * Hardware concurrency
         */
        readonly HARDWARE_CONCURRENCY: "hardware_concurrency";
        /**
         * WebGL vendor
         */
        readonly WEBGL_VENDOR: "webgl_vendor";
        /**
         * WebGL renderer
         */
        readonly WEBGL_RENDERER: "webgl_renderer";
        /**
         * Audio context fingerprint
         */
        readonly AUDIO_FINGERPRINT: "audio_fingerprint";
        /**
         * Canvas fingerprint
         */
        readonly CANVAS_FINGERPRINT: "canvas_fingerprint";
        /**
         * Fonts list
         */
        readonly FONTS_LIST: "fonts_list";
        /**
         * Touch support
         */
        readonly TOUCH_SUPPORT: "touch_support";
        /**
         * Cookies enabled
         */
        readonly COOKIES_ENABLED: "cookies_enabled";
        /**
         * Battery status
         */
        readonly BATTERY_STATUS: "battery_status";
        /**
         * Device orientation
         */
        readonly DEVICE_ORIENTATION: "device_orientation";
        /**
         * Network information
         */
        readonly NETWORK_INFORMATION: "network_information";
        /**
         * Browser plugins
         */
        readonly BROWSER_PLUGINS: "browser_plugins";
        /**
         * Do Not Track status
         */
        readonly DNT_STATUS: "dnt_status";
        /**
         * Connection type
         */
        readonly CONNECTION_TYPE: "connection_type";
    };
    readonly OS: {
        readonly WINDOWS: "windows";
        readonly MACOS: "macos";
        readonly LINUX: "linux";
        readonly IOS: "ios";
        readonly ANDROID: "android";
        readonly CHROME_OS: "chrome_os";
        readonly TIZEN: "tizen";
        readonly WEBOS: "webos";
        readonly KAIOS: "kaios";
        readonly FREERTOS: "freertos";
        readonly WINDOWS_PHONE: "windows_phone";
        readonly FIRE_OS: "fire_os";
        readonly HARMONY_OS: "harmony_os";
        readonly MEEGO: "meego";
        readonly SYMBIAN: "symbian";
        readonly BLACKBERRY: "blackberry";
        readonly UNKNOWN: "unknown";
    };
    readonly BROWSERS: {
        readonly CHROME: "chrome";
        readonly FIREFOX: "firefox";
        readonly SAFARI: "safari";
        readonly EDGE: "edge";
        readonly OPERA: "opera";
        readonly BRAVE: "brave";
        readonly VIVALDI: "vivaldi";
        readonly SAMSUNG_INTERNET: "samsung_internet";
        readonly UC_BROWSER: "uc_browser";
        readonly OPERA_MINI: "opera_mini";
        readonly NOKIA_BROWSER: "nokia_browser";
        readonly KAIOS_BROWSER: "kaios_browser";
        readonly WEBVIEW: "webview";
        readonly UNKNOWN: "unknown";
    };
    readonly VENDORS: {
        readonly APPLE: "apple";
        readonly SAMSUNG: "samsung";
        readonly HUAWEI: "huawei";
        readonly XIAOMI: "xiaomi";
        readonly OPPO: "oppo";
        readonly VIVO: "vivo";
        readonly REALME: "realme";
        readonly ONEPLUS: "oneplus";
        readonly NOKIA: "nokia";
        readonly SYMPHONY: "symphony";
        readonly WALTON: "walton";
        readonly TRANSSION: "transsion";
        readonly LENOVO: "lenovo";
        readonly DELL: "dell";
        readonly HP: "hp";
        readonly ASUS: "asus";
        readonly ACER: "acer";
        readonly MICROSOFT: "microsoft";
        readonly GOOGLE: "google";
        readonly SONY: "sony";
        readonly LG: "lg";
        readonly PANASONIC: "panasonic";
        readonly UNKNOWN: "unknown";
    };
    readonly ORIENTATIONS: {
        readonly PORTRAIT: "portrait";
        readonly LANDSCAPE: "landscape";
        readonly SQUARE: "square";
        readonly UNKNOWN: "unknown";
    };
    readonly CONNECTION_TYPES: {
        readonly WIFI: "wifi";
        readonly CELLULAR: "cellular";
        readonly BLUETOOTH: "bluetooth";
        readonly ETHERNET: "ethernet";
        readonly VPN: "vpn";
        readonly PROXY: "proxy";
        readonly UNKNOWN: "unknown";
    };
    readonly CONFIG: {
        /**
         * Maximum number of devices per user
         */
        readonly MAX_DEVICES_PER_USER: 10;
        /**
         * Device trust duration in days for trusted devices
         */
        readonly TRUST_DURATION_DAYS: 30;
        /**
         * Device verification expiry in minutes
         */
        readonly VERIFICATION_EXPIRY_MINUTES: 15;
        /**
         * Whether to require device verification for new devices
         */
        readonly REQUIRE_VERIFICATION_FOR_NEW_DEVICES: true;
        /**
         * Whether to allow trusted devices to bypass MFA
         */
        readonly ALLOW_TRUSTED_DEVICES_BYPASS_MFA: false;
        /**
         * Whether to track device location
         */
        readonly TRACK_LOCATION: true;
        /**
         * Whether to enable device fingerprinting
         */
        readonly ENABLE_FINGERPRINTING: true;
        /**
         * Fingerprint confidence threshold (0-1)
         */
        readonly FINGERPRINT_CONFIDENCE_THRESHOLD: 0.7;
        /**
         * Suspicious activity threshold before blocking
         */
        readonly SUSPICIOUS_ACTIVITY_THRESHOLD: 3;
        /**
         * Device blocking duration in minutes
         */
        readonly BLOCK_DURATION_MINUTES: 60;
        /**
         * Whether to auto-block suspicious devices
         */
        readonly AUTO_BLOCK_SUSPICIOUS_DEVICES: true;
        /**
         * Whether to notify users of new device logins
         */
        readonly NOTIFY_NEW_DEVICE_LOGIN: true;
        /**
         * Whether to notify users of suspicious device activity
         */
        readonly NOTIFY_SUSPICIOUS_ACTIVITY: true;
    };
    readonly STATUS: {
        readonly ACTIVE: "active";
        readonly INACTIVE: "inactive";
        readonly SUSPENDED: "suspended";
        readonly BLOCKED: "blocked";
        readonly VERIFIED: "verified";
        readonly PENDING_VERIFICATION: "pending_verification";
        readonly EXPIRED: "expired";
    };
    readonly EVENTS: {
        readonly DEVICE_REGISTERED: "device.registered";
        readonly DEVICE_VERIFIED: "device.verified";
        readonly DEVICE_TRUSTED: "device.trusted";
        readonly DEVICE_UNTRUSTED: "device.untrusted";
        readonly DEVICE_BLOCKED: "device.blocked";
        readonly DEVICE_UNBLOCKED: "device.unblocked";
        readonly DEVICE_SUSPECTED: "device.suspected";
        readonly DEVICE_REMOVED: "device.removed";
        readonly DEVICE_FINGERPRINT_GENERATED: "device.fingerprint.generated";
        readonly DEVICE_FINGERPRINT_MISMATCH: "device.fingerprint.mismatch";
        readonly DEVICE_VERIFICATION_ATTEMPT: "device.verification.attempt";
        readonly DEVICE_VERIFICATION_SUCCESS: "device.verification.success";
        readonly DEVICE_VERIFICATION_FAILURE: "device.verification.failure";
        readonly DEVICE_TOKEN_GENERATED: "device.token.generated";
        readonly DEVICE_TOKEN_USED: "device.token.used";
        readonly DEVICE_TOKEN_EXPIRED: "device.token.expired";
    };
    readonly ERROR_MESSAGES: {
        readonly DEVICE_NOT_FOUND: "Device not found";
        readonly DEVICE_BLOCKED: "Device is blocked";
        readonly DEVICE_SUSPICIOUS: "Device is flagged as suspicious";
        readonly DEVICE_UNTRUSTED: "Device is not trusted";
        readonly DEVICE_NOT_VERIFIED: "Device is not verified";
        readonly DEVICE_VERIFICATION_FAILED: "Device verification failed";
        readonly DEVICE_FINGERPRINT_MISMATCH: "Device fingerprint mismatch";
        readonly DEVICE_LIMIT_EXCEEDED: "Maximum devices per user exceeded";
        readonly DEVICE_TOKEN_INVALID: "Invalid device verification token";
        readonly DEVICE_TOKEN_EXPIRED: "Device verification token expired";
        readonly DEVICE_VERIFICATION_REQUIRED: "Device verification required";
        readonly DEVICE_REGISTRATION_FAILED: "Device registration failed";
        readonly DEVICE_UPDATE_FAILED: "Device update failed";
        readonly DEVICE_REMOVAL_FAILED: "Device removal failed";
        readonly DEVICE_TYPE_UNSUPPORTED: "Device type not supported";
        readonly DEVICE_LOCATION_BLOCKED: "Device location is blocked";
    };
    readonly SUCCESS_MESSAGES: {
        readonly DEVICE_REGISTERED: "Device registered successfully";
        readonly DEVICE_VERIFIED: "Device verified successfully";
        readonly DEVICE_TRUSTED: "Device trusted successfully";
        readonly DEVICE_UNBLOCKED: "Device unblocked successfully";
        readonly DEVICE_REMOVED: "Device removed successfully";
        readonly DEVICE_TOKEN_GENERATED: "Device verification token generated";
        readonly DEVICE_FINGERPRINT_GENERATED: "Device fingerprint generated";
    };
    readonly UTILS: {
        /**
         * Get device type from user agent
         */
        readonly getDeviceTypeFromUserAgent: (userAgent: string) => DeviceType;
        /**
         * Get device vendor from user agent
         */
        readonly getDeviceVendor: (userAgent: string) => DeviceVendor;
        /**
         * Get device OS from user agent
         */
        readonly getDeviceOS: (userAgent: string) => DeviceOS;
        /**
         * Get device browser from user agent
         */
        readonly getDeviceBrowser: (userAgent: string) => DeviceBrowser;
        /**
         * Get device trust level based on factors
         */
        readonly getTrustLevel: (device: Partial<Device>) => DeviceTrustLevel;
        /**
         * Check if device is considered trusted
         */
        readonly isDeviceTrusted: (device: Partial<Device>) => boolean;
        /**
         * Check if device is suspicious
         */
        readonly isDeviceSuspicious: (device: Partial<Device>) => boolean;
        /**
         * Check if device is blocked
         */
        readonly isDeviceBlocked: (device: Partial<Device>) => boolean;
        /**
         * Get display name for device type
         */
        readonly getDeviceTypeDisplayName: (type: DeviceType) => string;
        /**
         * Get display name for trust level
         */
        readonly getTrustLevelDisplayName: (level: DeviceTrustLevel) => string;
        /**
         * Get color for trust level
         */
        readonly getTrustLevelColor: (level: DeviceTrustLevel) => string;
    };
};
/**
 * All device constants for export
 */
export declare const ALL_DEVICE_CONSTANTS: {
    readonly DEVICE_REGISTERED: "Device registered successfully";
    readonly DEVICE_VERIFIED: "Device verified successfully";
    readonly DEVICE_TRUSTED: "Device trusted successfully";
    readonly DEVICE_UNBLOCKED: "Device unblocked successfully";
    readonly DEVICE_REMOVED: "Device removed successfully";
    readonly DEVICE_TOKEN_GENERATED: "Device verification token generated";
    readonly DEVICE_FINGERPRINT_GENERATED: "Device fingerprint generated";
    readonly DEVICE_NOT_FOUND: "Device not found";
    readonly DEVICE_BLOCKED: "Device is blocked";
    readonly DEVICE_SUSPICIOUS: "Device is flagged as suspicious";
    readonly DEVICE_UNTRUSTED: "Device is not trusted";
    readonly DEVICE_NOT_VERIFIED: "Device is not verified";
    readonly DEVICE_VERIFICATION_FAILED: "Device verification failed";
    readonly DEVICE_FINGERPRINT_MISMATCH: "Device fingerprint mismatch";
    readonly DEVICE_LIMIT_EXCEEDED: "Maximum devices per user exceeded";
    readonly DEVICE_TOKEN_INVALID: "Invalid device verification token";
    readonly DEVICE_TOKEN_EXPIRED: "Device verification token expired";
    readonly DEVICE_VERIFICATION_REQUIRED: "Device verification required";
    readonly DEVICE_REGISTRATION_FAILED: "Device registration failed";
    readonly DEVICE_UPDATE_FAILED: "Device update failed";
    readonly DEVICE_REMOVAL_FAILED: "Device removal failed";
    readonly DEVICE_TYPE_UNSUPPORTED: "Device type not supported";
    readonly DEVICE_LOCATION_BLOCKED: "Device location is blocked";
    readonly DEVICE_SUSPECTED: "device.suspected";
    readonly DEVICE_VERIFICATION_ATTEMPT: "device.verification.attempt";
    readonly DEVICE_VERIFICATION_SUCCESS: "device.verification.success";
    readonly DEVICE_VERIFICATION_FAILURE: "device.verification.failure";
    readonly DEVICE_TOKEN_USED: "device.token.used";
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly SUSPENDED: "suspended";
    readonly BLOCKED: "blocked";
    readonly VERIFIED: "verified";
    readonly PENDING_VERIFICATION: "pending_verification";
    readonly EXPIRED: "expired";
    /**
     * Maximum number of devices per user
     */
    readonly MAX_DEVICES_PER_USER: 10;
    /**
     * Device trust duration in days for trusted devices
     */
    readonly TRUST_DURATION_DAYS: 30;
    /**
     * Device verification expiry in minutes
     */
    readonly VERIFICATION_EXPIRY_MINUTES: 15;
    /**
     * Whether to require device verification for new devices
     */
    readonly REQUIRE_VERIFICATION_FOR_NEW_DEVICES: true;
    /**
     * Whether to allow trusted devices to bypass MFA
     */
    readonly ALLOW_TRUSTED_DEVICES_BYPASS_MFA: false;
    /**
     * Whether to track device location
     */
    readonly TRACK_LOCATION: true;
    /**
     * Whether to enable device fingerprinting
     */
    readonly ENABLE_FINGERPRINTING: true;
    /**
     * Fingerprint confidence threshold (0-1)
     */
    readonly FINGERPRINT_CONFIDENCE_THRESHOLD: 0.7;
    /**
     * Suspicious activity threshold before blocking
     */
    readonly SUSPICIOUS_ACTIVITY_THRESHOLD: 3;
    /**
     * Device blocking duration in minutes
     */
    readonly BLOCK_DURATION_MINUTES: 60;
    /**
     * Whether to auto-block suspicious devices
     */
    readonly AUTO_BLOCK_SUSPICIOUS_DEVICES: true;
    /**
     * Whether to notify users of new device logins
     */
    readonly NOTIFY_NEW_DEVICE_LOGIN: true;
    /**
     * Whether to notify users of suspicious device activity
     */
    readonly NOTIFY_SUSPICIOUS_ACTIVITY: true;
    readonly WIFI: "wifi";
    readonly CELLULAR: "cellular";
    readonly BLUETOOTH: "bluetooth";
    readonly ETHERNET: "ethernet";
    readonly VPN: "vpn";
    readonly PROXY: "proxy";
    readonly UNKNOWN: "unknown";
    readonly PORTRAIT: "portrait";
    readonly LANDSCAPE: "landscape";
    readonly SQUARE: "square";
    readonly APPLE: "apple";
    readonly SAMSUNG: "samsung";
    readonly HUAWEI: "huawei";
    readonly XIAOMI: "xiaomi";
    readonly OPPO: "oppo";
    readonly VIVO: "vivo";
    readonly REALME: "realme";
    readonly ONEPLUS: "oneplus";
    readonly NOKIA: "nokia";
    readonly SYMPHONY: "symphony";
    readonly WALTON: "walton";
    readonly TRANSSION: "transsion";
    readonly LENOVO: "lenovo";
    readonly DELL: "dell";
    readonly HP: "hp";
    readonly ASUS: "asus";
    readonly ACER: "acer";
    readonly MICROSOFT: "microsoft";
    readonly GOOGLE: "google";
    readonly SONY: "sony";
    readonly LG: "lg";
    readonly PANASONIC: "panasonic";
    readonly CHROME: "chrome";
    readonly FIREFOX: "firefox";
    readonly SAFARI: "safari";
    readonly EDGE: "edge";
    readonly OPERA: "opera";
    readonly BRAVE: "brave";
    readonly VIVALDI: "vivaldi";
    readonly SAMSUNG_INTERNET: "samsung_internet";
    readonly UC_BROWSER: "uc_browser";
    readonly OPERA_MINI: "opera_mini";
    readonly NOKIA_BROWSER: "nokia_browser";
    readonly KAIOS_BROWSER: "kaios_browser";
    readonly WEBVIEW: "webview";
    readonly WINDOWS: "windows";
    readonly MACOS: "macos";
    readonly LINUX: "linux";
    readonly IOS: "ios";
    readonly ANDROID: "android";
    readonly CHROME_OS: "chrome_os";
    readonly TIZEN: "tizen";
    readonly WEBOS: "webos";
    readonly KAIOS: "kaios";
    readonly FREERTOS: "freertos";
    readonly WINDOWS_PHONE: "windows_phone";
    readonly FIRE_OS: "fire_os";
    readonly HARMONY_OS: "harmony_os";
    readonly MEEGO: "meego";
    readonly SYMBIAN: "symbian";
    readonly BLACKBERRY: "blackberry";
    /**
     * User agent string
     */
    readonly USER_AGENT: "user_agent";
    /**
     * IP address
     */
    readonly IP_ADDRESS: "ip_address";
    /**
     * Screen resolution
     */
    readonly SCREEN_RESOLUTION: "screen_resolution";
    /**
     * Timezone offset
     */
    readonly TIMEZONE_OFFSET: "timezone_offset";
    /**
     * Language settings
     */
    readonly LANGUAGE: "language";
    /**
     * Platform information
     */
    readonly PLATFORM: "platform";
    /**
     * Device memory
     */
    readonly DEVICE_MEMORY: "device_memory";
    /**
     * Hardware concurrency
     */
    readonly HARDWARE_CONCURRENCY: "hardware_concurrency";
    /**
     * WebGL vendor
     */
    readonly WEBGL_VENDOR: "webgl_vendor";
    /**
     * WebGL renderer
     */
    readonly WEBGL_RENDERER: "webgl_renderer";
    /**
     * Audio context fingerprint
     */
    readonly AUDIO_FINGERPRINT: "audio_fingerprint";
    /**
     * Canvas fingerprint
     */
    readonly CANVAS_FINGERPRINT: "canvas_fingerprint";
    /**
     * Fonts list
     */
    readonly FONTS_LIST: "fonts_list";
    /**
     * Touch support
     */
    readonly TOUCH_SUPPORT: "touch_support";
    /**
     * Cookies enabled
     */
    readonly COOKIES_ENABLED: "cookies_enabled";
    /**
     * Battery status
     */
    readonly BATTERY_STATUS: "battery_status";
    /**
     * Device orientation
     */
    readonly DEVICE_ORIENTATION: "device_orientation";
    /**
     * Network information
     */
    readonly NETWORK_INFORMATION: "network_information";
    /**
     * Browser plugins
     */
    readonly BROWSER_PLUGINS: "browser_plugins";
    /**
     * Do Not Track status
     */
    readonly DNT_STATUS: "dnt_status";
    /**
     * Connection type
     */
    readonly CONNECTION_TYPE: "connection_type";
    /**
     * Trusted device - Known, verified device
     */
    readonly TRUSTED: "trusted";
    /**
     * Suspicious device - Potential security risk
     */
    readonly SUSPICIOUS: "suspicious";
    /**
     * Untrusted device - Low trust level, requires verification
     */
    readonly UNTRUSTED: "untrusted";
    /**
     * Compromised device - Potentially compromised
     */
    readonly COMPROMISED: "compromised";
    /**
     * Desktop computer - Laptop, PC, workstation
     */
    readonly DESKTOP: "desktop";
    /**
     * Mobile phone - Smartphone, mobile device
     */
    readonly MOBILE: "mobile";
    /**
     * Feature phone - Basic phone with limited capabilities
     * Common in Bangladesh market
     */
    readonly FEATURE_PHONE: "feature_phone";
    /**
     * Tablet device - iPad, Android tablet
     */
    readonly TABLET: "tablet";
    /**
     * Smart TV - Connected TV, streaming devices
     */
    readonly SMART_TV: "smart_tv";
    /**
     * Gaming console - PlayStation, Xbox, Nintendo
     */
    readonly GAMING_CONSOLE: "gaming_console";
    /**
     * IoT device - Smart home devices, sensors
     */
    readonly IOT: "iot";
    /**
     * Kiosk - Self-service kiosks, public terminals
     * Common in Bangladesh for banking, government services
     */
    readonly KIOSK: "kiosk";
    /**
     * POS device - Point of sale terminals
     * Common in Bangladesh retail
     */
    readonly POS: "pos";
    /**
     * Wearable - Smart watches, fitness trackers
     */
    readonly WEARABLE: "wearable";
    /**
     * Automotive - Car infotainment systems
     */
    readonly AUTOMOTIVE: "automotive";
};
//# sourceMappingURL=device.constants.d.ts.map