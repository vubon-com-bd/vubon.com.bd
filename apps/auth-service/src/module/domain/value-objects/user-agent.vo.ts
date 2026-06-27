/**
 * User Agent Value Object - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/user-agent.vo
 * 
 * @description
 * Represents a User-Agent string with parsed browser, OS, device, and bot detection.
 * Uses shared constants from @vubon/shared-constants for patterns.
 * 
 * Enterprise Rules:
 * ✅ Immutable - User Agent never changes after creation
 * ✅ Self-validating - Validates format and length
 * ✅ Framework-free - No external parsing libraries
 * ✅ Domain-safe - Pattern matching only, no external APIs
 * ✅ Bangladesh specific - Local browser detection
 * ✅ Shared patterns - No code duplication across services
 * 
 * @example
 * const ua = new UserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
 * console.log(ua.getBrowser()); // { name: 'Chrome', version: '120.0.0.0' }
 * console.log(ua.getOS()); // { name: 'Windows', version: '10.0' }
 * console.log(ua.getDeviceType()); // 'desktop'
 */

import { ValueObject } from './base.vo';

// ✅ FIXED: সঠিক ইমপোর্ট - shared-constants থেকে
import {
  BROWSER_PATTERNS,
  BANGLADESH_BROWSER_PATTERNS,
  OS_PATTERNS,
  DEVICE_PATTERNS,
  FEATURE_PHONE_PATTERNS,
  BOT_PATTERNS,
  SUSPICIOUS_PATTERNS,
} from '@vubon/shared-constants';

// ==================== Types ====================

/**
 * User Agent validation result
 * ✅ FIXED: error optional
 */
export interface UserAgentValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * Browser information (Domain-specific wrapper)
 */
export interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  isMobile?: boolean;
}

/**
 * OS information (Domain-specific wrapper)
 */
export interface OSInfo {
  name: string;
  version: string;
  platform: 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'other';
}

// ==================== Enums ====================

/**
 * Device type enum
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
 * Browser category enum
 */
export enum BrowserCategory {
  MODERN = 'modern',
  LEGACY = 'legacy',
  BOT = 'bot',
  HEADLESS = 'headless',
  UNKNOWN = 'unknown',
}

/**
 * Bot category enum (Enterprise addition)
 */
export enum BotCategory {
  SEARCH_ENGINE = 'search_engine',
  SOCIAL_MEDIA = 'social_media',
  SEO_TOOL = 'seo_tool',
  MONITORING = 'monitoring',
  HEADLESS = 'headless',
  AUTOMATION = 'automation',
  SCRAPER = 'scraper',
  UNKNOWN = 'unknown',
}

// ==================== User Agent Value Object ====================

/**
 * User Agent Value Object
 * 
 * Represents a parsed and analyzed user agent string
 */
export class UserAgent extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _isBot: boolean;
  private readonly _isHeadless: boolean;
  private readonly _isAutomation: boolean;
  private readonly _isSuspicious: boolean;

  // Cached values (lazy-loaded)
  private _browser: BrowserInfo | null = null;
  private _os: OSInfo | null = null;
  private _deviceType: DeviceType | null = null;
  private _category: BrowserCategory | null = null;
  private _botCategory: BotCategory | null = null;

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
    
    // Pre-compute boolean flags (lightweight)
    const ua = this._value;
    this._isBot = this.isBotCheck(ua);
    this._isHeadless = this.isHeadlessCheck(ua);
    this._isAutomation = this.isAutomationCheck(ua);
    this._isSuspicious = this.isSuspiciousCheck(ua);
    
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
   * ✅ FIXED: error optional
   */
  public static validate(userAgent: string): UserAgentValidation {
    if (!userAgent || typeof userAgent !== 'string') {
      return { isValid: false, error: 'User agent cannot be null or undefined' };
    }

    const trimmed = userAgent.trim();
    
    if (trimmed.length === 0) {
      return { isValid: false, error: 'User agent cannot be empty' };
    }
    
    if (trimmed.length > 2000) {
      return { isValid: false, error: 'User agent too long (max 2000 characters)' };
    }

    // Normalize: trim and replace multiple spaces
    const normalized = trimmed.replace(/\s+/g, ' ');

    // ✅ error: undefined বাদ দেওয়া হয়েছে
    return { isValid: true, normalized };
  }

  // ============================================================
  // Parsing Methods (Lazy-loaded with caching)
  // ============================================================

  /**
   * Parse browser from user agent (cached)
   */
  private parseBrowser(): BrowserInfo {
    if (this._browser) return this._browser;
    
    const ua = this._value;
    
    // Try Bangladesh browsers first (higher priority for local market)
    for (const browser of BANGLADESH_BROWSER_PATTERNS) {
      const match = ua.match(browser.pattern);
      if (match) {
        this._browser = {
          name: browser.name,
          version: match[1] || 'unknown',
          engine: browser.engine,
          isMobile: /Mobile/i.test(ua),
        };
        return this._browser;
      }
    }
    
    // Then try from shared-constants
    for (const browser of BROWSER_PATTERNS) {
      const match = ua.match(browser.pattern);
      if (match) {
        this._browser = {
          name: browser.name,
          version: match[1] || 'unknown',
          engine: browser.engine,
          isMobile: /Mobile/i.test(ua),
        };
        return this._browser;
      }
    }
    
    this._browser = {
      name: 'Unknown',
      version: 'unknown',
      engine: 'unknown',
      isMobile: /Mobile/i.test(ua),
    };
    return this._browser;
  }

  /**
   * Parse OS from user agent (cached)
   */
  private parseOS(): OSInfo {
    if (this._os) return this._os;
    
    const ua = this._value;
    
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
        this._os = {
          name: os.name,
          version,
          platform: os.platform,
        };
        return this._os;
      }
    }
    
    this._os = {
      name: 'Unknown',
      version: 'unknown',
      platform: 'other',
    };
    return this._os;
  }

  /**
   * Parse device type from user agent (cached)
   * ✅ FIXED: Type-safe conversion with fallback
   */
  private parseDeviceType(): DeviceType {
    if (this._deviceType) return this._deviceType;
    
    const ua = this._value;
    
    // Check feature phones first (Bangladesh specific)
    if (FEATURE_PHONE_PATTERNS.some((pattern: RegExp) => pattern.test(ua))) {
      this._deviceType = DeviceType.FEATURE_PHONE;
      return this._deviceType;
    }
    
    // Check from shared-constants
    for (const device of DEVICE_PATTERNS) {
      if (device.pattern.test(ua)) {
        // ✅ FIXED: Type-safe mapping with fallback
        const typeMap: Record<string, DeviceType> = {
          'mobile': DeviceType.MOBILE,
          'tablet': DeviceType.TABLET,
          'tv': DeviceType.TV,
          'console': DeviceType.CONSOLE,
          'wearable': DeviceType.WEARABLE,
        };
        this._deviceType = typeMap[device.type] || DeviceType.UNKNOWN;
        return this._deviceType;
      }
    }
    
    // Desktop detection (no mobile/tablet patterns)
    // Check for laptop or desktop indicators
    if (/Windows|Macintosh|Linux|X11/.test(ua) && !/Mobile|Tablet|iPad/.test(ua)) {
      // Check for laptop-specific patterns
      if (/Laptop|Notebook|Book/.test(ua)) {
        this._deviceType = DeviceType.LAPTOP;
        return this._deviceType;
      }
      this._deviceType = DeviceType.DESKTOP;
      return this._deviceType;
    }
    
    this._deviceType = DeviceType.UNKNOWN;
    return this._deviceType;
  }

  /**
   * Determine browser category (cached)
   */
  private determineCategory(): BrowserCategory {
    if (this._category) return this._category;
    
    if (this._isBot) {
      this._category = BrowserCategory.BOT;
      return this._category;
    }
    if (this._isHeadless) {
      this._category = BrowserCategory.HEADLESS;
      return this._category;
    }
    
    const browser = this.getBrowser();
    const legacyBrowsers = ['IE', 'Edge Legacy', 'UC Browser', 'Opera Mini'];
    if (legacyBrowsers.includes(browser.name)) {
      this._category = BrowserCategory.LEGACY;
      return this._category;
    }
    
    this._category = BrowserCategory.MODERN;
    return this._category;
  }

  /**
   * Determine bot category (Enterprise feature)
   */
  private determineBotCategory(): BotCategory {
    if (this._botCategory) return this._botCategory;
    
    if (!this._isBot) {
      this._botCategory = BotCategory.UNKNOWN;
      return this._botCategory;
    }
    
    const ua = this._value;
    
    // Search engines
    if (/Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(ua)) {
      this._botCategory = BotCategory.SEARCH_ENGINE;
      return this._botCategory;
    }
    
    // Social media
    if (/facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Pinterestbot|Discordbot|TelegramBot|WhatsApp|Slackbot/i.test(ua)) {
      this._botCategory = BotCategory.SOCIAL_MEDIA;
      return this._botCategory;
    }
    
    // SEO tools
    if (/AhrefsBot|SemrushBot|MJ12bot|DotBot|rogerbot|BLEXBot|DataForSeoBot|SeznamBot|Mozbot/i.test(ua)) {
      this._botCategory = BotCategory.SEO_TOOL;
      return this._botCategory;
    }
    
    // Monitoring
    if (/Pingdom|UptimeRobot|NewRelic|Datadog|SiteUptime/i.test(ua)) {
      this._botCategory = BotCategory.MONITORING;
      return this._botCategory;
    }
    
    // Headless browsers
    if (/Headless|Puppeteer|Playwright|PhantomJS|SlimerJS/i.test(ua)) {
      this._botCategory = BotCategory.HEADLESS;
      return this._botCategory;
    }
    
    // Automation
    if (/Selenium|WebDriver|Cypress|TestCafe|Nightwatch/i.test(ua)) {
      this._botCategory = BotCategory.AUTOMATION;
      return this._botCategory;
    }
    
    // Scrapers
    if (/scraper|crawler|spider/i.test(ua)) {
      this._botCategory = BotCategory.SCRAPER;
      return this._botCategory;
    }
    
    this._botCategory = BotCategory.UNKNOWN;
    return this._botCategory;
  }

  // ============================================================
  // Boolean Check Methods (Using shared patterns)
  // ============================================================

  /**
   * Check if user agent is a bot/crawler
   */
  private isBotCheck(ua: string): boolean {
    return BOT_PATTERNS.some((pattern: RegExp) => pattern.test(ua));
  }

  /**
   * Check if user agent is headless browser
   */
  private isHeadlessCheck(ua: string): boolean {
    const headlessPatterns = [
      /Headless/i, /Puppeteer/i, /Playwright/i, /PhantomJS/i,
    ];
    return headlessPatterns.some((pattern: RegExp) => pattern.test(ua));
  }

  /**
   * Check if user agent is automation tool
   */
  private isAutomationCheck(ua: string): boolean {
    const automationPatterns = [
      /Selenium/i, /WebDriver/i, /Cypress/i, /TestCafe/i,
    ];
    return automationPatterns.some((pattern: RegExp) => pattern.test(ua));
  }

  /**
   * Check if user agent is suspicious (security)
   */
  private isSuspiciousCheck(ua: string): boolean {
    const lowerUA = ua.toLowerCase();
    return SUSPICIOUS_PATTERNS.some((pattern: string) => lowerUA.includes(pattern));
  }

  // ============================================================
  // Getters (Lazy-loaded with caching)
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
   * Get browser information (cached)
   */
  public getBrowser(): BrowserInfo {
    return { ...this.parseBrowser() };
  }

  /**
   * Get browser name
   */
  public getBrowserName(): string {
    return this.parseBrowser().name;
  }

  /**
   * Get browser version
   */
  public getBrowserVersion(): string {
    return this.parseBrowser().version;
  }

  /**
   * Get browser engine
   */
  public getBrowserEngine(): string {
    return this.parseBrowser().engine;
  }

  /**
   * Get OS information (cached)
   */
  public getOS(): OSInfo {
    return { ...this.parseOS() };
  }

  /**
   * Get OS name
   */
  public getOSName(): string {
    return this.parseOS().name;
  }

  /**
   * Get OS version
   */
  public getOSVersion(): string {
    return this.parseOS().version;
  }

  /**
   * Get device type (cached)
   * ✅ FIXED: Never returns null
   */
  public getDeviceType(): DeviceType {
    return this.parseDeviceType();
  }

  // ============================================================
  // Type Checks
  // ============================================================

  /**
   * Check if device is mobile
   */
  public isMobile(): boolean {
    const deviceType = this.getDeviceType();
    return deviceType === DeviceType.MOBILE || deviceType === DeviceType.FEATURE_PHONE;
  }

  /**
   * Check if device is tablet
   */
  public isTablet(): boolean {
    return this.getDeviceType() === DeviceType.TABLET;
  }

  /**
   * Check if device is desktop/laptop
   */
  public isDesktop(): boolean {
    const deviceType = this.getDeviceType();
    return deviceType === DeviceType.DESKTOP || deviceType === DeviceType.LAPTOP;
  }

  /**
   * Check if device is feature phone (Bangladesh specific)
   */
  public isFeaturePhone(): boolean {
    return this.getDeviceType() === DeviceType.FEATURE_PHONE;
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
  // Category Methods (Enterprise features)
  // ============================================================

  /**
   * Get browser category (cached)
   */
  public getCategory(): BrowserCategory {
    return this.determineCategory();
  }

  /**
   * Get bot category (cached) - Enterprise feature
   */
  public getBotCategory(): BotCategory {
    return this.determineBotCategory();
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
    const modernBrowsers = ['Chrome', 'Firefox', 'Edge', 'Safari', 'Opera', 'Brave'];
    const modernVersions: Record<string, number> = {
      'Chrome': 67,
      'Firefox': 60,
      'Edge': 79,
      'Safari': 13,
      'Opera': 54,
      'Brave': 67,
    };
    
    const browser = this.getBrowser();
    const version = parseInt(browser.version, 10);
    const minVersion = modernVersions[browser.name];
    
    return modernBrowsers.includes(browser.name) && 
           !isNaN(version) && 
           minVersion !== undefined && 
           version >= minVersion;
  }

  /**
   * Check if browser supports localStorage
   */
  public supportsLocalStorage(): boolean {
    return this.getCategory() === BrowserCategory.MODERN;
  }

  // ============================================================
  // Fingerprinting
  // ============================================================

  /**
   * Get fingerprint components (for device fingerprinting)
   */
  public getFingerprintComponents(): Record<string, string> {
    const browser = this.getBrowser();
    const os = this.getOS();
    const deviceType = this.getDeviceType();
    
    return {
      browserName: browser.name,
      browserVersion: browser.version,
      browserEngine: browser.engine,
      osName: os.name,
      osVersion: os.version,
      deviceType: deviceType,
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
    return this._value === '' || this._value === 'unknown';
  }

  /**
   * Get equality components for parent class comparison
   */
  protected getEqualityComponents(): readonly unknown[] {
    return [this._normalized, this._isBot];
  }

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    const deviceType = this.getDeviceType();
    
    return {
      value: this._value,
      normalized: this._normalized,
      browser: this.getBrowser(),
      os: this.getOS(),
      deviceType: deviceType,
      isBot: this._isBot,
      isHeadless: this._isHeadless,
      isAutomation: this._isAutomation,
      isSuspicious: this._isSuspicious,
      isRealUser: this.isRealUser(),
      category: this.getCategory(),
      botCategory: this.getBotCategory(),
      supportsWebAuthn: this.supportsWebAuthn(),
      supportsModernFeatures: this.supportsModernFeatures(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    const browser = this.getBrowser();
    const os = this.getOS();
    const deviceType = this.getDeviceType();
    return `UserAgent(${browser.name} ${browser.version} on ${os.name}, device=${deviceType}, bot=${this._isBot})`;
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
 * Create UserAgent from request data (handles various input sources)
 */
export function createUserAgentFromRequest(userAgent: string | null | undefined): UserAgent | null {
  if (!userAgent) return null;
  return UserAgent.tryCreate(userAgent);
}

/**
 * Check if user agent should be blocked (security)
 */
export function shouldBlockUserAgent(userAgent: string): boolean {
  const ua = UserAgent.tryCreate(userAgent);
  if (!ua) return true;
  return ua.isBot() || ua.isSuspicious();
}

/**
 * Get user agent summary (short description)
 */
export function getUserAgentSummary(userAgent: string): string {
  const ua = UserAgent.tryCreate(userAgent);
  if (!ua) return 'Unknown';
  if (ua.isBot()) return `Bot: ${ua.getBrowserName()}`;
  return `${ua.getBrowserName()} ${ua.getBrowserVersion()} on ${ua.getOSName()}`;
}

// ============================================================
// Type Exports (✅ FIXED: ডুপ্লিকেট export সরানো হয়েছে)
// ============================================================



// Note: BotCategory, BrowserCategory, DeviceType ইতিমধ্যে enum হিসেবে export করা হয়েছে
// তাই আলাদা export প্রয়োজন নেই
