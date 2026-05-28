/**
 * User Agent Utilities - Browser and OS detection
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/src/device/user-agent.util
 * 
 * RULES:
 * ✅ ONLY user agent parsing and detection - NO business logic
 * ✅ NO browser APIs, navigator mutation
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import UAParser from 'ua-parser-js';

// ==================== Types ====================

export interface ParsedUserAgent {
  browser: {
    name: string;
    version: string;
    major: string;
  };
  device: {
    model: string;
    type: string;
    vendor: string;
  };
  os: {
    name: string;
    version: string;
  };
  engine: {
    name: string;
    version: string;
  };
  cpu: {
    architecture: string;
  };
}

export interface DeviceInfo {
  type: string;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBot: boolean;
}

// ==================== Constants ====================

// Bot/Crawler patterns
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /headless/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
  /cypress/i,
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /facebot/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /slackbot/i,
];

// Mobile device indicators
const MOBILE_INDICATORS = [
  'Mobile',
  'Android',
  'iPhone',
  'iPod',
  'BlackBerry',
  'Windows Phone',
  'Opera Mini',
  'IEMobile',
];

// Tablet indicators
const TABLET_INDICATORS = ['iPad', 'Tablet', 'Kindle', 'Silk'];

// Bangladesh specific browser detection
const BD_BROWSER_PATTERNS = [
  { pattern: /ucbrowser/i, name: 'UC Browser' },
  { pattern: /opera mini/i, name: 'Opera Mini' },
  { pattern: /samsungbrowser/i, name: 'Samsung Browser' },
  { pattern: /miui browser/i, name: 'Mi Browser' },
];

// ==================== Private Helpers ====================

/**
 * Validate user agent string
 */
const validateUserAgent = (userAgent: string): string => {
  if (!userAgent || typeof userAgent !== 'string') {
    return '';
  }
  return userAgent;
};

/**
 * Detect Bangladesh-specific browsers
 */
const detectBangladeshBrowser = (userAgent: string): string | null => {
  for (const { pattern, name } of BD_BROWSER_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return null;
};

// ==================== Parsing ====================

/**
 * Parse user agent string into structured object
 * 
 * @param userAgent - User agent string
 * @returns Parsed user agent object
 * 
 * @example
 * parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
 * // Returns object with browser, device, os, engine, cpu info
 */
export const parseUserAgent = (userAgent: string): ParsedUserAgent => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) {
    return {
      browser: { name: 'unknown', version: 'unknown', major: '0' },
      device: { model: 'unknown', type: 'desktop', vendor: 'unknown' },
      os: { name: 'unknown', version: 'unknown' },
      engine: { name: 'unknown', version: 'unknown' },
      cpu: { architecture: 'unknown' },
    };
  }

  const parser = new UAParser(validUA);
  const result = parser.getResult();

  // Check for Bangladesh-specific browsers
  const bdBrowser = detectBangladeshBrowser(validUA);
  const browserName = bdBrowser || result.browser.name || 'unknown';

  return {
    browser: {
      name: browserName,
      version: result.browser.version || 'unknown',
      major: result.browser.major || '0',
    },
    device: {
      model: result.device.model || 'unknown',
      type: result.device.type || 'desktop',
      vendor: result.device.vendor || 'unknown',
    },
    os: {
      name: result.os.name || 'unknown',
      version: result.os.version || 'unknown',
    },
    engine: {
      name: result.engine.name || 'unknown',
      version: result.engine.version || 'unknown',
    },
    cpu: {
      architecture: result.cpu.architecture || 'unknown',
    },
  };
};

/**
 * Detect device type from user agent
 * 
 * @param userAgent - User agent string
 * @returns Device type ('mobile', 'tablet', 'desktop', 'bot', 'unknown')
 */
export const detectDeviceType = (userAgent: string): string => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) return 'unknown';
  if (isBot(validUA)) return 'bot';
  
  const parsed = parseUserAgent(validUA);
  const deviceType = parsed.device.type;
  
  // UAParser sometimes returns 'mobile' for phones, 'tablet' for tablets
  if (deviceType === 'mobile') return 'mobile';
  if (deviceType === 'tablet') return 'tablet';
  
  // Fallback detection
  if (MOBILE_INDICATORS.some(indicator => validUA.includes(indicator))) {
    return 'mobile';
  }
  if (TABLET_INDICATORS.some(indicator => validUA.includes(indicator))) {
    return 'tablet';
  }
  
  return 'desktop';
};

/**
 * Detect browser name from user agent
 * 
 * @param userAgent - User agent string
 * @returns Browser name
 */
export const detectBrowser = (userAgent: string): string => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) return 'unknown';
  
  const parsed = parseUserAgent(validUA);
  return parsed.browser.name;
};

/**
 * Detect OS name from user agent
 * 
 * @param userAgent - User agent string
 * @returns OS name
 */
export const detectOS = (userAgent: string): string => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) return 'unknown';
  
  const parsed = parseUserAgent(validUA);
  return parsed.os.name;
};

/**
 * Detect browser version from user agent
 * 
 * @param userAgent - User agent string
 * @returns Browser version
 */
export const detectBrowserVersion = (userAgent: string): string => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) return 'unknown';
  
  const parsed = parseUserAgent(validUA);
  return parsed.browser.version;
};

/**
 * Detect OS version from user agent
 * 
 * @param userAgent - User agent string
 * @returns OS version
 */
export const detectOSVersion = (userAgent: string): string => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) return 'unknown';
  
  const parsed = parseUserAgent(validUA);
  return parsed.os.version;
};

// ==================== Device Type Checks ====================

/**
 * Check if user agent is from mobile device
 * 
 * @param userAgent - User agent string
 * @returns True if mobile device
 */
export const isMobile = (userAgent: string): boolean => {
  const deviceType = detectDeviceType(userAgent);
  return deviceType === 'mobile';
};

/**
 * Check if user agent is from tablet device
 * 
 * @param userAgent - User agent string
 * @returns True if tablet device
 */
export const isTablet = (userAgent: string): boolean => {
  const deviceType = detectDeviceType(userAgent);
  return deviceType === 'tablet';
};

/**
 * Check if user agent is from desktop device
 * 
 * @param userAgent - User agent string
 * @returns True if desktop device
 */
export const isDesktop = (userAgent: string): boolean => {
  const deviceType = detectDeviceType(userAgent);
  return deviceType === 'desktop';
};

/**
 * Check if user agent is from a bot or crawler
 * 
 * @param userAgent - User agent string
 * @returns True if bot/crawler
 */
export const isBot = (userAgent: string): boolean => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) return false;
  
  return BOT_PATTERNS.some((pattern) => pattern.test(validUA));
};

/**
 * Get detailed device information
 * 
 * @param userAgent - User agent string
 * @returns Device info object
 */
export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  const validUA = validateUserAgent(userAgent);
  if (!validUA) {
    return {
      type: 'unknown',
      browser: 'unknown',
      browserVersion: 'unknown',
      os: 'unknown',
      osVersion: 'unknown',
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isBot: false,
    };
  }

  const parsed = parseUserAgent(validUA);
  const deviceType = detectDeviceType(validUA);
  const isBotDevice = isBot(validUA);

  return {
    type: deviceType,
    browser: parsed.browser.name,
    browserVersion: parsed.browser.version,
    os: parsed.os.name,
    osVersion: parsed.os.version,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isBot: isBotDevice,
  };
};

// ==================== Type Exports ====================

export type { DeviceInfo, ParsedUserAgent };
