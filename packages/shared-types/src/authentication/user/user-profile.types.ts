/**
 * User Profile Types Module
 * User profile management types for the e-commerce platform
 * Handles profile data, updates, and visibility
 */

import { UserId, Email, PhoneNumber, Timestamp } from '../auth/core-primitives.types';

/**
 * User Profile
 * Complete user profile information
 */
export interface UserProfile {
  userId: UserId;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName?: string;
  email: Email;
  phoneNumber?: PhoneNumber;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  birthDate?: string;
  nationality?: string;
  occupation?: string;
  company?: string;
  website?: string;
  socialLinks: SocialLinks;
  addresses: Address[];
  preferredLanguage: string;
  preferredCurrency: string;
  timezone: string;
  profileVisibility: ProfileVisibility;
  lastUpdatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Social Links
 * User social media links
 */
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
  github?: string;
  website?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Address
 * User address information
 */
export interface Address {
  id: string;
  type: 'billing' | 'shipping' | 'both';
  label?: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  email?: Email;
  isDefault: boolean;
  isVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Profile Visibility
 * Profile visibility settings
 */
export interface ProfileVisibility {
  profile: 'public' | 'private' | 'contacts' | 'custom';
  email: 'public' | 'private' | 'contacts';
  phone: 'public' | 'private' | 'contacts';
  address: 'public' | 'private' | 'contacts';
  socialLinks: 'public' | 'private' | 'contacts';
  activity: 'public' | 'private' | 'contacts';
  customSettings?: Record<string, 'public' | 'private' | 'contacts'>;
}

/**
 * Profile Update Request
 * Request to update user profile
 */
export interface ProfileUpdateRequest {
  userId: UserId;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  birthDate?: string;
  nationality?: string;
  occupation?: string;
  company?: string;
  website?: string;
  socialLinks?: Partial<SocialLinks>;
  preferredLanguage?: string;
  preferredCurrency?: string;
  timezone?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Profile Update Response
 * Response after profile update
 */
export interface ProfileUpdateResponse {
  success: boolean;
  data?: {
    profile: UserProfile;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Profile Get Request
 * Request to get user profile
 */
export interface ProfileGetRequest {
  userId: UserId;
  fields?: string[];
  includeSensitive?: boolean;
}

/**
 * Profile Get Response
 * Response after getting profile
 */
export interface ProfileGetResponse {
  success: boolean;
  data?: {
    profile: UserProfile;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Profile Visibility Update Request
 * Request to update profile visibility
 */
export interface ProfileVisibilityUpdateRequest {
  userId: UserId;
  visibility: ProfileVisibility;
  metadata?: Record<string, unknown>;
}

/**
 * Profile Visibility Update Response
 * Response after profile visibility update
 */
export interface ProfileVisibilityUpdateResponse {
  success: boolean;
  data?: {
    visibility: ProfileVisibility;
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Create Request
 * Request to create address
 */
export interface AddressCreateRequest {
  userId: UserId;
  type: 'billing' | 'shipping' | 'both';
  label?: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  email?: Email;
  isDefault?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Address Create Response
 * Response after address creation
 */
export interface AddressCreateResponse {
  success: boolean;
  data?: {
    address: Address;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Update Request
 * Request to update address
 */
export interface AddressUpdateRequest {
  addressId: string;
  userId: UserId;
  type?: 'billing' | 'shipping' | 'both';
  label?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  email?: Email;
  isDefault?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Address Update Response
 * Response after address update
 */
export interface AddressUpdateResponse {
  success: boolean;
  data?: {
    address: Address;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Delete Request
 * Request to delete address
 */
export interface AddressDeleteRequest {
  addressId: string;
  userId: UserId;
  reason?: string;
}

/**
 * Address Delete Response
 * Response after address deletion
 */
export interface AddressDeleteResponse {
  success: boolean;
  data?: {
    addressId: string;
    deletedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Filter
 * Filter criteria for address queries
 */
export interface AddressFilter {
  userId?: UserId[];
  type?: ('billing' | 'shipping' | 'both')[];
  country?: string[];
  isDefault?: boolean;
  isVerified?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Profile Response Builder
 * Helper for building profile responses
 */
export interface ProfileResponseBuilder {
  getSuccess(response: ProfileGetResponse): ProfileGetResponse;
  updateSuccess(response: ProfileUpdateResponse): ProfileUpdateResponse;
  visibilitySuccess(response: ProfileVisibilityUpdateResponse): ProfileVisibilityUpdateResponse;
  addressCreateSuccess(response: AddressCreateResponse): AddressCreateResponse;
  addressUpdateSuccess(response: AddressUpdateResponse): AddressUpdateResponse;
  addressDeleteSuccess(response: AddressDeleteResponse): AddressDeleteResponse;
  error(code: string, message: string, details?: Record<string, unknown>): ProfileErrorResponse;
}

/**
 * Profile Error Response
 * Error response for profile operations
 */
export interface ProfileErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Default Profile Configuration
 */
export const DEFAULT_PROFILE_CONFIG = {
  defaultVisibility: {
    profile: 'public' as const,
    email: 'private' as const,
    phone: 'private' as const,
    address: 'private' as const,
    socialLinks: 'private' as const,
    activity: 'private' as const,
  },
  maxAddresses: 10,
  requireAddressVerification: false,
  enableSocialLinks: true,
  allowProfileCustomization: true,
} as const;
