/**
 * Auth Device Fingerprint Client
 * প্রমীকরণ ডিভাইস ফিঙ্গারপ্রিন্ট ক্লায়েন্ট
 */

import { AuthDeviceFingerprint } from '@vubon/shared-utils';
import { AUTH_DEVICE } from '@vubon/shared-constants';

export interface AuthDeviceFingerprintData {
  userAgent: string;
  platform: string;
  screenResolution?: string;
  timezone?: string;
  language?: string;
}

export interface AuthDeviceFingerprintResult {
  fingerprint: string;
  deviceName: string;
  deviceType: string;
  platform: string;
  trustScore: number;
  trustLevel: 'low' | 'medium' | 'high' | 'very_high';
}

export class AuthDeviceFingerprintClient {
  /**
   * Generate device fingerprint
   * ডিভাইস ফিঙ্গারপ্রিন্ট তৈরি করা
   */
  generate(data: AuthDeviceFingerprintData): AuthDeviceFingerprintResult {
    const fingerprint = AuthDeviceFingerprint.generate({
      userAgent: data.userAgent,
      platform: data.platform,
      screenResolution: data.screenResolution,
      timezone: data.timezone,
      language: data.language,
    });

    // AUTH_DEVICE ব্যবহার করে ডিভাইস টাইপ ডিটেক্ট করা
    const deviceType = this.detectDeviceType(data.userAgent);
    const platform = AuthDeviceFingerprint.detectPlatform(data.userAgent);
    const deviceName = AuthDeviceFingerprint.generateName({
      platform,
      type: deviceType,
    });

    // Calculate initial trust score
    const trustScore = 50; // Default trust score for new devices

    let trustLevel: 'low' | 'medium' | 'high' | 'very_high' = 'medium';
    if (trustScore >= 80) trustLevel = 'very_high';
    else if (trustScore >= 60) trustLevel = 'high';
    else if (trustScore >= 40) trustLevel = 'medium';
    else trustLevel = 'low';

    return {
      fingerprint,
      deviceName,
      deviceType,
      platform,
      trustScore,
      trustLevel,
    };
  }

  /**
   * Detect device type using AUTH_DEVICE constants
   * AUTH_DEVICE কনস্ট্যান্ট ব্যবহার করে ডিভাইস টাইপ ডিটেক্ট করা
   */
  private detectDeviceType(userAgent: string): string {
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
  }

  /**
   * Get device fingerprint from browser
   * ব্রাউজার থেকে ডিভাইস ফিঙ্গারপ্রিন্ট পাওয়া
   */
  getFromBrowser(): AuthDeviceFingerprintData {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
    };
  }

  /**
   * Check if device is trusted
   * ডিভাইস ট্রাস্টেড কিনা চেক করা
   */
  isTrusted(deviceId: string, trustedDevices: string[]): boolean {
    return trustedDevices.includes(deviceId);
  }

  /**
   * Calculate device trust score based on history
   * ইতিহাসের ভিত্তিতে ডিভাইস ট্রাস্ট স্কোর ক্যালকুলেট করা
   */
  calculateTrustScore(deviceData: {
    knownDevice: boolean;
    lastActiveDays: number;
    loginAttempts: number;
    successfulLogins: number;
  }): { score: number; level: 'low' | 'medium' | 'high' | 'very_high' } {
    return AuthDeviceFingerprint.calculateTrustScore(deviceData);
  }

  /**
   * Get device status from AUTH_DEVICE constants
   * AUTH_DEVICE কনস্ট্যান্ট থেকে ডিভাইস স্ট্যাটাস পাওয়া
   */
  getDeviceStatus(trustScore: number): string {
    if (trustScore >= 80) return AUTH_DEVICE.STATUS.TRUSTED;
    if (trustScore >= 60) return AUTH_DEVICE.STATUS.UNTRUSTED;
    if (trustScore >= 40) return AUTH_DEVICE.STATUS.SUSPICIOUS;
    return AUTH_DEVICE.STATUS.BLOCKED;
  }
}

export const createAuthDeviceFingerprintClient = (): AuthDeviceFingerprintClient => {
  return new AuthDeviceFingerprintClient();
};
