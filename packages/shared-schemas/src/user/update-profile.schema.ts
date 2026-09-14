/**
 * Update Profile Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { USER_PROFILE } from '@vubon/shared-constants/user';
import { ProfileVisibilitySchema, GenderSchema } from './user-profile.schema';

export const UpdateProfileRequestSchema = z
  .object({
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
    visibility: ProfileVisibilitySchema.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateProfileRequestSchemaType = z.infer<typeof UpdateProfileRequestSchema>;
