/**
 * Registration request validation schema using Zod
 * Validates all fields required for user registration
 */
import { EMAIL_REGEX, PASSWORD_POLICY, PASSWORD_REGEX } from '@vubon/auth-shared-constants';
import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .regex(EMAIL_REGEX, 'Invalid email format')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(
      PASSWORD_POLICY.MIN_LENGTH,
      `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`,
    )
    .max(
      PASSWORD_POLICY.MAX_LENGTH,
      `Password must be less than ${PASSWORD_POLICY.MAX_LENGTH} characters`,
    )
    .regex(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number, and special character',
    ),

  confirmPassword: z.string().min(1, 'Confirm password is required'),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'First name can only contain letters, spaces, apostrophes, and hyphens',
    )
    .trim()
    .optional(),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Last name can only contain letters, spaces, apostrophes, and hyphens',
    )
    .trim()
    .optional(),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens',
    )
    .toLowerCase()
    .trim()
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional()
    .nullable(),

  acceptTerms: z.boolean().refine((val: boolean) => val === true, {
    message: 'You must accept the terms and conditions',
  }),

  acceptPrivacyPolicy: z.boolean().refine((val: boolean) => val === true, {
    message: 'You must accept the privacy policy',
  }),

  referralCode: z
    .string()
    .max(50, 'Referral code must be less than 50 characters')
    .optional()
    .nullable(),

  metadata: z.record(z.unknown()).optional().nullable(),
});

export type RegisterRequest = z.infer<typeof registerSchema>;

export const registerPartialSchema = registerSchema.partial();

export type RegisterPartialRequest = z.infer<typeof registerPartialSchema>;

// Strict schema with explicit ZodType typing to bypass unsafe member access linting safely
export const registerStrictSchema: z.ZodType<unknown, z.ZodTypeDef, unknown> = registerSchema
  .extend({
    password: z
      .string()
      .min(PASSWORD_POLICY.MIN_LENGTH)
      .max(PASSWORD_POLICY.MAX_LENGTH)
      .regex(PASSWORD_REGEX),
  })
  .refine(
    (data) => {
      const obj = data as Record<string, unknown>;
      return obj.password === obj.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  );

export type RegisterStrictRequest = z.infer<typeof registerStrictSchema>;

// Re-creating the schema from base to avoid un-resolvable chaining lint errors
export const registerWithUsernameSchema = registerSchema
  .extend({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be less than 30 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores, and hyphens',
      )
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(PASSWORD_POLICY.MIN_LENGTH)
      .max(PASSWORD_POLICY.MAX_LENGTH)
      .regex(PASSWORD_REGEX),
  })
  .refine(
    (data) => {
      const obj = data as Record<string, unknown>;
      return obj.password === obj.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  );

export type RegisterWithUsernameRequest = z.infer<typeof registerWithUsernameSchema>;

export const registerWithoutTermsSchema = registerSchema
  .extend({
    password: z
      .string()
      .min(PASSWORD_POLICY.MIN_LENGTH)
      .max(PASSWORD_POLICY.MAX_LENGTH)
      .regex(PASSWORD_REGEX),
    acceptTerms: z.boolean().optional(),
    acceptPrivacyPolicy: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const obj = data as Record<string, unknown>;
      return obj.password === obj.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  );

export type RegisterWithoutTermsRequest = z.infer<typeof registerWithoutTermsSchema>;

export const socialRegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .regex(EMAIL_REGEX, 'Invalid email format')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),

  provider: z.enum(['google', 'facebook', 'github', 'apple'], {
    errorMap: () => ({ message: 'Invalid social provider' }),
  }),

  providerId: z
    .string()
    .min(1, 'Provider ID is required')
    .max(255, 'Provider ID must be less than 255 characters'),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .trim()
    .optional(),

  lastName: z.string().max(50, 'Last name must be less than 50 characters').trim().optional(),

  avatar: z.string().url('Invalid avatar URL').optional().nullable(),

  acceptTerms: z.boolean().refine((val: boolean) => val === true, {
    message: 'You must accept the terms and conditions',
  }),

  acceptPrivacyPolicy: z.boolean().refine((val: boolean) => val === true, {
    message: 'You must accept the privacy policy',
  }),
});

export type SocialRegisterRequest = z.infer<typeof socialRegisterSchema>;

export const registerResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: z.object({
      id: z.string(),
      email: z.string().email(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      role: z.string(),
      status: z.string(),
      isVerified: z.boolean(),
      createdAt: z.date(),
    }),
    verificationToken: z.string().optional(),
    requiresVerification: z.boolean(),
  }),
  message: z.string(),
  statusCode: z.number(),
  timestamp: z.string(),
  path: z.string(),
  method: z.string(),
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const registerErrorSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  message: z.string(),
  statusCode: z.number(),
  timestamp: z.string(),
  path: z.string(),
  method: z.string(),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        code: z.string(),
        value: z.unknown().optional(),
      }),
    )
    .optional(),
});

export type RegisterError = z.infer<typeof registerErrorSchema>;

export const passwordValidationSchema = z
  .string()
  .min(PASSWORD_POLICY.MIN_LENGTH)
  .max(PASSWORD_POLICY.MAX_LENGTH)
  .regex(PASSWORD_REGEX);

export const emailValidationSchema = z
  .string()
  .email()
  .regex(EMAIL_REGEX)
  .max(255)
  .toLowerCase()
  .trim();

export const usernameValidationSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9_-]+$/)
  .toLowerCase()
  .trim();
