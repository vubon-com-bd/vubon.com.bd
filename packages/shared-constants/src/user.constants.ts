/**
 * User Constants - Core domain constants for user management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-constants/user.constants
 *
 * @description
 * Centralized constants for user roles, statuses, tiers, locations, and account management.
 * Single source of truth for the entire monorepo.
 *
 * RULES:
 * ✅ ONLY readonly constants - NO business logic
 * ✅ NO functions, NO side effects
 * ✅ Immutable with 'as const'
 * ✅ Type-safe with 'ValueOf' helper
 * ✅ Bangladesh specific - All 64 districts, upazilas, mobile operators
 * ✅ All exports are uniquely named with USER_ prefix
 */

import type { ValueOf } from './common.types';

// ============================================================
// User Roles (Extended for Bangladesh E-commerce)
// ============================================================

/**
 * All user roles in the system
 * @example 'super_admin', 'admin', 'vendor', 'customer'
 */
export const USER_ROLES = {
  /** Full system access with all permissions */
  SUPER_ADMIN: 'super_admin',
  /** Administrative access with most permissions */
  ADMIN: 'admin',
  /** Read-only access to system metrics and logs */
  SYSTEM_MONITOR: 'system_monitor',
  /** Audit access to logs and compliance data */
  AUDITOR: 'auditor',
  /** Manage products, categories, and content */
  CONTENT_MANAGER: 'content_manager',
  /** Manage campaigns, offers, and promotions */
  MARKETING_MANAGER: 'marketing_manager',
  /** Access to reports and analytics */
  ANALYST: 'analyst',
  /** Handle customer support tickets */
  SUPPORT_AGENT: 'support_agent',
  /** Manage support team and escalated tickets */
  SUPPORT_SUPERVISOR: 'support_supervisor',
  /** Sell products on the marketplace */
  VENDOR: 'vendor',
  /** Manage multiple vendors and their shops */
  VENDOR_MANAGER: 'vendor_manager',
  /** Deliver orders to customers */
  DELIVERY_AGENT: 'delivery_agent',
  /** Manage delivery operations and agents */
  DELIVERY_MANAGER: 'delivery_manager',
  /** Manage a specific vendor shop */
  SHOP_MANAGER: 'shop_manager',
  /** Assist with shop operations */
  SHOP_STAFF: 'shop_staff',
  /** Regular customer with standard access */
  CUSTOMER: 'customer',
  /** Unauthenticated visitor */
  GUEST: 'guest',
  /** Loyalty program members with benefits */
  PREMIUM_CUSTOMER: 'premium_customer',
  /** Manage operations at district level */
  DISTRICT_MANAGER: 'district_manager',
  /** Local agent for last-mile operations */
  UPZILA_AGENT: 'upzila_agent',
  /** Agent for bKash/Nagad/Rocket payments */
  MFS_AGENT: 'mfs_agent',
} as const;

export type UserRole = ValueOf<typeof USER_ROLES>;

// ============================================================
// User Statuses (UNIQUE NAME: USER_STATUSES)
// ============================================================

/**
 * All possible user account statuses
 * @example 'active', 'suspended', 'banned'
 */
export const USER_STATUSES = {
  /** Account is fully active and accessible */
  ACTIVE: 'active',
  /** Account is inactive (user disabled) */
  INACTIVE: 'inactive',
  /** Account is temporarily suspended */
  SUSPENDED: 'suspended',
  /** Account is permanently banned */
  BANNED: 'banned',
  /** Account is pending verification */
  PENDING_VERIFICATION: 'pending_verification',
  /** Account is deactivated by user */
  DEACTIVATED: 'deactivated',
  /** Account is locked due to security */
  LOCKED: 'locked',
} as const;

export type UserStatus = ValueOf<typeof USER_STATUSES>;

// ============================================================
// User Tiers (UNIQUE NAME: USER_TIERS)
// ============================================================

/**
 * User loyalty program tiers (Bangladesh specific)
 * Based on total spending amount (BDT)
 *
 * @example 'bronze' (0 BDT), 'silver' (5,000+ BDT), 'gold' (25,000+ BDT)
 */
export const USER_TIERS = {
  /** Base tier - 0+ BDT spent */
  BRONZE: 'bronze',
  /** 5,000+ BDT spent - 5% discount, free shipping */
  SILVER: 'silver',
  /** 25,000+ BDT spent - 10% discount, free shipping */
  GOLD: 'gold',
  /** 100,000+ BDT spent - 15% discount, free shipping, priority support */
  PLATINUM: 'platinum',
  /** 500,000+ BDT spent - 20% discount, free shipping, priority support */
  DIAMOND: 'diamond',
} as const;

export type UserTier = ValueOf<typeof USER_TIERS>;

// ============================================================
// Bangladesh Districts (UNIQUE NAME: BANGLADESH_DISTRICTS)
// ============================================================

/**
 * All 64 districts of Bangladesh (বাংলাদেশের ৬৪টি জেলা)
 * @example 'Dhaka', 'Chattogram', 'Rajshahi'
 */
export const BANGLADESH_DISTRICTS = [
  // Barishal Division
  'Barishal', 'Barguna', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur',
  // Chattogram Division
  'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattogram', "Cox's Bazar", 'Feni',
  'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati', 'Cumilla',
  // Dhaka Division
  'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur',
  'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur',
  'Tangail',
  // Khulna Division
  'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khulna', 'Kushtia',
  'Magura', 'Meherpur', 'Narail', 'Satkhira',
  // Mymensingh Division
  'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur',
  // Rajshahi Division
  'Bogura', 'Chapainawabganj', 'Joypurhat', 'Naogaon', 'Natore', 'Pabna', 'Rajshahi', 'Sirajganj',
  // Rangpur Division
  'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon',
  // Sylhet Division
  'Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet',
] as const;

export type BangladeshDistrict = typeof BANGLADESH_DISTRICTS[number];

// ============================================================
// Bangladesh Upazilas (UNIQUE NAME: BANGLADESH_UPAZILAS)
// ============================================================

/**
 * Major upazilas of Bangladesh (উপজেলা/থানা)
 * Includes divisional cities and major commercial areas
 * @example 'Gulshan', 'Motijheel', 'Chittagong City'
 */
export const BANGLADESH_UPAZILAS = [
  // Dhaka Division
  'Gulshan', 'Banani', 'Motijheel', 'Dhanmondi', 'Mirpur', 'Uttara', 'Rampura',
  'Badda', 'Mohammadpur', 'Tejgaon', 'Shahbagh', 'Lalbagh', 'Khilgaon', 'Jatrabari',
  'Demra', 'Savar', 'Narayanganj City', 'Gazipur City',
  // Chattogram Division
  'Chittagong City', 'Pahartali', 'Halishahar', 'Agrabad', 'Panchlaish', 'Bayezid',
  'Kotwali', "Cox's Bazar City", 'Brahmanbaria City', 'Comilla City',
  // Rajshahi Division
  'Rajshahi City', 'Bogura City', 'Pabna City',
  // Khulna Division
  'Khulna City', 'Jashore City',
  // Barishal Division
  'Barishal City',
  // Sylhet Division
  'Sylhet City', 'Moulvibazar Town',
  // Rangpur Division
  'Rangpur City', 'Dinajpur City',
  // Mymensingh Division
  'Mymensingh City',
] as const;

export type BangladeshUpazila = typeof BANGLADESH_UPAZILAS[number];

// ============================================================
// Mobile Operators (UNIQUE NAME: USER_MOBILE_OPERATORS)
// ============================================================

/**
 * Bangladesh mobile network operators
 * @example 'gp' (Grameenphone), 'robi', 'banglalink'
 */
export const USER_MOBILE_OPERATORS = {
  /** Grameenphone (GP) - Largest operator in BD */
  GP: 'gp',
  /** Robi - Second largest operator (includes Airtel) */
  ROBI: 'robi',
  /** Banglalink - Third largest operator */
  BANGLALINK: 'banglalink',
  /** Teletalk - State-owned operator */
  TELETALK: 'teletalk',
  /** Unknown operator */
  UNKNOWN: 'unknown',
} as const;

export type UserMobileOperator = ValueOf<typeof USER_MOBILE_OPERATORS>;

// ============================================================
// Network Types (UNIQUE NAME: USER_NETWORK_TYPES)
// ============================================================

/**
 * Mobile network types (Bangladesh specific)
 * @example '4g', '5g', 'wifi'
 */
export const USER_NETWORK_TYPES = {
  /** 2G network (slowest) */
  MOBILE_2G: '2g',
  /** 3G network */
  MOBILE_3G: '3g',
  /** 4G network (LTE) */
  MOBILE_4G: '4g',
  /** 5G network */
  MOBILE_5G: '5g',
  /** Mobile network (unknown generation) */
  MOBILE_UNKNOWN: 'mobile_unknown',
  /** WiFi network */
  WIFI: 'wifi',
  /** Public WiFi (higher risk) */
  WIFI_PUBLIC: 'wifi_public',
  /** Secure WiFi (home/office) */
  WIFI_SECURE: 'wifi_secure',
  /** Ethernet (wired) */
  ETHERNET: 'ethernet',
  /** VPN connection */
  VPN: 'vpn',
  /** Proxy connection */
  PROXY: 'proxy',
  /** Tor network */
  TOR: 'tor',
  /** Unknown network type */
  UNKNOWN: 'unknown',
} as const;

export type UserNetworkType = ValueOf<typeof USER_NETWORK_TYPES>;

// ============================================================
// Account Deletion Reasons (UNIQUE NAME: USER_DELETION_REASONS)
// ============================================================

/**
 * Reasons for account deletion (user initiated)
 * @example 'USER_REQUESTED', 'PRIVACY_CONCERN'
 */
export const USER_DELETION_REASONS = {
  /** User requested account deletion */
  USER_REQUESTED: 'user_requested',
  /** User deleted account for privacy reasons */
  PRIVACY_CONCERN: 'privacy_concern',
  /** User no longer wants to use the service */
  NO_LONGER_NEEDED: 'no_longer_needed',
  /** User found a better alternative */
  BETTER_ALTERNATIVE: 'better_alternative',
  /** Account was inactive for too long */
  INACTIVITY: 'inactivity',
  /** Admin initiated deletion (policy violation) */
  ADMIN_ACTION: 'admin_action',
  /** Deleted due to security breach */
  SECURITY_BREACH: 'security_breach',
  /** Account was a duplicate */
  DUPLICATE_ACCOUNT: 'duplicate_account',
} as const;

export type UserDeletionReason = ValueOf<typeof USER_DELETION_REASONS>;

// ============================================================
// Account Suspension Reasons (UNIQUE NAME: USER_SUSPENSION_REASONS)
// ============================================================

/**
 * Reasons for account suspension (admin action)
 * @example 'TERMS_VIOLATION', 'FRAUD_SUSPECTED'
 */
export const USER_SUSPENSION_REASONS = {
  /** Violation of terms of service */
  TERMS_VIOLATION: 'terms_violation',
  /** Fraudulent activity suspected */
  FRAUD_SUSPECTED: 'fraud_suspected',
  /** Suspicious activity detected */
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  /** Temporary suspension (investigation) */
  TEMPORARY_SAFETY: 'temporary_safety',
  /** Permanent ban */
  PERMANENT_BAN: 'permanent_ban',
  /** Admin initiated suspension */
  ADMIN_ACTION: 'admin_action',
  /** Pending investigation */
  PENDING_INVESTIGATION: 'pending_investigation',
  /** User requested temporary freeze */
  USER_REQUESTED_FREEZE: 'user_requested_freeze',
} as const;

export type UserSuspensionReason = ValueOf<typeof USER_SUSPENSION_REASONS>;

// ============================================================
// Type Exports
// ============================================================

export type UserConstants = {
  USER_ROLES: typeof USER_ROLES;
  USER_STATUSES: typeof USER_STATUSES;
  USER_TIERS: typeof USER_TIERS;
  BANGLADESH_DISTRICTS: typeof BANGLADESH_DISTRICTS;
  BANGLADESH_UPAZILAS: typeof BANGLADESH_UPAZILAS;
  USER_MOBILE_OPERATORS: typeof USER_MOBILE_OPERATORS;
  USER_NETWORK_TYPES: typeof USER_NETWORK_TYPES;
  USER_DELETION_REASONS: typeof USER_DELETION_REASONS;
  USER_SUSPENSION_REASONS: typeof USER_SUSPENSION_REASONS;
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
//
// ✅ All constants are readonly with 'as const'
// ✅ All names are uniquely prefixed with USER_ to avoid conflicts
// ✅ Type-safe with ValueOf helper
// ✅ Bangladesh specific (64 districts, upazilas, mobile operators)
// ✅ Single source of truth for entire monorepo
// ✅ No business logic - pure constants only
// ✅ JSDoc comments for documentation
// ✅ Type exports for consuming packages
//
// ============================================================
