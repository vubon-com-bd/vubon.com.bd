/**
 * User Profile Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-profile.constants থেকে।
 */

import { z } from 'zod';
import { USER_PROFILE, USER_PROFILE_VISIBILITY, USER_GENDER } from '@vubon/shared-constants/user';

export const ProfileVisibilitySchema = z.enum(
  Object.values(USER_PROFILE_VISIBILITY) as [string, ...string[]]
);

export const GenderSchema = z.enum(Object.values(USER_GENDER) as [string, ...string[]]);

export const UserProfileSchema = z.object({
  userId: z.string().min(1),
  firstName: z.string().trim().min(1).max(USER_PROFILE.NAME_MAX_LENGTH).optional(),
  lastName: z.string().trim().min(1).max(USER_PROFILE.NAME_MAX_LENGTH).optional(),
  displayName: z.string().trim().max(USER_PROFILE.NAME_MAX_LENGTH).optional(),
  bio: z.string().trim().max(USER_PROFILE.BIO_MAX_LENGTH).optional(),
  avatarUrl: z.string().url().optional(),
  coverUrl: z.string().url().optional(),
  gender: GenderSchema.optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .optional(),
  website: z.string().url().max(USER_PROFILE.WEBSITE_MAX_LENGTH).optional(),
  company: z.string().trim().max(USER_PROFILE.COMPANY_MAX_LENGTH).optional(),
  designation: z.string().trim().max(USER_PROFILE.DESIGNATION_MAX_LENGTH).optional(),
  visibility: ProfileVisibilitySchema,
  updatedAt: z.string().datetime(),
});

export const UserProfilePublicSchema = UserProfileSchema.omit({
  userId: true,
  gender: true,
  dateOfBirth: true,
  visibility: true,
});

export type ProfileVisibilitySchemaType = z.infer<typeof ProfileVisibilitySchema>;
export type GenderSchemaType = z.infer<typeof GenderSchema>;
export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
export type UserProfilePublicSchemaType = z.infer<typeof UserProfilePublicSchema>;
