/**
 * Auth Device Fingerprint
 * প্রমীকরণ ডিভাইস ফিঙ্গারপ্রিন্ট
 */

import { AUTH_DEVICE } from '@vubon/shared-constants';

export const AuthDeviceFingerprint = {
  /**
   * Generate device fingerprint
   * ডিভাইস ফিঙ্গারপ্রিন্ট তৈরি করা
   */
  generate: (data: {
    userAgent: string;
    platform: string;
    screenResolution?: string;
    timezone?: string;
    language?: string;
  }): string => {
    const fingerprintData = [
      data.userAgent,
      data.platform,
      data.screenResolution || '',
      data.timezone || '',
      data.language || '',
    ].join('||');

    // Simple hash for demonstration
    let hash = 0;
    for (let i = 0; i < fingerprintData.length; i++) {
      hash = (hash << 5) - hash + fingerprintData.charCodeAt(i);
      hash = hash & hash;
    }

    return Math.abs(hash).toString(36);
  },

  /**
   * Generate device name
   * ডিভাইস নাম তৈরি করা
   */
  generateName: (data: { platform: string; type?: string; name?: string }): string => {
    if (data.name) return data.name;

    const typeMap: Record<string, string> = {
      desktop: 'PC',
      laptop: 'Laptop',
      tablet: 'Tablet',
      mobile: 'Mobile',
    };

    const type = data.type || 'other';
    const typeName = typeMap[type] || 'Device';
    const platform = data.platform || 'Unknown';

    return `${typeName} (${platform})`;
  },

  /**
   * Detect device type from user agent
   * ইউজার এজেন্ট থেকে ডিভাইস টাইপ ডিটেক্ট করা
   */
  detectType: (userAgent: string): string => {
    const ua = userAgent.toLowerCase();

    if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
      return AUTH_DEVICE.TYPES.MOBILE;
    }
    if (/tablet|ipad|kindle|playbook/i.test(ua)) {
      return AUTH_DEVICE.TYPES.TABLET;
    }
    if (/smart-tv|android tv|apple tv|roku/i.test(ua)) {
      return AUTH_DEVICE.TYPES.SMART_TV;
    }
    if (/watch|wearable|fitbit|apple watch/i.test(ua)) {
      return AUTH_DEVICE.TYPES.SMART_WATCH;
    }
    if (/bot|crawler|spider|scraper/i.test(ua)) {
      return AUTH_DEVICE.TYPES.API_CLIENT;
    }

    return AUTH_DEVICE.TYPES.DESKTOP;
  },

  /**
   * Detect platform from user agent
   * ইউজার এজেন্ট থেকে প্ল্যাটফর্ম ডিটেক্ট করা
   */
  detectPlatform: (userAgent: string): string => {
    const ua = userAgent.toLowerCase();

    if (/windows/i.test(ua)) return AUTH_DEVICE.PLATFORMS.WINDOWS;
    if (/macintosh|mac os x/i.test(ua)) return AUTH_DEVICE.PLATFORMS.MACOS;
    if (/linux/i.test(ua)) return AUTH_DEVICE.PLATFORMS.LINUX;
    if (/android/i.test(ua)) return AUTH_DEVICE.PLATFORMS.ANDROID;
    if (/iphone|ipad|ipod|ios/i.test(ua)) return AUTH_DEVICE.PLATFORMS.IOS;
    if (/chrome os|cros/i.test(ua)) return AUTH_DEVICE.PLATFORMS.CHROME_OS;

    return AUTH_DEVICE.PLATFORMS.UNKNOWN;
  },

  /**
   * Calculate device trust score
   * ডিভাইস ট্রাস্ট স্কোর ক্যালকুলেট করা
   */
  calculateTrustScore: (device: {
    knownDevice: boolean;
    lastActiveDays: number;
    loginAttempts: number;
    successfulLogins: number;
  }): { score: number; level: 'low' | 'medium' | 'high' | 'very_high' } => {
    let score = 0;

    // Known device
    if (device.knownDevice) score += 30;

    // Last activity recency
    if (device.lastActiveDays <= 1) score += 20;
    else if (device.lastActiveDays <= 7) score += 10;
    else if (device.lastActiveDays <= 30) score += 5;

    // Success rate
    const total = device.loginAttempts || 1;
    const successRate = device.successfulLogins / total;
    if (successRate >= 0.9) score += 30;
    else if (successRate >= 0.7) score += 20;
    else if (successRate >= 0.5) score += 10;

    // Experience level
    if (device.successfulLogins >= 10) score += 20;
    else if (device.successfulLogins >= 5) score += 10;
    else if (device.successfulLogins >= 1) score += 5;

    score = Math.min(score, 100);

    let level: 'low' | 'medium' | 'high' | 'very_high' = 'low';
    if (score >= 80) level = 'very_high';
    else if (score >= 60) level = 'high';
    else if (score >= 40) level = 'medium';

    return { score, level };
  },
};
