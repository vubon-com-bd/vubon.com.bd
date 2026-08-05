import { BaseValueObject } from './base.vo';

/**
 * User Agent Value Object
 * Represents a browser or device user agent string
 * Used for session tracking, device identification, and analytics
 */
export class UserAgent extends BaseValueObject<string> {
  private readonly _browser: string;
  private readonly _browserVersion: string;
  private readonly _os: string;
  private readonly _osVersion: string;
  private readonly _deviceType: 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown';
  private readonly _isBot: boolean;

  private constructor(value: string) {
    const normalized = value.trim();
    UserAgent.validate(normalized);
    super(normalized);

    const parsed = UserAgent.parse(normalized);
    this._browser = parsed.browser;
    this._browserVersion = parsed.browserVersion;
    this._os = parsed.os;
    this._osVersion = parsed.osVersion;
    this._deviceType = parsed.deviceType;
    this._isBot = parsed.isBot;
  }

  /**
   * Create a new User Agent instance
   * @throws {Error} If the user agent is invalid
   */
  static create(value: string): UserAgent {
    return new UserAgent(value);
  }

  /**
   * Validate user agent string
   * @throws {Error} If the user agent is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('User agent must be a non-empty string');
    }

    // Check maximum length (prevent very long strings)
    if (value.length > 2000) {
      throw new Error('User agent string exceeds maximum length of 2000 characters');
    }
  }

  /**
   * Parse user agent string and extract information
   */
  private static parse(value: string): {
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown';
    isBot: boolean;
  } {
    const ua = value.toLowerCase();

    // Check if it's a bot
    const isBot = UserAgent.isBot(ua);

    // Detect browser
    let browser = 'Unknown';
    let browserVersion = 'Unknown';

    if (ua.includes('chrome')) {
      browser = 'Chrome';
      const match = ua.match(/chrome\/(\d+\.\d+\.\d+\.\d+)/);
      if (match) browserVersion = match[1];
    } else if (ua.includes('firefox')) {
      browser = 'Firefox';
      const match = ua.match(/firefox\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
      browser = 'Safari';
      const match = ua.match(/version\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
    } else if (ua.includes('edge')) {
      browser = 'Edge';
      const match = ua.match(/edge\/(\d+\.\d+\.\d+\.\d+)/);
      if (match) browserVersion = match[1];
    } else if (ua.includes('opera') || ua.includes('opr')) {
      browser = 'Opera';
      const match = ua.match(/opera\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
    } else if (ua.includes('brave')) {
      browser = 'Brave';
      const match = ua.match(/brave\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
    }

    // Detect OS
    let os = 'Unknown';
    let osVersion = 'Unknown';

    if (ua.includes('windows')) {
      os = 'Windows';
      if (ua.includes('windows nt 10.0')) osVersion = '10';
      else if (ua.includes('windows nt 6.3')) osVersion = '8.1';
      else if (ua.includes('windows nt 6.2')) osVersion = '8';
      else if (ua.includes('windows nt 6.1')) osVersion = '7';
      else if (ua.includes('windows nt 6.0')) osVersion = 'Vista';
      else if (ua.includes('windows nt 5.1')) osVersion = 'XP';
    } else if (ua.includes('mac os x')) {
      os = 'macOS';
      const match = ua.match(/mac os x (\d+_\d+_\d+)/);
      if (match) osVersion = match[1].replace(/_/g, '.');
    } else if (ua.includes('linux')) {
      os = 'Linux';
    } else if (ua.includes('android')) {
      os = 'Android';
      const match = ua.match(/android (\d+\.\d+)/);
      if (match) osVersion = match[1];
    } else if (ua.includes('iphone') || ua.includes('ipad')) {
      os = 'iOS';
      const match = ua.match(/os (\d+_\d+)/);
      if (match) osVersion = match[1].replace(/_/g, '.');
    } else if (ua.includes('ios')) {
      os = 'iOS';
    }

    // Detect device type
    let deviceType: 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown' = 'unknown';

    if (isBot) {
      deviceType = 'bot';
    } else if (ua.includes('mobile') && !ua.includes('tablet')) {
      deviceType = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      deviceType = 'tablet';
    } else {
      deviceType = 'desktop';
    }

    return {
      browser,
      browserVersion,
      os,
      osVersion,
      deviceType,
      isBot,
    };
  }

  /**
   * Check if the user agent is from a bot/crawler
   */
  private static isBot(ua: string): boolean {
    const botPatterns = [
      'bot',
      'spider',
      'crawler',
      'scraper',
      'facebookexternalhit',
      'facebot',
      'googlebot',
      'bingbot',
      'slurp',
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'msnbot',
      'applebot',
      'twitterbot',
      'linkedinbot',
      'pinterestbot',
      'telegrambot',
      'whatsapp',
      'slackbot',
      'discordbot',
      'python',
      'curl',
      'wget',
      'headless',
      'phantom',
      'selenium',
      'puppeteer',
    ];

    return botPatterns.some((pattern) => ua.includes(pattern));
  }

  /**
   * Get the browser name
   */
  getBrowser(): string {
    return this._browser;
  }

  /**
   * Get the browser version
   */
  getBrowserVersion(): string {
    return this._browserVersion;
  }

  /**
   * Get the operating system name
   */
  getOS(): string {
    return this._os;
  }

  /**
   * Get the operating system version
   */
  getOSVersion(): string {
    return this._osVersion;
  }

  /**
   * Get the device type
   */
  getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown' {
    return this._deviceType;
  }

  /**
   * Check if the user agent is from a mobile device
   */
  isMobile(): boolean {
    return this._deviceType === 'mobile';
  }

  /**
   * Check if the user agent is from a tablet
   */
  isTablet(): boolean {
    return this._deviceType === 'tablet';
  }

  /**
   * Check if the user agent is from a desktop device
   */
  isDesktop(): boolean {
    return this._deviceType === 'desktop';
  }

  /**
   * Check if the user agent is from a bot
   */
  isBot(): boolean {
    return this._isBot;
  }

  /**
   * Check if the user agent is from a mobile device
   */
  isMobileDevice(): boolean {
    return this.isMobile() || this.isTablet();
  }

  /**
   * Get a summary of the user agent information
   */
  getSummary(): {
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown';
    isBot: boolean;
    fullString: string;
  } {
    return {
      browser: this._browser,
      browserVersion: this._browserVersion,
      os: this._os,
      osVersion: this._osVersion,
      deviceType: this._deviceType,
      isBot: this._isBot,
      fullString: this._value,
    };
  }

  /**
   * Get a formatted string for display
   */
  toDisplayString(): string {
    if (this._isBot) {
      return `Bot (${this._browser})`;
    }

    const parts: string[] = [];

    if (this._browser && this._browser !== 'Unknown') {
      parts.push(this._browser);
      if (this._browserVersion && this._browserVersion !== 'Unknown') {
        parts.push(`v${this._browserVersion}`);
      }
    }

    if (this._os && this._os !== 'Unknown') {
      parts.push(`on ${this._os}`);
      if (this._osVersion && this._osVersion !== 'Unknown') {
        parts.push(this._osVersion);
      }
    }

    if (this._deviceType && this._deviceType !== 'unknown' && this._deviceType !== 'desktop') {
      parts.push(`(${this._deviceType})`);
    }

    return parts.join(' ') || 'Unknown Device';
  }

  /**
   * Compare two UserAgent objects
   */
  equals(other: UserAgent | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof UserAgent)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return this._value;
  }

  /**
   * Get the raw value
   */
  getValue(): string {
    return this._value;
  }
}
