/**
 * Auth Schema - Base
 * প্রমাণীকরণ সম্পর্কিত মূল স্কিমা
 */

import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants';

export const AuthBaseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.string().optional(),
  type: z.string().optional(),
  isVerified: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthLoginSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
  password: z.string().min(1, 'Password is required'),
  provider: z.string().optional(),
  rememberMe: z.boolean().default(false),
  deviceId: z.string().optional(),
});

export const AuthRegisterSchema = z
  .object({
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    provider: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept terms and conditions',
    }),
    deviceId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const AuthForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
});

export const AuthResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const AuthChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const AuthRefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const AuthLogoutSchema = z.object({
  allDevices: z.boolean().default(false),
});

export type AuthBaseSchemaType = z.infer<typeof AuthBaseSchema>;
export type AuthLoginSchemaType = z.infer<typeof AuthLoginSchema>;
export type AuthRegisterSchemaType = z.infer<typeof AuthRegisterSchema>;
export type AuthForgotPasswordSchemaType = z.infer<typeof AuthForgotPasswordSchema>;
export type AuthResetPasswordSchemaType = z.infer<typeof AuthResetPasswordSchema>;
export type AuthChangePasswordSchemaType = z.infer<typeof AuthChangePasswordSchema>;
export type AuthRefreshTokenSchemaType = z.infer<typeof AuthRefreshTokenSchema>;
export type AuthLogoutSchemaType = z.infer<typeof AuthLogoutSchema>;
