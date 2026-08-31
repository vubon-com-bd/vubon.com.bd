/**
 * User Type Constants
 * All possible user types in the system
 * Imports common type values where applicable
 */

/**
 * Core user types
 * Defines the fundamental user types in the system
 */
export const USER_TYPE = {
  /** Individual person user */
  INDIVIDUAL: 'individual',
  /** Business or company user */
  BUSINESS: 'business',
  /** Organization or institution user */
  ORGANIZATION: 'organization',
  /** Government entity user */
  GOVERNMENT: 'government',
  /** Non-profit organization user */
  NON_PROFIT: 'non_profit',
  /** Educational institution user */
  EDUCATIONAL: 'educational',
  /** Freelancer or independent worker */
  FREELANCER: 'freelancer',
  /** Agency or service provider */
  AGENCY: 'agency',
} as const;

/**
 * User account types
 * Account-level categorization
 */
export const USER_ACCOUNT_TYPE = {
  /** Standard regular user account */
  STANDARD: 'standard',
  /** Premium user account with additional features */
  PREMIUM: 'premium',
  /** Enterprise user account */
  ENTERPRISE: 'enterprise',
  /** Trial user account with limited features */
  TRIAL: 'trial',
  /** Guest user account with limited access */
  GUEST: 'guest',
} as const;

/**
 * User registration types
 * How the user registered
 */
export const USER_REGISTRATION_TYPE = {
  /** Registered via email/password */
  EMAIL: 'email',
  /** Registered via phone number */
  PHONE: 'phone',
  /** Registered via social media */
  SOCIAL: 'social',
  /** Registered via Single Sign-On */
  SSO: 'sso',
  /** Registered via OAuth */
  OAUTH: 'oauth',
  /** Registered via invitation */
  INVITATION: 'invitation',
  /** Registered via API */
  API: 'api',
  /** Registered via magic link */
  MAGIC_LINK: 'magic_link',
} as const;

/**
 * User source types
 * Where the user came from
 */
export const USER_SOURCE_TYPE = {
  /** User registered directly on the platform */
  DIRECT: 'direct',
  /** User came from organic search */
  ORGANIC: 'organic',
  /** User came from social media */
  SOCIAL_MEDIA: 'social_media',
  /** User came from referral */
  REFERRAL: 'referral',
  /** User came from advertisement */
  ADVERTISEMENT: 'advertisement',
  /** User came from email campaign */
  EMAIL_CAMPAIGN: 'email_campaign',
  /** User came from partner integration */
  PARTNER: 'partner',
  /** User came from mobile app */
  MOBILE_APP: 'mobile_app',
  /** User came from marketplace */
  MARKETPLACE: 'marketplace',
} as const;

/**
 * User status types (re-exported for convenience)
 * These are already defined in user-status.constants.ts
 * We're re-exporting them here for easier access
 */
export {
  USER_STATUS,
  USER_VERIFICATION_STATUS,
  USER_ACCOUNT_STATUS,
  USER_KYC_STATUS,
  USER_PREFERENCE_STATUS,
  USER_CONTACT_STATUS,
  USER_ADDRESS_STATUS,
  USER_SESSION_STATUS,
  USER_ACTIVITY_STATUS,
  USER_NOTIFICATION_STATUS,
  USER_RELATIONSHIP_STATUS,
  USER_SUBSCRIPTION_STATUS,
} from './user-status.constants';

/**
 * User type labels
 * Human-readable labels for UI
 */
export const USER_TYPE_LABELS: Record<string, string> = {
  [USER_TYPE.INDIVIDUAL]: 'Individual',
  [USER_TYPE.BUSINESS]: 'Business',
  [USER_TYPE.ORGANIZATION]: 'Organization',
  [USER_TYPE.GOVERNMENT]: 'Government',
  [USER_TYPE.NON_PROFIT]: 'Non-Profit',
  [USER_TYPE.EDUCATIONAL]: 'Educational',
  [USER_TYPE.FREELANCER]: 'Freelancer',
  [USER_TYPE.AGENCY]: 'Agency',
};

/**
 * User account type labels
 */
export const USER_ACCOUNT_TYPE_LABELS: Record<string, string> = {
  [USER_ACCOUNT_TYPE.STANDARD]: 'Standard',
  [USER_ACCOUNT_TYPE.PREMIUM]: 'Premium',
  [USER_ACCOUNT_TYPE.ENTERPRISE]: 'Enterprise',
  [USER_ACCOUNT_TYPE.TRIAL]: 'Trial',
  [USER_ACCOUNT_TYPE.GUEST]: 'Guest',
};

/**
 * User registration type labels
 */
export const USER_REGISTRATION_TYPE_LABELS: Record<string, string> = {
  [USER_REGISTRATION_TYPE.EMAIL]: 'Email',
  [USER_REGISTRATION_TYPE.PHONE]: 'Phone',
  [USER_REGISTRATION_TYPE.SOCIAL]: 'Social',
  [USER_REGISTRATION_TYPE.SSO]: 'Single Sign-On',
  [USER_REGISTRATION_TYPE.OAUTH]: 'OAuth',
  [USER_REGISTRATION_TYPE.INVITATION]: 'Invitation',
  [USER_REGISTRATION_TYPE.API]: 'API',
  [USER_REGISTRATION_TYPE.MAGIC_LINK]: 'Magic Link',
};

/**
 * User source type labels
 */
export const USER_SOURCE_TYPE_LABELS: Record<string, string> = {
  [USER_SOURCE_TYPE.DIRECT]: 'Direct',
  [USER_SOURCE_TYPE.ORGANIC]: 'Organic Search',
  [USER_SOURCE_TYPE.SOCIAL_MEDIA]: 'Social Media',
  [USER_SOURCE_TYPE.REFERRAL]: 'Referral',
  [USER_SOURCE_TYPE.ADVERTISEMENT]: 'Advertisement',
  [USER_SOURCE_TYPE.EMAIL_CAMPAIGN]: 'Email Campaign',
  [USER_SOURCE_TYPE.PARTNER]: 'Partner',
  [USER_SOURCE_TYPE.MOBILE_APP]: 'Mobile App',
  [USER_SOURCE_TYPE.MARKETPLACE]: 'Marketplace',
};

/**
 * Check if user type is valid
 */
export function isValidUserType(type: string): boolean {
  return Object.values(USER_TYPE).includes(type as (typeof USER_TYPE)[keyof typeof USER_TYPE]);
}

/**
 * Check if user account type is valid
 */
export function isValidUserAccountType(type: string): boolean {
  return Object.values(USER_ACCOUNT_TYPE).includes(
    type as (typeof USER_ACCOUNT_TYPE)[keyof typeof USER_ACCOUNT_TYPE]
  );
}

/**
 * Check if user registration type is valid
 */
export function isValidUserRegistrationType(type: string): boolean {
  return Object.values(USER_REGISTRATION_TYPE).includes(
    type as (typeof USER_REGISTRATION_TYPE)[keyof typeof USER_REGISTRATION_TYPE]
  );
}

/**
 * Check if user source type is valid
 */
export function isValidUserSourceType(type: string): boolean {
  return Object.values(USER_SOURCE_TYPE).includes(
    type as (typeof USER_SOURCE_TYPE)[keyof typeof USER_SOURCE_TYPE]
  );
}

/**
 * Get user type label
 */
export function getUserTypeLabel(type: string): string {
  return USER_TYPE_LABELS[type] || type;
}

/**
 * Get user account type label
 */
export function getUserAccountTypeLabel(type: string): string {
  return USER_ACCOUNT_TYPE_LABELS[type] || type;
}

/**
 * Get user registration type label
 */
export function getUserRegistrationTypeLabel(type: string): string {
  return USER_REGISTRATION_TYPE_LABELS[type] || type;
}

/**
 * Get user source type label
 */
export function getUserSourceTypeLabel(type: string): string {
  return USER_SOURCE_TYPE_LABELS[type] || type;
}

/**
 * Check if user is individual type
 */
export function isUserIndividual(type: string): boolean {
  return type === USER_TYPE.INDIVIDUAL;
}

/**
 * Check if user is business type
 */
export function isUserBusiness(type: string): boolean {
  return type === USER_TYPE.BUSINESS;
}

/**
 * Check if user is organization type
 */
export function isUserOrganization(type: string): boolean {
  return type === USER_TYPE.ORGANIZATION;
}

/**
 * Check if user is premium account
 */
export function isUserPremium(type: string): boolean {
  return type === USER_ACCOUNT_TYPE.PREMIUM;
}

/**
 * Check if user is enterprise account
 */
export function isUserEnterprise(type: string): boolean {
  return type === USER_ACCOUNT_TYPE.ENTERPRISE;
}

/**
 * Check if user is guest account
 */
export function isUserGuest(type: string): boolean {
  return type === USER_ACCOUNT_TYPE.GUEST;
}

/**
 * Check if user registered via email
 */
export function isUserRegisteredViaEmail(type: string): boolean {
  return type === USER_REGISTRATION_TYPE.EMAIL;
}

/**
 * Check if user registered via social
 */
export function isUserRegisteredViaSocial(type: string): boolean {
  return type === USER_REGISTRATION_TYPE.SOCIAL;
}

/**
 * Check if user is from direct source
 */
export function isUserFromDirectSource(type: string): boolean {
  return type === USER_SOURCE_TYPE.DIRECT;
}

/**
 * Check if user is from social media
 */
export function isUserFromSocialMedia(type: string): boolean {
  return type === USER_SOURCE_TYPE.SOCIAL_MEDIA;
}

/**
 * Get all user types
 */
export function getAllUserTypes(): string[] {
  return Object.values(USER_TYPE);
}

/**
 * Get all user account types
 */
export function getAllUserAccountTypes(): string[] {
  return Object.values(USER_ACCOUNT_TYPE);
}

/**
 * Get all user registration types
 */
export function getAllUserRegistrationTypes(): string[] {
  return Object.values(USER_REGISTRATION_TYPE);
}

/**
 * Get all user source types
 */
export function getAllUserSourceTypes(): string[] {
  return Object.values(USER_SOURCE_TYPE);
}

/**
 * Check if user type is business-related
 */
export function isUserBusinessRelated(type: string): boolean {
  const businessTypes: string[] = [
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
export function isUserIndividualRelated(type: string): boolean {
  const individualTypes: string[] = [USER_TYPE.INDIVIDUAL, USER_TYPE.FREELANCER];
  return individualTypes.includes(type);
}

/**
 * Check if user account requires verification
 */
export function userAccountRequiresVerification(accountType: string): boolean {
  const requiresVerification: string[] = [USER_ACCOUNT_TYPE.PREMIUM, USER_ACCOUNT_TYPE.ENTERPRISE];
  return requiresVerification.includes(accountType);
}

/**
 * Check if user account has trial
 */
export function userAccountHasTrial(accountType: string): boolean {
  return accountType === USER_ACCOUNT_TYPE.TRIAL;
}

/**
 * Check if user registration type is password-based
 */
export function isUserRegistrationPasswordBased(type: string): boolean {
  const passwordBased: string[] = [USER_REGISTRATION_TYPE.EMAIL, USER_REGISTRATION_TYPE.PHONE];
  return passwordBased.includes(type);
}

/**
 * Check if user registration type is social-based
 */
export function isUserRegistrationSocialBased(type: string): boolean {
  const socialBased: string[] = [
    USER_REGISTRATION_TYPE.SOCIAL,
    USER_REGISTRATION_TYPE.SSO,
    USER_REGISTRATION_TYPE.OAUTH,
    USER_REGISTRATION_TYPE.MAGIC_LINK,
  ];
  return socialBased.includes(type);
}
