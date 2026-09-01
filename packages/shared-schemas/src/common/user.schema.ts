import { z } from 'zod';
import { ROLES, STATUS } from '@vubon/shared-constants';
import { REGEX } from '@vubon/shared-constants';
import { AddressSchema } from './address.schema';

/**
 * User Schema
 * ইউজার স্কিমা
 */
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number'),
  role: z.enum([
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
    ROLES.MODERATOR,
    ROLES.USER,
    ROLES.VENDOR,
    ROLES.GUEST,
  ]),
  status: z.enum([
    STATUS.ACTIVE,
    STATUS.INACTIVE,
    STATUS.PENDING,
    STATUS.DELETED,
    STATUS.SUSPENDED,
  ]),
  avatar: z.string().url().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  addresses: z.array(AddressSchema).optional(),
  isVerified: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * User Profile Schema
 * ইউজার প্রোফাইল স্কিমা
 */
export const UserProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nid: z.string().regex(REGEX.NID, 'Invalid NID').optional(),
  birthRegistration: z.string().regex(REGEX.BIRTH_REG, 'Invalid birth registration').optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
});

/**
 * Update User Schema
 * ইউজার আপডেট স্কিমা
 */
export const UpdateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  profile: UserProfileSchema.optional(),
});

/**
 * Vendor User Schema
 * ভেন্ডর ইউজার স্কিমা
 */
export const VendorUserSchema = UserSchema.extend({
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  shopDescription: z.string().min(10, 'Shop description must be at least 10 characters'),
  shopLogo: z.string().url().optional(),
  shopBanner: z.string().url().optional(),
  shopAddress: AddressSchema,
  isVerified: z.boolean().default(false),
  rating: z.number().min(0).max(5).default(0),
  totalProducts: z.number().int().nonnegative().default(0),
  totalOrders: z.number().int().nonnegative().default(0),
  totalRevenue: z.number().nonnegative().default(0),
  commissionRate: z.number().min(0).max(100).default(10),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
export type VendorUserSchemaType = z.infer<typeof VendorUserSchema>;
