/**
 * Location Types - Pure TypeScript type contracts for Location
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-types/src/common/location.types
 *
 * RULES:
 * ✅ ONLY type declarations - NO business logic
 * ✅ NO functions, classes, enums
 * ✅ NO framework imports
 * ✅ Readonly modifiers for immutability
 */

// ============================================================
// Basic Location Information (Bangladesh specific)
// ============================================================
export interface LocationInfo {
  /** Country name (e.g., "Bangladesh") */
  readonly country: string;
  /** Country code (ISO 3166-1 alpha-2) (e.g., "BD") */
  readonly countryCode: string;
  /** City name (e.g., "Dhaka") */
  readonly city: string;
  /** Bangladesh district (e.g., "Dhaka", "Chattogram") */
  readonly district?: string;
  /** Bangladesh upazila/thana */
  readonly upazila?: string;
  /** Union (গ্রামীণ এলাকার জন্য) */
  readonly union?: string;
  /** Ward number (শহরের ওয়ার্ড, 1-9) */
  readonly wardNumber?: number;
  /** Postal/ZIP code */
  readonly postalCode?: string;
  /** Latitude coordinate */
  readonly latitude?: number;
  /** Longitude coordinate */
  readonly longitude?: number;
  /** Timezone (e.g., "Asia/Dhaka") */
  readonly timezone?: string;
  /** Local time at this location (ISO) */
  readonly localTime?: string;
  /** Day or night (for security checks) */
  readonly dayNight?: 'day' | 'night';
  /** Is today a Bangladesh public holiday? */
  readonly isHoliday?: boolean;
  /** Internet Service Provider */
  readonly isp?: string;
  /** Autonomous System Number */
  readonly asn?: string;
  /** Whether the IP is a proxy */
  readonly isProxy?: boolean;
  /** Whether the IP is a VPN */
  readonly isVpn?: boolean;
  /** Whether the IP is a Tor exit node */
  readonly isTor?: boolean;
}

// ============================================================
// Geographic Coordinates
// ============================================================
export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracy?: number; // meters
}

// ============================================================
// GeoLocation with reverse geocoding
// ============================================================
export interface GeoLocation extends Coordinates {
  /** Reverse geocoded address */
  readonly address: string;
  /** Google Maps Place ID */
  readonly placeId?: string;
  /** Open Location Code (Plus Code) */
  readonly plusCode?: string;
  /** Location type */
  readonly type?: 'rooftop' | 'street' | 'approximate' | 'geometric_center';
}

// ============================================================
// Bangladesh Administrative Structure
// ============================================================

/** Division (বিভাগ) - Level 1 */
export interface Division {
  readonly id: string;
  readonly name: string;
  readonly nameBn: string;
  readonly districts: readonly District[];
}

/** District (জেলা) - Level 2 */
export interface District {
  readonly id: string;
  readonly divisionId: string;
  readonly name: string;
  readonly nameBn: string;
  readonly upazilas: readonly Upazila[];
}

/** Upazila / Thana (উপজেলা/থানা) - Level 3 */
export interface Upazila {
  readonly id: string;
  readonly districtId: string;
  readonly name: string;
  readonly nameBn: string;
  readonly postCode: string;
  readonly unions: readonly Union[];
}

/** Union (ইউনিয়ন) - Level 4 (গ্রামীণ এলাকার জন্য গুরুত্বপূর্ণ) */
export interface Union {
  readonly id: string;
  readonly upazilaId: string;
  readonly name: string;
  readonly nameBn: string;
  readonly wards: readonly Ward[];
}

/** Ward (ওয়ার্ড) - Level 5 (শহর এলাকার জন্য) */
export interface Ward {
  readonly id: string;
  readonly unionId: string;
  readonly number: number; // 1-9
  readonly name?: string;
  readonly nameBn?: string;
}

// ============================================================
// User Address (For shipping, billing)
// ============================================================
export interface Address {
  readonly id: string;
  readonly userId: string;
  readonly type: 'home' | 'office' | 'other';
  readonly isDefault: boolean;
  readonly isBillingSame?: boolean; // Is billing address same as shipping?

  // Recipient information
  readonly recipientName: string;
  readonly recipientPhone: string;
  readonly recipientAlternatePhone?: string;

  // Address details
  readonly addressLine1: string;
  readonly addressLine2?: string;

  // Bangladesh administrative levels
  readonly district: string;
  readonly upazila: string;
  readonly union?: string;
  readonly wardNumber?: number;
  readonly village?: string;        // গ্রাম/মৌজা
  readonly postCode: string;

  // Delivery assistance
  readonly landmark?: string;       // দোকানের পাশের মসজিদ, মেডিকেল, স্কুল ইত্যাদি
  readonly instructions?: string;   // "৩য় তলা, লিফট নাই", "গেইটের বাম দিকে"

  // Geographic
  readonly coordinates?: Coordinates;
  readonly geoLocation?: GeoLocation;

  // Metadata
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly lastUsedAt?: Date;
}

// ============================================================
// Delivery Zone (For shipping charge & availability)
// ============================================================
export interface DeliveryZone {
  readonly id: string;
  readonly name: string;
  readonly nameBn?: string;

  // Zone coverage
  readonly districts?: readonly string[];
  readonly upazilas?: readonly string[];
  readonly unions?: readonly string[];
  readonly postCodes?: readonly string[];

  // Pricing & availability
  readonly deliveryCharge: number;
  readonly freeDeliveryThreshold?: number; // Minimum order amount for free delivery
  readonly codAvailable: boolean;
  readonly codCharge?: number;
  readonly estimatedDays: number;          // Minimum delivery days
  readonly maxEstimatedDays?: number;

  // Restrictions
  readonly isActive: boolean;
  readonly isHolidayDelivery?: boolean;
  readonly restrictedProducts?: readonly string[]; // Product categories not deliverable

  // Metadata
  readonly priority: number;               // For zone matching (higher = more specific)
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================
// Delivery Coverage Check Result
// ============================================================
export interface DeliveryCoverageResult {
  readonly isDeliverable: boolean;
  readonly deliveryZone?: DeliveryZone;
  readonly deliveryCharge: number;
  readonly estimatedDays: number;
  readonly codAvailable: boolean;
  readonly unavailableReason?: string;
  readonly unavailableReasonBn?: string;
}

// ============================================================
// User Location History (For security & analytics)
// ============================================================
export interface UserLocationHistory {
  readonly id: string;
  readonly userId: string;
  readonly location: LocationInfo;
  readonly coordinates?: Coordinates;
  readonly deviceId?: string;
  readonly sessionId?: string;
  readonly requestId?: string;
  readonly source: 'login' | 'order' | 'payment' | 'api_call' | 'manual' | 'profile_update';
  readonly action?: string;                 // What action triggered this location capture
  readonly timestamp: Date;
}

// ============================================================
// Location Change Detection Result (For security)
// ============================================================
export interface LocationChangeResult {
  readonly hasChanged: boolean;
  readonly previousLocation?: LocationInfo;
  readonly currentLocation?: LocationInfo;
  readonly distanceKm?: number;
  readonly timeDifferenceMinutes?: number;
  readonly isSuspicious: boolean;
  readonly suspicionReason?: string;
  readonly suggestedAction?: 'allow' | 'mfa_required' | 'block' | 'notify_user';
}

// ============================================================
// Bangladesh Divisions Constants (Type-safe)
// ============================================================
export const BANGLADESH_DIVISIONS = {
  DHAKA: { name: 'Dhaka', nameBn: 'ঢাকা' },
  CHATTOGRAM: { name: 'Chattogram', nameBn: 'চট্টগ্রাম' },
  RAJSHAHI: { name: 'Rajshahi', nameBn: 'রাজশাহী' },
  KHULNA: { name: 'Khulna', nameBn: 'খুলনা' },
  BARISHAL: { name: 'Barishal', nameBn: 'বরিশাল' },
  SYLHET: { name: 'Sylhet', nameBn: 'সিলেট' },
  RANGPUR: { name: 'Rangpur', nameBn: 'রংপুর' },
  MYMENSINGH: { name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
} as const;

export type BangladeshDivisionName = typeof BANGLADESH_DIVISIONS[keyof typeof BANGLADESH_DIVISIONS]['name'];
export type BangladeshDivisionNameBn = typeof BANGLADESH_DIVISIONS[keyof typeof BANGLADESH_DIVISIONS]['nameBn'];

// ============================================================
// Location Filter Options
// ============================================================
export interface LocationFilterOptions {
  readonly userId?: string;
  readonly district?: string;
  readonly upazila?: string;
  readonly source?: UserLocationHistory['source'];
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
}

// ============================================================
// IP Geolocation Response (From 3rd party API)
// ============================================================
export interface IPGeolocationResponse {
  readonly ip: string;
  readonly country: string;
  readonly countryCode: string;
  readonly city: string;
  readonly district?: string;      // Bangladesh specific
  readonly postalCode?: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly timezone: string;
  readonly isp: string;
  readonly isProxy: boolean;
  readonly isVpn: boolean;
  readonly isTor: boolean;
  readonly accuracyRadiusKm?: number;
}
