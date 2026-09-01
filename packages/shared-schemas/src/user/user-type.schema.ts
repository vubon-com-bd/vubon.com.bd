/**
 * User Type Schema
 * Zod schemas for user type management
 */

import { z } from 'zod';
import {
  USER_TYPE,
  USER_ACCOUNT_TYPE,
  USER_REGISTRATION_TYPE,
  USER_SOURCE_TYPE,
  USER_TYPE_LABELS,
  USER_ACCOUNT_TYPE_LABELS,
  USER_REGISTRATION_TYPE_LABELS,
  USER_SOURCE_TYPE_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER TYPE SCHEMAS
// ============================================================

/**
 * User type schema
 */
export const userTypeSchema = z.enum([
  USER_TYPE.INDIVIDUAL,
  USER_TYPE.BUSINESS,
  USER_TYPE.ORGANIZATION,
  USER_TYPE.GOVERNMENT,
  USER_TYPE.NON_PROFIT,
  USER_TYPE.EDUCATIONAL,
  USER_TYPE.FREELANCER,
  USER_TYPE.AGENCY,
]);

/**
 * User account type schema
 */
export const userAccountTypeSchema = z.enum([
  USER_ACCOUNT_TYPE.STANDARD,
  USER_ACCOUNT_TYPE.PREMIUM,
  USER_ACCOUNT_TYPE.ENTERPRISE,
  USER_ACCOUNT_TYPE.TRIAL,
  USER_ACCOUNT_TYPE.GUEST,
]);

/**
 * User registration type schema
 */
export const userRegistrationTypeSchema = z.enum([
  USER_REGISTRATION_TYPE.EMAIL,
  USER_REGISTRATION_TYPE.PHONE,
  USER_REGISTRATION_TYPE.SOCIAL,
  USER_REGISTRATION_TYPE.SSO,
  USER_REGISTRATION_TYPE.OAUTH,
  USER_REGISTRATION_TYPE.INVITATION,
  USER_REGISTRATION_TYPE.API,
  USER_REGISTRATION_TYPE.MAGIC_LINK,
]);

/**
 * User source type schema
 */
export const userSourceTypeSchema = z.enum([
  USER_SOURCE_TYPE.DIRECT,
  USER_SOURCE_TYPE.ORGANIC,
  USER_SOURCE_TYPE.SOCIAL_MEDIA,
  USER_SOURCE_TYPE.REFERRAL,
  USER_SOURCE_TYPE.ADVERTISEMENT,
  USER_SOURCE_TYPE.EMAIL_CAMPAIGN,
  USER_SOURCE_TYPE.PARTNER,
  USER_SOURCE_TYPE.MOBILE_APP,
  USER_SOURCE_TYPE.MARKETPLACE,
]);

// ============================================================
// USER TYPE RECORD SCHEMA
// ============================================================

/**
 * User type record schema
 */
export const userTypeRecordSchema = z.object({
  type: userTypeSchema,
  accountType: userAccountTypeSchema,
  registrationType: userRegistrationTypeSchema,
  sourceType: userSourceTypeSchema,
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserType = z.infer<typeof userTypeSchema>;
export type UserAccountType = z.infer<typeof userAccountTypeSchema>;
export type UserRegistrationType = z.infer<typeof userRegistrationTypeSchema>;
export type UserSourceType = z.infer<typeof userSourceTypeSchema>;
export type UserTypeRecord = z.infer<typeof userTypeRecordSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user type is valid
 */
export function isValidUserType(type: string): type is UserType {
  return Object.values(USER_TYPE).includes(type as UserType);
}

/**
 * Check if user account type is valid
 */
export function isValidUserAccountType(type: string): type is UserAccountType {
  return Object.values(USER_ACCOUNT_TYPE).includes(type as UserAccountType);
}

/**
 * Check if user registration type is valid
 */
export function isValidUserRegistrationType(type: string): type is UserRegistrationType {
  return Object.values(USER_REGISTRATION_TYPE).includes(type as UserRegistrationType);
}

/**
 * Check if user source type is valid
 */
export function isValidUserSourceType(type: string): type is UserSourceType {
  return Object.values(USER_SOURCE_TYPE).includes(type as UserSourceType);
}

/**
 * Get user type display name
 */
export function getUserTypeDisplayName(type: UserType): string {
  return USER_TYPE_LABELS[type] || type;
}

/**
 * Get user account type display name
 */
export function getUserAccountTypeDisplayName(type: UserAccountType): string {
  return USER_ACCOUNT_TYPE_LABELS[type] || type;
}

/**
 * Get user registration type display name
 */
export function getUserRegistrationTypeDisplayName(type: UserRegistrationType): string {
  return USER_REGISTRATION_TYPE_LABELS[type] || type;
}

/**
 * Get user source type display name
 */
export function getUserSourceTypeDisplayName(type: UserSourceType): string {
  return USER_SOURCE_TYPE_LABELS[type] || type;
}

/**
 * Check if user is individual type
 */
export function isUserIndividual(type: UserType): boolean {
  return type === USER_TYPE.INDIVIDUAL;
}

/**
 * Check if user is business type
 */
export function isUserBusiness(type: UserType): boolean {
  return type === USER_TYPE.BUSINESS;
}

/**
 * Check if user is organization type
 */
export function isUserOrganization(type: UserType): boolean {
  return type === USER_TYPE.ORGANIZATION;
}

/**
 * Check if user is premium account
 */
export function isUserPremium(type: UserAccountType): boolean {
  return type === USER_ACCOUNT_TYPE.PREMIUM;
}

/**
 * Check if user is enterprise account
 */
export function isUserEnterprise(type: UserAccountType): boolean {
  return type === USER_ACCOUNT_TYPE.ENTERPRISE;
}

/**
 * Check if user is guest account
 */
export function isUserGuest(type: UserAccountType): boolean {
  return type === USER_ACCOUNT_TYPE.GUEST;
}

/**
 * Check if user registered via email
 */
export function isUserRegisteredViaEmail(type: UserRegistrationType): boolean {
  return type === USER_REGISTRATION_TYPE.EMAIL;
}

/**
 * Check if user registered via social
 */
export function isUserRegisteredViaSocial(type: UserRegistrationType): boolean {
  return type === USER_REGISTRATION_TYPE.SOCIAL;
}

/**
 * Check if user is from direct source
 */
export function isUserFromDirectSource(type: UserSourceType): boolean {
  return type === USER_SOURCE_TYPE.DIRECT;
}

/**
 * Check if user is from social media
 */
export function isUserFromSocialMedia(type: UserSourceType): boolean {
  return type === USER_SOURCE_TYPE.SOCIAL_MEDIA;
}

/**
 * Get all user types
 */
export function getAllUserTypes(): UserType[] {
  return Object.values(USER_TYPE);
}

/**
 * Get all user account types
 */
export function getAllUserAccountTypes(): UserAccountType[] {
  return Object.values(USER_ACCOUNT_TYPE);
}

/**
 * Get all user registration types
 */
export function getAllUserRegistrationTypes(): UserRegistrationType[] {
  return Object.values(USER_REGISTRATION_TYPE);
}

/**
 * Get all user source types
 */
export function getAllUserSourceTypes(): UserSourceType[] {
  return Object.values(USER_SOURCE_TYPE);
}

/**
 * Check if user type is business-related
 */
export function isUserBusinessRelated(type: UserType): boolean {
  const businessTypes: UserType[] = [
    USER_TYPE.BUSINESS,
    USER_TYPE.ORGANIZATION,
    USER_TYPE.GOVERNMENT,
    USER_TYPE.NON_PROFIT,
    USER_TYPE.EDUCATIONAL,
  ];
  return businessTypes.includes(type);
}

/**
 * Check if user type is individual-related
 */
export function isUserIndividualRelated(type: UserType): boolean {
  const individualTypes: UserType[] = [USER_TYPE.INDIVIDUAL, USER_TYPE.FREELANCER];
  return individualTypes.includes(type);
}

/**
 * Check if user account requires verification
 */
export function userAccountRequiresVerification(type: UserAccountType): boolean {
  const requiresVerification: UserAccountType[] = [
    USER_ACCOUNT_TYPE.PREMIUM,
    USER_ACCOUNT_TYPE.ENTERPRISE,
  ];
  return requiresVerification.includes(type);
}

/**
 * Check if user account has trial
 */
export function userAccountHasTrial(type: UserAccountType): boolean {
  return type === USER_ACCOUNT_TYPE.TRIAL;
}

/**
 * Check if user registration type is password-based
 */
export function isUserRegistrationPasswordBased(type: UserRegistrationType): boolean {
  const passwordBased: UserRegistrationType[] = [
    USER_REGISTRATION_TYPE.EMAIL,
    USER_REGISTRATION_TYPE.PHONE,
  ];
  return passwordBased.includes(type);
}

/**
 * Check if user registration type is social-based
 */
export function isUserRegistrationSocialBased(type: UserRegistrationType): boolean {
  const socialBased: UserRegistrationType[] = [
    USER_REGISTRATION_TYPE.SOCIAL,
    USER_REGISTRATION_TYPE.SSO,
    USER_REGISTRATION_TYPE.OAUTH,
    USER_REGISTRATION_TYPE.MAGIC_LINK,
  ];
  return socialBased.includes(type);
}
