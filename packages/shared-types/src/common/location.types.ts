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
// Location Information (Bangladesh specific)
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
  /** Postal/ZIP code */
  readonly postalCode?: string;
  /** Latitude coordinate */
  readonly latitude?: number;
  /** Longitude coordinate */
  readonly longitude?: number;
  /** Timezone (e.g., "Asia/Dhaka") */
  readonly timezone?: string;
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
// Location Coordinates
// ============================================================
export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracy?: number;
}

// ============================================================
// Address (User address for shipping)
// ============================================================
export interface Address {
  readonly id: string;
  readonly userId: string;
  readonly type: 'home' | 'office' | 'other';
  readonly isDefault: boolean;
  readonly recipientName: string;
  readonly recipientPhone: string;
  readonly addressLine1: string;
  readonly addressLine2?: string;
  readonly district: string;
  readonly upazila: string;
  readonly postCode: string;
  readonly landmark?: string;
  readonly instructions?: string;
  readonly coordinates?: Coordinates;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================
// Bangladesh Division/District/Upazila
// ============================================================
export interface Division {
  readonly id: string;
  readonly name: string;
  readonly nameBn: string;
  readonly districts: District[];
}

export interface District {
  readonly id: string;
  readonly divisionId: string;
  readonly name: string;
  readonly nameBn: string;
  readonly upazilas: Upazila[];
}

export interface Upazila {
  readonly id: string;
  readonly districtId: string;
  readonly name: string;
  readonly nameBn: string;
  readonly postCode: string;
}

// ============================================================
// Type Exports
// ============================================================
export type { LocationInfo, Coordinates, Address, Division, District, Upazila };
