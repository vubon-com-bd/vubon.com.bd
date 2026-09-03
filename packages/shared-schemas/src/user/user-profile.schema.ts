/**
 * User Profile Schema
 * ইউজার প্রোফাইল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_PROFILE } from '@vubon/shared-constants';

export const UserProfileDataSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .optional(),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .optional(),
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name must be less than 100 characters')
    .optional(),
  dateOfBirth: z.date().optional(),
  gender: z
    .enum([
      USER_PROFILE.GENDER.MALE,
      USER_PROFILE.GENDER.FEMALE,
      USER_PROFILE.GENDER.OTHER,
      USER_PROFILE.GENDER.PREFER_NOT_TO_SAY,
    ])
    .optional(),
  relationship: z
    .enum([
      USER_PROFILE.RELATIONSHIP.SINGLE,
      USER_PROFILE.RELATIONSHIP.MARRIED,
      USER_PROFILE.RELATIONSHIP.DIVORCED,
      USER_PROFILE.RELATIONSHIP.WIDOWED,
      USER_PROFILE.RELATIONSHIP.IN_RELATIONSHIP,
      USER_PROFILE.RELATIONSHIP.ENGAGED,
      USER_PROFILE.RELATIONSHIP.COMPLICATED,
    ])
    .optional(),
  bio: z
    .string()
    .max(
      USER_PROFILE.VALIDATION.BIO_MAX_LENGTH,
      `Bio must be less than ${USER_PROFILE.VALIDATION.BIO_MAX_LENGTH} characters`
    )
    .optional(),
  avatar: z.string().url().optional(),
  cover: z.string().url().optional(),
  location: z
    .string()
    .max(
      USER_PROFILE.VALIDATION.LOCATION_MAX_LENGTH,
      `Location must be less than ${USER_PROFILE.VALIDATION.LOCATION_MAX_LENGTH} characters`
    )
    .optional(),
  website: z
    .string()
    .url()
    .max(
      USER_PROFILE.VALIDATION.WEBSITE_MAX_LENGTH,
      `Website must be less than ${USER_PROFILE.VALIDATION.WEBSITE_MAX_LENGTH} characters`
    )
    .optional(),
  company: z
    .string()
    .max(
      USER_PROFILE.VALIDATION.COMPANY_MAX_LENGTH,
      `Company must be less than ${USER_PROFILE.VALIDATION.COMPANY_MAX_LENGTH} characters`
    )
    .optional(),
  position: z
    .string()
    .max(
      USER_PROFILE.VALIDATION.POSITION_MAX_LENGTH,
      `Position must be less than ${USER_PROFILE.VALIDATION.POSITION_MAX_LENGTH} characters`
    )
    .optional(),
  education: z
    .enum([
      USER_PROFILE.EDUCATION.NONE,
      USER_PROFILE.EDUCATION.PRIMARY,
      USER_PROFILE.EDUCATION.SECONDARY,
      USER_PROFILE.EDUCATION.HIGHER_SECONDARY,
      USER_PROFILE.EDUCATION.GRADUATE,
      USER_PROFILE.EDUCATION.POST_GRADUATE,
      USER_PROFILE.EDUCATION.DOCTORATE,
      USER_PROFILE.EDUCATION.PROFESSIONAL,
    ])
    .optional(),
  employment: z
    .enum([
      USER_PROFILE.EMPLOYMENT.FULL_TIME,
      USER_PROFILE.EMPLOYMENT.PART_TIME,
      USER_PROFILE.EMPLOYMENT.SELF_EMPLOYED,
      USER_PROFILE.EMPLOYMENT.FREELANCE,
      USER_PROFILE.EMPLOYMENT.CONTRACT,
      USER_PROFILE.EMPLOYMENT.INTERN,
      USER_PROFILE.EMPLOYMENT.UNEMPLOYED,
      USER_PROFILE.EMPLOYMENT.RETIRED,
      USER_PROFILE.EMPLOYMENT.STUDENT,
    ])
    .optional(),
  visibility: z
    .enum([
      USER_PROFILE.VISIBILITY.PUBLIC,
      USER_PROFILE.VISIBILITY.PRIVATE,
      USER_PROFILE.VISIBILITY.CONTACTS,
      USER_PROFILE.VISIBILITY.FRIENDS,
      USER_PROFILE.VISIBILITY.CUSTOM,
    ])
    .default(USER_PROFILE.DEFAULTS.VISIBILITY),
  metadata: z.record(z.unknown()).optional(),
});

export const UserProfileCreateSchema = UserProfileDataSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserProfileUpdateSchema = UserProfileDataSchema.partial();

export type UserProfileDataSchemaType = z.infer<typeof UserProfileDataSchema>;
export type UserProfileCreateSchemaType = z.infer<typeof UserProfileCreateSchema>;
export type UserProfileUpdateSchemaType = z.infer<typeof UserProfileUpdateSchema>;
