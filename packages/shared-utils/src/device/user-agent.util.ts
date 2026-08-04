import UAParser from 'ua-parser-js';

/**
 * Device information interface
 */
export interface DeviceInfo {
  /** Device type (mobile, tablet, desktop, bot, feature_phone, etc.) */
  type: DeviceType;
  /** Browser name */
  browser: string;
  /** Browser version */
  browserVersion: string;
  /** Operating system name */
  os: string;
  /** Operating system version */
  osVersion: string;
  /** Device vendor/manufacturer */
  vendor: string;
  /** Device model */
  model: string;
  /** CPU architecture */
  cpu: string;
  /** Engine name */
  engine: string;
  /** Engine version */
  engineVersion: string;
}

/**
 * Device type enum
 */
export type DeviceType =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'bot'
  | 'feature_phone'
  | 'smart_tv'
  | 'gaming_console'
  | 'wearable'
  | 'unknown';

/**
 * Bot user agent patterns
 */
const BOT_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawler/i,
  /scraper/i,
  /facebookexternalhit/i,
  /facebot/i,
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /msnbot/i,
  /applebot/i,
  /twitterbot/i,
  /linkedinbot/i,
  /pinterestbot/i,
  /telegrambot/i,
  /whatsapp/i,
  /slackbot/i,
  /discordbot/i,
  /python/i,
  /curl/i,
  /wget/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
];

/**
 * Feature phone user agent patterns
 */
const FEATURE_PHONE_PATTERNS = [
  /nokia/i,
  /series60/i,
  /series40/i,
  /feature phone/i,
  /j2me/i,
  /midp/i,
  /wap/i,
  /opera mini/i,
  /ucbrowser/i,
];

/**
 * Parses user agent string and returns detailed device information
 *
 * @param userAgent - The user agent string to parse
 * @returns Detailed device information
 *
 * @example
 * const info = parseUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
 * // { type: 'mobile', browser: 'Mobile Safari', os: 'iOS', ... }
 */
export function parseUserAgent(userAgent: string): DeviceInfo {
  if (!userAgent || typeof userAgent !== 'string') {
    return {
      type: 'unknown',
      browser: 'Unknown',
      browserVersion: 'Unknown',
      os: 'Unknown',
      osVersion: 'Unknown',
      vendor: 'Unknown',
      model: 'Unknown',
      cpu: 'Unknown',
      engine: 'Unknown',
      engineVersion: 'Unknown',
    };
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  // Determine device type
  let deviceType: DeviceType = 'unknown';

  if (isBot(userAgent)) {
    deviceType = 'bot';
  } else if (isFeaturePhone(userAgent)) {
    deviceType = 'feature_phone';
  } else if (result.device.type === 'mobile') {
    deviceType = 'mobile';
  } else if (result.device.type === 'tablet') {
    deviceType = 'tablet';
  } else if (result.device.type === 'smarttv') {
    deviceType = 'smart_tv';
  } else if (result.device.type === 'console') {
    deviceType = 'gaming_console';
  } else if (result.device.type === 'wearable') {
    deviceType = 'wearable';
  } else if (result.device.type === 'desktop' || !result.device.type) {
    deviceType = 'desktop';
  }

  return {
    type: deviceType,
    browser: result.browser.name || 'Unknown',
    browserVersion: result.browser.version || 'Unknown',
    os: result.os.name || 'Unknown',
    osVersion: result.os.version || 'Unknown',
    vendor: result.device.vendor || 'Unknown',
    model: result.device.model || 'Unknown',
    cpu: result.cpu.architecture || 'Unknown',
    engine: result.engine.name || 'Unknown',
    engineVersion: result.engine.version || 'Unknown',
  };
}

/**
 * Checks if the user agent is from a mobile device
 *
 * @param userAgent - The user agent string to check
 * @returns True if the device is mobile, false otherwise
 *
 * @example
 * isMobile('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)') // true
 * isMobile('Mozilla/5.0 (Windows NT 10.0; Win64; x64)') // false
 */
export function isMobile(userAgent: string): boolean {
  if (!userAgent || typeof userAgent !== 'string') {
    return false;
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return result.device.type === 'mobile';
}

/**
 * Checks if the user agent is from a bot/crawler
 *
 * @param userAgent - The user agent string to check
 * @returns True if the user agent is from a bot, false otherwise
 *
 * @example
 * isBot('Googlebot/2.1 (+http://www.google.com/bot.html)') // true
 * isBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64)') // false
 */
export function isBot(userAgent: string): boolean {
  if (!userAgent || typeof userAgent !== 'string') {
    return false;
  }

  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Checks if the user agent is from a feature phone
 *
 * @param userAgent - The user agent string to check
 * @returns True if the device is a feature phone, false otherwise
 *
 * @example
 * isFeaturePhone('Nokia311/2.0 (Series40; Nokia311/03.85)') // true
 * isFeaturePhone('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)') // false
 */
export function isFeaturePhone(userAgent: string): boolean {
  if (!userAgent || typeof userAgent !== 'string') {
    return false;
  }

  return FEATURE_PHONE_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Checks if the user agent is from a desktop device
 *
 * @param userAgent - The user agent string to check
 * @returns True if the device is desktop, false otherwise
 *
 * @example
 * isDesktop('Mozilla/5.0 (Windows NT 10.0; Win64; x64)') // true
 * isDesktop('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)') // false
 */
export function isDesktop(userAgent: string): boolean {
  if (!userAgent || typeof userAgent !== 'string') {
    return false;
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return (
    result.device.type === 'desktop' ||
    (!result.device.type && !isMobile(userAgent) && !isBot(userAgent))
  );
}

/**
 * Checks if the user agent is from a tablet
 *
 * @param userAgent - The user agent string to check
 * @returns True if the device is a tablet, false otherwise
 *
 * @example
 * isTablet('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)') // true
 * isTablet('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)') // false
 */
export function isTablet(userAgent: string): boolean {
  if (!userAgent || typeof userAgent !== 'string') {
    return false;
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return result.device.type === 'tablet';
}

/**
 * Gets detailed device information from user agent
 *
 * @param userAgent - The user agent string
 * @returns Detailed device information including type, browser, OS, vendor, model
 *
 * @example
 * const info = getDeviceInfo('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
 * // { type: 'mobile', browser: 'Mobile Safari', ... }
 */
export function getDeviceInfo(userAgent: string): DeviceInfo {
  return parseUserAgent(userAgent);
}

/**
 * Gets the operating system name from user agent
 *
 * @param userAgent - The user agent string
 * @returns The operating system name
 *
 * @example
 * getOS('Mozilla/5.0 (Windows NT 10.0; Win64; x64)') // 'Windows'
 * getOS('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)') // 'iOS'
 */
export function getOS(userAgent: string): string {
  if (!userAgent || typeof userAgent !== 'string') {
    return 'Unknown';
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return result.os.name || 'Unknown';
}

/**
 * Gets the browser name from user agent
 *
 * @param userAgent - The user agent string
 * @returns The browser name
 *
 * @example
 * getBrowser('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124') // 'Chrome'
 */
export function getBrowser(userAgent: string): string {
  if (!userAgent || typeof userAgent !== 'string') {
    return 'Unknown';
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return result.browser.name || 'Unknown';
}

/**
 * Gets the device vendor from user agent
 *
 * @param userAgent - The user agent string
 * @returns The device vendor
 *
 * @example
 * getVendor('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)') // 'Apple'
 * getVendor('Mozilla/5.0 (Linux; Android 11; SM-G991B)') // 'Samsung'
 */
export function getVendor(userAgent: string): string {
  if (!userAgent || typeof userAgent !== 'string') {
    return 'Unknown';
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return result.device.vendor || 'Unknown';
}

/**
 * Gets the device model from user agent
 *
 * @param userAgent - The user agent string
 * @returns The device model
 *
 * @example
 * getModel('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)') // 'iPhone'
 * getModel('Mozilla/5.0 (Linux; Android 11; SM-G991B)') // 'SM-G991B'
 */
export function getModel(userAgent: string): string {
  if (!userAgent || typeof userAgent !== 'string') {
    return 'Unknown';
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return result.device.model || 'Unknown';
}
