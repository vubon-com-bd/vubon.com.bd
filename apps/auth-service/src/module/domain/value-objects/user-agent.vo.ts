/**
 * User Agent Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/user-agent.vo
 * 
 * @description
 * Represents a User-Agent string with parsed browser, OS, device, and bot detection.
 * Used for device fingerprinting, analytics, security monitoring, and UX optimization.
 * 
 * Enterprise Rules:
 * ✅ Immutable - User Agent never changes after creation
 * ✅ Self-validating - Validates format and length
 * ✅ Framework-free - No external parsing libraries
 * ✅ Domain-safe - Pattern matching only, no external APIs
 * ✅ Bangladesh specific - Local browser detection
 * 
 * @example
 * const ua = new UserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
 * console.log(ua.getBrowser()); // { name: 'Chrome', version: '120.0.0.0' }
 * console.log(ua.getOS()); // { name: 'Windows', version: '10.0' }
 * console.log(ua.getDeviceType()); // 'desktop'
 */

import { ValueObject } from './base.vo';

// ==================== Types ====================

/**
 * Browser information
 */
export interface BrowserInfo {
  name: string;
  version: string;
  engine: string; // Blink, Gecko, WebKit, Trident
  isMobile?: boolean;
}

/**
 * OS information
 */
export interface OSInfo {
  name: string;
  version: string;
  platform: 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'other';
}

/**
 * Device type
 */
export enum DeviceType {
  DESKTOP = 'desktop',
  LAPTOP = 'laptop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
  TV = 'tv',
  CONSOLE = 'console',
  WEARABLE = 'wearable',
  FEATURE_PHONE = 'feature_phone',
  UNKNOWN = 'unknown',
}

/**
 * Browser category
 */
export enum BrowserCategory {
  MODERN = 'modern',      // Supports modern web features
  LEGACY = 'legacy',      // Older browser with limitations
  BOT = 'bot',            // Search engine bot
  HEADLESS = 'headless',  // Headless browser
  UNKNOWN = 'unknown',
}

/**
 * User Agent validation result
 */
export interface UserAgentValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

// ==================== Constants ====================

/**
 * Browser patterns (order matters!)
 */
const BROWSER_PATTERNS: Array<{ name: string; pattern: RegExp; engine: string }> = [
  // Modern browsers
  { name: 'Edge', pattern: /Edg\/(\d+\.\d+\.\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Edge Legacy', pattern: /Edge\/(\d+\.\d+)/i, engine: 'EdgeHTML' },
  { name: 'Chrome', pattern: /Chrome\/(\d+\.\d+\.\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Firefox', pattern: /Firefox\/(\d+\.\d+)/i, engine: 'Gecko' },
  { name: 'Safari', pattern: /Version\/(\d+\.\d+).*Safari\//i, engine: 'WebKit' },
  { name: 'Safari', pattern: /Safari\/(\d+\.\d+)/i, engine: 'WebKit' },
  { name: 'Opera', pattern: /OPR\/(\d+\.\d+\.\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Opera', pattern: /Opera\/(\d+\.\d+)/i, engine: 'Blink' },
  { name: 'IE', pattern: /MSIE (\d+\.\d+)/i, engine: 'Trident' },
  { name: 'IE', pattern: /Trident\/.*rv:(\d+\.\d+)/i, engine: 'Trident' },
  
  // Bangladesh specific browsers
  { name: 'UC Browser', pattern: /UCBrowser\/(\d+\.\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Samsung Browser', pattern: /SamsungBrowser\/(\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Opera Mini', pattern: /Opera Mini\/(\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Mi Browser', pattern: /MiuiBrowser\/(\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Vivo Browser', pattern: /VivoBrowser\/(\d+\.\d+)/i, engine: 'Blink' },
  { name: 'Oppo Browser', pattern: /OppoBrowser\/(\d+\.\d+)/i, engine: 'Blink' },
];

/**
 * OS patterns
 */
const OS_PATTERNS: Array<{ name: string; pattern: RegExp; platform: OSInfo['platform'] }> = [
  { name: 'Windows', pattern: /Windows NT (\d+\.\d+)/i, platform: 'windows' },
  { name: 'macOS', pattern: /Mac OS X (\d+[._]\d+)/i, platform: 'mac' },
  { name: 'iOS', pattern: /iPhone OS (\d+[._]\d+)/i, platform: 'ios' },
  { name: 'iOS', pattern: /iPad; CPU OS (\d+[._]\d+)/i, platform: 'ios' },
  { name: 'Android', pattern: /Android (\d+\.\d+)/i, platform: 'android' },
  { name: 'Linux', pattern: /Linux/i, platform: 'linux' },
  { name: 'Chrome OS', pattern: /CrOS/i, platform: 'other' },
  { name: 'HarmonyOS', pattern: /HarmonyOS/i, platform: 'other' },
  { name: 'KaiOS', pattern: /KaiOS/i, platform: 'other' },
];

/**
 * Device type patterns
 */
const DEVICE_PATTERNS: Array<{ type: DeviceType; pattern: RegExp }> = [
  { type: DeviceType.MOBILE, pattern: /Mobile|iPhone|Android.*Mobile/i },
  { type: DeviceType.TABLET, pattern: /Tablet|iPad|Android(?!.*Mobile)/i },
  { type: DeviceType.TV, pattern: /TV|SmartTV|AppleTV|Android TV|Roku/i },
  { type: DeviceType.CONSOLE, pattern: /PlayStation|Xbox|Nintendo|PS[4-5]/i },
  { type: DeviceType.WEARABLE, pattern: /Watch|Wearable|Glass|Galaxy Watch/i },
  { type: DeviceType.FEATURE_PHONE, pattern: /Feature Phone|Nokia|JioPhone|KaiOS/i },
];

/**
 * Bot/Crawler patterns (comprehensive)
 */
const BOT_PATTERNS = [
  // Search engines
  /Googlebot/i, /Bingbot/i, /Slurp/i, /DuckDuckBot/i, /Baiduspider/i,
  /YandexBot/i, /Sogou/i, /Exabot/i, /facebookexternalhit/i, /Facebot/i,
  /Twitterbot/i, /LinkedInBot/i, /Pinterestbot/i, /Discordbot/i,
  /TelegramBot/i, /WhatsApp/i, /Slackbot/i,
  
  // SEO tools
  /AhrefsBot/i, /SemrushBot/i, /MJ12bot/i, /DotBot/i, /rogerbot/i,
  /BLEXBot/i, /DataForSeoBot/i, /SeznamBot/i, /Mozbot/i,
  
  // Monitoring
  /Pingdom/i, /UptimeRobot/i, /NewRelic/i, /Datadog/i, /SiteUptime/i,
  
  // Headless browsers
  /Headless/i, /Puppeteer/i, /Playwright/i, /PhantomJS/i, /SlimerJS/i,
  
  // Automation
  /Selenium/i, /WebDriver/i, /Cypress/i, /TestCafe/i, /Nightwatch/i,
  
  // Scrapers
  /scraper/i, /crawler/i, /spider/i, /bot/i, /crawl/i,
];

/**
 * Suspicious patterns (for security)
 */
const SUSPICIOUS_PATTERNS = [
  'sqlmap', 'nikto', 'nmap', 'dirbuster', 'gobuster',
  'wfuzz', 'hydra', 'medusa', 'masscan', 'zmap',
  'nessus', 'openvas', 'burp', 'zap', 'acunetix',
];

// ==================== User Agent Value Object ====================

/**
 * User Agent Value Object
 * 
 * Represents a parsed and analyzed user agent string
 */
export class UserAgent extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _browser: BrowserInfo;
  private readonly _os: OSInfo;
  private readonly _deviceType: DeviceType;
  private readonly _isBot: boolean;
  private readonly _isHeadless: boolean;
  private readonly _isAutomation: boolean;
  private readonly _isSuspicious: boolean;

  /**
   * Creates a new User Agent value object
   * 
   * @param userAgent - Raw user agent string
   * @throws {Error} If user agent is invalid
   */
  constructor(userAgent: string) {
    super();
    
    const validation = UserAgent.validate(userAgent);
    if (!validation.isValid) {
      throw new Error(`Invalid user agent: ${validation.error}`);
    }
    
    this._value = userAgent;
    this._normalized = validation.normalized!;
    this._browser = this.parseBrowser(userAgent);
    this._os = this.parseOS(userAgent);
    this._deviceType = this.parseDeviceType(userAgent);
    this._isBot = this.isBot(userAgent);
    this._isHeadless = this.isHeadless(userAgent);
    this._isAutomation = this.isAutomation(userAgent);
    this._isSuspicious = this.isSuspicious(userAgent);
    
    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('User agent cannot be empty');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating UserAgent from known valid value
   */
  public static fromValid(userAgent: string): UserAgent {
    return new UserAgent(userAgent);
  }

  /**
   * Creates a UserAgent from unknown input (safe parsing)
   */
  public static tryCreate(userAgent: unknown): UserAgent | null {
    if (typeof userAgent !== 'string') {
      return null;
    }
    
    try {
      return new UserAgent(userAgent);
    } catch {
      return null;
    }
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates a user agent string
   */
  public static validate(userAgent: string): UserAgentValidation {
    if (!userAgent || typeof userAgent !== 'string') {
      return {
        isValid: false,
        error: 'User agent cannot be null or undefined',
      };
    }

    const trimmed = userAgent.trim();
    
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'User agent cannot be empty',
      };
    }
    
    if (trimmed.length > 2000) {
      return {
        isValid: false,
        error: 'User agent too long (max 2000 characters)',
      };
    }

    // Normalize: trim and replace multiple spaces
    const normalized = trimmed.replace(/\s+/g, ' ');

    return {
      isValid: true,
      normalized,
      error: undefined,
    };
  }

  // ============================================================
  // Parsing Methods
  // ============================================================

  /**
   * Parse browser from user agent
   */
  private parseBrowser(ua: string): BrowserInfo {
    for (const browser of BROWSER_PATTERNS) {
      const match = ua.match(browser.pattern);
      if (match) {
        return {
          name: browser.name,
          version: match[1] || 'unknown',
          engine: browser.engine,
          isMobile: /Mobile/i.test(ua),
        };
      }
    }
    
    return {
      name: 'Unknown',
      version: 'unknown',
      engine: 'unknown',
      isMobile: /Mobile/i.test(ua),
    };
  }

  /**
   * Parse OS from user agent
   */
  private parseOS(ua: string): OSInfo {
    for (const os of OS_PATTERNS) {
      const match = ua.match(os.pattern);
      if (match) {
        let version = match[1] || 'unknown';
        // Normalize macOS version (10_15_7 -> 10.15.7)
        if (os.name === 'macOS' && version.includes('_')) {
          version = version.replace(/_/g, '.');
        }
        // Normalize iOS version (15_0 -> 15.0)
        if (os.name === 'iOS' && version.includes('_')) {
          version = version.replace(/_/g, '.');
        }
        return {
          name: os.name,
          version,
          platform: os.platform,
        };
      }
    }
    
    return {
      name: 'Unknown',
      version: 'unknown',
      platform: 'other',
    };
  }

  /**
   * Parse device type from user agent
   */
  private parseDeviceType(ua: string): DeviceType {
    for (const device of DEVICE_PATTERNS) {
      if (device.pattern.test(ua)) {
        return device.type;
      }
    }
    return DeviceType.DESKTOP;
  }

  /**
   * Check if user agent is a bot/crawler
   */
  private isBot(ua: string): boolean {
    return BOT_PATTERNS.some(pattern => pattern.test(ua));
  }

  /**
   * Check if user agent is headless browser
   */
  private isHeadless(ua: string): boolean {
    const headlessPatterns = [
      /Headless/i, /Puppeteer/i, /Playwright/i, /PhantomJS/i,
    ];
    return headlessPatterns.some(pattern => pattern.test(ua));
  }

  /**
   * Check if user agent is automation tool
   */
  private isAutomation(ua: string): boolean {
    const automationPatterns = [
      /Selenium/i, /WebDriver/i, /Cypress/i, /TestCafe/i,
    ];
    return automationPatterns.some(pattern => pattern.test(ua));
  }

  /**
   * Check if user agent is suspicious (security)
   */
  private isSuspicious(ua: string): boolean {
    const lowerUA = ua.toLowerCase();
    return SUSPICIOUS_PATTERNS.some(pattern => lowerUA.includes(pattern));
  }

  // ============================================================
  // Getters
  // ============================================================

  /**
   * Get raw user agent string
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get normalized user agent
   */
  public getNormalized(): string {
    return this._normalized;
  }

  /**
   * Get browser information
   */
  public getBrowser(): BrowserInfo {
    return { ...this._browser };
  }

  /**
   * Get browser name
   */
  public getBrowserName(): string {
    return this._browser.name;
  }

  /**
   * Get browser version
   */
  public getBrowserVersion(): string {
    return this._browser.version;
  }

  /**
   * Get browser engine
   */
  public getBrowserEngine(): string {
    return this._browser.engine;
  }

  /**
   * Get OS information
   */
  public getOS(): OSInfo {
    return { ...this._os };
  }

  /**
   * Get OS name
   */
  public getOSName(): string {
    return this._os.name;
  }

  /**
   * Get OS version
   */
  public getOSVersion(): string {
    return this._os.version;
  }

  /**
   * Get device type
   */
  public getDeviceType(): DeviceType {
    return this._deviceType;
  }

  // ============================================================
  // Type Checks
  // ============================================================

  /**
   * Check if device is mobile
   */
  public isMobile(): boolean {
    return this._deviceType === DeviceType.MOBILE || 
           this._deviceType === DeviceType.FEATURE_PHONE;
  }

  /**
   * Check if device is tablet
   */
  public isTablet(): boolean {
    return this._deviceType === DeviceType.TABLET;
  }

  /**
   * Check if device is desktop/laptop
   */
  public isDesktop(): boolean {
    return this._deviceType === DeviceType.DESKTOP || 
           this._deviceType === DeviceType.LAPTOP;
  }

  /**
   * Check if device is feature phone (Bangladesh specific)
   */
  public isFeaturePhone(): boolean {
    return this._deviceType === DeviceType.FEATURE_PHONE;
  }

  /**
   * Check if user agent is a bot
   */
  public isBot(): boolean {
    return this._isBot;
  }

  /**
   * Check if user agent is headless browser
   */
  public isHeadless(): boolean {
    return this._isHeadless;
  }

  /**
   * Check if user agent is automation tool
   */
  public isAutomation(): boolean {
    return this._isAutomation;
  }

  /**
   * Check if user agent is suspicious
   */
  public isSuspicious(): boolean {
    return this._isSuspicious;
  }

  /**
   * Check if this is a real user (not bot/automation)
   */
  public isRealUser(): boolean {
    return !this._isBot && !this._isHeadless && !this._isAutomation;
  }

  // ============================================================
  // Category & Capability
  // ============================================================

  /**
   * Get browser category
   */
  public getCategory(): BrowserCategory {
    if (this._isBot) return BrowserCategory.BOT;
    if (this._isHeadless) return BrowserCategory.HEADLESS;
    
    // Check for legacy browsers
    const legacyBrowsers = ['IE', 'Edge Legacy'];
    if (legacyBrowsers.includes(this._browser.name)) {
      return BrowserCategory.LEGACY;
    }
    
    return BrowserCategory.MODERN;
  }

  /**
   * Check if browser supports modern web features
   */
  public supportsModernFeatures(): boolean {
    return this.getCategory() === BrowserCategory.MODERN;
  }

  /**
   * Check if browser supports WebAuthn (for biometric MFA)
   */
  public supportsWebAuthn(): boolean {
    const modernBrowsers = ['Chrome', 'Firefox', 'Edge', 'Safari', 'Opera'];
    const modernVersions = {
      'Chrome': 67,
      'Firefox': 60,
      'Edge': 79,
      'Safari': 13,
      'Opera': 54,
    };
    
    const version = parseInt(this._browser.version, 10);
    const minVersion = modernVersions[this._browser.name as keyof typeof modernVersions];
    
    return modernBrowsers.includes(this._browser.name) && 
           !isNaN(version) && 
           minVersion !== undefined && 
           version >= minVersion;
  }

  /**
   * Check if browser supports localStorage
   */
  public supportsLocalStorage(): boolean {
    // All modern browsers support localStorage
    return this.getCategory() === BrowserCategory.MODERN;
  }

  // ============================================================
  // Fingerprinting
  // ============================================================

  /**
   * Get fingerprint components (for device fingerprinting)
   */
  public getFingerprintComponents(): Record<string, string> {
    return {
      browserName: this._browser.name,
      browserVersion: this._browser.version,
      browserEngine: this._browser.engine,
      osName: this._os.name,
      osVersion: this._os.version,
      deviceType: this._deviceType,
      isMobile: String(this.isMobile()),
    };
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Check if user agent is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || 
           this._value === 'unknown' ||
           this._value === 'Mozilla/5.0';
  }

  /**
   * Get equality components for parent class comparison
   * Uses normalized value for consistent comparison
   */
  protected getEqualityComponents(): readonly unknown[] {
    return [this._normalized];
  }

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    return {
      normalized: this._normalized,
      browser: this._browser,
      os: this._os,
      deviceType: this._deviceType,
      isBot: this._isBot,
      isHeadless: this._isHeadless,
      isAutomation: this._isAutomation,
      isSuspicious: this._isSuspicious,
      isRealUser: this.isRealUser(),
      category: this.getCategory(),
      supportsWebAuthn: this.supportsWebAuthn(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    return `UserAgent(browser=${this._browser.name}, os=${this._os.name}, device=${this._deviceType}, isBot=${this._isBot})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is a UserAgent
 */
export function isUserAgent(value: unknown): value is UserAgent {
  return value instanceof UserAgent;
}

/**
 * Create UserAgent from request headers
 */
export function createUserAgentFromRequest(
  userAgent: string | null | undefined
): UserAgent | null {
  if (!userAgent) return null;
  return UserAgent.tryCreate(userAgent);
}

/**
 * Check if user agent should be blocked (security)
 */
export function shouldBlockUserAgent(userAgent: UserAgent): boolean {
  return userAgent.isSuspicious() || 
         (userAgent.isBot() && userAgent.isHeadless());
}

// ============================================================
// Type Exports
// ============================================================

export type { BrowserInfo, OSInfo };
