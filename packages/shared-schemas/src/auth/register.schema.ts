/**
 * Register Schemas - Pure validation for user registration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/register.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO email sending, password hashing, user creation
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
// ✅ FIXED: Correct package name
import {
  REGEX_EMAIL,
  REGEX_PHONE,
  PASSWORD_POLICY,
} from '@vubon/shared-constants';

// ==================== Primitives (Reusable) ====================

// Email Schema (Based on REGEX_EMAIL constants)
export const UserEmailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(255, 'Email too long')
  .regex(REGEX_EMAIL.STRICT, 'Invalid email format. Example: user@example.com')
  .trim()
  .toLowerCase()
  .brand('UserEmail');

// Phone Schema (Bangladesh specific - Based on REGEX_PHONE)
// ✅ FIXED: brand after optional/nullable
export const UserPhoneSchema = z
  .string()
  .regex(REGEX_PHONE.BANGLADESH, 'Invalid Bangladesh phone number format. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    // Normalize to +880 format
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .optional()
  .nullable()
  .brand('UserPhone');

// Phone Schema (Required version)
export const UserPhoneRequiredSchema = z
  .string()
  .regex(REGEX_PHONE.BANGLADESH, 'Invalid Bangladesh phone number format. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('UserPhoneRequired');

// First Name Schema (Supports English & Bengali)
export const UserFirstNameSchema = z
  .string()
  .min(1, 'First name is required')
  .min(2, 'First name must be at least 2 characters')
  .max(50, 'First name cannot exceed 50 characters')
  .regex(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
  .trim()
  .brand('UserFirstName');

// Last Name Schema (Supports English & Bengali)
export const UserLastNameSchema = z
  .string()
  .min(1, 'Last name is required')
  .min(2, 'Last name must be at least 2 characters')
  .max(50, 'Last name cannot exceed 50 characters')
  .regex(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
  .trim()
  .brand('UserLastName');

// Display Name Schema (Auto-generated or custom)
export const UserDisplayNameSchema = z
  .string()
  .min(2, 'Display name must be at least 2 characters')
  .max(100, 'Display name cannot exceed 100 characters')
  .regex(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, 'Display name contains invalid characters')
  .trim()
  .optional()
  .brand('UserDisplayName');

// Password Schema (Based on PASSWORD_POLICY constants)
export const UserPasswordSchema = z
  .string()
  .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
  .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`);

// Strong Password Schema with all requirements
export const UserStrongPasswordSchema = z
  .string()
  .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
  .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`)
  .superRefine((val, ctx) => {
    if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_NUMBERS && !/\d/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one number',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one special character',
        path: ['password'],
      });
    }
    // Optional: Check for repeated characters (security)
    if (/(.)\1{2,}/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain repeated characters (e.g., "aaa")',
        path: ['password'],
      });
    }
  })
  .brand('UserStrongPassword');

// Username Schema (For username-based registration)
export const UsernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(50, 'Username cannot exceed 50 characters')
  .regex(/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, dots, and underscores')
  .trim()
  .toLowerCase()
  .brand('Username');

// ==================== Registration Primitives ====================

// Terms and Conditions Acceptance
export const AcceptTermsSchema = z.boolean().refine((val) => val === true, {
  message: 'You must accept the terms and conditions',
});

// Privacy Policy Acceptance
export const AcceptPrivacySchema = z.boolean().refine((val) => val === true, {
  message: 'You must accept the privacy policy',
});

// Marketing Consent
export const MarketingConsentSchema = z.boolean().default(false);

// Age Verification (Bangladesh specific - 18+ for vendors, 13+ for customers)
export const AgeVerificationSchema = z
  .boolean()
  .optional()
  .refine((val) => val === undefined || val === true, {
    message: 'You must confirm that you are at least 13 years old',
  });

// Referral Code Schema
export const ReferralCodeSchema = z
  .string()
  .min(1, 'Invalid referral code')
  .max(50, 'Referral code too long')
  .regex(/^[A-Za-z0-9]+$/, 'Referral code must be alphanumeric')
  .optional()
  .nullable()
  .brand('ReferralCode');


// ==================== Request Schemas ====================

// Standard Registration Schema (Email + Phone)
export const RegisterSchema = z
  .object({
    email: UserEmailSchema,
    phoneNumber: UserPhoneSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    displayName: UserDisplayNameSchema,
    password: UserStrongPasswordSchema,
    confirmPassword: UserPasswordSchema,
    acceptTerms: AcceptTermsSchema,
    acceptPrivacy: AcceptPrivacySchema,
    marketingConsent: MarketingConsentSchema,
    ageConfirmed: AgeVerificationSchema,
    referrerCode: ReferralCodeSchema,
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .brand('RegisterRequest');

// Email-only Registration Schema
export const EmailRegisterSchema = z
  .object({
    email: UserEmailSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    password: UserStrongPasswordSchema,
    confirmPassword: UserPasswordSchema,
    acceptTerms: AcceptTermsSchema,
    acceptPrivacy: AcceptPrivacySchema,
    marketingConsent: MarketingConsentSchema,
    referrerCode: ReferralCodeSchema,  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .brand('EmailRegisterRequest');

// Phone-only Registration Schema (Bangladesh specific)
export const PhoneRegisterSchema = z
  .object({
    phoneNumber: UserPhoneRequiredSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    password: UserStrongPasswordSchema,
    confirmPassword: UserPasswordSchema,
    acceptTerms: AcceptTermsSchema,
    acceptPrivacy: AcceptPrivacySchema,
    marketingConsent: MarketingConsentSchema,
    referrerCode: ReferralCodeSchema,
    })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .brand('PhoneRegisterRequest');

// OTP-based Registration (Passwordless - Bangladesh specific)
export const OTPRegisterSchema = z
  .object({
    phoneNumber: UserPhoneRequiredSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    otpCode: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits'),
    acceptTerms: AcceptTermsSchema,
    acceptPrivacy: AcceptPrivacySchema,
    marketingConsent: MarketingConsentSchema,
    referrerCode: ReferralCodeSchema,
  })
  .strict()
  .brand('OTPRegisterRequest');

// Social Registration Schema
export const SocialRegisterSchema = z
  .object({
    provider: z.enum(['google', 'facebook', 'github', 'apple', 'whatsapp', 'imo']),
    providerUserId: z.string().min(1, 'Provider user ID is required'),
    email: UserEmailSchema.optional(),
    phoneNumber: UserPhoneSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    avatar: z.string().url('Invalid avatar URL').optional(),
    acceptTerms: AcceptTermsSchema,
    acceptPrivacy: AcceptPrivacySchema,
    marketingConsent: MarketingConsentSchema,
    referrerCode: ReferralCodeSchema,
  })
  .strict()
  .brand('SocialRegisterRequest');

// Vendor Registration Schema (Bangladesh specific - for sellers)
export const VendorRegisterSchema = z
  .object({
    email: UserEmailSchema,
    phoneNumber: UserPhoneRequiredSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    businessName: z.string().min(2, 'Business name is required').max(100, 'Business name too long'),
    businessAddress: z.string().min(5, 'Business address is required').max(500, 'Business address too long'),
    tradeLicenseNumber: z.string().min(5, 'Trade license number is required').max(50),
    tinNumber: z.string().min(9, 'TIN number is required').max(20).optional(),
    nidNumber: z.string().min(10, 'NID number is required').max(17),
    password: UserStrongPasswordSchema,
    confirmPassword: UserPasswordSchema,
    acceptTerms: AcceptTermsSchema,
    acceptPrivacy: AcceptPrivacySchema,
    marketingConsent: MarketingConsentSchema,
    })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .brand('VendorRegisterRequest');

// ==================== Response Schemas ====================

// Registration Response Schema
export const RegisterResponseSchema = z
  .object({
    success: z.boolean(),
    userId: z.string().uuid(),
    email: UserEmailSchema.optional(),
    phoneNumber: UserPhoneSchema.optional(),
    emailVerificationRequired: z.boolean().default(false),
    phoneVerificationRequired: z.boolean().default(false),
    message: z.string().optional(),
    messageBn: z.string().optional(), // Bengali message (Bangladesh specific)
    requiresApproval: z.boolean().default(false), // For vendors
    redirectUrl: z.string().url().optional(),
  })
  .strict()
  .brand('RegisterResponse');

// Email Verification Required Response
export const EmailVerificationRequiredSchema = z
  .object({
    userId: z.string().uuid(),
    email: UserEmailSchema,
    verificationSent: z.boolean(),
    expiresInSeconds: z.number().int().positive(),
    resendCooldownSeconds: z.number().int().default(60),
  })
  .strict()
  .brand('EmailVerificationRequired');

// Phone Verification Required Response (Bangladesh specific)
export const PhoneVerificationRequiredSchema = z
  .object({
    userId: z.string().uuid(),
    phoneNumber: UserPhoneSchema,
    maskedPhone: z.string(),
    otpSent: z.boolean(),
    method: z.enum(['sms', 'whatsapp']),
    expiresInSeconds: z.number().int().positive(),
    resendCooldownSeconds: z.number().int().default(30),
  })
  .strict()
  .brand('PhoneVerificationRequired');

// Registration Error Response
export const RegisterErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'email_already_exists',
      'phone_already_exists',
      'username_already_exists',
      'invalid_referral_code',
      'invalid_captcha',
      'password_too_weak',
      'terms_not_accepted',
      'privacy_not_accepted',
      'underage',
      'invalid_trade_license',
      'invalid_nid',
      'invalid_tin',
      'business_already_registered',
      'phone_not_verified',
      'email_not_verified',
    ]),
    field: z.string().optional(),
  })
  .strict()
  .brand('RegisterError');

// ==================== Type Exports ====================

export type UserEmail = z.infer<typeof UserEmailSchema>;
export type UserPhone = z.infer<typeof UserPhoneSchema>;
export type UserPhoneRequired = z.infer<typeof UserPhoneRequiredSchema>;
export type UserFirstName = z.infer<typeof UserFirstNameSchema>;
export type UserLastName = z.infer<typeof UserLastNameSchema>;
export type UserDisplayName = z.infer<typeof UserDisplayNameSchema>;
export type UserPassword = z.infer<typeof UserPasswordSchema>;
export type UserStrongPassword = z.infer<typeof UserStrongPasswordSchema>;
export type Username = z.infer<typeof UsernameSchema>;
export type ReferralCode = z.infer<typeof ReferralCodeSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type EmailRegisterRequest = z.infer<typeof EmailRegisterSchema>;
export type PhoneRegisterRequest = z.infer<typeof PhoneRegisterSchema>;
export type OTPRegisterRequest = z.infer<typeof OTPRegisterSchema>;
export type SocialRegisterRequest = z.infer<typeof SocialRegisterSchema>;
export type VendorRegisterRequest = z.infer<typeof VendorRegisterSchema>;

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type EmailVerificationRequired = z.infer<typeof EmailVerificationRequiredSchema>;
export type PhoneVerificationRequired = z.infer<typeof PhoneVerificationRequiredSchema>;
export type RegisterError = z.infer<typeof RegisterErrorSchema>;

// ==================== Helper Types ====================

export type RegisterFormData = RegisterRequest;
export type PhoneRegisterFormData = PhoneRegisterRequest;
export type OTPRegisterFormData = OTPRegisterRequest;
export type VendorRegisterFormData = VendorRegisterRequest;
