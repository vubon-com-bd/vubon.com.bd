/**
 * Admin Profile Types
 * Admin profile management definitions
 */

import { BaseEntity, ID, Timestamp, Nullable } from '../common/core-primitives.types';
import type { Admin } from './admin.types';

/**
 * Admin profile interface
 * Extended profile information for admin users
 */
export interface AdminProfile extends BaseEntity {
  /** Profile ID */
  id: ID;
  /** Admin ID (reference to Admin) */
  adminId: ID;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Full name (computed) */
  fullName: string;
  /** Display name */
  displayName: string;
  /** Bio/About */
  bio?: Nullable<string>;
  /** Avatar URL */
  avatar?: Nullable<string>;
  /** Cover image URL */
  coverImage?: Nullable<string>;
  /** Phone number */
  phone?: Nullable<string>;
  /** Address */
  address?: Nullable<AdminAddress>;
  /** Social links */
  socialLinks?: Nullable<AdminSocialLinks>;
  /** Work information */
  workInfo?: Nullable<AdminWorkInfo>;
  /** Personal preferences */
  preferences?: Nullable<AdminProfilePreferences>;
  /** Is profile complete */
  isComplete: boolean;
  /** Is profile public */
  isPublic: boolean;
  /** Last updated timestamp */
  lastUpdatedAt: Timestamp;
}

/**
 * Admin address
 */
export interface AdminAddress {
  /** Street address */
  street?: string;
  /** City */
  city?: string;
  /** State/Province */
  state?: string;
  /** Postal code */
  postalCode?: string;
  /** Country */
  country?: string;
  /** Full address (computed) */
  fullAddress?: string;
}

/**
 * Admin social links
 */
export interface AdminSocialLinks {
  /** Twitter/X handle */
  twitter?: string;
  /** LinkedIn profile */
  linkedin?: string;
  /** GitHub profile */
  github?: string;
  /** Personal website */
  website?: string;
  /** Facebook profile */
  facebook?: string;
  /** Instagram profile */
  instagram?: string;
  /** YouTube channel */
  youtube?: string;
}

/**
 * Admin work information
 */
export interface AdminWorkInfo {
  /** Job title */
  jobTitle?: string;
  /** Department */
  department?: string;
  /** Reports to (admin ID) */
  reportsTo?: ID;
  /** Employment type */
  employmentType?: 'full_time' | 'part_time' | 'contract' | 'intern';
  /** Hire date */
  hireDate?: Date;
  /** Work email */
  workEmail?: string;
  /** Work phone */
  workPhone?: string;
  /** Office location */
  officeLocation?: string;
}

/**
 * Admin profile preferences
 */
export interface AdminProfilePreferences {
  /** Language preference */
  language?: string;
  /** Timezone */
  timezone?: string;
  /** Date format */
  dateFormat?: string;
  /** Time format */
  timeFormat?: '12h' | '24h';
  /** Notification preferences */
  notifications?: AdminProfileNotificationPrefs;
  /** Privacy settings */
  privacy?: AdminProfilePrivacySettings;
}

/**
 * Admin profile notification preferences
 */
export interface AdminProfileNotificationPrefs {
  /** Email notifications enabled */
  email: boolean;
  /** Push notifications enabled */
  push: boolean;
  /** In-app notifications enabled */
  inApp: boolean;
  /** SMS notifications enabled */
  sms: boolean;
  /** Daily digest enabled */
  dailyDigest: boolean;
  /** Weekly digest enabled */
  weeklyDigest: boolean;
}

/**
 * Admin profile privacy settings
 */
export interface AdminProfilePrivacySettings {
  /** Show email to public */
  showEmail: boolean;
  /** Show phone to public */
  showPhone: boolean;
  /** Show online status */
  showOnlineStatus: boolean;
  /** Show last seen */
  showLastSeen: boolean;
  /** Allow profile search */
  allowSearch: boolean;
}

/**
 * Admin profile update data
 */
export interface AdminProfileUpdateData {
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Display name */
  displayName?: string;
  /** Bio */
  bio?: string;
  /** Avatar URL */
  avatar?: string;
  /** Cover image URL */
  coverImage?: string;
  /** Phone */
  phone?: string;
  /** Address */
  address?: Partial<AdminAddress>;
  /** Social links */
  socialLinks?: Partial<AdminSocialLinks>;
  /** Work info */
  workInfo?: Partial<AdminWorkInfo>;
  /** Preferences */
  preferences?: Partial<AdminProfilePreferences>;
  /** Is profile public */
  isPublic?: boolean;
}

/**
 * Get full name from profile
 */
export function getAdminProfileFullName(profile: AdminProfile): string {
  return `${profile.firstName} ${profile.lastName}`.trim();
}

/**
 * Get display name with fallback
 */
export function getAdminProfileDisplayName(profile: AdminProfile): string {
  return profile.displayName || getAdminProfileFullName(profile) || 'Admin User';
}

/**
 * Check if profile is complete
 */
export function isAdminProfileComplete(profile: AdminProfile): boolean {
  const requiredFields: (keyof AdminProfile)[] = ['firstName', 'lastName', 'displayName'];
  return requiredFields.every((field) => !!profile[field]);
}

/**
 * Get profile completion percentage
 */
export function getAdminProfileCompletion(profile: AdminProfile): number {
  const fields: (keyof AdminProfile)[] = [
    'firstName',
    'lastName',
    'displayName',
    'bio',
    'avatar',
    'phone',
    'address',
    'socialLinks',
    'workInfo',
  ];
  const filledFields = fields.filter((field) => !!profile[field]);
  return Math.round((filledFields.length / fields.length) * 100);
}

/**
 * Format full address
 */
export function formatAdminAddress(address: AdminAddress): string {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(', ');
}

/**
 * Create default profile from admin data
 * Returns a complete AdminProfile object (with BaseEntity fields)
 */
export function createAdminProfileFromAdmin(
  admin: Admin,
  overrides?: Partial<AdminProfileUpdateData>
): AdminProfile {
  const now = new Date();
  return {
    id: `profile_${admin.id}`,
    adminId: admin.id,
    firstName: overrides?.firstName || admin.name?.split(' ')[0] || '',
    lastName: overrides?.lastName || admin.name?.split(' ').slice(1).join(' ') || '',
    fullName: admin.name || '',
    displayName: overrides?.displayName || admin.name || '',
    bio: overrides?.bio || null,
    avatar: overrides?.avatar || null,
    coverImage: overrides?.coverImage || null,
    phone: overrides?.phone || null,
    address: overrides?.address || null,
    socialLinks: overrides?.socialLinks || null,
    workInfo: overrides?.workInfo || null,
    preferences: overrides?.preferences || null,
    isComplete: false,
    isPublic: overrides?.isPublic ?? true,
    lastUpdatedAt: now,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };
}
