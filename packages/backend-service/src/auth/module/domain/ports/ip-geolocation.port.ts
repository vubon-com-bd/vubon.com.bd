// packages/backend-service/src/auth/module/domain/ports/ip-geolocation.port.ts

// ✅ Shared types
import type { IpAddress } from '../value-objects/ip-address.vo';

/**
 * Geolocation data interface
 */
export interface GeolocationData {
  /** IP address that was queried */
  ip: string;
  /** Country code (ISO 3166-1 alpha-2) */
  countryCode: string;
  /** Country name */
  countryName: string;
  /** Region/state name */
  regionName: string;
  /** District name (Bangladesh specific) */
  district?: string;
  /** City name */
  city: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  /** Timezone */
  timezone: string;
  /** ISP name */
  isp?: string;
  /** Organization name */
  organization?: string;
  /** ASN (Autonomous System Number) */
  asn?: string;
  /** Connection type (e.g., 'cellular', 'wifi', 'broadband') */
  connectionType?: string;
  /** Mobile country code (MCC) */
  mcc?: string;
  /** Mobile network code (MNC) */
  mnc?: string;
  /** Mobile carrier name */
  carrier?: string;
  /** Whether the data is from a proxy/VPN */
  isProxy?: boolean;
  /** Whether the data is from a Tor network */
  isTor?: boolean;
  /** Whether the data is from a hosting provider */
  isHosting?: boolean;
}

/**
 * IP Geolocation Port Interface
 *
 * ডোমেইন লেয়ারকে আইপি জিওলোকেশন সার্ভিস থেকে আলাদা রাখার জন্য পোর্ট।
 * এই পোর্টের মাধ্যমে ডোমেইন লেয়ার IP ঠিকানা থেকে অবস্থান তথ্য পেতে পারে।
 */
export interface IIPGeolocation {
  /**
   * একটি IP ঠিকানার জিওলোকেশন ডেটা পাওয়ার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns জিওলোকেশন ডেটা বা null
   */
  getLocation(ip: IpAddress | string): Promise<GeolocationData | null>;

  /**
   * একটি IP ঠিকানা বাংলাদেশের কোন জেলায় অবস্থিত তা বের করার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns জেলা নাম বা null
   */
  getDistrict(ip: IpAddress | string): Promise<string | null>;

  /**
   * একটি IP ঠিকানা বাংলাদেশের কোন বিভাগে অবস্থিত তা বের করার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns বিভাগ নাম বা null
   */
  getDivision(ip: IpAddress | string): Promise<string | null>;

  /**
   * একটি IP ঠিকানা কোন দেশে অবস্থিত তা বের করার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns দেশের কোড (ISO 3166-1 alpha-2) বা null
   */
  getCountryCode(ip: IpAddress | string): Promise<string | null>;

  /**
   * একটি IP ঠিকানা প্রাইভেট কিনা তা চেক করার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns true যদি প্রাইভেট হয়, false যদি না হয়
   */
  isPrivate(ip: IpAddress | string): boolean;

  /**
   * একটি IP ঠিকানা বাংলাদেশি কিনা তা চেক করার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns true যদি বাংলাদেশি হয়, false যদি না হয়
   */
  isBangladeshi(ip: IpAddress | string): Promise<boolean>;

  /**
   * একটি IP ঠিকানা থেকে পাওয়া অবস্থান ডেটা ক্যাশে করার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @param data - জিওলোকেশন ডেটা
   * @param ttlSeconds - ক্যাশে রাখার সময় (সেকেন্ডে)
   * @returns সফল হলে true, না হলে false
   */
  cacheLocation(
    ip: IpAddress | string,
    data: GeolocationData,
    ttlSeconds: number
  ): Promise<boolean>;

  /**
   * একটি IP ঠিকানার ক্যাশেড অবস্থান ডেটা পাওয়ার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns ক্যাশেড জিওলোকেশন ডেটা বা null
   */
  getCachedLocation(ip: IpAddress | string): Promise<GeolocationData | null>;

  /**
   * একটি IP ঠিকানার ক্যাশেড অবস্থান ডেটা মুছে ফেলার জন্য
   * @param ip - IP ঠিকানা (IpAddress Value Object বা স্ট্রিং)
   * @returns সফল হলে true, না হলে false
   */
  clearCachedLocation(ip: IpAddress | string): Promise<boolean>;
}
